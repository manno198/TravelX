"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Business Executive",
      avatar: "/placeholder.svg?height=80&width=80",
      rating: 5,
      text: "TransportX has revolutionized my daily commute. The real-time tracking and seamless booking experience make it my go-to transportation solution.",
      location: "New York, NY",
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Software Developer",
      avatar: "/placeholder.svg?height=80&width=80",
      rating: 5,
      text: "The analytics dashboard is incredible! I can track all my trips, expenses, and even optimize my routes. Perfect for tech-savvy users.",
      location: "San Francisco, CA",
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "Marketing Manager",
      avatar: "/placeholder.svg?height=80&width=80",
      rating: 5,
      text: "Outstanding service quality and the clean UI design is absolutely stunning. The user experience makes the whole platform feel modern and professional.",
      location: "Austin, TX",
    },
    {
      id: 4,
      name: "David Thompson",
      role: "Entrepreneur",
      avatar: "/placeholder.svg?height=80&width=80",
      rating: 5,
      text: "The premium service is worth every penny. Professional drivers, luxury vehicles, and the app's attention to detail is remarkable.",
      location: "Miami, FL",
    },
    {
      id: 5,
      name: "Lisa Park",
      role: "Designer",
      avatar: "/placeholder.svg?height=80&width=80",
      rating: 5,
      text: "As a designer, I appreciate the beautiful interface and smooth interactions. The user experience is absolutely top-notch.",
      location: "Los Angeles, CA",
    },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [testimonials.length])

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section className="py-20 relative overflow-hidden bg-[#FDFCFB]">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl mb-4 font-bold text-[#333333]">What Our Users Say</h2>
          <p className="text-xl text-[#666666] max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust TransportX for their daily transportation needs
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto relative">
          {/* Main Testimonial Display */}
          <div className="relative h-96 mb-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0"
              >
                <Card className="h-full bg-white border border-gray-200 shadow-lg">
                  <CardContent className="p-8 h-full flex flex-col justify-center">
                    <div className="text-center">
                      {/* Quote Icon */}
                      <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-r from-[#FF6B00] to-[#4A90E2] rounded-full flex items-center justify-center">
                        <Quote size={24} className="text-white" />
                      </div>

                      {/* Testimonial Text */}
                      <p className="text-lg text-[#666666] leading-relaxed mb-8 italic">
                        "{testimonials[currentIndex].text}"
                      </p>

                      {/* Rating */}
                      <div className="flex justify-center mb-6">
                        {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                          <Star key={i} size={20} className="text-[#FF6B00] fill-current" />
                        ))}
                      </div>

                      {/* User Info */}
                      <div className="flex items-center justify-center space-x-4">
                        <div className="w-16 h-16 bg-gradient-to-r from-[#FF6B00] to-[#4A90E2] rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-lg">
                            {testimonials[currentIndex].name.charAt(0)}
                          </span>
                        </div>
                        <div className="text-left">
                          <h4 className="font-semibold text-[#333333]">{testimonials[currentIndex].name}</h4>
                          <p className="text-[#666666] text-sm">{testimonials[currentIndex].role}</p>
                          <p className="text-[#999999] text-xs">{testimonials[currentIndex].location}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Controls */}
          <div className="flex justify-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={prevTestimonial}
              className="w-12 h-12 bg-white border border-gray-300 rounded-full flex items-center justify-center hover:border-[#FF6B00] hover:text-[#FF6B00] transition-colors"
            >
              <ChevronLeft size={20} />
            </motion.button>

            {/* Dots Indicator */}
            <div className="flex space-x-2 items-center">
              {testimonials.map((_, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.2 }}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentIndex ? "bg-[#FF6B00]" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={nextTestimonial}
              className="w-12 h-12 bg-white border border-gray-300 rounded-full flex items-center justify-center hover:border-[#FF6B00] hover:text-[#FF6B00] transition-colors"
            >
              <ChevronRight size={20} />
            </motion.button>
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            <Card className="bg-white border border-gray-200 shadow-sm text-center">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-[#FF6B00] mb-2">10K+</div>
                <div className="text-[#666666] text-sm">Happy Customers</div>
              </CardContent>
            </Card>
            <Card className="bg-white border border-gray-200 shadow-sm text-center">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-[#4A90E2] mb-2">4.9/5</div>
                <div className="text-[#666666] text-sm">Average Rating</div>
              </CardContent>
            </Card>
            <Card className="bg-white border border-gray-200 shadow-sm text-center">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-[#FF6B00] mb-2">50+</div>
                <div className="text-[#666666] text-sm">Cities Covered</div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
