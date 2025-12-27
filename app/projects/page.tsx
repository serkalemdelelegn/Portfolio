"use client"
import { useEffect, useState } from "react"
import { useLanguage } from "@/lib/language-context"
import { translations } from "@/lib/i18n"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

interface Project {
  id: string
  title: string
  description: string
  technologies: string[]
  image: string
  github?: string
  demo?: string
}

export default function ProjectsPage() {
  const { language } = useLanguage()
  const t = (path: string) => {
    const keys = path.split(".")
    let value: any = translations[language]
    for (const key of keys) {
      value = value?.[key]
    }
    return value || path
  }

  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/projects")
      .then((res) => res.json())
      .then((data) => {
        setProjects(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors">
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 py-20">
        <div className="space-y-12">
          <h1 className="text-4xl md:text-5xl font-bold text-primary">{t("nav.projects")}</h1>

          {loading ? (
            <div className="text-center py-10">Loading...</div>
          ) : projects.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-8">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="bg-secondary/10 rounded-lg overflow-hidden hover:shadow-lg transition border border-border"
                >
                  {project.image && (
                    <div className="w-full h-64 overflow-hidden bg-muted">
                      <img
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <div className="p-6 space-y-4">
                    <h3 className="text-xl font-semibold text-primary">{project.title}</h3>
                    <p className="text-foreground opacity-80">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <span key={tech} className="px-3 py-1 bg-primary/20 text-primary text-sm rounded-full">
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-3 pt-4">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-opacity-90 transition text-sm"
                          rel="noreferrer"
                        >
                          GitHub
                        </a>
                      )}
                      {project.demo && (
                        <a
                          href={project.demo}
                          target="_blank"
                          className="px-4 py-2 bg-secondary text-white rounded-lg hover:bg-opacity-90 transition text-sm"
                          rel="noreferrer"
                        >
                          Demo
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10">No projects yet.</div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
