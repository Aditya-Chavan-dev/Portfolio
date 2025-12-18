import { useState, useEffect } from 'react'
import api from '../services/api'
import { db } from '../services/firebase'
import { ref, onValue } from 'firebase/database'

/**
 * FIRST PRINCIPLE: Separation of Concerns
 * This component is dedicated solely to testing and displaying connection status.
 * This keeps the main App component clean and focused on layout/navigation.
 */
function ConnectionTester() {
    const [backendStatus, setBackendStatus] = useState(null)
    const [firebaseData, setFirebaseData] = useState(null)
    const [loading, setLoading] = useState(false)

    // 1. Silent Pre-emptive Wake-up (Render Free Tier)
    useEffect(() => {
        /**
         * FIRST PRINCIPLE: Anticipating Platform Behavior
         * Render's free tier sleeps. We wake it up pre-emptively without blocking the UI.
         */
        api.get('/ping').catch(() => {
            // Silently ignore ping errors - it's just a background wake-up call
        });
    }, []);

    // 2. Real-time Database Subscription
    useEffect(() => {
        /**
         * FIRST PRINCIPLE: Event-driven Data
         * We subscribe to changes in Firebase rather than polling manually.
         */
        const testRef = ref(db, 'test/message');
        const unsubscribe = onValue(testRef, (snapshot) => {
            const data = snapshot.val();
            setFirebaseData(data);
        }, (error) => {
            console.error("Firebase Read Error:", error);
            setFirebaseData({ error: error.message });
        });

        // Cleanup subscription on unmount to prevent memory leaks
        return () => unsubscribe();
    }, []);

    // 3. Manual Backend Connectivity Check
    const checkBackend = async () => {
        setLoading(true);
        try {
            const response = await api.get('/test');
            setBackendStatus(response.data);
        } catch (error) {
            console.error("Backend Error:", error);
            setBackendStatus({ status: 'error', message: error.message });
        }
        setLoading(false);
    }

    return (
        <div className="connection-tester">
            <div className="status-box">
                <h2>Backend Connection</h2>
                <button onClick={checkBackend} disabled={loading}>
                    {loading ? 'Connecting...' : 'Test /api/test'}
                </button>
                {backendStatus && (
                    <div style={{ marginTop: '10px', textAlign: 'left' }}>
                        <pre>{JSON.stringify(backendStatus, null, 2)}</pre>
                    </div>
                )}
            </div>

            <div className="status-box">
                <h2>Firebase RTDB Connection</h2>
                <p>Listening to <code>/test/message</code>...</p>
                <div style={{ marginTop: '10px', textAlign: 'left' }}>
                    {firebaseData ? (
                        <pre>{JSON.stringify(firebaseData, null, 2)}</pre>
                    ) : (
                        <span className="loading">Waiting for data...</span>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ConnectionTester
