'use client'

import { useState } from 'react'
import { 
  User, 
  Eye, 
  EyeOff, 
  Save,
  Shield,
  Mail,
  UserCircle,
  Key
} from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { userApi, ChangePasswordData } from '@/lib/api'
import toast from 'react-hot-toast';

interface PasswordFormData {
  oldPassword: string
  newPassword: string
  confirmPassword: string
}

export default function SettingsPage() {
  const { user } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [showPasswords, setShowPasswords] = useState({
    old: false,
    new: false,
    confirm: false
  })
  
  const [passwordForm, setPasswordForm] = useState<PasswordFormData>({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  })

  const togglePasswordVisibility = (field: 'old' | 'new' | 'confirm') => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field]
    }))
  }

  const validatePassword = (password: string) => {
    const minLength = password.length >= 8
    const hasUpperCase = /[A-Z]/.test(password)
    const hasSpecialChar = /[!@#$%^&*]/.test(password)
    const hasNumber = /\d/.test(password)
    
    return {
      minLength,
      hasUpperCase,
      hasSpecialChar,
      hasNumber,
      isValid: minLength && hasUpperCase && hasSpecialChar && hasNumber
    }
  }

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!passwordForm.oldPassword || !passwordForm.newPassword || !passwordForm.confirmPassword) {
      toast.error('All password fields are required')
      return
    }

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast.error('New passwords do not match')
      return
    }

    const validation = validatePassword(passwordForm.newPassword)
    if (!validation.isValid) {
      toast.error('New password does not meet security requirements')
      return
    }

    setIsLoading(true)
    try {
      const changePasswordData: ChangePasswordData = {
        oldPassword: passwordForm.oldPassword,
        newPassword: passwordForm.newPassword
      }
      
      const response = await userApi.changePassword(changePasswordData)
      
      if (response.success) {
        toast.success('Password changed successfully')
        setPasswordForm({
          oldPassword: '',
          newPassword: '',
          confirmPassword: ''
        })
      } else {
        toast.error('Failed to change password')
      }
    } catch (error: unknown) {
      console.error('Password change error:', error)
      const errorMessage = error instanceof Error ? error.message : 'Failed to change password'
      toast.error(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  const passwordValidation = validatePassword(passwordForm.newPassword)

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
          <p className="text-gray-400">Manage your account settings and preferences</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Information */}
        <div className="lg:col-span-1">
          <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6">
            <div className="flex items-center space-x-2 mb-6">
              <UserCircle className="w-5 h-5 text-blue-400" />
              <h2 className="text-xl font-semibold text-white">Profile Information</h2>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 rounded-full flex items-center justify-center">
                  <User className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-white">{user?.name || 'User'}</h3>
                  <p className="text-sm text-gray-400">{user?.role || 'Admin'}</p>
                </div>
              </div>
              
              <div className="pt-4 border-t border-gray-700/50 space-y-3">
                <div className="flex items-center space-x-3">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-300">{user?.email || 'email@example.com'}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Shield className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-300">Account Status: Active</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Change Password */}
        <div className="lg:col-span-2">
          <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6">
            <div className="flex items-center space-x-2 mb-6">
              <Key className="w-5 h-5 text-blue-400" />
              <h2 className="text-xl font-semibold text-white">Change Password</h2>
            </div>
            
            <form onSubmit={handlePasswordChange} className="space-y-6">
              {/* Current Password */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Current Password
                </label>
                <div className="relative">
                  <input
                    type={showPasswords.old ? 'text' : 'password'}
                    value={passwordForm.oldPassword}
                    onChange={(e) => setPasswordForm(prev => ({ ...prev, oldPassword: e.target.value }))}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 pr-12 text-white focus:outline-none focus:border-blue-500 transition-colors"
                    placeholder="Enter your current password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility('old')}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                  >
                    {showPasswords.old ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* New Password */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  New Password
                </label>
                <div className="relative">
                  <input
                    type={showPasswords.new ? 'text' : 'password'}
                    value={passwordForm.newPassword}
                    onChange={(e) => setPasswordForm(prev => ({ ...prev, newPassword: e.target.value }))}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 pr-12 text-white focus:outline-none focus:border-blue-500 transition-colors"
                    placeholder="Enter your new password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility('new')}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                  >
                    {showPasswords.new ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                
                {/* Password Requirements */}
                {passwordForm.newPassword && (
                  <div className="mt-3 space-y-2">
                    <p className="text-xs text-gray-400">Password requirements:</p>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className={`flex items-center space-x-1 ${passwordValidation.minLength ? 'text-green-400' : 'text-gray-400'}`}>
                        <div className={`w-2 h-2 rounded-full ${passwordValidation.minLength ? 'bg-green-400' : 'bg-gray-400'}`}></div>
                        <span>At least 8 characters</span>
                      </div>
                      <div className={`flex items-center space-x-1 ${passwordValidation.hasUpperCase ? 'text-green-400' : 'text-gray-400'}`}>
                        <div className={`w-2 h-2 rounded-full ${passwordValidation.hasUpperCase ? 'bg-green-400' : 'bg-gray-400'}`}></div>
                        <span>1 uppercase letter</span>
                      </div>
                      <div className={`flex items-center space-x-1 ${passwordValidation.hasSpecialChar ? 'text-green-400' : 'text-gray-400'}`}>
                        <div className={`w-2 h-2 rounded-full ${passwordValidation.hasSpecialChar ? 'bg-green-400' : 'bg-gray-400'}`}></div>
                        <span>1 special character</span>
                      </div>
                      <div className={`flex items-center space-x-1 ${passwordValidation.hasNumber ? 'text-green-400' : 'text-gray-400'}`}>
                        <div className={`w-2 h-2 rounded-full ${passwordValidation.hasNumber ? 'bg-green-400' : 'bg-gray-400'}`}></div>
                        <span>1 number</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Confirm New Password */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Confirm New Password
                </label>
                <div className="relative">
                  <input
                    type={showPasswords.confirm ? 'text' : 'password'}
                    value={passwordForm.confirmPassword}
                    onChange={(e) => setPasswordForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 pr-12 text-white focus:outline-none focus:border-blue-500 transition-colors"
                    placeholder="Confirm your new password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility('confirm')}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                  >
                    {showPasswords.confirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                
                {/* Password Match Indicator */}
                {passwordForm.confirmPassword && (
                  <div className="mt-2">
                    {passwordForm.newPassword === passwordForm.confirmPassword ? (
                      <p className="text-xs text-green-400">✓ Passwords match</p>
                    ) : (
                      <p className="text-xs text-red-400">✗ Passwords do not match</p>
                    )}
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <div className="flex justify-end pt-4 border-t border-gray-700/50">
                <button
                  type="submit"
                  disabled={isLoading || !passwordValidation.isValid || passwordForm.newPassword !== passwordForm.confirmPassword}
                  className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>Changing Password...</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      <span>Change Password</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Security Tips */}
      <div className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-6">
        <div className="flex items-start space-x-3">
          <Shield className="w-6 h-6 text-blue-400 mt-1" />
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">Security Tips</h3>
            <ul className="text-sm text-gray-300 space-y-1">
              <li>• Use a strong, unique password that you don&apos;t use elsewhere</li>
              <li>• Consider using a password manager to generate and store secure passwords</li>
              <li>• Change your password regularly, especially if you suspect it may be compromised</li>
              <li>• Never share your password with anyone</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}