import { ABOUT_ME_DATA } from '@/data/aboutMeData';


export const AboutMeProfile = () => {
    return (
        <div className="glass-panel p-6 rounded-2xl border border-white/10 h-full relative overflow-hidden group hover:border-gold-dim/30 transition-all duration-300 flex flex-col">
            <div className="absolute inset-0 bg-gradient-to-br from-gold-dim/0 via-gold-dim/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative z-10 flex flex-col h-full">
                {/* Header */}
                <h2 className="text-2xl font-bold mb-4 text-white">
                    About <span className="text-gold-glow">Me</span>
                </h2>

                {/* Bio Text */}
                <div className="flex-1 overflow-y-auto scrollbar-hide">
                    <p className="text-sm text-secondary leading-7 font-light tracking-wide text-justify">
                        {ABOUT_ME_DATA.personal.summary}
                    </p>
                </div>
            </div>
        </div>
    );
};

