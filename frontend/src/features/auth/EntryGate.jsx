import React from 'react';
import { motion } from 'framer-motion';
import config from '../../portfolio.config';
import { Lock, ArrowRight, Zap } from 'lucide-react';

const EntryGate = ({ onUnlock }) => {
    return (
        <div className="h-full w-full bg-[var(--color-bg-deep)] overflow-y-auto overflow-x-hidden relative scrollbar-thin scrollbar-thumb-cyan-900/20 scrollbar-track-black">

            {/* Ambient Particles / Background Glow */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div
                    className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-[var(--color-accent-blue)] opacity-[0.05] blur-[60px] rounded-full mix-blend-screen animate-pulse duration-[4s]"
                    style={{ willChange: 'opacity, transform' }}
                ></div>
                <div
                    className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-[var(--color-accent-purple)] opacity-[0.05] blur-[80px] rounded-full mix-blend-screen"
                    style={{ willChange: 'opacity' }}
                ></div>
            </div>

            <div className="min-h-full w-full flex flex-col items-center justify-center p-6 py-12 md:py-12 relative z-10">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }} // Custom Quint easing
                    className="max-w-6xl w-full text-center space-y-8 md:space-y-12"
                >
                    {/* Status Indicator - Tech Pill Style */}
                    <div className="inline-flex items-center space-x-3 px-4 py-2 rounded-full border border-[var(--border-subtle)] bg-[var(--glass-overlay)] backdrop-blur-sm mb-4 md:mb-8">
                        <Lock size={12} className="text-[var(--color-accent-orange)]" />
                        <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-[var(--color-text-secondary)]">
                            {config.entry.title}
                        </span>
                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent-orange)] shadow-[0_0_10px_var(--color-accent-orange)] animate-pulse"></span>
                    </div>

                    {/* The Note - Cinematic Typography */}
                    <div className="space-y-6">
                        <h1 className="text-base md:text-2xl leading-relaxed md:leading-loose font-light text-[var(--color-text-primary)] font-display tracking-wide">
                            {config.entry.message.split('\n').map((line, i) => (
                                <span key={i} className="block mb-6 md:mb-8 opacity-90">{line}</span>
                            ))}
                        </h1>

                        <p className="text-[var(--color-text-secondary)] text-xs font-mono tracking-widest uppercase opacity-60">
                            {config.entry.subtitle}
                        </p>
                    </div>

                    {/* The Reactor Button */}
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={onUnlock}
                        className="group relative mt-8 md:mt-16 mx-auto w-full max-w-xs md:max-w-none px-6 md:px-10 py-5 bg-transparent overflow-hidden rounded-sm cursor-pointer"
                    >
                        {/* Glowing Borders */}
                        <div className="absolute inset-0 border border-[var(--color-accent-blue)] opacity-30 group-hover:opacity-100 group-hover:shadow-[0_0_20px_rgba(0,240,255,0.4)] transition-all duration-500 rounded-sm"></div>

                        {/* Background Fill on Hover */}
                        <div className="absolute inset-0 bg-[var(--color-accent-blue)] opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>

                        <div className="relative flex items-center justify-center gap-4 text-[var(--color-accent-blue)] font-mono text-sm tracking-[0.2em] uppercase group-hover:text-white transition-colors duration-300">
                            <span>{config.entry.buttonText}</span>
                            <ArrowRight size={16} className="group-hover:translate-x-1 group-hover:drop-shadow-[0_0_5px_rgba(255,255,255,0.8)] transition-all duration-300" />
                        </div>
                    </motion.button>
                </motion.div>
            </div>
        </div>
    );
};

export default EntryGate;
