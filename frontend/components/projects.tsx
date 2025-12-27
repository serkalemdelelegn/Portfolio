"use client"

import { Button } from "@/components/ui/button"
import { ExternalLink, Github } from "lucide-react"

const SAMPLE_PROJECTS = [
  {
    title: "E-Commerce Platform",
    description: "A full-featured e-commerce platform with real-time inventory management and payment integration",
    technologies: ["React", "Node.js", "MongoDB", "Stripe"],
    github: "https://github.com",
    demo: "https://vercel.app",
    image: "/modern-ecommerce-dashboard-ui.jpg",
  },
  {
    title: "Task Management App",
    description: "Collaborative task management with real-time updates and team features",
    technologies: ["Next.js", "TypeScript", "PostgreSQL", "WebSocket"],
    github: "https://github.com",
    demo: "https://vercel.app",
    image: "/minimalist-task-app-interface.jpg",
  },
  {
    title: "AI Chat Interface",
    description: "Modern chat interface powered by AI with context awareness and history",
    technologies: ["React", "OpenAI API", "Tailwind CSS", "Next.js"],
    github: "https://github.com",
    demo: "https://vercel.app",
    image: "/futuristic-ai-chat-ui.jpg",
  },
]

export default function Projects() {
  return (
    <section id="projects" className="py-32 px-4 bg-muted/30">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-xl text-left">
            <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-muted-foreground mb-6">
              / Projects Built by Me
            </h2>
            <p className="text-4xl md:text-5xl font-bold tracking-tighter uppercase leading-[0.9]">
              Selected <span className="text-accent">Works.</span>
            </p>
          </div>
          <p className="text-muted-foreground font-medium max-w-xs text-left md:text-right">
            A collection of projects exploring the boundaries of web technology.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
          {SAMPLE_PROJECTS.map((project, index) => (
            <div
              key={index}
              className="group flex flex-col h-full bg-card border border-border overflow-hidden hover:shadow-2xl transition-all duration-500"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                  <div className="flex gap-4">
                    <Button variant="secondary" size="icon" className="rounded-full shadow-lg">
                      <Github className="w-5 h-5" />
                    </Button>
                    <Button variant="secondary" size="icon" className="rounded-full shadow-lg">
                      <ExternalLink className="w-5 h-5" />
                    </Button>
                  </div>
                </div>
              </div>

              <div className="p-8 flex flex-col flex-grow">
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.slice(0, 3).map((tech, i) => (
                    <span key={i} className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                      {tech}
                      {i < 2 ? " •" : ""}
                    </span>
                  ))}
                </div>

                <h3 className="text-2xl font-bold mb-4 tracking-tight group-hover:text-accent transition-colors uppercase">
                  {project.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-8 flex-grow line-clamp-3">
                  {project.description}
                </p>

                <div className="pt-6 border-t border-border flex justify-between items-center">
                  <span className="text-xs font-bold uppercase tracking-widest">Case Study</span>
                  <ExternalLink className="w-4 h-4 text-muted-foreground" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
