import React, { useState, useEffect } from 'react';
import { auth, db } from '../services/firebase';
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
import { ref, onValue, off } from 'firebase/database';

// --- UTILS for Human Readability ---
const timeAgo = (timestamp) => {
    if (!timestamp) return 'Unknown';
    const seconds = Math.floor((Date.now() - timestamp) / 1000);
    if (seconds < 60) return `${seconds}s ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
};

const formatDuration = (ms) => {
    if (!ms) return '0s';
    const sec = Math.floor(ms / 1000);
    const min = Math.floor(sec / 60);
    return min > 0 ? `${min}m ${sec % 60}s` : `${sec}s`;
};

const EVENT_LABELS = {
    'session_start': '🌟 LANDED ON SITE',
    'hook_enter': '🔓 ENTERED PORTFOLIO',
    'connection_test_click': '📡 TESTED BACKEND',
    'connection_test_result': '📡 RESULT RECEIVED',
    'scroll_bottom': '📜 REACHED BOTTOM'
};

const getEventColor = (evt) => {
    if (evt === 'hook_enter') return '#64ffda'; // Green (Success)
    if (evt === 'session_start') return '#fff';
    if (evt === 'connection_test_result' && evt.error) return '#ff5555'; // Red (Error)
    return '#8892b0'; // Muted Blue/Grey
};

function MetricConsole() {
    const [user, setUser] = useState(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [sessions, setSessions] = useState({});
    const [selectedId, setSelectedId] = useState(null);

    // Auth & Data Listeners
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, setUser);
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        if (!user) return;
        const analyticsRef = ref(db, 'analytics/sessions');
        const listener = onValue(analyticsRef, (snapshot) => {
            setSessions(snapshot.exists() ? snapshot.val() : {});
        });
        return () => off(analyticsRef, 'value', listener);
    }, [user]);

    const handleLogin = async (e) => {
        e.preventDefault();
        try { await signInWithEmailAndPassword(auth, email, password); }
        catch (err) { setError("Access Denied: " + err.message); }
    };

    // --- VIEW LOGIC ---
    if (!user) return <LoginScreen email={email} setEmail={setEmail} pass={password} setPass={setPassword} login={handleLogin} error={error} />;

    const sessionList = Object.entries(sessions)
        .map(([id, data]) => ({ id, ...data }))
        .sort((a, b) => b.last_active - a.last_active); // Newest first

    const activeSession = sessionList.find(s => s.id === selectedId) || sessionList[0];

    return (
        <div className="dashboard-root">
            <style>{`
                /* DASHBOARD LAYOUT */
                .dashboard-root {
                    height: 100vh;
                    display: grid;
                    grid-template-columns: 350px 1fr;
                    background: #0a192f;
                    color: #ccd6f6;
                    font-family: 'Inter', system-ui, sans-serif;
                    overflow: hidden;
                }
                
                /* SIDEBAR (Session List) */
                .sidebar {
                    border-right: 1px solid #233554;
                    display: flex;
                    flex-direction: column;
                    background: #020c1b;
                }
                .sidebar-header {
                    padding: 1.5rem;
                    border-bottom: 1px solid #233554;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                .sidebar-header h2 { font-size: 14px; letter-spacing: 1px; color: #64ffda; margin: 0; }
                .logout-btn { background: none; border: 1px solid #64ffda; color: #64ffda; padding: 4px 12px; font-size: 10px; cursor: pointer; }
                
                .session-list {
                    flex: 1;
                    overflow-y: auto;
                }
                .session-item {
                    padding: 1rem 1.5rem;
                    border-bottom: 1px solid #112240;
                    cursor: pointer;
                    transition: background 0.2s;
                }
                .session-item:hover { background: #112240; }
                .session-item.active { background: #112240; border-left: 3px solid #64ffda; }
                
                .sess-id { font-family: monospace; font-size: 12px; color: #8892b0; margin-bottom: 4px; display: block; }
                .sess-meta { font-size: 11px; display: flex; justify-content: space-between; color: #5aa; }
                
                /* MAIN PANEL (Analysis) */
                .main-panel {
                    display: flex;
                    flex-direction: column;
                    height: 100vh;
                    overflow-y: auto;
                    background: #0a192f;
                }
                
                .empty-state {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    height: 100%;
                    color: #8892b0;
                }

                /* HERO METRICS */
                .hero-metrics {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 1rem;
                    padding: 2rem;
                    background: #112240;
                    border-bottom: 1px solid #233554;
                }
                .metric-box { text-align: center; }
                .metric-val { font-size: 24px; color: #e6f1ff; font-weight: 600; }
                .metric-label { font-size: 11px; color: #64ffda; text-transform: uppercase; letter-spacing: 1px; margin-top: 5px; }

                /* TIMELINE */
                .timeline-container {
                    padding: 2rem;
                    flex: 1;
                }
                .timeline-header {
                    font-size: 13px;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                    color: #8892b0;
                    margin-bottom: 1.5rem;
                    padding-bottom: 0.5rem;
                    border-bottom: 1px solid #233554;
                }
                
                .timeline-item {
                    display: flex;
                    gap: 1rem;
                    margin-bottom: 1.5rem;
                    position: relative;
                }
                .timeline-item:not(:last-child)::after {
                    content: '';
                    position: absolute;
                    left: 6px;
                    top: 20px;
                    bottom: -20px;
                    width: 1px;
                    background: #233554;
                }
                .t-dot {
                    width: 13px;
                    height: 13px;
                    border-radius: 50%;
                    background: #0a192f;
                    border: 2px solid #64ffda;
                    margin-top: 4px;
                    z-index: 2;
                }
                .t-content { flex: 1; }
                .t-time { font-family: monospace; font-size: 11px; color: #64ffda; margin-bottom: 4px; }
                .t-title { font-size: 14px; color: #e6f1ff; font-weight: 500; margin-bottom: 4px; }
                .t-details { font-size: 12px; color: #8892b0; background: #112240; padding: 8px; border-radius: 4px; display: inline-block; font-family: monospace; }

            `}</style>

            {/* SIDEBAR */}
            <div className="sidebar">
                <div className="sidebar-header">
                    <h2>LIVE TRAFFIC ({sessionList.length})</h2>
                    <button onClick={() => signOut(auth)} className="logout-btn">EXIT</button>
                </div>
                <div className="session-list">
                    {sessionList.map(s => {
                        const eventCount = s.events ? Object.keys(s.events).length : 0;
                        const isSelected = activeSession && activeSession.id === s.id;
                        return (
                            <div
                                key={s.id}
                                className={`session-item ${isSelected ? 'active' : ''}`}
                                onClick={() => setSelectedId(s.id)}
                            >
                                <span className="sess-id">VISITOR #{s.id.substr(5, 4).toUpperCase()}</span>
                                <div className="sess-meta">
                                    <span>{timeAgo(s.last_active)}</span>
                                    <span>{eventCount} Acts</span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* MAIN PANEL */}
            <div className="main-panel">
                {activeSession ? (
                    <SessionDetail session={activeSession} />
                ) : (
                    <div className="empty-state">Select a session to analyze</div>
                )}
            </div>
        </div>
    );
}

function SessionDetail({ session }) {
    if (!session || !session.events) return <div className="empty-state">No events recorded for this session.</div>;

    const events = Object.values(session.events).sort((a, b) => a.timestamp - b.timestamp);
    const start = events[0];
    const end = events[events.length - 1];

    // Calculate "Reaction Time" (Time to Hook Enter)
    const hookEnterEvent = events.find(e => e.event === 'hook_enter');
    const reactionTime = hookEnterEvent
        ? formatDuration(hookEnterEvent.timestamp - start.timestamp)
        : 'Not yet';

    const journeyDuration = formatDuration(end.timestamp - start.timestamp);

    return (
        <>
            <div className="hero-metrics">
                <div className="metric-box">
                    <div className="metric-val">{reactionTime}</div>
                    <div className="metric-label">Unlock Speed</div>
                </div>
                <div className="metric-box">
                    <div className="metric-val">{events.length}</div>
                    <div className="metric-label">Actions Taken</div>
                </div>
                <div className="metric-box">
                    <div className="metric-val">{journeyDuration}</div>
                    <div className="metric-label">Total Duration</div>
                </div>
            </div>

            <div className="timeline-container">
                <div className="timeline-header">Forensic Timeline</div>
                {events.map((evt, idx) => {
                    const label = EVENT_LABELS[evt.event] || evt.event.toUpperCase();
                    const color = getEventColor(evt.event);
                    return (
                        <div key={idx} className="timeline-item">
                            <div className="t-dot" style={{ borderColor: color, backgroundColor: idx === events.length - 1 ? color : '#0a192f' }}></div>
                            <div className="t-content">
                                <div className="t-time">{new Date(evt.timestamp).toLocaleTimeString()} (+{idx > 0 ? formatDuration(evt.timestamp - events[0].timestamp) : '0s'})</div>
                                <div className="t-title" style={{ color: color }}>{label}</div>
                                {evt.screen && <div className="t-details">OS: {evt.userAgent?.split(')')[0]}) | Screen: {evt.screen}</div>}
                                {evt.status && <div className="t-details">Status: {evt.status} {evt.error && `(${evt.error})`}</div>}
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    );
}

function LoginScreen({ email, setEmail, pass, setPass, login, error }) {
    return (
        <div style={{ background: '#020c1b', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64ffda', fontFamily: 'monospace' }}>
            <div style={{ width: '300px', padding: '2rem', border: '1px solid #112240', background: '#0a192f' }}>
                <h2 style={{ fontSize: '14px', letterSpacing: '2px', textAlign: 'center', marginBottom: '2rem' }}>RESTRICTED ACCESS</h2>
                <form onSubmit={login}>
                    <input type="email" placeholder="ADMIN ID" value={email} onChange={e => setEmail(e.target.value)} style={{ width: '100%', background: '#112240', border: 'none', padding: '10px', color: 'white', marginBottom: '10px' }} />
                    <input type="password" placeholder="PASSPHRASE" value={pass} onChange={e => setPass(e.target.value)} style={{ width: '100%', background: '#112240', border: 'none', padding: '10px', color: 'white', marginBottom: '20px' }} />
                    <button type="submit" style={{ width: '100%', background: 'transparent', border: '1px solid #64ffda', color: '#64ffda', padding: '10px', cursor: 'pointer' }}>AUTHENTICATE</button>
                </form>
                {error && <p style={{ color: '#ff5555', fontSize: '11px', marginTop: '10px', textAlign: 'center' }}>{error}</p>}
            </div>
        </div>
    );
}

export default MetricConsole;
