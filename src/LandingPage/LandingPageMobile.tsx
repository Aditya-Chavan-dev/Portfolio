import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { TypewriterText, Cursor } from './components';

export const LandingPageMobile: React.FC<{ onEnter: () => void }> = ({ onEnter }) => {
    const [sequence, setSequence] = useState({
        line1Part1Done: false,
        line1Done: false,
        line2Part1Done: false,
        line2Part2Done: false,
        line2Part3Done: false,
        showDisclaimer: false
    });

    useEffect(() => {
        // Initialize based on device type

    }, []);

    return (
        <div className="relative w-full h-[100dvh] overflow-hidden bg-obsidian text-primary font-sans flex flex-col">

            {/* SECTION 1: Dialogue (Top 40%) */}
            <div
                className="flex items-end justify-center w-full px-4 pb-8 text-center z-10"
                style={{ flex: 0.4 }}
            >
                <div className="flex flex-col gap-3 text-2xl font-light tracking-wide leading-relaxed min-h-[120px]">
                    {/* Line 1 */}
                    <div className="flex flex-col items-center justify-center min-h-[90px]">
                        <div className="h-[40px] flex items-center justify-center">
                            <TypewriterText
                                text="It's not how"
                                onComplete={() => setSequence(s => ({ ...s, line1Part1Done: true }))}
                            />
                            {!sequence.line1Part1Done && <Cursor />}
                        </div>

                        <div className="h-[40px] flex items-center justify-center">
                            {sequence.line1Part1Done && (
                                <>
                                    <TypewriterText
                                        text="I write the code..."
                                        onComplete={() => setTimeout(() => setSequence(s => ({ ...s, line1Done: true })), 500)}
                                    />
                                    {!sequence.line1Done && <Cursor />}
                                </>
                            )}
                        </div>
                    </div>

                    {/* Line 2 - Split into two parts */}
                    <div className="flex flex-col items-center justify-center min-h-[90px]">
                        <div className="h-[40px] flex items-center justify-center">
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
                                            className="inline-block mx-2 font-bold"
                                        >
                                            <TypewriterText
                                                text="think"
                                                onComplete={() => setSequence(s => ({ ...s, line2Part2Done: true }))}
                                            />
                                        </motion.span>
                                    )}
                                </>
                            )}
                        </div>

                        <div className="h-[40px] flex items-center justify-center">
                            {sequence.line2Part2Done && (
                                <TypewriterText
                                    text="That defines me."
                                    onComplete={() => setTimeout(() => setSequence(s => ({ ...s, line2Part3Done: true, showDisclaimer: true })), 1000)}
                                />
                            )}
                            {sequence.line1Done && !sequence.showDisclaimer && <Cursor />}
                        </div>
                    </div>
                </div>
            </div>

            {/* SECTION 2: Disclaimer (Top 40%) */}
            <div
                className="flex items-start justify-center w-full px-4 pt-8 z-10"
                style={{ flex: 0.4 }}
            >
                {sequence.showDisclaimer && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1.5 }}
                        className="max-w-xl text-sm text-secondary border-l-2 border-gold-muted/30 pl-6 py-3 text-left space-y-3"
                    >
                        <p>
                            <strong className="text-white block mb-1 text-[10px] tracking-widest uppercase">System Protocol: Absolute Truth</strong>
                            Nothing in this page is assumed or inflated. Every number you see is a deliberate decision made by the developer himself.
                        </p>
                        <p>
                            This portfolio has a unique blend of creative thinking and great features with
                            <motion.span
                                initial={{ color: "#737373", textShadow: "0px 0px 0px rgba(0,0,0,0)" }}
                                animate={{ color: "#FFD700", textShadow: "0px 0px 20px rgba(255,215,0,0.5)" }}
                                transition={{ duration: 1, delay: 1 }}
                                className="block mt-1 font-bold tracking-wider"
                            >
                                state-of-the-art architecture.
                            </motion.span>
                        </p>
                    </motion.div>
                )}
            </div>

            {/* SECTION 3: Button (Bottom 20%) */}
            <div
                className="flex items-start justify-center w-full px-4 z-10"
                style={{ flex: 0.2 }}
            >
                {sequence.showDisclaimer && (
                    <motion.button
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 2.5, duration: 0.5 }}
                        onClick={onEnter}
                        className="group px-8 py-4 bg-gold-glow text-black border border-gold-glow hover:bg-white rounded-sm uppercase tracking-[0.2em] transition-all duration-300 flex items-center gap-3 cursor-pointer text-sm font-bold shadow-[0_0_20px_rgba(255,215,0,0.3)]"
                    >
                        <span>Let's Go</span>
                        <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform text-black" />
                    </motion.button>
                )}
            </div>
        </div>
    );
};
