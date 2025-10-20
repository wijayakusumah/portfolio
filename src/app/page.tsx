'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Search, Building2, Eye, Users, DollarSign, Clock, Globe, TrendingUp, Target, Award, X } from 'lucide-react'
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Project } from "@/types"

const statusColors = {
  completed: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 border-green-200 dark:border-green-800',
  'in-progress': 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 border-blue-200 dark:border-blue-800',
  planning: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800',
  on_hold: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 border-red-200 dark:border-red-800',
}

const typeColors = {
  'web-app': 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300 border-purple-200 dark:border-purple-800',
  'mobile-app': 'bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300 border-pink-200 dark:border-pink-800',
  'enterprise': 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800',
  'startup': 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300 border-orange-200 dark:border-orange-800',
  'research': 'bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-300 border-teal-200 dark:border-teal-800',
  'consulting': 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-300 border-cyan-200 dark:border-cyan-800',
}

const getImpactIcon = (key: string) => {
  const lowerKey = key.toLowerCase()
  if (lowerKey.includes('user') || lowerKey.includes('customer')) return Users
  if (lowerKey.includes('revenue') || lowerKey.includes('cash') || lowerKey.includes('income')) return DollarSign
  if (lowerKey.includes('time') || lowerKey.includes('work') || lowerKey.includes('hour')) return Clock
  if (lowerKey.includes('scale') || lowerKey.includes('market') || lowerKey.includes('global')) return Globe
  if (lowerKey.includes('growth') || lowerKey.includes('efficiency')) return TrendingUp
  if (lowerKey.includes('goal') || lowerKey.includes('target')) return Target
  if (lowerKey.includes('award') || lowerKey.includes('achievement')) return Award
  return TrendingUp
}

export default function HomePage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [typeFilter, setTypeFilter] = useState('all')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProjects()
  }, [])

  useEffect(() => {
    filterProjects()
  }, [projects, searchTerm, typeFilter])

  const fetchProjects = async () => {
    try {
      const response = await fetch('/api/projects')
      const data = await response.json()
      setProjects(data)
    } catch (error) {
      console.error('Error fetching projects:', error)
    } finally {
      setLoading(false)
    }
  }

  const filterProjects = () => {
    let filtered = projects

    if (searchTerm) {
      filtered = filtered.filter(project =>
        project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (project.type && project.type.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }

    if (typeFilter !== 'all') {
      filtered = filtered.filter(project => project.type === typeFilter)
    }

    setFilteredProjects(filtered)
  }

  const getUniqueTypes = () => {
    const types = projects.map(p => p.type).filter(Boolean)
    return [...new Set(types)]
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading projects...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Hero Header */}
      <section className="py-8 lg:py-12 bg-muted/30">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 lg:mb-4">Projects</h1>
              <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto leading-relaxed">
                Discover my work across various industries and technologies
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-4 lg:py-6">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            {/* Search Bar */}
            <div className="mb-6">
              <div className="relative max-w-2xl mx-auto">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  placeholder="Search projects by name, company, or technology..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 h-12 text-base border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              {/* Type Filter */}
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Type:</span>
                <div className="flex gap-1 flex-wrap">
                  {[
                    { value: 'all', label: 'All' },
                    ...getUniqueTypes().map((type) => ({
                      value: type,
                      label: type.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())
                    }))
                  ].map((type) => (
                    <button
                      key={type.value}
                      onClick={() => setTypeFilter(type.value)}
                      className={`px-3 py-1.5 text-sm font-medium rounded-full transition-all duration-200 ${
                        typeFilter === type.value
                          ? 'bg-purple-600 text-white shadow-md'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                      }`}
                    >
                      {type.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Active Filters Display */}
            {(searchTerm || typeFilter !== 'all') && (
              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Active filters:</span>
                    <div className="flex gap-2">
                      {searchTerm && (
                        <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full">
                          Search: {searchTerm}
                          <button
                            onClick={() => setSearchTerm('')}
                            className="ml-1 hover:text-blue-600 dark:hover:text-blue-400"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </span>
                      )}
                      {typeFilter !== 'all' && (
                        <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 rounded-full">
                          Type: {typeFilter.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                          <button
                            onClick={() => setTypeFilter('all')}
                            className="ml-1 hover:text-purple-600 dark:hover:text-purple-400"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </span>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setSearchTerm('')
                      setTypeFilter('all')
                    }}
                    className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  >
                    Clear all
                  </button>
                </div>
              </div>
            )}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-6 lg:py-8">
        <div className="container">
          <div className="max-w-6xl mx-auto">
          {filteredProjects.length === 0 ? (
            <div className="text-center py-12 lg:py-16">
              <Building2 className="h-12 w-12 lg:h-16 lg:w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg lg:text-xl font-semibold mb-2">No projects found</h3>
              <p className="text-muted-foreground text-sm lg:text-base">Try adjusting your search or filter criteria</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {filteredProjects.map((project) => (
                <Link key={project.id} href={`/projects/${project.slug}`}>
                  <Card className="group h-full hover:shadow-lg transition-all duration-300 overflow-hidden border-0 shadow-sm hover:shadow-xl">
                    <CardContent className="p-4 sm:p-6">
                      {/* Header */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center">
                          {project.company.logo ? (
                            <img
                              src={project.company.logo}
                              alt={project.company.name}
                              className="h-8 w-8 sm:h-10 sm:w-10 object-contain mr-3 rounded-lg"
                            />
                          ) : (
                            <div className="h-8 w-8 sm:h-10 sm:w-10 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 rounded-lg flex items-center justify-center mr-3">
                              <Building2 className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 dark:text-blue-400" />
                            </div>
                          )}
                          <div>
                            <p className="text-xs sm:text-sm font-medium truncate max-w-24 sm:max-w-none">{project.company.name}</p>
                            <div className="flex items-center gap-1 mt-1">
                              {project.type && (
                                <Badge className={`${typeColors[project.type as keyof typeof typeColors]} text-xs`} variant="secondary">
                                  {project.type.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                                </Badge>
                              )}
                              {project.role && (
                                <Badge variant="outline" className="text-xs">
                                  {project.role}
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Project Name */}
                      <h3 className="text-lg sm:text-xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2 leading-tight">
                        {project.name}
                      </h3>

                      {/* Status, Year, and Role Badges */}
                      <div className="mb-4 flex flex-wrap gap-2">
                        <Badge className={`${statusColors[project.status as keyof typeof statusColors]} text-xs`} variant="secondary">
                          {project.status?.replace('-', ' ').toUpperCase() || 'UNKNOWN'}
                        </Badge>
                        <Badge className="bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300 border-gray-200 dark:border-gray-800 text-xs" variant="secondary">
                          {new Date(project.createdAt).getFullYear()}
                        </Badge>
                      </div>

                      {/* Summary */}
                      <p className="text-muted-foreground text-sm mb-4 line-clamp-3 leading-relaxed">
                        {project.summary}
                      </p>

                      {/* Impact Preview */}
                      {project.impact && Object.keys(project.impact).length > 0 && (
                        <div className="mb-4">
                          <div className="flex flex-wrap gap-1.5 sm:gap-2">
                            {Object.entries(project.impact).slice(0, 2).map(([key, value]) => {
                              const IconComponent = getImpactIcon(key)
                              return (
                                <div key={key} className="flex items-center text-xs text-muted-foreground bg-muted rounded-lg px-2 py-1">
                                  <IconComponent className="h-3 w-3 mr-1 text-primary flex-shrink-0" />
                                  <span className="truncate max-w-16 sm:max-w-20">{value as string}</span>
                                </div>
                              )
                            })}
                            {Object.keys(project.impact).length > 2 && (
                              <div className="flex items-center text-xs text-muted-foreground bg-muted rounded-lg px-2 py-1">
                                +{Object.keys(project.impact).length - 2} more
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Footer */}
                      <div className="flex items-center justify-between pt-3 sm:pt-4 border-t">
                        <div className="flex items-center text-muted-foreground text-xs sm:text-sm">
                          <Eye className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                          {project.viewCount.toLocaleString()} views
                        </div>
                        <div className="text-primary text-xs sm:text-sm font-medium group-hover:text-primary/80 flex items-center">
                          View Details 
                          <span className="ml-1 transform group-hover:translate-x-1 transition-transform">→</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
          </div>
        </div>
      </section>
    </div>
  )
}