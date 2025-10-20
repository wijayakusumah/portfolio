'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Save, Plus, Trash2 } from 'lucide-react'
import DynamicImpactForm from '@/components/DynamicImpactForm'
import DynamicTechStackForm from '@/components/DynamicTechStackForm'
import FileUpload from '@/components/FileUpload'
import type { Company, Project } from "@/types"

export default function NewProjectPage() {
  const router = useRouter()
  const [companies, setCompanies] = useState<Company[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  
  const [project, setProject] = useState<Partial<Project>>({
    name: '',
    companyId: 0,
    slug: '',
    type: '',
    role: '',
    url: '',
    visibility: 'public',
    status: '',
    summary: '',
    impact: {},
    modules: [],
    stack: {
      frontend: [],
      backend: [],
      database: [],
      deployment: []
    },
    attachments: []
  })

  const [newModule, setNewModule] = useState({ name: '', summary: '' })
  const [newChallenge, setNewChallenge] = useState({ problem: '', solution: '' })
  const [currentModuleIndex, setCurrentModuleIndex] = useState(-1)
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])

  useEffect(() => {
    fetchCompanies()
  }, [])

  const fetchCompanies = async () => {
    try {
      const response = await fetch('/api/companies')
      if (response.ok) {
        const data = await response.json()
        setCompanies(data)
        if (data.length > 0) {
          setProject(prev => ({ ...prev, companyId: data[0].id }))
        }
      }
    } catch (error) {
      setError('Failed to fetch companies')
    } finally {
      setLoading(false)
    }
  }

  const generateSlug = (name: string) => {
    return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
  }

  const handleNameChange = (name: string) => {
    setProject({
      ...project,
      name,
      slug: generateSlug(name)
    })
  }

  const addModule = () => {
    if (newModule.name && newModule.summary) {
      setProject({
        ...project,
        modules: [...project.modules, { ...newModule, challenges: [] }]
      })
      setNewModule({ name: '', summary: '' })
    }
  }

  const addChallenge = () => {
    if (currentModuleIndex >= 0 && newChallenge.problem && newChallenge.solution) {
      const updatedModules = [...project.modules]
      updatedModules[currentModuleIndex].challenges.push(newChallenge)
      setProject({ ...project, modules: updatedModules })
      setNewChallenge({ problem: '', solution: '' })
      setCurrentModuleIndex(-1)
    }
  }

  const removeModule = (index: number) => {
    const updatedModules = project.modules.filter((_, i) => i !== index)
    setProject({ ...project, modules: updatedModules })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError('')

    try {
      // Process uploaded files
      const processedAttachments = await Promise.all(
        uploadedFiles.map(async (file) => {
          // For now, we'll create a data URL for images and videos
          // In a real app, you'd upload to a service like AWS S3 or Cloudinary
          if (file.type.startsWith('image/') || file.type.startsWith('video/')) {
            const preview = await new Promise<string>((resolve) => {
              const reader = new FileReader()
              reader.onload = (e) => resolve(e.target?.result as string)
              reader.readAsDataURL(file)
            })
            
            return {
              id: Math.random().toString(36).substr(2, 9),
              title: file.name,
              description: `${file.type.split('/')[0].toUpperCase()} • ${(file.size / 1024 / 1024).toFixed(2)}MB`,
              type: file.type.startsWith('image/') ? 'image' : 'video',
              url: preview,
              fileName: file.name,
              fileSize: file.size,
              mimeType: file.type
            }
          } else {
            return {
              id: Math.random().toString(36).substr(2, 9),
              title: file.name,
              description: `Document • ${(file.size / 1024 / 1024).toFixed(2)}MB`,
              type: 'document',
              url: '#', // In a real app, this would be the uploaded file URL
              fileName: file.name,
              fileSize: file.size,
              mimeType: file.type
            }
          }
        })
      )

      const projectData = {
        ...project,
        attachments: processedAttachments
      }

      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(projectData),
      })

      if (response.ok) {
        router.push('/admin')
      } else {
        const errorData = await response.json()
        setError(errorData.error || 'Failed to create project')
      }
    } catch (error) {
      setError('An error occurred. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center">
            <Link
              href="/admin"
              className="flex items-center text-gray-600 hover:text-gray-900 mr-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">New Project</h1>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Basic Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Project Name *
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  value={project.name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label htmlFor="slug" className="block text-sm font-medium text-gray-700 mb-2">
                  Slug *
                </label>
                <input
                  type="text"
                  id="slug"
                  required
                  value={project.slug}
                  onChange={(e) => setProject({ ...project, slug: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                  Company *
                </label>
                <select
                  id="company"
                  required
                  value={project.companyId}
                  onChange={(e) => setProject({ ...project, companyId: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {companies.map((company) => (
                    <option key={company.id} value={company.id}>
                      {company.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
                  Status *
                </label>
                <select
                  id="status"
                  required
                  value={project.status}
                  onChange={(e) => setProject({ ...project, status: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select Status</option>
                  <option value="completed">Completed</option>
                  <option value="in-progress">In Progress</option>
                  <option value="planning">Planning</option>
                  <option value="on_hold">On Hold</option>
                </select>
              </div>

              <div>
                <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-2">
                  Type
                </label>
                <input
                  type="text"
                  id="type"
                  value={project.type}
                  onChange={(e) => setProject({ ...project, type: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-2">
                  Role
                </label>
                <input
                  type="text"
                  id="role"
                  value={project.role || ''}
                  onChange={(e) => setProject({ ...project, role: e.target.value })}
                  placeholder="e.g., Fullstack Developer, Frontend Developer, UI/UX Designer"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-2">
                  Project URL
                </label>
                <input
                  type="url"
                  id="url"
                  value={project.url || ''}
                  onChange={(e) => setProject({ ...project, url: e.target.value })}
                  placeholder="https://example-project.com"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label htmlFor="visibility" className="block text-sm font-medium text-gray-700 mb-2">
                  Visibility
                </label>
                <select
                  id="visibility"
                  value={project.visibility}
                  onChange={(e) => setProject({ ...project, visibility: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="public">Public</option>
                  <option value="private">Private</option>
                </select>
              </div>
            </div>

            <div className="mt-6">
              <label htmlFor="summary" className="block text-sm font-medium text-gray-700 mb-2">
                Summary
              </label>
              <textarea
                id="summary"
                rows={4}
                value={project.summary}
                onChange={(e) => setProject({ ...project, summary: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Impact */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <DynamicImpactForm
              initialImpact={project.impact}
              onChange={(impact) => setProject({ ...project, impact })}
            />
          </div>

          {/* Tech Stack */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <DynamicTechStackForm
              initialStack={project.stack}
              onChange={(stack) => setProject({ ...project, stack })}
            />
          </div>

          {/* Modules */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Modules</h2>
            
            {/* Add New Module */}
            <div className="border border-gray-200 rounded-lg p-4 mb-4">
              <h3 className="font-medium text-gray-900 mb-3">Add New Module</h3>
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Module name"
                  value={newModule.name}
                  onChange={(e) => setNewModule({ ...newModule, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <textarea
                  placeholder="Module summary"
                  rows={2}
                  value={newModule.summary}
                  onChange={(e) => setNewModule({ ...newModule, summary: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <button
                  type="button"
                  onClick={addModule}
                  className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded text-white bg-blue-600 hover:bg-blue-700"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add Module
                </button>
              </div>
            </div>

            {/* Existing Modules */}
            <div className="space-y-3">
              {project.modules.map((module, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium text-gray-900">{module.name}</h4>
                    <button
                      type="button"
                      onClick={() => removeModule(index)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{module.summary}</p>
                  
                  {/* Add Challenge */}
                  {currentModuleIndex === index ? (
                    <div className="border border-gray-200 rounded p-3 mt-2">
                      <h5 className="text-sm font-medium text-gray-900 mb-2">Add Challenge</h5>
                      <input
                        type="text"
                        placeholder="Problem"
                        value={newChallenge.problem}
                        onChange={(e) => setNewChallenge({ ...newChallenge, problem: e.target.value })}
                        className="w-full px-2 py-1 border border-gray-300 rounded text-sm mb-2"
                      />
                      <textarea
                        placeholder="Solution"
                        rows={2}
                        value={newChallenge.solution}
                        onChange={(e) => setNewChallenge({ ...newChallenge, solution: e.target.value })}
                        className="w-full px-2 py-1 border border-gray-300 rounded text-sm mb-2"
                      />
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={addChallenge}
                          className="text-xs bg-green-600 text-white px-2 py-1 rounded"
                        >
                          Add
                        </button>
                        <button
                          type="button"
                          onClick={() => setCurrentModuleIndex(-1)}
                          className="text-xs bg-gray-600 text-white px-2 py-1 rounded"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setCurrentModuleIndex(index)}
                      className="text-xs bg-blue-600 text-white px-2 py-1 rounded"
                    >
                      Add Challenge
                    </button>
                  )}
                  
                  {/* Display Challenges */}
                  {module.challenges && module.challenges.length > 0 && (
                    <div className="mt-3 space-y-2">
                      {module.challenges.map((challenge: any, cIndex: number) => (
                        <div key={cIndex} className="bg-gray-50 rounded p-2 text-sm">
                          <div className="font-medium text-red-600">Problem: {challenge.problem}</div>
                          <div className="text-green-600">Solution: {challenge.solution}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Attachments */}

          {/* Attachments */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Attachments & Media</h2>
            <FileUpload
              accept="image/*,video/*,.pdf,.doc,.docx,.txt"
              multiple={true}
              maxFiles={10}
              onFilesChange={setUploadedFiles}
              className="w-full"
            />
          </div>

          {/* Submit */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save className="h-4 w-4 mr-2" />
              {saving ? 'Creating...' : 'Create Project'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}