'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

const API_BASE_URL = 'http://localhost:5000/api/v1'

export interface User {
  _id: string
  email: string
  name: string
  role: 'OWNER' | 'ADMIN' | 'USER'
  createdAt: string
  updatedAt: string
}

export interface AuthResponse {
  user: User | null
  isAuthenticated: boolean
}

// Server action to check authentication using HTTP-only cookies
export async function checkAuthServer(): Promise<AuthResponse> {
  try {
    const cookieStore = cookies()
    
    // Get all cookies and send them to backend
    const cookieHeader = cookieStore.toString()
    
    const response = await fetch(`${API_BASE_URL}/user/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Cookie': cookieHeader, // Send all cookies to backend
      },
      // Don't use credentials: 'include' for server-side requests
    })

    if (!response.ok) {
      console.log('Auth check failed:', response.status)
      return { user: null, isAuthenticated: false }
    }

    const data = await response.json()
    
    if (data.success && data.data) {
      return {
        user: data.data,
        isAuthenticated: true
      }
    }

    return { user: null, isAuthenticated: false }
  } catch (error) {
    console.error('Server auth check error:', error)
    return { user: null, isAuthenticated: false }
  }
}

// Server action for login
export async function loginServer(email: string, password: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/user/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })

    const data = await response.json()

    if (response.ok && data.success) {
      // HTTP-only cookies will be automatically set by the browser
      // from the backend response headers

      return {
        success: true,
        user: data.data.user,
        message: 'Login successful'
      }
    }

    return {
      success: false,
      message: data.message || 'Login failed'
    }
  } catch (error) {
    console.error('Login error:', error)
    return {
      success: false,
      message: 'Network error occurred'
    }
  }
}

// Server action for logout
export async function logoutServer() {
  try {
    const cookieStore = cookies()
    const cookieHeader = cookieStore.toString()

    await fetch(`${API_BASE_URL}/user/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Cookie': cookieHeader,
      },
    })

  } catch (error) {
    console.error('Logout error:', error)
  }
  
  redirect('/auth/login')
}

// Function to redirect to login if not authenticated
export async function requireAuth() {
  const auth = await checkAuthServer()
  
  if (!auth.isAuthenticated) {
    redirect('/auth/login')
  }
  
  return auth.user
}