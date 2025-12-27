import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function POST(request: NextRequest) {
  try {
    const { name, email, message } = await request.json()

    if (!name || !email || !message) {
      return NextResponse.json({ error: "All fields required" }, { status: 400 })
    }

    // Store in database
    await db.createContactMessage({ name, email, message })

    return NextResponse.json({ success: true, message: "Message received" })
  } catch (error) {
    console.error("Error saving contact message:", error)
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 })
  }
}
