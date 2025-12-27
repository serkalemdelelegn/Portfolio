import { type NextRequest, NextResponse } from "next/server"

// In-memory storage for demo - replace with database in production
const skills = [
  { id: "1", name: "React", category: "frontend", level: "advanced" },
  { id: "2", name: "Next.js", category: "frontend", level: "advanced" },
  { id: "3", name: "TypeScript", category: "frontend", level: "advanced" },
  { id: "4", name: "Node.js", category: "backend", level: "advanced" },
  { id: "5", name: "Express", category: "backend", level: "advanced" },
  { id: "6", name: "MongoDB", category: "database", level: "intermediate" },
  { id: "7", name: "PostgreSQL", category: "database", level: "intermediate" },
  { id: "8", name: "Git", category: "tools", level: "advanced" },
  { id: "9", name: "Docker", category: "tools", level: "intermediate" },
  { id: "10", name: "Tailwind CSS", category: "frontend", level: "advanced" },
]

export async function GET(request: NextRequest) {
  const category = request.nextUrl.searchParams.get("category")

  if (category) {
    return NextResponse.json({ skills: skills.filter((s) => s.category === category) })
  }

  return NextResponse.json({ skills })
}

export async function POST(request: NextRequest) {
  try {
    const skill = await request.json()

    if (!skill.name || !skill.category || !skill.level) {
      return NextResponse.json({ error: "Name, category, and level required" }, { status: 400 })
    }

    const newSkill = {
      ...skill,
      id: Date.now().toString(),
    }

    skills.push(newSkill)
    return NextResponse.json(newSkill, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create skill" }, { status: 500 })
  }
}
