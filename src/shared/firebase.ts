import { initializeApp, getApps, type FirebaseApp } from 'firebase/app'
import { getDatabase } from 'firebase/database'
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey:            import.meta.env.VITE_FIREBASE_API_KEY            as string,
  authDomain:        import.meta.env.VITE_FIREBASE_AUTH_DOMAIN        as string,
  databaseURL:       import.meta.env.VITE_FIREBASE_DATABASE_URL       as string,
  projectId:         import.meta.env.VITE_FIREBASE_PROJECT_ID         as string,
  storageBucket:     import.meta.env.VITE_FIREBASE_STORAGE_BUCKET     as string,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID as string,
  appId:             import.meta.env.VITE_FIREBASE_APP_ID             as string,
}

// Prevent duplicate initialization in Vite HMR
import { initializeFirestore, persistentLocalCache, persistentMultipleTabManager } from 'firebase/firestore'
import { initializeAppCheck, ReCaptchaEnterpriseProvider } from 'firebase/app-check'

const app: FirebaseApp =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0]

// Initialize App Check (Invisible Shield)
if (import.meta.env.PROD) {
  initializeAppCheck(app, {
    provider: new ReCaptchaEnterpriseProvider(import.meta.env.VITE_RECAPTCHA_SITE_KEY as string),
    isTokenAutoRefreshEnabled: true
  });
}

export const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
  cache: persistentLocalCache({
    tabManager: persistentMultipleTabManager()
  })
} as any)
export const rtdb    = getDatabase(app)
export const auth    = getAuth(app)
export const storage = getStorage(app)
export default app
