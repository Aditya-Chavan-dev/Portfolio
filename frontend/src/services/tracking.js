import { getDatabase, ref, runTransaction, onValue } from "firebase/database";
import { app } from "./firebase"; // Using the exported app from your existing file

const db = getDatabase(app);

// --- Constants ---
const SESSION_STORAGE_KEY = "PORTFOLIO_SESSION_ID";
const SOURCE_KEYS = {
    LINKEDIN: 'linkedin',
    RESUME: 'resume',
    ANONYMOUS: 'anonymous'
};

/**
 * Detects the visitor source based on URL params or referrer.
 * @returns {string} one of 'linkedin', 'resume', or 'anonymous'
 */
const detectSource = () => {
    const params = new URLSearchParams(window.location.search);
    const refParam = params.get('ref');

    if (refParam) {
        if (refParam.toLowerCase().includes('linkedin')) return SOURCE_KEYS.LINKEDIN;
        if (refParam.toLowerCase().includes('resume')) return SOURCE_KEYS.RESUME;
    }

    const referrer = document.referrer;
    if (referrer) {
        if (referrer.toLowerCase().includes('linkedin.com')) return SOURCE_KEYS.LINKEDIN;
    }

    return SOURCE_KEYS.ANONYMOUS;
};

/**
 * Generates a military-style session ID (e.g., "SEC-9A2-X1")
 */
const generateSessionID = () => {
    const segment = () => Math.floor(Math.random() * 16).toString(16).toUpperCase();
    return `SEC-${segment()}${segment()}${segment()}-${segment()}${segment()}`;
};

/**
 * Initializes the user session. 
 * Increments the counter ONLY if this is a new browser session.
 */
export const initSession = () => {
    const params = new URLSearchParams(window.location.search);
    const forceNew = params.get('force') === 'true';
    const hasRef = params.has('ref');

    // 1. Check if session exists (unless forced)
    // Standard Behavior: If session exists (even if ref is present), we resume it.
    // This prevents "Refresh Inflation". Closing the tab clears session, so re-opening counts as new.

    let sessionId = sessionStorage.getItem(SESSION_STORAGE_KEY);
    const source = detectSource();

    if (sessionId && !forceNew) {
        console.log(`[TRACKING] Resuming Session: ${sessionId}`);
        return { sessionId, isNew: false };
    }

    // 2. New Session (or Forced/Ref-based)
    sessionId = generateSessionID();

    sessionStorage.setItem(SESSION_STORAGE_KEY, sessionId);
    console.log(`[TRACKING] New Session Initialized: ${sessionId} | Source: ${source}`);

    // 3. Increment Counter in Firebase (Transaction)
    const countRef = ref(db, `sources/${source}`);

    runTransaction(countRef, (currentCount) => {
        // Initialize if null
        return (currentCount || 0) + 1;
    }).then(() => {
        console.log(`[TRACKING] SUCCESS: Incremented ${source} count.`);
    }).catch((err) => {
        console.error("[TRACKING] CRITICAL ERROR: Failed to increment count", err);
        // Alert on mobile for visibility
        if (window.innerWidth < 768) {
            console.error("Mobile Tracking Error: " + err.message);
        }
    });

    return { sessionId, isNew: true, source };
};

/**
 * Subscribes to the live counts.
 * @param {function} callback - Receives an object { linkedin, resume, anonymous }
 * @returns {function} unsubscribe function
 */
export const subscribeToVisits = (callback) => {
    const sourcesRef = ref(db, 'sources');

    const unsubscribe = onValue(sourcesRef, (snapshot) => {
        const data = snapshot.val() || {};
        // Ensure defaults
        const cleanData = {
            [SOURCE_KEYS.LINKEDIN]: data[SOURCE_KEYS.LINKEDIN] || 0,
            [SOURCE_KEYS.RESUME]: data[SOURCE_KEYS.RESUME] || 0,
            [SOURCE_KEYS.ANONYMOUS]: data[SOURCE_KEYS.ANONYMOUS] || 0
        };
        callback(cleanData);
    });

    return unsubscribe;
};
