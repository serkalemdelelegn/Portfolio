"use client"

import { useLanguage } from "@/lib/language-context"
import { translations } from "@/lib/i18n"

const EXPERIENCE_DATA = [
  {
    title: "Senior Developer",
    company: "Tech Company",
    date: "2022 - Present",
    description: "Leading full-stack development projects and mentoring junior developers",
  },
  {
    title: "Full Stack Developer",
    company: "Startup XYZ",
    date: "2020 - 2022",
    description: "Developed and maintained multiple web applications with modern tech stack",
  },
  {
    title: "Junior Developer",
    company: "First Company",
    date: "2019 - 2020",
    description: "Started my career learning full-stack web development fundamentals",
  },
]

export default function Experience() {
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
    <section id="experience" className="py-20 px-4 bg-background">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">{t("experience.title")}</h2>

        <div className="relative">
          {/* Timeline line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-accent to-secondary transform -translate-x-1/2" />

          <div className="space-y-12">
            {EXPERIENCE_DATA.map((exp, index) => (
              <div key={index} className={`md:flex gap-8 ${index % 2 === 0 ? "md:flex-row-reverse" : ""}`}>
                {/* Timeline dot */}
                <div className="hidden md:flex justify-center items-start flex-1">
                  <div className="w-6 h-6 rounded-full bg-primary border-4 border-background relative z-10 mt-2" />
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="bg-card p-8 rounded-xl border border-border hover:border-primary/50 transition-colors">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-xl font-bold">{exp.title}</h3>
                      <span className="text-xs text-muted-foreground">{exp.date}</span>
                    </div>
                    <p className="text-primary font-medium mb-3">{exp.company}</p>
                    <p className="text-muted-foreground">{exp.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
