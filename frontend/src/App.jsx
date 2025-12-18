import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import HookPage from './components/HookPage'
import SystemDashboard from './components/SystemDashboard'
import MetricConsole from './components/MetricConsole'
import api from './services/api'
import { telemetry } from './services/telemetry'
import './index.css'

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
                <Route path="/console" element={<MetricConsole />} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
