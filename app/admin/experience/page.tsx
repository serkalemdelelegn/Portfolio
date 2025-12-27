"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Plus, Trash2, Edit2 } from "lucide-react"

interface Experience {
  id: string
  title: string
  company: string
  date: string
  description: string
}

const SAMPLE_EXPERIENCE: Experience[] = [
  {
    id: "1",
    title: "Senior Developer",
    company: "Tech Company",
    date: "2022 - Present",
    description: "Leading full-stack development projects",
  },
]

export default function ExperiencePage() {
  const [experiences, setExperiences] = useState<Experience[]>(SAMPLE_EXPERIENCE)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState<Omit<Experience, "id">>({
    title: "",
    company: "",
    date: "",
    description: "",
  })

  const handleSave = () => {
    if (editingId) {
      setExperiences(experiences.map((e) => (e.id === editingId ? { ...formData, id: editingId } : e)))
      setEditingId(null)
    } else {
      setExperiences([...experiences, { ...formData, id: Date.now().toString() }])
    }
    setFormData({ title: "", company: "", date: "", description: "" })
    setShowForm(false)
  }

  const handleDelete = (id: string) => {
    setExperiences(experiences.filter((e) => e.id !== id))
  }

  const handleEdit = (exp: Experience) => {
    setFormData({
      title: exp.title,
      company: exp.company,
      date: exp.date,
      description: exp.description,
    })
    setEditingId(exp.id)
    setShowForm(true)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-bold">Experience</h1>
        <Button
          onClick={() => {
            setEditingId(null)
            setFormData({ title: "", company: "", date: "", description: "" })
            setShowForm(!showForm)
          }}
          className="gap-2"
        >
          <Plus className="w-4 h-4" />
          Add New
        </Button>
      </div>

      {showForm && (
        <div className="bg-card p-8 rounded-xl border border-border mb-8 space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Job Title</label>
              <input
                type="text"
                className="w-full px-4 py-2 rounded-lg bg-background border border-border focus:border-primary focus:outline-none"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Senior Developer"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Company</label>
              <input
                type="text"
                className="w-full px-4 py-2 rounded-lg bg-background border border-border focus:border-primary focus:outline-none"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                placeholder="Tech Company"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Date Range</label>
            <input
              type="text"
              className="w-full px-4 py-2 rounded-lg bg-background border border-border focus:border-primary focus:outline-none"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              placeholder="2022 - Present"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Description</label>
            <textarea
              rows={4}
              className="w-full px-4 py-2 rounded-lg bg-background border border-border focus:border-primary focus:outline-none"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          <div className="flex gap-4">
            <Button onClick={handleSave} className="flex-1">
              {editingId ? "Update" : "Create"} Experience
            </Button>
            <Button onClick={() => setShowForm(false)} variant="outline" className="flex-1">
              Cancel
            </Button>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {experiences.map((exp) => (
          <div key={exp.id} className="p-6 rounded-xl bg-card border border-border">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-bold text-lg">{exp.title}</h3>
                <p className="text-sm text-primary font-medium">{exp.company}</p>
                <p className="text-sm text-muted-foreground">{exp.date}</p>
              </div>
              <div className="flex gap-2">
                <Button onClick={() => handleEdit(exp)} variant="outline" size="sm">
                  <Edit2 className="w-4 h-4" />
                </Button>
                <Button onClick={() => handleDelete(exp.id)} variant="outline" size="sm" className="text-destructive">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <p className="text-muted-foreground">{exp.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
