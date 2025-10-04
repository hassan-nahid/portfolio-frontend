'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { useRouter } from 'next/navigation'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL

export interface User {
  _id: string
  email: string
  name: string
  role: 'OWNER' | 'ADMIN' | 'USER'
  createdAt: string
  updatedAt: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  logout: () => Promise<void>
  isLoading: boolean
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  // Check authentication using HTTP-only cookies (server-side approach)
  const checkAuth = async () => {
    try {
      // Ensure we're on the client side
      if (typeof window === 'undefined') {
        console.log('⚠️ Server-side rendering, skipping auth check')
        setIsLoading(false)
        return false
      }

      console.log('🔐 Checking authentication with HTTP-only cookies...')
      
      // Make request with credentials to include HTTP-only cookies
      const response = await fetch(`${API_BASE_URL}/user/me`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // This includes HTTP-only cookies
      })

      if (!response.ok) {
        console.log('❌ Auth check failed:', response.status)
        setUser(null)
        return false
      }

      const data = await response.json()
      
      if (data.success && data.data) {
        console.log('✅ Authentication successful with cookies:', data.data.name)
        setUser(data.data)
        return true
      } else {
        console.log('❌ Invalid response from /me endpoint')
        setUser(null)
        return false
      }
    } catch (error) {
      console.error('❌ Auth check failed:', error)
      setUser(null)
      return false
    }
  }

  // Check for existing session on mount
  useEffect(() => {
    const initialAuthCheck = async () => {
      console.log('🔍 Initial auth check on mount...')
      await checkAuth()
      setIsLoading(false)
      console.log('🏁 Initial auth check completed')
    }

    initialAuthCheck()
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setIsLoading(true)
      console.log('🚪 Attempting login with cookies...')
      
      // Login request with credentials to set HTTP-only cookies
      const response = await fetch(`${API_BASE_URL}/user/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // This allows setting HTTP-only cookies
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()
      
      if (response.ok && data.success && data.data) {
        console.log('✅ Login successful with cookies:', data.data.user.name)
        setUser(data.data.user)
        return true
      } else {
        console.error('❌ Login failed:', data.message)
        return false
      }
    } catch (error) {
      console.error('❌ Login error:', error)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async () => {
    try {
      console.log('🚪 Attempting logout...')
      
      // Call logout endpoint to clear HTTP-only cookies
      await fetch(`${API_BASE_URL}/user/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // This clears HTTP-only cookies
      })
      
      console.log('✅ Logout successful')
    } catch (error) {
      console.error('❌ Logout error:', error)
    } finally {
      // Clear user state and redirect
      console.log('🚪 Clearing user state and redirecting')
      setUser(null)
      router.push('/auth/login')
    }
  }

  const value = {
    user,
    login,
    logout,
    isLoading,
    isAuthenticated: !!user
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}