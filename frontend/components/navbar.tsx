"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useEffect, useState } from "react"
import { Moon, Sun } from "lucide-react"

export default function Navbar() {
  const [isDark, setIsDark] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains("dark")
    setIsDark(isDarkMode)
    setMounted(true)
  }, [])

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove("dark")
      localStorage.setItem("theme", "light")
      setIsDark(false)
    } else {
      document.documentElement.classList.add("dark")
      localStorage.setItem("theme", "dark")
      setIsDark(true)
    }
  }

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="text-sm hover:text-primary transition-colors">
            Home
          </Link>
          <Link href="/about" className="text-sm hover:text-primary transition-colors">
            About
          </Link>
          <Link href="/projects" className="text-sm hover:text-primary transition-colors">
            Projects
          </Link>
          <Link href="/skills" className="text-sm hover:text-primary transition-colors">
            Skills
          </Link>
          <Link href="/experience" className="text-sm hover:text-primary transition-colors">
            Experience
          </Link>
          <Link href="/contact" className="text-sm hover:text-primary transition-colors">
            Contact
          </Link>
        </div>

        <div className="flex items-center gap-3">
          {mounted && (
            <Button onClick={toggleTheme} size="icon" variant="ghost" className="h-9 w-9">
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>
          )}
        </div>
      </div>
    </nav>
  )
}
