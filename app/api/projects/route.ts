import { type NextRequest, NextResponse } from "next/server"

// In-memory storage for demo - replace with database in production
const projects = [
  {
    id: "1",
    title: "E-Commerce Platform",
    description: "A full-featured e-commerce platform with real-time inventory management and payment integration",
    technologies: ["React", "Node.js", "MongoDB", "Stripe"],
    github: "https://github.com",
    demo: "https://vercel.app",
  },
  {
    id: "2",
    title: "Task Management App",
    description: "Collaborative task management with real-time updates and team features",
    technologies: ["Next.js", "TypeScript", "PostgreSQL", "WebSocket"],
    github: "https://github.com",
    demo: "https://vercel.app",
  },
  {
    id: "3",
    title: "AI Chat Interface",
    description: "Modern chat interface powered by AI with context awareness and history",
    technologies: ["React", "OpenAI API", "Tailwind CSS", "Next.js"],
    github: "https://github.com",
    demo: "https://vercel.app",
  },
]

export async function GET() {
  return NextResponse.json({ projects })
}

export async function POST(request: NextRequest) {
  try {
    const project = await request.json()

    if (!project.title || !project.description) {
      return NextResponse.json({ error: "Title and description required" }, { status: 400 })
    }

    const newProject = {
      ...project,
      id: Date.now().toString(),
    }

    projects.push(newProject)
    return NextResponse.json(newProject, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create project" }, { status: 500 })
  }
}
