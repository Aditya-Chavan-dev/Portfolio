import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

const CinematicIntro = ({ onComplete }) => {
    // Stage 1: "It's not how I write code underneath..."
    // Stage 2: "But how I think that defines me..."
    // Stage 3: Fade out / Complete
    const [stage, setStage] = useState(0);
    const shouldReduceMotion = useReducedMotion();

    useEffect(() => {
        // If user prefers reduced motion, skip animations or speed them up significantly
        // However, since simple skip was declined, we just ensure it's not jarring?
        // Actually, reduced motion generally means "no motion", so we might just shorten delays
        // or just ensure transitions are fades instead of movements.

        const TIMINGS = shouldReduceMotion ? {
            line1: 200,
            line2: 1500,
            complete: 3000
        } : {
            line1: 800,
            line2: 3500,
            complete: 6500
        };

        const timer1 = setTimeout(() => setStage(1), TIMINGS.line1);
        const timer2 = setTimeout(() => setStage(2), TIMINGS.line2);
        const timer3 = setTimeout(() => {
            if (onComplete) onComplete();
        }, TIMINGS.complete);

        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
            clearTimeout(timer3);
        };
    }, [onComplete, shouldReduceMotion]);

    // Adaptive Animation Variants
    const textVariants = shouldReduceMotion ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
        exit: { opacity: 0 }
    } : {
        hidden: { opacity: 0, y: 20, filter: 'blur(10px)' },
        visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
        exit: { opacity: 0, y: -20, filter: 'blur(10px)' }
    };

    return (
        <motion.div
            className="fixed inset-0 z-[200] bg-black flex flex-col items-center justify-center p-8 text-center select-none cursor-none will-change-opacity"
            initial={{ opacity: 1 }}
            exit={{
                opacity: 0,
                transition: { duration: 1.5, ease: "easeInOut" } // Smooth long dissolve exit
            }}
        >
            {/* Ambient Background */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.03),transparent)]" />

            <div className="relative z-10 font-sans tracking-tight leading-relaxed max-w-3xl">

                {/* Line 1 */}
                <motion.div
                    variants={textVariants}
                    initial="hidden"
                    animate={stage >= 1 ? "visible" : "hidden"}
                    transition={{ duration: shouldReduceMotion ? 0.5 : 1.5, ease: "easeOut" }}
                    className="text-2xl md:text-4xl lg:text-5xl text-gray-500 font-light mb-4 md:mb-6"
                    style={{ willChange: 'opacity, transform, filter' }}
                >
                    "It's not how I write code underneath...
                </motion.div>

                {/* Line 2 - The Punchline */}
                <motion.div
                    variants={textVariants}
                    initial="hidden"
                    animate={stage >= 2 ? "visible" : "hidden"}
                    transition={{
                        duration: shouldReduceMotion ? 0.5 : 1.5,
                        delay: shouldReduceMotion ? 0 : 0.2,
                        ease: "easeOut"
                    }}
                    className="text-2xl md:text-4xl lg:text-5xl text-white font-medium italic"
                    style={{ willChange: 'opacity, transform, filter' }}
                >
                    But how I think that defines me..."
                </motion.div>

            </div>

            {/* Subtle Progress Bar */}
            {!shouldReduceMotion && (
                <motion.div
                    initial={{ scaleX: 0, opacity: 0 }}
                    animate={{
                        scaleX: stage > 0 ? 1 : 0,
                        opacity: stage > 0 ? 1 : 0
                    }}
                    transition={{
                        scaleX: { duration: 5.7, ease: "linear" }, // Synced with total time
                        opacity: { duration: 0.3 }
                    }}
                    style={{ originX: 0 }}
                    className="absolute bottom-12 w-[200px] h-0.5 bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"
                />
            )}
        </motion.div>
    );
};

export default CinematicIntro;
