import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import config from '../../portfolio.config';
import { Terminal, CheckCircle2 } from 'lucide-react';

const SessionHandshake = ({ onComplete }) => {
    const [currentStep, setCurrentStep] = useState(0);
    const steps = config.handshake.steps;

    useEffect(() => {
        // Faster timing: 600ms per step
        if (currentStep < steps.length) {
            const timeout = setTimeout(() => {
                setCurrentStep(prev => prev + 1);
            }, 600);
            return () => clearTimeout(timeout);
        } else {
            const timeout = setTimeout(() => {
                onComplete();
            }, 800);
            return () => clearTimeout(timeout);
        }
    }, [currentStep, steps.length, onComplete]);

    const formatStep = (key) => {
        return key.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    };

    // Scramble Effect Component
    const CyberText = ({ text, active }) => {
        const [display, setDisplay] = useState(active ? '' : text);
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*";

        useEffect(() => {
            if (!active) {
                setDisplay(text);
                return;
            }

            let iterations = 0;
            const interval = setInterval(() => {
                setDisplay(text.split('').map((char, i) => {
                    if (i < iterations) return char;
                    return chars[Math.floor(Math.random() * chars.length)];
                }).join(''));

                if (iterations >= text.length) clearInterval(interval);
                iterations += 1 / 2; // Decrypt speed
            }, 50); // Throttled for performance

            return () => clearInterval(interval);
        }, [text, active]);

        return <span>{display}</span>;
    };

    return (
        <div className="h-screen w-screen bg-[var(--color-bg-deep)] flex-center flex-col font-mono text-[var(--color-accent-green)] relative overflow-hidden">

            {/* Matrix Rain / Background Noise */}
            <div className="absolute inset-0 z-0 opacity-10" style={{ backgroundImage: 'url("/assets/noise.svg")' }}></div>

            <div className="absolute inset-0 pointer-events-none z-20" style={{
                background: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))',
                backgroundSize: '100% 4px, 4px 100%'
            }}></div>

            <div className="w-full max-w-md p-6 relative z-30">

                {/* Terminal Header */}
                <div className="flex items-center space-x-2 border-b border-[var(--border-subtle)] pb-4 mb-6 opacity-70 text-glow">
                    <Terminal size={14} className="animate-pulse" />
                    <span className="text-xs uppercase tracking-widest text-[#00ff94] text-glow">Secure Handshake Protocol</span>
                </div>

                {/* Steps Output */}
                <div className="space-y-3">
                    {steps.map((stepKey, index) => {
                        const isActive = index === currentStep;
                        const isPast = index < currentStep;

                        return (
                            <motion.div
                                key={stepKey}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: isPast || isActive ? 1 : 0.3, x: 0 }}
                                className="flex items-center space-x-3 text-sm h-6"
                            >
                                <span className="opacity-50">{`>`}</span>
                                <span className={isActive ? "text-[#00ff94] text-glow font-bold" : "text-[var(--color-text-secondary)]"}>
                                    <CyberText text={formatStep(stepKey)} active={isActive} />
                                </span>
                                {isPast && (
                                    <motion.span
                                        initial={{ scale: 0, rotate: -180 }}
                                        animate={{ scale: 1, rotate: 0 }}
                                        className="text-[var(--color-accent-blue)] text-glow"
                                    >
                                        <CheckCircle2 size={12} />
                                    </motion.span>
                                )}
                            </motion.div>
                        );
                    })}
                </div>

                {/* Completion Message */}
                {currentStep >= steps.length && (
                    <motion.div
                        initial={{ opacity: 0, scale: 1.5, filter: "blur(4px)" }}
                        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        className="mt-8 text-center"
                        style={{ willChange: 'opacity, transform, filter' }}
                    >
                        <div className="text-[var(--color-text-primary)] text-xl tracking-[0.5em] uppercase text-glow font-bold animate-pulse text-transparent bg-clip-text bg-gradient-to-r from-white to-[var(--color-accent-green)]">
                            {config.handshake.completionMessage}
                        </div>
                        <div className="h-0.5 w-full bg-[var(--color-accent-green)] mt-2 shadow-[0_0_20px_var(--color-accent-green)]"></div>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default SessionHandshake;
