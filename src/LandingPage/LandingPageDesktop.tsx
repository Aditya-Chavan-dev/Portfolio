import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { TypewriterText, Cursor } from './components';

export const LandingPageDesktop: React.FC<{ onEnter: () => void }> = ({ onEnter }) => {
    const [sequence, setSequence] = useState({
        line1Part1Done: false,
        line1Done: false,
        line2Part1Done: false,
        line2Part2Done: false,
        line2Part3Done: false,
        showDisclaimer: false
    });



    return (
        <div className="relative w-full h-screen overflow-hidden bg-obsidian text-primary font-sans flex flex-col">

            {/* SECTION 1: Dialogue (Top 40%) */}
            <motion.div
                layout
                transition={{ type: "spring", stiffness: 120, damping: 20 }}
                className={`flex items-end justify-center w-full px-6 pb-6 text-center z-10 will-change-transform ${sequence.showDisclaimer ? 'flex-disclaimer-small' : 'flex-disclaimer-large'
                    }`}
            >
                <motion.div layout className="flex flex-col gap-4 text-2xl md:text-5xl font-light tracking-wide leading-relaxed min-h-[140px]">
                    {/* Line 1 */}
                    <div className="h-[60px] flex-center">
                        <TypewriterText
                            text="It's not how I write the code..."
                            onComplete={() => setTimeout(() => setSequence(s => ({ ...s, line1Done: true })), 500)}
                        />
                        {!sequence.line1Done && <Cursor />}
                    </div>

                    {/* Line 2 */}
                    <div className="h-[60px] flex-center">
                        {sequence.line1Done && (
                            <>
                                <TypewriterText
                                    text="But how I"
                                    onComplete={() => setSequence(s => ({ ...s, line2Part1Done: true }))}
                                />
                                {sequence.line2Part1Done && (
                                    <motion.span
                                        initial={{ color: "#ffffff" }}
                                        animate={{ color: sequence.showDisclaimer ? "#FFD700" : "#ffffff" }}
                                        transition={{ duration: 0.8, delay: 0.5 }}
                                        className="inline-block mx-3 font-bold"
                                    >
                                        <TypewriterText
                                            text="think"
                                            onComplete={() => setSequence(s => ({ ...s, line2Part2Done: true }))}
                                        />
                                    </motion.span>
                                )}
                                {sequence.line2Part2Done && (
                                    <TypewriterText
                                        text="that defines me."
                                        onComplete={() => setTimeout(() => setSequence(s => ({ ...s, line2Part3Done: true, showDisclaimer: true })), 1000)}
                                    />
                                )}
                                <span className={`transition-opacity duration-slower ${sequence.showDisclaimer ? "opacity-0" : "opacity-100"}`}>
                                    <Cursor />
                                </span>
                            </>
                        )}
                    </div>
                </motion.div>
            </motion.div>

            {/* SECTION 2: Disclaimer (Top 30%) */}
            <motion.div
                layout
                transition={{ type: "spring", stiffness: 120, damping: 20 }}
                className={`flex items-start justify-center w-full px-6 pt-6 z-10 overflow-hidden will-change-transform ${sequence.showDisclaimer ? 'flex-disclaimer-medium' : 'flex-0'
                    }`}
            >

                {sequence.showDisclaimer && (
                    <motion.div
                        layout
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1.5, delay: 0.2 }}
                        className="max-w-2xl text-sm md:text-lg text-secondary border-l-2 border-gold-muted/30 pl-8 py-4 text-left space-y-4"
                    >
                        <p>
                            <strong className="text-white block mb-2 text-xs md:text-sm tracking-widest uppercase">System Protocol: Absolute Truth</strong>
                            Nothing in this page is assumed or inflated. Every number you see is a deliberate decision made by the developer himself.
                        </p>
                        <p>
                            This portfolio has a unique blend of creative thinking and great features.
                        </p>
                    </motion.div>
                )}
            </motion.div>

            {/* SECTION 3: Button (Rest) */}
            <motion.div
                layout
                transition={{ type: "spring", stiffness: 120, damping: 20 }}
                className={`flex items-start justify-center w-full px-6 pt-14 z-10 overflow-hidden will-change-transform ${sequence.showDisclaimer ? 'flex-disclaimer-medium' : 'flex-disclaimer-large'
                    }`}
            >
                {sequence.showDisclaimer && (
                    <motion.button
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                        onClick={onEnter}
                        className="btn-primary group"
                    >
                        <span>Let's Go</span>
                        <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform text-black" />
                    </motion.button>
                )}
            </motion.div>
        </div>
    );
};
