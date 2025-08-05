"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { supabase } from "@/lib/supabase"
import { useNotification } from "@/contexts/NotificationContext"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, XCircle, Loader2 } from "lucide-react"

export default function AuthCallback() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { showNotification } = useNotification()
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading")
  const [message, setMessage] = useState("")

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        const { data, error } = await supabase.auth.getSession()
        
        if (error) {
          console.error("Auth callback error:", error)
          setStatus("error")
          setMessage("Authentication failed. Please try again.")
          showNotification("error", "Authentication Failed", error.message)
          return
        }

        if (data.session) {
          setStatus("success")
          setMessage("Email confirmed successfully! Redirecting to dashboard...")
          showNotification("success", "Email Confirmed", "Your account has been activated successfully!")
          
          setTimeout(() => {
            router.push("/dashboard")
          }, 2000)
        } else {
          setStatus("error")
          setMessage("No active session found. Please try signing in again.")
          showNotification("error", "No Session", "Please sign in to continue.")
        }
      } catch (error) {
        console.error("Auth callback error:", error)
        setStatus("error")
        setMessage("An unexpected error occurred. Please try again.")
        showNotification("error", "Authentication Error", "An unexpected error occurred.")
      }
    }

    handleAuthCallback()
  }, [router, showNotification])

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FDFCFB] py-12 px-4">
      <Card className="w-full max-w-md bg-white border border-gray-200 shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-[#333333]">
            Email Confirmation
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 text-center">
          {status === "loading" && (
            <div className="space-y-4">
              <Loader2 className="w-12 h-12 text-[#FF6B00] animate-spin mx-auto" />
              <p className="text-[#666666]">Confirming your email...</p>
            </div>
          )}

          {status === "success" && (
            <div className="space-y-4">
              <CheckCircle className="w-12 h-12 text-green-600 mx-auto" />
              <p className="text-[#333333] font-medium">{message}</p>
              <Button
                onClick={() => router.push("/dashboard")}
                className="bg-[#FF6B00] hover:bg-[#E55A00] text-white"
              >
                Go to Dashboard
              </Button>
            </div>
          )}

          {status === "error" && (
            <div className="space-y-4">
              <XCircle className="w-12 h-12 text-red-600 mx-auto" />
              <p className="text-[#333333] font-medium">{message}</p>
              <div className="space-y-2">
                <Button
                  onClick={() => router.push("/auth/signin")}
                  className="bg-[#FF6B00] hover:bg-[#E55A00] text-white w-full"
                >
                  Sign In
                </Button>
                <Button
                  variant="outline"
                  onClick={() => router.push("/")}
                  className="w-full"
                >
                  Go Home
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
} 