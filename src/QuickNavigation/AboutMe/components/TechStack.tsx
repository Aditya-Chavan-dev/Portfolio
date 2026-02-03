import { ABOUT_ME_DATA } from '@/data/aboutMeData';
import { useState } from 'react';

export const TechStack = () => {
    const [isHovered, setIsHovered] = useState(false);
    const [activeTech, setActiveTech] = useState<number | null>(null);

    return (
        <div
            className="glass-panel px-6 py-3 rounded-2xl border border-white/10 h-full flex items-center justify-between hover:border-gold-dim/20 transition-all duration-300 group relative overflow-hidden"
        >
            {/* Animated gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-blue-500/5 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Label */}
            <div className="flex items-center gap-3 relative z-10 mr-8 border-r border-white/10 pr-6 h-8 flex-shrink-0 z-20 bg-obsidian/50 backdrop-blur-sm">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500/20 to-blue-500/10 border border-emerald-500/30 flex items-center justify-center">
                    <span className="text-sm">⚡</span>
                </div>
                <span className="font-bold text-sm bg-gradient-to-r from-white to-secondary bg-clip-text text-transparent whitespace-nowrap">
                    Tech <span className="text-emerald-400">Arsenal</span>
                </span>
            </div>

            {/* Unified Marquee Layout (Desktop & Mobile) */}
            <div className="flex-1 overflow-hidden relative z-10 mask-linear-gradient">
                <div
                    className="flex items-center gap-8 w-max animate-marquee"
                    style={{ animationPlayState: isHovered || activeTech !== null ? 'paused' : 'running' }}
                >
                    {[
                        ...ABOUT_ME_DATA.techStack.frontend,
                        ...ABOUT_ME_DATA.techStack.backend,
                        ...ABOUT_ME_DATA.techStack.database,
                        ...ABOUT_ME_DATA.techStack.other,
                        // Duplicate for loop
                        ...ABOUT_ME_DATA.techStack.frontend,
                        ...ABOUT_ME_DATA.techStack.backend,
                        ...ABOUT_ME_DATA.techStack.database,
                        ...ABOUT_ME_DATA.techStack.other
                    ].map((tech, i) => (
                        <div
                            key={`tech-${i}`}
                            className="flex flex-col items-center justify-center gap-1.5 min-w-[3rem] md:min-w-[4rem] group/tech cursor-pointer relative"
                            onClick={() => setActiveTech(activeTech === i ? null : i)}
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                        >
                            <div className="w-7 h-7 md:w-8 md:h-8 flex items-center justify-center transition-transform group-hover/tech:scale-110">
                                <svg
                                    role="img"
                                    viewBox="0 0 24 24"
                                    className="w-full h-full drop-shadow-lg opacity-80 group-hover/tech:opacity-100 transition-all"
                                    style={{ fill: `#${tech.color}` }}
                                >
                                    <path d={tech.iconPath} />
                                </svg>
                            </div>
                            <span
                                className={`text-[9px] font-medium text-secondary/40 transition-colors absolute -bottom-4 bg-obsidian/90 px-2 py-0.5 rounded border border-white/10 z-20 pointer-events-none whitespace-nowrap ${activeTech === i ? 'opacity-100 text-white' : 'opacity-0 group-hover/tech:opacity-100 group-hover/tech:text-white'
                                    }`}
                            >
                                {tech.name}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
