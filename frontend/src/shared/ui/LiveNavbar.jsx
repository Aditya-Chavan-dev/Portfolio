import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Linkedin, FileText, Clock } from 'lucide-react';
import { fetchMetrics } from '../../services/tracking';
import { useSWR } from '../../services/useSWR';
import CountUp from './CountUp';

const LiveNavbar = ({ compactMode = false }) => {
    // Gold Standard #10: Zombie Check (SWR)
    const { data } = useSWR('metrics', fetchMetrics);
    const stats = data?.visitorStats || null;
    const [time, setTime] = useState(new Date().toLocaleTimeString('en-US', { hour12: false, hour: "2-digit", minute: "2-digit" }));

    useEffect(() => {
        const clockInterval = setInterval(() => setTime(new Date().toLocaleTimeString('en-US', { hour12: false, hour: "2-digit", minute: "2-digit" })), 1000);
        return () => clearInterval(clockInterval);
    }, []);

    const totalViewers = stats ? (stats.linkedin + stats.resume + stats.anonymous) : 0;

    return (
        <motion.nav
            layout
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className={`fixed top-0 right-0 z-[100] flex items-center justify-end ${compactMode ? 'w-auto p-3 md:p-6' : 'w-full h-24 bg-[#050505]/90 backdrop-blur-md border-b border-white/10 shadow-2xl'}`}
        >
            <div className={`flex items-center justify-between ${compactMode ? 'gap-2 md:gap-6' : 'w-full max-w-[1600px] mx-auto px-6 md:px-12'}`}>

                {/* 1. BRAND IDENTITY - Hidden in Compact Mode */}
                <AnimatePresence>
                    {!compactMode && (
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, width: 0, overflow: 'hidden' }}
                            className="flex items-center gap-5 whitespace-nowrap"
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

                {/* 2. METRICS TELEMETRY - Adaptive Layout */}
                <div className={`flex items-center gap-3 md:gap-8 ${compactMode ? 'bg-[#050505]/80 backdrop-blur-2xl border border-white/10 rounded-full px-3 py-2 md:px-8 md:py-3 shadow-2xl' : ''}`}>
                    {/* Compact Stats Row */}
                    <div className="flex items-center gap-3 md:gap-8">
                        {/* Traffic */}
                        <MetricItem icon={Users} value={totalViewers} label="Traffic" compact={compactMode} color="text-white" />

                        {/* Compact Separator */}
                        <div className="hidden md:block h-4 w-px bg-white/10" />

                        {/* LinkedIn */}
                        <div className="hidden md:flex items-center gap-8">
                            <MetricItem icon={Linkedin} value={stats?.linkedin || 0} label="LkdIn" compact={compactMode} color="text-blue-400" />

                            {/* Compact Separator */}
                            <div className="h-4 w-px bg-white/10" />

                            {/* Resume */}
                            <MetricItem icon={FileText} value={stats?.resume || 0} label="Res" compact={compactMode} color="text-amber-400" />
                        </div>
                    </div>


                    {/* 3. TIME / STATUS - Always Visible but Adaptive */}
                    {/* If compact, we merge this into the main pill. If full, it has its own pill. */}
                    <div className={`flex items-center gap-2 md:gap-4 ${compactMode ? 'pl-3 md:pl-4 border-l border-white/10' : 'bg-white/[0.03] border border-white/10 px-6 py-3 rounded-full hover:bg-white/[0.06] transition-colors'} cursor-default`}>
                        {compactMode && <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse shadow-[0_0_8px_rgba(6,182,212,0.8)]" />}
                        <Clock size={16} className="text-gray-400" />
                        <span className="text-sm font-mono text-gray-300 tracking-widest font-medium">
                            {time}
                        </span>
                    </div>
                </div>

            </div>
        </motion.nav>
    );
};

// Adaptive Metric Item
const MetricItem = ({ icon: Icon, value, label, compact, color }) => (
    <div className="flex items-center gap-3 cursor-default group">
        <Icon size={compact ? 16 : 20} className={`${color} opacity-80 group-hover:opacity-100 transition-opacity`} />
        {!compact ? (
            <div className="flex flex-col">
                <span className="text-[10px] font-mono text-gray-500 uppercase tracking-wider">{label}</span>
                <span className="text-lg font-bold tabular-nums leading-none text-white"><CountUp end={value} duration={2000} /></span>
            </div>
        ) : (
            <span className="text-sm font-mono font-bold tabular-nums text-gray-300 group-hover:text-white transition-colors">
                <CountUp end={value} duration={2000} />
            </span>
        )}
    </div>
);

export default LiveNavbar;
