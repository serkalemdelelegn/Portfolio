"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Hero() {
  return (
    <section className="min-h-[90vh] flex items-center justify-center px-4 pt-20 pb-20">
      <div className="container mx-auto text-center max-w-4xl">
        <div className="mb-10 inline-block">
          <div className="w-48 h-48 rounded-full bg-gradient-to-br from-primary/30 via-accent/30 to-violet-500/20 p-1.5 mx-auto mb-8 flex items-center justify-center overflow-hidden border-2 border-primary/10 shadow-xl shadow-primary/10">
            <img
              src="/images/img-1433-removebg-preview.png"
              alt="Profile"
              className="w-full h-full rounded-full object-cover transition-all duration-500 hover:scale-105"
            />
          </div>
        </div>

        <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-[0.9] tracking-tighter text-balance uppercase text-primary">
          Serkalem
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground mb-12 text-pretty max-w-2xl mx-auto font-medium">
          Building elegant solutions with clean code
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <Link href="#projects">
            <Button size="lg" className="rounded-full px-8 h-14 text-base font-bold uppercase tracking-widest">
              View Projects
            </Button>
          </Link>
          <Link
            href="#contact"
            className="text-sm font-bold uppercase tracking-widest hover:text-accent transition-colors"
          >
            Contact Me →
          </Link>
        </div>

        <div className="mt-32 grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-y border-border/50">
          <div className="text-left">
            <div className="text-4xl font-bold tracking-tighter mb-1">5+</div>
            <div className="text-xs uppercase tracking-widest text-muted-foreground font-bold">
              Projects Built by Me
            </div>
          </div>
          <div className="text-left">
            <div className="text-4xl font-bold tracking-tighter mb-1">3+</div>
            <div className="text-xs uppercase tracking-widest text-muted-foreground font-bold">Years Experience</div>
          </div>
          <div className="text-left">
            <div className="text-4xl font-bold tracking-tighter mb-1">20+</div>
            <div className="text-xs uppercase tracking-widest text-muted-foreground font-bold">Skills</div>
          </div>
          <div className="text-left">
            <div className="text-4xl font-bold tracking-tighter mb-1">10+</div>
            <div className="text-xs uppercase tracking-widest text-muted-foreground font-bold">Happy Clients</div>
          </div>
        </div>
      </div>
    </section>
  )
}
