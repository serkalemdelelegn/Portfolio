"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export function useAdminAuth() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("admin_auth")

      if (!token) {
        router.push("/admin/login")
        setIsAuthenticated(false)
      } else {
        setIsAuthenticated(true)
      }

      setIsLoading(false)
    }

    checkAuth()
  }, [router])

  const logout = () => {
    localStorage.removeItem("admin_auth")
    router.push("/admin/login")
  }

  return { isAuthenticated, isLoading, logout }
}
