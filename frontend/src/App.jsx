import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import EntryGate from './components/EntryGate';
import SessionHandshake from './components/SessionHandshake';
import HeroDashboard from './components/hero/HeroDashboard';
import ArchitectureDiagram from './components/hero/ArchitectureDiagram';

import GlobalStatsHUD from './components/GlobalStatsHUD';
import { initSession } from './services/tracking';

// PHASE CONSTANTS
const PHASE_ENTRY = 0;
const PHASE_HANDSHAKE = 1;
const PHASE_DASHBOARD = 2;

function App() {
    const [phase, setPhase] = useState(PHASE_ENTRY);
    const [sessionId, setSessionId] = useState(null);

    useEffect(() => {
        // Initialize Session on App Mount (Detects source & increments if new)
        const { sessionId } = initSession();
        setSessionId(sessionId);
    }, []);

    const startSession = () => {
        setPhase(PHASE_HANDSHAKE);
    };

    const enterDashboard = () => {
        setPhase(PHASE_DASHBOARD);
    };

    return (
        <div className="text-[var(--color-text-primary)] font-sans h-screen overflow-hidden">
            <GlobalStatsHUD sessionId={sessionId} />
            <AnimatePresence mode="wait">

                {phase === PHASE_ENTRY && (
                    <motion.div
                        key="entry"
                        exit={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
                        transition={{ duration: 0.5 }}
                        className="h-full w-full"
                    >
                        <EntryGate onUnlock={startSession} />
                    </motion.div>
                )}

                {phase === PHASE_HANDSHAKE && (
                    <motion.div
                        key="handshake"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="h-full w-full"
                    >
                        <SessionHandshake onComplete={enterDashboard} />
                    </motion.div>
                )}

                {phase === PHASE_DASHBOARD && (
                    <motion.div
                        key="dashboard"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        className="h-full w-full overflow-y-auto overflow-x-hidden bg-[var(--color-bg-deep)]"
                    >
                        <HeroDashboard />

                        {/* Architecture Section - Separate Flow */}
                        <div className="w-full py-20 px-4 flex flex-col items-center justify-center relative min-h-[80vh]">
                            <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-bg-deep)] to-black/80 pointer-events-none" />

                            <div className="relative z-10 text-center mb-16">
                                <h2 className="text-[var(--color-accent-blue)] font-mono text-xs tracking-[0.3em] uppercase mb-4 opacity-80">System Architecture</h2>
                                <h3 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">
                                    Neural Network
                                </h3>
                            </div>

                            <ArchitectureDiagram />
                        </div>
                    </motion.div>
                )}

            </AnimatePresence>
        </div>
    );
}

export default App;
