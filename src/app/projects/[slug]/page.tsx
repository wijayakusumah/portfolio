"use client"

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Building2, Users, Clock, DollarSign, ExternalLink, Image as ImageIcon, TrendingUp, Target, Award, BarChart3, Globe, Monitor, Server, Database, Cloud, Smartphone, Shield, Cpu, Palette, Calendar, Eye, Share2, Heart, ChevronDown, ChevronUp, Download, Package, Grid3x3, Sparkles } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
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
  
  if (lowerKey.includes('user') || lowerKey.includes('customer')) {
    return <Users className="h-5 w-5 text-blue-600 dark:text-blue-400" />
  }
  if (lowerKey.includes('company') || lowerKey.includes('client') || lowerKey.includes('business')) {
    return <Building2 className="h-5 w-5 text-green-600 dark:text-green-400" />
  }
  if (lowerKey.includes('revenue') || lowerKey.includes('cash') || lowerKey.includes('income') || lowerKey.includes('profit')) {
    return <DollarSign className="h-5 w-5 text-purple-600 dark:text-purple-400" />
  }
  if (lowerKey.includes('time') || lowerKey.includes('work') || lowerKey.includes('hour') || lowerKey.includes('day')) {
    return <Clock className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
  }
  if (lowerKey.includes('scale') || lowerKey.includes('market') || lowerKey.includes('global') || lowerKey.includes('reach')) {
    return <Globe className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
  }
  if (lowerKey.includes('growth') || lowerKey.includes('efficiency') || lowerKey.includes('improvement')) {
    return <TrendingUp className="h-5 w-5 text-teal-600 dark:text-teal-400" />
  }
  if (lowerKey.includes('goal') || lowerKey.includes('target') || lowerKey.includes('objective')) {
    return <Target className="h-5 w-5 text-orange-600 dark:text-orange-400" />
  }
  if (lowerKey.includes('award') || lowerKey.includes('achievement') || lowerKey.includes('recognition')) {
    return <Award className="h-5 w-5 text-pink-600 dark:text-pink-400" />
  }
  if (lowerKey.includes('analytics') || lowerKey.includes('data') || lowerKey.includes('metric')) {
    return <BarChart3 className="h-5 w-5 text-gray-600 dark:text-gray-400" />
  }
  
  return <TrendingUp className="h-5 w-5 text-gray-600 dark:text-gray-400" />
}

const getTechStackIcon = (key: string) => {
  const lowerKey = key.toLowerCase()
  
  if (lowerKey.includes('front') || lowerKey.includes('ui') || lowerKey.includes('client')) {
    return <Monitor className="h-5 w-5 text-blue-600 dark:text-blue-400" />
  }
  if (lowerKey.includes('back') || lowerKey.includes('server') || lowerKey.includes('api')) {
    return <Server className="h-5 w-5 text-green-600 dark:text-green-400" />
  }
  if (lowerKey.includes('database') || lowerKey.includes('db') || lowerKey.includes('storage')) {
    return <Database className="h-5 w-5 text-purple-600 dark:text-purple-400" />
  }
  if (lowerKey.includes('cloud') || lowerKey.includes('devops') || lowerKey.includes('deploy')) {
    return <Cloud className="h-5 w-5 text-orange-600 dark:text-orange-400" />
  }
  if (lowerKey.includes('mobile') || lowerKey.includes('ios') || lowerKey.includes('android')) {
    return <Smartphone className="h-5 w-5 text-pink-600 dark:text-pink-400" />
  }
  if (lowerKey.includes('web') || lowerKey.includes('http') || lowerKey.includes('network')) {
    return <Globe className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
  }
  if (lowerKey.includes('security') || lowerKey.includes('auth') || lowerKey.includes('test')) {
    return <Shield className="h-5 w-5 text-red-600 dark:text-red-400" />
  }
  if (lowerKey.includes('infra') || lowerKey.includes('infrastruct') || lowerKey.includes('system')) {
    return <Cpu className="h-5 w-5 text-gray-600 dark:text-gray-400" />
  }
  if (lowerKey.includes('design') || lowerKey.includes('tool') || lowerKey.includes('util')) {
    return <Palette className="h-5 w-5 text-teal-600 dark:text-teal-400" />
  }
  
  return <Monitor className="h-5 w-5 text-gray-600 dark:text-gray-400" />
}

const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })
}

export default function ProjectDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [project, setProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState(true)
  const [expandedModules, setExpandedModules] = useState<number[]>([])
  const [selectedImage, setSelectedImage] = useState<any>(null)
  const [liked, setLiked] = useState(false)

  useEffect(() => {
    const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug
    if (slug) {
      fetchProject(slug)
    }
  }, [params.slug])

  const fetchProject = async (slug: string) => {
    try {
      const response = await fetch(`/api/projects/${slug}`)
      if (response.ok) {
        const data = await response.json()
        setProject(data)
      } else {
        router.push('/')
      }
    } catch (error) {
      console.error('Error fetching project:', error)
      router.push('/')
    } finally {
      setLoading(false)
    }
  }

  const toggleModule = (index: number) => {
    setExpandedModules(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    )
  }

  const toggleAllModules = () => {
    if (expandedModules.length === project?.modules.length) {
      setExpandedModules([])
    } else {
      setExpandedModules(project?.modules.map((_, i) => i) || [])
    }
  }

  const shareProject = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: project?.name,
          text: project?.summary,
          url: window.location.href,
        })
      } catch (error) {
        console.log('Error sharing:', error)
      }
    } else {
      navigator.clipboard.writeText(window.location.href)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading project details...</p>
        </div>
      </div>
    )
  }

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Project not found</h2>
          <Link href="/">
            <Button variant="outline">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to projects
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Compact Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container">
          <div className="flex items-center justify-between h-14 sm:h-16">
            <Link href="/" className="flex items-center text-muted-foreground hover:text-foreground transition-colors text-sm sm:text-base">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to projects
            </Link>
            
            <div className="flex items-center space-x-1 sm:space-x-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setLiked(!liked)}
                className="h-8 w-8 sm:h-9 sm:w-9"
              >
                <Heart className={`h-4 w-4 ${liked ? 'fill-red-500 text-red-500' : ''}`} />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={shareProject}
                className="h-8 w-8 sm:h-9 sm:w-9"
              >
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container py-6 sm:py-8">
        <div className="max-w-6xl mx-auto">
          {/* Project Header */}
          <section className="mb-8 sm:mb-12">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 sm:gap-6 mb-6 sm:mb-8">
              <div className="flex items-center gap-3 sm:gap-4">
                {project.company.logo ? (
                  <img
                    src={project.company.logo}
                    alt={project.company.name}
                    className="h-10 w-10 sm:h-12 sm:w-12 object-contain rounded-lg bg-white dark:bg-gray-800 p-2 shadow-sm"
                  />
                ) : (
                  <div className="h-10 w-10 sm:h-12 sm:w-12 bg-gradient-to-br from-primary/10 to-primary/20 rounded-lg flex items-center justify-center">
                    <Building2 className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                  </div>
                )}
                <div>
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-1 sm:mb-2 leading-tight">{project.name}</h1>
                  <p className="text-sm sm:text-base text-muted-foreground">{project.company.name}</p>
                </div>
              </div>
              
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                <Badge className={`${statusColors[project.status as keyof typeof statusColors]} text-xs sm:text-sm`}>
                  {project.status?.replace('-', ' ').toUpperCase() || 'UNKNOWN'}
                </Badge>
                <Badge className={`${typeColors[project.type as keyof typeof typeColors]} text-xs sm:text-sm`}>
                  {project.type.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </Badge>
                {project.role && (
                  <Badge variant="outline" className="text-xs sm:text-sm">
                    {project.role}
                  </Badge>
                )}
              </div>
            </div>
            
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-4 sm:mb-6 max-w-4xl">
              {project.summary}
            </p>
            
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs sm:text-sm text-muted-foreground">
              <div className="flex items-center">
                <Eye className="h-3 w-3 sm:h-4 sm:w-4 mr-1.5 sm:mr-2" />
                {project.viewCount.toLocaleString()} views
              </div>
              <div className="flex items-center">
                <Calendar className="h-3 w-3 sm:h-4 sm:w-4 mr-1.5 sm:mr-2" />
                {formatDate(project.createdAt)}
              </div>
            </div>
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Mobile: Impact Metrics First */}
            <div className="lg:hidden space-y-4 sm:space-y-6">
              {/* Impact Metrics */}
              {project.impact && Object.keys(project.impact).length > 0 && (
                <Card className="border-0 shadow-sm">
                  <CardHeader className="pb-3 sm:pb-4 px-4 sm:px-6 pt-4 sm:pt-6">
                    <CardTitle className="flex items-center text-base sm:text-lg">
                      <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-green-600" />
                      Impact Metrics
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 sm:space-y-4 px-4 sm:px-6 pb-4 sm:pb-6">
                    {Object.entries(project.impact).map(([key, value]) => {
                      const iconComponent = getImpactIcon(key)
                      return (
                        <div key={key} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                          <div className="flex items-center">
                            <div className="mr-3">
                              {iconComponent}
                            </div>
                            <div>
                              <p className="text-xs sm:text-sm font-medium capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</p>
                              <p className="text-xs sm:text-sm text-muted-foreground">Key achievement</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-sm sm:text-base font-bold text-primary">{value}</p>
                          </div>
                        </div>
                      )
                    })}
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6 sm:space-y-8">
              
              {/* Modules & Components - Featured Section */}
              {project.modules && project.modules.length > 0 && (
                <section>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                    <div className="flex items-center">
                      <div className="p-2 rounded-lg bg-primary/10 mr-3">
                        <Package className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                      </div>
                      <div>
                        <h2 className="text-xl sm:text-2xl font-bold">Modules & Components</h2>
                        <p className="text-xs sm:text-sm text-muted-foreground">Key building blocks of this project</p>
                      </div>
                    </div>
                    {project.modules.length > 1 && (
                      <Button variant="outline" size="sm" onClick={toggleAllModules} className="text-xs sm:text-sm">
                        <Grid3x3 className="h-3 w-3 sm:h-4 sm:w-4 mr-1.5 sm:mr-2" />
                        {expandedModules.length === project.modules.length ? 'Collapse All' : 'Expand All'}
                      </Button>
                    )}
                  </div>
                  
                  {/* Summary Section */}
                  <Card className="mb-4 sm:mb-6 border-0 shadow-sm bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950">
                    <CardContent className="p-4 sm:p-6">
                      <div className="flex items-center mb-3">
                        <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 dark:text-blue-400 mr-2" />
                        <h3 className="font-semibold text-sm sm:text-base">Overview</h3>
                      </div>
                      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-3">
                        This project consists of {project.modules.length} key {project.modules.length === 1 ? 'module' : 'modules'} that work together to deliver the complete solution. 
                        Each module addresses specific functionality and follows modern development best practices.
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {project.modules.map((module: any, index: number) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {module.name}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                  
                  <div className="space-y-3 sm:space-y-4">
                    {project.modules.map((module: any, index: number) => (
                      <Card key={index} className="overflow-hidden border-0 shadow-sm hover:shadow-md transition-all duration-300">
                        <CardHeader 
                          className="pb-3 cursor-pointer hover:bg-muted/50 transition-colors px-4 sm:px-6 py-4 sm:py-5"
                          onClick={() => toggleModule(index)}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="p-1.5 sm:p-2 rounded-lg bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950">
                                <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 text-blue-600 dark:text-blue-400" />
                              </div>
                              <CardTitle className="text-base sm:text-lg">{module.name}</CardTitle>
                            </div>
                            <Button variant="ghost" size="sm" className="h-8 w-8 sm:h-9 sm:w-9 p-0">
                              {expandedModules.includes(index) ? (
                                <ChevronUp className="h-4 w-4" />
                              ) : (
                                <ChevronDown className="h-4 w-4" />
                              )}
                            </Button>
                          </div>
                        </CardHeader>
                        
                        {expandedModules.includes(index) && (
                          <CardContent className="pt-0 px-4 sm:px-6 pb-4 sm:pb-6">
                            <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{module.description}</p>
                            
                            {module.features && module.features.length > 0 && (
                              <div className="mb-4">
                                <h4 className="font-medium mb-2 flex items-center text-sm">
                                  <Target className="h-3 w-3 sm:h-4 sm:w-4 mr-2 text-green-600" />
                                  Key Features
                                </h4>
                                <ul className="space-y-1.5 sm:space-y-2">
                                  {module.features.map((feature: string, featureIndex: number) => (
                                    <li key={featureIndex} className="flex items-start text-sm text-muted-foreground">
                                      <div className="h-1.5 w-1.5 rounded-full bg-primary mt-2 mr-3 flex-shrink-0"></div>
                                      <span className="leading-relaxed">{feature}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                            
                            {/* Module Summary */}
                            {module.summary && (
                              <div className="mb-4 p-3 sm:p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 rounded-lg border border-blue-200 dark:border-blue-800">
                                <h4 className="font-medium mb-2 flex items-center text-sm">
                                  <Target className="h-3 w-3 sm:h-4 sm:w-4 mr-2 text-blue-600" />
                                  Module Summary
                                </h4>
                                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{module.summary}</p>
                              </div>
                            )}
                            
                            {module.challenges && module.challenges.length > 0 && (
                              <div>
                                <h4 className="font-medium mb-3 flex items-center text-sm">
                                  <Shield className="h-3 w-3 sm:h-4 sm:w-4 mr-2 text-orange-600" />
                                  Challenges & Solutions
                                </h4>
                                <div className="space-y-2 sm:space-y-3">
                                  {module.challenges.map((challenge: any, cIndex: number) => (
                                    <div key={cIndex} className="border-l-2 border-red-200 dark:border-red-800 pl-3 sm:pl-4">
                                      <div className="text-sm font-medium text-red-600 dark:text-red-400 mb-1">
                                        {challenge.problem}
                                      </div>
                                      <div className="text-sm text-green-600 dark:text-green-400 leading-relaxed">
                                        {challenge.solution}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </CardContent>
                        )}
                      </Card>
                    ))}
                  </div>
                </section>
              )}

              {/* Gallery */}
              {project.attachments && project.attachments.length > 0 && (
                <section>
                  <div className="flex items-center mb-6">
                    <div className="p-2 rounded-lg bg-primary/10 mr-3">
                      <ImageIcon className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                    </div>
                    <div>
                      <h2 className="text-xl sm:text-2xl font-bold">Gallery</h2>
                      <p className="text-xs sm:text-sm text-muted-foreground">Visual assets and media</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                    {project.attachments.map((attachment: any, index: number) => (
                      <Card key={index} className="overflow-hidden group hover:shadow-lg transition-all duration-300 border-0 shadow-sm">
                        <div className="aspect-video bg-muted relative">
                          {attachment.type && (attachment.type.startsWith('image/') || attachment.type === 'image') ? (
                            <Dialog>
                              <DialogTrigger asChild>
                                <div className="cursor-pointer">
                                  <img
                                    src={attachment.url}
                                    alt={attachment.title || `Attachment ${index + 1}`}
                                    className="w-full h-full object-cover"
                                  />
                                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                                    <ImageIcon className="h-6 w-6 sm:h-8 sm:w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                                  </div>
                                </div>
                              </DialogTrigger>
                              <DialogContent className="max-w-4xl">
                                <img
                                  src={attachment.url}
                                  alt={attachment.title || `Attachment ${index + 1}`}
                                  className="w-full h-auto max-h-[80vh] object-contain"
                                />
                              </DialogContent>
                            </Dialog>
                          ) : attachment.type && (attachment.type.startsWith('video/') || attachment.type === 'video') ? (
                            <video
                              src={attachment.url}
                              className="w-full h-full object-cover"
                              controls
                            />
                          ) : (
                            <div className="flex items-center justify-center h-full">
                              <div className="text-center p-4">
                                <Download className="h-8 w-8 sm:h-12 sm:w-12 text-muted-foreground mx-auto mb-2" />
                                <p className="text-xs sm:text-sm text-muted-foreground">{attachment.title || 'Document'}</p>
                                {attachment.type && (
                                  <p className="text-xs text-muted-foreground mt-1">
                                    {attachment.type === 'document' ? 'Document' : attachment.type.split('/')[1]?.toUpperCase() || 'File'}
                                  </p>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                        {(attachment.title || attachment.description) && (
                          <CardContent className="p-3 sm:p-4">
                            {attachment.title && (
                              <h3 className="font-medium mb-1 text-sm">{attachment.title}</h3>
                            )}
                            {attachment.description && (
                              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{attachment.description}</p>
                            )}
                          </CardContent>
                        )}
                      </Card>
                    ))}
                  </div>
                </section>
              )}

              {/* Tech Stack - Mobile Only */}
              {project.stack && Object.keys(project.stack).length > 0 && (
                <section className="lg:hidden">
                  <div className="flex items-center mb-6">
                    <div className="p-2 rounded-lg bg-primary/10 mr-3">
                      <Cpu className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                    </div>
                    <div>
                      <h2 className="text-xl sm:text-2xl font-bold">Tech Stack</h2>
                      <p className="text-xs sm:text-sm text-muted-foreground">Technologies used in this project</p>
                    </div>
                  </div>
                  
                  <Card className="border-0 shadow-sm">
                    <CardContent className="space-y-3 sm:space-4 p-4 sm:p-6">
                      {Object.entries(project.stack).map(([category, technologies]) => {
                        const iconComponent = getTechStackIcon(category)
                        return (
                          <div key={category}>
                            <div className="flex items-center mb-2">
                              <div className="p-1 sm:p-1.5 rounded bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-950 dark:to-blue-950 mr-2">
                                {iconComponent}
                              </div>
                              <span className="text-xs sm:text-sm font-medium">
                                {category.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                              </span>
                            </div>
                            <div className="flex flex-wrap gap-1 sm:gap-1.5 ml-5 sm:ml-6">
                              {Array.isArray(technologies) && technologies.map((tech: string, index: number) => (
                                <Badge key={index} variant="secondary" className="text-xs">
                                  {tech}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )
                      })}
                    </CardContent>
                  </Card>
                </section>
              )}

              {/* Project Link - Mobile Only */}
              {project.url && (
                <section className="lg:hidden">
                  <Card className="border-0 shadow-sm">
                    <CardHeader className="pb-3 sm:pb-4 px-4 sm:px-6 pt-4 sm:pt-6">
                      <CardTitle className="flex items-center text-base sm:text-lg">
                        <ExternalLink className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-blue-600" />
                        Project Link
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="px-4 sm:px-6 pb-4 sm:pb-6">
                      <Button variant="default" asChild className="w-full text-xs sm:text-sm">
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center"
                        >
                          <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4 mr-1.5 sm:mr-2" />
                          View Live Project
                        </a>
                      </Button>
                    </CardContent>
                  </Card>
                </section>
              )}

              {/* Company Info - Mobile Only */}
              <section className="lg:hidden">
                <Card className="border-0 shadow-sm">
                  <CardHeader className="pb-3 sm:pb-4 px-4 sm:px-6 pt-4 sm:pt-6">
                    <CardTitle className="flex items-center text-base sm:text-lg">
                      <Building2 className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-blue-600" />
                      Company Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 px-4 sm:px-6 pb-4 sm:pb-6">
                    <div className="text-center sm:text-left">
                      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 mb-4">
                        {project.company.logo ? (
                          <img
                            src={project.company.logo}
                            alt={project.company.name}
                            className="h-12 w-12 object-contain rounded-lg bg-white dark:bg-gray-800 p-2 shadow-sm"
                          />
                        ) : (
                          <div className="h-12 w-12 bg-gradient-to-br from-primary/10 to-primary/20 rounded-lg flex items-center justify-center">
                            <Building2 className="h-6 w-6 text-primary" />
                          </div>
                        )}
                        <div className="flex-1">
                          <h3 className="font-semibold text-base sm:text-lg mb-1">{project.company.name}</h3>
                          {project.company.industry && (
                            <p className="text-xs sm:text-sm text-muted-foreground">{project.company.industry}</p>
                          )}
                        </div>
                      </div>
                      
                      {project.company.description && (
                        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-4">
                          {project.company.description}
                        </p>
                      )}
                      
                      {project.company.website && (
                        <Button variant="outline" size="sm" asChild className="w-full sm:w-auto text-xs sm:text-sm">
                          <a
                            href={project.company.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center"
                          >
                            <Globe className="h-3 w-3 sm:h-4 sm:w-4 mr-1.5 sm:mr-2" />
                            Visit Website
                          </a>
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </section>
            </div>

            {/* Sidebar - Desktop Only */}
            <div className="hidden lg:block space-y-4 sm:space-y-6">
              
              {/* Impact Metrics - Desktop Only */}
              {project.impact && Object.keys(project.impact).length > 0 && (
                <Card className="border-0 shadow-sm">
                  <CardHeader className="pb-3 sm:pb-4 px-4 sm:px-6 pt-4 sm:pt-6">
                    <CardTitle className="flex items-center text-base sm:text-lg">
                      <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-green-600" />
                      Impact Metrics
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 sm:space-y-4 px-4 sm:px-6 pb-4 sm:pb-6">
                    {Object.entries(project.impact).map(([key, value]) => {
                      const iconComponent = getImpactIcon(key)
                      return (
                        <div key={key} className="flex items-center space-x-3">
                          <div className="p-1.5 sm:p-2 rounded-lg bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950">
                            {iconComponent}
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="font-semibold text-sm sm:text-base truncate">{value as string}</p>
                            <p className="text-xs text-muted-foreground capitalize">
                              {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                            </p>
                          </div>
                        </div>
                      )
                    })}
                  </CardContent>
                </Card>
              )}

              {/* Technology Stack */}
              {project.stack && Object.keys(project.stack).length > 0 && (
                <Card className="border-0 shadow-sm">
                  <CardHeader className="pb-3 sm:pb-4 px-4 sm:px-6 pt-4 sm:pt-6">
                    <CardTitle className="flex items-center text-base sm:text-lg">
                      <Cpu className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-purple-600" />
                      Tech Stack
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 sm:space-4 px-4 sm:px-6 pb-4 sm:pb-6">
                    {Object.entries(project.stack).map(([category, technologies]) => {
                      const iconComponent = getTechStackIcon(category)
                      return (
                        <div key={category}>
                          <div className="flex items-center mb-2">
                            <div className="p-1 sm:p-1.5 rounded bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-950 dark:to-blue-950 mr-2">
                              {iconComponent}
                            </div>
                            <span className="text-xs sm:text-sm font-medium">
                              {category.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-1 sm:gap-1.5 ml-5 sm:ml-6">
                            {Array.isArray(technologies) && technologies.map((tech: string, index: number) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {tech}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )
                    })}
                  </CardContent>
                </Card>
              )}

              {/* Project Link - Desktop Only */}
              {project.url && (
                <Card className="border-0 shadow-sm">
                  <CardHeader className="pb-3 sm:pb-4 px-4 sm:px-6 pt-4 sm:pt-6">
                    <CardTitle className="flex items-center text-base sm:text-lg">
                      <ExternalLink className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-blue-600" />
                      Project Link
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="px-4 sm:px-6 pb-4 sm:pb-6">
                    <Button variant="default" asChild className="w-full text-xs sm:text-sm">
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center"
                      >
                        <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4 mr-1.5 sm:mr-2" />
                        View Live Project
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              )}

              {/* Company Information */}
              <Card className="border-0 shadow-sm">
                <CardHeader className="pb-3 sm:pb-4 px-4 sm:px-6 pt-4 sm:pt-6">
                  <CardTitle className="flex items-center text-base sm:text-lg">
                    <Building2 className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-blue-600" />
                    Company Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 px-4 sm:px-6 pb-4 sm:pb-6">
                  <div className="text-center">
                    <div className="flex flex-col items-center gap-3 mb-4">
                      {project.company.logo ? (
                        <img
                          src={project.company.logo}
                          alt={project.company.name}
                          className="h-12 w-12 object-contain rounded-lg bg-white dark:bg-gray-800 p-2 shadow-sm"
                        />
                      ) : (
                        <div className="h-12 w-12 bg-gradient-to-br from-primary/10 to-primary/20 rounded-lg flex items-center justify-center">
                          <Building2 className="h-6 w-6 text-primary" />
                        </div>
                      )}
                      <div>
                        <h3 className="font-semibold text-base sm:text-lg mb-1">{project.company.name}</h3>
                        {project.company.industry && (
                          <p className="text-xs sm:text-sm text-muted-foreground">{project.company.industry}</p>
                        )}
                      </div>
                    </div>
                    
                    {project.company.description && (
                      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-4 text-left">
                        {project.company.description}
                      </p>
                    )}
                    
                    {project.company.website && (
                      <Button variant="outline" size="sm" asChild className="w-full text-xs sm:text-sm">
                        <a
                          href={project.company.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center"
                        >
                          <Globe className="h-3 w-3 sm:h-4 sm:w-4 mr-1.5 sm:mr-2" />
                          Visit Website
                        </a>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}