'use client'

import { useState } from 'react'
import { Plus, X, Monitor, Server, Database, Cloud, Smartphone, Globe, Shield, Cpu, Palette } from 'lucide-react'

interface TechCategory {
  id: string
  name: string
  technologies: string[]
  icon?: string
}

interface DynamicTechStackFormProps {
  initialStack?: Record<string, string[]>
  onChange: (stack: Record<string, string[]>) => void
}

const iconOptions = [
  { value: 'Monitor', icon: Monitor, label: 'Frontend' },
  { value: 'Server', icon: Server, label: 'Backend' },
  { value: 'Database', icon: Database, label: 'Database' },
  { value: 'Cloud', icon: Cloud, label: 'Cloud/DevOps' },
  { value: 'Smartphone', icon: Smartphone, label: 'Mobile' },
  { value: 'Globe', icon: Globe, label: 'Web' },
  { value: 'Shield', icon: Shield, label: 'Security' },
  { value: 'Cpu', icon: Cpu, label: 'Infrastructure' },
  { value: 'Palette', icon: Palette, label: 'Design/Tools' },
]

const commonTechCategories = [
  { name: 'Frontend', icon: 'Monitor', placeholder: 'e.g., React, Next.js, TypeScript' },
  { name: 'Backend', icon: 'Server', placeholder: 'e.g., Node.js, Express, Python' },
  { name: 'Database', icon: 'Database', placeholder: 'e.g., PostgreSQL, MongoDB, Redis' },
  { name: 'Cloud & DevOps', icon: 'Cloud', placeholder: 'e.g., AWS, Docker, Kubernetes' },
  { name: 'Mobile', icon: 'Smartphone', placeholder: 'e.g., React Native, Flutter, Swift' },
  { name: 'Testing', icon: 'Shield', placeholder: 'e.g., Jest, Cypress, Playwright' },
  { name: 'Infrastructure', icon: 'Cpu', placeholder: 'e.g., Nginx, Apache, Microservices' },
  { name: 'Design & Tools', icon: 'Palette', placeholder: 'e.g., Figma, Webpack, ESLint' },
]

export default function DynamicTechStackForm({ initialStack = {}, onChange }: DynamicTechStackFormProps) {
  const [categories, setCategories] = useState<TechCategory[]>(() => {
    const initialCategories = Object.entries(initialStack).map(([key, technologies]) => ({
      id: key,
      name: key.replace(/([A-Z])/g, ' $1').trim().replace(/^./, str => str.toUpperCase()),
      technologies,
      icon: getIconForCategory(key)
    }))
    return initialCategories.length > 0 ? initialCategories : []
  })

  const [showCommonCategories, setShowCommonCategories] = useState(false)
  const [newCategory, setNewCategory] = useState({ name: '', icon: 'Monitor' })

  function getIconForCategory(key: string): string {
    const lowerKey = key.toLowerCase()
    if (lowerKey.includes('front') || lowerKey.includes('ui') || lowerKey.includes('client')) return 'Monitor'
    if (lowerKey.includes('back') || lowerKey.includes('server') || lowerKey.includes('api')) return 'Server'
    if (lowerKey.includes('database') || lowerKey.includes('db') || lowerKey.includes('storage')) return 'Database'
    if (lowerKey.includes('cloud') || lowerKey.includes('devops') || lowerKey.includes('deploy')) return 'Cloud'
    if (lowerKey.includes('mobile') || lowerKey.includes('ios') || lowerKey.includes('android')) return 'Smartphone'
    if (lowerKey.includes('web') || lowerKey.includes('http') || lowerKey.includes('network')) return 'Globe'
    if (lowerKey.includes('security') || lowerKey.includes('auth') || lowerKey.includes('test')) return 'Shield'
    if (lowerKey.includes('infra') || lowerKey.includes('infrastruct') || lowerKey.includes('system')) return 'Cpu'
    if (lowerKey.includes('design') || lowerKey.includes('tool') || lowerKey.includes('util')) return 'Palette'
    return 'Monitor'
  }

  const updateCategories = (newCategories: TechCategory[]) => {
    setCategories(newCategories)
    const stackObject = newCategories.reduce((acc, category) => {
      const key = category.name.toLowerCase().replace(/\s+/g, '')
      acc[key] = category.technologies
      return acc
    }, {} as Record<string, string[]>)
    onChange(stackObject)
  }

  const addCategory = (name: string, icon: string = 'Monitor') => {
    const newCategory: TechCategory = {
      id: Date.now().toString(),
      name,
      technologies: [],
      icon
    }
    updateCategories([...categories, newCategory])
  }

  const removeCategory = (id: string) => {
    updateCategories(categories.filter(category => category.id !== id))
  }

  const updateCategory = (id: string, updates: Partial<TechCategory>) => {
    updateCategories(categories.map(category => 
      category.id === id ? { ...category, ...updates } : category
    ))
  }

  const addTechnology = (categoryId: string, technology: string) => {
    if (technology.trim()) {
      const category = categories.find(c => c.id === categoryId)
      if (category) {
        const updatedTechnologies = [...category.technologies, technology.trim()]
        updateCategory(categoryId, { technologies: updatedTechnologies })
      }
    }
  }

  const removeTechnology = (categoryId: string, techIndex: number) => {
    const category = categories.find(c => c.id === categoryId)
    if (category) {
      const updatedTechnologies = category.technologies.filter((_, index) => index !== techIndex)
      updateCategory(categoryId, { technologies: updatedTechnologies })
    }
  }

  const addCommonCategory = (commonCategory: typeof commonTechCategories[0]) => {
    addCategory(commonCategory.name, commonCategory.icon)
    setShowCommonCategories(false)
  }

  const addCustomCategory = () => {
    if (newCategory.name.trim()) {
      addCategory(newCategory.name.trim(), newCategory.icon)
      setNewCategory({ name: '', icon: 'Monitor' })
    }
  }

  const getIconComponent = (iconName: string) => {
    const iconOption = iconOptions.find(opt => opt.value === iconName)
    return iconOption ? iconOption.icon : Monitor
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900">Technology Stack</h3>
        <div className="flex space-x-2">
          <button
            type="button"
            onClick={() => setShowCommonCategories(!showCommonCategories)}
            className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Plus className="h-4 w-4 mr-1" />
            Add Common
          </button>
          <button
            type="button"
            onClick={() => setShowCommonCategories(false)}
            className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Plus className="h-4 w-4 mr-1" />
            Add Custom
          </button>
        </div>
      </div>

      {/* Common Categories Dropdown */}
      {showCommonCategories && (
        <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
          <h4 className="text-sm font-medium text-gray-900 mb-3">Common Tech Categories</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {commonTechCategories.map((category) => {
              const IconComponent = getIconComponent(category.icon)
              return (
                <button
                  key={category.name}
                  type="button"
                  onClick={() => addCommonCategory(category)}
                  className="flex items-center p-2 text-sm text-gray-700 hover:bg-white rounded-md border border-transparent hover:border-gray-300 transition-colors text-left"
                >
                  <IconComponent className="h-4 w-4 mr-2 text-gray-500 flex-shrink-0" />
                  <div>
                    <div className="font-medium">{category.name}</div>
                    <div className="text-xs text-gray-500">{category.placeholder}</div>
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      )}

      {/* Custom Category Input */}
      <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
        <h4 className="text-sm font-medium text-gray-900 mb-3">Custom Tech Category</h4>
        <div className="flex items-center space-x-3">
          <input
            type="text"
            placeholder="Category name (e.g., AI/ML, Blockchain)"
            value={newCategory.name}
            onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
          <select
            value={newCategory.icon}
            onChange={(e) => setNewCategory({ ...newCategory, icon: e.target.value })}
            className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          >
            {iconOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={addCustomCategory}
            disabled={!newCategory.name.trim()}
            className="px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Add
          </button>
        </div>
      </div>

      {/* Current Categories */}
      {categories.length > 0 ? (
        <div className="space-y-4">
          {categories.map((category) => {
            const IconComponent = getIconComponent(category.icon)
            return (
              <div key={category.id} className="border border-gray-200 rounded-lg bg-white">
                <div className="p-4 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <IconComponent className="h-5 w-5 text-gray-500" />
                      <input
                        type="text"
                        value={category.name}
                        onChange={(e) => updateCategory(category.id, { name: e.target.value })}
                        className="text-lg font-medium text-gray-900 bg-transparent border-none focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-2 py-1"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => removeCategory(category.id)}
                      className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-md transition-colors"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                
                <div className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <input
                        type="text"
                        placeholder="Add a technology..."
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            const target = e.target as HTMLInputElement
                            addTechnology(category.id, target.value)
                            target.value = ''
                          }
                        }}
                      />
                      <button
                        type="button"
                        onClick={(e) => {
                          const input = e.currentTarget.previousElementSibling as HTMLInputElement
                          addTechnology(category.id, input.value)
                          input.value = ''
                        }}
                        className="px-3 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                      >
                        Add
                      </button>
                    </div>
                    
                    {category.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {category.technologies.map((tech, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                          >
                            {tech}
                            <button
                              type="button"
                              onClick={() => removeTechnology(category.id, index)}
                              className="ml-2 text-blue-600 hover:text-blue-800"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          <p className="text-sm">No tech categories added yet. Add common categories or create custom ones to describe the technology stack.</p>
        </div>
      )}

      <p className="text-xs text-gray-500">
        Add technology categories that are relevant to this specific project. Different projects may use different technology stacks.
      </p>
    </div>
  )
}