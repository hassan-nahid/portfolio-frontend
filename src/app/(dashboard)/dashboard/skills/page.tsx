'use client'

import { useState, useEffect } from 'react'
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  X,
  Save,
  Folder,
  Code
} from 'lucide-react'
import Image from 'next/image'

interface SkillCategory {
  _id: string
  name: string
  description: string
  icon: string
  createdAt: string
  updatedAt: string
}

interface Skill {
  _id: string
  name: string
  logo: string
  category: SkillCategory
  proficiency: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert'
  yearsOfExperience: number
  description: string
  createdAt: string
  updatedAt: string
}

interface CategoryFormData {
  name: string
  description: string
  icon: string
}

interface SkillFormData {
  name: string
  logo: string
  category: string
  proficiency: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert'
  yearsOfExperience: number
  description: string
}

export default function SkillsPage() {
  const [skills, setSkills] = useState<Skill[]>([])
  const [categories, setCategories] = useState<SkillCategory[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<'all' | string>('all')
  const [activeTab, setActiveTab] = useState<'skills' | 'categories'>('skills')
  const [showModal, setShowModal] = useState(false)
  const [modalType, setModalType] = useState<'skill' | 'category'>('skill')
  const [isEditing, setIsEditing] = useState(false)
  const [selectedItem, setSelectedItem] = useState<Skill | SkillCategory | null>(null)
  
  const [skillFormData, setSkillFormData] = useState<SkillFormData>({
    name: '',
    logo: '',
    category: '',
    proficiency: 'Beginner',
    yearsOfExperience: 0,
    description: ''
  })

  const [categoryFormData, setCategoryFormData] = useState<CategoryFormData>({
    name: '',
    description: '',
    icon: ''
  })

  useEffect(() => {
    fetchSkills()
    fetchCategories()
  }, [])

  const fetchSkills = async () => {
    try {
      // Mock data - replace with actual API call to /api/v1/skill
      const mockSkills: Skill[] = [
        {
          _id: '1',
          name: 'React',
          logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
          category: {
            _id: 'cat1',
            name: 'Frontend',
            description: 'Frontend Development Technologies',
            icon: '🎨',
            createdAt: '2024-01-01T00:00:00Z',
            updatedAt: '2024-01-01T00:00:00Z'
          },
          proficiency: 'Expert',
          yearsOfExperience: 5,
          description: 'Building modern, interactive user interfaces with React',
          createdAt: '2024-01-15T10:30:00Z',
          updatedAt: '2024-01-16T14:22:00Z'
        },
        {
          _id: '2',
          name: 'Node.js',
          logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
          category: {
            _id: 'cat2',
            name: 'Backend',
            description: 'Backend Development Technologies',
            icon: '⚙️',
            createdAt: '2024-01-01T00:00:00Z',
            updatedAt: '2024-01-01T00:00:00Z'
          },
          proficiency: 'Advanced',
          yearsOfExperience: 4,
          description: 'Server-side JavaScript runtime for building scalable applications',
          createdAt: '2024-01-10T09:15:00Z',
          updatedAt: '2024-01-10T09:15:00Z'
        },
        {
          _id: '3',
          name: 'MongoDB',
          logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
          category: {
            _id: 'cat3',
            name: 'Database',
            description: 'Database Technologies',
            icon: '🗄️',
            createdAt: '2024-01-01T00:00:00Z',
            updatedAt: '2024-01-01T00:00:00Z'
          },
          proficiency: 'Intermediate',
          yearsOfExperience: 3,
          description: 'NoSQL database for modern applications',
          createdAt: '2024-01-05T15:45:00Z',
          updatedAt: '2024-01-05T15:45:00Z'
        }
      ]
      setSkills(mockSkills)
    } catch (error) {
      console.error('Failed to fetch skills:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const fetchCategories = async () => {
    try {
      // Mock data - replace with actual API call to /api/v1/skill/category
      const mockCategories: SkillCategory[] = [
        {
          _id: 'cat1',
          name: 'Frontend',
          description: 'Frontend Development Technologies',
          icon: '🎨',
          createdAt: '2024-01-01T00:00:00Z',
          updatedAt: '2024-01-01T00:00:00Z'
        },
        {
          _id: 'cat2',
          name: 'Backend',
          description: 'Backend Development Technologies',
          icon: '⚙️',
          createdAt: '2024-01-01T00:00:00Z',
          updatedAt: '2024-01-01T00:00:00Z'
        },
        {
          _id: 'cat3',
          name: 'Database',
          description: 'Database Technologies',
          icon: '🗄️',
          createdAt: '2024-01-01T00:00:00Z',
          updatedAt: '2024-01-01T00:00:00Z'
        }
      ]
      setCategories(mockCategories)
    } catch (error) {
      console.error('Failed to fetch categories:', error)
    }
  }

  const handleDeleteSkill = async (id: string) => {
    if (confirm('Are you sure you want to delete this skill?')) {
      try {
        // API call to DELETE /api/v1/skill/:id
        setSkills(skills.filter(skill => skill._id !== id))
      } catch (error) {
        console.error('Failed to delete skill:', error)
      }
    }
  }

  const handleDeleteCategory = async (id: string) => {
    if (confirm('Are you sure you want to delete this category? This will also delete all skills in this category.')) {
      try {
        // API call to DELETE /api/v1/skill/category/:id
        setCategories(categories.filter(category => category._id !== id))
        setSkills(skills.filter(skill => skill.category._id !== id))
      } catch (error) {
        console.error('Failed to delete category:', error)
      }
    }
  }

  const handleSkillSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (isEditing && selectedItem) {
        // API call to PUT /api/v1/skill/:id
        const updatedSkill: Skill = {
          ...(selectedItem as Skill),
          ...skillFormData,
          category: categories.find(c => c._id === skillFormData.category)!,
          updatedAt: new Date().toISOString()
        }
        setSkills(skills.map(s => s._id === selectedItem._id ? updatedSkill : s))
      } else {
        // API call to POST /api/v1/skill
        const newSkill: Skill = {
          _id: Date.now().toString(),
          ...skillFormData,
          category: categories.find(c => c._id === skillFormData.category)!,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
        setSkills([newSkill, ...skills])
      }
      resetForm()
    } catch (error) {
      console.error('Failed to save skill:', error)
    }
  }

  const handleCategorySubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (isEditing && selectedItem) {
        // API call to PUT /api/v1/skill/category/:id
        const updatedCategory: SkillCategory = {
          ...(selectedItem as SkillCategory),
          ...categoryFormData,
          updatedAt: new Date().toISOString()
        }
        setCategories(categories.map(c => c._id === selectedItem._id ? updatedCategory : c))
        // Update skills that use this category
        setSkills(skills.map(s => 
          s.category._id === selectedItem._id 
            ? { ...s, category: updatedCategory }
            : s
        ))
      } else {
        // API call to POST /api/v1/skill/category
        const newCategory: SkillCategory = {
          _id: Date.now().toString(),
          ...categoryFormData,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
        setCategories([newCategory, ...categories])
      }
      resetForm()
    } catch (error) {
      console.error('Failed to save category:', error)
    }
  }

  const resetForm = () => {
    setSkillFormData({
      name: '',
      logo: '',
      category: '',
      proficiency: 'Beginner',
      yearsOfExperience: 0,
      description: ''
    })
    setCategoryFormData({
      name: '',
      description: '',
      icon: ''
    })
    setShowModal(false)
    setIsEditing(false)
    setSelectedItem(null)
  }

  const openSkillModal = (skill?: Skill) => {
    if (skill) {
      setSelectedItem(skill)
      setSkillFormData({
        name: skill.name,
        logo: skill.logo,
        category: skill.category._id,
        proficiency: skill.proficiency,
        yearsOfExperience: skill.yearsOfExperience,
        description: skill.description
      })
      setIsEditing(true)
    } else {
      resetForm()
    }
    setModalType('skill')
    setShowModal(true)
  }

  const openCategoryModal = (category?: SkillCategory) => {
    if (category) {
      setSelectedItem(category)
      setCategoryFormData({
        name: category.name,
        description: category.description,
        icon: category.icon
      })
      setIsEditing(true)
    } else {
      resetForm()
    }
    setModalType('category')
    setShowModal(true)
  }

  const filteredSkills = skills.filter(skill => {
    const matchesSearch = skill.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         skill.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || skill.category._id === selectedCategory
    return matchesSearch && matchesCategory
  })

  const getProficiencyColor = (proficiency: string) => {
    switch (proficiency) {
      case 'Expert':
        return 'bg-purple-500/20 text-purple-400'
      case 'Advanced':
        return 'bg-green-500/20 text-green-400'
      case 'Intermediate':
        return 'bg-yellow-500/20 text-yellow-400'
      default:
        return 'bg-blue-500/20 text-blue-400'
    }
  }

  const SkillCard = ({ skill }: { skill: Skill }) => (
    <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center">
            <Image
              src={skill.logo}
              alt={skill.name}
              width={32}
              height={32}
              className="w-8 h-8"
            />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">{skill.name}</h3>
            <span className="text-sm text-gray-400">{skill.category.name}</span>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => openSkillModal(skill)}
            className="p-2 text-green-400 hover:bg-green-500/20 rounded-lg transition-colors"
            title="Edit"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleDeleteSkill(skill._id)}
            className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors"
            title="Delete"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <p className="text-gray-300 text-sm mb-4 line-clamp-2">{skill.description}</p>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getProficiencyColor(skill.proficiency)}`}>
            {skill.proficiency}
          </span>
          <span className="text-xs text-gray-400">
            {skill.yearsOfExperience} years
          </span>
        </div>
      </div>
    </div>
  )

  const CategoryCard = ({ category }: { category: SkillCategory }) => (
    <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center text-2xl">
            {category.icon}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">{category.name}</h3>
            <span className="text-sm text-gray-400">
              {skills.filter(s => s.category._id === category._id).length} skills
            </span>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => openCategoryModal(category)}
            className="p-2 text-green-400 hover:bg-green-500/20 rounded-lg transition-colors"
            title="Edit"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleDeleteCategory(category._id)}
            className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors"
            title="Delete"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <p className="text-gray-300 text-sm">{category.description}</p>
    </div>
  )

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-white/5 rounded w-48"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white/5 rounded-xl p-6 h-40"></div>
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
          <h1 className="text-3xl font-bold text-white">Skills Management</h1>
          <p className="text-gray-400 mt-2">Manage your skills and skill categories</p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => openCategoryModal()}
            className="flex items-center space-x-2 bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <Folder className="w-5 h-5" />
            <span>New Category</span>
          </button>
          <button
            onClick={() => openSkillModal()}
            className="flex items-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <Plus className="w-5 h-5" />
            <span>New Skill</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center space-x-1 bg-white/5 p-1 rounded-lg w-fit">
        <button
          onClick={() => setActiveTab('skills')}
          className={`px-4 py-2 rounded-md transition-colors ${
            activeTab === 'skills'
              ? 'bg-blue-500 text-white'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          Skills ({skills.length})
        </button>
        <button
          onClick={() => setActiveTab('categories')}
          className={`px-4 py-2 rounded-md transition-colors ${
            activeTab === 'categories'
              ? 'bg-blue-500 text-white'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          Categories ({categories.length})
        </button>
      </div>

      {activeTab === 'skills' && (
        <>
          {/* Filters */}
          <div className="flex items-center space-x-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search skills..."
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
                <option key={category._id} value={category._id}>{category.name}</option>
              ))}
            </select>
          </div>

          {/* Skills Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSkills.map((skill) => (
              <SkillCard key={skill._id} skill={skill} />
            ))}
          </div>

          {filteredSkills.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                <Code className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">No skills found</h3>
              <p className="text-gray-400">Try adjusting your search or filters</p>
            </div>
          )}
        </>
      )}

      {activeTab === 'categories' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <CategoryCard key={category._id} category={category} />
          ))}
        </div>
      )}

      {/* Skill Form Modal */}
      {showModal && modalType === 'skill' && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-white/10">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">
                  {isEditing ? 'Edit Skill' : 'Create New Skill'}
                </h2>
                <button
                  onClick={resetForm}
                  className="text-gray-400 hover:text-white"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
            <form onSubmit={handleSkillSubmit} className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white font-medium mb-2">Skill Name</label>
                  <input
                    type="text"
                    value={skillFormData.name}
                    onChange={(e) => setSkillFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-white font-medium mb-2">Category</label>
                  <select
                    value={skillFormData.category}
                    onChange={(e) => setSkillFormData(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                    required
                  >
                    <option value="">Select Category</option>
                    {categories.map((category) => (
                      <option key={category._id} value={category._id}>{category.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-white font-medium mb-2">Logo URL</label>
                <input
                  type="url"
                  value={skillFormData.logo}
                  onChange={(e) => setSkillFormData(prev => ({ ...prev, logo: e.target.value }))}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white font-medium mb-2">Proficiency Level</label>
                  <select
                    value={skillFormData.proficiency}
                    onChange={(e) => setSkillFormData(prev => ({ ...prev, proficiency: e.target.value as 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert' }))}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                    <option value="Expert">Expert</option>
                  </select>
                </div>
                <div>
                  <label className="block text-white font-medium mb-2">Years of Experience</label>
                  <input
                    type="number"
                    min="0"
                    max="50"
                    value={skillFormData.yearsOfExperience}
                    onChange={(e) => setSkillFormData(prev => ({ ...prev, yearsOfExperience: parseInt(e.target.value) || 0 }))}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-white font-medium mb-2">Description</label>
                <textarea
                  value={skillFormData.description}
                  onChange={(e) => setSkillFormData(prev => ({ ...prev, description: e.target.value }))}
                  rows={3}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                />
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
                  <span>{isEditing ? 'Update' : 'Create'} Skill</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Category Form Modal */}
      {showModal && modalType === 'category' && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 rounded-xl max-w-lg w-full">
            <div className="p-6 border-b border-white/10">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">
                  {isEditing ? 'Edit Category' : 'Create New Category'}
                </h2>
                <button
                  onClick={resetForm}
                  className="text-gray-400 hover:text-white"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
            <form onSubmit={handleCategorySubmit} className="p-6 space-y-6">
              <div>
                <label className="block text-white font-medium mb-2">Category Name</label>
                <input
                  type="text"
                  value={categoryFormData.name}
                  onChange={(e) => setCategoryFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-white font-medium mb-2">Icon (Emoji)</label>
                <input
                  type="text"
                  value={categoryFormData.icon}
                  onChange={(e) => setCategoryFormData(prev => ({ ...prev, icon: e.target.value }))}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                  placeholder="🎨"
                  required
                />
              </div>

              <div>
                <label className="block text-white font-medium mb-2">Description</label>
                <textarea
                  value={categoryFormData.description}
                  onChange={(e) => setCategoryFormData(prev => ({ ...prev, description: e.target.value }))}
                  rows={3}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                  required
                />
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
                  className="flex items-center space-x-2 bg-purple-500 hover:bg-purple-600 text-white px-6 py-2 rounded-lg transition-colors"
                >
                  <Save className="w-4 h-4" />
                  <span>{isEditing ? 'Update' : 'Create'} Category</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}