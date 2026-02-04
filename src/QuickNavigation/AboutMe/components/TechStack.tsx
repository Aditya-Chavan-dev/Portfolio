import { ABOUT_ME_DATA } from '@/data/aboutMeData';
import { useState } from 'react';

export const TechStack = () => {
    const [activeTech, setActiveTech] = useState<number | null>(null);

    // Flatten all tech items for the strip
    const allTech = [
        ...ABOUT_ME_DATA.techStack.frontend,
        ...ABOUT_ME_DATA.techStack.backend,
        ...ABOUT_ME_DATA.techStack.database,
        ...ABOUT_ME_DATA.techStack.other
    ];

    return (
        <div className="glass-panel px-5 py-2 rounded-xl border border-white/10 h-full flex items-center gap-4 relative overflow-hidden group hover:border-gold-dim/20 transition-all duration-300">
            {/* Label Section */}
            <div className="flex items-center gap-3 pr-5 border-r border-white/10 min-w-max">
                <div className="w-8 h-8 rounded-lg bg-[#161b22] border border-white/10 flex items-center justify-center">
                    <span className="text-sm">⚡</span>
                </div>
                <div className="flex flex-col">
                    <span className="text-white font-bold text-base leading-none">Arsenal</span>
                    <span className="text-emerald-400 font-bold text-base leading-none">Tech</span>
                </div>
            </div>

            {/* Icons Section (Horizontal Scroll/Marquee) */}
            <div className="flex-1 overflow-x-auto scrollbar-hide flex items-center gap-6 mask-linear-gradient pl-2">
                {allTech.map((tech, i) => (
                    <div
                        key={`tech-${i}`}
                        className="flex flex-col items-center justify-center gap-2 group/icon cursor-pointer min-w-[3rem]"
                        onMouseEnter={() => setActiveTech(i)}
                        onMouseLeave={() => setActiveTech(null)}
                    >
                        <div className="w-8 h-8 flex items-center justify-center transition-transform duration-300 group-hover/icon:scale-110">
                            <svg
                                role="img"
                                viewBox="0 0 24 24"
                                className="w-full h-full text-secondary group-hover/icon:text-white transition-colors opacity-70 group-hover/icon:opacity-100"
                                style={{ fill: activeTech === i ? `#${tech.color}` : 'currentColor' }}
                            >
                                <path d={tech.iconPath} />
                            </svg>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
