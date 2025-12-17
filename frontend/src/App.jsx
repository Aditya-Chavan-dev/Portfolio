import { useState, useEffect } from 'react'
import api from './services/api'
import { db } from './services/firebase'
import { ref, onValue } from 'firebase/database'
import './index.css'

function App() {
    const [backendStatus, setBackendStatus] = useState(null)
    const [firebaseData, setFirebaseData] = useState(null)
    const [loading, setLoading] = useState(false)

    // 1. Test Firebase RTDB Connection
    useEffect(() => {
        const testRef = ref(db, 'test/message');
        const unsubscribe = onValue(testRef, (snapshot) => {
            const data = snapshot.val();
            setFirebaseData(data);
        }, (error) => {
            console.error("Firebase Read Error:", error);
            setFirebaseData({ error: error.message });
        });

        return () => unsubscribe();
    }, []);

    // 2. Test Backend API Connection
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
        <>
            <h1>Portfolio Skeleton</h1>
            <p className="success">Everything is working! Frontend is running.</p>

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
        </>
    )
}

export default App
