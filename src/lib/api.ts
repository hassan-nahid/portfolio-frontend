// API Configuration
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// API Response Types
export interface ApiResponse<T = unknown> {
  statusCode: number
  success: boolean
  message: string
  data?: T
}

export interface LoginResponse {
  accessToken: string
  refreshToken: string
  user: {
    _id: string
    email: string
    name: string
    role: 'OWNER' | 'ADMIN' | 'USER'
    createdAt: string
    updatedAt: string
  }
}

// API Error Class
export class ApiError extends Error {
  constructor(
    public statusCode: number,
    message: string,
    public response?: unknown
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

// Generic API fetch function
export async function apiRequest<T = unknown>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const url = `${API_BASE_URL}${endpoint}`
  
  // Don't set Content-Type for FormData, let browser handle it
  const isFormData = options.body instanceof FormData
  
  const defaultOptions: RequestInit = {
    credentials: 'include',
    headers: isFormData ? options.headers : {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  }

  // HTTP-only cookies will be automatically included with credentials: 'include'
  // No need to manually add Authorization headers

  try {
    console.log('API Request:', { url, method: defaultOptions.method })
    const response = await fetch(url, defaultOptions)
    
    console.log('Response status:', response.status, response.statusText)
    
    // Check if response has JSON content
    const contentType = response.headers.get('content-type')
    if (!contentType || !contentType.includes('application/json')) {
      console.error('Response is not JSON:', contentType)
      throw new ApiError(response.status, 'Server did not return JSON response')
    }
    
    const data = await response.json()

    console.log('API Response:', { 
      status: response.status, 
      success: data.success, 
      endpoint: endpoint,
      dataKeys: Object.keys(data || {})
    })

    if (!response.ok) {
      console.error('API Error:', { status: response.status, data })
      throw new ApiError(response.status, data.message || 'API request failed', data)
    }

    return data
  } catch (error) {
    if (error instanceof ApiError) {
      throw error
    }
    
    console.error('Network Error:', error)
    // Handle network errors
    throw new ApiError(0, 'Network error. Please check your connection.')
  }
}

export interface User {
  _id: string
  email: string
  name: string
  role: 'OWNER' | 'ADMIN' | 'USER'
  createdAt: string
  updatedAt: string
}

// Skill-related interfaces
export interface SkillCategory {
  _id: string
  title: string
  __v: number
}

export interface Skill {
  _id: string
  skill: string
  level: string
  logo: string
  category: SkillCategory
  __v: number
}

export interface SkillListResponse {
  statusCode: number
  success: boolean
  message: string
  data: Skill[]
}

// Health check function
export const healthCheck = async (): Promise<boolean> => {
  try {
    const response = await fetch(`${API_BASE_URL}/health`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    return response.ok
  } catch {
    return false
  }
}

// About section types
export interface AboutData {
  _id?: string
  name: string
  about: string
  bio: string
  experience: number
  projects: number
  photo: string
  createdAt?: string
  updatedAt?: string
}

// Specific API functions
export const authApi = {
  login: (email: string, password: string) =>
    apiRequest<LoginResponse>('/user/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),

  logout: () =>
    apiRequest('/user/logout', {
      method: 'POST',
    }),

  getCurrentUser: () =>
    apiRequest<User>('/user/me', {
      method: 'GET',
    }),
}

export const aboutApi = {
  get: () =>
    apiRequest<AboutData>('/about', {
      method: 'GET',
    }),

  create: (data: Omit<AboutData, '_id' | 'createdAt' | 'updatedAt'>) =>
    apiRequest<AboutData>('/about/create', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  createWithFile: (formData: FormData) =>
    apiRequest<AboutData>('/about/create', {
      method: 'POST',
      body: formData,
      headers: {}, // Remove Content-Type header to let browser set it for FormData
    }),

  update: (id: string, data: Partial<Omit<AboutData, '_id' | 'createdAt' | 'updatedAt'>>) =>
    apiRequest<AboutData>(`/about/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    }),

  updateWithFile: (id: string, formData: FormData) =>
    apiRequest<AboutData>(`/about/${id}`, {
      method: 'PATCH',
      body: formData,
      headers: {}, // Remove Content-Type header to let browser set it for FormData
    }),

  delete: (id: string) =>
    apiRequest<null>(`/about/${id}`, {
      method: 'DELETE',
    }),
}

// Skills API Types
export interface SkillData {
  _id: string
  skill: string
  logo: string
  category: SkillCategoryData
  level: 'Beginner' | 'Intermediate' | 'Experienced' | 'Expert' | 'Good' | 'Strong' | 'Excellent'
  createdAt?: string
  updatedAt?: string
}

export interface SkillCategoryData {
  _id: string
  title: string
  createdAt?: string
  updatedAt?: string
}

export interface CreateSkillData {
  skill: string
  logo: string
  category: string // ObjectId as string
  level: 'Beginner' | 'Intermediate' | 'Experienced' | 'Expert' | 'Good' | 'Strong' | 'Excellent'
}

export interface CreateSkillCategoryData {
  title: string
}

// Skills API
export const skillsApi = {
  // Skills CRUD
  getAll: () =>
    apiRequest<SkillData[]>('/skill'),

  getById: (id: string) =>
    apiRequest<SkillData>(`/skill/${id}`),

  create: (data: CreateSkillData) =>
    apiRequest<SkillData>('/skill', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  createWithFile: (formData: FormData) =>
    apiRequest<SkillData>('/skill', {
      method: 'POST',
      body: formData,
      headers: {}, // Remove Content-Type header to let browser set it for FormData
    }),

  update: (id: string, data: Partial<CreateSkillData>) =>
    apiRequest<SkillData>(`/skill/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  updateWithFile: (id: string, formData: FormData) =>
    apiRequest<SkillData>(`/skill/${id}`, {
      method: 'PUT',
      body: formData,
      headers: {}, // Remove Content-Type header to let browser set it for FormData
    }),

  delete: (id: string) =>
    apiRequest<null>(`/skill/${id}`, {
      method: 'DELETE',
    }),

  // Categories CRUD
  getCategories: () =>
    apiRequest<SkillCategoryData[]>('/skill/category'),

  getCategoryById: (id: string) =>
    apiRequest<SkillCategoryData>(`/skill/category/${id}`),

  createCategory: (data: CreateSkillCategoryData) =>
    apiRequest<SkillCategoryData>('/skill/category', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  updateCategory: (id: string, data: Partial<CreateSkillCategoryData>) =>
    apiRequest<SkillCategoryData>(`/skill/category/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  deleteCategory: (id: string) =>
    apiRequest<null>(`/skill/category/${id}`, {
      method: 'DELETE',
    }),
}

// Project API Types
export interface ProjectData {
  _id: string
  title: string
  image: string
  category: 'WEB' | 'MOBILE' | 'DESKTOP'
  description: string
  features?: string[] // Array of project features
  demoLink?: string
  githubFrontend?: string
  githubBackend?: string
  githubFullStack?: string
  stacks: SkillData[] // Populated skill references
  createdAt?: string
  updatedAt?: string
}

export interface CreateProjectData {
  title: string
  image: string
  category: 'WEB' | 'MOBILE' | 'DESKTOP'
  description: string
  features?: string[]
  demoLink?: string
  githubFrontend?: string
  githubBackend?: string
  githubFullStack?: string
  stacks: string[] // ObjectId strings
}

// Projects API
export const projectsApi = {
  // Projects CRUD
  getAll: () =>
    apiRequest<ProjectData[]>('/project'),

  getById: (id: string) =>
    apiRequest<ProjectData>(`/project/${id}`),

  create: (data: CreateProjectData) =>
    apiRequest<ProjectData>('/project/create', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  createWithFile: (formData: FormData) =>
    apiRequest<ProjectData>('/project/create', {
      method: 'POST',
      body: formData,
      headers: {}, // Remove Content-Type header to let browser set it for FormData
    }),

  update: (id: string, data: Partial<CreateProjectData>) =>
    apiRequest<ProjectData>(`/project/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  updateWithFile: (id: string, formData: FormData) =>
    apiRequest<ProjectData>(`/project/${id}`, {
      method: 'PUT',
      body: formData,
      headers: {}, // Remove Content-Type header to let browser set it for FormData
    }),

  delete: (id: string) =>
    apiRequest<null>(`/project/${id}`, {
      method: 'DELETE',
    }),
}

// User API Types
export interface ChangePasswordData {
  oldPassword: string
  newPassword: string
}

// User API
export const userApi = {
  // Get current user profile
  getMe: () =>
    apiRequest<User>('/user/me'),

  // Change password
  changePassword: (data: ChangePasswordData) =>
    apiRequest<null>('/user/change-password', {
      method: 'PATCH',
      body: JSON.stringify(data),
    }),
}

// Blog API Types
export interface BlogData {
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
  category: 'Technology' | 'Web Development' | 'Programming' | 'Tutorial' | 'Personal' | 'Other'
  tags: string[]
  status: 'draft' | 'published' | 'archived'
  isFeature: boolean
  viewCount: number
  commentCount: number
  comments: BlogCommentData[]
  publishedAt?: string
  createdAt: string
  updatedAt: string
}

export interface BlogCommentData {
  _id?: string
  author: string
  email: string
  website?: string
  content: string
  isApproved: boolean
  createdAt: string
  updatedAt: string
}

export interface CreateBlogData {
  title: string
  excerpt: string
  content: string
  category: string
  tags: string[]
  status?: string
  isFeature?: boolean
}

export interface BlogQueryParams {
  page?: number
  limit?: number
  searchTerm?: string
  category?: string
  status?: string
  featured?: boolean
}

export interface BlogListResponse {
  result: BlogData[]
  meta: {
    page: number
    limit: number
    total: number
    totalPage: number
  }
}

// Blog API
export const blogApi = {
  // Admin endpoints
  getAllForAdmin: (params?: BlogQueryParams) => {
    const searchParams = new URLSearchParams()
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          searchParams.append(key, value.toString())
        }
      })
    }
    const queryString = searchParams.toString()
    return apiRequest<BlogListResponse>(`/blog/admin${queryString ? `?${queryString}` : ''}`)
  },

  getByIdForAdmin: (id: string) =>
    apiRequest<BlogData>(`/blog/admin/${id}`),

  create: (formData: FormData) =>
    apiRequest<BlogData>('/blog/create', {
      method: 'POST',
      body: formData,
      headers: {}, // Let browser set Content-Type for FormData
    }),

  update: (id: string, formData: FormData) =>
    apiRequest<BlogData>(`/blog/${id}`, {
      method: 'PATCH',
      body: formData,
      headers: {}, // Let browser set Content-Type for FormData
    }),

  delete: (id: string) =>
    apiRequest<null>(`/blog/${id}`, {
      method: 'DELETE',
    }),

  // Comment management
  manageComment: (commentId: string, action: 'approve' | 'reject') =>
    apiRequest<BlogCommentData>(`/blog/comments/${commentId}`, {
      method: 'PATCH',
      body: JSON.stringify({ action }),
    }),

  // Public endpoints
  getPublic: (params?: BlogQueryParams) => {
    const searchParams = new URLSearchParams()
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          searchParams.append(key, value.toString())
        }
      })
    }
    const queryString = searchParams.toString()
    return apiRequest<BlogListResponse>(`/blog${queryString ? `?${queryString}` : ''}`)
  },

  getByIdentifier: (identifier: string) =>
    apiRequest<BlogData>(`/blog/${identifier}`),

  addComment: (blogId: string, commentData: { author: string; email: string; website?: string; content: string }) =>
    apiRequest<BlogCommentData>(`/blog/${blogId}/comments`, {
      method: 'POST',
      body: JSON.stringify(commentData),
    }),

  getComments: (blogId: string, params?: { page?: number; limit?: number }) => {
    const searchParams = new URLSearchParams()
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          searchParams.append(key, value.toString())
        }
      })
    }
    const queryString = searchParams.toString()
    return apiRequest<{
      result: BlogCommentData[]
      meta: {
        page: number
        limit: number
        total: number
        totalPage: number
      }
    }>(`/blog/${blogId}/comments${queryString ? `?${queryString}` : ''}`)
  },
}

// Skill API
export const skillApi = {
  getAll: async (): Promise<Skill[]> => {
    try {
      const response = await apiRequest<Skill[]>('/skill')
      return response.data || []
    } catch (error) {
      console.error('Failed to fetch skills:', error)
      return []
    }
  }
}