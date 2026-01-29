import { useTypewriter } from '../model/useTypewriter';
import { motion, AnimatePresence } from 'framer-motion';

export const HookRenderer = ({ onComplete }: { onComplete: () => void }) => {
    const { displayText, isComplete } = useTypewriter("Building the future, one pixel at a time...", {
        speed: 60,
        delay: 1500,
    });

    return (
        <div className="relative min-h-screen w-full flex flex-col items-center justify-center bg-[#020617] overflow-hidden">
            {/* Dynamic Mesh Gradient Background */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-500/10 blur-[120px] rounded-full animate-pulse-slow" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-500/10 blur-[140px] rounded-full animate-pulse-slow" style={{ animationDelay: '2s' }} />
            </div>

            <div className="z-10 text-center space-y-12 px-6">
                {/* Typewriter Sequence */}
                <h1 className="text-4xl md:text-6xl font-display font-bold tracking-tight text-white leading-tight min-h-[1.2em]">
                    {displayText}
                    <motion.span
                        animate={{ opacity: [1, 0] }}
                        transition={{ repeat: Infinity, duration: 0.8 }}
                        className="inline-block w-[2px] h-[0.8em] bg-emerald-400 ml-1 align-middle"
                    />
                </h1>

                {/* Cinematic CTA Fade-in */}
                <AnimatePresence>
                    {isComplete && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="flex flex-col md:flex-row items-center justify-center gap-6"
                        >
                            <button
                                onClick={onComplete}
                                className="group relative px-8 py-4 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 font-semibold rounded-full border border-emerald-500/30 transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(16,185,129,0.2)]"
                            >
                                Start Interactive Journey
                                <div className="absolute inset-0 rounded-full bg-emerald-400/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </button>

                            <button
                                className="px-8 py-4 glass text-slate-300 hover:text-white font-semibold rounded-full border border-white/5 transition-all duration-300 hover:bg-white/5"
                            >
                                Quick Browse
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Real-time Counter (Miniature) */}
            <div className="absolute top-8 right-8 z-20 flex items-center gap-3 glass px-4 py-2 rounded-full border-white/5">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-400/80">Live • 1,248 Active</span>
            </div>
        </div>
    );
};
