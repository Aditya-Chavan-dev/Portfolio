import React, { useState } from 'react';
import { LandingPage } from './LandingPage';
// Placeholder import for HeroSection - assuming it exists or will be created
// import { HeroSection } from './HeroSection';

const HeroSectionPlaceholder = () => (
    <div className="h-screen w-full bg-neutral-900 text-white flex items-center justify-center">
        <h1 className="text-4xl">Hero Section (Coming Soon)</h1>
    </div>
);

const App: React.FC = () => {
    const [showHero, setShowHero] = useState(false);

    return (
        <main className="w-full min-h-screen">
            {!showHero ? (
                <LandingPage onEnter={() => setShowHero(true)} />
            ) : (
                <HeroSectionPlaceholder />
                // <HeroSection />
            )}
        </main>
    );
};

export default App;
