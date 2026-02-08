import { initializeApp, type FirebaseApp } from 'firebase/app';
import { getDatabase, type Database } from 'firebase/database';
import { logger } from '@/utils/logger';

/**
 * Required Firebase environment variables
 */
const REQUIRED_ENV_VARS = [
    'VITE_FIREBASE_API_KEY',
    'VITE_FIREBASE_AUTH_DOMAIN',
    'VITE_FIREBASE_DATABASE_URL',
    'VITE_FIREBASE_PROJECT_ID',
    'VITE_FIREBASE_STORAGE_BUCKET',
    'VITE_FIREBASE_MESSAGING_SENDER_ID',
    'VITE_FIREBASE_APP_ID'
] as const;

/**
 * Validates that all required Firebase environment variables are present and non-empty
 * 
 * @throws Error if any required variables are missing or empty
 */
function validateFirebaseEnvironment(): void {
    const missing: string[] = [];

    REQUIRED_ENV_VARS.forEach(key => {
        const value = import.meta.env[key];

        // Check if undefined, null, or empty string
        if (!value || (typeof value === 'string' && value.trim() === '')) {
            missing.push(key);
        }
    });

    if (missing.length > 0) {
        const errorMsg = `Missing required Firebase environment variables: ${missing.join(', ')}`;

        // In production, show user-friendly error
        if (import.meta.env.PROD) {
            logger.error('[Firebase] Configuration error:', errorMsg);
            throw new Error('Application configuration error. Please contact support.');
        }

        // In development, show detailed error for debugging
        logger.error('[Firebase] Configuration error:', errorMsg);
        logger.error('[Firebase] Please ensure all required environment variables are set in your .env file');
        logger.error('[Firebase] See .env.example for the required variables');
        throw new Error(errorMsg);
    }

    logger.log('[Firebase] ✓ Environment validation passed');
}

// Validate environment before initialization
validateFirebaseEnvironment();

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY!,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN!,
    databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL!,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID!,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET!,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID!,
    appId: import.meta.env.VITE_FIREBASE_APP_ID!
};

// Initialize Firebase (only if validation passed)
export const app: FirebaseApp = initializeApp(firebaseConfig);
export const database: Database = getDatabase(app);

// Development-only success log
logger.log('[Firebase] ✓ Successfully initialized');
