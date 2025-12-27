import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function GET() {
  try {
    const experiences = await db.getExperiences()
    
    // Transform to frontend format
    const formatted = experiences.map((exp) => {
      const dateParts = exp.date_range.split(" - ")
      return {
        id: exp.id,
        position: exp.title,
        company: exp.company,
        startDate: dateParts[0] || exp.date_range,
        endDate: dateParts[1] || "",
        description: exp.description,
        technologies: [], // Can be extended if needed
      }
    })
    
    return NextResponse.json(formatted)
  } catch (error) {
    console.error("Error fetching experiences:", error)
    return NextResponse.json({ error: "Failed to fetch experiences" }, { status: 500 })
  }
}
