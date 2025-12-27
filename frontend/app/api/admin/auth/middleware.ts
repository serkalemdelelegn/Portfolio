import { type NextRequest, NextResponse } from "next/server"
import { verifyToken } from "@/lib/auth"

export function withAuth(handler: (req: NextRequest, adminEmail: string) => Promise<NextResponse>) {
  return async (request: NextRequest) => {
    // Try to get token from Authorization header
    const authHeader = request.headers.get("authorization")
    let token: string | null = null

    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.slice(7)
    } else {
      // Try to get from cookie
      const cookies = request.cookies.get("admin_token")
      token = cookies?.value || null
    }

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Verify token
    const payload = verifyToken(token)
    
    if (!payload) {
      return NextResponse.json({ error: "Invalid or expired token" }, { status: 401 })
    }

    return handler(request, payload.email)
  }
}
