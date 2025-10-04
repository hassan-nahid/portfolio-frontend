'use client'

import { useState, useEffect } from 'react'
import { 
  Save, 
  Eye,
  User,
  Briefcase,
  FolderOpen,
  Upload,
  X
} from 'lucide-react'
import Image from 'next/image'
import { aboutApi, AboutData } from '@/lib/api'
import toast from 'react-hot-toast';

export default function AboutPage() {
  const [aboutData, setAboutData] = useState<AboutData>({
    name: '',
    about: '',
    bio: '',
    experience: 0,
    projects: 0,
    photo: ''
  })
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [previewMode, setPreviewMode] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string>('')
  const [uploadMethod, setUploadMethod] = useState<'url' | 'file'>('url')


  useEffect(() => {
    fetchAboutData()
  }, [])

  // Cleanup preview URL on unmount
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl)
      }
    }
  }, [previewUrl])

  const fetchAboutData = async () => {
    try {
      const response = await aboutApi.get()
      if (response.success && response.data) {
        setAboutData(response.data)
        setIsEditing(true) // Data exists, we're editing
      } else {
        setIsEditing(false) // No data exists, we're creating new
      }
    } catch (error) {
      console.error('Failed to fetch about data:', error)
      setIsEditing(false) // No data exists, we're creating new
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    
    const loadingToast = toast.loading(
      isEditing ? 'Updating about section...' : 'Creating about section...'
    )
    
    try {
      // If a file is selected, upload it first
      if (selectedFile) {
        const formData = new FormData()
        formData.append('photo', selectedFile)
        formData.append('name', aboutData.name)
        formData.append('about', aboutData.about)
        formData.append('bio', aboutData.bio)
        formData.append('experience', aboutData.experience.toString())
        formData.append('projects', aboutData.projects.toString())
        
        if (isEditing && aboutData._id) {
          // Update with file upload
          const response = await aboutApi.updateWithFile(aboutData._id, formData)
          if (response.success && response.data) {
            setAboutData(response.data)
            // Clean up preview URL
            if (previewUrl) {
              URL.revokeObjectURL(previewUrl)
              setPreviewUrl('')
            }
            setSelectedFile(null)
            toast.dismiss(loadingToast)
            toast.success('About section updated successfully!')
          }
        } else {
          // Create with file upload
          const response = await aboutApi.createWithFile(formData)
          if (response.success && response.data) {
            setAboutData(response.data)
            setIsEditing(true)
            // Clean up preview URL
            if (previewUrl) {
              URL.revokeObjectURL(previewUrl)
              setPreviewUrl('')
            }
            setSelectedFile(null)
            toast.dismiss(loadingToast)
            toast.success('About section created successfully!')
          }
        }
      } else {
        // Regular update without file upload
        const updateData = {
          name: aboutData.name,
          about: aboutData.about,
          bio: aboutData.bio,
          experience: aboutData.experience,
          projects: aboutData.projects,
          photo: aboutData.photo,
        }
        
        if (isEditing && aboutData._id) {
          const response = await aboutApi.update(aboutData._id, updateData)
          if (response.success && response.data) {
            setAboutData(response.data)
            toast.dismiss(loadingToast)
            toast.success('About section updated successfully!')
          }
        } else {
          const response = await aboutApi.create(updateData)
          if (response.success && response.data) {
            setAboutData(response.data)
            setIsEditing(true)
            toast.dismiss(loadingToast)
            toast.success('About section created successfully!')
          }
        }
      }
    } catch (error) {
      console.error('Failed to save about data:', error)
      const message = error instanceof Error ? error.message : 'Failed to save about section'
      toast.dismiss(loadingToast)
      toast.error(message)
    } finally {
      setIsSaving(false)
    }
  }

  const handleInputChange = (field: keyof AboutData, value: string | string[]) => {
    setAboutData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleNumberChange = (field: 'experience' | 'projects', value: string) => {
    const numValue = parseInt(value) || 0
    setAboutData(prev => ({
      ...prev,
      [field]: numValue
    }))
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      
      setSelectedFile(file)
      
      // Create preview URL
      const preview = URL.createObjectURL(file)
      setPreviewUrl(preview)
      
      // Update photo field with preview for immediate display
      setAboutData(prev => ({
        ...prev,
        photo: preview
      }))
      
      toast.success(`File "${file.name}" selected successfully!`)
    }
  }

  const clearFileSelection = () => {
    setSelectedFile(null)
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl)
      setPreviewUrl('')
    }
    // Reset to original photo or empty
    setAboutData(prev => ({
      ...prev,
      photo: uploadMethod === 'url' ? prev.photo : ''
    }))
    toast('File selection cleared')
  }

  const switchUploadMethod = (method: 'url' | 'file') => {
    setUploadMethod(method)
    if (method === 'url') {
      clearFileSelection()
    } else {
      // Clear URL input when switching to file upload
      setAboutData(prev => ({
        ...prev,
        photo: previewUrl || ''
      }))
    }
  }



  const PreviewCard = () => (
    <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10">
      <div className="text-center mb-8">
        {aboutData.photo && (
          <div className="relative w-32 h-32 mx-auto mb-6">
            <Image
              src={aboutData.photo}
              alt={aboutData.name}
              width={128}
              height={128}
              className="w-full h-full object-cover rounded-full border-4 border-blue-500/20"
            />
          </div>
        )}
        <h1 className="text-3xl font-bold text-white mb-2">{aboutData.name}</h1>
        <p className="text-xl text-blue-400 mb-4">{aboutData.about}</p>
        <p className="text-gray-300 leading-relaxed mb-6">{aboutData.bio}</p>

        {/* Statistics */}
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-white/5 rounded-lg p-4">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <Briefcase className="w-5 h-5 text-blue-400" />
              <span className="text-white font-medium">Experience</span>
            </div>
            <div className="text-2xl font-bold text-blue-400">{aboutData.experience}+ Years</div>
          </div>
          <div className="bg-white/5 rounded-lg p-4">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <FolderOpen className="w-5 h-5 text-purple-400" />
              <span className="text-white font-medium">Projects</span>
            </div>
            <div className="text-2xl font-bold text-purple-400">{aboutData.projects}+</div>
          </div>
        </div>
      </div>
    </div>
  )

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-white/5 rounded w-48"></div>
          <div className="bg-white/5 rounded-xl p-8 h-96"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">About Management</h1>
          <p className="text-gray-400 mt-2">
            {isEditing ? 'Update your about section' : 'Create your about section'}
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setPreviewMode(!previewMode)}
            className="flex items-center space-x-2 bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <Eye className="w-5 h-5" />
            <span>{previewMode ? 'Edit' : 'Preview'}</span>
          </button>
        </div>
      </div>

      {previewMode ? (
        <PreviewCard />
      ) : (
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
              <User className="w-5 h-5 mr-2" />
              Basic Information
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-white font-medium mb-2">Full Name</label>
                <input
                  type="text"
                  value={aboutData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-white font-medium mb-2">Photo</label>
                
                {/* Upload Method Toggle */}
                <div className="flex items-center space-x-4 mb-4">
                  <button
                    type="button"
                    onClick={() => switchUploadMethod('url')}
                    className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                      uploadMethod === 'url'
                        ? 'bg-blue-500 text-white'
                        : 'bg-white/10 text-gray-300 hover:bg-white/20'
                    }`}
                  >
                    URL
                  </button>
                  <button
                    type="button"
                    onClick={() => switchUploadMethod('file')}
                    className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                      uploadMethod === 'file'
                        ? 'bg-blue-500 text-white'
                        : 'bg-white/10 text-gray-300 hover:bg-white/20'
                    }`}
                  >
                    Upload File
                  </button>
                </div>

                {uploadMethod === 'url' ? (
                  <input
                    type="url"
                    value={selectedFile ? '' : aboutData.photo}
                    onChange={(e) => handleInputChange('photo', e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                    placeholder="https://example.com/photo.jpg"
                    disabled={!!selectedFile}
                    required
                  />
                ) : (
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <label className="cursor-pointer flex items-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors">
                        <Upload className="w-4 h-4" />
                        <span>Choose File</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleFileSelect}
                          className="hidden"
                        />
                      </label>
                      {selectedFile && (
                        <button
                          type="button"
                          onClick={clearFileSelection}
                          className="flex items-center space-x-1 text-red-400 hover:text-red-300 transition-colors"
                        >
                          <X className="w-4 h-4" />
                          <span>Clear</span>
                        </button>
                      )}
                    </div>
                    
                    {selectedFile && (
                      <div className="text-sm text-gray-300">
                        <p>Selected: {selectedFile.name}</p>
                        <p>Size: {(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                      </div>
                    )}
                  </div>
                )}
                
                {/* Photo Preview */}
                {aboutData.photo && (
                  <div className="mt-4">
                    <div className="relative w-24 h-24">
                      <Image
                        src={aboutData.photo}
                        alt="Photo preview"
                        width={96}
                        height={96}
                        className="w-full h-full object-cover rounded-lg border border-white/20"
                        onError={() => {
                          console.error('Failed to load image preview')
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-white font-medium mb-2">About</label>
              <input
                type="text"
                value={aboutData.about}
                onChange={(e) => handleInputChange('about', e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                placeholder="Professional title or short description"
                required
              />
            </div>

            <div className="mt-6">
              <label className="block text-white font-medium mb-2">Bio</label>
              <textarea
                value={aboutData.bio}
                onChange={(e) => handleInputChange('bio', e.target.value)}
                rows={4}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                placeholder="Detailed bio or description about yourself"
                required
              />
            </div>
          </div>

          {/* Professional Statistics */}
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
              <Briefcase className="w-5 h-5 mr-2" />
              Professional Statistics
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-white font-medium mb-2">Years of Experience</label>
                <input
                  type="number"
                  min="0"
                  max="50"
                  value={aboutData.experience}
                  onChange={(e) => handleNumberChange('experience', e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-white font-medium mb-2">Number of Projects</label>
                <input
                  type="number"
                  min="0"
                  max="10000"
                  value={aboutData.projects}
                  onChange={(e) => handleNumberChange('projects', e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
            </div>
          </div>



          {/* Submit Button */}
          <div className="flex items-center justify-end">
            <button
              type="submit"
              disabled={isSaving}
              className="flex items-center space-x-2 bg-green-500 hover:bg-green-600 disabled:bg-gray-500 text-white px-6 py-3 rounded-lg transition-colors"
            >
              {isSaving ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  <span>{isEditing ? 'Update' : 'Create'} About Section</span>
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  )
}