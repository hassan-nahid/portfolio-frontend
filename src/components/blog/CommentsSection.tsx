'use client'

import { useState, useEffect, useCallback } from 'react'
import { User, Globe, Calendar } from 'lucide-react'
import { blogApi, type BlogCommentData } from '@/lib/api'
import { Button } from '@/components/ui/button'
import CommentForm from './CommentForm'

// Add CSS animation keyframes
const fadeInUp = `
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  .animate-fadeInUp {
    animation: fadeInUp 0.6s ease-out forwards;
  }
`

interface CommentsSectionProps {
  blogId: string
  initialComments?: BlogCommentData[]
  initialCommentCount?: number
}

// Helper function to format time ago
const timeAgo = (date: string | Date) => {
  const now = new Date()
  const commentDate = new Date(date)
  const diffInSeconds = Math.floor((now.getTime() - commentDate.getTime()) / 1000)

  if (diffInSeconds < 60) return 'Just now'
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`
  if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)} days ago`
  if (diffInSeconds < 31536000) return `${Math.floor(diffInSeconds / 2592000)} months ago`
  return `${Math.floor(diffInSeconds / 31536000)} years ago`
}

export default function CommentsSection({ 
  blogId, 
  initialComments = [], 
  initialCommentCount = 0 
}: CommentsSectionProps) {
  // Inject CSS for animations
  useEffect(() => {
    const style = document.createElement('style')
    style.textContent = fadeInUp
    document.head.appendChild(style)
    return () => {
      if (document.head.contains(style)) {
        document.head.removeChild(style)
      }
    }
  }, [])
  const [comments, setComments] = useState<BlogCommentData[]>(initialComments)
  const [commentCount, setCommentCount] = useState(initialCommentCount)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)

  // Load comments when component mounts or when we need to refresh
  const loadComments = useCallback(async (pageNum: number = 1, append: boolean = false) => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await blogApi.getComments(blogId, { 
        page: pageNum, 
        limit: 10 
      })

      if (response.data) {
        const newComments = response.data.result || []
        const meta = response.data.meta

        if (append) {
          setComments(prev => [...prev, ...newComments])
        } else {
          setComments(newComments)
        }

        setCommentCount(meta?.total || 0)
        setHasMore(pageNum < (meta?.totalPage || 1))
      }
    } catch (err) {
      console.error('Error loading comments:', err)
      setError('Failed to load comments. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }, [blogId])

  // Load more comments (pagination)
  const loadMoreComments = () => {
    const nextPage = page + 1
    setPage(nextPage)
    loadComments(nextPage, true)
  }

  // Refresh comments after new comment is added
  const handleCommentAdded = () => {
    setPage(1)
    loadComments(1, false)
  }

  // Load comments on mount if we don't have initial data
  useEffect(() => {
    if (initialComments.length === 0) {
      loadComments()
    }
  }, [blogId, initialComments.length, loadComments])

  return (
    <section className="py-16 border-t border-gradient-to-r from-gray-800/30 via-gray-700/50 to-gray-800/30">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center mb-12">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 via-purple-600 to-pink-500 flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
                  Community Discussion
                </h2>
                <p className="text-gray-400 mt-1">
                  {commentCount} {commentCount === 1 ? 'thoughtful comment' : 'thoughtful comments'}
                </p>
              </div>
            </div>
          </div>
          
          {/* Comments List */}
          <div className="space-y-6 mb-8">
            {isLoading && comments.length === 0 ? (
              // Loading skeleton
              <div className="space-y-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-gradient-to-br from-gray-800/40 via-gray-800/20 to-gray-900/40 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/30 animate-pulse">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-gray-700 via-gray-600 to-gray-700 animate-pulse"></div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="h-5 w-32 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 rounded-xl animate-pulse"></div>
                          <div className="h-4 w-20 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 rounded-full animate-pulse"></div>
                        </div>
                        <div className="space-y-3">
                          <div className="h-4 w-full bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 rounded-lg animate-pulse"></div>
                          <div className="h-4 w-4/5 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 rounded-lg animate-pulse"></div>
                          <div className="h-4 w-3/5 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 rounded-lg animate-pulse"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 mx-auto mb-6 rounded-3xl bg-gradient-to-br from-red-500/20 via-red-400/10 to-red-500/20 flex items-center justify-center backdrop-blur-sm border border-red-500/20 shadow-2xl">
                  <svg className="w-8 h-8 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="text-red-400 mb-6 text-lg font-medium">{error}</p>
                <Button
                  onClick={() => loadComments()}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold px-6 py-3 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-blue-500/25"
                >
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                  </svg>
                  Try Again
                </Button>
              </div>
            ) : comments.length > 0 ? (
              <>
                {comments.map((comment, index) => (
                  <div 
                    key={comment._id || Math.random()} 
                    className="group relative bg-gradient-to-br from-gray-800/40 via-gray-800/20 to-gray-900/40 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/30 hover:border-gray-600/50 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/10 transform hover:-translate-y-1"
                    style={{
                      animationDelay: `${index * 100}ms`
                    }}
                  >
                    {/* Subtle animated gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-blue-500/5 group-hover:via-purple-500/5 group-hover:to-pink-500/5 rounded-2xl transition-all duration-700"></div>
                    
                    <div className="relative z-10 flex items-start space-x-4">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 via-purple-600 to-pink-500 flex items-center justify-center flex-shrink-0 shadow-lg group-hover:shadow-blue-500/25 transition-all duration-300 group-hover:scale-110">
                        <User className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center flex-wrap gap-3 mb-3">
                          <h4 className="font-bold truncate bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
                            {comment.author}
                          </h4>
                          {comment.website && (
                            <a
                              href={comment.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-400 hover:text-blue-300 transition-all duration-300 transform hover:scale-110 p-1 rounded-lg hover:bg-blue-500/10"
                              title="Visit website"
                            >
                              <Globe className="w-4 h-4" />
                            </a>
                          )}
                          <div className="flex items-center space-x-1 text-gray-400 text-sm bg-gray-800/50 px-3 py-1 rounded-full">
                            <Calendar className="w-3 h-3" />
                            <span>{timeAgo(comment.createdAt)}</span>
                          </div>
                        </div>
                        <div className="relative">
                          <p className="text-gray-200 whitespace-pre-wrap break-words leading-relaxed">
                            {comment.content}
                          </p>
                          {/* Quote-like accent */}
                          <div className="absolute -left-2 top-0 w-1 h-full bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 rounded-full opacity-30 group-hover:opacity-60 transition-opacity duration-300"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Load More Button */}
                {hasMore && (
                  <div className="flex justify-center">
                    <Button
                      onClick={loadMoreComments}
                      disabled={isLoading}
                      className="relative bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 hover:from-gray-600 hover:via-gray-500 hover:to-gray-600 text-white font-semibold px-8 py-3 rounded-2xl transition-all duration-500 transform hover:scale-105 hover:shadow-xl hover:shadow-gray-500/25 group overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-blue-500/20 group-hover:via-purple-500/20 group-hover:to-pink-500/20 transition-all duration-500"></div>
                      <span className="relative z-10 flex items-center space-x-2">
                        {isLoading ? (
                          <>
                            <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                            </svg>
                            <span>Loading...</span>
                          </>
                        ) : (
                          <>
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                            <span>Load More Comments</span>
                          </>
                        )}
                      </span>
                    </Button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-16">
                <div className="relative mx-auto mb-8">
                  <div className="w-24 h-24 mx-auto rounded-3xl bg-gradient-to-br from-gray-800/60 via-gray-700/40 to-gray-800/60 flex items-center justify-center backdrop-blur-sm border border-gray-700/30 shadow-2xl">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 flex items-center justify-center">
                      <User className="w-8 h-8 text-gray-400" />
                    </div>
                  </div>
                  {/* Floating particles effect */}
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2">
                    <div className="w-2 h-2 bg-blue-500/40 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                  </div>
                  <div className="absolute top-4 left-1/2 transform -translate-x-8">
                    <div className="w-1.5 h-1.5 bg-purple-500/40 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                  <div className="absolute top-4 left-1/2 transform translate-x-6">
                    <div className="w-1 h-1 bg-pink-500/40 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
                <div className="space-y-3">
                  <h3 className="text-xl font-bold bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 bg-clip-text text-transparent">
                    Start the Conversation
                  </h3>
                  <p className="text-gray-400 text-lg">No comments yet</p>
                  <p className="text-gray-500 max-w-md mx-auto leading-relaxed">
                    Be the first to share your thoughts and spark an engaging discussion!
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Comment Form */}
          <CommentForm 
            blogId={blogId} 
            onCommentAdded={handleCommentAdded}
          />
        </div>
      </div>
    </section>
  )
}