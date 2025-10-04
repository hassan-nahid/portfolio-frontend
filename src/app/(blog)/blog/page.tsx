import Image from 'next/image'
import Link from 'next/link'
import { Eye, User, Tag, ArrowLeft } from 'lucide-react'
import { blogApi, BlogData } from '@/lib/api'
import { Metadata } from 'next'

// Metadata for SEO
export const metadata: Metadata = {
  title: 'All Blog Posts | Portfolio',
  description: 'Explore all my blog posts about web development, programming, and technology insights.',
  openGraph: {
    title: 'All Blog Posts | Portfolio',
    description: 'Explore all my blog posts about web development, programming, and technology insights.',
    type: 'website',
  },
}

// Get blog posts data with ISR support
async function getBlogPosts(): Promise<BlogData[]> {
  try {
    console.log('🚀 [ISR] Fetching blog posts from API...')
    console.log('🔧 API Base URL:', process.env.NEXT_PUBLIC_API_URL)
    
    const response = await blogApi.getPublic({ 
      limit: 100, // Increased limit for all posts
      status: 'published' 
    })
    
    console.log('📊 Blog API Response:', {
      success: response.success,
      message: response.message,
      dataExists: !!response.data,
      resultExists: !!response.data?.result,
      resultLength: response.data?.result?.length,
      statusCode: response.statusCode,
      timestamp: new Date().toISOString()
    })
    
    if (response.success && response.data) {
      // Handle different possible response structures
      const blogData = response.data.result || response.data || []
      const blogs = Array.isArray(blogData) ? blogData : []
      console.log('✅ [ISR] Returning', blogs.length, 'blog posts')
      return blogs
    }
    
    console.log('⚠️ No blog posts found or API response invalid')
    console.log('🔍 For development: check if backend is running (localhost:5000)')
    return []
  } catch (error) {
    console.error('❌ Error fetching blog posts:', error)
    console.log('🚨 This might indicate the backend is not running or not accessible.')
    return []
  }
}

// Calculate read time
function calculateReadTime(content: string): string {
  const wordsPerMinute = 200
  const words = (content || '').split(' ').filter(word => word.length > 0).length
  const minutes = Math.ceil(words / wordsPerMinute) || 1
  return `${minutes} min read`
}

// Format date helper
function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

// Time ago helper
function timeAgo(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)
  
  if (diffInSeconds < 60) return `${diffInSeconds}s ago`
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`
  if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)}d ago`
  return formatDate(dateString)
}

// BlogCard component
const BlogCard = ({ post }: { post: BlogData }) => {
  const readTime = calculateReadTime(post.content || '')
  const publishDate = post.publishedAt || post.createdAt
  const timeAgoText = timeAgo(publishDate)

  return (
    <article className="group relative h-full">
      {/* Glow Effect */}
      <div className="absolute -inset-4 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-cyan-600/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
      
      {/* Card Container - Fixed height with flex layout */}
      <div className="relative h-full bg-gradient-to-br from-gray-900/50 to-black/30 backdrop-blur-sm border border-gray-700/50 rounded-3xl overflow-hidden hover:border-blue-500/30 transition-all duration-500 flex flex-col">
        
        {/* Featured Image - Responsive height */}
        <div className="relative h-40 sm:h-48 overflow-hidden flex-shrink-0">
          <Image
            src={post.featuredImage || '/images/blog-placeholder.jpg'}
            alt={post.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
          
          {/* Category Badge */}
          <div className="absolute top-2 sm:top-4 left-2 sm:left-4">
            <span className="px-2 sm:px-3 py-1 bg-blue-500/20 text-blue-300 text-xs font-medium rounded-full border border-blue-500/30 backdrop-blur-sm">
              {post.category}
            </span>
          </div>

          {/* View Count */}
          <div className="absolute top-2 sm:top-4 right-2 sm:right-4">
            <div className="flex items-center space-x-1 px-2 py-1 bg-black/30 rounded-full backdrop-blur-sm">
              <Eye className="w-3 h-3 text-gray-300" />
              <span className="text-xs text-gray-300">{post.viewCount || 0}</span>
            </div>
          </div>
        </div>

        {/* Content - Responsive spacing */}
        <div className="p-4 sm:p-6 flex flex-col flex-grow">
          {/* Meta Information - Responsive */}
          <div className="flex items-center justify-between mb-3 sm:mb-4 text-xs text-gray-400 flex-shrink-0">
            <div className="flex items-center space-x-1 sm:space-x-2 min-w-0">
              <User className="w-3 h-3 flex-shrink-0" />
              <span className="truncate text-xs">{post.author?.name || 'Anonymous'}</span>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-3 flex-shrink-0 text-xs">
              <span className="hidden sm:inline">{timeAgoText}</span>
              <span className="sm:hidden">{timeAgoText.replace(' ago', '')}</span>
              <span className="hidden sm:inline">•</span>
              <span className="hidden sm:inline">{readTime}</span>
            </div>
          </div>

          {/* Title - Responsive typography */}
          <h3 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3 line-clamp-2 min-h-[2.5rem] sm:min-h-[3.5rem] group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:via-purple-500 group-hover:to-cyan-400 group-hover:bg-clip-text transition-all duration-300 flex-shrink-0">
            {post.title}
          </h3>

          {/* Excerpt - Responsive */}
          <p className="text-gray-400 text-sm leading-relaxed mb-3 sm:mb-4 line-clamp-2 sm:line-clamp-3 min-h-[2.5rem] sm:min-h-[4.5rem] flex-shrink-0">
            {post.excerpt}
          </p>

          {/* Tags - Responsive */}
          <div className="flex flex-wrap gap-1 sm:gap-2 mb-3 sm:mb-4 min-h-[1.5rem] sm:min-h-[2rem] flex-shrink-0">
            {(post.tags || []).slice(0, 2).map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-gray-700/50 text-gray-300 text-xs rounded-md h-fit"
              >
                #{tag.length > 8 ? tag.substring(0, 8) + '...' : tag}
              </span>
            ))}
            {(post.tags || []).length > 2 && (
              <span className="px-2 py-1 bg-gray-600/30 text-gray-400 text-xs rounded-md h-fit">
                +{(post.tags || []).length - 2}
              </span>
            )}
          </div>

          {/* Read More Button - Pushed to bottom */}
          <div className="mt-auto">
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
      </div>
    </article>
  )
}

export default async function BlogPage() {
  const blogs = await getBlogPosts()

  // Get unique categories
  const categories = [...new Set(blogs.map(blog => blog.category))]
  
  // Log for debugging
  console.log('Blog Page - Received blogs:', blogs.length)
  if (blogs.length > 0) {
    console.log('First blog:', {
      title: blogs[0].title,
      category: blogs[0].category,
      isFeature: blogs[0].isFeature
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-black/80 backdrop-blur-sm border-b border-gray-800/50">
        <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Link 
            href="/" 
            className="inline-flex items-center space-x-2 text-gray-300 hover:text-white transition-colors group text-sm sm:text-base"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>Back to Home</span>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative py-8 sm:py-12 lg:py-16">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-48 sm:w-72 h-48 sm:h-72 bg-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse [animation-delay:2s]"></div>
        </div>

        {/* Header Content */}
        <div className="relative z-10 text-center px-4">
          <div className="inline-block">
            {/* Decorative Elements */}
            <div className="flex items-center justify-center space-x-2 sm:space-x-4 mb-4 sm:mb-6">
              <div className="h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent w-6 sm:w-8 lg:w-16 animate-pulse"></div>
              <div className="w-2 h-2 sm:w-3 sm:h-3 bg-blue-500 rounded-full animate-ping"></div>
              <span className="text-gray-400 font-light tracking-[0.2em] sm:tracking-[0.3em] text-xs sm:text-sm uppercase">Blog</span>
              <div className="w-2 h-2 sm:w-3 sm:h-3 bg-purple-500 rounded-full animate-ping [animation-delay:0.5s]"></div>
              <div className="h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent w-6 sm:w-8 lg:w-16 animate-pulse"></div>
            </div>

            {/* Title */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black mb-4 leading-tight px-2">
              <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
                All Blog Posts
              </span>
            </h1>
            
            {/* Subtitle */}
            <p className="text-gray-400 text-sm sm:text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed px-4">
              Insights, tutorials, and thoughts on modern web development
            </p>

            {/* Stats */}
            <div className="flex items-center justify-center space-x-4 sm:space-x-6 lg:space-x-8 mt-6 sm:mt-8 text-xs sm:text-sm text-gray-400">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                <span>{blogs.length} Posts</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse [animation-delay:0.3s]"></div>
                <span>{categories.length} Categories</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 ${blogs.length > 0 ? 'bg-green-500' : 'bg-red-500'} rounded-full animate-pulse [animation-delay:0.6s]`}></div>
                <span>API {blogs.length > 0 ? 'Connected' : 'Disconnected'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Blog Grid */}
      <div className="relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          {blogs.length > 0 ? (
            <>
              {/* Featured Posts */}
              {blogs.some(blog => blog.isFeature) && (
                <div className="mb-16">
                  <h2 className="text-2xl font-bold text-white mb-8 flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 animate-pulse"></span>
                    Featured Posts
                  </h2>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
                    {blogs.filter(blog => blog.isFeature).slice(0, 2).map((post) => (
                      <BlogCard key={post._id} post={post} />
                    ))}
                  </div>
                </div>
              )}

              {/* All Posts */}
              <div className="mb-16">
                <h2 className="text-xl sm:text-2xl font-bold text-white mb-6 sm:mb-8 flex items-center">
                  <span className="w-2 h-2 bg-purple-500 rounded-full mr-3 animate-pulse"></span>
                  All Posts
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                  {blogs.map((post) => (
                    <BlogCard key={post._id} post={post} />
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className="text-center py-8 sm:py-12 lg:py-16 px-4">
              <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 mx-auto mb-4 sm:mb-6 rounded-full bg-gray-800/50 flex items-center justify-center">
                <Tag className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-gray-400" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">No Blog Posts Found</h3>
              <p className="text-gray-400 max-w-md mx-auto mb-4 text-sm sm:text-base">
                This could mean:
              </p>
              <div className="text-gray-400 text-xs sm:text-sm max-w-lg mx-auto space-y-1 sm:space-y-2">
                <p>• No published blog posts in the backend</p>
                <p>• Backend server is not running (localhost:5000)</p>
                <p>• API connection issue</p>
                <p>• Check browser console for detailed logs</p>
              </div>
              <div className="mt-4 sm:mt-6">
                <Link 
                  href="/"
                  className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors text-sm sm:text-base"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Home</span>
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Decorative Line */}
        <div className="pb-16 relative z-10 mt-8 sm:mt-12 lg:mt-16 flex justify-center px-4">
          <div className="flex items-center space-x-2 sm:space-x-4">
            <div className="w-3 sm:w-4 lg:w-8 h-px bg-gradient-to-r from-transparent to-blue-500 animate-pulse"></div>
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-500 rounded-full animate-bounce"></div>
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-purple-500 rounded-full animate-bounce [animation-delay:0.2s]"></div>
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-cyan-500 rounded-full animate-bounce [animation-delay:0.4s]"></div>
            <div className="w-3 sm:w-4 lg:w-8 h-px bg-gradient-to-l from-transparent to-purple-500 animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Enable ISR (Incremental Static Regeneration)
// This page will be statically generated and revalidated every 60 seconds
// Ensures public users get fast loading times with fresh content
export const revalidate = 60

// Force this page to be statically generated for better performance
export const dynamic = 'force-static'