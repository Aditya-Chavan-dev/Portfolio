
import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import EntryGate from './components/EntryGate';
import SessionHandshake from './components/SessionHandshake';
import JourneyHub from './components/JourneyHub';
import HeroDashboard from './components/hero/HeroDashboard';

import { initSession } from './services/tracking';
import { GitHubService } from './services/github';
import config from './portfolio.config';

// System Core (Lazy Loaded for Security & Perf)
const AuthGate = React.lazy(() => import('@nexus/AuthGate'));
const SystemRoot = React.lazy(() => import('@nexus/SystemRoot'));

// PHASE CONSTANTS
const PHASE_ENTRY = 0;
const PHASE_HANDSHAKE = 1;
const PHASE_HUB = 2; // Was JOURNEY
const PHASE_STORY = 3; // New Immersive Phase
const PHASE_DASHBOARD = 4;
const PHASE_SYSTEM = 100; // New Isolated Phase

import LiveNavbar from './components/ui/LiveNavbar';
import TacticalHUD from './components/ui/TacticalHUD';
import SystemCheck from './components/ui/SystemCheck';

function App() {
    const [phase, setPhase] = useState(PHASE_ENTRY);
    const [sessionId, setSessionId] = useState(null);
    const [heroMetrics, setHeroMetrics] = useState(null);
    const [showSystemCheck, setShowSystemCheck] = useState(false);



    useEffect(() => {
        // Check for Install Route
        if (window.location.pathname === '/nexus') {
            setPhase(PHASE_SYSTEM);
        } else {
            // "Seen It" Memory
            const hasSeenIntro = localStorage.getItem('HAS_SEEN_INTRO');
            if (hasSeenIntro) {
                setPhase(PHASE_HUB);
            }
        }

        // Initialize Session on App Mount
        const { sessionId } = initSession();
        setSessionId(sessionId);
        const syncTruth = async () => {
            // 2. Initialize Session (Idempotent)
            const { sessionId: newSessionId } = await initSession();
            setSessionId(newSessionId);

            // 3. GitHub Stats (Smart Cache)
            const ghStats = await GitHubService.getSmartStats();

            setHeroMetrics(prev => {
                const newState = {
                    ...prev,
                    ...ghStats,
                    loc: ghStats?.loc,
                    repos: ghStats?.repos,
                    streak: ghStats?.streak,
                    stack: ghStats?.stack || config.hero.stack
                };

                // 5. CACHE: Update the local truth
                localStorage.setItem('METRICS_CACHE', JSON.stringify(newState));
                return newState;
            });
        };

        // Initial Fetch
        syncTruth();

        // POLL: Update GitHub stats every 5 minutes
        const intervalId = setInterval(syncTruth, 5 * 60 * 1000);

        return () => clearInterval(intervalId);
    }, []);

    const startSession = () => {
        setPhase(PHASE_HANDSHAKE);
    };

    const handleHubSelection = (selection) => {


        if (selection === 'RESUME') {
            const link = document.createElement('a');
            link.href = '/resume.pdf';
            link.download = 'Aditya_Chavan_Resume.pdf';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            return;
        }

        if (selection === 'STORY') {
            setPhase(PHASE_STORY);
            return;
        }

        // Quick Access - Map to Dashboard for now
        setPhase(PHASE_DASHBOARD);
    };

    if (phase === PHASE_SYSTEM) {
        return (
            <React.Suspense fallback={
                <div className="h-screen w-full bg-black flex items-center justify-center font-mono text-cyan-500">
                    <span className="animate-pulse tracking-widest">LOADING SECURE SHELL...</span>
                </div>
            }>
                <AuthGate>
                    <SystemRoot />
                </AuthGate>
            </React.Suspense>
        );
    }

    return (
        <div className="text-[var(--color-text-primary)] font-sans h-screen flex flex-col overflow-hidden bg-black font-hitmarker relative">
            {/* Global Scanlines */}
            <div className="fixed inset-0 pointer-events-none z-[150] bg-scanlines opacity-[0.03]" />

            {/* Tactical HUD Layers */}
            {phase >= PHASE_HUB && <TacticalHUD />}

            {/* System Check Animation Overlay */}
            <AnimatePresence>
                {showSystemCheck && (
                    <SystemCheck
                        onComplete={() => {
                            setShowSystemCheck(false);
                            setPhase(PHASE_HUB);
                        }}
                    />
                )}
            </AnimatePresence>

            {/* 1. Global Tactical Navbar (Hub onwards) */}
            <AnimatePresence>
                {phase >= PHASE_HUB && (
                    <motion.div
                        initial={{ y: -60 }}
                        animate={{ y: 0 }}
                        exit={{ y: -60 }}
                        className="w-full flex-shrink-0"
                    >
                        <LiveNavbar />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* 2. Main Content Area */}
            <div className="flex-1 relative w-full overflow-hidden">
                <AnimatePresence mode="wait">

                    {phase === PHASE_ENTRY && (
                        <motion.div
                            key="entry"
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.8 }}
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
                            <SessionHandshake onComplete={() => {
                                localStorage.setItem('HAS_SEEN_INTRO', 'true');
                                setShowSystemCheck(true);
                            }} />
                        </motion.div>
                    )}

                    {phase === PHASE_HUB && (
                        <motion.div
                            key="hub"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.1 }}
                            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                            className="h-full w-full"
                        >
                            <JourneyHub onSelection={handleHubSelection} />
                        </motion.div>
                    )}

                    {phase === PHASE_STORY && (
                        <motion.div
                            key="story"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="h-full w-full flex items-center justify-center bg-black text-white"
                        >
                            {/* Placeholder for Story Mode */}
                            <div className="text-center">
                                <h1 className="text-4xl font-bold mb-4 uppercase tracking-tighter">Immersive Journey Initialized</h1>
                                <p className="text-cyan-400 font-mono mb-8 animate-pulse">Loading narrative modules...</p>
                                <button
                                    onClick={() => setPhase(PHASE_HUB)}
                                    className="px-8 py-3 border border-cyan-500/20 text-cyan-500 hover:bg-cyan-500/10 transition-colors uppercase font-mono text-xs tracking-widest"
                                >
                                    [ ABORT / RETURN TO HUB ]
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {phase === PHASE_DASHBOARD && (
                        <motion.div
                            key="dashboard"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="h-full w-full overflow-y-auto overflow-x-hidden bg-[var(--color-bg-deep)]"
                        >
                            <HeroDashboard onInitiate={() => { }} metrics={heroMetrics || {}} />
                        </motion.div>
                    )}

                </AnimatePresence>
            </div>
        </div>
    );
}

export default App;
