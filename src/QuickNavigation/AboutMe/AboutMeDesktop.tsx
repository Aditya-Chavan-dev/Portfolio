import { Mail, MapPin } from 'lucide-react';
import { ABOUT_ME_DATA } from '@/data/aboutMeData';
import { Education } from './components/Education';
import { TechStack } from './components/TechStack';
import { GithubStats } from './components/GithubStats';
import { Strengths } from './components/Strengths';

export const AboutMeDesktop = () => {
    return (
        <div className="h-screen w-full flex items-center justify-center px-8 pt-16 pb-6 relative overflow-hidden">
            {/* Enhanced Ambient Background Effects */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[5%] right-[10%] w-[600px] h-[600px] bg-gradient-to-br from-gold-dim/10 to-gold-glow/5 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '8s' }} />
                <div className="absolute bottom-[10%] left-[5%] w-[550px] h-[550px] bg-gradient-to-tr from-emerald-500/10 to-emerald-400/5 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '10s' }} />
                <div className="absolute top-[40%] left-[45%] w-[400px] h-[400px] bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-full blur-[100px]" />
            </div>

            {/* Main Container - Left Sidebar Layout */}
            <div className="max-w-[1400px] w-full h-full relative z-10 flex gap-3">

                {/* LEFT SIDEBAR: Education */}
                <div className="w-[240px] flex-shrink-0">
                    <div className="glass-panel p-3 rounded-2xl border border-white/10 h-full hover:border-gold-dim/20 transition-all duration-300 group relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-gold-dim/0 to-gold-dim/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="relative z-10 h-full">
                            <Education />
                        </div>
                    </div>
                </div>

                {/* RIGHT MAIN CONTENT */}
                <div className="flex-1 flex flex-col gap-3 min-w-0">

                    {/* TOP: Header with About Me + Contact */}
                    <div className="flex-shrink-0">
                        <div className="glass-panel p-3 rounded-2xl border border-white/10 relative overflow-hidden group hover:border-gold-dim/30 transition-all duration-300">
                            <div className="absolute inset-0 bg-gradient-to-r from-gold-dim/0 via-gold-dim/5 to-gold-dim/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            <div className="relative z-10 flex items-start justify-between gap-6">
                                {/* Left: Title and Summary */}
                                <div className="flex-1">
                                    <h2 className="text-2xl font-bold mb-1.5 text-white bg-gradient-to-r from-white via-gold-glow to-white bg-clip-text">
                                        About <span className="text-gold-glow">Me</span>.
                                    </h2>
                                    <p className="text-xs text-secondary leading-relaxed">
                                        {ABOUT_ME_DATA.personal.summary}
                                    </p>
                                </div>

                                {/* Right: Contact Info */}
                                <div className="flex flex-col gap-1.5 min-w-[260px]">
                                    <div className="flex items-center gap-2.5 text-xs text-secondary hover:text-white transition-all duration-300 group/item cursor-pointer">
                                        <div className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center group-hover/item:bg-gold-dim/10 group-hover/item:border-gold-dim/30 transition-all">
                                            <MapPin className="w-3.5 h-3.5 text-gold-muted group-hover/item:text-gold-glow transition-colors" />
                                        </div>
                                        <span className="font-medium">{ABOUT_ME_DATA.personal.location}</span>
                                    </div>
                                    <div className="flex items-center gap-2.5 text-xs text-secondary hover:text-white transition-all duration-300 group/item">
                                        <div className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center group-hover/item:bg-gold-dim/10 group-hover/item:border-gold-dim/30 transition-all">
                                            <Mail className="w-3.5 h-3.5 text-gold-muted group-hover/item:text-gold-glow transition-colors" />
                                        </div>
                                        <a
                                            href={`mailto:${ABOUT_ME_DATA.personal.email}`}
                                            className="hover:text-gold-glow transition-colors font-medium"
                                        >
                                            {ABOUT_ME_DATA.personal.email}
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* MIDDLE: Tech Stack + GitHub/Strengths */}
                    <div className="flex-1 grid grid-cols-12 gap-3 min-h-0">
                        {/* Tech Stack - Takes 7 columns */}
                        <div className="col-span-7 min-h-0">
                            <TechStack />
                        </div>

                        {/* GitHub + Strengths - Takes 5 columns */}
                        <div className="col-span-5 min-h-0 flex flex-col gap-2.5">
                            <GithubStats />
                            <Strengths />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
