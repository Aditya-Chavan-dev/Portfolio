import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CinematicIntro = ({ onComplete }) => {
    // Stage 1: "It's not how I write code underneath..."
    // Stage 2: "But how I think that defines me..."
    // Stage 3: Fade out / Complete
    const [stage, setStage] = useState(0);

    useEffect(() => {
        // Timeline:
        // 0s: Start
        // 1s: Show Line 1
        // 4s: Show Line 2
        // 8s: Fade Out -> Complete

        const timer1 = setTimeout(() => setStage(1), 800);
        const timer2 = setTimeout(() => setStage(2), 3500);
        const timer3 = setTimeout(() => {
            if (onComplete) onComplete();
        }, 6500);

        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
            clearTimeout(timer3);
        };
    }, [onComplete]);

    return (
        <div className="fixed inset-0 z-[200] bg-black flex flex-col items-center justify-center p-8 text-center select-none cursor-none">
            {/* Ambient Background */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.03),transparent)]" />

            <AnimatePresence mode="wait">
                <div className="relative z-10 font-sans tracking-tight leading-relaxed max-w-3xl">

                    {/* Line 1 */}
                    <motion.div
                        initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
                        animate={{
                            opacity: stage >= 1 ? 1 : 0,
                            y: stage >= 1 ? 0 : 20,
                            filter: stage >= 1 ? 'blur(0px)' : 'blur(10px)'
                        }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className="text-2xl md:text-4xl lg:text-5xl text-gray-500 font-light mb-4 md:mb-6"
                    >
                        "It's not how I write code underneath...
                    </motion.div>

                    {/* Line 2 - The Punchline */}
                    <motion.div
                        initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
                        animate={{
                            opacity: stage >= 2 ? 1 : 0,
                            y: stage >= 2 ? 0 : 20,
                            filter: stage >= 2 ? 'blur(0px)' : 'blur(10px)'
                        }}
                        transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
                        className="text-2xl md:text-4xl lg:text-5xl text-white font-medium italic"
                    >
                        But how I think that defines me..."
                    </motion.div>

                </div>
            </AnimatePresence>

            {/* Subtle Progress Bar or Loader */}
            <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: stage > 0 ? '200px' : 0, opacity: stage > 0 ? 1 : 0 }}
                transition={{ duration: 5.7, ease: "linear" }}
                className="absolute bottom-12 h-0.5 bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"
            />
        </div>
    );
};

export default CinematicIntro;
