"use client"

import { useRef, useEffect } from "react"
import { cn } from "@/lib/utils"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const services = [
  {
    number: "01",
    title: "SaaS Development",
    description: "Custom SaaS platforms built for scale. From MVP to full product — we architect, build, and ship robust cloud applications.",
    tags: ["Web Apps", "APIs", "Cloud"],
    highlights: ["Multi-tenant architecture", "CI/CD pipelines", "Payment integration"],
  },
  {
    number: "02",
    title: "Automation Systems",
    description: "Streamline operations with intelligent automation. Reduce manual work, eliminate bottlenecks, and let systems handle the repetitive.",
    tags: ["Workflows", "Integrations", "AI"],
    highlights: ["20+ hrs saved/week avg", "Custom integrations", "AI-powered agents"],
  },
  {
    number: "03",
    title: "Dashboard & Internal Tools",
    description: "Data-driven dashboards for better decisions. Real-time analytics, admin panels, and internal tools built for your team.",
    tags: ["Analytics", "Admin", "Data"],
    highlights: ["Real-time data sync", "Role-based access", "Custom reporting"],
  },
]

export function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current || !headerRef.current || !gridRef.current) return

    const ctx = gsap.context(() => {
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

      const cards = gridRef.current?.querySelectorAll("article")
      if (cards) {
        gsap.fromTo(
          cards,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: gridRef.current,
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
    <section id="services" ref={sectionRef} className="relative py-20 md:py-24 pl-6 md:pl-28 pr-6 md:pr-12 section-layer-alt">
      {/* Section header */}
      <div ref={headerRef} className="mb-12">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">01 / Services</span>
        <h2 className="mt-3 font-[var(--font-bebas)] text-5xl md:text-7xl tracking-tight">WHAT WE BUILD</h2>
        <p className="mt-3 max-w-md font-mono text-sm text-muted-foreground leading-relaxed">
          End-to-end solutions engineered for performance, built to last.
        </p>
      </div>

      {/* Service cards grid */}
      <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {services.map((service, index) => (
          <ServiceCard key={index} service={service} />
        ))}
      </div>
    </section>
  )
}

function ServiceCard({
  service,
}: {
  service: { number: string; title: string; description: string; tags: string[]; highlights: string[] }
}) {
  return (
    <article
      className={cn(
        "group relative border border-border/40 p-7 flex flex-col",
        "transition-all duration-400 ease-out",
        "hover:border-accent/60 hover:-translate-y-1 hover:scale-[1.01]",
      )}
    >
      {/* Background layer */}
      <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

      {/* Number */}
      <span className="relative z-10 font-mono text-xs uppercase tracking-[0.3em] text-foreground/50 mb-5">
        No. {service.number}
      </span>

      {/* Title */}
      <h3 className="relative z-10 font-[var(--font-bebas)] text-2xl md:text-3xl tracking-tight mb-3 group-hover:text-accent transition-colors duration-300">
        {service.title}
      </h3>

      {/* Divider */}
      <div className="relative z-10 w-10 h-px bg-accent/60 mb-4 group-hover:w-full transition-all duration-400" />

      {/* Description */}
      <p className="relative z-10 font-mono text-xs text-muted-foreground leading-relaxed mb-5">
        {service.description}
      </p>

      {/* Highlights */}
      <ul className="relative z-10 mb-5 space-y-1.5">
        {service.highlights.map((h, i) => (
          <li key={i} className="flex items-center gap-2 font-mono text-[11px] text-foreground/60">
            <span className="w-1 h-1 bg-accent/60 rounded-full flex-shrink-0" />
            {h}
          </li>
        ))}
      </ul>

      {/* Tags */}
      <div className="relative z-10 flex flex-wrap gap-2 mt-auto">
        {service.tags.map((tag, i) => (
          <span
            key={i}
            className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground/60 border border-border/40 px-2.5 py-0.5 group-hover:border-accent/30 transition-colors duration-300"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Corner accent */}
      <div className={cn(
        "absolute top-0 right-0 w-10 h-10 transition-all duration-400",
        "opacity-0 group-hover:opacity-100",
      )}>
        <div className="absolute top-0 right-0 w-full h-[1px] bg-accent" />
        <div className="absolute top-0 right-0 w-[1px] h-full bg-accent" />
      </div>
    </article>
  )
}
