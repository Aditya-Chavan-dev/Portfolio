import { ABOUT_ME_DATA } from '@/data/aboutMeData';
import { useGithubData } from '../hooks/useGithubData';

export const AboutMeProfile = () => {
    const { stats, totalContributions, streak, loading } = useGithubData();

    return (
        <div className="glass-panel p-5 rounded-2xl border-white-10 h-full relative overflow-hidden group hover:border-gold-dim/30 transition-fast flex flex-col justify-between">
            {/* Header Title */}
            <div className="mb-2 shrink-0">
                <h2 className="text-xl font-bold text-white flex items-center gap-icon-text">
                    About <span className="text-gold-glow">Me</span>
                    <div className="h-[2px] w-12 bg-gold-dim/50 rounded-full" />
                </h2>
            </div>

            {/* Divider */}
            {/* <div className="h-px w-full bg-white/5 mb-3" /> */}

            {/* Bio */}
            <div className="flex-1 pr-2 overflow-y-auto scrollbar-hide flex items-center">
                <p className="text-sm text-secondary/90 leading-relaxed font-light tracking-wide text-justify line-clamp-[8]">
                    {ABOUT_ME_DATA.personal.summary}
                </p>
            </div>

            {/* Divider */}
            <div className="h-px w-full bg-white/5 my-4 shrink-0" />

            {/* Stats Row */}
            <div className="grid grid-cols-3 items-center shrink-0">
                {/* Commits */}
                <div className="flex flex-col items-center justify-center border-r border-white/5">
                    <span className="text-2xs uppercase tracking-wider text-secondary/60 font-medium mb-0.5">
                        Commits
                    </span>
                    <span className="text-xl font-bold text-white font-mono">
                        {loading ? "-" : totalContributions || 0}
                    </span>
                </div>

                {/* Projects */}
                <div className="flex flex-col items-center justify-center border-r border-white/5">
                    <span className="text-2xs uppercase tracking-wider text-secondary/60 font-medium mb-0.5">
                        Projects
                    </span>
                    <span className="text-xl font-bold text-white font-mono">
                        {loading ? "-" : stats?.public_repos || 0}
                    </span>
                </div>

                {/* Streak */}
                <div className="flex flex-col items-center justify-center">
                    <span className="text-2xs uppercase tracking-wider text-secondary/60 font-medium mb-0.5">
                        Streak
                    </span>
                    <div className="flex items-end gap-1">
                        <span className="text-xl font-bold text-white font-mono">
                            {loading ? "-" : streak}
                        </span>
                        <span className="text-xs text-secondary/50 mb-1">Days</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

