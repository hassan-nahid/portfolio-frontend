'use client'

import { useState, useEffect } from 'react'
import { 
  BarChart3, 
  FileText, 
  Eye, 
  TrendingUp, 
  MessageSquare,
  FolderOpen,
  Calendar,
  Activity
} from 'lucide-react'
import { blogApi, projectsApi, skillsApi } from '@/lib/api'

interface AnalyticsData {
  totalBlogs: number
  totalProjects: number
  totalSkills: number
  totalComments: number
  totalViews: number
  pendingComments: number
  featuredBlogs: number
  recentActivities: Array<{
    id: string
    type: string
    message: string
    timestamp: string
  }>
  monthlyStats: Array<{
    month: string
    blogs: number
    views: number
    comments: number
    published?: number
  }>
  topBlogs: Array<{
    id: string
    title: string
    views: number
    comments: number
  }>
  recentBlogs: Array<{
    id: string
    title: string
    status: string
    publishedAt: string
  }>
}

export default function DashboardPage() {
  const [analytics, setAnalytics] = useState<AnalyticsData>({
    totalBlogs: 0,
    totalProjects: 0,
    totalSkills: 0,
    totalComments: 0,
    totalViews: 0,
    pendingComments: 0,
    featuredBlogs: 0,
    recentActivities: [],
    monthlyStats: [],
    topBlogs: [],
    recentBlogs: []
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        // Fetch real data from APIs
        const [blogStatsResponse, projectsResponse, skillsResponse] = await Promise.all([
          blogApi.getStats(),
          projectsApi.getAll(),
          skillsApi.getAll()
        ])

        const blogStats = blogStatsResponse.data
        const projects = projectsResponse.data || []
        const skills = skillsResponse.data || []

        // Use stats from API
        const totalViews = blogStats?.overview.totalViews || 0
        const totalComments = blogStats?.overview.totalComments || 0
        const pendingComments = blogStats?.overview.pendingComments || 0
        const featuredBlogs = blogStats?.overview.featuredBlogs || 0

        // Generate recent activities from API data
        const recentActivities = [
          ...(blogStats?.recentActivity.slice(0, 2).map(blog => ({
            id: blog._id,
            type: 'blog',
            message: `Blog post "${blog.title}" ${blog.status === 'published' ? 'published' : 'updated'}`,
            timestamp: formatTimeAgo(blog.updatedAt)
          })) || []),
          ...projects.slice(0, 2).map(project => ({
            id: project._id,
            type: 'project',
            message: `Project "${project.title}" updated`,
            timestamp: formatTimeAgo(project.updatedAt || project.createdAt || '')
          })),
          {
            id: 'comments',
            type: 'comment',
            message: `${pendingComments} comments pending approval`,
            timestamp: 'Recent'
          }
        ]

        // Use monthly stats from API or generate fallback  
        const monthlyStats = blogStats?.monthlyStats?.map(stat => ({
          month: stat.month,
          blogs: stat.blogs,
          views: stat.views,
          comments: stat.comments,
          published: stat.published
        })) || []

        // Get top blogs from API
        const topBlogs = blogStats?.topBlogsByViews.slice(0, 5).map(blog => ({
          id: blog._id,
          title: blog.title,
          views: blog.views,
          comments: blog.comments
        })) || []

        // Get recent blogs from API
        const recentBlogs = blogStats?.recentActivity.slice(0, 5).map(blog => ({
          id: blog._id,
          title: blog.title,
          status: blog.status,
          publishedAt: blog.updatedAt
        })) || []

        const analyticsData: AnalyticsData = {
          totalBlogs: blogStats?.overview.totalBlogs || 0,
          totalProjects: projects.length,
          totalSkills: skills.length,
          totalComments,
          totalViews,
          pendingComments,
          featuredBlogs,
          recentActivities,
          monthlyStats,
          topBlogs,
          recentBlogs
        }
        
        setAnalytics(analyticsData)
      } catch (error) {
        console.error('Failed to fetch analytics:', error)
        // Set fallback data in case of error
        setAnalytics({
          totalBlogs: 0,
          totalProjects: 0,
          totalSkills: 0,
          totalComments: 0,
          totalViews: 0,
          pendingComments: 0,
          featuredBlogs: 0,
          recentActivities: [],
          monthlyStats: [],
          topBlogs: [],
          recentBlogs: []
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchAnalytics()
  }, [])

  // Helper function to format time ago
  const formatTimeAgo = (dateString: string) => {
    if (!dateString) return 'Unknown'
    const date = new Date(dateString)
    const now = new Date()
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)
    
    if (diffInSeconds < 60) return 'Just now'
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`
    if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)} days ago`
    return `${Math.floor(diffInSeconds / 2592000)} months ago`
  }

  const StatCard = ({ 
    title, 
    value, 
    icon: Icon, 
    trend, 
    trendValue 
  }: {
    title: string
    value: number
    icon: React.ComponentType<{ className?: string }>
    trend: 'up' | 'down'
    trendValue: string
  }) => (
    <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-white/10 hover:bg-white/10 transition-all duration-300">
      <div className="flex items-center justify-between">
        <div className="flex-1 min-w-0">
          <p className="text-gray-400 text-xs sm:text-sm font-medium">{title}</p>
          <p className="text-xl sm:text-2xl font-bold text-white mt-1 sm:mt-2">{value.toLocaleString()}</p>
          <div className="flex items-center mt-1 sm:mt-2">
            <TrendingUp 
              className={`w-3 h-3 sm:w-4 sm:h-4 mr-1 ${trend === 'up' ? 'text-green-400' : 'text-red-400'}`} 
            />
            <span className={`text-xs sm:text-sm ${trend === 'up' ? 'text-green-400' : 'text-red-400'} truncate`}>
              {trendValue}
            </span>
          </div>
        </div>
        <div className="p-2 sm:p-3 bg-blue-500/20 rounded-lg flex-shrink-0">
          <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" />
        </div>
      </div>
    </div>
  )

  const ActivityItem = ({ activity }: { activity: AnalyticsData['recentActivities'][0] }) => {
    const getIcon = (type: string) => {
      switch (type) {
        case 'blog':
          return <FileText className="w-4 h-4 text-blue-400" />
        case 'project':
          return <FolderOpen className="w-4 h-4 text-green-400" />
        case 'comment':
          return <MessageSquare className="w-4 h-4 text-purple-400" />
        default:
          return <Activity className="w-4 h-4 text-gray-400" />
      }
    }

    return (
      <div className="flex items-start space-x-3 p-3 hover:bg-white/5 rounded-lg transition-colors">
        <div className="flex-shrink-0 mt-1">
          {getIcon(activity.type)}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs sm:text-sm text-white break-words">{activity.message}</p>
          <p className="text-xs text-gray-400 mt-1">{activity.timestamp}</p>
        </div>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="p-4 sm:p-6 overflow-x-hidden">
        <div className="animate-pulse">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white/5 rounded-xl p-4 sm:p-6 h-24 sm:h-32"></div>
            ))}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            <div className="bg-white/5 rounded-xl p-4 sm:p-6 h-64 sm:h-96"></div>
            <div className="bg-white/5 rounded-xl p-4 sm:p-6 h-64 sm:h-96"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-4 sm:p-6 space-y-4 sm:space-y-6 overflow-x-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Dashboard Overview</h1>
          <p className="text-gray-400 mt-2 text-sm sm:text-base">Welcome back! Here&apos;s what&apos;s happening with your portfolio.</p>
        </div>
        <div className="flex items-center space-x-2 text-gray-400 flex-shrink-0">
          <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="text-xs sm:text-sm hidden sm:inline">{new Date().toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}</span>
          <span className="text-xs sm:hidden">{new Date().toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric' 
          })}</span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <StatCard
          title="Total Blogs"
          value={analytics.totalBlogs}
          icon={FileText}
          trend="up"
          trendValue={`${analytics.featuredBlogs} featured`}
        />
        <StatCard
          title="Total Projects"
          value={analytics.totalProjects}
          icon={FolderOpen}
          trend="up"
          trendValue="Active portfolio"
        />
        <StatCard
          title="Total Skills"
          value={analytics.totalSkills}
          icon={Activity}
          trend="up"
          trendValue="Technologies"
        />
        <StatCard
          title="Total Views"
          value={analytics.totalViews}
          icon={Eye}
          trend="up"
          trendValue={`${analytics.totalComments} comments`}
        />
      </div>

      {/* Additional Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Pending Comments</p>
              <p className="text-xl font-bold text-orange-400">{analytics.pendingComments}</p>
            </div>
            <MessageSquare className="w-8 h-8 text-orange-400" />
          </div>
        </div>
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Featured Blogs</p>
              <p className="text-xl font-bold text-green-400">{analytics.featuredBlogs}</p>
            </div>
            <TrendingUp className="w-8 h-8 text-green-400" />
          </div>
        </div>
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Avg Views/Post</p>
              <p className="text-xl font-bold text-blue-400">
                {analytics.totalBlogs > 0 ? Math.round(analytics.totalViews / analytics.totalBlogs) : 0}
              </p>
            </div>
            <BarChart3 className="w-8 h-8 text-blue-400" />
          </div>
        </div>
      </div>

      {/* Top Blogs and Recent Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
        {/* Top Performing Blogs */}
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-white">Top Performing Blogs</h3>
            <TrendingUp className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {analytics.topBlogs.length > 0 ? analytics.topBlogs.map((blog, index) => (
              <div key={blog.id} className="flex items-start justify-between p-3 bg-white/5 rounded-lg gap-3">
                <div className="flex items-start space-x-3 flex-1 min-w-0">
                  <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center text-blue-400 font-bold text-sm flex-shrink-0">
                    {index + 1}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-white font-medium truncate" title={blog.title}>{blog.title}</p>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-green-400 font-semibold text-sm sm:text-base">{blog.views} views</p>
                  <p className="text-gray-400 text-xs sm:text-sm">{blog.comments} comments</p>
                </div>
              </div>
            )) : (
              <p className="text-gray-400 text-center py-4">No blog data available</p>
            )}
          </div>
        </div>

        {/* Recent Blog Posts */}
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-white">Recent Blog Posts</h3>
            <FileText className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {analytics.recentBlogs.length > 0 ? analytics.recentBlogs.map((blog) => (
              <div key={blog.id} className="flex items-start justify-between p-3 bg-white/5 rounded-lg gap-3">
                <div className="flex-1 min-w-0">
                  <p className="text-white font-medium truncate" title={blog.title}>{blog.title}</p>
                  <p className="text-gray-400 text-sm">
                    {new Date(blog.publishedAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
                    blog.status === 'published' 
                      ? 'bg-green-500/20 text-green-400' 
                      : blog.status === 'draft'
                      ? 'bg-yellow-500/20 text-yellow-400'
                      : 'bg-gray-500/20 text-gray-400'
                  }`}>
                    {blog.status}
                  </span>
                </div>
              </div>
            )) : (
              <p className="text-gray-400 text-center py-4">No recent blogs</p>
            )}
          </div>
        </div>
      </div>

      {/* Charts and Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Monthly Stats Chart */}
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-white">Monthly Overview</h3>
            <BarChart3 className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {analytics.monthlyStats.map((stat, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 font-medium">{stat.month}</span>
                </div>
                <div className="flex flex-wrap items-center gap-2 sm:gap-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="text-xs sm:text-sm text-white whitespace-nowrap">{stat.blogs} blogs</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-xs sm:text-sm text-white whitespace-nowrap">{stat.comments} comments</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                    <span className="text-xs sm:text-sm text-white whitespace-nowrap">{stat.views} views</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-white">Recent Activities</h3>
            <Activity className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-2 max-h-80 overflow-y-auto">
            {analytics.recentActivities.map((activity) => (
              <ActivityItem key={activity.id} activity={activity} />
            ))}
          </div>
        </div>
      </div>

   
    </div>
  )
}