import { ABOUT_ME_DATA } from '@/data/aboutMeData';

export const TechStack = () => {
    const categories = [
        { title: 'Frontend', items: ABOUT_ME_DATA.techStack.frontend, gradient: 'from-blue-500/10 to-cyan-500/10' },
        { title: 'Backend', items: ABOUT_ME_DATA.techStack.backend, gradient: 'from-green-500/10 to-emerald-500/10' },
        { title: 'Database', items: ABOUT_ME_DATA.techStack.database, gradient: 'from-purple-500/10 to-pink-500/10' },
        { title: 'Other', items: ABOUT_ME_DATA.techStack.other, gradient: 'from-orange-500/10 to-amber-500/10' }
    ];

    return (
        <div className="glass-panel p-3 rounded-2xl border border-white/10 h-full flex flex-col hover:border-gold-dim/20 transition-all duration-300 group relative overflow-hidden">
            {/* Animated gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/0 via-blue-500/5 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative z-10 flex-1 flex flex-col">
                <h3 className="text-sm font-bold mb-2 flex items-center gap-2 flex-shrink-0">
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-500/20 to-blue-500/10 border border-emerald-500/30 flex items-center justify-center">
                        <span className="text-base">⚡</span>
                    </div>
                    <span className="bg-gradient-to-r from-white to-secondary bg-clip-text text-transparent">
                        Technical <span className="text-emerald-400">Arsenal</span>
                    </span>
                </h3>

                {/* Horizontal Layout - Each category as a row */}
                <div className="space-y-2">
                    {categories.map((category) => (
                        <div key={category.title}>
                            <div className="flex items-center gap-2 mb-1.5">
                                <div className={`h-0.5 w-4 bg-gradient-to-r ${category.gradient} rounded-full`} />
                                <h4 className="text-[10px] font-bold text-gold-dim uppercase tracking-wider">
                                    {category.title}
                                </h4>
                            </div>
                            <div className="flex flex-wrap gap-1.5">
                                {category.items.map((tech, i) => (
                                    <div
                                        key={i}
                                        className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 hover:border-gold-dim/40 transition-all duration-300 group/tech cursor-pointer hover:scale-105"
                                    >
                                        <div className="w-4 h-4 flex items-center justify-center relative">
                                            <svg
                                                role="img"
                                                viewBox="0 0 24 24"
                                                className="w-full h-full transition-all duration-300 group-hover/tech:scale-110"
                                                style={{ fill: `#${tech.color}` }}
                                            >
                                                <path d={tech.iconPath} />
                                            </svg>
                                            <div className="absolute inset-0 rounded blur-sm opacity-0 group-hover/tech:opacity-50 transition-opacity" style={{ background: `#${tech.color}` }} />
                                        </div>
                                        <span className="text-[9px] font-semibold text-secondary group-hover/tech:text-white transition-colors whitespace-nowrap">
                                            {tech.name}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
