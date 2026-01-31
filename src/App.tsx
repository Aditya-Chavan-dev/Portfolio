import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { LandingPage } from './LandingPage';
import { HeroSection } from './HeroSection';
import { TransitionLoader } from './components/TransitionLoader';

const App: React.FC = () => {
    const [showHero, setShowHero] = useState(false);
    const [showLoader, setShowLoader] = useState(false);

    const handleStartJourney = () => {
        console.log('Starting Immersive Journey...');
        // TODO: Navigate to Immersive Journey section
    };

    const handleEnterFromLanding = () => {
        setShowLoader(true);
    };

    const handleLoaderComplete = () => {
        setShowLoader(false);
        setShowHero(true);
    };

    return (
        <main className="w-full min-h-screen">
            <AnimatePresence mode="wait">
                {!showHero && !showLoader && (
                    <LandingPage key="landing" onEnter={handleEnterFromLanding} />
                )}
                {showLoader && (
                    <TransitionLoader key="loader" onComplete={handleLoaderComplete} />
                )}
                {showHero && !showLoader && (
                    <HeroSection key="hero" onStartJourney={handleStartJourney} />
                )}
            </AnimatePresence>
        </main>
    );
};

export default App;

