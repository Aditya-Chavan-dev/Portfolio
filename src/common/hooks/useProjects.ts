import { useState, useEffect } from 'react'
import { collection, getDocs, orderBy, query } from 'firebase/firestore'
import { db } from '@/common/lib/firebase'
import { ProjectEntry } from '@/common/types/content.types'

const staticProjects: ProjectEntry[] = [
  // ... (keeping staticProjects as is)
];

export function useProjects() {
  const [projects, setProjects] = useState<ProjectEntry[]>(staticProjects)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      try {
        const q = query(collection(db, 'projects'), orderBy('order', 'asc'))
        const snapshot = await getDocs(q)
        
        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        } as ProjectEntry))

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
