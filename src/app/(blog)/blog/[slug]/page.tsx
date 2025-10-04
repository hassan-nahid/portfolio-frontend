import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { 
  ArrowLeft, 
  Calendar, 
  Eye, 
  Clock, 
  User, 
  Tag,
  Heart,
  MessageCircle
} from 'lucide-react'
import { blogApi, BlogData } from '@/lib/api'
import { Metadata } from 'next'

interface BlogPageProps {
  params: {
    slug: string
  }
}

// Generate metadata dynamically for each blog post
export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const post = await getBlogPost(params.slug)
  
  if (!post) {
    return {
      title: 'Blog Post Not Found',
      description: 'The requested blog post could not be found.',
    }
  }

  return {
    title: `${post.title} | Blog`,
    description: post.excerpt || post.content?.substring(0, 160) || 'Read this blog post',
    openGraph: {
      title: post.title,
      description: post.excerpt || post.content?.substring(0, 160),
      type: 'article',
      images: post.featuredImage ? [post.featuredImage] : [],
      publishedTime: post.publishedAt || post.createdAt,
      authors: [post.author?.name || 'Anonymous'],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt || post.content?.substring(0, 160),
      images: post.featuredImage ? [post.featuredImage] : [],
    },
  }
}

// Generate static params for blog posts with ISR support
export async function generateStaticParams() {
  try {
    console.log('🚀 [ISR] Generating static params for blog posts...')
    
    const response = await blogApi.getPublic({ 
      limit: 200, // Increased limit to handle more posts
      status: 'published' 
    })
    
    console.log('📊 Static Params Generation Response:', {
      success: response.success,
      resultLength: response.data?.result?.length,
      timestamp: new Date().toISOString()
    })
    
    if (response.success && response.data?.result) {
      const params = response.data.result.map((post) => ({
        slug: post.slug, // Use slug for URL parameter
      }))
      
      console.log('✅ [ISR] Generated', params.length, 'static params')
      return params
    }
    
    console.log('⚠️ No blog posts found for static generation')
    return []
  } catch (error) {
    console.error('❌ Error generating static params:', error)
    return []
  }
}

// Get blog post data by slug with ISR support
async function getBlogPost(slug: string): Promise<BlogData | null> {
  try {
    console.log(`🚀 [ISR] Fetching blog post: ${slug}`)
    
    const response = await blogApi.getByIdentifier(slug)
    
    console.log('📊 Blog Post API Response:', {
      success: response.success,
      dataExists: !!response.data,
      slug: slug,
      timestamp: new Date().toISOString()
    })
    
    if (response.success && response.data) {
      console.log('✅ [ISR] Successfully fetched blog post:', response.data.title)
      return response.data
    }
    
    console.log('⚠️ Blog post not found or API response invalid')
    return null
  } catch (error) {
    console.error('❌ Error fetching blog post:', error)
    return null
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
  
  if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`
  if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)} days ago`
  if (diffInSeconds < 31536000) return `${Math.floor(diffInSeconds / 2592000)} months ago`
  return `${Math.floor(diffInSeconds / 31536000)} years ago`
}

// Format content with basic markdown
function formatContent(content: string): string {
  return content
    .replace(/^# (.*$)/gim, '<h1 class="text-3xl font-bold mb-6 text-white">$1</h1>')
    .replace(/^## (.*$)/gim, '<h2 class="text-2xl font-semibold mb-4 mt-8 text-gray-100">$1</h2>')
    .replace(/^### (.*$)/gim, '<h3 class="text-xl font-medium mb-3 mt-6 text-gray-200">$1</h3>')
    .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-white">$1</strong>')
    .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
    .replace(/`(.*?)`/g, '<code class="bg-gray-800 px-2 py-1 rounded text-blue-300 font-mono text-sm">$1</code>')
    .replace(/```([\\s\\S]*?)```/g, '<pre class="bg-gray-900 border border-gray-700 p-4 rounded-lg overflow-x-auto mb-6"><code class="text-gray-300 font-mono text-sm">$1</code></pre>')
    .split('\\n\\n').map(paragraph => `<p class="text-gray-300 leading-relaxed mb-4">${paragraph.replace(/\\n/g, '<br>')}</p>`).join('')
}

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getBlogPost(params.slug)

  if (!post) {
    notFound()
  }

  const readTime = calculateReadTime(post.content)
  const publishDate = post.publishedAt || post.createdAt
  const publishedDate = formatDate(publishDate)
  const timeAgoText = timeAgo(publishDate)
  const formattedContent = formatContent(post.content)

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-black/80 backdrop-blur-sm border-b border-gray-800/50">
        <div className="container mx-auto px-6 py-4">
          <Link 
            href="/blog" 
            className="inline-flex items-center space-x-2 text-gray-300 hover:text-white transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>Back to Blog</span>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative">
        {/* Featured Image */}
        {post.featuredImage && (
          <div className="relative h-[50vh] lg:h-[60vh] overflow-hidden">
            <Image
              src={post.featuredImage}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
          </div>
        )}

        {/* Article Header */}
        <div className={`relative ${post.featuredImage ? '-mt-32' : 'pt-16'} z-10`}>
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              {/* Category Badge */}
              <div className="mb-6">
                <span className="inline-block px-4 py-2 bg-blue-500/20 text-blue-300 text-sm font-medium rounded-full border border-blue-500/30 backdrop-blur-sm">
                  {post.category}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight mb-6">
                {post.title}
              </h1>

              {/* Excerpt */}
              <p className="text-xl text-gray-300 leading-relaxed mb-8">
                {post.excerpt}
              </p>

              {/* Meta Information */}
              <div className="flex flex-wrap items-center gap-6 text-gray-400 mb-8">
                <div className="flex items-center space-x-2">
                  <User className="w-4 h-4" />
                  <span>{post.author?.name || 'Anonymous'}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4" />
                  <span>{publishedDate}</span>
                  <span className="text-gray-600">•</span>
                  <span>{timeAgoText}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4" />
                  <span>{readTime}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Eye className="w-4 h-4" />
                  <span>{post.viewCount || 0} views</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MessageCircle className="w-4 h-4" />
                  <span>{post.commentCount || 0} comments</span>
                </div>
              </div>

              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-8">
                  {post.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center space-x-1 px-3 py-1 bg-gray-700/50 text-gray-300 text-sm rounded-md hover:bg-gray-600/50 transition-colors"
                    >
                      <Tag className="w-3 h-3" />
                      <span>#{tag}</span>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <article className="py-12">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            {/* Content */}
            <div className="prose prose-invert prose-lg max-w-none">
              <div 
                className="blog-content"
                dangerouslySetInnerHTML={{
                  __html: formattedContent
                }}
              />
            </div>

            {/* Article Footer */}
            <div className="mt-12 pt-8 border-t border-gray-700/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">{post.author?.name || 'Anonymous'}</h4>
                    <p className="text-gray-400 text-sm">Author</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <button className="flex items-center space-x-2 px-4 py-2 bg-red-500/20 text-red-300 rounded-full hover:bg-red-500/30 transition-colors">
                    <Heart className="w-4 h-4" />
                    <span>Like Post</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* Comments Section */}
      <section className="py-16 border-t border-gray-800/50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-8">
              Comments ({post.commentCount || 0})
            </h2>
            
            {/* Comments List */}
            <div className="space-y-6">
              {post.comments && post.comments.length > 0 ? (
                post.comments.map((comment) => (
                  <div key={comment._id || Math.random()} className="bg-gray-800/30 rounded-lg p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                        <User className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h4 className="font-semibold text-white">{comment.author}</h4>
                          <span className="text-gray-400 text-sm">
                            {timeAgo(comment.createdAt)}
                          </span>
                        </div>
                        <p className="text-gray-300">{comment.content}</p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-400">No comments yet. Be the first to comment!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Related Posts Section */}
      <section className="py-16 border-t border-gray-800/50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-8">More Posts</h2>
            <div className="text-center">
              <Link
                href="/blog"
                className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold rounded-full transition-all duration-300 transform hover:scale-105"
              >
                <span>View All Posts</span>
                <ArrowLeft className="w-4 h-4 rotate-180" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

// Enable ISR (Incremental Static Regeneration) for individual blog posts
// - Pages are statically generated at build time using generateStaticParams
// - Pages are revalidated every 60 seconds for fresh content
// - New blog posts will be generated on-demand and cached
export const revalidate = 60

// Enable dynamic params to generate pages for new blog posts not in generateStaticParams
export const dynamicParams = true

// Force static generation for better performance
export const dynamic = 'force-static'