import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "@/contexts/AuthContext"
import { ThemeProvider } from "@/contexts/ThemeContext"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { NotificationProvider } from "@/contexts/NotificationContext"
import { NotificationDisplay } from "@/components/ui/notification-display"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "TransportX - Revolutionary Transport Booking Platform",
  description: "Experience seamless journeys with real-time tracking and instant booking",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-[#FDFCFB] text-[#333333]">
        <ThemeProvider>
          <AuthProvider>
            <NotificationProvider>
              <Header />
              <main>{children}</main>
              <Footer />
              <NotificationDisplay />
            </NotificationProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
