"use client"

import { useState } from "react"
import { useLanguage } from "@/lib/language-context"
import { translations } from "@/lib/i18n"
import { Button } from "@/components/ui/button"
import { Plus, Trash2, Edit2 } from "lucide-react"

interface Skill {
  id: string
  name: string
  category: "frontend" | "backend" | "database" | "tools"
  level: "beginner" | "intermediate" | "advanced"
}

const SAMPLE_SKILLS: Skill[] = [
  { id: "1", name: "React", category: "frontend", level: "advanced" },
  { id: "2", name: "Node.js", category: "backend", level: "advanced" },
]

export default function SkillsPage() {
  const { language } = useLanguage()
  const [skills, setSkills] = useState<Skill[]>(SAMPLE_SKILLS)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState<Omit<Skill, "id">>({
    name: "",
    category: "frontend",
    level: "intermediate",
  })

  const t = (path: string) => {
    const keys = path.split(".")
    let value: any = translations[language]
    for (const key of keys) {
      value = value?.[key]
    }
    return value || path
  }

  const handleSave = () => {
    if (editingId) {
      setSkills(skills.map((s) => (s.id === editingId ? { ...formData, id: editingId } : s)))
      setEditingId(null)
    } else {
      setSkills([...skills, { ...formData, id: Date.now().toString() }])
    }
    setFormData({ name: "", category: "frontend", level: "intermediate" })
    setShowForm(false)
  }

  const handleDelete = (id: string) => {
    setSkills(skills.filter((s) => s.id !== id))
  }

  const handleEdit = (skill: Skill) => {
    setFormData({
      name: skill.name,
      category: skill.category,
      level: skill.level,
    })
    setEditingId(skill.id)
    setShowForm(true)
  }

  const categories = ["frontend", "backend", "database", "tools"]
  const levels = ["beginner", "intermediate", "advanced"]

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-bold">{t("admin.manage_skills")}</h1>
        <Button
          onClick={() => {
            setEditingId(null)
            setFormData({ name: "", category: "frontend", level: "intermediate" })
            setShowForm(!showForm)
          }}
          className="gap-2"
        >
          <Plus className="w-4 h-4" />
          {t("admin.add_new")}
        </Button>
      </div>

      {showForm && (
        <div className="bg-card p-8 rounded-xl border border-border mb-8 space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Skill Name</label>
            <input
              type="text"
              className="w-full px-4 py-2 rounded-lg bg-background border border-border focus:border-primary focus:outline-none"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g., React, TypeScript"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Category</label>
              <select
                className="w-full px-4 py-2 rounded-lg bg-background border border-border focus:border-primary focus:outline-none"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {t(`skills.${cat}`)}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Level</label>
              <select
                className="w-full px-4 py-2 rounded-lg bg-background border border-border focus:border-primary focus:outline-none"
                value={formData.level}
                onChange={(e) => setFormData({ ...formData, level: e.target.value as any })}
              >
                {levels.map((level) => (
                  <option key={level} value={level}>
                    {t(`skills.${level}`)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex gap-4">
            <Button onClick={handleSave} className="flex-1">
              {editingId ? "Update" : "Create"} Skill
            </Button>
            <Button onClick={() => setShowForm(false)} variant="outline" className="flex-1">
              {t("admin.cancel")}
            </Button>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {skills.map((skill) => (
          <div key={skill.id} className="p-6 rounded-xl bg-card border border-border flex justify-between items-center">
            <div>
              <h3 className="font-bold mb-2">{skill.name}</h3>
              <p className="text-sm text-muted-foreground">
                {t(`skills.${skill.category}`)} • {t(`skills.${skill.level}`)}
              </p>
            </div>
            <div className="flex gap-2">
              <Button onClick={() => handleEdit(skill)} variant="outline" size="sm">
                <Edit2 className="w-4 h-4" />
              </Button>
              <Button onClick={() => handleDelete(skill.id)} variant="outline" size="sm" className="text-destructive">
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
