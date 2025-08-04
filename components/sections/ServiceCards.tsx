"use client"

import { motion } from "framer-motion"
import { Car, Bus, Users, Package, Crown, Bike } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function ServiceCards() {
  const services = [
    {
      icon: Car,
      title: "Private Car",
      description: "Comfortable private rides for personal transportation",
      price: "From $5.00",
      features: ["Air Conditioning", "Professional Driver", "Real-time Tracking"],
      color: "from-[#FF6B00] to-[#E55A00]",
    },
    {
      icon: Bus,
      title: "Bus Service",
      description: "Affordable shared transportation for daily commutes",
      price: "From $2.00",
      features: ["Eco-friendly", "Multiple Stops", "Budget-friendly"],
      color: "from-[#4A90E2] to-[#357ABD]",
    },
    {
      icon: Users,
      title: "Shared Ride",
      description: "Split costs with other passengers going your way",
      price: "From $3.00",
      features: ["Cost Sharing", "Social Travel", "Verified Riders"],
      color: "from-[#FF6B00] to-[#E55A00]",
    },
    {
      icon: Package,
      title: "Delivery",
      description: "Fast and secure package delivery service",
      price: "From $4.00",
      features: ["Same-day Delivery", "Package Tracking", "Secure Handling"],
      color: "from-[#4A90E2] to-[#357ABD]",
    },
    {
      icon: Crown,
      title: "Premium",
      description: "Luxury vehicles for special occasions",
      price: "From $10.00",
      features: ["Luxury Vehicles", "VIP Service", "Premium Amenities"],
      color: "from-[#FF6B00] to-[#E55A00]",
    },
    {
      icon: Bike,
      title: "Motorcycle",
      description: "Quick rides through traffic on two wheels",
      price: "From $3.00",
      features: ["Fast Transit", "Traffic Bypass", "Helmet Provided"],
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
          <h2 className="text-4xl md:text-5xl mb-4 font-bold text-[#333333]">Choose Your Ride</h2>
          <p className="text-xl text-[#666666] max-w-2xl mx-auto">
            Select from our diverse range of transportation options tailored to your needs
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full flex flex-col bg-white border border-gray-200 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center mb-6">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 360 }}
                      transition={{ duration: 0.5 }}
                      className={`w-16 h-16 rounded-xl bg-gradient-to-r ${service.color} flex items-center justify-center mr-4`}
                    >
                      <service.icon size={24} className="text-white" />
                    </motion.div>
                    <div>
                      <h3 className="text-xl font-bold text-[#333333] mb-1">{service.title}</h3>
                      <p className="text-[#FF6B00] font-semibold">{service.price}</p>
                    </div>
                  </div>

                  <p className="text-[#666666] mb-6 flex-grow">{service.description}</p>

                  <div className="space-y-2 mb-6">
                    {service.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center text-sm">
                        <div className="w-2 h-2 bg-[#FF6B00] rounded-full mr-3"></div>
                        <span className="text-[#666666]">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Button className="w-full bg-[#FF6B00] hover:bg-[#E55A00] text-white">
                    Book Now
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
