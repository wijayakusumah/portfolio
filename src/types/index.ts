export interface Project {
  id: number
  name: string
  slug: string
  type?: string
  role?: string
  url?: string
  visibility: string
  status?: string
  summary?: string
  viewCount: number
  impact?: any
  modules?: any[]
  stack?: any
  attachments?: any[]
  createdAt: string
  updatedAt: string
  company: {
    id: number
    name: string
    industry?: string
    website?: string
    description?: string
    logo?: string
  }
}

export interface Company {
  id: number
  name: string
  industry?: string
  website?: string
  description?: string
  logo?: string
  _count?: {
    projects: number
  }
}

export interface Admin {
  id: number
  username: string
}