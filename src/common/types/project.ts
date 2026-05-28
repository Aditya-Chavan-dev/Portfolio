export interface Project {
  id: number
  name: string
  description: string | null
  topics: string[]
  language: string | null
  githubUrl: string
  liveUrl: string | null
  stars: number
  forksCount?: number
  openIssuesCount?: number
  createdAt: string
  updatedAt: string
  isFork: boolean
}

export interface ProjectFeature {
  title: string
  description: string
}

export interface ProjectMeta {
  shortDescription: string
  startDate: string
  endDate: string
  techStack: string[]
  flagshipFeatures: ProjectFeature[]
  learningsIssues: ProjectFeature[]
  metrics?: { title: string; value: string }[]
}

export interface EnrichedProject extends Project {
  commitCount: number | null
  languages: Record<string, number> | null
  meta: ProjectMeta | null
  featured: boolean
  order: number
}





