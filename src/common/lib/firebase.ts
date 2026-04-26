import { initializeApp, getApps, getApp, type FirebaseApp, setLogLevel } from 'firebase/app';
import { initializeFirestore, getFirestore, persistentLocalCache, persistentMultipleTabManager, type Firestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getDatabase } from 'firebase/database';

// Silence internal transport warnings
setLogLevel('error');

const firebaseConfig = {
  apiKey:            import.meta.env.VITE_FIREBASE_API_KEY            as string,
  authDomain:        import.meta.env.VITE_FIREBASE_AUTH_DOMAIN        as string,
  databaseURL:       import.meta.env.VITE_FIREBASE_DATABASE_URL       as string,
  projectId:         import.meta.env.VITE_FIREBASE_PROJECT_ID         as string,
  storageBucket:     import.meta.env.VITE_FIREBASE_STORAGE_BUCKET     as string,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID as string,
  appId:             import.meta.env.VITE_FIREBASE_APP_ID             as string,
};

// ─── App Singleton ───────────────────────────────────────────────────────────
const app: FirebaseApp = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// ─── Firestore Singleton ──────────────────────────────────────────────────────
let dbInstance: Firestore;
try {
  dbInstance = initializeFirestore(app, {
    experimentalForceLongPolling: true,
    cache: persistentLocalCache({
      tabManager: persistentMultipleTabManager()
    })
  } as any);
} catch (e) {
  dbInstance = getFirestore(app);
}

export const db      = dbInstance;
export const auth    = getAuth(app);
export const storage = getStorage(app);
export const rtdb    = getDatabase(app);

export default app;
