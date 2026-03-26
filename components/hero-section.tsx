"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { ScrambleTextOnHover } from "@/components/scramble-text"
import { SplitFlapText, SplitFlapMuteToggle, SplitFlapAudioProvider } from "@/components/split-flap-text"
import { AnimatedNoise } from "@/components/animated-noise"
import { BitmapChevron } from "@/components/bitmap-chevron"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const slideUp = {
  hidden: { y: 24 },
  visible: (i: number) => ({
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
}

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current || !contentRef.current) return

    const ctx = gsap.context(() => {
      gsap.to(contentRef.current, {
        y: -80,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="hero" className="relative min-h-screen flex items-center justify-center px-6 md:px-12">
      <AnimatedNoise opacity={0.02} />

      {/* Main content */}
      <div ref={contentRef} className="flex-1 w-full max-w-5xl flex flex-col items-center text-center">
        <SplitFlapAudioProvider>
          <div className="relative">
            <SplitFlapText text="VANTIX" speed={80} />
            <div className="mt-3">
              <SplitFlapMuteToggle />
            </div>
          </div>
        </SplitFlapAudioProvider>

        <motion.h2
          custom={0}
          variants={slideUp}
          initial="hidden"
          animate="visible"
          className="font-[var(--font-bebas)] text-foreground/90 text-[clamp(1.5rem,4vw,3rem)] mt-5 tracking-wide"
        >
          Build Faster. Scale Smarter.
        </motion.h2>

        <motion.p
          custom={1}
          variants={slideUp}
          initial="hidden"
          animate="visible"
          className="mt-4 max-w-lg font-mono text-sm md:text-base text-muted-foreground leading-relaxed"
        >
          SaaS and automation solutions for modern businesses. We build systems that perform — not just pages that render.
        </motion.p>

        {/* Trust indicators */}
        <motion.div
          custom={1.5}
          variants={slideUp}
          initial="hidden"
          animate="visible"
          className="mt-6 flex flex-wrap items-center gap-6 font-mono text-xs uppercase tracking-widest text-foreground/70"
        >
          <span>Next.js</span>
          <span className="w-1 h-1 bg-accent/40 rounded-full" />
          <span>Spring Boot</span>
          <span className="w-1 h-1 bg-accent/40 rounded-full" />
          <span>PostgreSQL</span>
          <span className="w-1 h-1 bg-accent/40 rounded-full" />
          <span>Cloud Native</span>
        </motion.div>

        <motion.div
          custom={2}
          variants={slideUp}
          initial="hidden"
          animate="visible"
          className="mt-10 flex flex-wrap items-center gap-5"
        >
          <a
            href="#cta"
            className="group inline-flex items-center gap-3 bg-accent text-accent-foreground px-8 py-3.5 font-mono text-xs uppercase tracking-widest hover:opacity-90 transition-all duration-300 hover:scale-[1.02]"
          >
            <ScrambleTextOnHover text="Get Started" as="span" duration={0.5} />
            <BitmapChevron className="transition-transform duration-300 ease-in-out group-hover:rotate-45" />
          </a>
          <a
            href="#cta"
            className="group inline-flex items-center gap-3 border border-foreground/20 px-8 py-3.5 font-mono text-xs uppercase tracking-widest text-foreground hover:border-accent hover:text-accent transition-all duration-300"
          >
            <ScrambleTextOnHover text="Book Demo" as="span" duration={0.5} />
          </a>
        </motion.div>
      </div>

      {/* Floating info tag */}
      <motion.div
        custom={3}
        variants={slideUp}
        initial="hidden"
        animate="visible"
        className="absolute bottom-8 right-8 md:bottom-12 md:right-12"
      >
        <div className="border border-border px-4 py-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          SaaS / Automation / Dashboards
        </div>
      </motion.div>
    </section>
  )
}
