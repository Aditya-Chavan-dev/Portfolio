import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import EntryGate from './components/EntryGate';
import SessionHandshake from './components/SessionHandshake';
import HeroDashboard from './components/hero/HeroDashboard';
import ArchitectureDiagram from './components/hero/ArchitectureDiagram';
import SystemBreach from './components/SystemBreach';

import GlobalStatsHUD from './components/GlobalStatsHUD';
import { initSession } from './services/tracking';

// PHASE CONSTANTS
const PHASE_ENTRY = 0;
const PHASE_HANDSHAKE = 1;
const PHASE_DASHBOARD = 2;
const PHASE_TRANSITION = 3;
const PHASE_ARCHITECTURE = 4;

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
                        exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
                        transition={{ duration: 0.8 }}
                        className="h-full w-full overflow-y-auto overflow-x-hidden bg-[var(--color-bg-deep)]"
                    >
                        <HeroDashboard onInitiate={() => setPhase(PHASE_TRANSITION)} />
                    </motion.div>
                )}

                {phase === PHASE_TRANSITION && (
                    <SystemBreach onComplete={() => setPhase(PHASE_ARCHITECTURE)} />
                )}

                {phase === PHASE_ARCHITECTURE && (
                    <motion.div
                        key="architecture"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1 }}
                        className="h-full w-full overflow-y-auto overflow-x-hidden bg-[var(--color-bg-deep)] flex flex-col items-center justify-center p-4 md:p-10"
                    >
                        <div className="text-center mb-12">
                            <h2 className="text-[var(--color-accent-blue)] font-mono text-xs tracking-[0.3em] uppercase mb-4 opacity-80 animate-pulse">// SYSTEM_CORE_EXPOSED</h2>
                            <h3 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">
                                Neural Network
                            </h3>
                        </div>
                        <ArchitectureDiagram />
                    </motion.div>
                )}

            </AnimatePresence>
        </div>
    );
}

export default App;
