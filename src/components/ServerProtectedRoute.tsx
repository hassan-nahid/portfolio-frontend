import { checkAuthServer } from '@/lib/auth-server'
import { redirect } from 'next/navigation'
import { AuthProvider } from '@/contexts/AuthServerContext'

interface ServerProtectedRouteProps {
  children: React.ReactNode
}

export default async function ServerProtectedRoute({ children }: ServerProtectedRouteProps) {
  // Server-side authentication check
  const authResult = await checkAuthServer()
  
  // If not authenticated, redirect to login
  if (!authResult.isAuthenticated) {
    redirect('/auth/login')
  }

  // If authenticated, provide the auth context with initial data
  return (
    <AuthProvider initialAuth={authResult}>
      {children}
    </AuthProvider>
  )
}