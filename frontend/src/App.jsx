import { useState } from 'react'
import HookPage from './components/HookPage'
import SystemDashboard from './components/SystemDashboard'
import api from './services/api'
import { telemetry } from './services/telemetry'
import './index.css'

function App() {
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

export default App



