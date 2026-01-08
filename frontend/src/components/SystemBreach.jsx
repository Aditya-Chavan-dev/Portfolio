import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SystemBreach = ({ onComplete }) => {
    const [step, setStep] = useState(0);

    const sequence = [
        { text: "SYSTEM IDENTITY: VERIFIED", delay: 1000, color: "text-[var(--color-accent-green)]", font: "font-mono" },
        { text: "So... You know who I am.", delay: 2500, color: "text-white", font: "font-display" },
        { text: "Now, let's see what powers this.", delay: 2500, color: "text-white", font: "font-display" },
        { text: "Verifying: NO_AI_HALLUCINATIONS_DETECTED", delay: 1500, color: "text-[var(--color-accent-orange)]", font: "font-mono text-xs" },
        { text: "Accessing Core Logic...", delay: 1500, color: "text-[var(--color-accent-blue)]", font: "font-mono" }
    ];

    useEffect(() => {
        let totalDelay = 0;

        sequence.forEach((item, index) => {
            setTimeout(() => {
                setStep(index);
            }, totalDelay);
            totalDelay += item.delay;
        });

        setTimeout(() => {
            onComplete();
        }, totalDelay + 1000);

    }, []);

    return (
        <div className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center p-8 text-center pointer-events-none">
            <AnimatePresence mode="wait">
                <motion.div
                    key={step}
                    initial={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, scale: 0.9, filter: "blur(5px)" }}
                    transition={{ duration: 0.5 }}
                    className={`text-2xl md:text-4xl lg:text-5xl font-bold ${sequence[step].color || 'text-white'} ${sequence[step].font || 'font-sans'}`}
                >
                    {sequence[step].text}
                </motion.div>
            </AnimatePresence>

            {/* Scanline Effect */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-50 bg-[length:100%_2px,3px_100%] pointer-events-none opacity-20"></div>
        </div>
    );
};

export default SystemBreach;
