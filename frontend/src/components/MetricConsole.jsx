import React, { useState, useEffect } from 'react';
import { auth, db } from '../services/firebase';
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
import { ref, onValue, off } from 'firebase/database';

function MetricConsole() {
    const [user, setUser] = useState(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [sessions, setSessions] = useState({});

    // Auth Listener
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, []);

    // Data Listener (Only active when logged in)
    useEffect(() => {
        if (!user) return;

        const analyticsRef = ref(db, 'analytics/sessions');
        const listener = onValue(analyticsRef, (snapshot) => {
            if (snapshot.exists()) {
                setSessions(snapshot.val());
            } else {
                setSessions({});
            }
        }, (err) => {
            console.error("Analytics Read Error:", err);
            setError("Access Denied: You do not have permission to view stats.");
        });

        return () => off(analyticsRef, 'value', listener);
    }, [user]);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (err) {
            setError("Login Failed: " + err.message);
        }
    };

    const handleLogout = () => signOut(auth);

    // --- RENDER: LOGIN SCREEN ---
    if (!user) {
        return (
            <div className="console-login">
                <style>{`
                    .console-login {
                        height: 100vh;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        background: #000;
                        color: #0f0;
                        font-family: monospace;
                    }
                    .login-box {
                        border: 1px solid #333;
                        padding: 2rem;
                        background: #111;
                    }
                    input {
                        display: block;
                        margin-bottom: 1rem;
                        padding: 0.5rem;
                        width: 100%;
                        background: #000;
                        border: 1px solid #333;
                        color: #fff;
                    }
                    button {
                        width: 100%;
                        padding: 0.5rem;
                        background: #006600;
                        color: #fff;
                        border: none;
                        cursor: pointer;
                    }
                    button:hover { background: #008800; }
                `}</style>
                <div className="login-box">
                    <h2 style={{ marginBottom: '1rem', textTransform: 'uppercase' }}>System Access</h2>
                    <form onSubmit={handleLogin}>
                        <input
                            type="email"
                            placeholder="Admin Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button type="submit">AUTHENTICATE</button>
                    </form>
                    {error && <p style={{ color: 'red', marginTop: '1rem' }}>{error}</p>}
                </div>
            </div>
        );
    }

    // --- RENDER: ADMIN DASHBOARD ---

    // Process Data
    const sessionList = Object.entries(sessions).map(([id, data]) => ({ id, ...data }));
    const totalSessions = sessionList.length;
    const activeSessions = sessionList.filter(s => {
        // Simple "Active" Logic: Last Event was < 5 mins ago? (Approx)
        // For now, let's just count total. Real "Active" requires heartbeat timestamp.
        return true;
    }).length;

    // Calculate "Hook Conversion"
    const conversions = sessionList.filter(s =>
        s.events && Object.values(s.events).some(e => e.event === 'hook_enter')
    ).length;

    return (
        <div className="console-dashboard">
            <style>{`
                .console-dashboard {
                    min-height: 100vh;
                    background: #050505;
                    color: #ccc;
                    font-family: 'Courier New', monospace;
                    padding: 2rem;
                }
                .metric-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                    gap: 1rem;
                    margin-bottom: 2rem;
                }
                .metric-card {
                    background: #111;
                    border: 1px solid #333;
                    padding: 1.5rem;
                    text-align: center;
                }
                .metric-val {
                    font-size: 2.5rem;
                    color: #64ffda;
                    margin-bottom: 0.5rem;
                }
                .metric-label {
                    font-size: 0.8rem;
                    text-transform: uppercase;
                    letter-spacing: 0.1em;
                }
                .session-log {
                    background: #111;
                    border: 1px solid #333;
                    padding: 1rem;
                    height: 400px;
                    overflow-y: auto;
                }
                .log-item {
                    border-bottom: 1px solid #222;
                    padding: 0.5rem 0;
                    display: flex;
                    justify-content: space-between;
                    font-size: 0.85rem;
                }
                .header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 2rem;
                    border-bottom: 1px solid #333;
                    padding-bottom: 1rem;
                }
            `}</style>

            <div className="header">
                <h1>METRIC CONSOLE</h1>
                <button onClick={handleLogout} style={{ background: '#333', color: '#fff', border: 'none', padding: '0.5rem 1rem' }}>LOGOUT</button>
            </div>

            <div className="metric-grid">
                <div className="metric-card">
                    <div className="metric-val">{totalSessions}</div>
                    <div className="metric-label">Total Sessions</div>
                </div>
                <div className="metric-card">
                    <div className="metric-val">{conversions}</div>
                    <div className="metric-label">Systems Entered</div>
                </div>
                <div className="metric-card">
                    <div className="metric-val">{((conversions / (totalSessions || 1)) * 100).toFixed(1)}%</div>
                    <div className="metric-label">Conversion Rate</div>
                </div>
                <div className="metric-card">
                    <div className="metric-val">0</div>
                    <div className="metric-label">Errors</div>
                </div>
            </div>

            <h3>LIVE FEED</h3>
            <div className="session-log">
                {sessionList.reverse().map(session => (
                    <div key={session.id} className="log-item">
                        <span>{session.id}</span>
                        <span style={{ color: session.events && Object.values(session.events).some(e => e.event === 'hook_enter') ? '#64ffda' : '#666' }}>
                            {session.events ? Object.values(session.events).length : 0} Events
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MetricConsole;
