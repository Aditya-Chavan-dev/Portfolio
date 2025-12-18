import { useState } from 'react'
import HookPage from './components/HookPage'
import SystemDashboard from './components/SystemDashboard'
import './index.css'

/**
 * FIRST PRINCIPLE: Deliberate Entry Flow
 * We don't just dump the user into content.
 * We establish a mindset first via the HookPage, then reveal the System.
 */
function App() {
    const [view, setView] = useState('hook')

    return (
        <div className="app-root">
            {view === 'hook' ? (
                <HookPage onEnter={() => setView('dashboard')} />
            ) : (
                <SystemDashboard />
            )}
        </div>
    )
}

export default App


