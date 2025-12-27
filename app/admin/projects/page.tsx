"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Plus, Trash2, Edit2 } from "lucide-react"

interface Project {
  id: string
  title: string
  description: string
  technologies: string[]
  github: string
  demo: string
}

const SAMPLE_PROJECTS: Project[] = [
  {
    id: "1",
    title: "E-Commerce Platform",
    description: "A full-featured e-commerce platform",
    technologies: ["React", "Node.js", "MongoDB"],
    github: "https://github.com",
    demo: "https://vercel.app",
  },
]

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>(SAMPLE_PROJECTS)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState<Omit<Project, "id">>({
    title: "",
    description: "",
    technologies: [],
    github: "",
    demo: "",
  })

  const handleSave = () => {
    if (editingId) {
      setProjects(projects.map((p) => (p.id === editingId ? { ...formData, id: editingId } : p)))
      setEditingId(null)
    } else {
      setProjects([...projects, { ...formData, id: Date.now().toString() }])
    }
    setFormData({ title: "", description: "", technologies: [], github: "", demo: "" })
    setShowForm(false)
  }

  const handleDelete = (id: string) => {
    setProjects(projects.filter((p) => p.id !== id))
  }

  const handleEdit = (project: Project) => {
    setFormData({
      title: project.title,
      description: project.description,
      technologies: project.technologies,
      github: project.github,
      demo: project.demo,
    })
    setEditingId(project.id)
    setShowForm(true)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-bold">Projects</h1>
        <Button
          onClick={() => {
            setEditingId(null)
            setFormData({ title: "", description: "", technologies: [], github: "", demo: "" })
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
          <div>
            <label className="block text-sm font-medium mb-2">Title</label>
            <input
              type="text"
              className="w-full px-4 py-2 rounded-lg bg-background border border-border focus:border-primary focus:outline-none"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
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

          <div>
            <label className="block text-sm font-medium mb-2">Technologies (comma separated)</label>
            <input
              type="text"
              className="w-full px-4 py-2 rounded-lg bg-background border border-border focus:border-primary focus:outline-none"
              value={formData.technologies.join(", ")}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  technologies: e.target.value.split(",").map((t) => t.trim()),
                })
              }
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">GitHub Link</label>
              <input
                type="url"
                className="w-full px-4 py-2 rounded-lg bg-background border border-border focus:border-primary focus:outline-none"
                value={formData.github}
                onChange={(e) => setFormData({ ...formData, github: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Demo Link</label>
              <input
                type="url"
                className="w-full px-4 py-2 rounded-lg bg-background border border-border focus:border-primary focus:outline-none"
                value={formData.demo}
                onChange={(e) => setFormData({ ...formData, demo: e.target.value })}
              />
            </div>
          </div>

          <div className="flex gap-4">
            <Button onClick={handleSave} className="flex-1">
              {editingId ? "Update" : "Create"} Project
            </Button>
            <Button onClick={() => setShowForm(false)} variant="outline" className="flex-1">
              Cancel
            </Button>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {projects.map((project) => (
          <div
            key={project.id}
            className="p-6 rounded-xl bg-card border border-border flex justify-between items-start"
          >
            <div className="flex-1">
              <h3 className="font-bold text-lg mb-2">{project.title}</h3>
              <p className="text-muted-foreground mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, i) => (
                  <span key={i} className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex gap-2 ml-4">
              <Button onClick={() => handleEdit(project)} variant="outline" size="sm">
                <Edit2 className="w-4 h-4" />
              </Button>
              <Button onClick={() => handleDelete(project.id)} variant="outline" size="sm" className="text-destructive">
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
