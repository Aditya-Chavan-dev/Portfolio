import { initializeApp, getApps, type FirebaseApp, setLogLevel } from 'firebase/app';
import { initializeFirestore, persistentLocalCache, persistentMultipleTabManager } from 'firebase/firestore';
import { initializeAppCheck, ReCaptchaEnterpriseProvider } from 'firebase/app-check';

// Silence internal transport warnings during network flickers
setLogLevel('error');
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey:            import.meta.env.VITE_FIREBASE_API_KEY            as string,
  authDomain:        import.meta.env.VITE_FIREBASE_AUTH_DOMAIN        as string,
  databaseURL:       import.meta.env.VITE_FIREBASE_DATABASE_URL       as string,
  projectId:         import.meta.env.VITE_FIREBASE_PROJECT_ID         as string,
  storageBucket:     import.meta.env.VITE_FIREBASE_STORAGE_BUCKET     as string,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID as string,
  appId:             import.meta.env.VITE_FIREBASE_APP_ID             as string,
};

const app: FirebaseApp = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Initialize App Check with defensive logic and Debug Mode support
if (typeof window !== 'undefined') {
  const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;
  const isDebug = import.meta.env.DEV || import.meta.env.VITE_APP_CHECK_DEBUG === 'true';
  const isValidKey = siteKey && siteKey !== 'your_site_key_here' && siteKey.length > 10;

  if (isDebug || isValidKey) {
    // Enable debug token for local development
    if (isDebug) {
      if (!(self as any).FIREBASE_APPCHECK_DEBUG_TOKEN) {
        (self as any).FIREBASE_APPCHECK_DEBUG_TOKEN = true;
      }
      console.info('Firebase App Check: Debug Mode Enabled. Copy the token from the console below and add it to the Firebase Console (App Check > Manage Debug Tokens).');
    }

    try {
      initializeAppCheck(app, {
        provider: new ReCaptchaEnterpriseProvider(siteKey as string),
        isTokenAutoRefreshEnabled: true,
      });
    } catch (err) {
      // Catch "already initialized" errors in HMR
      console.debug('App Check already initialized or failed safely:', err);
    }
  } else {
    console.warn('Firebase App Check: Bypassing initialization due to missing or invalid VITE_RECAPTCHA_SITE_KEY.');
  }
}

// Intentional: experimentalForceLongPolling options not fully typed in FirestoreSettings
export const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
  cache: persistentLocalCache({
    tabManager: persistentMultipleTabManager()
  })
} as any);

export const auth = getAuth(app);
export const storage = getStorage(app);
export const rtdb = getDatabase(app);

export default app;


