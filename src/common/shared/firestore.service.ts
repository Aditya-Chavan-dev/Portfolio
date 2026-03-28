import {
  doc,
  getDoc,
  setDoc,
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  type Unsubscribe,
} from 'firebase/firestore'
import { db } from '@/common/lib/firebase'
import { tracedCall, tracedWrite } from '@/common/lib/metrics'
import type { WelcomeConfig } from '@/landing-page/landing.types'
import type { HubContent }             from '@/hub/hub.types'
import type { ProjectsContent }        from '@/quick-access/projects.types'
import type { TestimonialPageContent } from '@/testimonial/testimonial.types'
import type { PublicTestimonial }      from '@/common/types/testimonial.types'
import type { GitHubCache }            from '@/common/types/github.types'

// ─── Generic helper with timeout ───────────────────────────────────────────

const FIRESTORE_TIMEOUT_MS = 5_000

function withTimeout<T>(promise: Promise<T>, ms = FIRESTORE_TIMEOUT_MS): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) =>
      setTimeout(() => reject(new Error('Firestore request timed out')), ms)
    ),
  ])
}

async function getLiveDoc<T>(page: string): Promise<T | null> {
  const snap = await tracedCall(`firestore/live/${page}`, () => 
    withTimeout(getDoc(doc(db, 'live', page)))
  )
  return snap.exists() ? (snap.data() as T) : null
}

async function getConfigDoc<T>(config: string): Promise<T | null> {
  const snap = await tracedCall(`firestore/config/${config}`, () => 
    withTimeout(getDoc(doc(db, 'adminConfig', config)))
  )
  return snap.exists() ? (snap.data() as T) : null
}

// ─── Page content reads — each maps to one Firestore document ─────────────

export const getWelcomeContent         = (): Promise<WelcomeConfig | null>         => getLiveDoc('welcome')
export const getWelcomeConfig          = (): Promise<WelcomeConfig | null>         => getConfigDoc('welcomeScreen')

export async function updateWelcomeConfig(data: WelcomeConfig): Promise<void> {
  await tracedWrite('firestore/updateWelcomeConfig', () => 
    setDoc(doc(db, 'adminConfig', 'welcomeScreen'), data)
  )
}

export const getHubContent             = (): Promise<HubContent | null>             => getLiveDoc('hub')
export const getProjectsContent        = (): Promise<ProjectsContent | null>        => getLiveDoc('projects')
export const getTestimonialPageContent = (): Promise<TestimonialPageContent | null> => getLiveDoc('testimonial')
export const getNotFoundContent        = (): Promise<{ heading: string; body: string; backLabel: string } | null> => getLiveDoc('notFound')

// ─── Testimonials — real-time, approved only ──────────────────────────────
// Requires composite index: (status ASC, approvedAt DESC)

export function subscribeToApprovedTestimonials(
  callback: (items: PublicTestimonial[]) => void,
  onError?: (error: Error) => void
): Unsubscribe {
  const q = query(
    collection(db, 'testimonials'),
    where('status', '==', 'approved'),
    orderBy('approvedAt', 'desc')
  )
  return onSnapshot(
    q,
    (snap) => {
      const items = snap.docs.map((d) => {
        const data = d.data()
        const { email: _email, ...publicData } = data
        return { id: d.id, ...publicData } as PublicTestimonial
      })
      callback(items)
    },
    (error) => {
      console.error('Testimonials subscription error:', error)
      onError?.(error)
    }
  )
}

// ─── GitHub cache ──────────────────────────────────────────────────────────

export async function getGitHubCache(): Promise<GitHubCache | null> {
  const snap = await tracedCall('firestore/cache/github', () => 
    withTimeout(getDoc(doc(db, 'cache', 'github')))
  )
  return snap.exists() ? (snap.data() as GitHubCache) : null
}

export async function setGitHubCache(data: GitHubCache): Promise<void> {
  await tracedWrite('firestore/cache/github', () => 
    setDoc(doc(db, 'cache', 'github'), data)
  )
}



