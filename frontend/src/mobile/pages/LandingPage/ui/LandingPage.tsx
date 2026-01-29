import { HeroSection } from '@mobile/widgets/HeroSection/ui/HeroSection';

export const LandingPage = () => {
    return (
        <main className="w-full min-h-screen bg-[#020617] overflow-x-hidden">
            <HeroSection />
            {/* Mobile-specific sections will be added here */}
        </main>
    );
};
