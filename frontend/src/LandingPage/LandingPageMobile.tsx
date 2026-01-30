import { HeroSection } from '@/HeroSection/HeroSection';
import { OpeningSequenceMobile } from './OpeningSequenceMobile';
import { AnimatedBackground } from '@/Background/AnimatedBackground';
import { AboutMe, Project, ProfessionalExperience, Certifications } from '@/QuickNavigation';
import { useState } from 'react';

export const LandingPageMobile = () => {
    const [introComplete, setIntroComplete] = useState(false);

    return (
        <main className="relative w-full min-h-screen bg-[#020617] overflow-x-hidden">
            {!introComplete ? (
                <OpeningSequenceMobile onComplete={() => setIntroComplete(true)} />
            ) : (
                <div className="relative z-10">
                    <HeroSection />
                    <AboutMe />
                    <Project />
                    <ProfessionalExperience />
                    <Certifications />
                </div>
            )}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <AnimatedBackground />
            </div>
        </main>
    );
};
