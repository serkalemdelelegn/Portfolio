import * as bcrypt from "bcryptjs"

export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10)
  return bcrypt.hash(password, salt)
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash)
}

export function generateToken(email: string): string {
  const payload = {
    email,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 86400 * 7, // 7 days
  }

  // In production, use JWT library like jsonwebtoken
  return Buffer.from(JSON.stringify(payload)).toString("base64")
}

export function verifyToken(token: string): { email: string } | null {
  try {
    const payload = JSON.parse(Buffer.from(token, "base64").toString())

    if (payload.exp < Math.floor(Date.now() / 1000)) {
      return null
    }

    return { email: payload.email }
  } catch {
    return null
  }
}
