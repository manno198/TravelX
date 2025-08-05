"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, User, LogOut, Settings, Wallet } from "lucide-react"
import { useAuth } from "@/contexts/AuthContext"
import { Button } from "@/components/ui/button"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const { user, profile, signOut } = useAuth()
  const router = useRouter()

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/booking", label: "Book Ride" },
    { href: "/dashboard", label: "Dashboard" },
    { href: "/about", label: "About" },
  ]

  // Helper to close profile dropdown and optionally navigate
  const handleProfileOption = (action: () => void) => {
    setIsProfileOpen(false)
    action()
  }

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm"
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
              className="w-8 h-8 bg-gradient-to-r from-[#FF6B00] to-[#4A90E2] rounded-lg flex items-center justify-center"
            >
              <span className="text-white font-bold text-lg">T</span>
            </motion.div>
            <span className="text-[#333333] font-bold text-xl">TransportX</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-[#666666] hover:text-[#FF6B00] transition-colors duration-300 relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#FF6B00] transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center space-x-2 bg-[#FF6B00]/10 rounded-full px-4 py-2 text-[#FF6B00] hover:bg-[#FF6B00]/20 transition-colors border border-[#FF6B00]/20"
                >
                  <User size={20} />
                  <span className="hidden sm:block">{profile?.full_name || "User"}</span>
                </motion.button>

                <AnimatePresence>
                  {isProfileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-xl"
                    >
                      <div className="p-4 border-b border-gray-200">
                        <p className="text-[#333333] font-medium">{profile?.full_name}</p>
                        <p className="text-[#666666] text-sm">{profile?.email}</p>
                        <div className="flex items-center mt-2 text-[#FF6B00]">
                          <Wallet size={16} className="mr-2" />
                          <span className="text-sm">${profile?.wallet_balance || 0}</span>
                        </div>
                      </div>
                      <div className="p-2">
                        <button
                          onClick={() => handleProfileOption(() => router.push("/dashboard"))}
                          className="flex items-center w-full px-3 py-2 text-[#666666] hover:text-[#FF6B00] hover:bg-[#FF6B00]/5 rounded transition-colors"
                        >
                          <Settings size={16} className="mr-2" />
                          Dashboard
                        </button>
                        <button
                          onClick={() => handleProfileOption(async () => {
                            await signOut()
                            router.push("/auth/signin")
                          })}
                          className="flex items-center w-full px-3 py-2 text-[#666666] hover:text-red-500 hover:bg-red-50 rounded transition-colors"
                        >
                          <LogOut size={16} className="mr-2" />
                          Sign Out
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link href="/auth/signin">
                  <Button variant="outline" size="sm" className="text-[#666666] border-gray-300 hover:bg-[#FF6B00]/5 hover:text-[#FF6B00]">
                    Sign In
                  </Button>
                </Link>
                <Link href="/auth/signup">
                  <Button size="sm" className="bg-[#FF6B00] hover:bg-[#E55A00] text-white">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-[#333333] p-2"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden mt-4 pt-4 border-t border-gray-200"
            >
              {navItems.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={item.href}
                    className="block py-2 text-[#666666] hover:text-[#FF6B00] transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  )
}
