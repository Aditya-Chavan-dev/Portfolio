import { Education } from './components/Education';
import { motion } from 'framer-motion';
import { TechStack } from './components/TechStack';
import { GithubHeatmap } from './components/GithubHeatmap';
import { SidebarNav } from './components/SidebarNav';
import { ProfileHorizontal } from './components/ProfileHorizontal';

interface AboutMeDesktopProps {
    onNavigate: (section: string) => void;
}

export const AboutMeDesktop = ({ onNavigate }: AboutMeDesktopProps) => {
    return (
        <div className="h-screen w-full flex flex-col p-6 relative overflow-hidden bg-obsidian text-white font-sans selection:bg-gold-dim/30">
            {/* Enhanced Ambient Background Effects */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[5%] right-[10%] w-[600px] h-[600px] bg-gradient-to-br from-gold-dim/10 to-gold-glow/5 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '8s' }} />
                <div className="absolute bottom-[10%] left-[5%] w-[550px] h-[550px] bg-gradient-to-tr from-emerald-500/10 to-emerald-400/5 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '10s' }} />
            </div>

            {/* Main Layout Grid - Adjusted for strict viewport fit */}
            <div className="flex-1 w-full h-full max-w-[1600px] mx-auto grid grid-cols-[auto_1fr] gap-4 relative z-10">

                {/* Column 1: Sidebar Nav Dock (Fixed Width) */}
                <div className="w-16 h-full pt-4 pb-4">
                    <SidebarNav onNavigate={onNavigate} activeSection="about" />
                </div>

                {/* Column 2: Content Area (Bento Grid) */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.0, duration: 0.5 }}
                    className="flex-1 h-full pt-4 pb-4 flex flex-col min-h-0"
                >
                    {/* 12-Column BENTO GRID */}
                    <div className="w-full flex-1 grid grid-cols-12 grid-rows-12 gap-4 min-h-0">

                        {/* LEFT: Timeline (3 Cols, 12 Rows) - Full Height */}
                        <div className="col-span-3 row-span-12 h-full min-h-0">
                            <div className="glass-panel p-4 rounded-2xl border border-white/10 h-full hover:border-gold-dim/20 transition-all duration-300 group relative overflow-auto">
                                <Education />
                            </div>
                        </div>

                        {/* TOP: Profile Horizontal (9 Cols, 6 Rows) - Expanded to include Stats */}
                        <div className="col-span-9 row-span-6 h-full min-h-0">
                            <ProfileHorizontal />
                        </div>

                        {/* MID: Tech Stack (9 Cols, 2 Rows) */}
                        <div className="col-span-9 row-span-2 h-full min-h-0">
                            <TechStack />
                        </div>

                        {/* BOTTOM: Github Heatmap (9 Cols, 4 Rows) */}
                        <div className="col-span-9 row-span-4 h-full min-h-0">
                            <GithubHeatmap />
                        </div>

                    </div>
                </motion.div>

            </div>
        </div>
    );
};
