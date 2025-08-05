"use client"

import { TargetCursor, useTargetCursor } from "./target-cursor"

export function CursorProvider() {
  useTargetCursor()
  
  return (
    <TargetCursor 
      size={35}
      color="#FF6B00"
    />
  )
} 