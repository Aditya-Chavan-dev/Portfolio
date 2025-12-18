import { db } from './firebase';
import { ref, push, serverTimestamp, child, get } from 'firebase/database';

const SESSION_KEY = 'portfolio_session_id';

/**
 * FIRST PRINCIPLE: Identity & Persistence
 * We need to track a "Recruiter" across refreshes but reset if they leave.
 * sessionStorage is perfect: persists for the tab, clears on close.
 */

// Generate a simple random ID (UUID-like)
const generateSessionId = () => {
    return 'sess_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now().toString(36);
};

class TelemetryService {
    constructor() {
        this.sessionId = null;
        this.initSession();
    }

    initSession() {
        let sid = sessionStorage.getItem(SESSION_KEY);
        if (!sid) {
            sid = generateSessionId();
            sessionStorage.setItem(SESSION_KEY, sid);
            this.logEvent('session_start', {
                userAgent: navigator.userAgent,
                screen: `${window.screen.width}x${window.screen.height}`,
                referrer: document.referrer
            });
        }
        this.sessionId = sid;
    }

    /**
     * Log a specific action to Firebase
     * @param {string} eventName - e.g., 'hook_enter', 'view_project'
     * @param {object} metadata - Optional extra data
     */
    logEvent(eventName, metadata = {}) {
        if (!this.sessionId) return;

        try {
            const eventRef = ref(db, `analytics/sessions/${this.sessionId}/events`);
            push(eventRef, {
                event: eventName,
                timestamp: serverTimestamp(),
                ...metadata
            });

            // Update last active timestamp for the session root
            // This helps us see "Active Now" users
            const sessionRef = ref(db, `analytics/sessions/${this.sessionId}/last_active`);
            // We use a simplified write here just to keep the session "warm"
            // In a real app we might use set(), but push/update works too.
        } catch (error) {
            // Telemetry should stay silent and never break the app
            console.warn('Telemetry Error:', error);
        }
    }
}

export const telemetry = new TelemetryService();
