import { type NextRequest, NextResponse } from "next/server"

const BACKEND_URL = process.env.BACKEND_URL || process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000"

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    console.log("[Next.js API] Login request received:", { email, hasPassword: !!password })
    console.log("[Next.js API] Backend URL:", BACKEND_URL)

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password required" }, { status: 400 })
    }

    // Proxy request to Express backend
    const backendUrl = `${BACKEND_URL}/api/admin/login`
    console.log("[Next.js API] Calling backend:", backendUrl)

    const response = await fetch(backendUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })

    console.log("[Next.js API] Backend response status:", response.status)

    const data = await response.json()
    console.log("[Next.js API] Backend response data:", { ...data, token: data.token ? "***" : undefined })

    if (!response.ok) {
      console.error("[Next.js API] Backend error:", data)
      return NextResponse.json(data, { status: response.status })
    }

    console.log("[Next.js API] Login successful")
    return NextResponse.json(data)
  } catch (error: any) {
    console.error("[Next.js API] Login error:", error)
    console.error("[Next.js API] Error details:", error.message, error.stack)
    return NextResponse.json(
      { 
        error: "Login failed - unable to connect to backend server",
        details: process.env.NODE_ENV === "development" ? error.message : undefined
      },
      { status: 500 }
    )
  }
}
