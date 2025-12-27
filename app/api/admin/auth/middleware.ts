import { type NextRequest, NextResponse } from "next/server"

export function withAuth(handler: (req: NextRequest) => Promise<NextResponse>) {
  return async (request: NextRequest) => {
    const authHeader = request.headers.get("authorization")

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const token = authHeader.slice(7)

    // Verify token (implement actual JWT verification in production)
    if (!token) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 })
    }

    return handler(request)
  }
}
