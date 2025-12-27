import { type NextRequest, NextResponse } from "next/server"

// In-memory storage for demo - replace with database in production
let aboutContent = {
  content:
    "I'm a passionate full-stack developer with a love for creating beautiful, functional digital experiences. With expertise in modern JavaScript frameworks, I craft solutions that bridge the gap between design and functionality.",
}

export async function GET() {
  return NextResponse.json(aboutContent)
}

export async function POST(request: NextRequest) {
  try {
    const { content } = await request.json()

    if (!content) {
      return NextResponse.json({ error: "Content required" }, { status: 400 })
    }

    aboutContent = { content }
    return NextResponse.json(aboutContent)
  } catch (error) {
    return NextResponse.json({ error: "Failed to update content" }, { status: 500 })
  }
}
