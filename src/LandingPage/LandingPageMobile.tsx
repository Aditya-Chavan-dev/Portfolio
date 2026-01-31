import { HeroSection } from '@/HeroSection/HeroSection';
import { OpeningSequenceMobile } from './OpeningSequenceMobile';
import { AnimatedBackground } from '@/Background/AnimatedBackground';
import { AboutMe, Project, ProfessionalExperience, Certifications } from '@/QuickNavigation';
import { ImmersiveJourney } from '@/ImmersiveJourney/ImmersiveJourney';
import { useState } from 'react';

export const LandingPageMobile = () => {
    const [introComplete, setIntroComplete] = useState(false);
    const [journeyActive, setJourneyActive] = useState(false);

    if (journeyActive) {
        return <ImmersiveJourney />;
    }

    return (
        <main className="relative w-full min-h-screen bg-[#020617] overflow-x-hidden">
            {!introComplete ? (
                <OpeningSequenceMobile onComplete={() => setIntroComplete(true)} />
            ) : (
                <div className="relative z-10">
                    <HeroSection onStartJourney={() => setJourneyActive(true)} />
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
