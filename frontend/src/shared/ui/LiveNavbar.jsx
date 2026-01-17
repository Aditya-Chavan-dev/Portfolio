import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchMetrics } from '../../services/tracking';
import { useSWR } from '../../services/useSWR';
import TelemetryDeck from './TelemetryDeck';
import TimeModule from './TimeModule';

const LiveNavbar = ({ compactMode = false }) => {
    // Gold Standard #10: Zombie Check (SWR)
    const { data } = useSWR('metrics', fetchMetrics);
    const stats = data?.visitorStats || null;

    return (
        <motion.nav
            layout
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
            className={`fixed top-0 right-0 z-[100] flex items-center justify-end transition-all duration-500 ${compactMode
                    ? 'w-auto p-3 md:p-6'
                    : 'w-full h-24 bg-[#050505]/90 backdrop-blur-md border-b border-white/10 shadow-2xl'
                }`}
        >
            <motion.div
                layout
                className={`flex items-center justify-between ${compactMode
                        ? 'gap-2 md:gap-6'
                        : 'w-full max-w-[1600px] mx-auto px-6 md:px-12'
                    }`}
            >

                {/* 1. BRAND IDENTITY - Hidden in Compact Mode */}
                <AnimatePresence mode="popLayout">
                    {!compactMode && (
                        <motion.div
                            initial={{ opacity: 0, x: -20, width: 0 }}
                            animate={{ opacity: 1, x: 0, width: 'auto' }}
                            exit={{ opacity: 0, x: -20, width: 0 }}
                            transition={{ duration: 0.3 }}
                            className="flex items-center gap-5 whitespace-nowrap overflow-hidden"
                        >
                            <div className="relative flex items-center justify-center w-12 h-12 bg-white/5 rounded-full border border-white/10 shadow-[0_0_20px_rgba(0,255,255,0.1)]">
                                <div className="w-3 h-3 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_10px_rgba(34,211,238,0.8)]" />
                            </div>
                            <div className="flex flex-col justify-center">
                                <span className="text-lg font-display text-white font-bold tracking-wide leading-tight">
                                    NEXUS <span className="text-cyan-400">PORTFOLIO</span>
                                </span>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* 2. METRICS TELEMETRY */}
                <motion.div
                    layout
                    className={`flex items-center gap-3 md:gap-8 ${compactMode
                            ? 'bg-[#050505]/95 backdrop-blur-2xl border border-white/10 rounded-full pl-2 pr-6 py-2 shadow-2xl'
                            : ''
                        }`}
                >
                    <TelemetryDeck stats={stats} compact={compactMode} />

                    {/* Time Module - Isolated to prevent re-renders */}
                    <TimeModule compact={compactMode} />
                </motion.div>

            </motion.div>
        </motion.nav>
    );
};

export default LiveNavbar;
