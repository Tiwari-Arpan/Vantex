import { HeroSection } from "@/components/hero-section"
import { ServicesSection } from "@/components/services-section"
import { ShowcaseSection } from "@/components/showcase-section"
import { FeaturesSection } from "@/components/features-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { CtaSection } from "@/components/cta-section"
import { SideNav } from "@/components/side-nav"
import { InteractiveGrid } from "@/components/interactive-grid"

export default function Page() {
  return (
    <main className="relative min-h-screen">
      <SideNav />
      <InteractiveGrid />

      <div className="relative z-10">
        <HeroSection />
        <ServicesSection />
        <ShowcaseSection />
        <FeaturesSection />
        <TestimonialsSection />
        <CtaSection />
      </div>
    </main>
  )
}
