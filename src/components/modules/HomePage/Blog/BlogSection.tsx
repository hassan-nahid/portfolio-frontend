import Image from 'next/image'
import Link from 'next/link'
import { blogApi, BlogData } from '@/lib/api'

// Use BlogData type from API
type BlogPost = BlogData

// Loading fallback component for Suspense
const BlogSectionSkeleton = () => {
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
            <div key={index} className="bg-gray-800/50 border border-gray-700/50 rounded-3xl overflow-hidden animate-pulse h-full">
              <div className="h-40 sm:h-48 bg-gray-700/50"></div>
              <div className="p-4 sm:p-6 flex flex-col flex-grow">
                <div className="h-4 bg-gray-700/50 rounded mb-3 flex-shrink-0"></div>
                <div className="h-6 bg-gray-700/50 rounded mb-3 min-h-[3.5rem] sm:min-h-[4rem] flex-shrink-0"></div>
                <div className="space-y-2 mb-4 flex-grow">
                  <div className="h-4 bg-gray-700/50 rounded"></div>
                  <div className="h-4 bg-gray-700/50 rounded w-3/4"></div>
                </div>
                <div className="flex gap-2 mb-4 flex-shrink-0">
                  <div className="h-6 w-16 bg-gray-700/50 rounded"></div>
                  <div className="h-6 w-20 bg-gray-700/50 rounded"></div>
                </div>
                <div className="mt-auto">
                  <div className="h-8 w-24 bg-gray-700/50 rounded"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Fetch blog posts with ISR support
async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    console.log('🚀 [ISR] Fetching blog posts from API for homepage...')
    
    const response = await blogApi.getPublic({ 
      limit: 3, 
      status: 'published' 
    })
    
    console.log('📊 Homepage Blog API Response:', {
      success: response.success,
      message: response.message,
      dataExists: !!response.data,
      resultExists: !!response.data?.result,
      resultLength: response.data?.result?.length,
      timestamp: new Date().toISOString()
    })
    
    if (response.success && response.data) {
      // Handle different possible response structures
      const blogData = response.data.result || response.data || []
      const blogs = Array.isArray(blogData) ? blogData : []
      console.log('✅ [ISR] Homepage returning', blogs.length, 'blog posts')
      return blogs
    }
    
    console.log('⚠️ No blog posts found for homepage')
    return []
  } catch (error) {
    console.error('❌ Error fetching homepage blog posts:', error)
    return []
  }
}

// Calculate read time based on content length
const calculateReadTime = (content: string): string => {
  const wordsPerMinute = 200
  const words = (content || '').split(' ').filter(word => word.length > 0).length
  const minutes = Math.ceil(words / wordsPerMinute) || 1
  return `${minutes} min read`
}

const BlogCard = ({ post }: { post: BlogPost }) => {
  const readTime = calculateReadTime(post.content || '')
  const publishDate = post.publishedAt || post.createdAt
  const publishedDate = new Date(publishDate).toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric', 
    year: 'numeric' 
  })

  return (
    <article className="group relative h-full">
      {/* Glow Effect */}
      <div className="absolute -inset-4 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-cyan-600/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
      
      {/* Card Container - Fixed height with flex layout */}
      <div className="relative h-full bg-gradient-to-br from-gray-900/50 to-black/30 backdrop-blur-sm border border-gray-700/50 rounded-3xl overflow-hidden hover:border-blue-500/30 transition-all duration-500 flex flex-col">
        
        {/* Featured Image - Responsive height, flex-shrink-0 to maintain aspect ratio */}
        <div className="relative h-40 sm:h-48 overflow-hidden flex-shrink-0">
          <Image
            src={post.featuredImage || '/images/blog-placeholder.jpg'}
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
              <span className="text-xs text-gray-300">{post.viewCount || 0}</span>
            </div>
          </div>
        </div>

        {/* Content - Responsive spacing with flex layout */}
        <div className="p-4 sm:p-6 flex flex-col flex-grow">
          {/* Meta Information - Fixed height */}
          <div className="flex items-center justify-between mb-3 sm:mb-4 text-xs text-gray-400 flex-shrink-0">
            <div className="flex items-center space-x-2">
              <span>{post.author?.name || 'Anonymous'}</span>
            </div>
            <div className="flex items-center space-x-3">
              <span>{publishedDate}</span>
              <span>•</span>
              <span>{readTime}</span>
            </div>
          </div>

          {/* Title - Fixed minimum height */}
          <h3 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3 line-clamp-2 min-h-[3.5rem] sm:min-h-[4rem] group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:via-purple-500 group-hover:to-cyan-400 group-hover:bg-clip-text transition-all duration-300 flex-shrink-0">
            {post.title}
          </h3>

          {/* Excerpt - Grows to fill available space */}
          <p className="text-gray-400 text-sm leading-relaxed mb-3 sm:mb-4 line-clamp-3 flex-grow">
            {post.excerpt}
          </p>

          {/* Tags - Fixed height */}
          <div className="flex flex-wrap gap-1 sm:gap-2 mb-3 sm:mb-4 min-h-[2rem] flex-shrink-0">
            {(post.tags || []).slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-gray-700/50 text-gray-300 text-xs rounded-md h-fit"
              >
                #{tag.length > 10 ? tag.substring(0, 10) + '...' : tag}
              </span>
            ))}
            {(post.tags || []).length > 3 && (
              <span className="px-2 py-1 bg-gray-600/30 text-gray-400 text-xs rounded-md h-fit">
                +{(post.tags || []).length - 3}
              </span>
            )}
          </div>

          {/* Read More Button - Always at bottom */}
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

const BlogSection = async () => {
  // Fetch blog posts using ISR
  const blogs = await getBlogPosts()

  return (
    <div className="py-8 sm:py-12 md:py-16" id="blog">
      {/* Background Effects */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse [animation-delay:2s]"></div>
        </div>

        {/* Section Header */}
        <div className="relative z-10 text-center mb-8 sm:mb-12 md:mb-16 px-4">
          <div className="inline-block">
            {/* Decorative Elements */}
            <div className="flex items-center justify-center space-x-2 sm:space-x-4 mb-4 sm:mb-6">
              <div className="h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent w-8 sm:w-16 animate-pulse"></div>
              <div className="w-2 h-2 sm:w-3 sm:h-3 bg-blue-500 rounded-full animate-ping"></div>
              <span className="text-gray-400 font-light tracking-[0.2em] sm:tracking-[0.3em] text-xs sm:text-sm uppercase">Blog</span>
              <div className="w-2 h-2 sm:w-3 sm:h-3 bg-purple-500 rounded-full animate-ping [animation-delay:0.5s]"></div>
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
                {blogs.map((post: BlogPost) => (
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
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-purple-500 rounded-full animate-bounce [animation-delay:0.2s]"></div>
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-cyan-500 rounded-full animate-bounce [animation-delay:0.4s]"></div>
            <div className="w-4 sm:w-8 h-px bg-gradient-to-l from-transparent to-purple-500 animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Export both the main component and loading fallback
export { BlogSectionSkeleton }
export default BlogSection

// ISR Configuration for when this component is used in pages
// This enables the parent page to use ISR effectively
export const blogSectionConfig = {
  revalidate: 60, // Revalidate every 60 seconds
  fetchCache: 'force-cache' // Cache the blog data
}