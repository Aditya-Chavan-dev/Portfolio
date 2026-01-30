export const HeroSectionMobile = () => {
    return (
        <div className="relative w-full h-screen flex flex-col justify-center items-center bg-[#020617] z-20 text-white animate-fadeIn px-6">
            <h1 className="text-4xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-600">
                ADITYA CHAVAN
            </h1>
            <p className="mt-4 text-sm text-slate-400 tracking-widest uppercase text-center mb-12">
                Software Engineer
            </p>

            <div className="flex flex-col items-center gap-10 w-full">
                {/* Immersive Journey Option */}
                <button className="w-full py-4 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-xl text-white font-bold tracking-widest uppercase shadow-[0_0_20px_rgba(6,182,212,0.3)]">
                    Immersive Journey
                </button>

                {/* Quick Navigation Options */}
                <div className="grid grid-cols-2 gap-4 w-full">
                    <a href="#projects" className="py-3 px-4 border border-slate-800 rounded-lg text-center text-xs text-slate-400 uppercase tracking-widest font-mono">
                        Projects
                    </a>
                    <a href="#about" className="py-3 px-4 border border-slate-800 rounded-lg text-center text-xs text-slate-400 uppercase tracking-widest font-mono">
                        About Me
                    </a>
                    <a href="#experience" className="py-3 px-4 border border-slate-800 rounded-lg text-center text-xs text-slate-400 uppercase tracking-widest font-mono">
                        Experience
                    </a>
                    <a href="#certification" className="py-3 px-4 border border-slate-800 rounded-lg text-center text-xs text-slate-400 uppercase tracking-widest font-mono">
                        Certification
                    </a>
                </div>
            </div>
        </div>
    );
};
