import { type NextRequest, NextResponse } from "next/server"

// In-memory storage for demo - replace with database in production
const experiences = [
  {
    id: "1",
    title: "Senior Developer",
    company: "Tech Company",
    date: "2022 - Present",
    description: "Leading full-stack development projects and mentoring junior developers",
  },
  {
    id: "2",
    title: "Full Stack Developer",
    company: "Startup XYZ",
    date: "2020 - 2022",
    description: "Developed and maintained multiple web applications with modern tech stack",
  },
  {
    id: "3",
    title: "Junior Developer",
    company: "First Company",
    date: "2019 - 2020",
    description: "Started my career learning full-stack web development fundamentals",
  },
]

export async function GET() {
  return NextResponse.json({ experiences })
}

export async function POST(request: NextRequest) {
  try {
    const experience = await request.json()

    if (!experience.title || !experience.company) {
      return NextResponse.json({ error: "Title and company required" }, { status: 400 })
    }

    const newExperience = {
      ...experience,
      id: Date.now().toString(),
    }

    experiences.push(newExperience)
    return NextResponse.json(newExperience, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create experience" }, { status: 500 })
  }
}
