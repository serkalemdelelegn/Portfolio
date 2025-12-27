"use client"

import { useLanguage } from "@/lib/language-context"
import { translations } from "@/lib/i18n"
import { FileText, Briefcase, Code2, Trophy } from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  const { language } = useLanguage()
  const t = (path: string) => {
    const keys = path.split(".")
    let value: any = translations[language]
    for (const key of keys) {
      value = value?.[key]
    }
    return value || path
  }

  const dashboardItems = [
    { title: "About Me", icon: FileText, href: "/admin/about", color: "text-primary" },
    { title: "Projects", icon: Code2, href: "/admin/projects", color: "text-accent" },
    { title: "Skills", icon: Trophy, href: "/admin/skills", color: "text-secondary" },
    { title: "Experience", icon: Briefcase, href: "/admin/experience", color: "text-primary" },
  ]

  return (
    <div>
      <h1 className="text-4xl font-bold mb-2">{t("admin.dashboard")}</h1>
      <p className="text-muted-foreground mb-8">Manage your portfolio content</p>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {dashboardItems.map((item) => (
          <Link key={item.href} href={item.href}>
            <div className="p-6 rounded-xl bg-card border border-border hover:border-primary/50 cursor-pointer transition-all hover:shadow-lg h-full">
              <item.icon className={`w-12 h-12 ${item.color} mb-4`} />
              <h3 className="font-semibold">{item.title}</h3>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Quick Stats</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-6 rounded-xl bg-card border border-border">
            <div className="text-3xl font-bold text-primary">5</div>
            <p className="text-muted-foreground">Total Projects</p>
          </div>
          <div className="p-6 rounded-xl bg-card border border-border">
            <div className="text-3xl font-bold text-accent">20+</div>
            <p className="text-muted-foreground">Skills Listed</p>
          </div>
          <div className="p-6 rounded-xl bg-card border border-border">
            <div className="text-3xl font-bold text-secondary">3+</div>
            <p className="text-muted-foreground">Years Experience</p>
          </div>
        </div>
      </div>
    </div>
  )
}
