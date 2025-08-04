"use client"

import { motion } from "framer-motion"
import {
  Zap,
  Shield,
  BarChart3,
  MapPin,
  Clock,
  CreditCard,
  Smartphone,
  Users,
  Star,
  Headphones,
  Globe,
  Award,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export function FeatureHighlight() {
  const features = [
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Book rides in seconds with our optimized booking system",
      color: "from-[#FF6B00] to-[#E55A00]",
    },
    {
      icon: Shield,
      title: "Secure & Safe",
      description: "End-to-end encryption and verified drivers for your safety",
      color: "from-[#4A90E2] to-[#357ABD]",
    },
    {
      icon: BarChart3,
      title: "Smart Analytics",
      description: "Track expenses, routes, and optimize your travel patterns",
      color: "from-[#FF6B00] to-[#E55A00]",
    },
    {
      icon: MapPin,
      title: "Real-time Tracking",
      description: "Live GPS tracking for all your rides and deliveries",
      color: "from-[#4A90E2] to-[#357ABD]",
    },
    {
      icon: Clock,
      title: "24/7 Availability",
      description: "Round-the-clock service whenever you need it",
      color: "from-[#FF6B00] to-[#E55A00]",
    },
    {
      icon: CreditCard,
      title: "Flexible Payments",
      description: "Multiple payment options including digital wallets",
      color: "from-[#4A90E2] to-[#357ABD]",
    },
    {
      icon: Smartphone,
      title: "Mobile First",
      description: "Optimized mobile experience with offline capabilities",
      color: "from-[#FF6B00] to-[#E55A00]",
    },
    {
      icon: Users,
      title: "Community Driven",
      description: "Connect with other riders and share experiences",
      color: "from-[#4A90E2] to-[#357ABD]",
    },
    {
      icon: Star,
      title: "Premium Quality",
      description: "High-quality vehicles and professional service",
      color: "from-[#FF6B00] to-[#E55A00]",
    },
    {
      icon: Headphones,
      title: "Expert Support",
      description: "Dedicated customer support team ready to help",
      color: "from-[#4A90E2] to-[#357ABD]",
    },
    {
      icon: Globe,
      title: "Global Reach",
      description: "Available in 50+ cities worldwide and expanding",
      color: "from-[#FF6B00] to-[#E55A00]",
    },
    {
      icon: Award,
      title: "Award Winning",
      description: "Recognized for innovation and customer satisfaction",
      color: "from-[#4A90E2] to-[#357ABD]",
    },
  ]

  return (
    <section className="py-20 relative bg-[#FDFCFB]">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl mb-4 font-bold text-[#333333]">Why Choose TransportX?</h2>
          <p className="text-xl text-[#666666] max-w-3xl mx-auto">
            Experience the future of transportation with cutting-edge technology and unparalleled service quality
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${feature.color} flex items-center justify-center flex-shrink-0`}>
                      <feature.icon size={24} className="text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-[#333333] mb-2">{feature.title}</h3>
                      <p className="text-[#666666] leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Advanced Technology Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl mb-4 font-bold text-[#333333]">Advanced Technology</h2>
            <p className="text-xl text-[#666666] max-w-3xl mx-auto">
              Powered by cutting-edge AI and machine learning for the ultimate transportation experience
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card className="bg-white border border-gray-200 shadow-sm p-8">
                <h3 className="text-2xl font-bold text-[#333333] mb-6">AI-Powered Features</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 rounded-full bg-[#FF6B00] flex items-center justify-center flex-shrink-0 mt-1">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#333333]">Smart Route Optimization</h4>
                      <p className="text-[#666666] text-sm">AI algorithms find the fastest and most efficient routes in real-time</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 rounded-full bg-[#4A90E2] flex items-center justify-center flex-shrink-0 mt-1">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#333333]">Predictive Pricing</h4>
                      <p className="text-[#666666] text-sm">Machine learning models predict demand and optimize pricing dynamically</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 rounded-full bg-[#FF6B00] flex items-center justify-center flex-shrink-0 mt-1">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#333333]">Fraud Detection</h4>
                      <p className="text-[#666666] text-sm">Advanced security systems protect against fraud and ensure safe transactions</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 rounded-full bg-[#4A90E2] flex items-center justify-center flex-shrink-0 mt-1">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#333333]">Real-time Analytics</h4>
                      <p className="text-[#666666] text-sm">Comprehensive dashboards provide insights into usage patterns and trends</p>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="grid grid-cols-2 gap-4">
                <Card className="bg-gradient-to-br from-[#FF6B00]/10 to-[#E55A00]/10 border border-[#FF6B00]/20 p-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-[#FF6B00] mb-2">99.9%</div>
                    <div className="text-[#666666] text-sm">Uptime</div>
                  </div>
                </Card>
                <Card className="bg-gradient-to-br from-[#4A90E2]/10 to-[#357ABD]/10 border border-[#4A90E2]/20 p-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-[#4A90E2] mb-2">50ms</div>
                    <div className="text-[#666666] text-sm">Response Time</div>
                  </div>
                </Card>
                <Card className="bg-gradient-to-br from-[#4A90E2]/10 to-[#357ABD]/10 border border-[#4A90E2]/20 p-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-[#4A90E2] mb-2">256-bit</div>
                    <div className="text-[#666666] text-sm">Encryption</div>
                  </div>
                </Card>
                <Card className="bg-gradient-to-br from-[#FF6B00]/10 to-[#E55A00]/10 border border-[#FF6B00]/20 p-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-[#FF6B00] mb-2">24/7</div>
                    <div className="text-[#666666] text-sm">Support</div>
                  </div>
                </Card>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
