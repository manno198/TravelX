"use client"

import { useMemo } from "react"
import { motion } from "framer-motion"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Area,
  AreaChart,
} from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface AnalyticsPanelProps {
  data?: any[]
  isAdmin?: boolean
  compact?: boolean
}

export function AnalyticsPanel({ data = [], isAdmin = false, compact = false }: AnalyticsPanelProps) {
  const analytics = useMemo(() => {
    if (!data || !data.length) return null

    // Monthly booking trends
    const monthlyData = data.reduce((acc, booking) => {
      const month = new Date(booking.created_at).toLocaleDateString("en-US", { month: "short" })
      acc[month] = (acc[month] || 0) + 1
      return acc
    }, {})

    const monthlyBookings = Object.entries(monthlyData).map(([month, count]) => ({
      month,
      bookings: count,
      revenue: data
        .filter((b) => new Date(b.created_at).toLocaleDateString("en-US", { month: "short" }) === month)
        .reduce((sum, b) => sum + (b.actual_price || b.estimated_price), 0),
    }))

    // Transport type distribution
    const transportData = data.reduce((acc, booking) => {
      const type = booking.transport_types?.name || "Unknown"
      acc[type] = (acc[type] || 0) + 1
      return acc
    }, {})

    const transportDistribution = Object.entries(transportData).map(([name, value]) => ({
      name,
      value,
      color: getRandomColor(),
    }))

    // Status distribution
    const statusData = data.reduce((acc, booking) => {
      acc[booking.status] = (acc[booking.status] || 0) + 1
      return acc
    }, {})

    const statusDistribution = Object.entries(statusData).map(([name, value]) => ({
      name: name.replace("_", " ").toUpperCase(),
      value,
      color: getStatusColor(name),
    }))

    // Daily revenue trend (last 7 days)
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date()
      date.setDate(date.getDate() - i)
      return date.toISOString().split("T")[0]
    }).reverse()

    const dailyRevenue = last7Days.map((date) => {
      const dayBookings = data.filter((b) => new Date(b.created_at).toISOString().split("T")[0] === date)
      return {
        date: new Date(date).toLocaleDateString("en-US", { weekday: "short" }),
        revenue: dayBookings.reduce((sum, b) => sum + (b.actual_price || b.estimated_price), 0),
        bookings: dayBookings.length,
      }
    })

    return {
      monthlyBookings,
      transportDistribution,
      statusDistribution,
      dailyRevenue,
    }
  }, [data])

  function getRandomColor() {
    const colors = ["#FF6B00", "#4A90E2", "#00ccff", "#ff6b6b", "#ffd93d", "#6c5ce7", "#fd79a8"]
    return colors[Math.floor(Math.random() * colors.length)]
  }

  function getStatusColor(status: string) {
    switch (status) {
      case "completed":
        return "#10B981"
      case "in_progress":
        return "#FF6B00"
      case "pending":
        return "#F59E0B"
      case "cancelled":
        return "#EF4444"
      default:
        return "#6B7280"
    }
  }

  if (!analytics) {
    return (
      <Card className="bg-white border border-gray-200 shadow-sm">
        <CardHeader>
          <CardTitle className="text-[#333333]">Analytics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <p className="text-[#666666]">No data available for analytics</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (compact) {
    return (
      <Card className="bg-white border border-gray-200 shadow-sm">
        <CardHeader>
          <CardTitle className="text-[#333333]">Quick Stats</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-[#FF6B00]">{data.length}</p>
              <p className="text-sm text-[#666666]">Total Bookings</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-[#4A90E2]">
                ${data.reduce((sum, b) => sum + (b.actual_price || b.estimated_price), 0).toFixed(2)}
              </p>
              <p className="text-sm text-[#666666]">Total Revenue</p>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-3">
      {/* Monthly Bookings Chart */}
      <Card className="bg-white border border-gray-200 shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-[#333333] text-sm">Monthly Bookings</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={analytics.monthlyBookings}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="month" stroke="#666666" />
              <YAxis stroke="#666666" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #E5E7EB",
                  borderRadius: "8px",
                }}
              />
              <Bar dataKey="bookings" fill="#FF6B00" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Transport Distribution */}
      <Card className="bg-white border border-gray-200 shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-[#333333] text-sm">Transport Types</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie
                data={analytics.transportDistribution}
                cx="50%"
                cy="50%"
                outerRadius={60}
                dataKey="value"
                label={({ name, percent }) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}
              >
                {analytics.transportDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #E5E7EB",
                  borderRadius: "8px",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Daily Revenue Trend */}
      <Card className="bg-white border border-gray-200 shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-[#333333] text-sm">Daily Revenue Trend</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={analytics.dailyRevenue}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="date" stroke="#666666" />
              <YAxis stroke="#666666" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #E5E7EB",
                  borderRadius: "8px",
                }}
              />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#4A90E2"
                fill="#4A90E2"
                fillOpacity={0.3}
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
