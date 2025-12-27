"use client"

import { useLanguage } from "@/lib/language-context"
import { translations } from "@/lib/i18n"

export default function About() {
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
    <section id="about" className="py-32 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="grid lg:grid-cols-[1fr_2fr] gap-16 lg:gap-24">
          <div className="sticky top-32 h-fit">
            <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-primary/60 mb-8">/ {t("about.title")}</h2>
            <div className="space-y-4">
              <div className="h-1.5 w-16 bg-gradient-to-r from-primary via-accent to-violet-400 rounded-full"></div>
              <p className="text-4xl font-bold tracking-tighter leading-none uppercase">
                Creating <br />
                <span className="text-primary italic">beautiful</span> <br />
                <span className="text-accent">digital art.</span>
              </p>
            </div>
          </div>

          <div className="space-y-12">
            <div className="space-y-8">
              <p className="text-2xl md:text-3xl font-medium leading-tight text-foreground/90">
                I'm a developer passionate about crafting accessible, pixel-perfect user interfaces that blend
                thoughtful design with robust engineering.
              </p>
              <div className="space-y-6 text-lg text-muted-foreground leading-relaxed max-w-2xl">
                <p>
                  My work lies at the intersection of design and development, creating experiences that not only look
                  great but are meticulously built for performance and usability.
                </p>
                <p>
                  I contribute to the creation and maintenance of UI components that power modern web platforms,
                  ensuring accessibility standards and best practices to deliver an inclusive user experience.
                </p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-8 pt-12 border-t border-border">
              <div className="group">
                <div className="text-xs font-bold uppercase tracking-widest text-accent mb-4">Focus</div>
                <h3 className="text-xl font-bold mb-2">Full-Stack Architecture</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Building scalable systems using Next.js, Node.js, and modern distributed databases.
                </p>
              </div>
              <div className="group">
                <div className="text-xs font-bold uppercase tracking-widest text-accent mb-4">Philosophy</div>
                <h3 className="text-xl font-bold mb-2">User-Centric Design</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Every line of code is written with the end-user's experience and performance in mind.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
