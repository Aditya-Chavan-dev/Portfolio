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

                    {/* 4. Sub-Sections */}
                    {view === 'IMMERSIVE' && (
                        <ImmersiveJourney key="immersive" onBack={handleBackToHero} />
                    )}

                    {view === 'PROJECTS' && (
                        <div key="projects" className="fixed inset-0 z-50 overflow-auto bg-obsidian">
                            <button onClick={handleBackToHero} className="fixed top-4 left-4 z-[60] px-4 py-2 bg-black/50 text-gold-glow border border-gold-glow/30 rounded backdrop-blur-md hover:bg-gold-glow hover:text-black transition-colors">
                                ← Back
                            </button>
                            <Project />
                        </div>
                    )}

                    {view === 'ABOUT' && (
                        <div key="about" className="fixed inset-0 z-50 overflow-auto bg-obsidian">
                            <AboutMe onNavigate={handleNavigate} />
                        </div>
                    )}

                    {view === 'EXPERIENCE' && (
                        <div key="experience" className="fixed inset-0 z-50 overflow-auto bg-obsidian">
                            <button onClick={handleBackToHero} className="fixed top-4 left-4 z-[60] px-4 py-2 bg-black/50 text-gold-glow border border-gold-glow/30 rounded backdrop-blur-md hover:bg-gold-glow hover:text-black transition-colors">
                                ← Back
                            </button>
                            <ProfessionalExperience />
                        </div>
                    )}

                    {view === 'CERTIFICATION' && (
                        <div key="certification" className="fixed inset-0 z-50 overflow-auto bg-obsidian">
                            <button onClick={handleBackToHero} className="fixed top-4 left-4 z-[60] px-4 py-2 bg-black/50 text-gold-glow border border-gold-glow/30 rounded backdrop-blur-md hover:bg-gold-glow hover:text-black transition-colors">
                                ← Back
                            </button>
                            <Certifications />
                        </div>
                    )}
                </AnimatePresence>
            </LayoutGroup>
        </main>
    );
};

export default App;

