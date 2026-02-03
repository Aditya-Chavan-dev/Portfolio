import { ABOUT_ME_DATA } from '@/data/aboutMeData';
import { MapPin, Mail, Linkedin, Github } from 'lucide-react';
import { useGithubData } from '../hooks/useGithubData';

export const ProfileHorizontal = () => {
    const { stats, contributions, streak, loading } = useGithubData();
    return (
        <div className="glass-panel p-6 rounded-2xl border border-white/10 h-full hover:border-gold-dim/20 transition-all duration-300 group flex flex-col justify-between">
            <div className="flex flex-col md:flex-row gap-6 h-full">

                {/* Left: Bio Content */}
                <div className="flex-1 flex flex-col justify-center">
                    <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
                        About <span className="text-gold-glow">Me</span>
                        <div className="h-[2px] w-12 bg-gold-dim/50 rounded-full" />
                    </h2>
                    <p className="text-secondary text-sm leading-relaxed text-justify max-w-2xl font-light tracking-wide">
                        {ABOUT_ME_DATA.personal.summary}
                    </p>
                </div>

                {/* Right: Contact & Actions - Vertical flex to align with design */}
                <div className="w-auto flex flex-col justify-center gap-3 flex-shrink-0 min-w-[200px]">

                    {/* Location / Status Badge */}
                    <div className="p-2.5 rounded-lg bg-white/5 border border-white/10 flex items-center gap-2 w-full">
                        <MapPin className="w-3.5 h-3.5 text-secondary" />
                        <span className="text-xs text-secondary/80 font-medium">Flexible to relocation</span>
                    </div>

                    {/* Action Buttons Row */}
                    <div className="flex items-center gap-2">
                        <a
                            href={`mailto:${ABOUT_ME_DATA.personal.email}`}
                            className="p-2.5 rounded-lg bg-white/5 border border-white/10 hover:border-gold-dim/30 hover:bg-white/10 transition-all flex items-center gap-2 group/btn flex-1 justify-center"
                        >
                            <Mail className="w-3.5 h-3.5 text-secondary group-hover/btn:text-gold-glow transition-colors" />
                            <span className="text-xs text-secondary group-hover/btn:text-white transition-colors">Email</span>
                        </a>

                        <a
                            href={ABOUT_ME_DATA.personal.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2.5 rounded-lg bg-white/5 border border-white/10 hover:border-gold-dim/30 hover:bg-white/10 transition-all flex items-center gap-2 group/btn flex-1 justify-center"
                        >
                            <Linkedin className="w-3.5 h-3.5 text-secondary group-hover/btn:text-gold-glow transition-colors" />
                            <span className="text-xs text-secondary group-hover/btn:text-white transition-colors">LinkedIn</span>
                        </a>

                        <a
                            href={ABOUT_ME_DATA.personal.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2.5 rounded-lg bg-white/5 border border-white/10 hover:border-gold-dim/30 hover:bg-white/10 transition-all flex items-center gap-2 group/btn flex-1 justify-center"
                        >
                            <Github className="w-3.5 h-3.5 text-secondary group-hover/btn:text-gold-glow transition-colors" />
                            <span className="text-xs text-secondary group-hover/btn:text-white transition-colors">GitHub</span>
                        </a>
                    </div>

                </div>
            </div>

            {/* Bottom: Live Stats Strip */}
            <div className="mt-6 pt-6 border-t border-white/5 grid grid-cols-3 gap-4">
                {/* Total Commits */}
                <div className="flex flex-col items-center justify-center gap-1 group/stat cursor-default">
                    <p className="text-[10px] uppercase tracking-wider text-secondary font-medium group-hover/stat:text-white transition-colors">Commits</p>
                    <div className="flex items-center gap-1.5 text-white">
                        <span className="text-xl font-bold font-mono">
                            {loading ? "-" : contributions?.total.lastYear || 0}
                        </span>
                    </div>
                </div>

                {/* Active Projects */}
                <div className="flex flex-col items-center justify-center gap-1 group/stat cursor-default border-l border-r border-white/5">
                    <p className="text-[10px] uppercase tracking-wider text-secondary font-medium group-hover/stat:text-white transition-colors">Projects</p>
                    <div className="flex items-center gap-1.5 text-white">
                        <span className="text-xl font-bold font-mono">
                            {loading ? "-" : stats?.public_repos || 0}
                        </span>
                    </div>
                </div>

                {/* Current Streak */}
                <div className="flex flex-col items-center justify-center gap-1 group/stat cursor-default">
                    <p className="text-[10px] uppercase tracking-wider text-secondary font-medium group-hover/stat:text-white transition-colors">Streak</p>
                    <div className="flex items-center gap-1.5 text-white">
                        <span className="text-xl font-bold font-mono text-emerald-400">
                            {loading ? "-" : streak}
                        </span>
                        <span className="text-xs text-secondary/50 font-normal mt-1">days</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
