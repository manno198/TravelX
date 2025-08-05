import { Suspense } from "react"
import { HeroSection } from "@/components/sections/HeroSection"
import { ServiceCards } from "@/components/sections/ServiceCards"
import { BookingForm } from "@/components/sections/BookingForm"
import { FeatureHighlight } from "@/components/sections/FeatureHighlight"
import { Testimonials } from "@/components/sections/Testimonials"

export default function HomePage() {
  return (
    <div className="relative min-h-screen bg-white">
      <HeroSection />
      <ServiceCards />
      <Suspense fallback={<div className="py-20 text-center">Loading booking form...</div>}>
        <BookingForm />
      </Suspense>
      <FeatureHighlight />
      <Testimonials />
    </div>
  )
}
