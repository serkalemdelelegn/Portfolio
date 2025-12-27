"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { apiCall } from "@/lib/api-helpers"

export default function AboutPage() {
  const [content, setContent] = useState("")
  const [loading, setLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    loadAbout()
  }, [])

  const loadAbout = async () => {
    try {
      setLoading(true)
      const data = await apiCall("/api/admin/about")
      setContent(data.content || "")
    } catch (error) {
      console.error("Error loading about content:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    setIsSaving(true)
    try {
      await apiCall("/api/admin/about", {
        method: "POST",
        body: JSON.stringify({ content }),
      })
      alert("About content saved successfully!")
    } catch (error: any) {
      alert(error.message || "Failed to save content")
    } finally {
      setIsSaving(false)
    }
  }

  if (loading) {
    return (
      <div>
        <h1 className="text-4xl font-bold mb-8">Edit About Me</h1>
        <div className="text-center py-10">Loading...</div>
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">Edit About Me</h1>

      <div className="bg-card p-8 rounded-xl border border-border space-y-6">
        <div>
          <label className="block text-sm font-medium mb-4">About Me Content</label>
          <textarea
            rows={10}
            className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:border-primary focus:outline-none"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Enter your about me content here..."
          />
          <p className="text-xs text-muted-foreground mt-2">
            You can format your content with paragraphs. Keep it professional and recruiter-friendly.
          </p>
        </div>

        <Button onClick={handleSave} disabled={isSaving} className="w-full">
          {isSaving ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </div>
  )
}
