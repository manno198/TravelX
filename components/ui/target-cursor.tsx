"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface TargetCursorProps {
  size?: number
  color?: string
  className?: string
}

export function TargetCursor({
  size = 40,
  color = "#4A90E2",
  className = "",
}: TargetCursorProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
      setIsVisible(true)
    }

    const hideCursor = () => {
      setIsVisible(false)
    }

    document.addEventListener("mousemove", updatePosition)
    document.addEventListener("mouseleave", hideCursor)

    return () => {
      document.removeEventListener("mousemove", updatePosition)
      document.removeEventListener("mouseleave", hideCursor)
    }
  }, [])

  return (
    <motion.div
      className={`fixed pointer-events-none z-[99999] ${className}`}
      style={{
        left: position.x - size / 2,
        top: position.y - size / 2,
        transform: 'translate3d(0, 0, 0)',
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: isVisible ? 1 : 0,
        scale: isVisible ? 1 : 0,
      }}
      transition={{ duration: 0.2, ease: "easeOut" }}
    >
      {/* Outer radiating ring */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: `radial-gradient(circle, ${color}40 0%, ${color}20 30%, transparent 70%)`,
          width: size * 2,
          height: size * 2,
          left: -size / 2,
          top: -size / 2,
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.6, 0.3, 0.6],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {/* Middle radiating ring */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: `radial-gradient(circle, ${color}60 0%, ${color}30 50%, transparent 80%)`,
          width: size * 1.5,
          height: size * 1.5,
          left: -size / 4,
          top: -size / 4,
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.8, 0.5, 0.8],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {/* Main cursor circle */}
      <motion.div
        className="absolute rounded-full"
        style={{
          backgroundColor: color,
          width: size,
          height: size,
          boxShadow: `0 0 20px ${color}80, 0 0 40px ${color}40, 0 0 60px ${color}20`,
        }}
        animate={{
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {/* Inner glow dot */}
      <div
        className="absolute rounded-full"
        style={{
          backgroundColor: "#FFFFFF",
          width: size * 0.3,
          height: size * 0.3,
          top: size * 0.35,
          left: size * 0.35,
          boxShadow: `0 0 10px ${color}`,
        }}
      />
    </motion.div>
  )
}

// Hook to hide default cursor
export function useTargetCursor() {
  useEffect(() => {
    const style = document.createElement("style")
    style.textContent = `
      * {
        cursor: none !important;
      }
      
      button, a, [role="button"], [tabindex] {
        cursor: none !important;
      }
      
      input, textarea, select {
        cursor: none !important;
      }
      
      /* Ensure cursor doesn't interfere with layout */
      body {
        overflow-x: hidden;
      }
    `
    document.head.appendChild(style)

    return () => {
      if (document.head.contains(style)) {
        document.head.removeChild(style)
      }
    }
  }, [])
} 