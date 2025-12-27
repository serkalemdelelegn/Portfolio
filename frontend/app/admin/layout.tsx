"use client"

import type React from "react"
import { useRouter, usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import AdminSidebar from "@/components/admin/sidebar"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    try {
      const auth = localStorage.getItem("admin_auth")
      console.log("[v0] Admin auth check - pathname:", pathname, "auth:", !!auth)

      if (auth) {
        document.cookie = `admin_token=${auth}; path=/; max-age=86400; SameSite=Strict`
        setIsAuthenticated(true)
      } else {
        document.cookie = "admin_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
        setIsAuthenticated(false)
      }

      if (!auth && pathname !== "/admin/login") {
        router.push("/admin/login")
      } else if (auth && pathname === "/admin/login") {
        router.push("/admin/dashboard")
      }
    } catch (error) {
      console.error("[v0] Admin layout error:", error)
    } finally {
      setMounted(true)
    }
  }, [router, pathname])

  // Don't render anything until mounted to prevent hydration mismatch
  if (!mounted) {
    return <div className="min-h-screen bg-background" />
  }

  // Show login page content if on login route
  if (pathname === "/admin/login") {
    return children
  }

  // If not authenticated on protected route, don't render dashboard
  if (!isAuthenticated) {
    return <div className="min-h-screen bg-background" />
  }

  return (
    <div className="flex h-screen bg-background">
      <AdminSidebar />
      <main className="flex-1 overflow-auto">
        <div className="p-8">{children}</div>
      </main>
    </div>
  )
}
