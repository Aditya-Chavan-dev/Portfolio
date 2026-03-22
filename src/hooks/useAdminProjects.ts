import { useEffect, useState } from 'react'
import {
  collection, onSnapshot, doc,
  setDoc, deleteDoc, serverTimestamp
} from 'firebase/firestore'
import { db } from '../shared/firebase'
import { fetchAllRepos } from '../lib/github'
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
    const unsub = onSnapshot(collection(db, 'projects'), async snapshot => {
      try {
        const firestoreMap = new Map(
          snapshot.docs.map(d => [d.id, d.data()])
        )
        const allRepos = await fetchAllRepos()
        const merged: AdminProject[] = allRepos.map(repo => {
          const fs = firestoreMap.get(repo.name) as any
          return {
            repo,
            featured: fs?.featured ?? false,
            order: fs?.order ?? 999,
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
      await deleteDoc(ref)
    } else {
      await setDoc(ref, {
        repoName,
        featured: true,
        order,
        addedAt: serverTimestamp(),
      })
    }
  }

  async function updateOrder(repoName: string, order: number) {
    await setDoc(
      doc(db, 'projects', repoName),
      { order },
      { merge: true }
    )
  }

  return { items, loading, toggleFeatured, updateOrder }
}
