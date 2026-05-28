import { useState, useEffect } from 'react'
import { collection, getDocs, query, QueryConstraint } from 'firebase/firestore'
import { db } from '@/common/lib/firebase'

export function useFirestoreCollection<T>(
  collectionName: string,
  fallbackData: T[],
  queryConstraints: QueryConstraint[] = []
) {
  const [data, setData] = useState<T[]>(fallbackData)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true
    async function load() {
      try {
        const ref = collection(db, collectionName)
        const q = query(ref, ...queryConstraints)
        const querySnapshot = await getDocs(q)
        const items = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as unknown as T))
        
        if (items && items.length > 0 && active) {
          setData(items)
        }
      } catch (err) {
        console.error(`[useFirestoreCollection] Failed to fetch collection "${collectionName}":`, err)
      } finally {
        if (active) {
          setLoading(false)
        }
      }
    }
    load()
    return () => { active = false }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [collectionName])

  return { data, loading }
}
