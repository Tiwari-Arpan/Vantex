"use client"

import { useRef, useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const testimonials = [
  {
    quote: "Vantix turned our idea into a fully functional SaaS platform in under 8 weeks. Their technical depth and speed of execution was unlike anything we'd experienced before.",
    author: "Arjun Mehta",
    role: "Founder, CampusCafe",
    metric: "8 weeks to launch",
  },
  {
    quote: "The automation systems they built saved us 20+ hours per week. Their team understood our operations deeply and built exactly what we needed — nothing more, nothing less.",
    author: "Priya Sharma",
    role: "Operations Lead, ScaleOps",
    metric: "20+ hrs saved/week",
  },
  {
    quote: "Clean code, zero downtime, and a dashboard that our entire team actually enjoys using. Vantix delivers engineering that just works.",
    author: "Rahul Verma",
    role: "CTO, DataBridge",
    metric: "99.9% uptime",
  },
]

export function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { x: -40 },
          {
            x: 0,
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

      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll("article")
        gsap.fromTo(
          cards,
          { y: 30 },
          {
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cardsRef.current,
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
    <section id="testimonials" ref={sectionRef} className="relative py-20 md:py-24 pl-6 md:pl-28 pr-6 md:pr-12">
      {/* Section header */}
      <div ref={headerRef} className="mb-12">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">04 / Testimonials</span>
        <h2 className="mt-3 font-[var(--font-bebas)] text-5xl md:text-7xl tracking-tight">WHAT THEY SAY</h2>
      </div>

      {/* Testimonial cards */}
      <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {testimonials.map((testimonial, index) => (
          <article
            key={index}
            className="group relative border border-border/40 p-7 flex flex-col transition-all duration-400 hover:border-accent/40 hover:-translate-y-1"
          >
            {/* Background hover */}
            <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

            {/* Quote mark */}
            <span className="relative z-10 font-[var(--font-bebas)] text-5xl text-accent/30 leading-none mb-3">&ldquo;</span>

            {/* Quote */}
            <p className="relative z-10 font-mono text-sm text-foreground/80 leading-relaxed mb-6 flex-1">
              {testimonial.quote}
            </p>

            {/* Metric badge */}
            <div className="relative z-10 mb-5">
              <span className="font-mono text-[10px] uppercase tracking-widest text-accent border border-accent/30 px-2.5 py-1">
                {testimonial.metric}
              </span>
            </div>

            {/* Author */}
            <div className="relative z-10 border-t border-border/30 pt-4">
              <span className="font-mono text-xs text-foreground/90 block">{testimonial.author}</span>
              <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest mt-0.5 block">
                {testimonial.role}
              </span>
            </div>

            {/* Corner accent */}
            <div className="absolute bottom-0 left-0 w-10 h-10 transition-all duration-400 opacity-0 group-hover:opacity-100">
              <div className="absolute bottom-0 left-0 w-full h-[1px] bg-accent" />
              <div className="absolute bottom-0 left-0 w-[1px] h-full bg-accent" />
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
