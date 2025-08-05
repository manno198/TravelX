"use client"

import { motion } from "framer-motion"
import { ArrowRight, Play, Zap, Shield, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import Threads from "@/components/ui/Threads"

export function HeroSection() {
  const features = [
    { icon: Zap, text: "Instant Booking" },
    { icon: Shield, text: "Secure Payments" },
    { icon: Clock, text: "24/7 Support" },
  ]

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#FDFCFB]">
      {/* Wavy Lines Background - extended to cover feature cards */}
      <div className="absolute inset-0 z-0" style={{ height: '120%', bottom: '-20%' }}>
        <Threads 
          color={[0, 3, 0]} // Black lines
          amplitude={1}
          distance={2}
          enableMouseInteraction={false}
          className="w-full h-full"
        />
      </div>

      {/* Hero Content - positioned in front of wavy lines */}
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Main Hero Card */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <Card className="p-12 mb-8 bg-white border border-gray-200 shadow-lg relative z-20">
              <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} transition={{ duration: 0.6, delay: 0.2 }}>
                <h1 className="text-4xl md:text-6xl lg:text-7xl mb-4 font-bold text-[#333333]">
                  Revolutionary Transport
                </h1>
                <h2 className="text-4xl md:text-6xl lg:text-7xl mb-8 font-bold text-[#FF6B00]">
                  Booking Platform
                </h2>
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="text-xl md:text-2xl text-[#666666] mb-8 max-w-3xl mx-auto leading-relaxed"
              >
                Experience the future of transportation with real-time analytics, seamless booking, and AI-powered route
                optimization.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
                className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              >
                <Link href="/booking">
                  <Button size="lg" className="bg-[#FF6B00] hover:bg-[#E55A00] text-white group">
                    Start Booking
                    <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                  </Button>
                </Link>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center space-x-2 text-[#666666] hover:text-[#FF6B00] transition-colors"
                >
                  <div className="w-12 h-12 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-[#FF6B00] transition-colors">
                    <Play size={20} />
                  </div>
                  <span>Watch Demo</span>
                </motion.button>
              </motion.div>
            </Card>
          </motion.div>

          {/* Feature Cards */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-20"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4 + index * 0.2 }}
              >
                <Card className="text-center p-6 bg-white border border-gray-200 shadow-sm">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 360 }}
                    transition={{ duration: 0.5 }}
                    className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-[#FF6B00] to-[#4A90E2] rounded-full flex items-center justify-center"
                  >
                    <feature.icon size={24} className="text-white" />
                  </motion.div>
                  <h3 className="text-lg font-semibold text-[#333333] mb-2">{feature.text}</h3>
                  <p className="text-[#666666] text-sm">
                    Experience seamless and secure transportation services with our advanced platform.
                  </p>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
