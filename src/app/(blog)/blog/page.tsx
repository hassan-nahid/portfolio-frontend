'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Search, Filter, Calendar, Eye, Clock, User, Tag, ChevronLeft, ChevronRight, ArrowLeft } from 'lucide-react'

interface Author {
  _id: string
  name: string
}

interface BlogPost {
  _id: string
  title: string
  excerpt: string
  content: string
  featuredImage: string
  author: Author
  category: string
  tags: string[]
  status: string
  isFeature: boolean
  viewCount: number
  commentCount: number
  createdAt: string
  updatedAt: string
  publishedAt: string
  slug: string
  id: string
}

interface BlogResponse {
  statusCode: number
  success: boolean
  message: string
  meta: {
    page: number
    limit: number
    total: number
    totalPage: number
  }
  data: BlogPost[]
}

// Extended mock data for the blog page
const mockBlogData: BlogResponse = {
  statusCode: 200,
  success: true,
  message: "Blogs retrieved successfully",
  meta: {
    page: 1,
    limit: 9,
    total: 12,
    totalPage: 2
  },
  data: [
    {
      _id: "68dd4e06cec4e151dd278f0d",
      title: "Getting Started with React TypeScript",
      excerpt: "Learn how to set up and build modern web applications using React with TypeScript for better type safety and developer experience.",
      content: "# Getting Started with React TypeScript\n\nReact with TypeScript has become the gold standard for building modern web applications...",
      featuredImage: "https://res.cloudinary.com/dfrbnzhov/image/upload/v1759333899/pvhxw9xhd78-1759333891530-download-jpg.jpg.jpg",
      author: {
        _id: "68dbe9f157ecf151bc078dd4",
        name: "Hassan Nahid"
      },
      category: "Technology",
      tags: ["React", "TypeScript", "Frontend", "JavaScript"],
      status: "published",
      isFeature: true,
      viewCount: 156,
      commentCount: 12,
      createdAt: "2025-10-01T15:51:34.439Z",
      updatedAt: "2025-10-01T15:51:34.439Z",
      slug: "getting-started-with-react-typescript",
      publishedAt: "2025-10-01T15:51:34.532Z",
      id: "68dd4e06cec4e151dd278f0d"
    },
    {
      _id: "68dd4e06cec4e151dd278f0e",
      title: "Building Modern APIs with Node.js and Express",
      excerpt: "A comprehensive guide to creating scalable and secure REST APIs using Node.js, Express, and modern best practices.",
      content: "# Building Modern APIs\n\nCreating robust APIs is essential for modern web development...",
      featuredImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop",
      author: {
        _id: "68dbe9f157ecf151bc078dd4",
        name: "Hassan Nahid"
      },
      category: "Backend",
      tags: ["Node.js", "Express", "API", "Backend"],
      status: "published",
      isFeature: false,
      viewCount: 89,
      commentCount: 5,
      createdAt: "2025-09-28T10:30:00.000Z",
      updatedAt: "2025-09-28T10:30:00.000Z",
      slug: "building-modern-apis-nodejs-express",
      publishedAt: "2025-09-28T10:30:00.000Z",
      id: "68dd4e06cec4e151dd278f0e"
    },
    {
      _id: "68dd4e06cec4e151dd278f0f",
      title: "Mastering CSS Grid and Flexbox Layouts",
      excerpt: "Deep dive into modern CSS layout techniques with practical examples and real-world use cases.",
      content: "# CSS Layouts Made Easy\n\nCSS Grid and Flexbox are powerful layout systems...",
      featuredImage: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&h=400&fit=crop",
      author: {
        _id: "68dbe9f157ecf151bc078dd4",
        name: "Hassan Nahid"
      },
      category: "Frontend",
      tags: ["CSS", "Grid", "Flexbox", "Layout"],
      status: "published",
      isFeature: false,
      viewCount: 234,
      commentCount: 18,
      createdAt: "2025-09-25T14:20:00.000Z",
      updatedAt: "2025-09-25T14:20:00.000Z",
      slug: "mastering-css-grid-flexbox-layouts",
      publishedAt: "2025-09-25T14:20:00.000Z",
      id: "68dd4e06cec4e151dd278f0f"
    },
    {
      _id: "68dd4e06cec4e151dd278f10",
      title: "Database Design Best Practices with MongoDB",
      excerpt: "Essential principles for designing efficient and scalable MongoDB schemas for modern applications.",
      content: "# MongoDB Schema Design\n\nEffective database design is crucial for application performance...",
      featuredImage: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=400&fit=crop",
      author: {
        _id: "68dbe9f157ecf151bc078dd4",
        name: "Hassan Nahid"
      },
      category: "Backend",
      tags: ["MongoDB", "Database", "NoSQL", "Schema"],
      status: "published",
      isFeature: false,
      viewCount: 67,
      commentCount: 4,
      createdAt: "2025-09-22T09:15:00.000Z",
      updatedAt: "2025-09-22T09:15:00.000Z",
      slug: "database-design-best-practices-mongodb",
      publishedAt: "2025-09-22T09:15:00.000Z",
      id: "68dd4e06cec4e151dd278f10"
    },
    {
      _id: "68dd4e06cec4e151dd278f11",
      title: "Advanced React Hooks and Custom Hooks",
      excerpt: "Explore advanced React hooks patterns and learn how to create powerful custom hooks for better code reusability.",
      content: "# Advanced React Hooks\n\nReact hooks have revolutionized how we write components...",
      featuredImage: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop",
      author: {
        _id: "68dbe9f157ecf151bc078dd4",
        name: "Hassan Nahid"
      },
      category: "Frontend",
      tags: ["React", "Hooks", "JavaScript", "Components"],
      status: "published",
      isFeature: true,
      viewCount: 198,
      commentCount: 22,
      createdAt: "2025-09-20T16:45:00.000Z",
      updatedAt: "2025-09-20T16:45:00.000Z",
      slug: "advanced-react-hooks-custom-hooks",
      publishedAt: "2025-09-20T16:45:00.000Z",
      id: "68dd4e06cec4e151dd278f11"
    },
    {
      _id: "68dd4e06cec4e151dd278f12",
      title: "Next.js 14 App Router Complete Guide",
      excerpt: "Everything you need to know about Next.js 14 App Router, server components, and the new routing paradigms.",
      content: "# Next.js App Router Guide\n\nNext.js 14 introduces powerful routing features...",
      featuredImage: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&h=400&fit=crop",
      author: {
        _id: "68dbe9f157ecf151bc078dd4",
        name: "Hassan Nahid"
      },
      category: "Technology",
      tags: ["Next.js", "React", "Routing", "Server Components"],
      status: "published",
      isFeature: false,
      viewCount: 145,
      commentCount: 8,
      createdAt: "2025-09-18T11:30:00.000Z",
      updatedAt: "2025-09-18T11:30:00.000Z",
      slug: "nextjs-14-app-router-complete-guide",
      publishedAt: "2025-09-18T11:30:00.000Z",
      id: "68dd4e06cec4e151dd278f12"
    },
    {
      _id: "68dd4e06cec4e151dd278f13",
      title: "Understanding JavaScript Closures and Scope",
      excerpt: "A deep dive into JavaScript closures, lexical scope, and how they work under the hood with practical examples.",
      content: "# JavaScript Closures Explained\n\nClosures are one of the most important concepts in JavaScript...",
      featuredImage: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=800&h=400&fit=crop",
      author: {
        _id: "68dbe9f157ecf151bc078dd4",
        name: "Hassan Nahid"
      },
      category: "Programming",
      tags: ["JavaScript", "Closures", "Scope", "Fundamentals"],
      status: "published",
      isFeature: false,
      viewCount: 312,
      commentCount: 15,
      createdAt: "2025-09-15T13:20:00.000Z",
      updatedAt: "2025-09-15T13:20:00.000Z",
      slug: "understanding-javascript-closures-scope",
      publishedAt: "2025-09-15T13:20:00.000Z",
      id: "68dd4e06cec4e151dd278f13"
    },
    {
      _id: "68dd4e06cec4e151dd278f14",
      title: "Docker Containerization for Web Developers",
      excerpt: "Learn how to containerize your web applications with Docker for consistent development and deployment environments.",
      content: "# Docker for Web Development\n\nContainerization has become essential for modern development workflows...",
      featuredImage: "https://images.unsplash.com/photo-1605745341112-85968b19335a?w=800&h=400&fit=crop",
      author: {
        _id: "68dbe9f157ecf151bc078dd4",
        name: "Hassan Nahid"
      },
      category: "DevOps",
      tags: ["Docker", "Containers", "DevOps", "Deployment"],
      status: "published",
      isFeature: false,
      viewCount: 76,
      commentCount: 6,
      createdAt: "2025-09-12T10:10:00.000Z",
      updatedAt: "2025-09-12T10:10:00.000Z",
      slug: "docker-containerization-web-developers",
      publishedAt: "2025-09-12T10:10:00.000Z",
      id: "68dd4e06cec4e151dd278f14"
    },
    {
      _id: "68dd4e06cec4e151dd278f15",
      title: "Web Performance Optimization Techniques",
      excerpt: "Comprehensive guide to optimizing web performance with modern techniques, tools, and best practices.",
      content: "# Web Performance Optimization\n\nPerformance is crucial for user experience and SEO...",
      featuredImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop",
      author: {
        _id: "68dbe9f157ecf151bc078dd4",
        name: "Hassan Nahid"
      },
      category: "Web Development",
      tags: ["Performance", "Optimization", "Web Vitals", "Speed"],
      status: "published",
      isFeature: true,
      viewCount: 287,
      commentCount: 31,
      createdAt: "2025-09-10T15:35:00.000Z",
      updatedAt: "2025-09-10T15:35:00.000Z",
      slug: "web-performance-optimization-techniques",
      publishedAt: "2025-09-10T15:35:00.000Z",
      id: "68dd4e06cec4e151dd278f15"
    }
  ]
}

// Calculate read time based on content length
const calculateReadTime = (content: string): string => {
  const wordsPerMinute = 200
  const words = content.split(' ').length
  const minutes = Math.ceil(words / wordsPerMinute)
  return `${minutes} min read`
}

// Blog Card Component
const BlogCard = ({ post }: { post: BlogPost }) => {
  const readTime = calculateReadTime(post.content)
  const publishedDate = new Date(post.publishedAt).toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric', 
    year: 'numeric' 
  })

  return (
    <article className="group relative">
      {/* Glow Effect */}
      <div className="absolute -inset-4 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-cyan-600/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
      
      {/* Card Container */}
      <div className="relative bg-gradient-to-br from-gray-900/50 to-black/30 backdrop-blur-sm border border-gray-700/50 rounded-3xl overflow-hidden hover:border-blue-500/30 transition-all duration-500">
        
        {/* Featured Image */}
        <div className="relative h-48 sm:h-56 overflow-hidden">
          <Image
            src={post.featuredImage}
            alt={post.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
          
          {/* Category Badge */}
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 bg-blue-500/20 text-blue-300 text-xs font-medium rounded-full border border-blue-500/30 backdrop-blur-sm">
              {post.category}
            </span>
          </div>

          {/* Featured Badge */}
          {post.isFeature && (
            <div className="absolute top-4 right-4">
              <span className="px-2 py-1 bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-300 text-xs font-medium rounded-full border border-amber-500/30 backdrop-blur-sm">
                Featured
              </span>
            </div>
          )}

          {/* View Count */}
          <div className="absolute bottom-4 right-4">
            <div className="flex items-center space-x-1 px-2 py-1 bg-black/30 rounded-full backdrop-blur-sm">
              <Eye className="w-3 h-3 text-gray-300" />
              <span className="text-xs text-gray-300">{post.viewCount}</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Meta Information */}
          <div className="flex items-center justify-between mb-4 text-xs text-gray-400">
            <div className="flex items-center space-x-2">
              <User className="w-3 h-3" />
              <span>{post.author.name}</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-1">
                <Calendar className="w-3 h-3" />
                <span>{publishedDate}</span>
              </div>
              <span>•</span>
              <div className="flex items-center space-x-1">
                <Clock className="w-3 h-3" />
                <span>{readTime}</span>
              </div>
            </div>
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:via-purple-500 group-hover:to-cyan-400 group-hover:bg-clip-text transition-all duration-300">
            {post.title}
          </h3>

          {/* Excerpt */}
          <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-3">
            {post.excerpt}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-gray-700/50 text-gray-300 text-xs rounded-md flex items-center space-x-1"
              >
                <Tag className="w-2.5 h-2.5" />
                <span>{tag}</span>
              </span>
            ))}
          </div>

          {/* Read More Button */}
          <Link
            href={`/blog/${post.slug}`}
            className="inline-flex items-center space-x-2 text-blue-400 hover:text-white text-sm font-medium group/btn"
          >
            <span>Read More</span>
            <svg 
              className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </article>
  )
}

// Main Blog Page Component
const BlogPage = () => {
  const [blogs, setBlogs] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const categories = ['All', 'Technology', 'Frontend', 'Backend', 'Programming', 'DevOps', 'Web Development']

  useEffect(() => {
    // Simulate API call with filters
    const fetchBlogs = async () => {
      setLoading(true)
      try {
        // Simulate loading delay
        setTimeout(() => {
          let filteredBlogs = mockBlogData.data

          // Apply search filter
          if (searchTerm) {
            filteredBlogs = filteredBlogs.filter(blog =>
              blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
              blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
              blog.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
            )
          }

          // Apply category filter
          if (selectedCategory && selectedCategory !== 'All') {
            filteredBlogs = filteredBlogs.filter(blog => blog.category === selectedCategory)
          }

          setBlogs(filteredBlogs)
          setTotalPages(Math.ceil(filteredBlogs.length / 9))
          setLoading(false)
        }, 800)
      } catch (error) {
        console.error('Error fetching blogs:', error)
        setLoading(false)
      }
    }

    fetchBlogs()
  }, [searchTerm, selectedCategory, currentPage])

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
    setCurrentPage(1)
  }

  const handleCategoryFilter = (category: string) => {
    setSelectedCategory(category === 'All' ? '' : category)
    setCurrentPage(1)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-cyan-500/5 rounded-full blur-3xl animate-pulse" style={{animationDelay: '4s'}}></div>
      </div>

      {/* Hero Section */}
      <div className="relative z-10 pt-20 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          {/* Back Button */}
          <Link
            href="/"
            className="inline-flex items-center space-x-2 text-gray-400 hover:text-white transition-colors duration-300 mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>Back to Home</span>
          </Link>

          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-block">
              {/* Decorative Elements */}
              <div className="flex items-center justify-center space-x-4 mb-6">
                <div className="h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent w-16 animate-pulse"></div>
                <div className="w-3 h-3 bg-blue-500 rounded-full animate-ping"></div>
                <span className="text-gray-400 font-light tracking-[0.3em] text-sm uppercase">Blog</span>
                <div className="w-3 h-3 bg-purple-500 rounded-full animate-ping" style={{animationDelay: '0.5s'}}></div>
                <div className="h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent w-16 animate-pulse"></div>
              </div>

              {/* Title */}
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black mb-4 leading-tight">
                <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
                  Latest Insights
                </span>
              </h1>
              
              {/* Subtitle */}
              <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
                Explore tutorials, insights, and thoughts on modern web development, programming, and technology.
              </p>
            </div>
          </div>

          {/* Search and Filter Controls */}
          <div className="mb-12">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              {/* Search Bar */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={handleSearch}
                  className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-400 focus:border-blue-500/50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                />
              </div>

              {/* Category Filter */}
              <div className="flex items-center space-x-2">
                <Filter className="text-gray-400 h-5 w-5" />
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => handleCategoryFilter(category)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                        (category === 'All' && !selectedCategory) || category === selectedCategory
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                          : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 border border-gray-700/50'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Blog Content */}
      <div className="relative z-10 pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          {loading ? (
            // Loading State
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(9)].map((_, index) => (
                <div key={index} className="bg-gray-800/50 border border-gray-700/50 rounded-3xl overflow-hidden animate-pulse">
                  <div className="h-48 sm:h-56 bg-gray-700/50"></div>
                  <div className="p-6">
                    <div className="h-6 bg-gray-700/50 rounded mb-3"></div>
                    <div className="space-y-2 mb-4">
                      <div className="h-4 bg-gray-700/50 rounded"></div>
                      <div className="h-4 bg-gray-700/50 rounded w-3/4"></div>
                    </div>
                    <div className="flex gap-2 mb-4">
                      <div className="h-6 w-16 bg-gray-700/50 rounded"></div>
                      <div className="h-6 w-20 bg-gray-700/50 rounded"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : blogs.length > 0 ? (
            <>
              {/* Results Count */}
              <div className="mb-8">
                <p className="text-gray-400 text-sm">
                  {searchTerm || selectedCategory ? 
                    `Found ${blogs.length} article${blogs.length !== 1 ? 's' : ''}` :
                    `Showing ${blogs.length} articles`
                  }
                </p>
              </div>

              {/* Blog Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                {blogs.map((post) => (
                  <BlogCard key={post._id} post={post} />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center space-x-4">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="flex items-center space-x-2 px-4 py-2 bg-gray-800/50 text-gray-300 rounded-lg border border-gray-700/50 hover:bg-gray-700/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Previous</span>
                  </button>

                  <div className="flex items-center space-x-2">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`w-10 h-10 rounded-lg font-medium transition-all duration-300 ${
                          currentPage === page
                            ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                            : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 border border-gray-700/50'
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="flex items-center space-x-2 px-4 py-2 bg-gray-800/50 text-gray-300 rounded-lg border border-gray-700/50 hover:bg-gray-700/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                  >
                    <span>Next</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </>
          ) : (
            // No Results State
            <div className="text-center py-20">
              <div className="mb-6">
                <div className="w-20 h-20 bg-gray-800/50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">No articles found</h3>
                <p className="text-gray-400">
                  {searchTerm || selectedCategory 
                    ? 'Try adjusting your search or filter criteria'
                    : 'No blog posts available at the moment.'
                  }
                </p>
              </div>
              
              {(searchTerm || selectedCategory) && (
                <button
                  onClick={() => {
                    setSearchTerm('')
                    setSelectedCategory('')
                  }}
                  className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold rounded-full transition-all duration-300 transform hover:scale-105"
                >
                  <span>Clear filters</span>
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default BlogPage