// ─────────────────────────────────────────────────────────────────────────────
// ONE-TIME SEED SCRIPT
// Run:    npx tsx src/shared/seed.ts
// Effect: Pushes all content.json files to Firestore live/{page}
//
// ⚠️  NEVER import this file anywhere in the app.
// ⚠️  NEVER run this more than once unless intentionally resetting all content.
// ⚠️  After running, verify in Firebase Console that all live/{page} docs exist.
// ─────────────────────────────────────────────────────────────────────────────
import 'dotenv/config'
import { initializeApp } from 'firebase/app'
import { getFirestore, doc, setDoc } from 'firebase/firestore'

import welcomeContent    from '../landing-page/content.json'
import hubContent        from '../hub/content.json'
import projectsContent   from '../quick-access/projects/content.json'
import skillsContent     from '../quick-access/skills/content.json'
import experienceContent from '../quick-access/experience/content.json'
import testimonialContent from '../testimonial/content.json'
import notFoundContent   from '../not-found/content.json'

const app = initializeApp({
  apiKey:            process.env.VITE_FIREBASE_API_KEY,
  authDomain:        process.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL:       process.env.VITE_FIREBASE_DATABASE_URL,
  projectId:         process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket:     process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId:             process.env.VITE_FIREBASE_APP_ID,
})
const db = getFirestore(app)

const pages: Record<string, unknown> = {
  welcome:     welcomeContent,
  hub:         hubContent,
  projects:    projectsContent,
  skills:      skillsContent,
  experience:  experienceContent,
  testimonial: testimonialContent,
  notFound:    notFoundContent,
}

async function seed(): Promise<void> {
  console.log('Starting Firestore seed...\n')
  for (const [page, content] of Object.entries(pages)) {
    await setDoc(doc(db, 'live', page), content)
    console.log(`  ✓  live/${page}`)
  }
  console.log('\nSeed complete.')
  console.log('Firestore is now the live source of truth.')
  console.log('Do not run this script again unless intentionally resetting content.\n')
  process.exit(0)
}

seed().catch((err: unknown) => {
  console.error('Seed failed:', err)
  process.exit(1)
})
