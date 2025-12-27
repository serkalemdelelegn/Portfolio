import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function GET(request: NextRequest) {
  try {
    const category = request.nextUrl.searchParams.get("category")
    const skills = await db.getSkills(category || undefined)
    
    // Group skills by category for frontend
    const grouped = skills.reduce((acc: any, skill: any) => {
      if (!acc[skill.category]) {
        acc[skill.category] = []
      }
      acc[skill.category].push(skill.name)
      return acc
    }, {})
    
    // Transform to frontend format
    const formatted = Object.entries(grouped).map(([category, skillsList]) => ({
      id: category,
      category,
      skills: skillsList as string[],
    }))
    
    return NextResponse.json(formatted)
  } catch (error) {
    console.error("Error fetching skills:", error)
    return NextResponse.json({ error: "Failed to fetch skills" }, { status: 500 })
  }
}
