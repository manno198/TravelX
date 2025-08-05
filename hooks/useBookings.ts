"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"
import { useAuth } from "@/contexts/AuthContext"

export function useBookings() {
  const { user } = useAuth()
  const [bookings, setBookings] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) return
    // DEMO USER: always use mock data
    if (user.email === "demo@transportx.com" || user.id === "demo-user-id") {
      setBookings([
        {
          id: "1",
          user_id: user.id,
          transport_type_id: "1",
          pickup_location: "Downtown Plaza",
          dropoff_location: "Airport Terminal 1",
          estimated_price: 25.5,
          actual_price: 24.75,
          status: "completed",
          booking_time: new Date(Date.now() - 86400000).toISOString(),
          created_at: new Date(Date.now() - 86400000).toISOString(),
          rating: 5,
          transport_types: { name: "Car", icon: "🚗" },
        },
        {
          id: "2",
          user_id: user.id,
          transport_type_id: "2",
          pickup_location: "Central Station",
          dropoff_location: "Business District",
          estimated_price: 15.0,
          actual_price: null,
          status: "pending",
          booking_time: new Date(Date.now() + 3600000).toISOString(),
          created_at: new Date().toISOString(),
          rating: null,
          transport_types: { name: "Bus", icon: "🚌" },
        },
        {
          id: "3",
          user_id: user.id,
          transport_type_id: "3",
          pickup_location: "Mall Entrance",
          dropoff_location: "University Campus",
          estimated_price: 18.25,
          actual_price: 17.5,
          status: "completed",
          booking_time: new Date(Date.now() - 172800000).toISOString(),
          created_at: new Date(Date.now() - 172800000).toISOString(),
          rating: 4,
          transport_types: { name: "Shared Ride", icon: "👥" },
        },
      ])
      setLoading(false)
      return
    }
    // ...existing Supabase fetch logic...
    setLoading(true)
    supabase
      .from("bookings")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .then(({ data, error }) => {
        if (error) {
          setBookings([])
        } else {
          setBookings(data || [])
        }
        setLoading(false)
      })
  }, [user])

  const createBooking = async (bookingData: any) => {
    if (user.email === "demo@transportx.com" || user.id === "demo-user-id") {
      const newBooking = {
        id: Date.now().toString(),
        ...bookingData,
        user_id: user.id,
        status: "pending",
        created_at: new Date().toISOString(),
        transport_types: { name: "Car", icon: "🚗" },
      }
      setBookings((prev) => [newBooking, ...prev])
      return { data: newBooking, error: null }
    }
    // ...existing Supabase create logic...
    const { data, error } = await supabase
      .from("bookings")
      .insert({ ...bookingData, user_id: user.id })
      .select("*")
      .single()
    if (!error) setBookings((prev) => [data, ...prev])
    return { data, error }
  }

  return {
    bookings,
    loading,
    createBooking,
    refetch: () => {}, // no-op for demo
  }
}
