import React, { useState, useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import config from '../../portfolio.config';
import { Lock, ArrowRight } from 'lucide-react';

const EntryGate = ({ onUnlock }) => {
    const shouldReduceMotion = useReducedMotion();
    const [isFocused, setIsFocused] = useState(false);
    const [showPulse, setShowPulse] = useState(false);
    const [configLoaded, setConfigLoaded] = useState(false);

    // Refs for focus management
    const containerRef = useRef(null);
    const buttonRef = useRef(null);

    // 1. Loading State & Config Check
    useEffect(() => {
        if (config && config.entry) {
            setConfigLoaded(true);
        }
    }, []);

    // 2. Focus Trap & Auto-focus
    useEffect(() => {
        // Auto-focus the button when component mounts (if accessible)
        const timer = setTimeout(() => {
            if (buttonRef.current) {
                buttonRef.current.focus();
            }
        }, 1000); // Small delay to allow enter animation

        // Basic Focus Trap
        const handleTabKey = (e) => {
            if (e.key === 'Tab') {
                e.preventDefault();
                // Since there's only one interactive element, we keep focus on it
                if (buttonRef.current) {
                    buttonRef.current.focus();
                }
            }
        };

        document.addEventListener('keydown', handleTabKey);
        return () => {
            document.removeEventListener('keydown', handleTabKey);
            clearTimeout(timer);
        };
    }, []);

    // 3. Idle Pulse Microinteraction
    useEffect(() => {
        const pulseTimer = setTimeout(() => {
            setShowPulse(true);
        }, 5000); // Trigger after 5s of inactivity

        return () => clearTimeout(pulseTimer);
    }, []);

    // 4. Keyboard Accessibility Handler
    const handleKeyPress = (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onUnlock();
        }
    };

    // Animation Variants (Adaptive)
    const containerAnimation = shouldReduceMotion ? {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { duration: 0.3 }
    } : {
        initial: { opacity: 0, scale: 0.95 },
        animate: { opacity: 1, scale: 1 },
        transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] }
    };

    if (!configLoaded) {
        return (
            <div className="h-full w-full bg-[var(--color-bg-deep)] flex items-center justify-center">
                <div className="w-12 h-12 border-2 border-cyan-500/20 border-t-cyan-400 rounded-full animate-spin" />
            </div>
        );
    }

    const messageLines = config.entry.message.split('\n');

    return (
        <div
            ref={containerRef}
            className="h-full w-full bg-[var(--color-bg-deep)] overflow-y-auto overflow-x-hidden relative scrollbar-thin scrollbar-thumb-cyan-900/20 scrollbar-track-black"
        >
            {/* Optimization: GPU-Accelerated Background (No heavy blur) */}
            {!shouldReduceMotion && (
                <div className="fixed inset-0 overflow-hidden pointer-events-none">
                    <div
                        className="absolute inset-0"
                        style={{
                            background: `
                                radial-gradient(circle at 15% 25%, rgba(6, 182, 212, 0.04) 0%, transparent 45%),
                                radial-gradient(circle at 85% 80%, rgba(168, 85, 247, 0.04) 0%, transparent 45%)
                            `,
                            willChange: 'transform' // Hint for compositor
                        }}
                    />
                </div>
            )}

            <div className="min-h-full w-full flex flex-col items-center justify-center p-6 py-12 md:py-12 relative z-10">
                <motion.div
                    {...containerAnimation}
                    className="max-w-6xl w-full text-center space-y-8 md:space-y-12"
                >
                    {/* Status Indicator */}
                    <div className="inline-flex items-center space-x-3 px-4 py-2 rounded-full border border-[var(--border-subtle)] bg-[var(--glass-overlay)] backdrop-blur-sm mb-4 md:mb-8">
                        <Lock size={12} className="text-[var(--color-accent-orange)]" />
                        <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-[var(--color-text-secondary)]">
                            {config.entry.title}
                        </span>
                        <span className={`w-1.5 h-1.5 rounded-full bg-[var(--color-accent-orange)] shadow-[0_0_10px_var(--color-accent-orange)] ${!shouldReduceMotion && 'animate-pulse'}`}></span>
                    </div>

                    {/* Staggered Text Animation */}
                    <div className="space-y-6">
                        <h1 className="text-base md:text-2xl leading-relaxed md:leading-loose font-light text-[var(--color-text-primary)] font-display tracking-wide">
                            {messageLines.map((line, i) => (
                                <motion.span
                                    key={i}
                                    initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
                                    animate={{ opacity: 0.9, y: 0 }}
                                    transition={{
                                        delay: shouldReduceMotion ? 0 : 0.3 + (i * 0.15),
                                        duration: 0.6,
                                        ease: [0.22, 1, 0.36, 1]
                                    }}
                                    className="block mb-6 md:mb-8"
                                >
                                    {line}
                                </motion.span>
                            ))}
                        </h1>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.6 }}
                            transition={{ delay: shouldReduceMotion ? 0 : 0.9, duration: 0.5 }}
                            className="text-[var(--color-text-secondary)] text-xs font-mono tracking-widest uppercase"
                        >
                            {config.entry.subtitle}
                        </motion.p>
                    </div>

                    {/* Optimized Interactive Button */}
                    <motion.button
                        ref={buttonRef}
                        whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
                        whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
                        animate={showPulse && !shouldReduceMotion ? {
                            scale: [1, 1.015, 1],
                            boxShadow: [
                                '0 0 0px rgba(0,240,255,0)',
                                '0 0 20px rgba(0,240,255,0.2)', // Subtle pulse
                                '0 0 0px rgba(0,240,255,0)'
                            ]
                        } : {}}
                        transition={showPulse && !shouldReduceMotion ? {
                            duration: 3,
                            repeat: Infinity,
                            repeatDelay: 4
                        } : {}}
                        onClick={onUnlock}
                        onKeyDown={handleKeyPress}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        aria-label="Initialize live portfolio session"
                        tabIndex={0}
                        className={`
                            group relative mt-8 md:mt-16 mx-auto w-full max-w-xs md:max-w-none 
                            px-6 md:px-10 py-5 bg-transparent overflow-hidden rounded-sm cursor-pointer outline-none
                            ${isFocused ? 'ring-1 ring-cyan-400 ring-offset-2 ring-offset-black' : ''}
                        `}
                    >
                        {/* Focus/Hover State Borders */}
                        <div className={`
                            absolute inset-0 border border-[var(--color-accent-blue)] 
                            transition-all duration-500 rounded-sm
                            ${isFocused ? 'opacity-100 shadow-[0_0_30px_rgba(0,240,255,0.6)]' : 'opacity-30 group-hover:opacity-100 group-hover:shadow-[0_0_20px_rgba(0,240,255,0.4)]'}
                        `}></div>

                        {/* Background Fill */}
                        <div className={`
                            absolute inset-0 bg-[var(--color-accent-blue)] transition-opacity duration-300
                            ${isFocused ? 'opacity-10' : 'opacity-0 group-hover:opacity-5'}
                        `}></div>

                        <div className="relative flex items-center justify-center gap-4 text-[var(--color-accent-blue)] font-mono text-sm tracking-[0.2em] uppercase group-hover:text-white transition-colors duration-300">
                            <span>{config.entry.buttonText}</span>
                            <ArrowRight
                                size={16}
                                className={`
                                    transition-all duration-300
                                    ${isFocused ? 'translate-x-2 drop-shadow-[0_0_8px_rgba(255,255,255,1)]' : 'group-hover:translate-x-1 group-hover:drop-shadow-[0_0_5px_rgba(255,255,255,0.8)]'}
                                `}
                            />
                        </div>
                    </motion.button>
                </motion.div>
            </div>
        </div>
    );
};

export default EntryGate;
