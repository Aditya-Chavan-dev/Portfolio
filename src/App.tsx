import React, { useState } from 'react';
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';
import { LandingPage } from './LandingPage';
import { HeroSection } from './HeroSection';
import { ImmersiveJourney } from './ImmersiveJourney/ImmersiveJourney';
import { Project } from './QuickNavigation/Project/Project';
import { AboutMe } from './QuickNavigation/AboutMe/AboutMe';
import { ProfessionalExperience } from './QuickNavigation/ProfessionalExperience/ProfessionalExperience';
import { Certifications } from './QuickNavigation/Certifications/Certifications';
import { TransitionLoader } from './components/TransitionLoader';
import { QuickNavLayout } from './QuickNavigation/QuickNavLayout';
import { ErrorBoundary } from './components/ErrorBoundary';
import { initPerformanceMonitoring } from './utils/performanceMonitoring';
import { safeLocalStorage } from './utils/safeStorage';
import { logger } from './utils/logger';

// Valid view states to prevent navigation to invalid pages
type ViewType = 'LANDING' | 'HERO' | 'IMMERSIVE' | 'PROJECTS' | 'ABOUT' | 'EXPERIENCE' | 'CERTIFICATION';
const VALID_VIEWS: ViewType[] = ['LANDING', 'HERO', 'IMMERSIVE', 'PROJECTS', 'ABOUT', 'EXPERIENCE', 'CERTIFICATION'];

/**
 * Helper: Validates if saved view state is valid
 */
function isValidView(view: unknown): view is ViewType {
    return typeof view === 'string' && VALID_VIEWS.includes(view as ViewType);
}

// Initialize performance monitoring in production
if (import.meta.env.PROD) {
    initPerformanceMonitoring();
}

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
    // Lazy initialization to read persisted view synchronously before any effects run
    const [view, setView] = useState<ViewState>(() => {
        const result = safeLocalStorage.getItem<string>('portfolio_view_state');

        if (result.success && result.data && isValidView(result.data)) {
            return result.data;
        }
        return 'LANDING';
    });
    const [showLoader, setShowLoader] = useState(false);

    // Persist view state (with error handling)
    React.useEffect(() => {
        const result = safeLocalStorage.setItem('portfolio_view_state', view);

        // Optional: Log failure in development for debugging
        if (!result.success) {
            logger.warn('[App] Failed to save view state:', result.error);
        }
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
            default: logger.warn(`Unknown destination: ${destination}`);
        }
    };

    const handleStartJourney = () => {
        setView('IMMERSIVE');
    };

    const handleBackToHero = () => {
        setView('HERO');
    };

    return (
        <ErrorBoundary>
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

                        {/* 4. Immersive Journey */}
                        {view === 'IMMERSIVE' && (
                            <ImmersiveJourney key="immersive" onBack={handleBackToHero} />
                        )}

                        {/* 5. Sub-Sections (Persistent Layout) */}
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
        </ErrorBoundary>
    );
};

export default App;
