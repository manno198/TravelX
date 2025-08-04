"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"

export function useTransportTypes() {
  const [transportTypes, setTransportTypes] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchTransportTypes()
  }, [])

  const fetchTransportTypes = async () => {
    try {
      // Check if Supabase is configured
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
      const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

      if (!supabaseUrl || !supabaseAnonKey) {
        // Use mock data for demo
        const mockTransportTypes = [
          { id: "1", name: "Car", description: "Private car ride", base_price: 5.0, price_per_km: 2.5, icon: "🚗" },
          { id: "2", name: "Bus", description: "Shared bus service", base_price: 2.0, price_per_km: 0.8, icon: "🚌" },
          {
            id: "3",
            name: "Shared Ride",
            description: "Carpooling service",
            base_price: 3.0,
            price_per_km: 1.5,
            icon: "👥",
          },
          {
            id: "4",
            name: "Delivery",
            description: "Package delivery",
            base_price: 4.0,
            price_per_km: 2.0,
            icon: "📦",
          },
          { id: "5", name: "Premium", description: "Luxury vehicle", base_price: 10.0, price_per_km: 4.0, icon: "👑" },
          { id: "6", name: "Bike", description: "Motorcycle ride", base_price: 3.0, price_per_km: 1.8, icon: "🏍️" },
        ]
        setTransportTypes(mockTransportTypes)
        setLoading(false)
        return
      }
      
      const { data, error } = await supabase
        .from("transport_types")
        .select("*")
        .order("name")

      if (error) {
        console.error("Supabase transport types error:", error)
        console.error("Error details:", {
          code: error.code,
          message: error.message,
          details: error.details,
          hint: error.hint
        })
        throw error
      }
      
      setTransportTypes(data || [])
    } catch (error) {
      console.error("Error fetching transport types:", error)
      // Fallback to mock data if Supabase fails
      const mockTransportTypes = [
        { id: "fallback-1", name: "Car", description: "Private car ride", base_price: 5.0, price_per_km: 2.5, icon: "🚗" },
        { id: "fallback-2", name: "Bus", description: "Shared bus service", base_price: 2.0, price_per_km: 0.8, icon: "🚌" },
        { id: "fallback-3", name: "Shared Ride", description: "Carpooling service", base_price: 3.0, price_per_km: 1.5, icon: "👥" },
      ]
      setTransportTypes(mockTransportTypes)
    } finally {
      setLoading(false)
    }
  }

  return { transportTypes, loading }
}
