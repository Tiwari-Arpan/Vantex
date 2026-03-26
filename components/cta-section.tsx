"use client"

import { useRef, useEffect } from "react"
import { ScrambleTextOnHover } from "@/components/scramble-text"
import { BitmapChevron } from "@/components/bitmap-chevron"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function CtaSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const footerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      if (contentRef.current) {
        gsap.fromTo(
          contentRef.current,
          { y: 30 },
          {
            y: 0,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: contentRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          },
        )
      }

      if (footerRef.current) {
        gsap.from(footerRef.current, {
          y: 20,
          duration: 0.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 95%",
            toggleActions: "play none none reverse",
          },
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="cta"
      className="relative py-20 md:py-24 pl-6 md:pl-28 pr-6 md:pr-12 border-t border-border/30 section-layer-alt"
    >
      {/* Main CTA */}
      <div ref={contentRef} className="text-center max-w-3xl mx-auto mb-20">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent block mb-4">
          05 / Let&apos;s Build
        </span>

        <h2 className="font-[var(--font-bebas)] text-5xl md:text-7xl lg:text-8xl tracking-tight mb-5">
          READY TO BUILD<br />SOMETHING GREAT?
        </h2>

        <p className="font-mono text-sm md:text-base text-muted-foreground leading-relaxed max-w-xl mx-auto mb-8">
          Whether you&apos;re launching a new SaaS product, automating operations, or need a powerful internal tool — we&apos;re ready to build it.
        </p>

        <div className="flex flex-wrap justify-center items-center gap-5">
          <a
            href="mailto:hello@vantix.dev"
            className="group inline-flex items-center gap-3 bg-accent text-accent-foreground px-8 py-3.5 font-mono text-xs uppercase tracking-widest hover:opacity-90 transition-all duration-300 hover:scale-[1.02]"
          >
            <ScrambleTextOnHover text="Get Started" as="span" duration={0.5} />
            <BitmapChevron className="transition-transform duration-300 ease-in-out group-hover:rotate-45" />
          </a>
          <a
            href="mailto:hello@vantix.dev"
            className="group inline-flex items-center gap-3 border border-foreground/20 px-8 py-3.5 font-mono text-xs uppercase tracking-widest text-foreground hover:border-accent hover:text-accent transition-all duration-300"
          >
            <ScrambleTextOnHover text="Book Demo" as="span" duration={0.5} />
          </a>
        </div>
      </div>

      {/* Footer */}
      <div
        ref={footerRef}
        className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 mb-10"
      >
        <div>
          <h4 className="font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground mb-3">Company</h4>
          <ul className="space-y-1.5">
            <li className="font-mono text-xs text-foreground/80">Vantix</li>
            <li className="font-mono text-xs text-foreground/80">SaaS Studio</li>
          </ul>
        </div>

        <div>
          <h4 className="font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground mb-3">Services</h4>
          <ul className="space-y-1.5">
            <li className="font-mono text-xs text-foreground/80">SaaS Development</li>
            <li className="font-mono text-xs text-foreground/80">Automation</li>
            <li className="font-mono text-xs text-foreground/80">Dashboards</li>
          </ul>
        </div>

        <div>
          <h4 className="font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground mb-3">Stack</h4>
          <ul className="space-y-1.5">
            <li className="font-mono text-xs text-foreground/80">Next.js</li>
            <li className="font-mono text-xs text-foreground/80">Spring Boot</li>
            <li className="font-mono text-xs text-foreground/80">PostgreSQL</li>
          </ul>
        </div>

        <div>
          <h4 className="font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground mb-3">Contact</h4>
          <ul className="space-y-1.5">
            <li>
              <a href="mailto:hello@vantix.dev" className="font-mono text-xs text-foreground/80 hover:text-accent transition-colors duration-200">
                Email
              </a>
            </li>
            <li>
              <a href="#" className="font-mono text-xs text-foreground/80 hover:text-accent transition-colors duration-200">
                Twitter/X
              </a>
            </li>
            <li>
              <a href="#" className="font-mono text-xs text-foreground/80 hover:text-accent transition-colors duration-200">
                LinkedIn
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom copyright */}
      <div className="pt-6 border-t border-border/20 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <p className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">
          © 2025 Vantix. All rights reserved.
        </p>
        <p className="font-mono text-[10px] text-muted-foreground">
          Built with precision. Engineered for scale.
        </p>
      </div>
    </section>
  )
}
