'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'

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

// Mock API response for demonstration
const mockApiResponse: BlogResponse = {
  statusCode: 200,
  success: true,
  message: "Blogs retrieved successfully",
  meta: {
    page: 1,
    limit: 10,
    total: 3,
    totalPage: 1
  },
  data: [
    {
      _id: "68dd4e06cec4e151dd278f0d",
      title: "Getting Started with React TypeScript",
      excerpt: "Learn how to set up and build modern web applications using React with TypeScript for better type safety and developer experience.",
      content: "# Getting Started with React TypeScript\\n\\nReact with TypeScript has become the gold standard for building modern web applications...",
      featuredImage: "https://res.cloudinary.com/dfrbnzhov/image/upload/v1759333899/pvhxw9xhd78-1759333891530-download-jpg.jpg.jpg",
      author: {
        _id: "68dbe9f157ecf151bc078dd4",
        name: "Hassan Nahid"
      },
      category: "Technology",
      tags: ["React", "TypeScript", "Frontend", "JavaScript"],
      status: "published",
      isFeature: true,
      viewCount: 0,
      commentCount: 0,
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
      content: "# Building Modern APIs\\n\\nCreating robust APIs is essential for modern web development...",
      featuredImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop",
      author: {
        _id: "68dbe9f157ecf151bc078dd4",
        name: "Hassan Nahid"
      },
      category: "Backend",
      tags: ["Node.js", "Express", "API", "Backend"],
      status: "published",
      isFeature: false,
      viewCount: 25,
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
      excerpt: "Deep dive into sfsfsdfsdfdsfsfsd modern CSS layout techniques with practical examples and real-world use cases.",
      content: "# CSS Layouts Made Easy\\n\\nCSS Grid and Flexbox are powerful layout systems...",
      featuredImage: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&h=400&fit=crop",
      author: {
        _id: "68dbe9f157ecf151bc078dd4",
        name: "Hassan Nahid"
      },
      category: "Frontend",
      tags: ["CSS", "Grid", "Flexbox", "Layout"],
      status: "published",
      isFeature: false,
      viewCount: 40,
      commentCount: 8,
      createdAt: "2025-09-25T14:20:00.000Z",
      updatedAt: "2025-09-25T14:20:00.000Z",
      slug: "mastering-css-grid-flexbox-layouts",
      publishedAt: "2025-09-25T14:20:00.000Z",
      id: "68dd4e06cec4e151dd278f0f"
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

          {/* View Count */}
          <div className="absolute top-4 right-4">
            <div className="flex items-center space-x-1 px-2 py-1 bg-black/30 rounded-full backdrop-blur-sm">
              <svg className="w-3 h-3 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              <span className="text-xs text-gray-300">{post.viewCount}</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Meta Information */}
          <div className="flex items-center justify-between mb-4 text-xs text-gray-400">
            <div className="flex items-center space-x-2">
              <span>{post.author.name}</span>
            </div>
            <div className="flex items-center space-x-3">
              <span>{publishedDate}</span>
              <span>•</span>
              <span>{readTime}</span>
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
                className="px-2 py-1 bg-gray-700/50 text-gray-300 text-xs rounded-md"
              >
                #{tag}
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

const BlogSection = () => {
  const [blogs, setBlogs] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API call
    const fetchBlogs = async () => {
      try {
        // In real app, replace with actual API call
        // const response = await fetch('/api/blogs?limit=3')
        // const data = await response.json()
        
        // Simulate loading delay
        setTimeout(() => {
          setBlogs(mockApiResponse.data.slice(0, 3)) // Show only 3 blogs
          setLoading(false)
        }, 1000)
      } catch (error) {
        console.error('Error fetching blogs:', error)
        setLoading(false)
      }
    }

    fetchBlogs()
  }, [])

  if (loading) {
    return (
      <div className="py-8 sm:py-12 md:py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
              Latest Blog Posts
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, index) => (
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
        </div>
      </div>
    )
  }

  return (
    <div className="py-8 sm:py-12 md:py-16" id="blog">
      {/* Background Effects */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        </div>

        {/* Section Header */}
        <div className="relative z-10 text-center mb-8 sm:mb-12 md:mb-16 px-4">
          <div className="inline-block">
            {/* Decorative Elements */}
            <div className="flex items-center justify-center space-x-2 sm:space-x-4 mb-4 sm:mb-6">
              <div className="h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent w-8 sm:w-16 animate-pulse"></div>
              <div className="w-2 h-2 sm:w-3 sm:h-3 bg-blue-500 rounded-full animate-ping"></div>
              <span className="text-gray-400 font-light tracking-[0.2em] sm:tracking-[0.3em] text-xs sm:text-sm uppercase">Blog</span>
              <div className="w-2 h-2 sm:w-3 sm:h-3 bg-purple-500 rounded-full animate-ping" style={{animationDelay: '0.5s'}}></div>
              <div className="h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent w-8 sm:w-16 animate-pulse"></div>
            </div>

            {/* Title */}
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-black mb-3 sm:mb-4 leading-tight">
              <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
                Latest Insights
              </span>
            </h2>
            
            {/* Subtitle */}
            <p className="text-gray-400 text-sm sm:text-lg max-w-2xl mx-auto leading-relaxed">
              Thoughts, tutorials, and insights on modern web development
            </p>
          </div>
        </div>

        {/* Blog Grid */}
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          {blogs.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {blogs.map((post) => (
                  <BlogCard key={post._id} post={post} />
                ))}
              </div>

              {/* View All Blogs Button */}
              <div className="text-center mt-12 sm:mt-16">
                <Link
                  href="/blog"
                  className="group relative inline-flex items-center space-x-2 px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold rounded-full transition-all duration-300 transform hover:scale-105"
                >
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full opacity-0 group-hover:opacity-100 blur transition-opacity duration-300"></div>
                  <div className="relative flex items-center space-x-2">
                    <span>View All Posts</span>
                    <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </Link>
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">No blog posts available at the moment.</p>
            </div>
          )}
        </div>

        {/* Bottom Decorative Line */}
        <div className="relative z-10 mt-8 sm:mt-12 md:mt-16 flex justify-center px-4">
          <div className="flex items-center space-x-2 sm:space-x-4">
            <div className="w-4 sm:w-8 h-px bg-gradient-to-r from-transparent to-blue-500 animate-pulse"></div>
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-500 rounded-full animate-bounce"></div>
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-purple-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-cyan-500 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
            <div className="w-4 sm:w-8 h-px bg-gradient-to-l from-transparent to-purple-500 animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BlogSection