"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

const SAMPLE_ABOUT =
  "I'm a passionate full-stack developer with a love for creating beautiful, functional digital experiences. With expertise in modern JavaScript frameworks, I craft solutions that bridge the gap between design and functionality."

export default function AboutPage() {
  const [content, setContent] = useState(SAMPLE_ABOUT)
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = async () => {
    setIsSaving(true)
    try {
      await fetch("/api/admin/about", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content }),
      })
    } catch (err) {
      console.error(err)
    } finally {
      setIsSaving(false)
    }
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
