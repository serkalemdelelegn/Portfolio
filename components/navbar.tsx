"use client"

import { useLanguage } from "@/lib/language-context"
import { translations } from "@/lib/i18n"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useEffect, useState } from "react"
import { Moon, Sun } from "lucide-react"

export default function Navbar() {
  const { language, setLanguage } = useLanguage()
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

  const t = (path: string) => {
    const keys = path.split(".")
    let value: any = translations[language]
    for (const key of keys) {
      value = value?.[key]
    }
    return value || path
  }

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold tracking-tighter">
          SERK
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link href="/about" className="text-sm hover:text-primary transition-colors">
            {t("nav.about")}
          </Link>
          <Link href="/projects" className="text-sm hover:text-primary transition-colors">
            {t("nav.projects")}
          </Link>
          <Link href="/skills" className="text-sm hover:text-primary transition-colors">
            {t("nav.skills")}
          </Link>
          <Link href="/experience" className="text-sm hover:text-primary transition-colors">
            {t("nav.experience")}
          </Link>
          <Link href="/contact" className="text-sm hover:text-primary transition-colors">
            {t("nav.contact")}
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex gap-1 bg-muted p-1 rounded-lg">
            <Button
              variant={language === "en" ? "default" : "ghost"}
              size="sm"
              onClick={() => setLanguage("en")}
              className="text-xs px-2 h-7"
            >
              EN
            </Button>
            <Button
              variant={language === "am" ? "default" : "ghost"}
              size="sm"
              onClick={() => setLanguage("am")}
              className="text-xs px-2 h-7"
            >
              AM
            </Button>
          </div>

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
