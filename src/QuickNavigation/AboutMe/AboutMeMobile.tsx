import { Education } from './components/Education';
import { TechStack } from './components/TechStack';
import { GithubHeatmap } from './components/GithubHeatmap';
import { ProfileHorizontal } from './components/ProfileHorizontal';
import { ArrowLeft } from 'lucide-react';

interface AboutMeMobileProps {
    onBack?: () => void;
}

export const AboutMeMobile = ({ onBack }: AboutMeMobileProps) => {
    return (
        <section className="min-h-screen w-full bg-obsidian pb-24 relative overflow-x-hidden">

            {/* Header Section */}
            <div className="px-6 pt-12 pb-8">
                {onBack && (
                    <div className="w-full flex justify-start mb-4 relative z-50">
                        <button
                            onClick={onBack}
                            className="nav-button-mobile"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Back
                        </button>
                    </div>
                )}
                {/* Profile Component */}
                <ProfileHorizontal />
            </div>

            <div className="px-3 md:px-4 space-y-6">

                {/* Heatmap - Full Width */}
                <div className="h-64">
                    <GithubHeatmap />
                </div>

                {/* Tech Stack */}
                <TechStack />

                {/* Education */}
                <div className="pt-4">
                    <Education />
                </div>
            </div>
        </section>
    );
};
