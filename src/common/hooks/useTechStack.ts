import { TechStackEntry } from '@/common/types/content.types'
import { useFirestoreCollection } from './useFirestoreCollection'

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
  const { data: stack, loading } = useFirestoreCollection<TechStackEntry>(
    'techstack',
    staticStack
  )

  return { stack, loading }
}
