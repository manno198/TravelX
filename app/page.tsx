import { HeroSection } from "@/components/sections/HeroSection"
import { ServiceCards } from "@/components/sections/ServiceCards"
import { BookingForm } from "@/components/sections/BookingForm"
import { FeatureHighlight } from "@/components/sections/FeatureHighlight"
import { Testimonials } from "@/components/sections/Testimonials"

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ServiceCards />
      <BookingForm />
      <FeatureHighlight />
      <Testimonials />
    </>
  )
}
