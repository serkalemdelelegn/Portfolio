import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { name, email, message } = await request.json()

    if (!name || !email || !message) {
      return NextResponse.json({ error: "All fields required" }, { status: 400 })
    }

    // In production, send email or store in database
    console.log("New contact message:", { name, email, message, timestamp: new Date() })

    return NextResponse.json({ success: true, message: "Message received" })
  } catch (error) {
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 })
  }
}
