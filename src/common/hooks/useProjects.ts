import { useState, useEffect } from 'react'
import { getCollection } from '@/common/shared/firestore.service'
import { ProjectEntry } from '@/common/types/content.types'

const staticProjects: ProjectEntry[] = [
  {
    title: "AI Spatial Dashboard",
    description: "A futuristic command center for managing multi-modal AI agents with zero-paint budget glassmorphism.",
    tags: ["React 19", "Framer Motion", "Tailwind 4"],
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=2832&auto=format&fit=crop",
    featured: true,
    order: 0
  },
  {
    title: "Cyberpunk Terminal",
    description: "Interactive CLI-based portfolio experience for low-latency developer networking.",
    tags: ["TypeScript", "Vite", "Canvas"],
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2670&auto=format&fit=crop",
    featured: true,
    order: 1
  },
  {
    title: "Web3 Identity Hub",
    description: "Decentralized identity management with biometric fallback and zero-knowledge proofs.",
    tags: ["Solidity", "Next.js", "GraphQL"],
    image: "https://images.unsplash.com/photo-1644088379091-d574269d422f?q=80&w=2593&auto=format&fit=crop",
    featured: true,
    order: 2
  }
];

export function useProjects() {
  const [projects, setProjects] = useState<ProjectEntry[]>(staticProjects)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      try {
        const data = await getCollection<ProjectEntry>('projects')
        if (data && data.length > 0) {
          setProjects(data)
        }
      } catch (err) {
        console.error('Failed to fetch projects:', err)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  return { 
    projects, 
    featuredProjects: projects.filter(p => p.featured),
    archivedProjects: projects.filter(p => !p.featured),
    loading 
  }
}
