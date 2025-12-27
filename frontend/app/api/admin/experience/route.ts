import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { withAuth } from "../auth/middleware"

export async function GET(request: NextRequest) {
  return withAuth(async (req) => {
    try {
      const experiences = await db.getExperiences()
      
      // Transform to match frontend format
      const formatted = experiences.map((exp) => ({
        id: exp.id,
        position: exp.title,
        company: exp.company,
        startDate: exp.date_range.split(" - ")[0] || exp.date_range,
        endDate: exp.date_range.split(" - ")[1] || "",
        description: exp.description,
        technologies: [], // Add if needed in schema
      }))
      
      return NextResponse.json(formatted)
    } catch (error) {
      console.error("Error fetching experiences:", error)
      return NextResponse.json({ error: "Failed to fetch experiences" }, { status: 500 })
    }
  })(request)
}

export async function POST(request: NextRequest) {
  return withAuth(async (req, adminEmail) => {
    try {
      const data = await req.json()
      
      if (!data.title || !data.company || !data.date) {
        return NextResponse.json({ error: "Title, company, and date required" }, { status: 400 })
      }

      const admin = await db.getAdmin(adminEmail)
      if (!admin) {
        return NextResponse.json({ error: "Admin not found" }, { status: 401 })
      }

      const experience = await db.createExperience(
        {
          title: data.title,
          company: data.company,
          dateRange: data.date,
          description: data.description || "",
          type: "work", // Default type
        },
        admin.id
      )

      return NextResponse.json({
        id: experience.id,
        title: experience.title,
        company: experience.company,
        date: data.date,
        description: experience.description,
      }, { status: 201 })
    } catch (error) {
      console.error("Error creating experience:", error)
      return NextResponse.json({ error: "Failed to create experience" }, { status: 500 })
    }
  })(request)
}

export async function PUT(request: NextRequest) {
  return withAuth(async (req) => {
    try {
      const data = await req.json()
      
      if (!data.id || !data.title || !data.company || !data.date) {
        return NextResponse.json({ error: "ID, title, company, and date required" }, { status: 400 })
      }

      await db.updateExperience(data.id, {
        title: data.title,
        company: data.company,
        dateRange: data.date,
        description: data.description || "",
        type: "work",
      })

      return NextResponse.json({ success: true })
    } catch (error) {
      console.error("Error updating experience:", error)
      return NextResponse.json({ error: "Failed to update experience" }, { status: 500 })
    }
  })(request)
}

export async function DELETE(request: NextRequest) {
  return withAuth(async (req) => {
    try {
      const { searchParams } = new URL(req.url)
      const id = searchParams.get("id")
      
      if (!id) {
        return NextResponse.json({ error: "Experience ID required" }, { status: 400 })
      }

      await db.deleteExperience(id)
      return NextResponse.json({ success: true })
    } catch (error) {
      console.error("Error deleting experience:", error)
      return NextResponse.json({ error: "Failed to delete experience" }, { status: 500 })
    }
  })(request)
}

