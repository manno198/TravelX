"use client"

import { motion } from "framer-motion"
import { Star, Quote } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import Threads from "@/components/ui/Threads"

export function Testimonials() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Business Executive",
      company: "TechCorp Inc.",
      rating: 5,
      text: "TransportX has revolutionized our corporate travel. The real-time tracking and seamless booking process have saved us countless hours.",
      avatar: "SJ",
    },
    {
      name: "Michael Chen",
      role: "Frequent Traveler",
      company: "Freelance Consultant",
      rating: 5,
      text: "The AI-powered route optimization is incredible. I've never experienced such efficient transportation in any city I've visited.",
      avatar: "MC",
    },
    {
      name: "Emily Rodriguez",
      role: "Marketing Manager",
      company: "StartupXYZ",
      rating: 5,
      text: "The analytics dashboard provides valuable insights into our travel patterns. It's like having a personal travel assistant.",
      avatar: "ER",
    },
  ]

  return (
    <section className="py-20 relative bg-[#FDFCFB]">
      {/* Wavy Lines Background - contained within section only */}
      <div className="absolute inset-0 z-0">
        <Threads 
          color={[0, 3, 0]} // Black lines
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
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl mb-4 font-bold text-[#333333]">What Our Users Say</h2>
          <p className="text-xl text-[#666666] max-w-3xl mx-auto">
            Join thousands of satisfied customers who trust TransportX for their daily transportation needs
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-20">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
            >
              <Card className="h-full p-6 bg-white border border-gray-200 shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-[#FF6B00] to-[#4A90E2] rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#333333]">{testimonial.name}</h3>
                    <p className="text-sm text-[#666666]">{testimonial.role} at {testimonial.company}</p>
                  </div>
                </div>

                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={16} className="text-[#FF6B00] fill-current" />
                  ))}
                </div>

                <div className="relative">
                  <Quote className="absolute -top-2 -left-2 text-[#FF6B00] opacity-20" size={24} />
                  <p className="text-[#666666] leading-relaxed pl-6">{testimonial.text}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16 relative z-20"
        >
          <Card className="p-8 bg-gradient-to-r from-[#FF6B00]/10 to-[#4A90E2]/10 border border-[#FF6B00]/20">
            <h3 className="text-2xl font-bold text-[#333333] mb-4">Ready to Experience TransportX?</h3>
            <p className="text-[#666666] mb-6 max-w-2xl mx-auto">
              Join our growing community of satisfied users and discover the future of transportation today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-[#FF6B00] hover:bg-[#E55A00] text-white px-8 py-3 rounded-lg font-semibold transition-colors">
                Get Started Now
              </button>
              <button className="border border-[#FF6B00] text-[#FF6B00] hover:bg-[#FF6B00] hover:text-white px-8 py-3 rounded-lg font-semibold transition-colors">
                Learn More
              </button>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
