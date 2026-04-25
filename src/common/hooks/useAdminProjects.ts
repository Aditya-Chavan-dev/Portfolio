import { useEffect, useState } from 'react'
import {
  collection, onSnapshot, doc,
  setDoc, deleteDoc, updateDoc,
  serverTimestamp, query, orderBy,
  type UpdateData
} from 'firebase/firestore'
import { db } from '../lib/firebase'
import { tracedWrite } from '../lib/metrics'
import { ProjectEntry } from '../types/content.types'

export function useAdminProjects() {
  const [items, setItems] = useState<ProjectEntry[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const q = query(collection(db, 'projects'), orderBy('order', 'asc'))
    const unsub = onSnapshot(q, snapshot => {
      try {
        const projects = snapshot.docs.map(d => ({
          id: d.id,
          ...d.data()
        } as ProjectEntry))
        setItems(projects)
      } catch (error) {
        console.error("Error in useAdminProjects:", error)
      } finally {
        setLoading(false)
      }
    })
    return () => unsub()
  }, [])

  async function addProject(project: Partial<ProjectEntry>) {
    const id = project.title?.toLowerCase().replace(/\s+/g, '-') || Date.now().toString()
    const ref = doc(db, 'projects', id)
    await tracedWrite(`firestore/projects/create/${id}`, () => 
      setDoc(ref, {
        ...project,
        id,
        featured: project.featured ?? false,
        order: project.order ?? items.length,
        createdAt: new Date().toISOString()
      })
    )
  }

  async function updateProject(id: string, updates: Partial<ProjectEntry>) {
    const ref = doc(db, 'projects', id)
    await tracedWrite(`firestore/projects/update/${id}`, () => 
      updateDoc(ref, updates as UpdateData<ProjectEntry>)
    )
  }

  async function deleteProject(id: string) {
    const ref = doc(db, 'projects', id)
    await tracedWrite(`firestore/projects/delete/${id}`, () => 
      deleteDoc(ref)
    )
  }

  async function updateOrder(items: ProjectEntry[]) {
    // Local update first for snappy UI
    setItems(items)
    for (let i = 0; i < items.length; i++) {
       if (items[i].id) {
         await updateDoc(doc(db, 'projects', items[i].id!), { order: i })
       }
    }
  }

  return { items, loading, addProject, updateProject, deleteProject, updateOrder }
}
