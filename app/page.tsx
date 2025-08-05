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
      <BookingForm />
      <FeatureHighlight />
      <Testimonials />
    </div>
  )
}
