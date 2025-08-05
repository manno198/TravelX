"use client"

import { motion } from "framer-motion"
import { TrendingUp, Users, Globe, Shield } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import Threads from "@/components/ui/Threads"

export function FeatureHighlight() {
  const features = [
    {
      icon: TrendingUp,
      title: "Real-time Analytics",
      description: "Advanced analytics dashboard providing insights into booking patterns, revenue trends, and user behavior.",
      color: "from-[#FF6B00] to-[#E55A00]",
    },
    {
      icon: Users,
      title: "User Management",
      description: "Comprehensive user management system with role-based access control and detailed user profiles.",
      color: "from-[#4A90E2] to-[#357ABD]",
    },
    {
      icon: Globe,
      title: "Global Coverage",
      description: "Extensive network covering major cities worldwide with local transportation partners.",
      color: "from-[#FF6B00] to-[#E55A00]",
    },
    {
      icon: Shield,
      title: "Security First",
      description: "Enterprise-grade security with end-to-end encryption and secure payment processing.",
      color: "from-[#4A90E2] to-[#357ABD]",
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
          <h2 className="text-4xl md:text-5xl mb-4 font-bold text-[#333333]">Why Choose TransportX?</h2>
          <p className="text-xl text-[#666666] max-w-3xl mx-auto">
            Discover the advanced features that make TransportX the leading choice for modern transportation solutions
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-20">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full text-center p-6 bg-white border border-gray-200 shadow-sm">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className={`w-16 h-16 mx-auto mb-6 bg-gradient-to-r ${feature.color} rounded-full flex items-center justify-center`}
                >
                      <feature.icon size={24} className="text-white" />
                </motion.div>
                <h3 className="text-xl font-bold text-[#333333] mb-4">{feature.title}</h3>
                      <p className="text-[#666666] leading-relaxed">{feature.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
