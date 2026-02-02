
import { ABOUT_ME_DATA } from '@/data/aboutMeData';
import { Education } from './components/Education';
import { TechStack } from './components/TechStack';
import { GithubStats } from './components/GithubStats';
import { Mail, MapPin } from 'lucide-react';

export const AboutMeDesktop = () => {
    return (
        <section className="h-screen w-full bg-obsidian flex items-center justify-center p-6 lg:p-8 overflow-hidden relative">
            {/* Background elements if needed */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-gold-glow/5 rounded-full blur-[100px]" />
                <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-emerald-900/10 rounded-full blur-[100px]" />
            </div>

            <div className="max-w-7xl w-full h-full grid grid-cols-12 gap-6 relative z-10">

                {/* LEFT COLUMN: Narrative & Education (4 cols) */}
                <div className="col-span-5 flex flex-col gap-5">
                    {/* Intro Card */}
                    <div className="glass-panel p-5 rounded-2xl border border-white/10 relative overflow-hidden">
                        <div className="relative z-10">
                            <h2 className="text-3xl font-bold mb-2 text-white">
                                About <span className="text-gold-glow">Me</span>.
                            </h2>
                            <h3 className="text-lg text-secondary font-medium mb-4">
                                {ABOUT_ME_DATA.personal.headline}
                            </h3>

                            <p className="text-sm text-secondary leading-relaxed mb-6">
                                {ABOUT_ME_DATA.personal.summary}
                            </p>

                            <div className="flex flex-col gap-2">
                                <div className="flex items-center gap-3 text-sm text-secondary hover:text-white transition-colors">
                                    <MapPin className="w-4 h-4 text-gold-dim" />
                                    <span>{ABOUT_ME_DATA.personal.location}</span>
                                </div>
                                <a
                                    href={`mailto:${ABOUT_ME_DATA.personal.email}`}
                                    className="flex items-center gap-3 text-sm text-secondary hover:text-gold-glow transition-colors cursor-pointer group"
                                >
                                    <Mail className="w-4 h-4 text-gold-dim group-hover:text-gold-glow" />
                                    <span>{ABOUT_ME_DATA.personal.email}</span>
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Education Block */}
                    <Education />
                </div>

                {/* RIGHT COLUMN: Stats & Tech (8 cols) */}
                <div className="col-span-7 flex flex-col gap-5">

                    {/* Github Stats - Takes full width of right col */}
                    <GithubStats />

                    {/* Tech Stack */}
                    <TechStack />

                </div>
            </div>
        </section >
    );
};
