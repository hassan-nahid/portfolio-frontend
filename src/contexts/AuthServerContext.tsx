'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import { checkAuthServer, loginServer, logoutServer, User } from '@/lib/auth-server'

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  logout: () => Promise<void>
  isLoading: boolean
  isAuthenticated: boolean
  refreshAuth: () => Promise<void>
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
  initialAuth?: { user: User | null; isAuthenticated: boolean }
}

export function AuthProvider({ children, initialAuth }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(initialAuth?.user || null)
  const [isLoading, setIsLoading] = useState(!initialAuth) // Don't load if we have initial data
  const router = useRouter()

  // Function to refresh auth state from server
  const refreshAuth = async () => {
    try {
      setIsLoading(true)
      console.log('🔄 Refreshing auth state from server...')
      
      const authResult = await checkAuthServer()
      
      console.log('✅ Server auth check complete:', {
        isAuthenticated: authResult.isAuthenticated,
        user: authResult.user?.name
      })
      
      setUser(authResult.user)
    } catch (error) {
      console.error('❌ Failed to refresh auth:', error)
      setUser(null)
    } finally {
      setIsLoading(false)
    }
  }

  // Initial auth check only if no initial auth provided
  useEffect(() => {
    if (!initialAuth) {
      console.log('🔍 No initial auth provided, checking server...')
      refreshAuth()
    } else {
      console.log('✅ Using initial auth from server:', initialAuth.user?.name)
    }
  }, [initialAuth])

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setIsLoading(true)
      console.log('🚪 Attempting login...')
      
      const result = await loginServer(email, password)
      
      if (result.success && result.user) {
        console.log('✅ Login successful:', result.user.name)
        setUser(result.user)
        return true
      } else {
        console.error('❌ Login failed:', result.message)
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
      setUser(null) // Clear immediately for UI responsiveness
      await logoutServer() // This will redirect to login
    } catch (error) {
      console.error('❌ Logout error:', error)
      // Still redirect even if logout fails
      router.push('/auth/login')
    }
  }

  const value = {
    user,
    login,
    logout,
    isLoading,
    isAuthenticated: !!user,
    refreshAuth
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}