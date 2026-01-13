import api from "./api";

const SESSION_STORAGE_KEY = "PORTFOLIO_SESSION_ID";

// --- CLIENT-SIDE LOGIC (Session Management) ---

/**
 * Generates a military-style session ID (e.g., "SEC-9A2")
 */
const generateSessionID = () => {
    const segment = () => Math.floor(Math.random() * 16).toString(16).toUpperCase();
    return `SEC-${segment()}${segment()}${segment()}`;
};

/**
 * Initializes the user session and tracks the visit source.
 * IDEMPOTENCY: Managed by sessionStorage (Browser) + IP Rate Limit (Backend).
 */
export const initSession = async () => {
    // 1. Check if session exists (Prevent refresh-counting)
    let sessionId = sessionStorage.getItem(SESSION_STORAGE_KEY);

    if (sessionId) {
        return { sessionId, isNew: false };
    }

    // 2. New Session
    sessionId = generateSessionID();
    sessionStorage.setItem(SESSION_STORAGE_KEY, sessionId);

    // 3. Detect Source
    const params = new URLSearchParams(window.location.search);
    const refParam = params.get('ref') || '';
    const referrer = document.referrer || '';

    let source = 'anonymous';
    if (refParam.includes('linkedin') || referrer.includes('linkedin.com')) source = 'linkedin';
    else if (refParam.includes('resume')) source = 'resume';

    // 4. FIRE & FORGET (Non-Blocking)
    // We don't await this because the user shouldn't wait for "Tracking" to load.
    trackMetric('sources', source);

    return { sessionId, isNew: true, source };
};

// --- SECURITY: THE WRITE PATH (Proxied) ---

/**
 * Sends a tracking event to the Backend Guard.
 * @param {string} type - 'sources' or 'paths'
 * @param {string} field - e.g., 'linkedin', 'immersive'
 */
export const trackMetric = async (type, field) => {
    try {
        await api.post('/metrics/track', { type, field });
        console.log(`[TRACKING] Sent ${type}/${field} to Guard.`);
    } catch (error) {
        console.warn("[TRACKING] Failed to send metric (AdBlocker?):", error);
        // Fail silently. Do not annoy the user.
    }
};

// --- SECURITY: THE READ PATH (SWR Ready) ---

/**
 * Fetches the specific "Truth" from the Backend.
 */
export const fetchMetrics = async () => {
    try {
        const response = await api.get('/metrics/stats');
        return response.data;
    } catch (error) {
        // Fail silently - backend may be sleeping (Render free tier)
        // Return null to signal "Keep using Last Known Good"
        return null;
    }
};
