'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { blogApi } from '@/lib/api'
import { toast } from 'sonner'

interface CommentFormProps {
  blogId: string
  onCommentAdded: () => void
}

export default function CommentForm({ blogId, onCommentAdded }: CommentFormProps) {
  const [formData, setFormData] = useState({
    author: '',
    email: '',
    website: '',
    content: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.author.trim()) {
      newErrors.author = 'Name is required'
    } else if (formData.author.length > 100) {
      newErrors.author = 'Name must be less than 100 characters'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    if (formData.website && !/^https?:\/\/.+/.test(formData.website)) {
      newErrors.website = 'Please enter a valid URL (including http:// or https://)'
    }

    if (!formData.content.trim()) {
      newErrors.content = 'Comment is required'
    } else if (formData.content.length < 5) {
      newErrors.content = 'Comment must be at least 5 characters'
    } else if (formData.content.length > 1000) {
      newErrors.content = 'Comment must be less than 1000 characters'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      await blogApi.addComment(blogId, {
        author: formData.author.trim(),
        email: formData.email.trim(),
        website: formData.website.trim() || undefined,
        content: formData.content.trim()
      })

      // Reset form
      setFormData({
        author: '',
        email: '',
        website: '',
        content: ''
      })
      setErrors({})

      toast.success('Comment submitted successfully! It will be visible after admin approval.')
      onCommentAdded()
    } catch (error) {
      console.error('Error submitting comment:', error)
      toast.error('Failed to submit comment. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  return (
    <div className="relative bg-gradient-to-br from-gray-800/40 via-gray-800/20 to-gray-900/40 backdrop-blur-sm rounded-2xl p-8 mt-12 border border-gray-700/30 shadow-2xl">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 rounded-2xl animate-pulse"></div>
      
      <div className="relative z-10">
        <div className="flex items-center space-x-3 mb-8">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Join the Discussion
          </h3>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="group">
            <Label htmlFor="author" className="text-gray-300 font-medium mb-2 block group-focus-within:text-blue-400 transition-colors">
              Name *
            </Label>
            <div className="relative">
              <Input
                id="author"
                type="text"
                value={formData.author}
                onChange={(e) => handleInputChange('author', e.target.value)}
                className="bg-gray-900/50 border-gray-600/50 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 rounded-xl h-12 px-4 hover:border-gray-500"
                placeholder="Your name"
                disabled={isSubmitting}
              />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/0 via-purple-500/0 to-pink-500/0 group-focus-within:from-blue-500/10 group-focus-within:via-purple-500/10 group-focus-within:to-pink-500/10 transition-all duration-500 pointer-events-none"></div>
            </div>
            {errors.author && (
              <p className="text-red-400 text-sm mt-2 animate-bounce">{errors.author}</p>
            )}
          </div>

          <div className="group">
            <Label htmlFor="email" className="text-gray-300 font-medium mb-2 block group-focus-within:text-blue-400 transition-colors">
              Email *
            </Label>
            <div className="relative">
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="bg-gray-900/50 border-gray-600/50 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 rounded-xl h-12 px-4 hover:border-gray-500"
                placeholder="your@email.com"
                disabled={isSubmitting}
              />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/0 via-purple-500/0 to-pink-500/0 group-focus-within:from-blue-500/10 group-focus-within:via-purple-500/10 group-focus-within:to-pink-500/10 transition-all duration-500 pointer-events-none"></div>
            </div>
            {errors.email && (
              <p className="text-red-400 text-sm mt-2 animate-bounce">{errors.email}</p>
            )}
          </div>
        </div>

        <div className="group">
          <Label htmlFor="website" className="text-gray-300 font-medium mb-2 block group-focus-within:text-blue-400 transition-colors">
            Website (Optional)
          </Label>
          <div className="relative">
            <Input
              id="website"
              type="url"
              value={formData.website}
              onChange={(e) => handleInputChange('website', e.target.value)}
              className="bg-gray-900/50 border-gray-600/50 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 rounded-xl h-12 px-4 hover:border-gray-500"
              placeholder="https://yourwebsite.com"
              disabled={isSubmitting}
            />
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/0 via-purple-500/0 to-pink-500/0 group-focus-within:from-blue-500/10 group-focus-within:via-purple-500/10 group-focus-within:to-pink-500/10 transition-all duration-500 pointer-events-none"></div>
          </div>
          {errors.website && (
            <p className="text-red-400 text-sm mt-2 animate-bounce">{errors.website}</p>
          )}
        </div>

        <div className="group">
          <Label htmlFor="content" className="text-gray-300 font-medium mb-2 block group-focus-within:text-blue-400 transition-colors">
            Comment *
          </Label>
          <div className="relative">
            <textarea
              id="content"
              value={formData.content}
              onChange={(e) => handleInputChange('content', e.target.value)}
              className="w-full min-h-[140px] px-4 py-3 bg-gray-900/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 resize-y transition-all duration-300 hover:border-gray-500"
              placeholder="Share your thoughts and join the conversation..."
              disabled={isSubmitting}
            />
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/0 via-purple-500/0 to-pink-500/0 group-focus-within:from-blue-500/10 group-focus-within:via-purple-500/10 group-focus-within:to-pink-500/10 transition-all duration-500 pointer-events-none"></div>
          </div>
          <div className="flex justify-between items-center mt-2">
            {errors.content && (
              <p className="text-red-400 text-sm animate-bounce">{errors.content}</p>
            )}
            <div className="flex items-center space-x-2 ml-auto">
              <div className={`h-2 w-2 rounded-full transition-colors ${
                formData.content.length > 800 ? 'bg-red-500' : 
                formData.content.length > 500 ? 'bg-yellow-500' : 'bg-green-500'
              }`}></div>
              <p className="text-gray-400 text-sm">
                {formData.content.length}/1000
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold px-6 py-2 rounded-full transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Comment'}
          </Button>
        </div>
      </form>

      <div className="mt-4 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
        <p className="text-blue-300 text-sm">
          📝 All comments are reviewed before publication to ensure quality and relevance.
        </p>
      </div>
      </div>
    </div>
  )
}