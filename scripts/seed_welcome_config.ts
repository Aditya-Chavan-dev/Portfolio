import 'dotenv/config'
import { initializeApp } from 'firebase/app'
import { getFirestore, doc, setDoc } from 'firebase/firestore'
import welcomeContent from '../src/landing-page/content.json'

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

async function seed() {
  console.log('Pushing updated dialogue to adminConfig/welcomeScreen...')
  const payload = {
    name: welcomeContent.name,
    dialogue: welcomeContent.dialogue,
    highlightIndex: welcomeContent.highlightIndex,
  }
  await setDoc(doc(db, 'adminConfig', 'welcomeScreen'), payload)
  console.log('✓ Seeded adminConfig/welcomeScreen successfully.')
  process.exit(0)
}

seed().catch((err) => {
  console.error('Seed failed:', err)
  process.exit(1)
})
