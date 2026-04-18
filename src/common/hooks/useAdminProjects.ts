import { useEffect, useState } from 'react'
import {
  collection, onSnapshot, doc,
  setDoc, deleteDoc, serverTimestamp
} from 'firebase/firestore'
import { db } from '../lib/firebase'
import { tracedWrite } from '../lib/metrics'
import type { Project } from '../types/project'

interface AdminProject {
  repo: Project
  featured: boolean
  order: number
}

export function useAdminProjects() {
  const [items, setItems] = useState<AdminProject[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'projects'), snapshot => {
      try {
        const merged: AdminProject[] = snapshot.docs.map(d => {
          const data = d.data() as any
          const repo: Project = {
            id: 0,
            name: data.repoName || d.id,
            description: data.description || '',
            topics: [],
            language: null,
            githubUrl: data.githubUrl || `https://github.com/Aditya-Chavan-dev/${data.repoName}`,
            liveUrl: null,
            stars: 0,
            createdAt: '',
            updatedAt: '',
            isFork: false
          }
          return {
            repo,
            featured: data.featured ?? false,
            order: data.order ?? 999,
          }
        })

        merged.sort((a, b) => {
          if (a.featured && !b.featured) return -1
          if (!a.featured && b.featured) return 1
          return a.order - b.order
        })
        setItems(merged)
      } catch (error) {
        console.error("Error in useAdminProjects:", error)
      } finally {
        setLoading(false)
      }
    })
    return () => unsub()
  }, [])

  async function toggleFeatured(repoName: string, current: boolean, order: number) {
    const ref = doc(db, 'projects', repoName)
    if (current) {
      await tracedWrite(`firestore/projects/delete/${repoName}`, () => deleteDoc(ref))
    } else {
      await tracedWrite(`firestore/projects/create/${repoName}`, () => 
        setDoc(ref, {
          repoName,
          featured: true,
          order,
          addedAt: serverTimestamp(),
        })
      )
    }
  }

  async function updateOrder(repoName: string, order: number) {
    await tracedWrite(`firestore/projects/updateOrder/${repoName}`, () => 
      setDoc(
        doc(db, 'projects', repoName),
        { order },
        { merge: true }
      )
    )
  }

  return { items, loading, toggleFeatured, updateOrder }
}
