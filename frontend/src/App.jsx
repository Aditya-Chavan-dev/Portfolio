import { useState, Suspense, lazy } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import HookPage from './components/HookPage'
import SystemDashboard from './components/SystemDashboard'
import api from './services/api'
import { telemetry } from './services/telemetry'
import './index.css'

// Lazy Load the Console so it's NOT in the main bundle (Recruiters never download it)
const MetricConsole = lazy(() => import('./components/MetricConsole'));

// The Public Portfolio Component
function Portfolio() {
    const [view, setView] = useState('hook')

    const handleEnter = () => {
        // Explicitly trigger a backend wake-up call when the user interacts
        api.get('/ping').catch(() => { });

        // Track the conversion
        telemetry.logEvent('hook_enter');

        setView('dashboard');
    }

    return (
        <div className="app-root">
            {view === 'hook' ? (
                <HookPage onEnter={handleEnter} />
            ) : (
                <SystemDashboard />
            )}
        </div>
    )
}

// The Main Router
function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Portfolio />} />
                <Route
                    path="/console"
                    element={
                        <Suspense fallback={<div style={{ color: '#0f0', background: '#000', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'monospace' }}>INITIALIZING SYSTEM...</div>}>
                            <MetricConsole />
                        </Suspense>
                    }
                />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App;
