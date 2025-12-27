import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function GET() {
  try {
    const projects = await db.getProjects()
    
    // Transform database format to frontend format
    const formattedProjects = projects.map((p) => ({
      id: p.id,
      title: p.title,
      description: p.description,
      technologies: Array.isArray(p.technologies) ? p.technologies : [],
      github: p.github_link || undefined,
      demo: p.demo_link || undefined,
      image: p.image_url || undefined,
    }))
    
    return NextResponse.json(formattedProjects)
  } catch (error) {
    console.error("Error fetching projects:", error)
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 })
  }
}
