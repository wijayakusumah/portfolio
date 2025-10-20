"use client"

import Link from "next/link"
import { Building2, Eye, TrendingUp, Users, DollarSign, Clock, Globe, Target, Award } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
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

interface ProjectCardProps {
  project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link href={`/projects/${project.slug}`}>
      <Card className="group h-full hover:shadow-lg transition-all duration-300 overflow-hidden border-0 shadow-sm hover:shadow-md bg-background/50 backdrop-blur-sm">
        <CardContent className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              {project.company.logo ? (
                <img
                  src={project.company.logo}
                  alt={project.company.name}
                  className="h-10 w-10 object-contain mr-3 rounded-lg"
                />
              ) : (
                <div className="h-10 w-10 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 rounded-lg flex items-center justify-center mr-3">
                  <Building2 className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
              )}
              <div>
                <p className="text-sm font-medium text-foreground">{project.company.name}</p>
                <div className="flex items-center gap-2 mt-1">
                  {project.type && (
                    <Badge className={typeColors[project.type as keyof typeof typeColors]} variant="secondary">
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
          <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">
            {project.name}
          </h3>

          {/* Status Badge */}
          <div className="mb-4">
            <Badge className={statusColors[project.status as keyof typeof statusColors]} variant="secondary">
              {project.status?.replace('-', ' ').toUpperCase() || 'UNKNOWN'}
            </Badge>
          </div>

          {/* Summary */}
          <p className="text-muted-foreground text-sm mb-4 line-clamp-3 leading-relaxed">
            {project.summary}
          </p>

          {/* Impact Preview */}
          {project.impact && Object.keys(project.impact).length > 0 && (
            <div className="mb-4">
              <div className="flex flex-wrap gap-2">
                {Object.entries(project.impact).slice(0, 2).map(([key, value]) => {
                  const IconComponent = getImpactIcon(key)
                  return (
                    <div key={key} className="flex items-center text-xs text-muted-foreground bg-muted rounded-lg px-2 py-1">
                      <IconComponent className="h-3 w-3 mr-1 text-primary" />
                      <span className="truncate max-w-20">{value as string}</span>
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
          <div className="flex items-center justify-between pt-4 border-t border-border">
            <div className="flex items-center text-muted-foreground text-sm">
              <Eye className="h-4 w-4 mr-1" />
              {project.viewCount.toLocaleString()} views
            </div>
            <div className="text-primary text-sm font-medium group-hover:text-primary/80">
              View Details →
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}