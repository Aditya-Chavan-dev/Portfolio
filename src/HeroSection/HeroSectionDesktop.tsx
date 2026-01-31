interface HeroSectionDesktopProps {
    onStartJourney: () => void;
}

export const HeroSectionDesktop = ({ onStartJourney }: HeroSectionDesktopProps) => {
    return (
        <div className="relative w-full h-screen flex flex-col justify-center items-center bg-transparent z-20 text-white animate-fadeIn">
            <h1 className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-600">
                ADITYA CHAVAN
            </h1>
            <p className="mt-4 text-xl text-slate-400 tracking-widest uppercase mb-12">
                Software Engineer
            </p>

            <div className="flex flex-col items-center gap-8">
                {/* Immersive Journey Option */}
                <button
                    onClick={onStartJourney}
                    className="group relative px-8 py-4 bg-transparent border border-cyan-500/30 hover:border-cyan-400 transition-all duration-300 rounded-full overflow-hidden"
                >
                    <span className="relative z-10 text-cyan-400 group-hover:text-white font-medium tracking-widest uppercase">
                        Immersive Journey
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                </button>

                {/* Quick Navigation Options */}
                <div className="flex gap-8 text-sm font-mono text-slate-500">
                    <a href="#projects" className="hover:text-cyan-400 transition-colors uppercase tracking-widest">Projects</a>
                    <a href="#about" className="hover:text-cyan-400 transition-colors uppercase tracking-widest">About Me</a>
                    <a href="#experience" className="hover:text-cyan-400 transition-colors uppercase tracking-widest">Experience</a>
                    <a href="#certification" className="hover:text-cyan-400 transition-colors uppercase tracking-widest">Certification</a>
                </div>
            </div>
        </div>
    );
};
