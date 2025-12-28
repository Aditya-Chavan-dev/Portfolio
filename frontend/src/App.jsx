import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import EntryGate from './components/EntryGate';
import SessionHandshake from './components/SessionHandshake';
import HeroDashboard from './components/hero/HeroDashboard';

// PHASE CONSTANTS
const PHASE_ENTRY = 0;
const PHASE_HANDSHAKE = 1;
const PHASE_DASHBOARD = 2;

function App() {
    const [phase, setPhase] = useState(PHASE_ENTRY);

    const startSession = () => {
        setPhase(PHASE_HANDSHAKE);
    };

    const enterDashboard = () => {
        setPhase(PHASE_DASHBOARD);
    };

    return (
        <div className="text-[var(--color-text-primary)] font-sans">
            <AnimatePresence mode="wait">

                {phase === PHASE_ENTRY && (
                    <motion.div
                        key="entry"
                        exit={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
                        transition={{ duration: 0.5 }}
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
                    >
                        <HeroDashboard />
                    </motion.div>
                )}

            </AnimatePresence>
        </div>
    );
}

export default App;
