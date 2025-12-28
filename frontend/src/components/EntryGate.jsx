import React from 'react';
import { motion } from 'framer-motion';
import config from '../portfolio.config';
import { Lock, ArrowRight } from 'lucide-react';

const EntryGate = ({ onUnlock }) => {
    return (
        <div className="h-screen w-screen bg-[var(--color-bg-deep)] flex-center relative overflow-hidden">
            {/* Background Ambience (Subtle Grid or Noise can go here) */}
            <div className="absolute inset-0 opacity-10 pointer-events-none" style={{
                backgroundImage: 'radial-gradient(circle at 50% 50%, #222 1px, transparent 1px)',
                backgroundSize: '40px 40px'
            }}></div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="max-w-2xl px-6 text-center space-y-12 z-10"
            >
                {/* Status Indicator */}
                <div className="flex-center space-x-2 text-[var(--color-accent-orange)] font-mono text-xs tracking-widest uppercase mb-8">
                    <Lock size={12} />
                    <span>{config.entry.title}</span>
                    <span className="w-2 h-2 rounded-full bg-[var(--color-accent-orange)] animate-pulse"></span>
                </div>

                {/* The Note */}
                <h1 className="text-xl md:text-2xl leading-relaxed font-light text-[var(--color-text-primary)]">
                    {config.entry.message.split('\n').map((line, i) => (
                        <span key={i} className="block mb-2">{line}</span>
                    ))}
                </h1>

                {/* Secondary Subtitle */}
                <p className="text-[var(--color-text-secondary)] text-sm font-mono mt-4">
                    {config.entry.subtitle}
                </p>

                {/* The Action Button */}
                <motion.button
                    whileHover={{ scale: 1.05, borderColor: 'var(--color-accent-green)', color: 'var(--color-accent-green)' }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onUnlock}
                    className="mt-12 px-8 py-4 bg-transparent border border-[var(--border-subtle)] 
                               text-[var(--color-text-primary)] font-mono text-sm tracking-widest uppercase 
                               hover:bg-[var(--glass-overlay)] transition-all duration-300 flex-center mx-auto gap-3 group"
                >
                    {config.entry.buttonText}
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </motion.button>
            </motion.div>
        </div>
    );
};

export default EntryGate;
