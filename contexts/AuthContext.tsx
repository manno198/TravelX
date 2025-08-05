"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import type { User, Session } from "@supabase/supabase-js"
import { supabase } from "@/lib/supabase"

interface AuthContextType {
  user: User | null
  session: Session | null
  profile: any | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<any>
  signUp: (email: string, password: string, fullName: string) => Promise<any>
  signOut: () => Promise<void>
  updateProfile: (updates: any) => Promise<void>
  loginDemo: () => void // NEW: demo login
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Demo user storage (fallback)
const DEMO_USERS_KEY = "transportx_demo_users"
const DEMO_USER_KEY = "transportx_demo_user"

const DEMO_USER = {
  id: "demo-user-id",
  email: "demo@transportx.com",
  user_metadata: { full_name: "Demo User" },
  app_metadata: {},
  aud: "authenticated",
  created_at: new Date().toISOString(),
} as User

const DEMO_PROFILE = {
  id: "demo-user-id",
  email: "demo@transportx.com",
  full_name: "Demo User",
  role: "user",
  wallet_balance: 150.0,
}

function getDemoUsers() {
  if (typeof window === "undefined") return []
  const stored = localStorage.getItem(DEMO_USERS_KEY)
  return stored ? JSON.parse(stored) : []
}

function saveDemoUser(user: any) {
  if (typeof window === "undefined") return
  const users = getDemoUsers()
  const existingIndex = users.findIndex((u: any) => u.email === user.email)
  if (existingIndex >= 0) {
    users[existingIndex] = user
  } else {
    users.push(user)
  }
  localStorage.setItem(DEMO_USERS_KEY, JSON.stringify(users))
}

function findDemoUser(email: string, password: string) {
  const users = getDemoUsers()
  return users.find((u: any) => u.email === email && u.password === password) || null
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [profile, setProfile] = useState<any | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Demo account: if demo user is set, use it
    const demoUser = localStorage.getItem(DEMO_USER_KEY)
    if (demoUser) {
      setUser(DEMO_USER)
      setProfile(DEMO_PROFILE)
      setLoading(false)
      return
    }

    // Check if Supabase is properly configured
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    const hasRealSupabase = supabaseUrl && supabaseAnonKey && 
                           supabaseUrl.includes('supabase.co') && 
                           supabaseAnonKey.length > 100

    if (!hasRealSupabase) {
      // Check for existing demo user in localStorage (legacy fallback)
      const storedUser = localStorage.getItem("transportx_current_user")
      if (storedUser) {
        setUser(JSON.parse(storedUser))
        setProfile(JSON.parse(storedUser))
      } else {
        setUser(DEMO_USER)
        setProfile(DEMO_PROFILE)
      }
      setLoading(false)
      return
    }

    // Real Supabase auth
    supabase.auth.getSession().then(({ data: { session } }: any) => {
      setSession(session)
      setUser(session?.user ?? null)
      if (session?.user) {
        fetchProfile(session.user.id)
      } else {
        setLoading(false)
      }
    }).catch((error) => {
      setLoading(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event: any, session: any) => {
      setSession(session)
      setUser(session?.user ?? null)
      if (session?.user) {
        await fetchProfile(session.user.id)
      } else {
        setProfile(null)
        setLoading(false)
      }
    })
    return () => subscription.unsubscribe()
  }, [])

  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase.from("profiles").select("*").eq("id", userId).single()
      if (error && error.code === "PGRST116") {
        const { data: userData } = await supabase.auth.getUser()
        if (userData.user) {
          const { data: newProfile } = await supabase
            .from("profiles")
            .insert({
              id: userData.user.id,
              email: userData.user.email!,
              full_name: userData.user.user_metadata?.full_name || null,
            })
            .select()
            .single()
          setProfile(newProfile)
        }
      } else if (!error) {
        setProfile(data)
      }
      setLoading(false)
    } catch (error) {
      setLoading(false)
    }
  }

  const signIn = async (email: string, password: string) => {
    // Demo account: block sign in for demo user
    if (email === DEMO_USER.email) {
      return { data: null, error: { message: "Use the Demo Account button for demo access." } }
    }
    // Check if Supabase is properly configured
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    const hasRealSupabase = supabaseUrl && supabaseAnonKey && 
                           supabaseUrl.includes('supabase.co') && 
                           supabaseAnonKey.length > 100
    if (!hasRealSupabase) {
      const demoUser = findDemoUser(email, password)
      if (demoUser) {
        const user = {
          id: demoUser.id,
          email: demoUser.email,
          user_metadata: { full_name: demoUser.full_name },
          app_metadata: {},
          aud: "authenticated",
          created_at: demoUser.created_at,
        } as User
        setUser(user)
        setProfile(demoUser)
        localStorage.setItem("transportx_current_user", JSON.stringify(demoUser))
        return { data: { user }, error: null }
      } else {
        return { data: null, error: { message: "Invalid email or password" } }
      }
    }
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    return { data, error }
  }

  const signUp = async (email: string, password: string, fullName: string) => {
    if (email === DEMO_USER.email) {
      return { data: null, error: { message: "This email is reserved for demo access." } }
    }
    // Check if Supabase is properly configured
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    const hasRealSupabase = supabaseUrl && supabaseAnonKey && 
                           supabaseUrl.includes('supabase.co') && 
                           supabaseAnonKey.length > 100
    if (!hasRealSupabase) {
      const users = getDemoUsers()
      const existingUser = users.find((u: any) => u.email === email)
      if (existingUser) {
        return { data: null, error: { message: "User with this email already exists" } }
      }
      const newUser = {
        id: `demo-${Date.now()}`,
        email,
        password,
        full_name: fullName,
        role: "user",
        wallet_balance: 100.0,
        created_at: new Date().toISOString(),
      }
      saveDemoUser(newUser)
      const user = {
        id: newUser.id,
        email: newUser.email,
        user_metadata: { full_name: newUser.full_name },
        app_metadata: {},
        aud: "authenticated",
        created_at: newUser.created_at,
      } as User
      setUser(user)
      setProfile(newUser)
      localStorage.setItem("transportx_current_user", JSON.stringify(newUser))
      return { data: { user }, error: null }
    }
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName },
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    })
    return { data, error }
  }

  // NEW: Demo login function
  const loginDemo = () => {
    setUser(DEMO_USER)
    setProfile(DEMO_PROFILE)
    localStorage.setItem(DEMO_USER_KEY, JSON.stringify(DEMO_USER))
  }

  const signOut = async () => {
    // Remove demo user if present
    localStorage.removeItem(DEMO_USER_KEY)
    // Check if Supabase is properly configured
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    const hasRealSupabase = supabaseUrl && supabaseAnonKey && 
                           supabaseUrl.includes('supabase.co') && 
                           supabaseAnonKey.length > 100
    if (!hasRealSupabase) {
      localStorage.removeItem("transportx_current_user")
      setUser(null)
      setProfile(null)
      return
    }
    await supabase.auth.signOut()
  }

  const updateProfile = async (updates: any) => {
    if (!user) return
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    const hasRealSupabase = supabaseUrl && supabaseAnonKey && 
                           supabaseUrl.includes('supabase.co') && 
                           supabaseAnonKey.length > 100
    if (!hasRealSupabase) {
      const currentUser = localStorage.getItem("transportx_current_user")
      if (currentUser) {
        const updatedUser = { ...JSON.parse(currentUser), ...updates }
        localStorage.setItem("transportx_current_user", JSON.stringify(updatedUser))
        setProfile(updatedUser)
      }
      return
    }
    const { error } = await supabase.from("profiles").update(updates).eq("id", user.id)
    if (!error) {
      setProfile({ ...profile, ...updates })
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        profile,
        loading,
        signIn,
        signUp,
        signOut,
        updateProfile,
        loginDemo, // NEW
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
