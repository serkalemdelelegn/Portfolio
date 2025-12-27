"use client"
import { useEffect, useState } from "react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

interface Skill {
  id: string
  category: string
  skills: string[]
}

export default function SkillsPage() {

  const [skillsData, setSkillsData] = useState<Skill[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/skills")
      .then((res) => res.json())
      .then((data) => {
        setSkillsData(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors">
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 py-20">
        <div className="space-y-12">
          <h1 className="text-4xl md:text-5xl font-bold text-primary">Skills</h1>

          {loading ? (
            <div className="text-center py-10">Loading...</div>
          ) : skillsData.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-8">
              {skillsData.map((skillGroup) => (
                <div key={skillGroup.id} className="space-y-4">
                  <h3 className="text-2xl font-semibold text-secondary">{skillGroup.category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {skillGroup.skills.map((skill) => (
                      <span key={skill} className="px-4 py-2 bg-primary/20 text-primary rounded-lg text-sm font-medium">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10">No skills yet.</div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
