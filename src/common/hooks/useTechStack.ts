import { useState, useEffect } from 'react'
import { getCollection } from '@/common/shared/firestore.service'
import { TechStackEntry } from '@/common/types/content.types'
import { Layout, Server, Terminal, Shield } from 'lucide-react'

const staticStack: TechStackEntry[] = [
  {
    category: "Visual Architecture",
    tools: ["React 19", "Vite 7", "Framer Motion", "Tailwind CSS", "Canvas API"]
  },
  {
    category: "Core Engineering",
    tools: ["TypeScript", "Rust (WASM)", "Node.js", "Zod", "Go"]
  },
  {
    category: "System State",
    tools: ["Firebase", "Zustand", "Redis", "PostgreSQL", "Tantstack Query"]
  },
  {
    category: "Ops & Scale",
    tools: ["Docker", "Vercel Edge", "GitOps", "Cloudflare", "Lighthouse"]
  }
];

export function useTechStack() {
  const [stack, setStack] = useState<TechStackEntry[]>(staticStack)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      try {
        const data = await getCollection<TechStackEntry>('techstack')
        if (data && data.length > 0) {
          setStack(data)
        }
      } catch (err) {
        console.error('Failed to fetch tech stack:', err)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  return { stack, loading }
}
