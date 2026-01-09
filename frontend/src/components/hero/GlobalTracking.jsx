import React from 'react';
import { motion } from 'framer-motion';

const GlobalTracking = ({ visitorStats = { resume: 0, linkedin: 0, anonymous: 0 }, layoutId, className = "" }) => {
    return (
        <motion.div
            layoutId={layoutId}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`bg-black/80 backdrop-blur-md border border-[rgba(255,255,255,0.1)] rounded-xl p-4 md:p-5 flex flex-col justify-between relative overflow-hidden group ${className}`}
        >
            {/* Header Section */}
            <div className="flex justify-between items-start mb-4">
                <div className="flex flex-col">
                    <h3 className="font-hitmarker text-[var(--color-text-secondary)] text-[10px] tracking-[0.2em] uppercase mb-1 opacity-70">
                        Global Tracking
                    </h3>
                    <div className="text-[var(--color-accent-orange)] text-[10px] font-mono tracking-widest uppercase">
                        ID: SEC-B91-FB
                    </div>
                </div>

                {/* Live Indicator */}
                <div className="flex flex-col items-center gap-1">
                    <div className="relative">
                        <div className="w-2.5 h-2.5 bg-[#FF3333] rounded-full shadow-[0_0_10px_#FF3333]"></div>
                        <div className="absolute inset-0 w-full h-full bg-[#FF3333] rounded-full animate-ping opacity-75"></div>
                    </div>
                    <span className="text-[8px] text-[#FF3333] font-mono uppercase tracking-widest mt-1">LIVE</span>
                </div>
            </div>

            {/* Main Stats with Heading */}
            <div className="space-y-3">
                <div className="text-[var(--color-text-primary)] text-[11px] font-mono uppercase border-l-2 border-[var(--color-text-secondary)] pl-2 opacity-80">
                    People Visited From
                </div>

                <div className="flex justify-between items-end pt-2 border-t border-[rgba(255,255,255,0.05)]">
                    <div className="text-center">
                        <div className="text-[var(--color-accent-blue)] font-hitmarker text-xs mb-1">RES</div>
                        <div className="text-xl md:text-2xl font-hitmarker text-white font-bold">{visitorStats.resume}</div>
                    </div>

                    <div className="w-[1px] h-8 bg-[rgba(255,255,255,0.1)]"></div>

                    <div className="text-center">
                        <div className="text-[var(--color-accent-blue)] font-hitmarker text-xs mb-1">LNK</div>
                        <div className="text-xl md:text-2xl font-hitmarker text-white font-bold">{visitorStats.linkedin}</div>
                    </div>

                    <div className="w-[1px] h-8 bg-[rgba(255,255,255,0.1)]"></div>

                    <div className="text-center">
                        <div className="text-gray-500 font-hitmarker text-xs mb-1">UNK</div>
                        <div className="text-xl md:text-2xl font-hitmarker text-white font-bold">{visitorStats.anonymous}</div>
                    </div>
                </div>
            </div>

            {/* Scanline Effect */}
            <div className="absolute inset-0 pointer-events-none opacity-10 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]"></div>
        </motion.div>
    );
};

export default GlobalTracking;
