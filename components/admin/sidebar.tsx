"use client"

import { useRouter } from "next/navigation"
import { useLanguage } from "@/lib/language-context"
import { translations } from "@/lib/i18n"
import { Button } from "@/components/ui/button"
import { LayoutGrid, FileText, Code2, Trophy, Briefcase, LogOut } from "lucide-react"
import Link from "next/link"

export default function AdminSidebar() {
  const router = useRouter()
  const { language } = useLanguage()

  const t = (path: string) => {
    const keys = path.split(".")
    let value: any = translations[language]
    for (const key of keys) {
      value = value?.[key]
    }
    return value || path
  }

  const handleLogout = () => {
    localStorage.removeItem("admin_auth")
    router.push("/admin/login")
  }

  const menuItems = [
    { icon: LayoutGrid, label: "Dashboard", href: "/admin/dashboard" },
    { icon: FileText, label: "About Me", href: "/admin/about" },
    { icon: Code2, label: "Projects", href: "/admin/projects" },
    { icon: Trophy, label: "Skills", href: "/admin/skills" },
    { icon: Briefcase, label: "Experience", href: "/admin/experience" },
  ]

  return (
    <aside className="w-64 bg-card border-r border-border flex flex-col">
      <div className="p-6 border-b border-border">
        <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Serk Admin
        </h1>
      </div>

      <nav className="flex-1 overflow-auto p-4 space-y-2">
        {menuItems.map((item) => (
          <Link key={item.href} href={item.href}>
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left text-sm font-medium hover:bg-primary/10 text-muted-foreground hover:text-primary transition-colors">
              <item.icon className="w-5 h-5" />
              {item.label}
            </button>
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-border">
        <Button onClick={handleLogout} variant="outline" className="w-full justify-start gap-2 bg-transparent">
          <LogOut className="w-4 h-4" />
          {t("admin.logout")}
        </Button>
      </div>
    </aside>
  )
}
