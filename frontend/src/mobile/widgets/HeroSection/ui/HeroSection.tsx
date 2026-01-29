import { motion } from 'framer-motion';
import heroBg from '@mobile/shared/assets/images/hero-bg.png';

export const HeroSection = () => {
    return (
        <div className="relative w-full h-screen overflow-hidden bg-[#020617] text-white">
            {/* Background Image Layer - Mobile Optimized Position */}
            <div
                className="absolute inset-0 z-0 bg-cover bg-[center_top]"
                style={{
                    backgroundImage: `url(${heroBg})`,
                    opacity: 0.5
                }}
            />

            {/* Strong Vertical Gradient for text readability on small screens */}
            <div className="absolute inset-0 z-10 bg-gradient-to-b from-[#020617]/30 via-[#020617]/60 to-[#020617]" />

            {/* Mobile Content Container */}
            <div className="relative z-20 h-full flex flex-col justify-end pb-24 px-6">

                {/* Main Headline - Stacked for Verticality */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="mb-8"
                >
                    <h1 className="text-4xl font-black tracking-tighter leading-[0.9]">
                        <span className="block text-white">IT'S NOT</span>
                        <span className="block text-slate-400">HOW I WRITE</span>
                        <span className="block text-slate-400">THE CODE</span>
                    </h1>
                </motion.div>

                {/* Sub-headline */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="mb-12"
                >
                    <h2 className="text-xl font-light text-emerald-400 tracking-wide leading-tight">
                        BUT <span className="font-bold text-emerald-300">HOW I THINK</span><br />
                        THAT DEFINES ME
                    </h2>
                </motion.div>

                {/* Mobile Proof Anchors - Vertical List */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="space-y-3 font-mono text-xs text-slate-500 border-l-2 border-emerald-500/30 pl-4"
                >
                    <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                        <span>2 ISOLATED APPS</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                        <span>0 SHARED UI</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-purple-500 rounded-full" />
                        <span>DELETION-TESTED</span>
                    </div>
                </motion.div>

                {/* Mobile Disclaimer - Compact */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 1.2 }}
                    className="absolute bottom-6 left-6 right-6 text-[9px] text-slate-700 font-mono text-center"
                >
                    STRICTLY TYPED. ZERO HALLUCINATIONS. PRECISE.
                </motion.p>

            </div>
        </div>
    );
};
