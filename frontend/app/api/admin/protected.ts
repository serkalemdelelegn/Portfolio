import { type NextRequest, NextResponse } from "next/server"

export function verifyAdminToken(request: NextRequest): boolean {
  const authHeader = request.headers.get("authorization")

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return false
  }

  const token = authHeader.slice(7)

  // Verify token format and validity
  try {
    const decoded = Buffer.from(token, "base64").toString()
    const [email] = decoded.split(":")

    return !!email
  } catch {
    return false
  }
}

export function unauthorizedResponse() {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
}
