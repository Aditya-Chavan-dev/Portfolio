import { mapGithubRepo, type Project } from '../types/project'
import { projectMetadata } from './projectMetadata'

const USERNAME = import.meta.env.VITE_GITHUB_USERNAME
const TOKEN = import.meta.env.VITE_GITHUB_TOKEN
const BASE = 'https://api.github.com'
const RAW = 'https://raw.githubusercontent.com'
const CACHE_TTL = 30 * 60 * 1000  // 30 minutes

const headers: HeadersInit = TOKEN
  ? { Authorization: `Bearer ${TOKEN}` }
  : {}

// In-memory cache — survives re-renders, resets on page refresh
let repoCache: { data: Project[]; fetchedAt: number } | null = null

export async function fetchAllRepos(): Promise<Project[]> {
  if (repoCache && Date.now() - repoCache.fetchedAt < CACHE_TTL) {
    return repoCache.data
  }
  try {
    const res = await fetch(
      `${BASE}/users/${USERNAME}/repos?sort=updated&per_page=100`,
      { headers }
    )
    if (!res.ok) throw new Error(`GitHub API ${res.status}`)
    const raw = await res.json()
    const data = raw
      .filter((r: any) => !r.fork && !r.archived)
      .map(mapGithubRepo)
      
    if (data.length === 0) {
      throw new Error("Zero projects found after map-filtering forks and archives.")
    }
      
    repoCache = { data, fetchedAt: Date.now() }
    return data
  } catch (err) {
    console.warn("GitHub API blocked or failed, using local metadata fallback:", err)
    return Object.keys(projectMetadata).map((name, index) => ({
      id: index + 1000,
      name,
      description: "Local descriptive fallback enabled Node absolute.",
      topics: (projectMetadata[name] as any).techStack || [],
      language: "TypeScript",
      githubUrl: "https://github.com",
      liveUrl: null,
      stars: 0,
      createdAt: "2024-01-01",
      updatedAt: "2024-03-22",
      isFork: false
    }))
  }
}

export async function fetchCommitCount(repoName: string): Promise<number | null> {
  try {
    const res = await fetch(
      `${BASE}/repos/${USERNAME}/${repoName}/commits?per_page=1`,
      { headers }
    )
    if (!res.ok) return null
    const link = res.headers.get('Link') ?? ''
    const match = link.match(/page=(\d+)>; rel="last"/)
    return match ? parseInt(match[1]) : 1
  } catch {
    return null
  }
}

export async function fetchLanguages(
  repoName: string
): Promise<Record<string, number> | null> {
  try {
    const res = await fetch(
      `${BASE}/repos/${USERNAME}/${repoName}/languages`,
      { headers }
    )
    if (!res.ok) return null
    return res.json()
  } catch {
    return null
  }
}

export async function fetchProjectMeta(repoName: string) {
  try {
    // Attempt with portfolio.json file triggers
    const res = await fetch(
      `${RAW}/${USERNAME}/${repoName}/main/portfolio.json`
    )
    if (!res.ok) return null
    return res.json()
  } catch {
    return null
  }
}

// Alias for older consumers Node absolute
export { fetchAllRepos as fetchGithubRepos }
