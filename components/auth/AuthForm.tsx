"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Mail, Lock, User, Eye, EyeOff } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/contexts/AuthContext"
import { useNotification } from "@/contexts/NotificationContext"
import { useRouter } from "next/navigation"

export function AuthForm() {
  const { signIn, signUp, loginDemo } = useAuth()
  const { showNotification } = useNotification()
  const router = useRouter()
  const [isSignUp, setIsSignUp] = useState(false)
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    fullName: "",
  })

  // Helper to check if we're in demo mode
  const isDemoMode = () => {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    return !supabaseUrl || !supabaseAnonKey || 
           !supabaseUrl.includes('supabase.co') || 
           supabaseAnonKey.length <= 100
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (isSignUp) {
        const { data, error } = await signUp(formData.email, formData.password, formData.fullName)
        
        if (error) {
          showNotification("error", "Sign Up Failed", error.message || "Failed to create account")
        } else {
          if (isDemoMode()) {
            showNotification("success", "Account Created!", "A confirmation email would be sent in production. Redirecting to dashboard...")
            setTimeout(() => {
              router.push("/dashboard")
            }, 2000)
          } else {
            // Real Supabase sign up - check if email confirmation is required
            if (data?.user && !data?.session) {
              showNotification("success", "Account Created!", "Please check your email for a confirmation link to complete your registration.")
            } else if (data?.session) {
              showNotification("success", "Account Created!", "Welcome to TransportX! Redirecting to dashboard...")
              setTimeout(() => {
                router.push("/dashboard")
              }, 2000)
            }
          }
        }
      } else {
        const { data, error } = await signIn(formData.email, formData.password)
        
        if (error) {
          showNotification("error", "Sign In Failed", error.message || "Invalid credentials")
        } else {
          showNotification("success", "Welcome Back!", "Successfully signed in. Redirecting...")
          setTimeout(() => {
            router.push("/dashboard")
          }, 1500)
        }
      }
    } catch (error) {
      console.error("Auth error:", error)
      showNotification("error", "Authentication Error", "An unexpected error occurred")
    } finally {
      setLoading(false)
    }
  }

  // Fix Demo Account button to actually log in and redirect
  const handleDemoAccount = async () => {
    setLoading(true)
    try {
      loginDemo()
      showNotification("success", "Demo Mode", "You are now exploring as a demo user!")
      setTimeout(() => {
        router.push("/dashboard")
      }, 1000)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FDFCFB] py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <Card className="bg-white border border-gray-200 shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-[#333333]">
              {isSignUp ? "Create Account" : "Welcome Back"}
            </CardTitle>
            <p className="text-[#666666]">
              {isSignUp
                ? "Join TransportX for seamless transportation"
                : "Sign in to your TransportX account"}
            </p>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              {isSignUp && (
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="text-[#333333] font-medium">
                    <User className="inline w-4 h-4 mr-2" />
                    Full Name
                  </Label>
                  <Input
                    id="fullName"
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.fullName}
                    onChange={(e) => setFormData((prev) => ({ ...prev, fullName: e.target.value }))}
                    required={isSignUp}
                    className="border-gray-300 focus:border-[#FF6B00] focus:ring-[#FF6B00] text-[#333333] placeholder:text-[#999999]"
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email" className="text-[#333333] font-medium">
                  <Mail className="inline w-4 h-4 mr-2" />
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                  required
                  className="border-gray-300 focus:border-[#FF6B00] focus:ring-[#FF6B00] text-[#333333] placeholder:text-[#999999]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-[#333333] font-medium">
                  <Lock className="inline w-4 h-4 mr-2" />
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
                    required
                    className="border-gray-300 focus:border-[#FF6B00] focus:ring-[#FF6B00] text-[#333333] placeholder:text-[#999999] pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#666666] hover:text-[#333333]"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-[#FF6B00] hover:bg-[#E55A00] text-white"
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>{isSignUp ? "Creating Account..." : "Signing In..."}</span>
                  </div>
                ) : (
                  <span>{isSignUp ? "Create Account" : "Sign In"}</span>
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-[#666666]">
                {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
                <button
                  onClick={() => setIsSignUp(!isSignUp)}
                  className="text-[#FF6B00] font-medium hover:underline"
                >
                  {isSignUp ? "Sign In" : "Sign Up"}
                </button>
              </p>
            </div>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-[#666666]">Or continue with</span>
                </div>
              </div>

              <div className="mt-6">
                <Button
                  variant="outline"
                  className="w-full border-gray-300 text-[#666666] hover:bg-[#FF6B00]/5 hover:text-[#FF6B00]"
                  onClick={handleDemoAccount}
                  disabled={loading}
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Demo Account
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
