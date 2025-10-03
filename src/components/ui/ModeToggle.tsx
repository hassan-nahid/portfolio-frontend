"use client"

import * as React from "react"
import { Moon } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"

export function ModeToggle() {
  const { setTheme, resolvedTheme } = useTheme()

  React.useEffect(() => {
    // Force dark mode and disable system theme detection
    setTheme("dark")
    
    // Also force the HTML element to have dark class
    if (typeof window !== 'undefined') {
      document.documentElement.classList.add('dark')
      document.documentElement.classList.remove('light')
      
      // Store preference to prevent system override
      localStorage.setItem('theme', 'dark')
    }
  }, [setTheme])

  // Monitor theme changes and force dark mode
  React.useEffect(() => {
    if (resolvedTheme !== 'dark') {
      setTheme("dark")
      if (typeof window !== 'undefined') {
        document.documentElement.classList.add('dark')
        document.documentElement.classList.remove('light')
      }
    }
  }, [resolvedTheme, setTheme])

  return (
    <Button 
      variant="outline" 
      size="icon"
      className="bg-white/10 border-white/20 hover:bg-white/20"
      onClick={() => setTheme("dark")}
    >
      <Moon className="h-[1.2rem] w-[1.2rem] text-white" />
      <span className="sr-only">Dark mode only</span>
    </Button>
  )
}
