import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { withAuth } from "../auth/middleware"

export async function GET(request: NextRequest) {
  return withAuth(async (req) => {
    try {
      const projects = await db.getProjects()
      
      const formattedProjects = projects.map((p) => ({
        id: p.id,
        title: p.title,
        description: p.description,
        technologies: Array.isArray(p.technologies) ? p.technologies : [],
        github: p.github_link || "",
        demo: p.demo_link || "",
        image: p.image_url || "",
      }))
      
      return NextResponse.json(formattedProjects)
    } catch (error) {
      console.error("Error fetching projects:", error)
      return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 })
    }
  })(request)
}

export async function POST(request: NextRequest) {
  return withAuth(async (req, adminEmail) => {
    try {
      const data = await req.json()
      
      if (!data.title || !data.description) {
        return NextResponse.json({ error: "Title and description required" }, { status: 400 })
      }

      const admin = await db.getAdmin(adminEmail)
      if (!admin) {
        return NextResponse.json({ error: "Admin not found" }, { status: 401 })
      }

      const project = await db.createProject(
        {
          title: data.title,
          description: data.description,
          technologies: Array.isArray(data.technologies) ? data.technologies : [],
          github: data.github || "",
          demo: data.demo || "",
        },
        admin.id
      )

      return NextResponse.json({
        id: project.id,
        title: project.title,
        description: project.description,
        technologies: project.technologies,
        github: data.github || "",
        demo: data.demo || "",
      }, { status: 201 })
    } catch (error) {
      console.error("Error creating project:", error)
      return NextResponse.json({ error: "Failed to create project" }, { status: 500 })
    }
  })(request)
}

export async function PUT(request: NextRequest) {
  return withAuth(async (req) => {
    try {
      const data = await req.json()
      
      if (!data.id || !data.title || !data.description) {
        return NextResponse.json({ error: "ID, title and description required" }, { status: 400 })
      }

      await db.updateProject(data.id, {
        title: data.title,
        description: data.description,
        technologies: Array.isArray(data.technologies) ? data.technologies : [],
        github: data.github || "",
        demo: data.demo || "",
      })

      return NextResponse.json({ success: true })
    } catch (error) {
      console.error("Error updating project:", error)
      return NextResponse.json({ error: "Failed to update project" }, { status: 500 })
    }
  })(request)
}

export async function DELETE(request: NextRequest) {
  return withAuth(async (req) => {
    try {
      const { searchParams } = new URL(req.url)
      const id = searchParams.get("id")
      
      if (!id) {
        return NextResponse.json({ error: "Project ID required" }, { status: 400 })
      }

      await db.deleteProject(id)
      return NextResponse.json({ success: true })
    } catch (error) {
      console.error("Error deleting project:", error)
      return NextResponse.json({ error: "Failed to delete project" }, { status: 500 })
    }
  })(request)
}

