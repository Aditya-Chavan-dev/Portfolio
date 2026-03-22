export interface Project {
  id: number
  name: string
  description: string | null
  topics: string[]
  language: string | null
  githubUrl: string
  liveUrl: string | null
  stars: number
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

export function mapGithubRepo(raw: any): Project {
  return {
    id: raw.id,
    name: raw.name,
    description: raw.description,
    topics: raw.topics ?? [],
    language: raw.language,
    githubUrl: raw.html_url,
    liveUrl: raw.homepage || null,
    stars: raw.stargazers_count,
    createdAt: raw.created_at,
    updatedAt: raw.updated_at,
    isFork: raw.fork,
  }
}
