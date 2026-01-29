import { motion } from 'framer-motion';
import heroBg from '@/shared/assets/images/hero-bg.png';

export const HeroSection = () => {
    return (
        <div className="relative w-full h-screen overflow-hidden bg-[#020617] text-white">
            {/* Background Image Layer */}
            <div
                className="absolute inset-0 z-0 bg-cover bg-center"
                style={{
                    backgroundImage: `url(${heroBg})`,
                    opacity: 0.6
                }}
            />

            {/* Gradient Overlay for Readability */}
            <div className="absolute inset-0 z-10 bg-gradient-to-b from-transparent via-[#020617]/40 to-[#020617]" />

            {/* Cinematic Content Container */}
            <div className="relative z-20 h-full flex flex-col justify-center items-center text-center px-4">

                {/* Main Headline */}
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-4"
                >
                    <span className="block text-transparent bg-clip-text bg-gradient-to-br from-white to-slate-400">
                        IT'S NOT HOW I
                    </span>
                    <span className="block text-transparent bg-clip-text bg-gradient-to-br from-white to-slate-400">
                        WRITE THE CODE
                    </span>
                </motion.h1>

                {/* Sub-headline */}
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.6 }}
                    className="text-2xl md:text-4xl font-light text-emerald-400 tracking-wide mb-12"
                >
                    BUT HOW I <span className="font-bold">THINK</span> THAT DEFINES ME
                </motion.h2>

                {/* Proof Anchors */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 1.2 }}
                    className="flex flex-col md:flex-row gap-6 md:gap-12 mb-16 text-sm md:text-base font-mono text-slate-400"
                >
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                        <span>2 ISOLATED APPS, 1 SHARED LOGIC CORE</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-blue-500 rounded-full" />
                        <span>0 SHARED UI COMPONENTS</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-purple-500 rounded-full" />
                        <span>DELETION-TESTED ARCHITECTURE</span>
                    </div>
                </motion.div>

                {/* Disclaimer */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 1.8 }}
                    className="fixed bottom-8 right-8 max-w-xs text-right"
                >
                    <p className="text-[10px] text-slate-600 font-mono border-r-2 border-slate-800 pr-3">
                        DISCLAIMER: This site is strictly typed. No estimated numbers, no marketing fluff, and zero hallucinations. If it’s here, it’s true.
                    </p>
                </motion.div>

            </div>
        </div>
    );
};
