import { motion } from 'framer-motion';
import { useTypewriter } from '@mobile/shared/hooks/useTypewriter';
import { AnimatedBackground } from './AnimatedBackground';

export const HeroSection = () => {
    const line1 = useTypewriter("IT'S NOT", { speed: 50, delay: 500 });
    const line2 = useTypewriter("HOW I WRITE", { speed: 50, enabled: line1.isComplete, delay: 200 });
    const line3 = useTypewriter("THE CODE", { speed: 50, enabled: line2.isComplete, delay: 200 });
    const subtitle = useTypewriter("BUT HOW I THINK\nTHAT DEFINES ME", { speed: 40, enabled: line3.isComplete, delay: 400 });
    const disclaimer = useTypewriter("DISCLAIMER: This site is strictly typed. No estimated numbers, no marketing fluff, and zero hallucinations. If it’s here, it’s true.", { speed: 30, enabled: subtitle.isComplete, delay: 500 });

    return (
        <div className="relative w-full h-screen overflow-hidden bg-[#020617] text-white">
            {/* Live Neural Grid Background (Optimized) */}
            <AnimatedBackground />

            {/* Strong Vertical Gradient for text readability on small screens */}
            <div className="absolute inset-0 z-10 bg-gradient-to-b from-[#020617]/30 via-[#020617]/60 to-[#020617]" />

            {/* Mobile Content Container */}
            <div className="relative z-20 h-full flex flex-col justify-end pb-24 px-6 font-bold">

                {/* Main Headline - Stacked for Verticality */}
                <div className="mb-8">
                    <h1 className="text-2xl font-bold tracking-tight leading-none">
                        <span className="block min-h-[1em] text-white">
                            {line1.displayText}
                            {!line1.isComplete && <span className="animate-pulse text-emerald-400">|</span>}
                        </span>
                        <span className="block min-h-[1em] text-slate-400">
                            {line2.displayText}
                            {line1.isComplete && !line2.isComplete && <span className="animate-pulse text-emerald-400">|</span>}
                        </span>
                        <span className="block min-h-[1em] text-slate-400">
                            {line3.displayText}
                            {line2.isComplete && !line3.isComplete && <span className="animate-pulse text-emerald-400">|</span>}
                        </span>
                    </h1>
                </div>

                {/* Sub-headline */}
                <div className="mb-12 min-h-[3em]">
                    {line3.isComplete && (
                        <h2 className="text-lg font-medium text-emerald-400 tracking-wide leading-tight whitespace-pre-wrap">
                            {subtitle.displayText}
                            {!subtitle.isComplete && <span className="animate-pulse text-emerald-400">|</span>}
                        </h2>
                    )}
                </div>

                {/* Mobile Disclaimer - Typewriter Effect */}
                <div className="mt-8 min-h-[4em]">
                    {subtitle.isComplete && (
                        <p className="text-xs text-slate-500 font-mono text-center max-w-[280px] leading-relaxed mx-auto">
                            {disclaimer.displayText}
                            {!disclaimer.isComplete && <span className="animate-pulse text-emerald-400">|</span>}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};
