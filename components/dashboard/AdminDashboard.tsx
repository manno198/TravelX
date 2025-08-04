"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Users, TrendingUp, MapPin, CreditCard, Star, Download, Plus, Settings } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/AuthContext"
import { useBookings } from "@/hooks/useBookings"
import Link from "next/link"

export function AdminDashboard() {
  const { profile } = useAuth()
  const { bookings } = useBookings()
  const [selectedPeriod, setSelectedPeriod] = useState("month")

  const stats = {
    totalUsers: 1250,
    totalBookings: bookings.length,
    totalRevenue: bookings.reduce((sum, booking) => sum + (booking.actual_price || booking.estimated_price), 0),
    avgRating: 4.8,
  }

  const recentBookings = bookings.slice(0, 5)

  return (
    <div className="min-h-screen pt-24 pb-12 bg-[#FDFCFB]">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-3xl md:text-4xl mb-2 font-bold text-[#333333]">
            Admin Dashboard
          </h1>
          <p className="text-[#666666]">Manage your transportation platform</p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            {
              icon: Users,
              label: "Total Users",
              value: stats.totalUsers.toLocaleString(),
              color: "from-[#FF6B00] to-[#E55A00]",
            },
            {
              icon: MapPin,
              label: "Total Bookings",
              value: stats.totalBookings.toString(),
              color: "from-[#4A90E2] to-[#357ABD]",
            },
            {
              icon: CreditCard,
              label: "Total Revenue",
              value: `$${stats.totalRevenue.toFixed(2)}`,
              color: "from-[#FF6B00] to-[#E55A00]",
            },
            {
              icon: Star,
              label: "Avg Rating",
              value: stats.avgRating.toFixed(1),
              color: "from-[#4A90E2] to-[#357ABD]",
            },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="bg-white border border-gray-200 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[#666666] text-sm font-medium">{stat.label}</p>
                      <p className="text-2xl font-bold text-[#333333]">{stat.value}</p>
                    </div>
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${stat.color} flex items-center justify-center`}>
                      <stat.icon size={24} className="text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-6">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg bg-white text-[#333333] focus:border-[#FF6B00] focus:ring-[#FF6B00]"
          >
            <option value="all">All Time</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="year">This Year</option>
          </select>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Bookings */}
          <Card className="bg-white border border-gray-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-[#333333] flex items-center justify-between">
                Recent Bookings
                <Link href="/admin/bookings">
                  <Button className="bg-[#FF6B00] hover:bg-[#E55A00] text-white text-sm">
                    <Plus className="w-4 h-4 mr-2" />
                    View All
                  </Button>
                </Link>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentBookings.length === 0 ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <MapPin className="w-8 h-8 text-gray-400" />
                    </div>
                    <p className="text-[#666666]">No recent bookings</p>
                  </div>
                ) : (
                  recentBookings.map((booking, index) => (
                    <motion.div
                      key={booking.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-4 bg-gray-50 rounded-lg border border-gray-200"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-[#333333]">
                            {booking.pickup_location} → {booking.dropoff_location}
                          </p>
                          <p className="text-sm text-[#666666]">
                            {new Date(booking.created_at).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-[#333333]">${booking.estimated_price.toFixed(2)}</p>
                          <span className="text-xs text-[#666666] capitalize">
                            {booking.status}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="bg-white border border-gray-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-[#333333]">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-4">
                <Link href="/admin/users">
                  <Button className="w-full bg-[#FF6B00] hover:bg-[#E55A00] text-white">
                    <Users className="w-4 h-4 mr-2" />
                    Manage Users
                  </Button>
                </Link>
                <Link href="/admin/bookings">
                  <Button className="w-full bg-[#4A90E2] hover:bg-[#357ABD] text-white">
                    <MapPin className="w-4 h-4 mr-2" />
                    View All Bookings
                  </Button>
                </Link>
                <Button variant="outline" className="w-full border-gray-300 text-[#666666] hover:bg-[#FF6B00]/5 hover:text-[#FF6B00]">
                  <Download className="w-4 h-4 mr-2" />
                  Download Reports
                </Button>
                <Button variant="outline" className="w-full border-gray-300 text-[#666666] hover:bg-[#FF6B00]/5 hover:text-[#FF6B00]">
                  <Settings className="w-4 h-4 mr-2" />
                  Platform Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Analytics Overview */}
        <div className="mt-8">
          <Card className="bg-white border border-gray-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-[#333333]">Analytics Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-gradient-to-br from-[#FF6B00]/10 to-[#E55A00]/10 rounded-lg">
                  <TrendingUp className="w-8 h-8 text-[#FF6B00] mx-auto mb-2" />
                  <h3 className="font-semibold text-[#333333]">Growth</h3>
                  <p className="text-[#666666] text-sm">+15% this month</p>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-[#4A90E2]/10 to-[#357ABD]/10 rounded-lg">
                  <Users className="w-8 h-8 text-[#4A90E2] mx-auto mb-2" />
                  <h3 className="font-semibold text-[#333333]">Active Users</h3>
                  <p className="text-[#666666] text-sm">1,250 users</p>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-[#FF6B00]/10 to-[#E55A00]/10 rounded-lg">
                  <Star className="w-8 h-8 text-[#FF6B00] mx-auto mb-2" />
                  <h3 className="font-semibold text-[#333333]">Satisfaction</h3>
                  <p className="text-[#666666] text-sm">4.8/5 rating</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
