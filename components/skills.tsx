"use client"

import { useLanguage } from "@/lib/language-context"
import { translations } from "@/lib/i18n"

const SKILLS_DATA = {
  frontend: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Vue.js"],
  backend: ["Node.js", "Express", "Python", "PostgreSQL", "MongoDB"],
  database: ["PostgreSQL", "MongoDB", "Redis", "Prisma", "Supabase"],
  tools: ["Git", "Docker", "GitHub", "VS Code", "Figma"],
}

export default function Skills() {
  const { language } = useLanguage()
  const t = (path: string) => {
    const keys = path.split(".")
    let value: any = translations[language]
    for (const key of keys) {
      value = value?.[key]
    }
    return value || path
  }

  return (
    <section id="skills" className="py-20 px-4 bg-card">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">{t("skills.title")}</h2>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-primary mb-4">{t("skills.frontend")}</h3>
              <div className="flex flex-wrap gap-3">
                {SKILLS_DATA.frontend.map((skill, i) => (
                  <div
                    key={i}
                    className="px-4 py-2 rounded-lg bg-primary/10 border border-primary/20 text-sm font-medium text-primary hover:bg-primary/20 transition-colors"
                  >
                    {skill}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-secondary mb-4">{t("skills.database")}</h3>
              <div className="flex flex-wrap gap-3">
                {SKILLS_DATA.database.map((skill, i) => (
                  <div
                    key={i}
                    className="px-4 py-2 rounded-lg bg-secondary/10 border border-secondary/20 text-sm font-medium text-secondary hover:bg-secondary/20 transition-colors"
                  >
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-accent mb-4">{t("skills.backend")}</h3>
              <div className="flex flex-wrap gap-3">
                {SKILLS_DATA.backend.map((skill, i) => (
                  <div
                    key={i}
                    className="px-4 py-2 rounded-lg bg-accent/10 border border-accent/20 text-sm font-medium text-accent hover:bg-accent/20 transition-colors"
                  >
                    {skill}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-primary mb-4">{t("skills.tools")}</h3>
              <div className="flex flex-wrap gap-3">
                {SKILLS_DATA.tools.map((skill, i) => (
                  <div
                    key={i}
                    className="px-4 py-2 rounded-lg bg-primary/10 border border-primary/20 text-sm font-medium text-primary hover:bg-primary/20 transition-colors"
                  >
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
