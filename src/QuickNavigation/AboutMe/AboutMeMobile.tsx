
import { ABOUT_ME_DATA } from '@/data/aboutMeData';
import { Education } from './components/Education';
import { TechStack } from './components/TechStack';
import { GithubStats } from './components/GithubStats';
import { MapPin, Mail } from 'lucide-react';

export const AboutMeMobile = () => {
    return (
        <section className="min-h-screen w-full bg-obsidian pb-24 relative overflow-x-hidden">

            {/* Header Section */}
            <div className="px-6 pt-12 pb-8">
                <h2 className="text-4xl font-bold mb-2 text-white">
                    About <span className="text-gold-glow">Me</span>.
                </h2>
                <h3 className="text-lg text-secondary font-medium">
                    {ABOUT_ME_DATA.personal.headline}
                </h3>
            </div>

            <div className="px-3 md:px-4 space-y-6">
                {/* Summary Card */}
                <div className="glass-panel p-6 rounded-2xl border border-white/10">
                    <p className="text-secondary text-sm leading-relaxed mb-6">
                        {ABOUT_ME_DATA.personal.summary}
                    </p>
                    <div className="flex flex-col gap-3 border-t border-white/5 pt-4">
                        <div className="flex items-center gap-3 text-xs text-secondary">
                            <MapPin className="w-3.5 h-3.5 text-gold-dim" />
                            <span>{ABOUT_ME_DATA.personal.location}</span>
                        </div>
                        <a
                            href={`mailto:${ABOUT_ME_DATA.personal.email}`}
                            className="flex items-center gap-3 text-xs text-secondary hover:text-gold-glow transition-colors"
                        >
                            <Mail className="w-3.5 h-3.5 text-gold-dim" />
                            <span>{ABOUT_ME_DATA.personal.email}</span>
                        </a>
                    </div>
                </div>

                {/* Stats */}
                <GithubStats />

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
