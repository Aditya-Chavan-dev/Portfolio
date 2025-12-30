import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useSpring } from 'framer-motion';
import { subscribeToVisits } from '../services/tracking';
import MagicCounter from './ui/MagicCounter';

const GlobalStatsHUD = ({ sessionId }) => {
    const [counts, setCounts] = useState({ linkedin: 0, resume: 0, anonymous: 0 });
    const [prevTotal, setPrevTotal] = useState(0);
    const [highlight, setHighlight] = useState(false);

    useEffect(() => {
        const unsubscribe = subscribeToVisits((newCounts) => {
            setCounts(newCounts);

            const total = newCounts.linkedin + newCounts.resume + newCounts.anonymous;
            if (total > prevTotal && prevTotal !== 0) {
                setHighlight(true);
                setTimeout(() => setHighlight(false), 2000); // 2s flash
            }
            setPrevTotal(total);
        });

        return () => unsubscribe();
    }, [prevTotal]);

    const items = [
        { label: 'RES', count: counts.resume, color: 'text-blue-400' },
        { label: 'LNK', count: counts.linkedin, color: 'text-cyan-400' },
        { label: 'UNK', count: counts.anonymous, color: 'text-gray-400' },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-[10000] pointer-events-none"
        >
            <div className={`
                backdrop-blur-md bg-black/60 border border-white/10 rounded-lg p-2 md:p-3
                shadow-[0_0_20px_rgba(0,0,0,0.5)] flex items-center gap-3 md:gap-4
                transition-all duration-300 scale-90 md:scale-100 origin-bottom-right
                ${highlight ? 'border-[var(--color-accent-green)] shadow-[0_0_20px_var(--color-accent-green)]' : ''}
            `}>
                <div className="flex flex-col gap-1 items-start">
                    <span className="text-[8px] md:text-[10px] uppercase tracking-[0.2em] text-white/50 font-mono">
                        Global Tracking
                    </span>
                    {/* Unique Session ID Display */}
                    <span className="text-[8px] font-mono text-[var(--color-accent-orange)] tracking-wider mb-1">
                        ID: {sessionId || 'INITIALIZING...'}
                    </span>

                    <div className="flex gap-4">
                        {items.map((item) => (
                            <div key={item.label} className="flex flex-col items-center">
                                <span className={`text-xs font-bold font-mono ${item.color}`}>
                                    {item.label}
                                </span>
                                <MagicCounter value={item.count} className="text-sm font-bold text-white font-mono" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Live Indicator */}
                <div className="flex flex-col items-center justify-center pl-3 border-l border-white/10">
                    <div className="relative w-2 h-2">
                        <div className="absolute w-full h-full bg-red-500 rounded-full animate-ping opacity-75"></div>
                        <div className="relative w-2 h-2 bg-red-500 rounded-full"></div>
                    </div>
                    <span className="text-[8px] mt-1 text-red-400 font-mono tracking-wider">LIVE</span>
                </div>
            </div>
        </motion.div>
    );
};

export default GlobalStatsHUD;
