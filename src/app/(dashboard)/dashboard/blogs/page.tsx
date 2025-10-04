'use client'

import { useState, useEffect } from 'react'
import { 
  Plus, 
  Search, 
  Eye, 
  Edit, 
  Trash2, 
  MessageSquare,
  Clock,
  CheckCircle,
  XCircle
} from 'lucide-react'
import Image from 'next/image'
import { blogApi } from '@/lib/api'
import toast from 'react-hot-toast';

// Backend Blog Categories enum
enum BlogCategory {
  TECHNOLOGY = "Technology",
  WEB_DEVELOPMENT = "Web Development",
  PROGRAMMING = "Programming",
  TUTORIAL = "Tutorial",
  PERSONAL = "Personal",
  OTHER = "Other"
}

// Backend Blog Status enum
enum BlogStatus {
  DRAFT = "draft",
  PUBLISHED = "published",
  ARCHIVED = "archived"
}

interface BlogComment {
  _id?: string
  author: string        // Commenter name
  email: string         // Commenter email
  website?: string      // Optional website
  content: string       // Comment text
  isApproved: boolean   // Admin approval required
  createdAt: string
  updatedAt: string
}

interface BlogPost {
  _id: string
  title: string
  slug: string
  excerpt: string
  content: string
  featuredImage?: string
  author: {
    _id: string
    name: string
    email: string
    avatar?: string
  }
  category: BlogCategory
  tags: string[]
  status: BlogStatus
  isFeature: boolean
  viewCount: number
  commentCount: number
  comments: BlogComment[]
  publishedAt?: string
  createdAt: string
  updatedAt: string
}

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<BlogPost[]>([])
  const [comments, setComments] = useState<BlogComment[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | 'draft' | 'published' | 'archived'>('all')
  const [activeTab, setActiveTab] = useState<'posts' | 'comments'>('posts')

  const [selectedBlog, setSelectedBlog] = useState<BlogPost | null>(null)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [editingBlog, setEditingBlog] = useState<BlogPost | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    fetchBlogs()
    fetchComments()
  }, [])

  const fetchBlogs = async () => {
    try {
      setIsLoading(true)
      console.log('Fetching blogs...')
      console.log('API Base URL:', process.env.NEXT_PUBLIC_API_URL)
      
      // Try to fetch from API first
      try {
        // Try admin endpoint first, fallback to public endpoint
        let response
        try {
          response = await blogApi.getAllForAdmin()
        } catch (adminError) {
          console.log('Admin endpoint failed, trying public endpoint:', adminError)
          response = await blogApi.getPublic()
        }
        
        console.log('Blog API Response:', response)
        console.log('Response success:', response.success)
        console.log('Response data:', response.data)
        
        if (response.success && response.data) {
          // Check if data has result property or if data itself is the array
          const blogData = response.data.result || response.data
          console.log('Blog data received:', blogData)
          console.log('Blog data type:', Array.isArray(blogData) ? 'array' : typeof blogData)
          
          if (Array.isArray(blogData)) {
            setBlogs(blogData as BlogPost[])
          } else {
            console.log('Blog data is not an array:', blogData)
            setBlogs([])
          }
          return
        } else {
          console.log('Response not successful or no data')
          setBlogs([])
        }
      } catch (apiError) {
        console.error('API Error:', apiError)
        setBlogs([])
      }
    } catch (error) {
      console.error('Failed to fetch blogs:', error)
      setBlogs([])
    } finally {
      setIsLoading(false)
    }
  }

  const fetchComments = async () => {
    try {
      // Get all blogs first to extract pending comments
      let response
      try {
        response = await blogApi.getAllForAdmin()
      } catch (adminError) {
        console.log('Admin endpoint failed for comments, trying public endpoint:', adminError)
        response = await blogApi.getPublic()
      }
      
      if (response.success && response.data) {
        // Extract all pending comments from all blogs
        const pendingComments: BlogComment[] = []
        // Check if data has result property or if data itself is the array
        const blogData = response.data.result || response.data
        
        if (Array.isArray(blogData)) {
          blogData.forEach(blog => {
            if (blog.comments && Array.isArray(blog.comments)) {
              blog.comments.forEach(comment => {
                if (!comment.isApproved) {
                  pendingComments.push({
                    ...comment,
                    blogId: blog._id, // Add blog reference for comment management
                    blogTitle: blog.title
                  } as BlogComment & { blogId: string; blogTitle: string })
                }
              })
            }
          })
        }
        setComments(pendingComments)
      } else {
        console.log('Failed to get blog data for comments')
        setComments([])
      }
    } catch (error) {
      console.error('Failed to fetch comments:', error)
      setComments([])
    }
  }

  const handleDeleteBlog = async (id: string) => {
    if (confirm('Are you sure you want to delete this blog post?')) {
      try {
        const response = await blogApi.delete(id)
        
        if (response.success) {
          setBlogs(blogs.filter(blog => blog._id !== id))
          toast.success('Blog post deleted successfully!')
        }
      } catch (error) {
        console.error('Failed to delete blog:', error)
        toast.error('Failed to delete blog post. Please try again.')
      }
    }
  }

  const handleCommentAction = async (commentId: string, action: 'approve' | 'reject') => {
    try {
      const response = await blogApi.manageComment(commentId, action)
      
      if (response.success) {
        // Remove the comment from pending list if approved/rejected
        setComments(comments.filter(comment => comment._id !== commentId))
        // Refresh blogs to update comment counts
        fetchBlogs()
        toast.success(`Comment ${action}d successfully!`)
      }
    } catch (error) {
      console.error(`Failed to ${action} comment:`, error)
      toast.error(`Failed to ${action} comment. Please try again.`)
    }
  }

  const handleCreateBlog = async (formData: FormData) => {
    setIsSubmitting(true)
    try {
      const response = await blogApi.create(formData)
      
      if (response.success) {
        setShowCreateModal(false)
        fetchBlogs() // Refresh the blog list
        toast.success('Blog created successfully!')
      }
    } catch (error) {
      console.error('Failed to create blog:', error)
      toast.error('Failed to create blog. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleEditBlog = async (id: string, formData: FormData) => {
    setIsSubmitting(true)
    try {
      const response = await blogApi.update(id, formData)
      
      if (response.success) {
        setShowEditModal(false)
        setEditingBlog(null)
        fetchBlogs() // Refresh the blog list
        toast.success('Blog updated successfully!')
      }
    } catch (error) {
      console.error('Failed to update blog:', error)
      toast.error('Failed to update blog. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const openEditModal = (blog: BlogPost) => {
    setEditingBlog(blog)
    setShowEditModal(true)
  }

  const filteredBlogs = (blogs || []).filter(blog => {
    const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || blog.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published':
        return 'bg-gradient-to-r from-green-500/80 to-emerald-500/80 text-white border border-green-400/30'
      case 'draft':
        return 'bg-gradient-to-r from-yellow-500/80 to-orange-500/80 text-white border border-yellow-400/30'
      case 'archived':
        return 'bg-gradient-to-r from-gray-500/80 to-slate-500/80 text-white border border-gray-400/30'
      default:
        return 'bg-gradient-to-r from-blue-500/80 to-cyan-500/80 text-white border border-blue-400/30'
    }
  }

  const BlogCard = ({ blog }: { blog: BlogPost }) => (
    <div className="group bg-gradient-to-br from-white/8 to-white/4 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:border-white/30 hover:from-white/12 hover:to-white/8 transition-all duration-500 shadow-lg hover:shadow-xl hover:shadow-blue-500/10">
      {/* Header with Image */}
      {blog.featuredImage && (
        <div className="relative overflow-hidden rounded-xl mb-4 h-48">
          <Image
            src={blog.featuredImage}
            alt={blog.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute top-3 left-3 flex items-center space-x-2">
            <span className={`px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm ${getStatusColor(blog.status)}`}>
              {blog.status.toUpperCase()}
            </span>
            {blog.isFeature && (
              <span className="px-3 py-1 bg-gradient-to-r from-purple-500/80 to-pink-500/80 text-white rounded-full text-xs font-semibold backdrop-blur-sm">
                ⭐ FEATURED
              </span>
            )}
          </div>
        </div>
      )}

      {/* Content */}
      <div className="space-y-4">
        {/* Title and Category */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded-lg text-xs font-medium">
              {blog.category}
            </span>
            <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button
                onClick={() => setSelectedBlog(blog)}
                className="p-2 text-blue-400 hover:bg-blue-500/20 rounded-xl transition-all duration-200 hover:scale-110"
                title="View Details"
              >
                <Eye className="w-4 h-4" />
              </button>
              <button
                onClick={() => openEditModal(blog)}
                className="p-2 text-emerald-400 hover:bg-emerald-500/20 rounded-xl transition-all duration-200 hover:scale-110"
                title="Edit Blog"
              >
                <Edit className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleDeleteBlog(blog._id)}
                className="p-2 text-red-400 hover:bg-red-500/20 rounded-xl transition-all duration-200 hover:scale-110"
                title="Delete Blog"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
          <h3 
            className="text-lg sm:text-xl font-bold text-white mb-3 leading-tight group-hover:text-blue-200 transition-colors overflow-hidden"
            style={{
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical'
            }}
            title={blog.title}
          >
            {blog.title}
          </h3>
          <p 
            className="text-gray-300 text-xs sm:text-sm mb-4 leading-relaxed overflow-hidden"
            style={{
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical'
            }}
            title={blog.excerpt}
          >
            {blog.excerpt}
          </p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {blog.tags.slice(0, 3).map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-gradient-to-r from-blue-500/10 to-purple-500/10 text-blue-300 rounded-full text-xs font-medium border border-blue-500/20 hover:border-blue-400/40 transition-colors"
            >
              #{tag}
            </span>
          ))}
          {blog.tags.length > 3 && (
            <span className="px-3 py-1 bg-gray-500/10 text-gray-400 rounded-full text-xs font-medium">
              +{blog.tags.length - 3} more
            </span>
          )}
        </div>

        {/* Footer Stats */}
        <div className="flex items-center justify-between pt-4 border-t border-white/10">
          <div className="flex items-center space-x-4 text-sm text-gray-400">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                {blog.author?.name?.charAt(0) || 'U'}
              </div>
              <div>
                <p className="text-white text-sm font-medium">{blog.author?.name || 'Unknown'}</p>
                <p className="text-xs text-gray-400">{new Date(blog.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center space-x-1 text-gray-400 hover:text-blue-400 transition-colors">
              <Eye className="w-4 h-4" />
              <span className="font-medium">{blog.viewCount.toLocaleString()}</span>
            </div>
            <div className="flex items-center space-x-1 text-gray-400 hover:text-green-400 transition-colors">
              <MessageSquare className="w-4 h-4" />
              <span className="font-medium">{blog.commentCount}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const CommentCard = ({ comment }: { comment: BlogComment }) => (
    <div className="group bg-gradient-to-br from-white/8 to-white/4 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:border-white/30 transition-all duration-300 shadow-lg hover:shadow-xl">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
              {comment.author.charAt(0).toUpperCase()}
            </div>
            <div>
              <h4 className="font-semibold text-white text-lg">{comment.author}</h4>
              <p className="text-gray-400 text-sm">{comment.email}</p>
            </div>
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
              !comment.isApproved ? 'bg-gradient-to-r from-yellow-500/80 to-orange-500/80 text-white' :
              'bg-gradient-to-r from-green-500/80 to-emerald-500/80 text-white'
            }`}>
              {comment.isApproved ? '✅ APPROVED' : '⏳ PENDING'}
            </span>
          </div>
          
          <div className="bg-white/5 rounded-xl p-4 mb-3 border-l-4 border-blue-400">
            <p className="text-gray-200 leading-relaxed">{comment.content}</p>
          </div>
          
          {comment.website && (
            <p className="text-sm text-gray-400 flex items-center space-x-2">
              <span>🌐</span>
              <span>Website:</span>
              <a href={comment.website} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 underline">
                {comment.website}
              </a>
            </p>
          )}
        </div>
        
        {!comment.isApproved && (
          <div className="flex items-center space-x-2 ml-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              onClick={() => handleCommentAction(comment._id!, 'approve')}
              className="p-3 text-green-400 hover:bg-green-500/20 rounded-xl transition-all duration-200 hover:scale-110 group"
              title="Approve Comment"
            >
              <CheckCircle className="w-5 h-5" />
            </button>
            <button
              onClick={() => handleCommentAction(comment._id!, 'reject')}
              className="p-3 text-red-400 hover:bg-red-500/20 rounded-xl transition-all duration-200 hover:scale-110"
              title="Reject Comment"
            >
              <XCircle className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
      
      <div className="flex items-center justify-between pt-3 border-t border-white/10">
        <div className="flex items-center text-sm text-gray-400">
          <Clock className="w-4 h-4 mr-2" />
          <span>{new Date(comment.createdAt).toLocaleString()}</span>
        </div>
        {(comment as BlogComment & { blogTitle?: string }).blogTitle && (
          <div className="text-sm text-gray-400">
            <span>On: </span>
            <span className="text-blue-400 font-medium">{(comment as BlogComment & { blogTitle: string }).blogTitle}</span>
          </div>
        )}
      </div>
    </div>
  )

  console.log('Current blogs state:', blogs)
  console.log('Filtered blogs:', filteredBlogs)

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-white/5 rounded w-48"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white/5 rounded-xl p-6 h-64"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">Blog Management</h1>
          <p className="text-gray-300 mt-2 text-lg">Create, edit, and manage your blog content</p>
          <div className="flex items-center space-x-4 mt-3 text-sm text-gray-400">
            <span className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span>{blogs.length} Total Posts</span>
            </span>
            <span className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
              <span>{comments.filter(c => !c.isApproved).length} Pending Comments</span>
            </span>
          </div>
        </div>
        <button 
          onClick={() => setShowCreateModal(true)}
          className="group flex items-center space-x-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-blue-500/25 hover:scale-105"
        >
          <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
          <span className="font-semibold">Create New Post</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center space-x-2 bg-gradient-to-r from-white/10 to-white/5 p-2 rounded-2xl backdrop-blur-sm border border-white/20 w-fit">
        <button
          onClick={() => setActiveTab('posts')}
          className={`relative px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
            activeTab === 'posts'
              ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg transform scale-105'
              : 'text-gray-300 hover:text-white hover:bg-white/10'
          }`}
        >
          <span className="flex items-center space-x-2">
            <span>📝 Blog Posts</span>
            <span className={`px-2 py-1 rounded-full text-xs font-bold ${
              activeTab === 'posts' ? 'bg-white/20' : 'bg-blue-500/20 text-blue-400'
            }`}>
              {blogs.length}
            </span>
          </span>
        </button>
        <button
          onClick={() => setActiveTab('comments')}
          className={`relative px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
            activeTab === 'comments'
              ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg transform scale-105'
              : 'text-gray-300 hover:text-white hover:bg-white/10'
          }`}
        >
          <span className="flex items-center space-x-2">
            <span>💬 Comments</span>
            <span className={`px-2 py-1 rounded-full text-xs font-bold ${
              activeTab === 'comments' ? 'bg-white/20' : 'bg-orange-500/20 text-orange-400'
            }`}>
              {comments.filter(c => !c.isApproved).length}
            </span>
          </span>
          {comments.filter(c => !c.isApproved).length > 0 && (
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
          )}
        </button>
      </div>

      {activeTab === 'posts' && (
        <>
          {/* Filters */}
          <div className="flex items-center space-x-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 transition-colors" />
              <input
                type="text"
                placeholder="Search blog posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-gradient-to-r from-white/10 to-white/5 border border-white/20 rounded-xl pl-12 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 backdrop-blur-sm transition-all duration-300"
              />
            </div>
            <div className="relative">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as 'all' | 'draft' | 'published' | 'archived')}
                className="appearance-none bg-gradient-to-r from-white/10 to-white/5 border border-white/20 rounded-xl px-4 py-3 pr-10 text-white focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 backdrop-blur-sm transition-all duration-300 cursor-pointer"
              >
                <option value="all" className="bg-gray-800">🌐 All Status</option>
                <option value="published" className="bg-gray-800">✅ Published</option>
                <option value="draft" className="bg-gray-800">📝 Draft</option>
                <option value="archived" className="bg-gray-800">📦 Archived</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Blog Posts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredBlogs.map((blog) => (
              <BlogCard key={blog._id} blog={blog} />
            ))}
          </div>

          {filteredBlogs.length === 0 && (
            <div className="col-span-full text-center py-16">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6 backdrop-blur-sm border border-white/10">
                <Search className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">No blogs found</h3>
              <p className="text-gray-400 text-lg mb-6">Try adjusting your search terms or filters</p>
              <button 
                onClick={() => setShowCreateModal(true)}
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <Plus className="w-5 h-5" />
                <span>Create Your First Blog</span>
              </button>
            </div>
          )}
        </>
      )}

      {activeTab === 'comments' && (
        <div className="space-y-4">
          {comments.map((comment) => (
            <CommentCard key={comment._id} comment={comment} />
          ))}

          {comments.length === 0 && (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gradient-to-br from-green-500/20 to-blue-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6 backdrop-blur-sm border border-white/10">
                <MessageSquare className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">No pending comments</h3>
              <p className="text-gray-400 text-lg">All comments have been reviewed or no comments have been submitted yet</p>
            </div>
          )}
        </div>
      )}

      {/* Blog Detail Modal */}
      {selectedBlog && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-white/10">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">{selectedBlog.title}</h2>
                <button
                  onClick={() => setSelectedBlog(null)}
                  className="text-gray-400 hover:text-white"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>
            </div>
            <div className="p-6">
              {selectedBlog.featuredImage && (
                <Image
                  src={selectedBlog.featuredImage}
                  alt={selectedBlog.title}
                  width={800}
                  height={400}
                  className="w-full h-64 object-cover rounded-lg mb-6"
                />
              )}
              <div className="prose prose-invert max-w-none">
                <p className="text-gray-300 mb-4">{selectedBlog.excerpt}</p>
                <div className="text-gray-300">{selectedBlog.content}</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create Blog Modal */}
      {showCreateModal && (
        <BlogFormModal
          title="Create New Blog Post"
          onClose={() => setShowCreateModal(false)}
          onSubmit={handleCreateBlog}
          isSubmitting={isSubmitting}
        />
      )}

      {/* Edit Blog Modal */}
      {showEditModal && editingBlog && (
        <BlogFormModal
          title="Edit Blog Post"
          blog={editingBlog}
          onClose={() => {
            setShowEditModal(false)
            setEditingBlog(null)
          }}
          onSubmit={(formData) => handleEditBlog(editingBlog._id, formData)}
          isSubmitting={isSubmitting}
        />
      )}
    </div>
  )
}

// Blog Form Modal Component
interface BlogFormModalProps {
  title: string
  blog?: BlogPost
  onClose: () => void
  onSubmit: (formData: FormData) => void
  isSubmitting: boolean
}

function BlogFormModal({ title, blog, onClose, onSubmit, isSubmitting }: BlogFormModalProps) {
  const [formData, setFormData] = useState({
    title: blog?.title || '',
    excerpt: blog?.excerpt || '',
    content: blog?.content || '',
    category: blog?.category || BlogCategory.TECHNOLOGY,
    tags: blog?.tags.join(', ') || '',
    status: blog?.status || BlogStatus.DRAFT,
    isFeature: blog?.isFeature || false
  })
  const [featuredImage, setFeaturedImage] = useState<File | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const submitFormData = new FormData()
    submitFormData.append('title', formData.title)
    submitFormData.append('excerpt', formData.excerpt)
    submitFormData.append('content', formData.content)
    submitFormData.append('category', formData.category)
    submitFormData.append('tags', JSON.stringify(formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag)))
    submitFormData.append('status', formData.status)
    submitFormData.append('isFeature', formData.isFeature.toString())
    
    if (featuredImage) {
      submitFormData.append('featuredImage', featuredImage)
    }
    
    onSubmit(submitFormData)
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white">{title}</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white"
              disabled={isSubmitting}
            >
              <XCircle className="w-6 h-6" />
            </button>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              ✏️ Title *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              className="w-full bg-gradient-to-r from-white/10 to-white/5 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 backdrop-blur-sm transition-all duration-300 hover:border-white/30"
              placeholder="Enter an engaging blog title..."
              required
              minLength={5}
              maxLength={200}
            />
            <div className="mt-1 text-xs text-gray-400">
              {formData.title.length}/200 characters
            </div>
          </div>

          {/* Excerpt */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              📄 Excerpt *
            </label>
            <textarea
              value={formData.excerpt}
              onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
              className="w-full bg-gradient-to-r from-white/10 to-white/5 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 backdrop-blur-sm transition-all duration-300 hover:border-white/30 h-24 resize-none"
              placeholder="Write a compelling excerpt that summarizes your blog post..."
              required
              minLength={20}
              maxLength={500}
            />
            <div className="mt-1 text-xs text-gray-400">
              {formData.excerpt.length}/500 characters
            </div>
          </div>

          {/* Content */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              📝 Content *
            </label>
            <textarea
              value={formData.content}
              onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
              className="w-full bg-gradient-to-r from-white/10 to-white/5 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 backdrop-blur-sm transition-all duration-300 hover:border-white/30 h-64 resize-none"
              placeholder="Write your blog content here... You can use Markdown for formatting."
              required
              minLength={100}
              maxLength={50000}
            />
            <div className="mt-1 flex justify-between text-xs text-gray-400">
              <span>{formData.content.length}/50,000 characters</span>
              <span>Markdown supported</span>
            </div>
          </div>

          {/* Category and Status Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                📂 Category *
              </label>
              <div className="relative">
                <select
                  value={formData.category}
                  onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value as BlogCategory }))}
                  className="w-full appearance-none bg-gradient-to-r from-white/10 to-white/5 border border-white/20 rounded-xl px-4 py-3 pr-12 text-white focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 backdrop-blur-sm transition-all duration-300 cursor-pointer hover:border-white/30"
                  required
                >
                  {Object.values(BlogCategory).map(category => {
                    const categoryIcons = {
                      'Technology': '💻',
                      'Web Development': '🌐',
                      'Programming': '⚡',
                      'Tutorial': '📚',
                      'Personal': '👤',
                      'Other': '📝'
                    }
                    return (
                      <option key={category} value={category} className="bg-gray-800 text-white py-2">
                        {categoryIcons[category as keyof typeof categoryIcons]} {category}
                      </option>
                    )
                  })}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                📊 Status *
              </label>
              <div className="relative">
                <select
                  value={formData.status}
                  onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as BlogStatus }))}
                  className="w-full appearance-none bg-gradient-to-r from-white/10 to-white/5 border border-white/20 rounded-xl px-4 py-3 pr-12 text-white focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 backdrop-blur-sm transition-all duration-300 cursor-pointer hover:border-white/30"
                  required
                >
                  {Object.values(BlogStatus).map(status => {
                    const statusIcons = {
                      'draft': '📝',
                      'published': '✅',
                      'archived': '📦'
                    }
                    return (
                      <option key={status} value={status} className="bg-gray-800 text-white py-2">
                        {statusIcons[status as keyof typeof statusIcons]} {status.charAt(0).toUpperCase() + status.slice(1)}
                      </option>
                    )
                  })}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              🏷️ Tags * (comma-separated)
            </label>
            <input
              type="text"
              value={formData.tags}
              onChange={(e) => setFormData(prev => ({ ...prev, tags: e.target.value }))}
              className="w-full bg-gradient-to-r from-white/10 to-white/5 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 backdrop-blur-sm transition-all duration-300 hover:border-white/30"
              placeholder="React, TypeScript, Web Development, Tutorial..."
              required
            />
            <div className="mt-2 flex flex-wrap gap-2">
              {formData.tags.split(',').map((tag, index) => {
                const trimmedTag = tag.trim()
                return trimmedTag ? (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-300 rounded-full text-xs font-medium border border-blue-500/30 backdrop-blur-sm"
                  >
                    #{trimmedTag}
                  </span>
                ) : null
              })}
            </div>
          </div>

          {/* Featured Image */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              🖼️ Featured Image
            </label>
            <div className="relative">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setFeaturedImage(e.target.files?.[0] || null)}
                className="w-full bg-gradient-to-r from-white/10 to-white/5 border border-white/20 rounded-xl px-4 py-3 text-white transition-all duration-300 hover:border-white/30 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-gradient-to-r file:from-blue-500 file:to-purple-600 file:text-white hover:file:from-blue-600 hover:file:to-purple-700 file:transition-all file:duration-300 file:shadow-md hover:file:shadow-lg"
              />
            </div>
            {blog?.featuredImage && !featuredImage && (
              <div className="mt-2 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                <p className="text-sm text-blue-300 flex items-center space-x-2">
                  <span>ℹ️</span>
                  <span>Current image will be kept if no new image is selected</span>
                </p>
              </div>
            )}
            {featuredImage && (
              <div className="mt-2 p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                <p className="text-sm text-green-300 flex items-center space-x-2">
                  <span>✅</span>
                  <span>New image selected: {featuredImage.name}</span>
                </p>
              </div>
            )}
          </div>

          {/* Feature Toggle */}
          <div className="flex items-center space-x-3 p-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-xl backdrop-blur-sm">
            <div className="relative">
              <input
                type="checkbox"
                id="isFeature"
                checked={formData.isFeature}
                onChange={(e) => setFormData(prev => ({ ...prev, isFeature: e.target.checked }))}
                className="sr-only"
              />
              <label
                htmlFor="isFeature"
                className={`relative inline-flex items-center justify-center w-12 h-6 rounded-full cursor-pointer transition-all duration-300 ${
                  formData.isFeature
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg'
                    : 'bg-white/10 border border-white/20'
                }`}
              >
                <span
                  className={`absolute w-5 h-5 bg-white rounded-full shadow-md transition-transform duration-300 ${
                    formData.isFeature ? 'translate-x-3' : '-translate-x-3'
                  }`}
                />
              </label>
            </div>
            <div>
              <label htmlFor="isFeature" className="text-sm font-semibold text-white cursor-pointer flex items-center space-x-2">
                <span>⭐</span>
                <span>Mark as Featured Blog</span>
              </label>
              <p className="text-xs text-gray-400 mt-1">
                Featured blogs will be highlighted and shown prominently
              </p>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end space-x-4 pt-4 border-t border-white/10">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center space-x-2 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-500/50 text-white px-6 py-2 rounded-lg transition-colors"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                  <span>{blog ? 'Updating...' : 'Creating...'}</span>
                </>
              ) : (
                <span>{blog ? 'Update Blog' : 'Create Blog'}</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}