"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

interface AdminContextType {
  isAuthenticated: boolean
  token: string | null
  login: (token: string) => void
  logout: () => void
}

const AdminContext = createContext<AdminContextType | undefined>(undefined)

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [token, setToken] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const storedToken = localStorage.getItem("admin_auth")
    if (storedToken) {
      setToken(storedToken)
      setIsAuthenticated(true)
    }
    setMounted(true)
  }, [])

  const login = (newToken: string) => {
    setToken(newToken)
    setIsAuthenticated(true)
    localStorage.setItem("admin_auth", newToken)
  }

  const logout = () => {
    setToken(null)
    setIsAuthenticated(false)
    localStorage.removeItem("admin_auth")
  }

  if (!mounted) return children

  return <AdminContext.Provider value={{ isAuthenticated, token, login, logout }}>{children}</AdminContext.Provider>
}

export function useAdminContext() {
  const context = useContext(AdminContext)
  if (!context) {
    throw new Error("useAdminContext must be used within AdminProvider")
  }
  return context
}
