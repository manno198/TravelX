"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Calendar, MapPin, CreditCard, TrendingUp, Star, Download, Plus, Clock, CheckCircle, XCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/AuthContext"
import { useBookings } from "@/hooks/useBookings"
import { AnalyticsPanel } from "./AnalyticsPanel"
import Link from "next/link"

export function UserDashboard() {
  const { profile } = useAuth()
  const { bookings, loading } = useBookings()
  const [selectedPeriod, setSelectedPeriod] = useState("month")
  const [selectedStatus, setSelectedStatus] = useState("all")

  const stats = {
    totalRides: bookings.length,
    totalSpent: bookings.reduce((sum, booking) => sum + (booking.actual_price || booking.estimated_price), 0),
    avgRating:
      bookings.filter((b) => b.rating).reduce((sum, b) => sum + b.rating, 0) /
        bookings.filter((b) => b.rating).length || 0,
    savedAmount: 150.5, // Mock savings data
  }

  const filteredBookings = bookings.filter((booking) => {
    if (selectedStatus !== "all" && booking.status !== selectedStatus) return false

    const bookingDate = new Date(booking.created_at)
    const now = new Date()

    switch (selectedPeriod) {
      case "week":
        return bookingDate >= new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
      case "month":
        return bookingDate >= new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
      case "year":
        return bookingDate >= new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000)
      default:
        return true
    }
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "text-green-600"
      case "confirmed":
        return "text-[#FF6B00]"
      case "in_progress":
        return "text-[#4A90E2]"
      case "pending":
        return "text-yellow-600"
      case "cancelled":
        return "text-red-600"
      default:
        return "text-[#666666]"
    }
  }

  const getStatusBg = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-50 border-green-200"
      case "confirmed":
        return "bg-[#FF6B00]/10 border-[#FF6B00]/20"
      case "in_progress":
        return "bg-[#4A90E2]/10 border-[#4A90E2]/20"
      case "pending":
        return "bg-yellow-50 border-yellow-200"
      case "cancelled":
        return "bg-red-50 border-red-200"
      default:
        return "bg-gray-50 border-gray-200"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case "confirmed":
        return <Clock className="w-4 h-4 text-[#FF6B00]" />
      case "in_progress":
        return <Clock className="w-4 h-4 text-[#4A90E2]" />
      case "pending":
        return <Clock className="w-4 h-4 text-yellow-600" />
      case "cancelled":
        return <XCircle className="w-4 h-4 text-red-600" />
      default:
        return <Clock className="w-4 h-4 text-[#666666]" />
    }
  }

  const formatBookingTime = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="min-h-screen pt-24 pb-12 bg-[#FDFCFB]">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-3xl md:text-4xl mb-2 font-bold text-[#333333]">
            Welcome back, {profile?.full_name || "User"}!
          </h1>
          <p className="text-[#666666]">Here's your transportation overview</p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {[
            {
              icon: MapPin,
              label: "Total Rides",
              value: stats.totalRides.toString(),
              color: "from-[#FF6B00] to-[#E55A00]",
            },
            {
              icon: CreditCard,
              label: "Total Spent",
              value: `$${stats.totalSpent.toFixed(2)}`,
              color: "from-[#4A90E2] to-[#357ABD]",
            },
            {
              icon: Star,
              label: "Avg Rating",
              value: stats.avgRating.toFixed(1),
              color: "from-[#FF6B00] to-[#E55A00]",
            },
            {
              icon: TrendingUp,
              label: "Saved",
              value: `$${stats.savedAmount.toFixed(2)}`,
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
        <div className="flex flex-wrap gap-4 mb-4">
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

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg bg-white text-[#333333] focus:border-[#FF6B00] focus:ring-[#FF6B00]"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        {/* Bookings List */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card className="bg-white border border-gray-200 shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-[#333333] flex items-center justify-between">
                  Recent Bookings
                  <Link href="/booking">
                    <Button className="bg-[#FF6B00] hover:bg-[#E55A00] text-white text-sm">
                      <Plus className="w-4 h-4 mr-2" />
                      Book New Ride
                    </Button>
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                {loading ? (
                  <div className="text-center py-8">
                    <div className="animate-spin w-8 h-8 border-2 border-[#FF6B00] border-t-transparent rounded-full mx-auto mb-4"></div>
                    <p className="text-[#666666]">Loading bookings...</p>
                  </div>
                ) : filteredBookings.length === 0 ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <MapPin className="w-8 h-8 text-gray-400" />
                    </div>
                    <p className="text-[#666666] mb-4">No bookings found for the selected criteria.</p>
                    <Link href="/booking">
                      <Button className="bg-[#FF6B00] hover:bg-[#E55A00] text-white">
                        <Plus className="w-4 h-4 mr-2" />
                        Book Your First Ride
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {filteredBookings.slice(0, 5).map((booking) => (
                      <motion.div
                        key={booking.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className={`p-3 rounded-lg border ${getStatusBg(booking.status)}`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            {getStatusIcon(booking.status)}
                            <div>
                              <p className="font-medium text-[#333333] text-sm">
                                {booking.pickup_location} → {booking.dropoff_location}
                              </p>
                              <p className="text-xs text-[#666666]">
                                {formatBookingTime(booking.created_at)}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-[#333333] text-sm">${booking.estimated_price.toFixed(2)}</p>
                            <span className={`text-xs font-medium ${getStatusColor(booking.status)}`}>
                              {booking.status.replace("_", " ").toUpperCase()}
                            </span>
                          </div>
                        </div>
                        
                        {/* Additional booking details */}
                        <div className="grid grid-cols-2 gap-3 text-xs">
                          <div>
                            <p className="text-[#666666]">Transport Type</p>
                                                               <p className="font-medium text-[#333333]">
                                     {booking.transport_type_id === "1" ? "Car" : 
                                      booking.transport_type_id === "2" ? "Bus" :
                                      booking.transport_type_id === "3" ? "Shared Ride" :
                                      booking.transport_type_id === "4" ? "Delivery" :
                                      booking.transport_type_id === "5" ? "Premium" :
                                      booking.transport_type_id === "6" ? "Bike" : "Car"}
                                   </p>
                          </div>
                          <div>
                            <p className="text-[#666666]">Booking Time</p>
                            <p className="font-medium text-[#333333]">
                              {formatBookingTime(booking.booking_time)}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Analytics Panel */}
          <div className="h-fit">
            <AnalyticsPanel data={bookings} />
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <Card className="bg-white border border-gray-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-[#333333]">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link href="/booking">
                  <Button className="bg-[#FF6B00] hover:bg-[#E55A00] text-white w-full">
                    <Plus className="w-4 h-4 mr-2" />
                    Book New Ride
                  </Button>
                </Link>
                <Button variant="outline" className="border-gray-300 text-[#666666] hover:bg-[#FF6B00]/5 hover:text-[#FF6B00] w-full">
                  <Download className="w-4 h-4 mr-2" />
                  Download Report
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
