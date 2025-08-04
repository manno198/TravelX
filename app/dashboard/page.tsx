"use client"

import { useAuth } from "@/contexts/AuthContext"
import { UserDashboard } from "@/components/dashboard/UserDashboard"
import { AdminDashboard } from "@/components/dashboard/AdminDashboard"
import { AuthForm } from "@/components/auth/AuthForm"

export default function DashboardPage() {
  const { user, profile, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FDFCFB]">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-2 border-[#FF6B00] border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-[#666666]">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return <AuthForm />
  }

  return profile?.role === "admin" ? <AdminDashboard /> : <UserDashboard />
}
