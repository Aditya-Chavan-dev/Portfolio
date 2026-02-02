
import { ABOUT_ME_DATA } from '@/data/aboutMeData';

export const TechStack = () => {
    return (
        <div className="glass-panel p-4 rounded-2xl border border-white/10">
            <h3 className="text-base font-bold mb-3 text-primary">
                Technical <span className="text-secondary">Arsenal</span>
            </h3>

            <div className="grid grid-cols-3 md:grid-cols-4 gap-2.5">
                {ABOUT_ME_DATA.techStack.map((tech, i) => (
                    <div
                        key={i}
                        className="flex flex-col items-center justify-center p-2.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 hover:border-gold-dim/30 transition-all group"
                    >
                        <svg
                            role="img"
                            viewBox="0 0 24 24"
                            className="w-6 h-6 mb-1.5 transition-colors"
                            style={{ fill: `#${tech.color}` }}
                        >
                            <path d={tech.iconPath} />
                        </svg>
                        <span className="text-[10px] font-medium text-secondary group-hover:text-white transition-colors text-center">
                            {tech.name}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};
