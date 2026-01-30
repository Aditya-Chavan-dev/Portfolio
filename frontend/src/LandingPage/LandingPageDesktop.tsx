import { HeroSection } from '@/HeroSection/HeroSection';
import { OpeningSequenceDesktop } from './OpeningSequenceDesktop';
import { AnimatedBackground } from '@/Background/AnimatedBackground';
import { AboutMe, Project, ProfessionalExperience, Certifications } from '@/QuickNavigation';
import { useState } from 'react';

export const LandingPageDesktop = () => {
    const [introComplete, setIntroComplete] = useState(false);

    return (
        <main className="relative w-full min-h-screen bg-[#020617] overflow-x-hidden">
            {/* Global Background */}
            <div className="fixed inset-0 z-0">
                <AnimatedBackground />
            </div>

            {/* Content Logic */}
            {!introComplete ? (
                <OpeningSequenceDesktop onComplete={() => setIntroComplete(true)} />
            ) : (
                <div className="relative z-10">
                    <HeroSection />
                    <AboutMe />
                    <Project />
                    <ProfessionalExperience />
                    <Certifications />
                </div>
            )}
        </main>
    );
};
