import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import EntryGate from './components/EntryGate';
import SessionHandshake from './components/SessionHandshake';

import GlobalStatsHUD from './components/GlobalStatsHUD';
import { initSession } from './services/tracking';

// PHASE CONSTANTS
const PHASE_ENTRY = 0;
const PHASE_HANDSHAKE = 1;

function App() {
    const [phase, setPhase] = useState(PHASE_ENTRY);
    const [sessionId, setSessionId] = useState(null);

    useEffect(() => {
        // Initialize Session on App Mount
        const { sessionId } = initSession();
        setSessionId(sessionId);
    }, []);

    const startSession = () => {
        setPhase(PHASE_HANDSHAKE);
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
                        className="h-full w-full"
                    >
                        <SessionHandshake onComplete={() => { }} />
                    </motion.div>
                )}

            </AnimatePresence>
        </div>
    );
}

export default App;
