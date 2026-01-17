
import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
const EntryGate = React.lazy(() => import('./features/auth/EntryGate'));
const CinematicIntro = React.lazy(() => import('./features/auth/CinematicIntro'));
const JourneyHub = React.lazy(() => import('./features/journey/JourneyHub'));
const ProjectsView = React.lazy(() => import('./features/projects/ProjectsView'));
const HeroDashboard = React.lazy(() => import('./features/hero/components/HeroDashboard'));
const TechNexus = React.lazy(() => import('./features/projects/TechNexus')); // Lazy Load Global Overlay

import { initSession } from './services/tracking';
import { GitHubService } from './services/github';
import config from './portfolio.config';

// PHASE CONSTANTS
export const PHASE_ENTRY = 0;
export const PHASE_HANDSHAKE = 1;
export const PHASE_HUB = 2; // Was JOURNEY
export const PHASE_STORY = 3;
export const PHASE_DASHBOARD = 4;
export const PHASE_PROJECTS = 5;

import LiveNavbar from './shared/ui/LiveNavbar';
import TacticalHUD from './shared/ui/TacticalHUD';
import SystemCheck from './shared/ui/SystemCheck';

import SafeZone from './shared/ui/SafeZone';
import SystemLoader from './features/system/SystemLoader';

function App() {
    // Deep Linking Logic
    const [initialProjectName] = useState(() => {
        const params = new URLSearchParams(window.location.search);
        return params.get('project');
    });

    const [phase, setPhase] = useState(() => {
        try {
            const params = new URLSearchParams(window.location.search);
            if (params.get('project')) return PHASE_PROJECTS;

            // Persistence: Check LocalStorage V2
            const savedPhase = localStorage.getItem('APP_PHASE_V2');
            if (import.meta.env.DEV) console.log("Restoring Phase:", savedPhase);
            if (savedPhase && savedPhase !== 'undefined' && savedPhase !== 'null') {
                return parseInt(savedPhase, 10);
            }
        } catch (e) {
            console.error("State Restore Error:", e);
        }
        return PHASE_ENTRY;
    });

    // Persist Phase Changes
    useEffect(() => {
        try {
            localStorage.setItem('APP_PHASE_V2', phase);
        } catch (e) { console.error("Persist Error:", e); }
    }, [phase]);

    const [sessionId, setSessionId] = useState(null);
    const [heroMetrics, setHeroMetrics] = useState({
        loc: config.hero.metrics.loc.value,
        repos: 0,
        streak: config.hero.metrics.streak.value,
        stack: config.hero.stack
    });
    const [showSystemCheck, setShowSystemCheck] = useState(false);

    const [projects, setProjects] = useState([]); // Global Project Data

    useEffect(() => {
        // Initialize Session on App Mount
        const { sessionId } = initSession();
        setSessionId(sessionId);
        const syncTruth = async () => {
            // 2. Initialize Session (Idempotent)
            const { sessionId: newSessionId } = await initSession();
            setSessionId(newSessionId);

            // 3. GitHub Stats (Smart Cache)
            const ghStats = await GitHubService.getSmartStats();

            setHeroMetrics(prev => ({
                ...prev,
                ...ghStats,
                loc: ghStats?.loc,
                repos: ghStats?.repos,
                streak: ghStats?.streak,
                stack: ghStats?.stack || config.hero.stack
            }));

            // 4. Fetch Projects Globally (for TechNexus & ProjectsView)
            const repoData = await GitHubService.getRepositories();
            setProjects(repoData || []);

            // 5. CACHE: Update the local truth
            localStorage.setItem('METRICS_CACHE_V3', JSON.stringify(ghStats));
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
            // UX Feedback: User needs to know something is happening
            const btn = document.activeElement;
            const originalText = btn ? btn.innerText : '';
            if (btn) btn.innerText = 'DOWNLOADING...';

            const link = document.createElement('a');
            link.href = '/resume.pdf';
            link.download = 'Aditya_Chavan_Resume.pdf';
            document.body.appendChild(link);

            // Artificial delay to ensure user sees the "Downloading" state
            setTimeout(() => {
                link.click();
                document.body.removeChild(link);
                if (btn) btn.innerText = originalText;
            }, 800);
            return;
        }

        if (selection === 'PROJECTS') {
            setPhase(PHASE_PROJECTS);
            return;
        }

        // Quick Access - Map to Dashboard for now
        setPhase(PHASE_DASHBOARD);
    };

    const [selectedTech, setSelectedTech] = useState(null);

    const handleTechClick = (techName) => {
        setSelectedTech(techName);
    };

    return (
        <div className="text-[var(--color-text-primary)] font-sans h-screen flex flex-col overflow-hidden bg-black font-hitmarker relative">
            {/* Global Scanlines */}
            <div className="fixed inset-0 pointer-events-none z-[150] bg-scanlines opacity-[0.03]" />

            {/* GLOBAL TECH NEXUS OVERLAY */}
            {/* Rendered at root level to ensure z-index dominance over all phases */}
            <React.Suspense fallback={null}>
                {selectedTech && (
                    <div className="fixed inset-0 z-[300] pointer-events-auto">
                        {/* We dynamically import TechNexus here to avoid circular dep issues if any, or just use the lazy component if we define it */}
                        {/* For now, assuming TechNexus isn't lazy loaded in App yet. Let's lazily load it or import it.
                            Review imports: TechNexus not imported in App.jsx. Adding import.
                         */}
                        <TechNexus
                            isOpen={!!selectedTech}
                            techName={selectedTech}
                        // We need to pass allProjects. Ideally App doesn't hold project data yet.
                        // Quick fix: TechNexus usually fetches or filters.
                        // WAIT: TechNexus needs `allProjects`. 
                        // App.jsx doesn't have `projects`. logic problem.
                        // Solution: TechNexus Option A scans *config* mostly, but looked at `allProjects` prop.
                        // Let's refactor TechNexus to be self-sufficient OR pass data up?
                        // Passing data up is hard.
                        // Better: Have TechNexus use the GitHubService cache or re-fetch?
                        // Actually, let's keep it simple: Pass `onTechClick` down, but `TechNexus` stays in `ProjectsView`?
                        // NO, user said "Stacking issue". Global is best.
                        // WE WILL IMPORT JSON DATA IN TECHNEXUS DIRECTLY if possible, or fetch in App.
                        />
                    </div>
                )}
            </React.Suspense>

    // ... wait, I need to check how to get `allProjects` in App.jsx.
            // GitHubService.getSmartStats() is there.
            // GitHubService.getRepositories() is what ProjectsView uses.
            // I should fetch projects in App.jsx or make TechNexus smart.
            // Let's make TechNexus smart? No, it takes `allProjects`.
            // Let's Load projects in App.jsx?
            // It might be better to just fix the z-index in ProjectsView if possible?
            // User requested "Fix the issue".
            // "Hero Display" issue: The overlay is inside ProjectsView, but maybe the user sees the *Dashboard* Hero?
            // If user clicks a tech stack in *ProjectsView*, they shouldn't see Dashboard.
            // Unless... `selectedTech` is clicked, but the view switches?
            // Ah, if I click "React" in `HeroDashboard` (if it had links), it would need global state.
            // `ProjectsView` has the data.

            // REVALIDATING PLAN:
            // If I move TechNexus to App.jsx, App.jsx needs the project list.
            // I can fetch it in App.jsx (since we arguably want it cached/global anyway).

            // MODIFYING PLAN IN FLIGHT:
            // 1. Add `allProjects` state to App.jsx.
            // 2. Fetch repos in App.jsx (cached).
            // 3. Pass `projects` to ProjectsView (avoid double fetch).
            // 4. Render TechNexus in App.jsx.

            // Let's do the easy parts first: Add imports.


            {/* GLOBAL TECH NEXUS OVERLAY */}
            {/* Rendered at root level to ensure z-index dominance over all phases */}
            <React.Suspense fallback={null}>
                {selectedTech && (
                    <div className="fixed inset-0 z-[300] pointer-events-auto">
                        <TechNexus
                            isOpen={!!selectedTech}
                            techName={selectedTech}
                            allProjects={projects}
                            onClose={() => setSelectedTech(null)}
                            onHub={() => {
                                setSelectedTech(null);
                                setPhase(PHASE_HUB);
                            }}
                        />
                    </div>
                )}
            </React.Suspense>

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
                        // Compact mode uses fixed positioning inside the component, so we don't need layout wrapper classes as much, 
                        // but we need to ensure z-index.
                        className="w-full flex-shrink-0"
                    >
                        <LiveNavbar compactMode={phase === PHASE_PROJECTS || phase === PHASE_STORY} />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* 2. Main Content Area */}
            <div className="flex-1 relative w-full overflow-hidden">
                <React.Suspense fallback={<SystemLoader />}>
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
                                <CinematicIntro onComplete={() => {
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
                                <SafeZone componentName="Command Hub">
                                    <JourneyHub onSelection={handleHubSelection} />
                                </SafeZone>
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
                                <SafeZone componentName="Hero Dashboard">
                                    <HeroDashboard onInitiate={() => { }} metrics={heroMetrics || {}} />
                                </SafeZone>
                            </motion.div>
                        )}

                        {phase === PHASE_PROJECTS && (
                            <motion.div
                                key="projects"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.5 }}
                                className="h-full w-full"
                            >
                                <SafeZone componentName="Projects System">
                                    <ProjectsView
                                        onBack={() => setPhase(PHASE_HUB)}
                                        initialProjectId={initialProjectName}
                                        onTechClick={handleTechClick}
                                        projects={projects} // Pass cached projects
                                    />
                                </SafeZone>
                            </motion.div>
                        )}

                    </AnimatePresence>
                </React.Suspense>
            </div>
        </div>
    );
}

export default App;
