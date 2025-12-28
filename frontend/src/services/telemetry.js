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
            sessionStorage.setItem('session_start_time', Date.now()); // Persist start time
            // Must set ID before logging so logEvent doesn't return early
            this.sessionId = sid;

            this.logEvent('session_start', {
                userAgent: navigator.userAgent,
                screen: `${window.screen.width}x${window.screen.height}`,
                referrer: document.referrer
            });

            // Increment detailed global counter
            this.incrementGlobalCounter();
        } else {
            this.sessionId = sid;
        }
    }

    incrementGlobalCounter() {
        // Increment a global counter for "Live Verified Sessions"
        // Using a transaction to ensure atomicity
        import('firebase/database').then(({ runTransaction, ref }) => {
            const counterRef = ref(db, 'analytics/total_sessions');
            runTransaction(counterRef, (currentValue) => {
                return (currentValue || 0) + 1;
            }).catch(err => console.error("Counter increment failed", err));
        });
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

            // Update last active timestamp
            const sessionRef = ref(db, `analytics/sessions/${this.sessionId}/last_active`);
            // We use a simplified write here just to keep the session "warm"
        } catch (error) {
            // Fail silently as requested
        }
    }
}

export const telemetry = new TelemetryService();
