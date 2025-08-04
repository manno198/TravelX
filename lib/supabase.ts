import { createClient } from "@supabase/supabase-js"

// Check if we're in a browser environment and have the required env vars
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""

// Create a mock client if environment variables are not set
let supabase: any

if (supabaseUrl && supabaseAnonKey) {
  supabase = createClient(supabaseUrl, supabaseAnonKey)
} else {
  // Mock Supabase client for development/preview
  console.warn("Supabase environment variables not found. Using mock client.")

  supabase = {
    auth: {
      getSession: () => Promise.resolve({ data: { session: null }, error: null }),
      getUser: () => Promise.resolve({ data: { user: null }, error: null }),
      signInWithPassword: () => Promise.resolve({ data: null, error: { message: "Supabase not configured" } }),
      signUp: () => Promise.resolve({ data: null, error: { message: "Supabase not configured" } }),
      signOut: () => Promise.resolve({ error: null }),
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
    },
    from: () => ({
      select: () => ({
        eq: () => ({
          single: () => Promise.resolve({ data: null, error: { code: "PGRST116" } }),
          order: () => Promise.resolve({ data: [], error: null }),
        }),
        order: () => Promise.resolve({ data: [], error: null }),
        count: "exact",
        head: true,
      }),
      insert: () => ({
        select: () => ({
          single: () => Promise.resolve({ data: null, error: { message: "Supabase not configured" } }),
        }),
      }),
      update: () => ({
        eq: () => Promise.resolve({ error: { message: "Supabase not configured" } }),
      }),
    }),
  }
}

export { supabase }

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          avatar_url: string | null
          role: "user" | "admin"
          wallet_balance: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          avatar_url?: string | null
          role?: "user" | "admin"
          wallet_balance?: number
        }
        Update: {
          full_name?: string | null
          avatar_url?: string | null
          wallet_balance?: number
        }
      }
      transport_types: {
        Row: {
          id: string
          name: string
          description: string | null
          base_price: number
          price_per_km: number
          icon: string | null
          created_at: string
        }
      }
      bookings: {
        Row: {
          id: string
          user_id: string
          transport_type_id: string
          pickup_location: string
          dropoff_location: string
          distance_km: number | null
          estimated_price: number
          actual_price: number | null
          status: "pending" | "confirmed" | "in_progress" | "completed" | "cancelled"
          booking_time: string
          pickup_time: string | null
          completion_time: string | null
          rating: number | null
          feedback: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          user_id: string
          transport_type_id: string
          pickup_location: string
          dropoff_location: string
          distance_km?: number | null
          estimated_price: number
          booking_time: string
        }
      }
    }
  }
}
