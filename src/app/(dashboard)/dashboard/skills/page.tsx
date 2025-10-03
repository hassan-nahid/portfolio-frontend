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
import { skillsApi, SkillData, SkillCategoryData } from '@/lib/api'
import { toast } from 'sonner'

// Using API types
type SkillCategory = SkillCategoryData
type Skill = SkillData

interface CategoryFormData {
  title: string  // Backend uses 'title'
}

interface SkillFormData {
  skill: string  // Backend uses 'skill'
  logo: string
  category: string  // ObjectId as string
  level: 'Beginner' | 'Intermediate' | 'Experienced' | 'Expert' | 'Good' | 'Strong' | 'Excellent'  // Backend enum
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
    skill: '',
    logo: '',
    category: '',
    level: 'Beginner'
  })

  const [categoryFormData, setCategoryFormData] = useState<CategoryFormData>({
    title: ''
  })
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string>('')
  const [logoChanged, setLogoChanged] = useState(false)

  const handleLogoFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      
      // Store the actual file and create preview URL
      const preview = URL.createObjectURL(file)
      setSelectedFile(file)
      setPreviewUrl(preview)
      setSkillFormData(prev => ({ ...prev, logo: preview }))
      setLogoChanged(true)
    }
  }

  const clearImageFile = (markAsChanged = true) => {
    if (previewUrl && previewUrl.startsWith('blob:')) {
      URL.revokeObjectURL(previewUrl)
    }
    setSelectedFile(null)
    setPreviewUrl('')
    setSkillFormData(prev => ({ ...prev, logo: '' }))
    if (markAsChanged) {
      setLogoChanged(true)
    }
  }

  useEffect(() => {
    fetchSkills()
    fetchCategories()
  }, [])

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
    } finally {
      setIsLoading(false)
    }
  }

  const fetchCategories = async () => {
    try {
      const response = await skillsApi.getCategories()
      if (response.success && response.data) {
        setCategories(response.data)
      } else {
        toast.error('Failed to fetch categories')
      }
    } catch (error) {
      console.error('Failed to fetch categories:', error)
      toast.error('Failed to fetch categories')
    }
  }

  const handleDeleteSkill = async (id: string) => {
    if (confirm('Are you sure you want to delete this skill?')) {
      try {
        const response = await skillsApi.delete(id)
        if (response.success) {
          setSkills(skills.filter(skill => skill._id !== id))
          toast.success('Skill deleted successfully')
        } else {
          toast.error('Failed to delete skill')
        }
      } catch (error) {
        console.error('Failed to delete skill:', error)
        toast.error('Failed to delete skill')
      }
    }
  }

  const handleDeleteCategory = async (id: string) => {
    if (confirm('Are you sure you want to delete this category? This will also delete all skills in this category.')) {
      try {
        const response = await skillsApi.deleteCategory(id)
        if (response.success) {
          setCategories(categories.filter(category => category._id !== id))
          // Refresh skills to remove those that belonged to deleted category
          fetchSkills()
          toast.success('Category deleted successfully')
        } else {
          toast.error('Failed to delete category')
        }
      } catch (error) {
        console.error('Failed to delete category:', error)
        toast.error('Failed to delete category')
      }
    }
  }

  const handleSkillSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (isEditing && selectedItem) {
        // Update skill
        let response
        if (selectedFile) {
          // Handle file upload
          const formDataWithFile = new FormData()
          formDataWithFile.append('logo', selectedFile)
          formDataWithFile.append('skill', skillFormData.skill)
          formDataWithFile.append('category', skillFormData.category)
          formDataWithFile.append('level', skillFormData.level)
          
          response = await skillsApi.updateWithFile(selectedItem._id, formDataWithFile)
        } else {
          // Handle URL update - only include logo if it has changed
          const updatePayload: Partial<SkillFormData> = {
            skill: skillFormData.skill,
            category: skillFormData.category,
            level: skillFormData.level
          }
          
          // Only include logo if it has been changed by the user
          if (logoChanged && skillFormData.logo && skillFormData.logo.trim() !== '') {
            updatePayload.logo = skillFormData.logo
          }
          
          response = await skillsApi.update(selectedItem._id, updatePayload)
        }
        
        if (response.success && response.data) {
          setSkills(skills.map(skill => skill._id === selectedItem._id ? response.data! : skill))
          toast.success('Skill updated successfully')
        } else {
          toast.error('Failed to update skill')
        }
      } else {
        // Create new skill
        let response
        if (selectedFile) {
          // Handle file upload
          const formDataWithFile = new FormData()
          formDataWithFile.append('logo', selectedFile)
          formDataWithFile.append('skill', skillFormData.skill)
          formDataWithFile.append('category', skillFormData.category)
          formDataWithFile.append('level', skillFormData.level)
          
          response = await skillsApi.createWithFile(formDataWithFile)
        } else {
          // Handle URL creation
          response = await skillsApi.create({
            skill: skillFormData.skill,
            logo: skillFormData.logo,
            category: skillFormData.category,
            level: skillFormData.level
          })
        }
        
        if (response.success && response.data) {
          setSkills([response.data, ...skills])
          toast.success('Skill created successfully')
        } else {
          toast.error('Failed to create skill')
        }
      }
      resetForm()
    } catch (error) {
      console.error('Failed to save skill:', error)
      toast.error('Failed to save skill')
    }
  }

  const handleCategorySubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (isEditing && selectedItem) {
        // Update category
        const response = await skillsApi.updateCategory(selectedItem._id, {
          title: categoryFormData.title
        })
        if (response.success && response.data) {
          setCategories(categories.map(category => category._id === selectedItem._id ? response.data! : category))
          // Refresh skills to get updated category data
          fetchSkills()
          toast.success('Category updated successfully')
        } else {
          toast.error('Failed to update category')
        }
      } else {
        // Create new category
        const response = await skillsApi.createCategory({
          title: categoryFormData.title
        })
        if (response.success && response.data) {
          setCategories([response.data, ...categories])
          toast.success('Category created successfully')
        } else {
          toast.error('Failed to create category')
        }
      }
      resetForm()
    } catch (error) {
      console.error('Failed to save category:', error)
      toast.error('Failed to save category')
    }
  }

  const resetForm = () => {
    setSkillFormData({
      skill: '',
      logo: '',
      category: '',
      level: 'Beginner'
    })
    setCategoryFormData({
      title: ''
    })
    clearImageFile(false)
    setLogoChanged(false)
    setShowModal(false)
    setIsEditing(false)
    setSelectedItem(null)
  }

  const openSkillModal = (skill?: Skill) => {
    if (skill) {
      setSelectedItem(skill)
      setSkillFormData({
        skill: skill.skill,
        logo: skill.logo,
        category: skill.category._id,
        level: skill.level
      })
      // Clear any file state when editing existing skill
      clearImageFile(false)
      setLogoChanged(false)
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
        title: category.title
      })
      setIsEditing(true)
    } else {
      resetForm()
    }
    setModalType('category')
    setShowModal(true)
  }

  const filteredSkills = skills.filter(skill => {
    const matchesSearch = skill.skill.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || skill.category._id === selectedCategory
    return matchesSearch && matchesCategory
  })

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Expert':
      case 'Excellent':
        return 'bg-purple-500/20 text-purple-400'
      case 'Experienced':
      case 'Strong':
        return 'bg-green-500/20 text-green-400'
      case 'Intermediate':
      case 'Good':
        return 'bg-yellow-500/20 text-yellow-400'
      case 'Beginner':
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
              alt={skill.skill}
              width={32}
              height={32}
              className="w-8 h-8"
            />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">{skill.skill}</h3>
            <span className="text-sm text-gray-400">{skill.category.title}</span>
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

      <div className="flex items-center justify-between">
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(skill.level)}`}>
          {skill.level}
        </span>
      </div>
    </div>
  )

  const CategoryCard = ({ category }: { category: SkillCategory }) => (
    <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center">
            <Folder className="w-6 h-6 text-gray-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">{category.title}</h3>
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
            <div className="relative">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full bg-gradient-to-r from-white/5 to-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/30 hover:border-white/30 transition-all duration-300 appearance-none cursor-pointer shadow-lg backdrop-blur-sm pr-10"
              >
                <option value="all" className="bg-gray-900/95 text-white py-2">🎯 All Categories</option>
                {categories.map((category) => (
                  <option key={category._id} value={category._id} className="bg-gray-900/95 text-white py-2">📁 {category.title}</option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
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
                    value={skillFormData.skill}
                    onChange={(e) => setSkillFormData(prev => ({ ...prev, skill: e.target.value }))}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-white font-medium mb-2">Category</label>
                  <div className="relative">
                    <select
                      value={skillFormData.category}
                      onChange={(e) => setSkillFormData(prev => ({ ...prev, category: e.target.value }))}
                      className="w-full bg-gradient-to-r from-white/5 to-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/30 hover:border-white/30 transition-all duration-300 appearance-none cursor-pointer shadow-lg backdrop-blur-sm pr-10"
                      required
                    >
                      <option value="" className="bg-gray-900/95 text-white">📎 Select Category</option>
                      {categories.map((category) => (
                        <option key={category._id} value={category._id} className="bg-gray-900/95 text-white">📁 {category.title}</option>
                      ))}
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
                <label className="block text-white font-medium mb-2">Logo</label>
                <div className="space-y-4">
                  {/* URL Input */}
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Logo URL</label>
                    <input
                      type="url"
                      value={skillFormData.logo}
                      onChange={(e) => {
                        setSkillFormData(prev => ({ ...prev, logo: e.target.value }))
                        setLogoChanged(true)
                      }}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                      placeholder={
                        isEditing 
                          ? "Enter new logo URL or leave empty to keep current logo" 
                          : "https://example.com/logo.svg"
                      }
                    />
                  </div>
                  
                  {/* OR Divider */}
                  <div className="flex items-center space-x-4">
                    <div className="flex-1 h-px bg-white/10"></div>
                    <span className="text-sm text-gray-400">OR</span>
                    <div className="flex-1 h-px bg-white/10"></div>
                  </div>
                  
                  {/* File Upload */}
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Upload Logo</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleLogoFileChange}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:bg-blue-500 file:text-white hover:file:bg-blue-600"
                    />
                  </div>
                  
                  {/* Show current logo when editing */}
                  {isEditing && selectedItem && 'logo' in selectedItem && selectedItem.logo && (
                    <div className="p-3 bg-white/5 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-sm text-gray-400">Current Logo:</p>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center">
                          <Image
                            src={selectedItem.logo}
                            alt="Current logo"
                            width={32}
                            height={32}
                            className="w-8 h-8 object-contain"
                          />
                        </div>
                        <div>
                          <p className="text-sm text-white">Current Logo</p>
                          <p className="text-xs text-gray-500 mt-1">
                            Leave empty to keep current logo
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Preview - only show if there's a new logo different from current */}
                  {skillFormData.logo && (!isEditing || !selectedItem || !('logo' in selectedItem) || skillFormData.logo !== selectedItem.logo) && (
                    <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg">
                      <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center">
                        <Image
                          src={skillFormData.logo}
                          alt="Logo preview"
                          width={32}
                          height={32}
                          className="w-8 h-8 object-contain"
                        />
                      </div>
                      <div>
                        <p className="text-sm text-white">
                          {selectedFile ? 'New Logo Preview' : 'Logo Preview'}
                        </p>
                        <p className="text-xs text-gray-400 truncate max-w-xs">{skillFormData.logo}</p>
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
                <label className="block text-white font-medium mb-2">Skill Level</label>
                <div className="relative">
                  <select
                    value={skillFormData.level}
                    onChange={(e) => setSkillFormData(prev => ({ ...prev, level: e.target.value as 'Beginner' | 'Intermediate' | 'Experienced' | 'Expert' | 'Good' | 'Strong' | 'Excellent' }))}
                    className="w-full bg-gradient-to-r from-white/5 to-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-400/30 hover:border-white/30 transition-all duration-300 appearance-none cursor-pointer shadow-lg backdrop-blur-sm pr-10"
                    required
                  >
                    <option value="Beginner" className="bg-gray-900/95 text-white">🌱 Beginner</option>
                    <option value="Intermediate" className="bg-gray-900/95 text-white">🌿 Intermediate</option>
                    <option value="Experienced" className="bg-gray-900/95 text-white">🌳 Experienced</option>
                    <option value="Expert" className="bg-gray-900/95 text-white">🎆 Expert</option>
                    <option value="Good" className="bg-gray-900/95 text-white">🙌 Good</option>
                    <option value="Strong" className="bg-gray-900/95 text-white">💪 Strong</option>
                    <option value="Excellent" className="bg-gray-900/95 text-white">🏆 Excellent</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
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
                  value={categoryFormData.title}
                  onChange={(e) => setCategoryFormData(prev => ({ ...prev, title: e.target.value }))}
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