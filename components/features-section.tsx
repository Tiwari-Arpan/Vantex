"use client"

import { useRef, useEffect } from "react"
import { HighlightText } from "@/components/highlight-text"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const features = [
  {
    number: "01",
    titleParts: [
      { text: "FAST", highlight: true },
      { text: " DELIVERY", highlight: false },
    ],
    description: "From concept to production in weeks, not months. We move fast without cutting corners.",
    align: "left" as const,
    bullets: [
      "Agile 2-week sprints with weekly demos",
      "Rapid prototyping → validated design → ship",
      "CI/CD from day one — deploy on every merge",
    ],
    stat: { value: "4–8", unit: "weeks", label: "avg. time to launch" },
  },
  {
    number: "02",
    titleParts: [
      { text: "SCALABLE ", highlight: false },
      { text: "ARCHITECTURE", highlight: true },
    ],
    description: "Built to grow with your business. Cloud-native infrastructure designed for 10x scale.",
    align: "right" as const,
    bullets: [
      "Multi-tenant SaaS patterns out of the box",
      "Microservices when you need them, monolith when you don't",
      "Auto-scaling infrastructure on AWS / GCP",
    ],
    stat: { value: "10x", unit: "", label: "scale-ready from day one" },
  },
  {
    number: "03",
    titleParts: [
      { text: "RELIABLE", highlight: true },
      { text: " SYSTEMS", highlight: false },
    ],
    description: "99.9% uptime, zero compromises. Battle-tested architectures that don't go down.",
    align: "left" as const,
    bullets: [
      "Automated monitoring & alerting pipelines",
      "Redundant deployments across availability zones",
      "Comprehensive error tracking & incident response",
    ],
    stat: { value: "99.9%", unit: "", label: "uptime guarantee" },
  },
]

export function FeaturesSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const featuresRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current || !headerRef.current || !featuresRef.current) return

    const ctx = gsap.context(() => {
      gsap.from(headerRef.current, {
        x: -40,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      })

      const articles = featuresRef.current?.querySelectorAll("article")
      articles?.forEach((article, index) => {
        const isRight = features[index].align === "right"
        gsap.from(article, {
          x: isRight ? 50 : -50,
          opacity: 0,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: article,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="features" className="relative py-20 md:py-24 pl-6 md:pl-28 pr-6 md:pr-12 section-layer-alt">
      {/* Section header */}
      <div ref={headerRef} className="mb-16">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">03 / Features</span>
        <h2 className="mt-3 font-[var(--font-bebas)] text-5xl md:text-7xl tracking-tight">WHY VANTIX</h2>
        <p className="mt-3 max-w-md font-mono text-sm text-muted-foreground leading-relaxed">
          Engineering excellence at every layer. Here&apos;s what sets us apart.
        </p>
      </div>

      {/* Features */}
      <div ref={featuresRef} className="space-y-16 md:space-y-20">
        {features.map((feature, index) => (
          <article
            key={index}
            className={`flex flex-col ${
              feature.align === "right" ? "items-end text-right" : "items-start text-left"
            }`}
          >
            {/* Annotation label */}
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-3">
              {feature.number} / {feature.titleParts[0].text.trim().split(" ")[0]}
            </span>

            <h3 className="font-[var(--font-bebas)] text-4xl md:text-6xl lg:text-7xl tracking-tight leading-none">
              {feature.titleParts.map((part, i) =>
                part.highlight ? (
                  <HighlightText key={i} parallaxSpeed={0.4}>
                    {part.text}
                  </HighlightText>
                ) : (
                  <span key={i}>{part.text}</span>
                ),
              )}
            </h3>

            {/* Description */}
            <p className="mt-4 max-w-lg font-mono text-sm text-muted-foreground leading-relaxed">
              {feature.description}
            </p>

            {/* Supporting bullets */}
            <ul className={`mt-4 space-y-1.5 max-w-lg ${feature.align === "right" ? "text-right" : "text-left"}`}>
              {feature.bullets.map((bullet, i) => (
                <li key={i} className={`flex items-center gap-2 font-mono text-xs text-foreground/50 ${feature.align === "right" ? "flex-row-reverse" : ""}`}>
                  <span className="w-1 h-1 bg-accent/50 rounded-full flex-shrink-0" />
                  {bullet}
                </li>
              ))}
            </ul>

            {/* Stat badge */}
            <div className={`mt-5 flex items-baseline gap-2 ${feature.align === "right" ? "flex-row-reverse" : ""}`}>
              <span className="font-[var(--font-bebas)] text-3xl text-accent">{feature.stat.value}</span>
              <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                {feature.stat.unit} {feature.stat.label}
              </span>
            </div>

            {/* Decorative line */}
            <div className={`mt-6 h-[1px] bg-border w-20 md:w-32 ${feature.align === "right" ? "mr-0" : "ml-0"}`} />
          </article>
        ))}
      </div>
    </section>
  )
}
