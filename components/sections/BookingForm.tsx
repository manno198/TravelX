"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import { MapPin, Calendar, Clock, Users, CreditCard, CheckCircle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useTransportTypes } from "@/hooks/useTransportTypes"
import { useBookings } from "@/hooks/useBookings"
import { useAuth } from "@/contexts/AuthContext"
import { useNotification } from "@/contexts/NotificationContext"
import Threads from "@/components/ui/Threads"

export function BookingForm() {
  const searchParams = useSearchParams()
  const { user } = useAuth()
  const { transportTypes, loading } = useTransportTypes()
  const { createBooking } = useBookings()
  const { showNotification } = useNotification()

  // Pre-fill transportType from query param if present
  const transportParam = searchParams.get("transport")

  const [formData, setFormData] = useState({
    pickup: "",
    dropoff: "",
    date: "",
    time: "",
    transportType: transportParam || "",
    passengers: 1,
  })

  useEffect(() => {
    // If the param changes (e.g. via navigation), update the form
    if (transportParam && transportParam !== formData.transportType) {
      setFormData((prev) => ({ ...prev, transportType: transportParam }))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transportParam])

  const [estimatedPrice, setEstimatedPrice] = useState(0)
  const [submitLoading, setSubmitLoading] = useState(false)
  const [bookingSuccess, setBookingSuccess] = useState(false)

  const calculatePrice = (transportTypeId: string) => {
    const transport = transportTypes.find((t) => t.id === transportTypeId)
    if (!transport) return 0
    const estimatedDistance = Math.random() * 20 + 5 // 5-25 km
    return transport.base_price + transport.price_per_km * estimatedDistance
  }

  const handleTransportTypeChange = (typeId: string) => {
    setFormData((prev) => ({ ...prev, transportType: typeId }))
    setEstimatedPrice(calculatePrice(typeId))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) {
      showNotification("error", "Authentication Required", "Please sign in to book a ride.")
      return
    }
    if (!formData.transportType) {
      showNotification("warning", "Transport Type Required", "Please select a transport type.")
      return
    }
    setSubmitLoading(true)
    try {
      const bookingData = {
        transport_type_id: formData.transportType,
        pickup_location: formData.pickup,
        dropoff_location: formData.dropoff,
        estimated_price: estimatedPrice,
        booking_time: new Date(`${formData.date}T${formData.time}`).toISOString(),
        distance_km: Math.random() * 20 + 5,
      }
      const { data, error } = await createBooking(bookingData)
      if (!error) {
        showNotification(
          "success",
          "Booking Confirmed!",
          `Your ride from ${formData.pickup} to ${formData.dropoff} has been successfully booked.`
        )
        setFormData({
          pickup: "",
          dropoff: "",
          date: "",
          time: "",
          transportType: "",
          passengers: 1,
        })
        setEstimatedPrice(0)
        setBookingSuccess(true)
        setTimeout(() => setBookingSuccess(false), 3000)
      } else {
        showNotification("error", "Booking Failed", `There was an error creating your booking: ${(error as any)?.message || 'Unknown error'}`)
      }
    } catch (error) {
      showNotification("error", "Booking Error", `An unexpected error occurred: ${error instanceof Error ? error.message : 'Unknown error'}`)
    } finally {
      setSubmitLoading(false)
    }
  }

  return (
    <section className="py-20 bg-[#FDFCFB] relative">
      {/* Wavy Lines Background - contained within section only */}
      <div className="absolute inset-0 z-0">
        <Threads 
          color={[0, 6, 1]} // Black lines
          amplitude={1}
          distance={2}
          enableMouseInteraction={false}
          className="w-full h-full"
        />
      </div>

      {/* Content positioned in front of wavy lines */}
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl mb-4 font-bold text-[#333333]">Book Your Ride</h2>
          <p className="text-xl text-[#666666] max-w-2xl mx-auto">
            Quick and easy booking process with real-time price calculation
          </p>
        </motion.div>
        <div className="max-w-4xl mx-auto relative z-20">
          <Card className="p-8 bg-white border border-gray-200 shadow-lg">
            {bookingSuccess ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-[#333333] mb-4">Booking Confirmed!</h3>
                <p className="text-[#666666] mb-6">
                  Your ride has been successfully booked. You can view your booking history in the dashboard.
                </p>
                <Button
                  onClick={() => setBookingSuccess(false)}
                  className="bg-[#FF6B00] hover:bg-[#E55A00] text-white"
                >
                  Book Another Ride
                </Button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Location Inputs */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="pickup" className="text-[#333333] font-medium">
                      <MapPin className="inline w-4 h-4 mr-2" />
                      Pickup Location
                    </Label>
                    <Input
                      id="pickup"
                      type="text"
                      placeholder="Enter pickup address"
                      value={formData.pickup}
                      onChange={(e) => setFormData((prev) => ({ ...prev, pickup: e.target.value }))}
                      required
                      className="border-gray-300 focus:border-[#FF6B00] focus:ring-[#FF6B00] text-[#333333] placeholder:text-[#999999]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dropoff" className="text-[#333333] font-medium">
                      <MapPin className="inline w-4 h-4 mr-2" />
                      Dropoff Location
                    </Label>
                    <Input
                      id="dropoff"
                      type="text"
                      placeholder="Enter destination address"
                      value={formData.dropoff}
                      onChange={(e) => setFormData((prev) => ({ ...prev, dropoff: e.target.value }))}
                      required
                      className="border-gray-300 focus:border-[#FF6B00] focus:ring-[#FF6B00] text-[#333333] placeholder:text-[#999999]"
                    />
                  </div>
                </div>
                {/* Date and Time */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="date" className="text-[#333333] font-medium">
                      <Calendar className="inline w-4 h-4 mr-2" />
                      Date
                    </Label>
                    <Input
                      id="date"
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData((prev) => ({ ...prev, date: e.target.value }))}
                      required
                      className="border-gray-300 focus:border-[#FF6B00] focus:ring-[#FF6B00] text-[#333333]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="time" className="text-[#333333] font-medium">
                      <Clock className="inline w-4 h-4 mr-2" />
                      Time
                    </Label>
                    <Input
                      id="time"
                      type="time"
                      value={formData.time}
                      onChange={(e) => setFormData((prev) => ({ ...prev, time: e.target.value }))}
                      required
                      className="border-gray-300 focus:border-[#FF6B00] focus:ring-[#FF6B00] text-[#333333]"
                    />
                  </div>
                </div>
                {/* Transport Type and Passengers */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="transportType" className="text-[#333333] font-medium">
                      Transport Type
                    </Label>
                    {loading ? (
                      <div className="h-10 bg-gray-100 rounded-md flex items-center px-3 text-[#666666]">
                        Loading transport types...
                      </div>
                    ) : (
                      <Select value={formData.transportType} onValueChange={handleTransportTypeChange}>
                        <SelectTrigger className="border-gray-300 focus:border-[#FF6B00] focus:ring-[#FF6B00] text-[#333333] bg-white h-10 w-full">
                          <SelectValue placeholder="Select transport type" className="text-[#999999]" />
                        </SelectTrigger>
                        <SelectContent 
                          className="bg-white border border-gray-200 shadow-lg z-[9999] min-w-[200px]"
                          position="popper"
                          sideOffset={4}
                          align="start"
                        >
                          {transportTypes.length > 0 ? (
                            transportTypes.map((type) => (
                              <SelectItem 
                                key={type.id} 
                                value={type.id}
                                className="text-[#333333] hover:bg-[#FF6B00]/10 hover:text-[#FF6B00] cursor-pointer py-2"
                              >
                                <span className="mr-2">{type.icon}</span>
                                {type.name} - From ${type.base_price}
                              </SelectItem>
                            ))
                          ) : (
                            <SelectItem value="" disabled className="text-[#666666]">
                              No transport types available
                            </SelectItem>
                          )}
                        </SelectContent>
                      </Select>
                    )}
                    {/* Debug info */}
                    <div className="text-xs text-[#666666] mt-1">
                      Available types: {transportTypes.length} | Loading: {loading.toString()}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="passengers" className="text-[#333333] font-medium">
                      <Users className="inline w-4 h-4 mr-2" />
                      Passengers
                    </Label>
                    <Input
                      id="passengers"
                      type="number"
                      min="1"
                      max="10"
                      value={formData.passengers}
                      onChange={(e) => setFormData((prev) => ({ ...prev, passengers: parseInt(e.target.value) }))}
                      className="border-gray-300 focus:border-[#FF6B00] focus:ring-[#FF6B00] text-[#333333]"
                    />
                  </div>
                </div>
                {/* Price Estimate */}
                {estimatedPrice > 0 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-4 bg-[#FF6B00]/10 border border-[#FF6B00]/20 rounded-lg"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-[#333333] font-medium">Estimated Price</p>
                        <p className="text-[#666666] text-sm">Based on distance and transport type</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-[#FF6B00]">${estimatedPrice.toFixed(2)}</p>
                      </div>
                    </div>
                  </motion.div>
                )}
                {/* Submit Button */}
                <div className="flex items-center justify-center pt-6">
                  <Button
                    type="submit"
                    disabled={submitLoading || !user}
                    className="bg-[#FF6B00] hover:bg-[#E55A00] text-white px-8 py-3 text-lg"
                  >
                    {submitLoading ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Creating Booking...</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <CreditCard className="w-5 h-5" />
                        <span>Confirm Booking</span>
                      </div>
                    )}
                  </Button>
                </div>
                {!user && (
                  <div className="text-center p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <p className="text-yellow-800">
                      Please <a href="/auth/signin" className="text-[#FF6B00] font-medium underline">sign in</a> to book a ride.
                    </p>
                  </div>
                )}
              </form>
            )}
          </Card>
        </div>
      </div>
    </section>
  )
}
