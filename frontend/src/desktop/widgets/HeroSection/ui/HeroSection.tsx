import { motion } from 'framer-motion';
import { useTypewriter } from '@/features/interactive-hook/model/useTypewriter';
import { AnimatedBackground } from './AnimatedBackground';

export const HeroSection = () => {
    // Sequential Typewriter Logic
    const line1 = useTypewriter("IT'S NOT HOW I", { speed: 50, delay: 500 });
    const line2 = useTypewriter("WRITE THE CODE", { speed: 50, enabled: line1.isComplete, delay: 200 });
    const subtitle = useTypewriter("BUT HOW I THINK THAT DEFINES ME", { speed: 40, enabled: line2.isComplete, delay: 400 });

    return (
        <div className="relative w-full h-screen overflow-hidden bg-[#020617] text-white">
            {/* Live Neural Grid Background */}
            <AnimatedBackground />

            {/* Gradient Overlay for Readability */}
            <div className="absolute inset-0 z-10 bg-gradient-to-b from-transparent via-[#020617]/50 to-[#020617]" />

            {/* Cinematic Content Container */}
            <div className="relative z-20 h-full flex flex-col justify-center items-center text-center px-4 font-bold">

                {/* Main Headline */}
                <h1 className="text-5xl md:text-7xl lg:text-8xl tracking-tighter mb-6 font-black">
                    <span className="block min-h-[1.2em] text-transparent bg-clip-text bg-gradient-to-br from-white to-slate-400">
                        {line1.displayText}
                        {!line1.isComplete && <span className="animate-pulse text-emerald-400">|</span>}
                    </span>
                    <span className="block min-h-[1.2em] text-transparent bg-clip-text bg-gradient-to-br from-white to-slate-400">
                        {line2.displayText}
                        {line1.isComplete && !line2.isComplete && <span className="animate-pulse text-emerald-400">|</span>}
                    </span>
                </h1>

                {/* Sub-headline (Appears ONLY after Main Headline is complete) */}
                <div className="min-h-[3em] flex items-center justify-center">
                    {line2.isComplete && (
                        <h2 className="text-2xl md:text-4xl font-light text-emerald-400 tracking-wide">
                            {subtitle.displayText}
                            {!subtitle.isComplete && <span className="animate-pulse text-emerald-400">|</span>}
                        </h2>
                    )}
                </div>

                {/* Disclaimer - Fade in after Subtitle */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: subtitle.isComplete ? 1 : 0 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="max-w-md mt-12 text-center"
                >
                    <p className="text-sm text-slate-500 font-mono leading-relaxed">
                        DISCLAIMER: This site is strictly typed. No estimated numbers, no marketing fluff, and zero hallucinations. If it’s here, it’s true.
                    </p>
                </motion.div>
            </div>
        </div>
    );
};
