'use client'

import { useState, useEffect } from 'react'
import { 
  Plus, 
  Search, 
  Eye, 
  Edit, 
  Trash2, 
  ExternalLink,
  Github,
  Calendar,
  Tag,
  X,
  Save
} from 'lucide-react'
import Image from 'next/image'
import { projectsApi, ProjectData, skillsApi, SkillData } from '@/lib/api'
import { toast } from 'sonner'

// Backend Category enum
enum ProjectCategory {
  WEB = "WEB",
  MOBILE = "MOBILE",
  DESKTOP = "DESKTOP"
}

// Using API types
type Project = ProjectData

interface ProjectFormData {
  title: string
  image: string
  category: ProjectCategory
  description: string
  features: string[]
  demoLink: string
  githubFrontend: string
  githubBackend: string
  githubFullStack: string
  stacks: string[]  // Array of skill ObjectIds
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [skills, setSkills] = useState<SkillData[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<'all' | string>('all')
  const [showModal, setShowModal] = useState(false)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState<ProjectFormData>({
    title: '',
    image: '',
    category: ProjectCategory.WEB,
    description: '',
    features: [],
    demoLink: '',
    githubFrontend: '',
    githubBackend: '',
    githubFullStack: '',
    stacks: []
  })
  const [newFeature, setNewFeature] = useState('')
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string>('')
  const [imageChanged, setImageChanged] = useState(false)

  useEffect(() => {
    fetchProjects()
    fetchSkills()
  }, [])

  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast.error('Please select an image file')
        return
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('File size must be less than 5MB')
        return
      }
      
      // Create preview URL
      const preview = URL.createObjectURL(file)
      setSelectedFile(file)
      setPreviewUrl(preview)
      setFormData(prev => ({ ...prev, image: preview }))
      setImageChanged(true)
    }
  }

  const clearImageFile = (markAsChanged = true) => {
    if (previewUrl && previewUrl.startsWith('blob:')) {
      URL.revokeObjectURL(previewUrl)
    }
    setSelectedFile(null)
    setPreviewUrl('')
    setFormData(prev => ({ ...prev, image: '' }))
    if (markAsChanged) {
      setImageChanged(true)
    }
  }

  const fetchSkills = async () => {
    try {
      const response = await skillsApi.getAll()
      if (response.success && response.data) {
        setSkills(response.data)
      } else {
        toast.error('Failed to fetch skills')
      }
    } catch (error) {
      console.error('Failed to fetch skills:', error)
      toast.error('Failed to fetch skills')
    }
  }

  const fetchProjects = async () => {
    try {
      const response = await projectsApi.getAll()
      if (response.success && response.data) {
        setProjects(response.data)
      } else {
        toast.error('Failed to fetch projects')
      }
    } catch (error) {
      console.error('Failed to fetch projects:', error)
      toast.error('Failed to fetch projects')
    } finally {
      setIsLoading(false)
    }
  }



  const handleDeleteProject = async (id: string) => {
    if (confirm('Are you sure you want to delete this project?')) {
      try {
        const response = await projectsApi.delete(id)
        if (response.success) {
          setProjects(projects.filter(project => project._id !== id))
          toast.success('Project deleted successfully')
        } else {
          toast.error('Failed to delete project')
        }
      } catch (error) {
        console.error('Failed to delete project:', error)
        toast.error('Failed to delete project')
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (isEditing && selectedProject) {
        // Update project
        let response
        if (selectedFile) {
          // Handle file upload
          const formDataWithFile = new FormData()
          formDataWithFile.append('image', selectedFile)
          formDataWithFile.append('title', formData.title)
          formDataWithFile.append('category', formData.category)
          formDataWithFile.append('description', formData.description)
          formDataWithFile.append('features', JSON.stringify(formData.features))
          formDataWithFile.append('demoLink', formData.demoLink)
          formDataWithFile.append('githubFrontend', formData.githubFrontend)
          formDataWithFile.append('githubBackend', formData.githubBackend)
          formDataWithFile.append('githubFullStack', formData.githubFullStack)
          formDataWithFile.append('stacks', JSON.stringify(formData.stacks))
          
          response = await projectsApi.updateWithFile(selectedProject._id, formDataWithFile)
        } else {
          // Handle URL update - only include image if it has changed or is explicitly provided
          const updatePayload: Partial<ProjectFormData> = {
            title: formData.title,
            category: formData.category,
            description: formData.description,
            features: formData.features,
            demoLink: formData.demoLink,
            githubFrontend: formData.githubFrontend,
            githubBackend: formData.githubBackend,
            githubFullStack: formData.githubFullStack,
            stacks: formData.stacks
          }
          
          // Only include image if it has been changed by the user
          if (imageChanged && formData.image && formData.image.trim() !== '') {
            updatePayload.image = formData.image
          }
          
          response = await projectsApi.update(selectedProject._id, updatePayload)
        }
        
        if (response.success && response.data) {
          setProjects(projects.map(p => p._id === selectedProject._id ? response.data! : p))
          toast.success('Project updated successfully')
        } else {
          toast.error('Failed to update project')
        }
      } else {
        // Create new project
        let response
        if (selectedFile) {
          // Handle file upload
          const formDataWithFile = new FormData()
          formDataWithFile.append('image', selectedFile)
          formDataWithFile.append('title', formData.title)
          formDataWithFile.append('category', formData.category)
          formDataWithFile.append('description', formData.description)
          formDataWithFile.append('features', JSON.stringify(formData.features))
          formDataWithFile.append('demoLink', formData.demoLink)
          formDataWithFile.append('githubFrontend', formData.githubFrontend)
          formDataWithFile.append('githubBackend', formData.githubBackend)
          formDataWithFile.append('githubFullStack', formData.githubFullStack)
          formDataWithFile.append('stacks', JSON.stringify(formData.stacks))
          
          response = await projectsApi.createWithFile(formDataWithFile)
        } else {
          // Handle URL creation
          response = await projectsApi.create({
            title: formData.title,
            image: formData.image,
            category: formData.category,
            description: formData.description,
            features: formData.features,
            demoLink: formData.demoLink,
            githubFrontend: formData.githubFrontend,
            githubBackend: formData.githubBackend,
            githubFullStack: formData.githubFullStack,
            stacks: formData.stacks
          })
        }
        
        if (response.success && response.data) {
          setProjects([response.data, ...projects])
          toast.success('Project created successfully')
        } else {
          toast.error('Failed to create project')
        }
      }
      resetForm()
    } catch (error) {
      console.error('Failed to save project:', error)
      toast.error('Failed to save project')
    }
  }

  // Features management functions
  const addFeature = () => {
    if (newFeature.trim() && !formData.features.includes(newFeature.trim())) {
      setFormData(prev => ({
        ...prev,
        features: [...prev.features, newFeature.trim()]
      }))
      setNewFeature('')
    }
  }

  const removeFeature = (index: number) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }))
  }

  const resetForm = () => {
    setFormData({
      title: '',
      image: '',
      category: ProjectCategory.WEB,
      description: '',
      features: [],
      demoLink: '',
      githubFrontend: '',
      githubBackend: '',
      githubFullStack: '',
      stacks: []
    })
    setNewFeature('')
    clearImageFile()
    setShowModal(false)
    setIsEditing(false)
    setSelectedProject(null)
    setImageChanged(false)
  }

  const openEditModal = (project: Project) => {
    setSelectedProject(project)
    setFormData({
      title: project.title,
      image: project.image,
      category: project.category as ProjectCategory,
      description: project.description,
      features: project.features || [],
      demoLink: project.demoLink || '',
      githubFrontend: project.githubFrontend || '',
      githubBackend: project.githubBackend || '',
      githubFullStack: project.githubFullStack || '',
      stacks: project.stacks.map(skill => skill._id) // Extract ObjectIds from populated skills
    })
    // Clear any existing file selection when editing
    clearImageFile(false)
    setImageChanged(false)
    setIsEditing(true)
    setShowModal(true)
  }

  const openCreateModal = () => {
    resetForm()
    setShowModal(true)
  }



  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || project.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const categories = ['WEB', 'MOBILE', 'DESKTOP']

  const ProjectCard = ({ project }: { project: Project }) => (
    <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300">
      <div className="relative mb-4">
        <Image
          src={project.image}
          alt={project.title}
          width={400}
          height={200}
          className="w-full h-48 object-cover rounded-lg"
        />

      </div>

      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-white mb-2">{project.title}</h3>
          <p className="text-gray-400 text-sm mb-3 line-clamp-2">{project.description}</p>
          
          {/* Features Display */}
          {project.features && project.features.length > 0 && (
            <div className="mb-3">
              <div className="flex flex-wrap gap-1">
                {project.features.slice(0, 3).map((feature, index) => (
                  <span key={index} className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded">
                    ✨ {feature}
                  </span>
                ))}
                {project.features.length > 3 && (
                  <span className="text-xs bg-gray-500/20 text-gray-400 px-2 py-1 rounded">
                    +{project.features.length - 3} more
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
        <div className="flex items-center space-x-2 ml-4">
          <button
            onClick={() => setSelectedProject(project)}
            className="p-2 text-blue-400 hover:bg-blue-500/20 rounded-lg transition-colors"
            title="View"
          >
            <Eye className="w-4 h-4" />
          </button>
          <button
            onClick={() => openEditModal(project)}
            className="p-2 text-green-400 hover:bg-green-500/20 rounded-lg transition-colors"
            title="Edit"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleDeleteProject(project._id)}
            className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors"
            title="Delete"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="flex items-center space-x-2 mb-3">
        <Tag className="w-3 h-3 text-gray-500" />
        <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-xs">
          {project.category}
        </span>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {project.stacks.slice(0, 4).map((skill) => (
          <div key={skill._id} className="flex items-center space-x-1 px-2 py-1 bg-white/5 rounded text-xs">
            <span className="text-gray-300">{skill.skill}</span>
          </div>
        ))}
        {project.stacks.length > 4 && (
          <span className="px-2 py-1 bg-white/5 rounded text-xs text-gray-400">
            +{project.stacks.length - 4} more
          </span>
        )}
      </div>

      <div className="flex items-center justify-between text-sm text-gray-400">
        <div className="flex items-center space-x-3">
          {project.demoLink && (
            <a
              href={project.demoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1 text-blue-400 hover:text-blue-300"
            >
              <ExternalLink className="w-3 h-3" />
              <span>Demo</span>
            </a>
          )}
          <div className="flex items-center space-x-2">
            {project.githubFrontend && (
              <a
                href={project.githubFrontend}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-1 text-gray-400 hover:text-gray-300"
                title="Frontend"
              >
                <Github className="w-3 h-3" />
              </a>
            )}
            {project.githubBackend && (
              <a
                href={project.githubBackend}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-1 text-gray-400 hover:text-gray-300"
                title="Backend"
              >
                <Github className="w-3 h-3" />
              </a>
            )}
            {project.githubFullStack && (
              <a
                href={project.githubFullStack}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-1 text-gray-400 hover:text-gray-300"
                title="Full Stack"
              >
                <Github className="w-3 h-3" />
              </a>
            )}
          </div>
        </div>
        <div className="flex items-center space-x-1">
          <Calendar className="w-3 h-3" />
          <span>{project.createdAt ? new Date(project.createdAt).toLocaleDateString() : 'N/A'}</span>
        </div>
      </div>
    </div>
  )

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-white/5 rounded w-48"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white/5 rounded-xl p-6 h-80"></div>
            ))}
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
          <h1 className="text-3xl font-bold text-white">Project Management</h1>
          <p className="text-gray-400 mt-2">Manage your portfolio projects</p>
        </div>
        <button
          onClick={openCreateModal}
          className="flex items-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span>New Project</span>
        </button>
      </div>

      {/* Filters */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="relative">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-gradient-to-r from-white/5 to-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/30 hover:border-white/30 transition-all duration-300 appearance-none cursor-pointer shadow-lg backdrop-blur-sm pr-10"
          >
            <option value="all" className="bg-gray-900/95 text-white">🎯 All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category} className="bg-gray-900/95 text-white">📁 {category}</option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <ProjectCard key={project._id} project={project} />
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">No projects found</h3>
          <p className="text-gray-400">Try adjusting your search or filters</p>
        </div>
      )}

      {/* Project Form Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-white/10">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">
                  {isEditing ? 'Edit Project' : 'Create New Project'}
                </h2>
                <button
                  onClick={resetForm}
                  className="text-gray-400 hover:text-white"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white font-medium mb-2">Title</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-white font-medium mb-2">Category</label>
                  <div className="relative">
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value as ProjectCategory }))}
                      className="w-full bg-gradient-to-r from-white/5 to-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/30 hover:border-white/30 transition-all duration-300 appearance-none cursor-pointer shadow-lg backdrop-blur-sm pr-10"
                      required
                    >
                      <option value={ProjectCategory.WEB} className="bg-gray-900/95 text-white">🌐 Web Application</option>
                      <option value={ProjectCategory.MOBILE} className="bg-gray-900/95 text-white">📱 Mobile App</option>
                      <option value={ProjectCategory.DESKTOP} className="bg-gray-900/95 text-white">💻 Desktop Application</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-white font-medium mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  rows={4}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                  required
                />
              </div>

              {/* Features Section */}
              <div>
                <label className="block text-white font-medium mb-2">Features</label>
                <div className="space-y-3">
                  {/* Add Feature Input */}
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={newFeature}
                      onChange={(e) => setNewFeature(e.target.value)}
                      placeholder="Add a project feature..."
                      className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-green-500"
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())}
                    />
                    <button
                      type="button"
                      onClick={addFeature}
                      className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                      Add
                    </button>
                  </div>
                  
                  {/* Features List */}
                  {formData.features.length > 0 && (
                    <div className="space-y-2">
                      {formData.features.map((feature, index) => (
                        <div key={index} className="flex items-center space-x-2 bg-white/5 rounded-lg px-3 py-2">
                          <span className="flex-1 text-white">✨ {feature}</span>
                          <button
                            type="button"
                            onClick={() => removeFeature(index)}
                            className="text-red-400 hover:text-red-300 p-1"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {formData.features.length === 0 && (
                    <div className="text-gray-400 text-sm italic">
                      No features added yet. Add key features and highlights of your project.
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-white font-medium mb-2">Project Image</label>
                <div className="space-y-4">
                  {/* Current Image Display (Edit Mode Only - when project has existing image) */}
                  {isEditing && selectedProject && selectedProject.image && !selectedFile && (
                    <div className="bg-white/5 rounded-lg border border-white/10 p-4">
                      <div className="flex items-center justify-between mb-2">
                        <label className="block text-sm text-gray-400">Current Image</label>
                        <span className="text-xs text-green-400 bg-green-500/20 px-2 py-1 rounded">Active</span>
                      </div>
                      <div className="relative w-full h-32 bg-white/5 rounded-lg overflow-hidden border border-white/10 mb-2">
                        <Image
                          src={selectedProject.image}
                          alt="Current project image"
                          fill
                          className="object-cover"
                          onError={() => {
                            toast.error('Failed to load current image')
                          }}
                        />
                      </div>
                      <p className="text-xs text-gray-400 truncate">{selectedProject.image}</p>
                    </div>
                  )}

                  {/* URL Input */}
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">
                      {isEditing && selectedProject?.image ? 'New Image URL (optional)' : 'Image URL'}
                    </label>
                    <input
                      type="url"
                      value={selectedFile ? '' : formData.image}
                      onChange={(e) => {
                        if (!selectedFile) {
                          setFormData(prev => ({ ...prev, image: e.target.value }))
                          setImageChanged(true)
                        }
                      }}
                      disabled={!!selectedFile}
                      className={`w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500 ${
                        selectedFile ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                      placeholder={
                        isEditing && selectedProject?.image 
                          ? 'Enter new image URL to replace current image' 
                          : 'https://example.com/image.jpg'
                      }
                    />
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="flex-1 border-t border-white/10"></div>
                    <span className="text-gray-400 text-sm">OR</span>
                    <div className="flex-1 border-t border-white/10"></div>
                  </div>

                  {/* File Upload */}
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">
                      {isEditing && selectedProject?.image ? 'Upload New Image (optional)' : 'Upload Image'}
                    </label>
                    <div className="flex items-center space-x-4">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageFileChange}
                        className="hidden"
                        id="project-image-upload"
                      />
                      <label
                        htmlFor="project-image-upload"
                        className="cursor-pointer bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 px-4 py-2 rounded-lg transition-colors flex items-center space-x-2 border border-blue-500/30"
                      >
                        <Plus className="w-4 h-4" />
                        <span>{isEditing && selectedProject?.image ? 'Replace with File' : 'Choose File'}</span>
                      </label>
                      {selectedFile && (
                        <button
                          type="button"
                          onClick={() => clearImageFile()}
                          className="text-red-400 hover:text-red-300 px-2 py-1 rounded transition-colors"
                        >
                          Clear
                        </button>
                      )}
                    </div>
                    {isEditing && selectedProject?.image && (
                      <p className="text-xs text-gray-500 mt-1">
                        Select a file to replace the current image
                      </p>
                    )}
                  </div>

                  {/* Preview - Only show when there's a new/changed image */}
                  {(formData.image || previewUrl) && (selectedFile || (!isEditing || formData.image !== selectedProject?.image)) && (
                    <div className="mt-4">
                      <div className="flex items-center justify-between mb-2">
                        <label className="block text-sm text-gray-400">
                          {selectedFile ? 'New Image Preview' : isEditing ? 'Updated Image Preview' : 'Image Preview'}
                        </label>
                        {(selectedFile || (isEditing && formData.image !== selectedProject?.image)) && (
                          <span className="text-xs text-orange-400 bg-orange-500/20 px-2 py-1 rounded">
                            {selectedFile ? 'File Selected' : 'URL Changed'}
                          </span>
                        )}
                      </div>
                      <div className="relative w-full h-40 bg-white/5 rounded-lg overflow-hidden border border-white/10">
                        <Image
                          src={previewUrl || formData.image}
                          alt="Project preview"
                          fill
                          className="object-cover"
                          onError={() => {
                            toast.error('Failed to load image')
                          }}
                        />
                      </div>
                      {isEditing && (
                        <p className="text-xs text-orange-400 mt-1">
                          This {selectedFile ? 'file' : 'URL'} will replace the current image when saved
                        </p>
                      )}
                    </div>
                  )}

                  {/* File Info */}
                  {selectedFile && (
                    <div className="flex items-center space-x-2 bg-green-500/10 border border-green-500/20 rounded-lg px-3 py-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-green-400 text-sm font-medium">{selectedFile.name}</p>
                        <p className="text-xs text-gray-400">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => clearImageFile()}
                        className="text-red-400 hover:text-red-300"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-white font-medium mb-2">Demo Link</label>
                <input
                  type="url"
                  value={formData.demoLink}
                  onChange={(e) => setFormData(prev => ({ ...prev, demoLink: e.target.value }))}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-white font-medium mb-2">GitHub Frontend</label>
                  <input
                    type="url"
                    value={formData.githubFrontend}
                    onChange={(e) => setFormData(prev => ({ ...prev, githubFrontend: e.target.value }))}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                    placeholder="https://github.com/user/frontend"
                  />
                </div>
                <div>
                  <label className="block text-white font-medium mb-2">GitHub Backend</label>
                  <input
                    type="url"
                    value={formData.githubBackend}
                    onChange={(e) => setFormData(prev => ({ ...prev, githubBackend: e.target.value }))}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                    placeholder="https://github.com/user/backend"
                  />
                </div>
                <div>
                  <label className="block text-white font-medium mb-2">GitHub Full Stack</label>
                  <input
                    type="url"
                    value={formData.githubFullStack}
                    onChange={(e) => setFormData(prev => ({ ...prev, githubFullStack: e.target.value }))}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                    placeholder="https://github.com/user/fullstack"
                  />
                </div>
              </div>

              <div>
                <label className="block text-white font-medium mb-2">Skills (Stacks)</label>
                <div className="relative">
                  <select
                    multiple
                    value={formData.stacks}
                    onChange={(e) => {
                      const selectedOptions = Array.from(e.target.selectedOptions, option => option.value)
                      setFormData(prev => ({ ...prev, stacks: selectedOptions }))
                    }}
                    className="w-full bg-gradient-to-r from-white/5 to-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/30 hover:border-white/30 transition-all duration-300 cursor-pointer shadow-lg backdrop-blur-sm min-h-[120px]"
                  >
                    {skills.map((skill) => (
                      <option 
                        key={skill._id} 
                        value={skill._id} 
                        className="bg-gray-900/95 text-white py-2 hover:bg-blue-500/20"
                      >
                        💡 {skill.skill} ({skill.level})
                      </option>
                    ))}
                  </select>
                </div>
                <p className="text-sm text-gray-400 mt-1">Hold Ctrl/Cmd to select multiple skills</p>
                
                {/* Selected Skills Preview */}
                {formData.stacks.length > 0 && (
                  <div className="mt-3">
                    <p className="text-sm text-gray-400 mb-2">Selected Skills:</p>
                    <div className="flex flex-wrap gap-2">
                      {formData.stacks.map((stackId) => {
                        const skill = skills.find(s => s._id === stackId)
                        return skill ? (
                          <span
                            key={stackId}
                            className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm flex items-center space-x-1"
                          >
                            <span>💡 {skill.skill}</span>
                            <button
                              type="button"
                              onClick={() => setFormData(prev => ({ 
                                ...prev, 
                                stacks: prev.stacks.filter(id => id !== stackId) 
                              }))}
                              className="text-blue-300 hover:text-red-400 ml-1"
                            >
                              ×
                            </button>
                          </span>
                        ) : null
                      })}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-end space-x-4 pt-6 border-t border-white/10">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-6 py-2 text-gray-400 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex items-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors"
                >
                  <Save className="w-4 h-4" />
                  <span>{isEditing ? 'Update' : 'Create'} Project</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Project Detail Modal */}
      {selectedProject && !showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-white/10">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">{selectedProject.title}</h2>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="text-gray-400 hover:text-white"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
            <div className="p-6">
              <Image
                src={selectedProject.image}
                alt={selectedProject.title}
                width={800}
                height={400}
                className="w-full h-64 object-cover rounded-lg mb-6"
              />
              <div className="space-y-4">
                <p className="text-gray-300">{selectedProject.description}</p>
                
                {/* Features Display */}
                {selectedProject.features && selectedProject.features.length > 0 && (
                  <div>
                    <h4 className="text-white font-semibold mb-2">Key Features</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {selectedProject.features.map((feature, index) => (
                        <div key={index} className="flex items-center space-x-2 bg-white/5 rounded-lg px-3 py-2">
                          <span className="text-green-400">✨</span>
                          <span className="text-gray-300">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                <div>
                  <h4 className="text-white font-semibold mb-2">Skills Used</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.stacks.map((skill) => (
                      <span
                        key={skill._id}
                        className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm"
                      >
                        {skill.skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-white font-semibold mb-2">Category</h4>
                  <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm">
                    {selectedProject.category}
                  </span>
                </div>

                <div className="flex items-center space-x-4 pt-4">
                  {selectedProject.demoLink && (
                    <a
                      href={selectedProject.demoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>Live Demo</span>
                    </a>
                  )}
                  <div className="flex items-center space-x-2">
                    {selectedProject.githubFrontend && (
                      <a
                        href={selectedProject.githubFrontend}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
                        title="Frontend Repository"
                      >
                        <Github className="w-4 h-4" />
                        <span>Frontend</span>
                      </a>
                    )}
                    {selectedProject.githubBackend && (
                      <a
                        href={selectedProject.githubBackend}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
                        title="Backend Repository"
                      >
                        <Github className="w-4 h-4" />
                        <span>Backend</span>
                      </a>
                    )}
                    {selectedProject.githubFullStack && (
                      <a
                        href={selectedProject.githubFullStack}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
                        title="Full Stack Repository"
                      >
                        <Github className="w-4 h-4" />
                        <span>Full Stack</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}