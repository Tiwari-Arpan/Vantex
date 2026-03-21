"use client"

import { useRef, useEffect } from "react"
import { cn } from "@/lib/utils"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ScrambleTextOnHover } from "@/components/scramble-text"
import { BitmapChevron } from "@/components/bitmap-chevron"

gsap.registerPlugin(ScrollTrigger)

export function ShowcaseSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { x: -40, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          },
        )
      }

      if (cardRef.current) {
        gsap.fromTo(
          cardRef.current,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cardRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          },
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="showcase" ref={sectionRef} className="relative py-20 md:py-24 pl-6 md:pl-28 pr-6 md:pr-12">
      {/* Section header */}
      <div ref={headerRef} className="mb-12 flex items-end justify-between">
        <div>
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">02 / Showcase</span>
          <h2 className="mt-3 font-[var(--font-bebas)] text-5xl md:text-7xl tracking-tight">FEATURED PROJECT</h2>
        </div>
        <p className="hidden md:block max-w-xs font-mono text-xs text-muted-foreground text-right leading-relaxed">
          Real products built with real impact.
        </p>
      </div>

      {/* CampusCafe showcase card */}
      <div ref={cardRef} className="group relative">
        <div className="relative border border-border/40 overflow-hidden transition-all duration-400 hover:border-accent/60">
          {/* Browser frame mock */}
          <div className="flex items-center gap-2 px-5 py-3 border-b border-border/30 bg-card/50">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-muted-foreground/20" />
              <div className="w-2.5 h-2.5 rounded-full bg-muted-foreground/20" />
              <div className="w-2.5 h-2.5 rounded-full bg-muted-foreground/20" />
            </div>
            <div className="flex-1 mx-4">
              <div className="max-w-sm mx-auto bg-background/50 border border-border/30 px-4 py-1 font-mono text-[10px] text-muted-foreground text-center tracking-wider">
                campuscafe.app
              </div>
            </div>
          </div>

          {/* Content area */}
          <div className="p-6 md:p-12 bg-gradient-to-b from-card/30 to-background">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
              {/* Left: Info */}
              <div>
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent mb-3 block">
                  SaaS Product
                </span>
                <h3 className="font-[var(--font-bebas)] text-5xl md:text-6xl tracking-tight mb-4 group-hover:text-accent transition-colors duration-300">
                  CampusCafe
                </h3>
                <div className="w-12 h-px bg-accent/60 mb-5 group-hover:w-20 transition-all duration-400" />
                <p className="font-mono text-sm text-muted-foreground leading-relaxed mb-6">
                  A full-stack food ordering platform for university campuses. Students browse menus, place orders, and
                  track delivery in real-time. Merchants manage orders through a dedicated dashboard.
                </p>

                {/* Key metrics */}
                <div className="grid grid-cols-3 gap-3 mb-6">
                  {[
                    { value: "500+", label: "Users" },
                    { value: "12K+", label: "Orders" },
                    { value: "99.9%", label: "Uptime" },
                  ].map((metric, i) => (
                    <div key={i}>
                      <div className="font-[var(--font-bebas)] text-2xl text-accent">{metric.value}</div>
                      <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mt-0.5">
                        {metric.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Tech stack */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {["Next.js", "Spring Boot", "PostgreSQL", "Redis", "Razorpay"].map((tech, i) => (
                    <span
                      key={i}
                      className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground/60 border border-border/40 px-2.5 py-1 group-hover:border-accent/30 transition-colors duration-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <a
                  href="#"
                  className="group/btn inline-flex items-center gap-3 border border-foreground/20 px-5 py-2.5 font-mono text-xs uppercase tracking-widest text-foreground hover:border-accent hover:text-accent transition-all duration-300"
                >
                  <ScrambleTextOnHover text="View Project" as="span" duration={0.5} />
                  <BitmapChevron className="transition-transform duration-300 ease-in-out group-hover/btn:rotate-45" />
                </a>
              </div>

              {/* Right: Visual representation */}
              <div className="relative">
                <div className="space-y-3">
                  {/* Mock dashboard cards */}
                  <div className="border border-border/30 p-5 bg-card/20">
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Today&apos;s Orders</span>
                      <span className="font-[var(--font-bebas)] text-xl text-accent">147</span>
                    </div>
                    <div className="flex gap-1 h-10 items-end">
                      {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 88].map((h, i) => (
                        <div
                          key={i}
                          className="flex-1 bg-accent/20 group-hover:bg-accent/40 transition-colors duration-300"
                          style={{ height: `${h}%` }}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="border border-border/30 p-4 bg-card/20">
                      <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground block mb-1">Revenue</span>
                      <span className="font-[var(--font-bebas)] text-lg text-foreground/80">₹24,500</span>
                    </div>
                    <div className="border border-border/30 p-4 bg-card/20">
                      <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground block mb-1">Avg. Time</span>
                      <span className="font-[var(--font-bebas)] text-lg text-foreground/80">12 min</span>
                    </div>
                  </div>

                  <div className="border border-border/30 p-4 bg-card/20">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground block mb-2">Recent Orders</span>
                    {[
                      { name: "Veg Thali", status: "Delivered", time: "2m ago" },
                      { name: "Cold Coffee", status: "Preparing", time: "5m ago" },
                      { name: "Paneer Wrap", status: "Ready", time: "8m ago" },
                    ].map((order, i) => (
                      <div key={i} className="flex items-center justify-between py-1.5 border-t border-border/20 first:border-0">
                        <span className="font-mono text-xs text-foreground/70">{order.name}</span>
                        <div className="flex items-center gap-3">
                          <span className={cn(
                            "font-mono text-[10px] uppercase",
                            order.status === "Delivered" ? "text-accent" :
                            order.status === "Ready" ? "text-foreground/60" :
                            "text-muted-foreground"
                          )}>
                            {order.status}
                          </span>
                          <span className="font-mono text-[10px] text-muted-foreground/40">{order.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mid-page CTA */}
      <div className="mt-12 flex flex-col md:flex-row items-center justify-between border border-border/30 p-6 md:p-8 bg-card/10">
        <div>
          <h4 className="font-[var(--font-bebas)] text-2xl md:text-3xl tracking-tight">Have a project in mind?</h4>
          <p className="font-mono text-xs text-muted-foreground mt-1">Let&apos;s discuss how we can help bring your idea to life.</p>
        </div>
        <a
          href="#cta"
          className="mt-4 md:mt-0 group inline-flex items-center gap-3 bg-accent text-accent-foreground px-6 py-3 font-mono text-xs uppercase tracking-widest hover:opacity-90 transition-all duration-300 hover:scale-[1.02]"
        >
          <ScrambleTextOnHover text="Start a Project" as="span" duration={0.5} />
          <BitmapChevron className="transition-transform duration-300 ease-in-out group-hover:rotate-45" />
        </a>
      </div>
    </section>
  )
}
