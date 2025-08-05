import { Suspense } from "react"
import { BookingForm } from "@/components/sections/BookingForm"

export default function BookingPage() {
  return (
    <div className="pt-20">
      <Suspense fallback={<div className="py-20 text-center">Loading booking form...</div>}>
        <BookingForm />
      </Suspense>
    </div>
  )
}
