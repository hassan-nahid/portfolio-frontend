'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
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
  MessageCircle,
  Copy,
  Facebook,
  Twitter,
  Linkedin
} from 'lucide-react'

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

interface Comment {
  _id: string
  author: string
  email: string
  website?: string
  content: string
  isApproved: boolean
  createdAt: string
}

// Mock blog data (same as used in blog listing)
const mockBlogData = [
  {
    _id: "68dd4e06cec4e151dd278f0d",
    title: "Getting Started with React TypeScript",
    excerpt: "Learn how to set up and build modern web applications using React with TypeScript for better type safety and developer experience.",
    content: `# Getting Started with React TypeScript

React with TypeScript has become the gold standard for building modern web applications. TypeScript brings static type checking to JavaScript, helping developers catch errors early and write more maintainable code.

## Why TypeScript with React?

TypeScript offers several advantages when building React applications:

### 1. Better Developer Experience
- IntelliSense and autocomplete in your IDE
- Immediate error detection during development
- Better refactoring capabilities
- Self-documenting code through types

### 2. Improved Code Quality
- Catch bugs at compile time rather than runtime
- Enforce consistent interfaces across components
- Better collaboration in team environments
- Easier maintenance of large codebases

## Setting Up Your First React TypeScript Project

The easiest way to get started is using Create React App with the TypeScript template:

\`\`\`bash
npx create-react-app my-app --template typescript
cd my-app
npm start
\`\`\`

Alternatively, you can use Next.js with TypeScript:

\`\`\`bash
npx create-next-app@latest my-app --typescript
cd my-app
npm run dev
\`\`\`

## Basic TypeScript Concepts for React

### Props Typing
Always define interfaces for your component props:

\`\`\`tsx
interface ButtonProps {
  children: React.ReactNode
  onClick: () => void
  variant?: 'primary' | 'secondary'
  disabled?: boolean
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  disabled = false 
}) => {
  return (
    <button 
      onClick={onClick}
      disabled={disabled}
      className={\`btn btn-\${variant}\`}
    >
      {children}
    </button>
  )
}
\`\`\`

### State Typing
Use generic types for useState when the initial value is null or when TypeScript can't infer the type:

\`\`\`tsx
const [user, setUser] = useState<User | null>(null)
const [loading, setLoading] = useState<boolean>(false)
const [items, setItems] = useState<string[]>([])
\`\`\`

### Event Handling
React provides specific types for different events:

\`\`\`tsx
const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setInputValue(e.target.value)
}

const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault()
  // Handle form submission
}

const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
  console.log('Button clicked')
}
\`\`\`

## Advanced Patterns

### Generic Components
Create reusable components with generic types:

\`\`\`tsx
interface ListProps<T> {
  items: T[]
  renderItem: (item: T) => React.ReactNode
}

function List<T>({ items, renderItem }: ListProps<T>) {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>{renderItem(item)}</li>
      ))}
    </ul>
  )
}
\`\`\`

### Custom Hooks with TypeScript
\`\`\`tsx
function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      return initialValue
    }
  })

  const setValue = (value: T) => {
    try {
      setStoredValue(value)
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.error(error)
    }
  }

  return [storedValue, setValue]
}
\`\`\`

## Best Practices

1. **Use strict mode**: Enable strict TypeScript checking in your tsconfig.json
2. **Avoid any**: Use specific types instead of \`any\` whenever possible
3. **Use interfaces over types**: For object shapes, prefer interfaces
4. **Create shared types**: Keep common types in a separate file
5. **Use utility types**: Leverage TypeScript's built-in utility types like \`Pick\`, \`Omit\`, \`Partial\`

## Common Pitfalls and Solutions

### Problem: Ref Typing
\`\`\`tsx
// Wrong
const inputRef = useRef()

// Correct
const inputRef = useRef<HTMLInputElement>(null)
\`\`\`

### Problem: Children Prop
\`\`\`tsx
// Good
interface Props {
  children: React.ReactNode
}

// Better for specific cases
interface Props {
  children: React.ReactElement<HTMLDivElement>
}
\`\`\`

## Conclusion

TypeScript with React provides a powerful combination for building robust, scalable applications. While there's an initial learning curve, the benefits in terms of developer experience, code quality, and maintainability make it worthwhile for any serious React project.

Start small by adding TypeScript to a simple component, then gradually expand your usage as you become more comfortable with the syntax and patterns. The investment in learning TypeScript will pay dividends in your React development journey.`,
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
    content: `# Building Modern APIs with Node.js and Express

Creating robust APIs is essential for modern web development. Node.js and Express provide a powerful foundation for building scalable, performant APIs that can handle real-world applications.

## Why Node.js for API Development?

Node.js offers several advantages for API development:
- **High Performance**: Event-driven, non-blocking I/O model
- **JavaScript Everywhere**: Same language for frontend and backend
- **Rich Ecosystem**: NPM packages for almost everything
- **Scalability**: Built for handling concurrent requests
- **Real-time Applications**: Perfect for chat apps, live updates

## Project Setup

Start by creating a new Node.js project:

\`\`\`bash
mkdir my-api
cd my-api
npm init -y
npm install express cors helmet morgan dotenv
npm install -D nodemon @types/node typescript
\`\`\`

## Basic Express Server

\`\`\`javascript
const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const morgan = require('morgan')

const app = express()
const PORT = process.env.PORT || 3000

// Middleware
app.use(helmet()) // Security headers
app.use(cors()) // Enable CORS
app.use(morgan('combined')) // Logging
app.use(express.json({ limit: '10mb' })) // Parse JSON
app.use(express.urlencoded({ extended: true }))

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' })
})

app.listen(PORT, () => {
  console.log(\`Server running on port \${PORT}\`)
})
\`\`\`

## RESTful API Design

Follow REST principles for consistent API design:

\`\`\`javascript
// GET /api/users - Get all users
// GET /api/users/:id - Get specific user
// POST /api/users - Create new user
// PUT /api/users/:id - Update user
// DELETE /api/users/:id - Delete user

app.get('/api/users', getAllUsers)
app.get('/api/users/:id', getUserById)
app.post('/api/users', createUser)
app.put('/api/users/:id', updateUser)
app.delete('/api/users/:id', deleteUser)
\`\`\`

## Error Handling

Implement comprehensive error handling:

\`\`\`javascript
// Custom error class
class APIError extends Error {
  constructor(message, statusCode = 500) {
    super(message)
    this.statusCode = statusCode
    this.isOperational = true
  }
}

// Error handling middleware
const errorHandler = (err, req, res, next) => {
  let { statusCode = 500, message } = err

  // Log error
  console.error(err)

  // Send error response
  res.status(statusCode).json({
    success: false,
    error: {
      message,
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    }
  })
}

// Use error handler
app.use(errorHandler)
\`\`\`

## Input Validation

Use Joi or express-validator for input validation:

\`\`\`javascript
const Joi = require('joi')

const userSchema = Joi.object({
  name: Joi.string().min(2).max(50).required(),
  email: Joi.string().email().required(),
  age: Joi.number().integer().min(18).max(120)
})

const validateUser = (req, res, next) => {
  const { error } = userSchema.validate(req.body)
  if (error) {
    return res.status(400).json({
      success: false,
      error: error.details[0].message
    })
  }
  next()
}

app.post('/api/users', validateUser, createUser)
\`\`\`

## Authentication & Authorization

Implement JWT-based authentication:

\`\`\`javascript
const jwt = require('jsonwebtoken')

// Generate JWT token
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '24h'
  })
}

// Authentication middleware
const authenticate = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '')
  
  if (!token) {
    return res.status(401).json({ error: 'Access denied' })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded
    next()
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' })
  }
}

// Protected route
app.get('/api/profile', authenticate, getProfile)
\`\`\`

## Database Integration

Connect to MongoDB using Mongoose:

\`\`\`javascript
const mongoose = require('mongoose')

// Connect to database
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

// User model
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
})

const User = mongoose.model('User', userSchema)
\`\`\`

## API Documentation

Use Swagger for API documentation:

\`\`\`javascript
const swaggerJsdoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'My API',
      version: '1.0.0',
      description: 'A simple Express API'
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server'
      }
    ]
  },
  apis: ['./routes/*.js']
}

const specs = swaggerJsdoc(options)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs))
\`\`\`

## Performance Optimization

1. **Use compression**: \`npm install compression\`
2. **Implement caching**: Redis for session storage
3. **Rate limiting**: Prevent API abuse
4. **Database indexing**: Optimize queries
5. **Pagination**: Limit result sets

## Testing Your API

\`\`\`javascript
const request = require('supertest')
const app = require('../app')

describe('GET /api/users', () => {
  it('should return all users', async () => {
    const res = await request(app)
      .get('/api/users')
      .expect(200)
    
    expect(res.body.success).toBe(true)
    expect(Array.isArray(res.body.data)).toBe(true)
  })
})
\`\`\`

## Deployment Considerations

- Use environment variables for configuration
- Implement proper logging (Winston)
- Add health check endpoints
- Use process managers (PM2)
- Set up monitoring and alerts
- Implement proper CORS policies
- Use HTTPS in production

## Conclusion

Building modern APIs with Node.js and Express requires attention to security, performance, and maintainability. By following these patterns and best practices, you'll create APIs that are robust, scalable, and developer-friendly.

Remember to always validate input, handle errors gracefully, implement proper authentication, and document your API thoroughly. These foundations will serve you well as your application grows and evolves.`,
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
  }
  // Add more mock posts as needed...
]

// Mock comments data
const mockComments: Comment[] = [
  {
    _id: "comment1",
    author: "John Developer",
    email: "john@example.com",
    website: "https://johndeveloper.com",
    content: "Great article! TypeScript has really improved my React development workflow. The type safety catches so many bugs early.",
    isApproved: true,
    createdAt: "2025-10-02T10:30:00.000Z"
  },
  {
    _id: "comment2",
    author: "Sarah Chen",
    email: "sarah@example.com",
    content: "Thanks for the detailed explanation. The generic components section was particularly helpful. Looking forward to implementing these patterns in my projects.",
    isApproved: true,
    createdAt: "2025-10-02T14:15:00.000Z"
  },
  {
    _id: "comment3",
    author: "Mike Frontend",
    email: "mike@example.com",
    website: "https://mikefrontend.dev",
    content: "Excellent tutorial! The code examples are clear and practical. Would love to see a follow-up article on testing TypeScript React components.",
    isApproved: true,
    createdAt: "2025-10-02T16:45:00.000Z"
  }
]

// Calculate read time
const calculateReadTime = (content: string): string => {
  const wordsPerMinute = 200
  const words = content.split(' ').length
  const minutes = Math.ceil(words / wordsPerMinute)
  return `${minutes} min read`
}

// Format date
const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

// Share functions
const shareOnSocial = (platform: string, url: string, title: string) => {
  const encodedUrl = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(title)
  
  const shareUrls = {
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`
  }
  
  window.open(shareUrls[platform as keyof typeof shareUrls], '_blank', 'width=600,height=400')
}

const copyToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    return false
  }
}

// Comment form data interface
interface CommentFormData {
  author: string
  email: string
  website: string
  content: string
}

// Comment Form Component
const CommentForm = ({ onSubmit }: { onSubmit: (comment: CommentFormData) => void }) => {
  const [formData, setFormData] = useState({
    author: '',
    email: '',
    website: '',
    content: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API call
    setTimeout(() => {
      onSubmit(formData)
      setFormData({ author: '', email: '', website: '', content: '' })
      setIsSubmitting(false)
    }, 1000)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="author" className="block text-sm font-medium text-gray-300 mb-2">
            Name *
          </label>
          <input
            type="text"
            id="author"
            required
            value={formData.author}
            onChange={(e) => setFormData({ ...formData, author: e.target.value })}
            className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-400 focus:border-blue-500/50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
            placeholder="Your name"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
            Email *
          </label>
          <input
            type="email"
            id="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-400 focus:border-blue-500/50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
            placeholder="your.email@example.com"
          />
        </div>
      </div>
      
      <div>
        <label htmlFor="website" className="block text-sm font-medium text-gray-300 mb-2">
          Website (Optional)
        </label>
        <input
          type="url"
          id="website"
          value={formData.website}
          onChange={(e) => setFormData({ ...formData, website: e.target.value })}
          className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-400 focus:border-blue-500/50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
          placeholder="https://yourwebsite.com"
        />
      </div>
      
      <div>
        <label htmlFor="content" className="block text-sm font-medium text-gray-300 mb-2">
          Comment *
        </label>
        <textarea
          id="content"
          required
          rows={4}
          value={formData.content}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-400 focus:border-blue-500/50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 resize-none"
          placeholder="Share your thoughts..."
        />
      </div>
      
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? 'Posting Comment...' : 'Post Comment'}
      </button>
      
      <p className="text-sm text-gray-400">
        Your comment will be reviewed before being published.
      </p>
    </form>
  )
}

// Main Blog Detail Component
const BlogDetailPage = () => {
  const params = useParams()
  const router = useRouter()
  const [blog, setBlog] = useState<BlogPost | null>(null)
  const [comments, setComments] = useState<Comment[]>([])
  const [loading, setLoading] = useState(true)
  const [liked, setLiked] = useState(false)
  const [copySuccess, setCopySuccess] = useState(false)

  const slug = params.slug as string

  useEffect(() => {
    // Simulate API call to fetch blog post
    const fetchBlog = async () => {
      setLoading(true)
      try {
        // Find blog by slug
        const foundBlog = mockBlogData.find(post => post.slug === slug)
        
        if (!foundBlog) {
          router.push('/blog')
          return
        }

        // Simulate loading delay
        setTimeout(() => {
          setBlog(foundBlog)
          setComments(mockComments)
          
          // Increment view count (in real app, this would be done server-side)
          foundBlog.viewCount += 1
          
          setLoading(false)
        }, 1000)
      } catch (err) {
        console.error('Error fetching blog:', err)
        setLoading(false)
      }
    }

    fetchBlog()
  }, [slug, router])

  const handleAddComment = (commentData: CommentFormData) => {
    const newComment: Comment = {
      _id: `comment_${Date.now()}`,
      ...commentData,
      isApproved: false, // Will need admin approval
      createdAt: new Date().toISOString()
    }
    
    // In real app, this would make an API call
    console.log('New comment submitted:', newComment)
    
    // Show success message
    alert('Thank you for your comment! It will be published after review.')
  }

  const handleShare = async (platform: string) => {
    const currentUrl = window.location.href
    
    if (platform === 'copy') {
      const success = await copyToClipboard(currentUrl)
      if (success) {
        setCopySuccess(true)
        setTimeout(() => setCopySuccess(false), 2000)
      }
    } else {
      shareOnSocial(platform, currentUrl, blog?.title || '')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl pt-20">
          <div className="animate-pulse">
            {/* Back button skeleton */}
            <div className="h-10 w-32 bg-gray-800/50 rounded-lg mb-8"></div>
            
            {/* Title skeleton */}
            <div className="h-12 bg-gray-800/50 rounded-lg mb-4"></div>
            <div className="h-8 w-3/4 bg-gray-800/50 rounded-lg mb-8"></div>
            
            {/* Meta info skeleton */}
            <div className="flex items-center space-x-4 mb-8">
              <div className="h-6 w-24 bg-gray-800/50 rounded"></div>
              <div className="h-6 w-20 bg-gray-800/50 rounded"></div>
              <div className="h-6 w-28 bg-gray-800/50 rounded"></div>
            </div>
            
            {/* Image skeleton */}
            <div className="h-96 bg-gray-800/50 rounded-2xl mb-8"></div>
            
            {/* Content skeleton */}
            <div className="space-y-4">
              {[...Array(10)].map((_, i) => (
                <div key={i} className="h-4 bg-gray-800/50 rounded w-full"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Blog post not found</h1>
          <Link
            href="/blog"
            className="inline-flex items-center space-x-2 text-blue-400 hover:text-white"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Blog</span>
          </Link>
        </div>
      </div>
    )
  }

  const readTime = calculateReadTime(blog.content)
  const publishedDate = formatDate(blog.publishedAt)

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      <article className="relative z-10">
        {/* Header Section */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl pt-20 pb-12">
          {/* Back Button */}
          <Link
            href="/blog"
            className="inline-flex items-center space-x-2 text-gray-400 hover:text-white transition-colors duration-300 mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>Back to Blog</span>
          </Link>

          {/* Article Header */}
          <header className="mb-12">
            {/* Category & Featured Badge */}
            <div className="flex items-center space-x-3 mb-6">
              <span className="px-4 py-2 bg-blue-500/20 text-blue-300 text-sm font-medium rounded-full border border-blue-500/30">
                {blog.category}
              </span>
              {blog.isFeature && (
                <span className="px-3 py-1 bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-300 text-sm font-medium rounded-full border border-amber-500/30">
                  Featured
                </span>
              )}
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight mb-6">
              <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
                {blog.title}
              </span>
            </h1>

            {/* Excerpt */}
            <p className="text-xl text-gray-300 leading-relaxed mb-8">
              {blog.excerpt}
            </p>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-400 mb-8">
              <div className="flex items-center space-x-2">
                <User className="w-4 h-4" />
                <span>{blog.author.name}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4" />
                <span>{publishedDate}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4" />
                <span>{readTime}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Eye className="w-4 h-4" />
                <span>{blog.viewCount} views</span>
              </div>
              <div className="flex items-center space-x-2">
                <MessageCircle className="w-4 h-4" />
                <span>{blog.commentCount} comments</span>
              </div>
            </div>

            {/* Social Share & Actions */}
            <div className="flex items-center justify-between border-t border-b border-gray-800 py-4">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setLiked(!liked)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                    liked
                      ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                      : 'bg-gray-800/50 text-gray-400 border border-gray-700/50 hover:bg-gray-700/50'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${liked ? 'fill-current' : ''}`} />
                  <span>{liked ? 'Liked' : 'Like'}</span>
                </button>
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-gray-400 text-sm mr-2">Share:</span>
                <button
                  onClick={() => handleShare('twitter')}
                  className="p-2 bg-gray-800/50 hover:bg-blue-500/20 text-gray-400 hover:text-blue-400 rounded-lg transition-all duration-300"
                  title="Share on Twitter"
                >
                  <Twitter className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleShare('facebook')}
                  className="p-2 bg-gray-800/50 hover:bg-blue-600/20 text-gray-400 hover:text-blue-400 rounded-lg transition-all duration-300"
                  title="Share on Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleShare('linkedin')}
                  className="p-2 bg-gray-800/50 hover:bg-blue-700/20 text-gray-400 hover:text-blue-400 rounded-lg transition-all duration-300"
                  title="Share on LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleShare('copy')}
                  className="p-2 bg-gray-800/50 hover:bg-gray-700/50 text-gray-400 hover:text-white rounded-lg transition-all duration-300"
                  title="Copy link"
                >
                  <Copy className="w-4 h-4" />
                </button>
                {copySuccess && (
                  <span className="text-green-400 text-sm">Copied!</span>
                )}
              </div>
            </div>
          </header>

          {/* Featured Image */}
          <div className="relative mb-12">
            <div className="relative h-64 sm:h-80 md:h-96 rounded-2xl overflow-hidden">
              <Image
                src={blog.featuredImage}
                alt={blog.title}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
          </div>
        </div>

        {/* Article Content */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="prose prose-lg prose-invert max-w-none">
            <div 
              className="article-content text-gray-300 leading-relaxed"
              dangerouslySetInnerHTML={{ 
                __html: blog.content
                  .replace(/\n/g, '<br>')
                  .replace(/# (.*)/g, '<h1 class="text-3xl font-bold text-white mt-8 mb-4">$1</h1>')
                  .replace(/## (.*)/g, '<h2 class="text-2xl font-bold text-white mt-6 mb-3">$1</h2>')
                  .replace(/### (.*)/g, '<h3 class="text-xl font-bold text-white mt-4 mb-2">$1</h3>')
                  .replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>')
                  .replace(/\*(.*?)\*/g, '<em class="text-blue-300">$1</em>')
                  .replace(/`([^`]+)`/g, '<code class="bg-gray-800 text-blue-300 px-2 py-1 rounded text-sm">$1</code>')
                  .replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre class="bg-gray-900 border border-gray-700 rounded-lg p-4 overflow-x-auto my-6"><code class="text-green-400 text-sm">$2</code></pre>')
              }}
            />
          </div>

          {/* Tags */}
          <div className="mt-12 pt-8 border-t border-gray-800">
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-gray-400 font-medium">Tags:</span>
              {blog.tags.map((tag, index) => (
                <Link
                  key={index}
                  href={`/blog?tag=${tag}`}
                  className="flex items-center space-x-1 px-3 py-1 bg-gray-800/50 hover:bg-blue-500/20 text-gray-300 hover:text-blue-300 text-sm rounded-full border border-gray-700/50 hover:border-blue-500/30 transition-all duration-300"
                >
                  <Tag className="w-3 h-3" />
                  <span>{tag}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Comments Section */}
          <div className="mt-16 pt-12 border-t border-gray-800">
            <h2 className="text-2xl font-bold text-white mb-8 flex items-center space-x-2">
              <MessageCircle className="w-6 h-6" />
              <span>Comments ({comments.length})</span>
            </h2>

            {/* Comment Form */}
            <div className="mb-12 p-6 bg-gray-900/50 border border-gray-700/50 rounded-2xl">
              <h3 className="text-xl font-semibold text-white mb-6">Leave a Comment</h3>
              <CommentForm onSubmit={handleAddComment} />
            </div>

            {/* Comments List */}
            <div className="space-y-6">
              {comments.map((comment) => (
                <div key={comment._id} className="p-6 bg-gray-900/30 border border-gray-700/30 rounded-xl">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="font-semibold text-white">
                        {comment.website ? (
                          <a 
                            href={comment.website} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="hover:text-blue-400 transition-colors"
                          >
                            {comment.author}
                          </a>
                        ) : (
                          comment.author
                        )}
                      </h4>
                      <p className="text-sm text-gray-400">
                        {formatDate(comment.createdAt)}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-300 leading-relaxed">
                    {comment.content}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </article>
    </div>
  )
}

export default BlogDetailPage