import { type NextRequest, NextResponse } from "next/server"

// Demo credentials - in production, validate against database
const DEMO_EMAIL = "admin@example.com"
const DEMO_PASSWORD = "password123"

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password required" }, { status: 400 })
    }

    // Demo authentication
    if (email === DEMO_EMAIL && password === DEMO_PASSWORD) {
      const token = btoa(`${email}:${Date.now()}`)
      return NextResponse.json({ token, email })
    }

    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
  } catch (error) {
    return NextResponse.json({ error: "Login failed" }, { status: 500 })
  }
}
