"use client"
import { useEffect, useState } from "react"
import { useLanguage } from "@/lib/language-context"
import { translations } from "@/lib/i18n"
import Navbar from "@/components/navbar"
import ThemeToggle from "@/components/theme-toggle"
import Footer from "@/components/footer"

interface Experience {
  id: string
  company: string
  position: string
  startDate: string
  endDate: string
  description: string
  technologies: string[]
}

export default function ExperiencePage() {
  const { language } = useLanguage()
  const t = (path: string) => {
    const keys = path.split(".")
    let value: any = translations[language]
    for (const key of keys) {
      value = value?.[key]
    }
    return value || path
  }

  const [experiences, setExperiences] = useState<Experience[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/experience")
      .then((res) => res.json())
      .then((data) => {
        setExperiences(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors">
      <Navbar />
      <ThemeToggle />
      <main className="max-w-4xl mx-auto px-4 py-20">
        <div className="space-y-12">
          <h1 className="text-4xl md:text-5xl font-bold text-primary">{t("nav.experience")}</h1>

          {loading ? (
            <div className="text-center py-10">Loading...</div>
          ) : experiences.length > 0 ? (
            <div className="space-y-8">
              {experiences.map((exp) => (
                <div key={exp.id} className="border-l-4 border-primary pl-6 space-y-3">
                  <h3 className="text-2xl font-semibold text-primary">{exp.position}</h3>
                  <p className="text-lg font-medium text-secondary">{exp.company}</p>
                  <p className="text-sm text-foreground opacity-70">
                    {exp.startDate} - {exp.endDate}
                  </p>
                  <p className="text-foreground opacity-80">{exp.description}</p>
                  {exp.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-2">
                      {exp.technologies.map((tech) => (
                        <span key={tech} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded">
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10">No experience yet.</div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
