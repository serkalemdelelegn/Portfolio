import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { withAuth } from "../auth/middleware"
import { db as dbHelper } from "@/lib/db"

export async function GET() {
  try {
    const content = await db.getAbout()
    return NextResponse.json({ content })
  } catch (error) {
    console.error("Error fetching about content:", error)
    return NextResponse.json({ error: "Failed to fetch content" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  return withAuth(async (req, adminEmail) => {
    try {
      const { content } = await req.json()

      if (!content) {
        return NextResponse.json({ error: "Content required" }, { status: 400 })
      }

      // Get admin ID
      const admin = await dbHelper.getAdmin(adminEmail)
      if (!admin) {
        return NextResponse.json({ error: "Admin not found" }, { status: 401 })
      }

      await db.updateAbout(content, admin.id)
      return NextResponse.json({ content })
    } catch (error) {
      console.error("Error updating about content:", error)
      return NextResponse.json({ error: "Failed to update content" }, { status: 500 })
    }
  })(request)
}
