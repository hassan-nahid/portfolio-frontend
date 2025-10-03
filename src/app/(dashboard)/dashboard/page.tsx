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

interface AnalyticsData {
  totalBlogs: number
  totalProjects: number
  totalComments: number
  totalViews: number
  recentActivities: Array<{
    id: string
    type: string
    message: string
    timestamp: string
  }>
  monthlyStats: Array<{
    month: string
    blogs: number
    projects: number
    views: number
  }>
}

export default function DashboardPage() {
  const [analytics, setAnalytics] = useState<AnalyticsData>({
    totalBlogs: 0,
    totalProjects: 0,
    totalComments: 0,
    totalViews: 0,
    recentActivities: [],
    monthlyStats: []
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate API call - replace with actual backend integration
    const fetchAnalytics = async () => {
      try {
        // Mock data - replace with actual API calls
        const mockData: AnalyticsData = {
          totalBlogs: 24,
          totalProjects: 12,
          totalComments: 156,
          totalViews: 8924,
          recentActivities: [
            {
              id: '1',
              type: 'blog',
              message: 'New blog post "Building Modern APIs" published',
              timestamp: '2 hours ago'
            },
            {
              id: '2',
              type: 'comment',
              message: 'New comment on "React Best Practices"',
              timestamp: '4 hours ago'
            },
            {
              id: '3',
              type: 'project',
              message: 'Project "E-commerce Platform" updated',
              timestamp: '1 day ago'
            },
            {
              id: '4',
              type: 'blog',
              message: 'Blog post "Node.js Security" received 50+ views',
              timestamp: '2 days ago'
            },
            {
              id: '5',
              type: 'comment',
              message: 'Comment approved on "TypeScript Guide"',
              timestamp: '3 days ago'
            }
          ],
          monthlyStats: [
            { month: 'Jan', blogs: 3, projects: 2, views: 1200 },
            { month: 'Feb', blogs: 4, projects: 1, views: 1500 },
            { month: 'Mar', blogs: 5, projects: 3, views: 2100 },
            { month: 'Apr', blogs: 6, projects: 2, views: 2800 },
            { month: 'May', blogs: 4, projects: 3, views: 2400 },
            { month: 'Jun', blogs: 2, projects: 1, views: 1800 }
          ]
        }
        
        setAnalytics(mockData)
      } catch (error) {
        console.error('Failed to fetch analytics:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchAnalytics()
  }, [])

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
    <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-400 text-sm font-medium">{title}</p>
          <p className="text-2xl font-bold text-white mt-2">{value.toLocaleString()}</p>
          <div className="flex items-center mt-2">
            <TrendingUp 
              className={`w-4 h-4 mr-1 ${trend === 'up' ? 'text-green-400' : 'text-red-400'}`} 
            />
            <span className={`text-sm ${trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
              {trendValue}
            </span>
          </div>
        </div>
        <div className="p-3 bg-blue-500/20 rounded-lg">
          <Icon className="w-6 h-6 text-blue-400" />
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
          <p className="text-sm text-white">{activity.message}</p>
          <p className="text-xs text-gray-400 mt-1">{activity.timestamp}</p>
        </div>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white/5 rounded-xl p-6 h-32"></div>
            ))}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white/5 rounded-xl p-6 h-96"></div>
            <div className="bg-white/5 rounded-xl p-6 h-96"></div>
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
          <h1 className="text-3xl font-bold text-white">Dashboard Overview</h1>
          <p className="text-gray-400 mt-2">Welcome back! Here&apos;s what&apos;s happening with your portfolio.</p>
        </div>
        <div className="flex items-center space-x-2 text-gray-400">
          <Calendar className="w-5 h-5" />
          <span className="text-sm">{new Date().toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}</span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Blogs"
          value={analytics.totalBlogs}
          icon={FileText}
          trend="up"
          trendValue="+12% this month"
        />
        <StatCard
          title="Total Projects"
          value={analytics.totalProjects}
          icon={FolderOpen}
          trend="up"
          trendValue="+8% this month"
        />
        <StatCard
          title="Comments"
          value={analytics.totalComments}
          icon={MessageSquare}
          trend="up"
          trendValue="+25% this month"
        />
        <StatCard
          title="Total Views"
          value={analytics.totalViews}
          icon={Eye}
          trend="up"
          trendValue="+15% this month"
        />
      </div>

      {/* Charts and Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Stats Chart */}
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-white">Monthly Overview</h3>
            <BarChart3 className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {analytics.monthlyStats.map((stat, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-gray-400 font-medium">{stat.month}</span>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="text-sm text-white">{stat.blogs} blogs</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-white">{stat.projects} projects</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                    <span className="text-sm text-white">{stat.views} views</span>
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

      {/* Quick Actions */}
      <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
        <h3 className="text-xl font-semibold text-white mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="flex items-center space-x-2 p-3 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded-lg transition-colors">
            <FileText className="w-5 h-5" />
            <span>New Blog</span>
          </button>
          <button className="flex items-center space-x-2 p-3 bg-green-500/20 hover:bg-green-500/30 text-green-400 rounded-lg transition-colors">
            <FolderOpen className="w-5 h-5" />
            <span>New Project</span>
          </button>
          <button className="flex items-center space-x-2 p-3 bg-purple-500/20 hover:bg-purple-500/30 text-purple-400 rounded-lg transition-colors">
            <MessageSquare className="w-5 h-5" />
            <span>Moderate Comments</span>
          </button>
          <button className="flex items-center space-x-2 p-3 bg-orange-500/20 hover:bg-orange-500/30 text-orange-400 rounded-lg transition-colors">
            <BarChart3 className="w-5 h-5" />
            <span>View Analytics</span>
          </button>
        </div>
      </div>
    </div>
  )
}