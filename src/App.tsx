import React, { useState } from 'react';
import { AnimatePresence, LayoutGroup } from 'framer-motion';
import { LandingPage } from './LandingPage';
import { HeroSection } from './HeroSection';
import { ImmersiveJourney } from './ImmersiveJourney/ImmersiveJourney';
import { Project } from './QuickNavigation/Project/Project';
import { AboutMe } from './QuickNavigation/AboutMe/AboutMe';
import { ProfessionalExperience } from './QuickNavigation/ProfessionalExperience/ProfessionalExperience';
import { Certifications } from './QuickNavigation/Certifications/Certifications';
import { TransitionLoader } from './components/TransitionLoader';
import { QuickNavLayout } from './QuickNavigation/QuickNavLayout';
import { motion } from 'framer-motion';

// Define the valid view states
type ViewState =
    | 'LANDING'
    | 'HERO'
    | 'IMMERSIVE'
    | 'PROJECTS'
    | 'ABOUT'
    | 'EXPERIENCE'
    | 'CERTIFICATION';

const App: React.FC = () => {
    const [view, setView] = useState<ViewState>(() => {
        const savedView = localStorage.getItem('portfolio_view_state');
        return (savedView as ViewState) || 'LANDING';
    });
    const [showLoader, setShowLoader] = useState(false);

    // Persist view state
    React.useEffect(() => {
        localStorage.setItem('portfolio_view_state', view);
    }, [view]);

    // Initial Entry from Landing Page
    const handleEnterFromLanding = () => {
        setShowLoader(true);
    };

    const handleLoaderComplete = () => {
        setShowLoader(false);
        setView('HERO');
    };

    // Navigation Handlers
    const handleNavigate = (destination: string) => {
        // Map ID strings to ViewStates
        switch (destination) {
            case 'hero': setView('HERO'); break;
            case 'projects': setView('PROJECTS'); break;
            case 'about': setView('ABOUT'); break;
            case 'experience': setView('EXPERIENCE'); break;
            case 'certification': setView('CERTIFICATION'); break;
            default: console.warn(`Unknown destination: ${destination}`);
        }
    };

    const handleStartJourney = () => {
        setView('IMMERSIVE');
    };

    const handleBackToHero = () => {
        setView('HERO');
    };

    return (
        <main className="w-full min-h-screen bg-obsidian text-primary">
            <LayoutGroup>
                <AnimatePresence mode="popLayout">
                    {/* 1. Landing Page */}
                    {view === 'LANDING' && !showLoader && (
                        <LandingPage key="landing" onEnter={handleEnterFromLanding} />
                    )}

                    {/* 2. Transition Loader */}
                    {showLoader && (
                        <TransitionLoader key="loader" onComplete={handleLoaderComplete} />
                    )}

                    {/* 3. Hero Section (Hub) */}
                    {view === 'HERO' && (
                        <HeroSection
                            key="hero"
                            onStartJourney={handleStartJourney}
                            onNavigate={handleNavigate}
                        />
                    )}

                    {/* 4. Sub-Sections (Persistent Layout) */}
                    {(view === 'PROJECTS' || view === 'ABOUT' || view === 'EXPERIENCE' || view === 'CERTIFICATION') && (
                        <motion.div
                            key="quick-nav"
                            className="fixed inset-0 z-50 overflow-hidden bg-obsidian"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <QuickNavLayout
                                activeSection={
                                    view === 'PROJECTS' ? 'projects' :
                                        view === 'ABOUT' ? 'about' :
                                            view === 'EXPERIENCE' ? 'experience' :
                                                'certification'
                                }
                                onNavigate={handleNavigate}
                            >
                                {view === 'PROJECTS' && <Project onNavigate={handleNavigate} />}
                                {view === 'ABOUT' && <AboutMe onNavigate={handleNavigate} />}
                                {view === 'EXPERIENCE' && <ProfessionalExperience onNavigate={handleNavigate} />}
                                {view === 'CERTIFICATION' && <Certifications onNavigate={handleNavigate} />}
                            </QuickNavLayout>
                        </motion.div>
                    )}
                </AnimatePresence>
            </LayoutGroup>
        </main>
    );
};

export default App;

