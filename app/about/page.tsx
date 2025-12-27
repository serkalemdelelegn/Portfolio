"use client"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import ThemeToggle from "@/components/theme-toggle"
import { Calendar, Award, Code, Heart } from "lucide-react"

export default function AboutPage() {

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors">
      <Navbar />
      <ThemeToggle />
      <main className="max-w-6xl mx-auto px-4 py-24">
        {/* <CHANGE> Hero Section with Image and Intro */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
          <div className="order-2 lg:order-1 space-y-6">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-primary">
              About Me
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Hi, I'm a passionate full-stack developer with a love for creating beautiful and functional web
              experiences. I specialize in modern JavaScript frameworks and have a keen eye for design.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              My journey in web development started 3 years ago, and since then I've been dedicated to crafting
              user-friendly applications that solve real-world problems. I believe in clean code, continuous learning,
              and collaborative teamwork.
            </p>
            <div className="flex gap-4 pt-4">
              <a
                href="mailto:contact@example.com"
                className="px-8 py-3 bg-primary text-white rounded-full hover:bg-primary/90 transition font-semibold"
              >
                Get in Touch
              </a>
              <a
                href="/resume.pdf"
                className="px-8 py-3 border-2 border-primary text-primary rounded-full hover:bg-primary/10 transition font-semibold"
              >
                Download Resume
              </a>
            </div>
          </div>

          <div className="order-1 lg:order-2 flex justify-center">
            <div className="relative">
              <div className="w-80 h-80 rounded-3xl overflow-hidden shadow-2xl shadow-primary/20 border-4 border-primary/20">
                <img
                  src="/images/img-1433-removebg-preview.png"
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-br from-accent to-primary rounded-3xl -z-10"></div>
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-gradient-to-br from-primary to-secondary rounded-3xl -z-10"></div>
            </div>
          </div>
        </div>

        {/* <CHANGE> Values/Philosophy Section */}
        <div className="mb-24">
          <h2 className="text-3xl font-bold mb-12 text-center">What I Value</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-card p-8 rounded-2xl border border-border hover:border-primary/50 transition-all hover:shadow-lg">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                <Heart className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">User-Centric Design</h3>
              <p className="text-muted-foreground leading-relaxed">
                Every project starts with understanding user needs. I create interfaces that are intuitive, accessible,
                and delightful to use.
              </p>
            </div>

            <div className="bg-card p-8 rounded-2xl border border-border hover:border-accent/50 transition-all hover:shadow-lg">
              <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center mb-6">
                <Code className="w-7 h-7 text-accent" />
              </div>
              <h3 className="text-xl font-bold mb-3">Clean Code</h3>
              <p className="text-muted-foreground leading-relaxed">
                Writing maintainable, scalable code is my priority. I follow best practices and stay updated with
                modern development standards.
              </p>
            </div>

            <div className="bg-card p-8 rounded-2xl border border-border hover:border-secondary/50 transition-all hover:shadow-lg">
              <div className="w-14 h-14 rounded-full bg-secondary/10 flex items-center justify-center mb-6">
                <Award className="w-7 h-7 text-secondary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Continuous Growth</h3>
              <p className="text-muted-foreground leading-relaxed">
                Technology evolves rapidly, and so do I. I'm committed to learning new tools and techniques to deliver
                the best solutions.
              </p>
            </div>
          </div>
        </div>

        {/* <CHANGE> Experience Timeline */}
        <div className="mb-24">
          <h2 className="text-3xl font-bold mb-12 text-center">My Journey</h2>
          <div className="relative max-w-4xl mx-auto">
            {/* Timeline line */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent to-secondary transform -translate-x-1/2" />

            <div className="space-y-16">
              {/* Experience Item 1 */}
              <div className="md:flex gap-8 items-center">
                <div className="flex-1 text-right md:pr-12">
                  <div className="bg-card p-6 rounded-2xl border border-border inline-block">
                    <h3 className="text-xl font-bold mb-2">Senior Full-Stack Developer</h3>
                    <p className="text-primary font-semibold mb-2">Tech Innovations Co.</p>
                    <p className="text-sm text-muted-foreground mb-3">2022 - Present</p>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      Leading development of enterprise web applications, mentoring junior developers, and implementing
                      modern architecture patterns.
                    </p>
                  </div>
                </div>
                <div className="hidden md:flex justify-center flex-shrink-0">
                  <div className="w-5 h-5 rounded-full bg-primary border-4 border-background shadow-lg" />
                </div>
                <div className="flex-1 md:pl-12" />
              </div>

              {/* Experience Item 2 */}
              <div className="md:flex gap-8 items-center md:flex-row-reverse">
                <div className="flex-1 text-left md:pl-12">
                  <div className="bg-card p-6 rounded-2xl border border-border inline-block">
                    <h3 className="text-xl font-bold mb-2">Full-Stack Developer</h3>
                    <p className="text-accent font-semibold mb-2">Creative Digital Agency</p>
                    <p className="text-sm text-muted-foreground mb-3">2020 - 2022</p>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      Developed responsive web applications for various clients, collaborated with designers, and
                      optimized performance for high-traffic sites.
                    </p>
                  </div>
                </div>
                <div className="hidden md:flex justify-center flex-shrink-0">
                  <div className="w-5 h-5 rounded-full bg-accent border-4 border-background shadow-lg" />
                </div>
                <div className="flex-1 md:pr-12" />
              </div>

              {/* Experience Item 3 */}
              <div className="md:flex gap-8 items-center">
                <div className="flex-1 text-right md:pr-12">
                  <div className="bg-card p-6 rounded-2xl border border-border inline-block">
                    <h3 className="text-xl font-bold mb-2">Junior Web Developer</h3>
                    <p className="text-secondary font-semibold mb-2">StartUp Labs</p>
                    <p className="text-sm text-muted-foreground mb-3">2019 - 2020</p>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      Started my professional journey building landing pages, learning best practices, and contributing
                      to team projects.
                    </p>
                  </div>
                </div>
                <div className="hidden md:flex justify-center flex-shrink-0">
                  <div className="w-5 h-5 rounded-full bg-secondary border-4 border-background shadow-lg" />
                </div>
                <div className="flex-1 md:pl-12" />
              </div>
            </div>
          </div>
        </div>

        {/* <CHANGE> Education & Certifications */}
        <div>
          <h2 className="text-3xl font-bold mb-12 text-center">Education & Certifications</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-card p-8 rounded-2xl border border-border">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-1">Bachelor's in Computer Science</h3>
                  <p className="text-primary text-sm font-semibold mb-2">University Name</p>
                  <p className="text-muted-foreground text-sm">2015 - 2019</p>
                </div>
              </div>
            </div>

            <div className="bg-card p-8 rounded-2xl border border-border">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <Award className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-1">AWS Certified Developer</h3>
                  <p className="text-accent text-sm font-semibold mb-2">Amazon Web Services</p>
                  <p className="text-muted-foreground text-sm">2021</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
