"use client"

import type React from "react"

import { useState } from "react"
import { useLanguage } from "@/lib/language-context"
import { translations } from "@/lib/i18n"
import { Button } from "@/components/ui/button"

export default function Contact() {
  const { language } = useLanguage()
  const [formData, setFormData] = useState({ name: "", email: "", message: "" })

  const t = (path: string) => {
    const keys = path.split(".")
    let value: any = translations[language]
    for (const key of keys) {
      value = value?.[key]
    }
    return value || path
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    alert(t("contact.success"))
    setFormData({ name: "", email: "", message: "" })
  }

  return (
    <section id="contact" className="py-20 px-4 bg-card">
      <div className="container mx-auto max-w-2xl">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center">{t("contact.title")}</h2>
        <p className="text-center text-muted-foreground mb-12">{t("contact.description")}</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Name</label>
            <input
              type="text"
              required
              className="w-full px-4 py-2 rounded-lg bg-background border border-border focus:border-primary focus:outline-none transition-colors"
              placeholder="Your name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">{t("contact.email")}</label>
            <input
              type="email"
              required
              className="w-full px-4 py-2 rounded-lg bg-background border border-border focus:border-primary focus:outline-none transition-colors"
              placeholder="your.email@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Message</label>
            <textarea
              required
              rows={6}
              className="w-full px-4 py-2 rounded-lg bg-background border border-border focus:border-primary focus:outline-none transition-colors resize-none"
              placeholder="Your message"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            />
          </div>

          <Button type="submit" size="lg" className="w-full bg-primary hover:bg-primary/90">
            {t("contact.send")}
          </Button>
        </form>
      </div>
    </section>
  )
}
