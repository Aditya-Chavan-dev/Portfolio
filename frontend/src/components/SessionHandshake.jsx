import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import config from '../portfolio.config';
import { Terminal, CheckCircle2 } from 'lucide-react';

const SessionHandshake = ({ onComplete }) => {
    const [currentStep, setCurrentStep] = useState(0);
    const steps = config.handshake.steps;

    useEffect(() => {
        // Simulate step progression
        if (currentStep < steps.length) {
            const timeout = setTimeout(() => {
                setCurrentStep(prev => prev + 1);
            }, 800); // 800ms per step
            return () => clearTimeout(timeout);
        } else {
            // All steps done, wait a bit then complete
            const timeout = setTimeout(() => {
                onComplete();
            }, 1000);
            return () => clearTimeout(timeout);
        }
    }, [currentStep, steps.length, onComplete]);

    // Format step text to be "human readable" from keys
    const formatStep = (key) => {
        return key.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    };

    return (
        <div className="h-screen w-screen bg-[var(--color-bg-deep)] flex-center flex-col font-mono text-[var(--color-accent-green)]">
            <div className="w-full max-w-md p-6">

                {/* Terminal Header */}
                <div className="flex items-center space-x-2 border-b border-[var(--border-subtle)] pb-4 mb-6 opacity-50">
                    <Terminal size={14} />
                    <span className="text-xs uppercase tracking-widest">Secure Handshake Protocol</span>
                </div>

                {/* Steps Output */}
                <div className="space-y-3">
                    {steps.map((stepKey, index) => (
                        <motion.div
                            key={stepKey}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: index <= currentStep ? 1 : 0.3, x: 0 }}
                            className="flex items-center space-x-3 text-sm h-6"
                        >
                            <span className="opacity-50">{`>`}</span>
                            <span className={index === currentStep ? "animate-pulse" : ""}>
                                {formatStep(stepKey)}...
                            </span>
                            {index < currentStep && (
                                <motion.span
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="text-[var(--color-accent-blue)]"
                                >
                                    <CheckCircle2 size={12} />
                                </motion.span>
                            )}
                        </motion.div>
                    ))}
                </div>

                {/* Completion Message */}
                {currentStep >= steps.length && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="mt-8 text-center text-[var(--color-text-primary)]"
                    >
                        {config.handshake.completionMessage}
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default SessionHandshake;
