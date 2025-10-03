// API Configuration
export const API_BASE_URL = 'http://localhost:5000/api/v1'

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
    const data = await response.json()

    console.log('API Response:', { 
      status: response.status, 
      success: data.success, 
      endpoint: endpoint 
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