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
  XCircle,
  Calendar,
  User,
  Tag
} from 'lucide-react'
import Image from 'next/image'

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

interface Author {
  _id: string
  name: string
  email: string
  role: string
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
  author: string        // ObjectId as string
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

  useEffect(() => {
    fetchBlogs()
    fetchComments()
  }, [])

  const fetchBlogs = async () => {
    try {
      // Mock data - replace with actual API call to /api/v1/blog/admin
      const mockBlogs: BlogPost[] = [
        {
          _id: '1',
          title: 'Building Modern Web Applications with React and TypeScript',
          slug: 'building-modern-web-applications',
          excerpt: 'A comprehensive guide to creating scalable web applications using React and TypeScript with best practices.',
          content: '# Building Modern Web Applications...',
          featuredImage: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop',
          author: 'auth1', // ObjectId as string
          category: BlogCategory.WEB_DEVELOPMENT,
          tags: ['React', 'TypeScript', 'Web Development'],
          status: BlogStatus.PUBLISHED,
          isFeature: true,
          viewCount: 1234,
          commentCount: 15,
          comments: [],
          publishedAt: '2024-01-15T12:00:00Z',
          createdAt: '2024-01-15T10:30:00Z',
          updatedAt: '2024-01-16T14:22:00Z'
        },
        {
          _id: '2',
          title: 'Advanced Node.js Security Best Practices',
          slug: 'nodejs-security-best-practices',
          excerpt: 'Learn how to secure your Node.js applications with comprehensive security measures and best practices.',
          content: '# Node.js Security...',
          featuredImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop',
          author: 'auth1', // ObjectId as string
          category: BlogCategory.PROGRAMMING,
          tags: ['Node.js', 'Security', 'Backend'],
          status: BlogStatus.DRAFT,
          isFeature: false,
          viewCount: 0,
          commentCount: 0,
          comments: [],
          createdAt: '2024-01-20T09:15:00Z',
          updatedAt: '2024-01-20T09:15:00Z'
        }
      ]
      setBlogs(mockBlogs)
    } catch (error) {
      console.error('Failed to fetch blogs:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const fetchComments = async () => {
    try {
      // Mock data - replace with actual API call to fetch pending comments
      const mockComments: BlogComment[] = [
        {
          _id: '1',
          author: 'John Doe',
          email: 'john@example.com',
          content: 'Great article! Very informative and well-structured.',
          isApproved: false,
          createdAt: '2024-01-18T14:30:00Z',
          updatedAt: '2024-01-18T14:30:00Z'
        },
        {
          _id: '2',
          author: 'Jane Smith',
          email: 'jane@example.com',
          content: 'Thanks for sharing these insights. Could you elaborate more on the TypeScript configuration?',
          isApproved: false,
          createdAt: '2024-01-19T10:15:00Z',
          updatedAt: '2024-01-19T10:15:00Z'
        }
      ]
      setComments(mockComments)
    } catch (error) {
      console.error('Failed to fetch comments:', error)
    }
  }

  const handleDeleteBlog = async (id: string) => {
    if (confirm('Are you sure you want to delete this blog post?')) {
      try {
        // API call to DELETE /api/v1/blog/:id
        setBlogs(blogs.filter(blog => blog._id !== id))
      } catch (error) {
        console.error('Failed to delete blog:', error)
      }
    }
  }

  const handleCommentAction = async (commentId: string, action: 'approve' | 'reject') => {
    try {
      // API call to PATCH /api/v1/blog/comments/:commentId
      setComments(comments.map(comment => 
        comment._id === commentId 
          ? { ...comment, isApproved: action === 'approve' }
          : comment
      ))
    } catch (error) {
      console.error(`Failed to ${action} comment:`, error)
    }
  }

  const filteredBlogs = blogs.filter(blog => {
    const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || blog.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published':
        return 'bg-green-500/20 text-green-400'
      case 'draft':
        return 'bg-yellow-500/20 text-yellow-400'
      case 'archived':
        return 'bg-gray-500/20 text-gray-400'
      default:
        return 'bg-blue-500/20 text-blue-400'
    }
  }

  const BlogCard = ({ blog }: { blog: BlogPost }) => (
    <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(blog.status)}`}>
              {blog.status}
            </span>
            {blog.isFeature && (
              <span className="px-2 py-1 bg-purple-500/20 text-purple-400 rounded-full text-xs font-medium">
                Featured
              </span>
            )}
          </div>
          <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2">
            {blog.title}
          </h3>
          <p className="text-gray-400 text-sm mb-3 line-clamp-2">
            {blog.excerpt}
          </p>
        </div>
        <div className="flex items-center space-x-2 ml-4">
          <button
            onClick={() => setSelectedBlog(blog)}
            className="p-2 text-blue-400 hover:bg-blue-500/20 rounded-lg transition-colors"
            title="View"
          >
            <Eye className="w-4 h-4" />
          </button>
          <button
            className="p-2 text-green-400 hover:bg-green-500/20 rounded-lg transition-colors"
            title="Edit"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleDeleteBlog(blog._id)}
            className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors"
            title="Delete"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between text-sm text-gray-400">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <User className="w-4 h-4" />
            <span>Author</span>
          </div>
          <div className="flex items-center space-x-1">
            <Calendar className="w-4 h-4" />
            <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <Eye className="w-4 h-4" />
            <span>{blog.viewCount}</span>
          </div>
          <div className="flex items-center space-x-1">
            <MessageSquare className="w-4 h-4" />
            <span>{blog.commentCount}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-2 mt-3">
        <Tag className="w-3 h-3 text-gray-500" />
        <div className="flex flex-wrap gap-1">
          {blog.tags.map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-blue-500/10 text-blue-400 rounded text-xs"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  )

  const CommentCard = ({ comment }: { comment: BlogComment }) => (
    <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <h4 className="font-semibold text-white">{comment.author}</h4>
            <span className="text-gray-400 text-sm">({comment.email})</span>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              !comment.isApproved ? 'bg-yellow-500/20 text-yellow-400' :
              'bg-green-500/20 text-green-400'
            }`}>
              {comment.isApproved ? 'approved' : 'pending'}
            </span>
          </div>
          <p className="text-gray-300 mb-2">{comment.content}</p>
          {comment.website && (
            <p className="text-xs text-gray-500">
              Website: <span className="text-blue-400">{comment.website}</span>
            </p>
          )}
        </div>
        {!comment.isApproved && (
          <div className="flex items-center space-x-2 ml-4">
            <button
              onClick={() => handleCommentAction(comment._id!, 'approve')}
              className="p-2 text-green-400 hover:bg-green-500/20 rounded-lg transition-colors"
              title="Approve"
            >
              <CheckCircle className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleCommentAction(comment._id!, 'reject')}
              className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors"
              title="Reject"
            >
              <XCircle className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
      <div className="flex items-center text-xs text-gray-400">
        <Clock className="w-3 h-3 mr-1" />
        {new Date(comment.createdAt).toLocaleString()}
      </div>
    </div>
  )

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
          <h1 className="text-3xl font-bold text-white">Blog Management</h1>
          <p className="text-gray-400 mt-2">Manage your blog posts and comments</p>
        </div>
        <button className="flex items-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors">
          <Plus className="w-5 h-5" />
          <span>New Blog Post</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center space-x-1 bg-white/5 p-1 rounded-lg w-fit">
        <button
          onClick={() => setActiveTab('posts')}
          className={`px-4 py-2 rounded-md transition-colors ${
            activeTab === 'posts'
              ? 'bg-blue-500 text-white'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          Blog Posts ({blogs.length})
        </button>
        <button
          onClick={() => setActiveTab('comments')}
          className={`px-4 py-2 rounded-md transition-colors ${
            activeTab === 'comments'
              ? 'bg-blue-500 text-white'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          Comments ({comments.filter(c => !c.isApproved).length} pending)
        </button>
      </div>

      {activeTab === 'posts' && (
        <>
          {/* Filters */}
          <div className="flex items-center space-x-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search blog posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as 'all' | 'draft' | 'published' | 'archived')}
              className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
            >
              <option value="all">All Status</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
              <option value="archived">Archived</option>
            </select>
          </div>

          {/* Blog Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBlogs.map((blog) => (
              <BlogCard key={blog._id} blog={blog} />
            ))}
          </div>

          {filteredBlogs.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">No blogs found</h3>
              <p className="text-gray-400">Try adjusting your search or filters</p>
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
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">No comments</h3>
              <p className="text-gray-400">Comments will appear here when submitted</p>
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
    </div>
  )
}