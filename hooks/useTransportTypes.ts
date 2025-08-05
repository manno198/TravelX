"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"
import { useAuth } from "@/contexts/AuthContext"

export function useTransportTypes() {
  const { user } = useAuth()
  const [transportTypes, setTransportTypes] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // DEMO USER: always use mock data
    if (user && (user.email === "demo@transportx.com" || user.id === "demo-user-id")) {
      setTransportTypes([
        { id: "1", name: "Car", description: "Private car ride", base_price: 5.0, price_per_km: 2.5, icon: "🚗" },
        { id: "2", name: "Bus", description: "Shared bus service", base_price: 2.0, price_per_km: 0.8, icon: "🚌" },
        { id: "3", name: "Shared Ride", description: "Carpooling service", base_price: 3.0, price_per_km: 1.5, icon: "👥" },
        { id: "4", name: "Delivery", description: "Package delivery", base_price: 4.0, price_per_km: 2.0, icon: "📦" },
        { id: "5", name: "Premium", description: "Luxury vehicle", base_price: 10.0, price_per_km: 4.0, icon: "👑" },
        { id: "6", name: "Bike", description: "Motorcycle ride", base_price: 3.0, price_per_km: 1.8, icon: "🏍️" },
      ])
      setLoading(false)
      return
    }

    setLoading(true)
    supabase
      .from("transport_types")
      .select("*")
      .order("name")
      .then(({ data, error }) => {
        if (error) {
          setTransportTypes([])
        } else {
          setTransportTypes(data || [])
        }
        setLoading(false)
      })
  }, [user])

  return { transportTypes, loading }
}
