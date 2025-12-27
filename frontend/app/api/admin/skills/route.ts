import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { withAuth } from "../auth/middleware"

export async function GET(request: NextRequest) {
  return withAuth(async (req) => {
    try {
      const skills = await db.getSkills()
      return NextResponse.json(skills)
    } catch (error) {
      console.error("Error fetching skills:", error)
      return NextResponse.json({ error: "Failed to fetch skills" }, { status: 500 })
    }
  })(request)
}

export async function POST(request: NextRequest) {
  return withAuth(async (req, adminEmail) => {
    try {
      const data = await req.json()
      
      if (!data.name || !data.category || !data.level) {
        return NextResponse.json({ error: "Name, category, and level required" }, { status: 400 })
      }

      const admin = await db.getAdmin(adminEmail)
      if (!admin) {
        return NextResponse.json({ error: "Admin not found" }, { status: 401 })
      }

      const skill = await db.createSkill(
        {
          name: data.name,
          category: data.category,
          level: data.level,
        },
        admin.id
      )

      return NextResponse.json(skill, { status: 201 })
    } catch (error) {
      console.error("Error creating skill:", error)
      return NextResponse.json({ error: "Failed to create skill" }, { status: 500 })
    }
  })(request)
}

export async function PUT(request: NextRequest) {
  return withAuth(async (req) => {
    try {
      const data = await req.json()
      
      if (!data.id || !data.name || !data.category || !data.level) {
        return NextResponse.json({ error: "ID, name, category, and level required" }, { status: 400 })
      }

      await db.updateSkill(data.id, {
        name: data.name,
        category: data.category,
        level: data.level,
      })

      return NextResponse.json({ success: true })
    } catch (error) {
      console.error("Error updating skill:", error)
      return NextResponse.json({ error: "Failed to update skill" }, { status: 500 })
    }
  })(request)
}

export async function DELETE(request: NextRequest) {
  return withAuth(async (req) => {
    try {
      const { searchParams } = new URL(req.url)
      const id = searchParams.get("id")
      
      if (!id) {
        return NextResponse.json({ error: "Skill ID required" }, { status: 400 })
      }

      await db.deleteSkill(id)
      return NextResponse.json({ success: true })
    } catch (error) {
      console.error("Error deleting skill:", error)
      return NextResponse.json({ error: "Failed to delete skill" }, { status: 500 })
    }
  })(request)
}

