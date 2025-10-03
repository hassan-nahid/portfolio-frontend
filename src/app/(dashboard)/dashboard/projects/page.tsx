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

// Backend Category enum
enum ProjectCategory {
  WEB = "WEB",
  MOBILE = "MOBILE",
  DESKTOP = "DESKTOP"
}

interface Skill {
  _id: string
  skill: string
  level: string
  logo: string
  category: string
}

interface Project {
  _id: string
  title: string
  image: string
  category: ProjectCategory
  description: string
  demoLink?: string
  githubFrontend?: string
  githubBackend?: string
  githubFullStack?: string
  stacks: string[]  // Array of ObjectIds as strings
  createdAt: string
  updatedAt: string
}

interface ProjectFormData {
  title: string
  image: string
  category: ProjectCategory
  description: string
  demoLink: string
  githubFrontend: string
  githubBackend: string
  githubFullStack: string
  stacks: string[]  // Array of skill ObjectIds
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [skills, setSkills] = useState<Skill[]>([])
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
    demoLink: '',
    githubFrontend: '',
    githubBackend: '',
    githubFullStack: '',
    stacks: []
  })

  useEffect(() => {
    fetchProjects()
    fetchSkills()
  }, [])

  const fetchProjects = async () => {
    try {
      // Mock data - replace with actual API call to /api/v1/project
      const mockProjects: Project[] = [
        {
          _id: '1',
          title: 'E-commerce Platform',
          image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=400&fit=crop',
          category: ProjectCategory.WEB,
          description: 'A full-stack e-commerce platform with modern UI/UX, payment integration, and admin dashboard.',
          demoLink: 'https://demo.example.com',
          githubFrontend: 'https://github.com/user/ecommerce-frontend',
          githubBackend: 'https://github.com/user/ecommerce-backend',
          githubFullStack: 'https://github.com/user/ecommerce',
          stacks: ['t1', 't2', 't3'], // ObjectIds of skills
          createdAt: '2024-01-15T10:30:00Z',
          updatedAt: '2024-01-16T14:22:00Z'
        },
        {
          _id: '2',
          title: 'Task Management App',
          image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=400&fit=crop',
          category: ProjectCategory.WEB,
          description: 'A collaborative task management application with real-time updates and team collaboration features.',
          githubFullStack: 'https://github.com/user/task-manager',
          stacks: ['t4', 't5', 't6'], // ObjectIds of skills
          createdAt: '2024-01-10T09:15:00Z',
          updatedAt: '2024-01-10T09:15:00Z'
        }
      ]
      setProjects(mockProjects)
    } catch (error) {
      console.error('Failed to fetch projects:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const fetchSkills = async () => {
    try {
      // Mock data - replace with actual API call to /api/v1/skill
      const mockSkills: Skill[] = [
        { _id: 't1', skill: 'React', logo: '/tech/react.svg', level: 'Expert', category: 'Frontend' },
        { _id: 't2', skill: 'Node.js', logo: '/tech/nodejs.svg', level: 'Advanced', category: 'Backend' },
        { _id: 't3', skill: 'MongoDB', logo: '/tech/mongodb.svg', level: 'Intermediate', category: 'Database' },
        { _id: 't4', skill: 'Next.js', logo: '/tech/nextjs.svg', level: 'Advanced', category: 'Frontend' },
        { _id: 't5', skill: 'TypeScript', logo: '/tech/typescript.svg', level: 'Advanced', category: 'Language' },
        { _id: 't6', skill: 'PostgreSQL', logo: '/tech/postgresql.svg', level: 'Intermediate', category: 'Database' }
      ]
      setSkills(mockSkills)
    } catch (error) {
      console.error('Failed to fetch skills:', error)
    }
  }

  const handleDeleteProject = async (id: string) => {
    if (confirm('Are you sure you want to delete this project?')) {
      try {
        // API call to DELETE /api/v1/project/:id
        setProjects(projects.filter(project => project._id !== id))
      } catch (error) {
        console.error('Failed to delete project:', error)
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (isEditing && selectedProject) {
        // API call to PUT /api/v1/project/:id
        const updatedProject: Project = {
          ...selectedProject,
          ...formData,
          updatedAt: new Date().toISOString()
        }
        setProjects(projects.map(p => p._id === selectedProject._id ? updatedProject : p))
      } else {
        // API call to POST /api/v1/project
        const newProject: Project = {
          _id: Date.now().toString(),
          ...formData,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
        setProjects([newProject, ...projects])
      }
      resetForm()
    } catch (error) {
      console.error('Failed to save project:', error)
    }
  }

  const resetForm = () => {
    setFormData({
      title: '',
      image: '',
      category: ProjectCategory.WEB,
      description: '',
      demoLink: '',
      githubFrontend: '',
      githubBackend: '',
      githubFullStack: '',
      stacks: []
    })
    setShowModal(false)
    setIsEditing(false)
    setSelectedProject(null)
  }

  const openEditModal = (project: Project) => {
    setSelectedProject(project)
    setFormData({
      title: project.title,
      image: project.image,
      category: project.category,
      description: project.description,
      demoLink: project.demoLink || '',
      githubFrontend: project.githubFrontend || '',
      githubBackend: project.githubBackend || '',
      githubFullStack: project.githubFullStack || '',
      stacks: project.stacks
    })
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

  const categories = ['Full Stack', 'Frontend', 'Backend', 'Mobile', 'Desktop']

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
        {skills.filter(s => project.stacks.includes(s._id)).slice(0, 4).map((skill) => (
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
          <span>{new Date(project.createdAt).toLocaleDateString()}</span>
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
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
        >
          <option value="all">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
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
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value as ProjectCategory }))}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                    required
                  >
                    <option value={ProjectCategory.WEB}>Web</option>
                    <option value={ProjectCategory.MOBILE}>Mobile</option>
                    <option value={ProjectCategory.DESKTOP}>Desktop</option>
                  </select>
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

              <div>
                <label className="block text-white font-medium mb-2">Image URL</label>
                <input
                  type="url"
                  value={formData.image}
                  onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                  required
                />
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
                <input
                  type="text"
                  value={formData.stacks.join(', ')}
                  onChange={(e) => setFormData(prev => ({ ...prev, stacks: e.target.value.split(', ').filter(s => s.trim()) }))}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                  placeholder="skill-id-1, skill-id-2, skill-id-3"
                />
                <p className="text-sm text-gray-400 mt-1">Enter skill IDs separated by commas</p>
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
                
                <div>
                  <h4 className="text-white font-semibold mb-2">Skills Used</h4>
                  <div className="flex flex-wrap gap-2">
                    {skills.filter(s => selectedProject.stacks.includes(s._id)).map((skill) => (
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