import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Database, Cpu, User, FileText, Users, Activity, ChevronRight } from 'lucide-react';
import { trackMetric, fetchMetrics } from '../services/tracking';
import CountUp from './ui/CountUp';

const JourneyHub = ({ onSelection }) => {
    const [immersiveCount, setImmersiveCount] = useState(null);

    useEffect(() => {
        const loadStats = async () => {
            const data = await fetchMetrics();
            if (data?.visitorStats?.immersive) {
                setImmersiveCount(data.visitorStats.immersive);
            } else {
                setImmersiveCount(0); // Fallback
            }
        };
        loadStats();
    }, []);

    return (
        <div className="relative w-full h-full flex flex-col items-center justify-center bg-[#050505] overflow-hidden selection:bg-cyan-500/30 pt-10">

            {/* Ambient Background Aura */}
            <div className="absolute inset-0 pointer-events-none">
                <div
                    className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-[radial-gradient(circle,rgba(34,211,238,0.04)_0%,transparent_70%)]"
                    style={{ willChange: 'opacity' }}
                />
            </div>

            <div className="relative z-10 w-full max-w-5xl px-8 flex flex-col justify-center items-center h-full gap-10 md:gap-14">

                {/* 
                  --- SECTION 1: THE IMMERSIVE GATEWAY --- 
                */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full flex-shrink-0"
                >
                    <button
                        onClick={() => {
                            trackMetric('paths', 'immersive');
                            onSelection('STORY');
                        }}
                        className="group relative w-full h-52 md:h-64 lg:h-72 bg-[#080808] border border-white/10 rounded-[2rem] overflow-hidden transition-all duration-700 hover:border-cyan-500/40 shadow-2xl"
                    >
                        {/* Interactive Sheen */}
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 bg-gradient-to-r from-transparent via-cyan-500/5 to-transparent skew-x-[-20deg] translate-x-[-100%] group-hover:translate-x-[100%]" />

                        <div className="relative h-full flex flex-col items-center justify-center text-center p-6 z-10">
                            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/5 border border-cyan-500/10 mb-4 group-hover:bg-cyan-500/10 group-hover:border-cyan-500/30 transition-all duration-500">
                                <Activity size={10} className="text-cyan-400 animate-pulse" />
                                <span className="text-[9px] font-mono text-cyan-400 tracking-[0.3em] uppercase">Initialize Experience</span>
                            </div>

                            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white group-hover:text-cyan-50 group-hover:scale-105 transition-all duration-700 leading-tight">
                                Start Immersive Journey
                            </h2>
                            <p className="mt-4 text-gray-500 font-mono text-[10px] md:text-xs lg:text-sm max-w-md group-hover:text-gray-300 transition-colors">
                                Experience a non-linear narrative exploring system design, visual engineering, and strategic execution.
                            </p>

                            {/* CONDENSED LIVE STATS */}
                            <div className="mt-8 relative">
                                {/* Subtle Glow Background */}
                                <div className="absolute inset-0 bg-cyan-500/10 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                                <div className="relative flex items-center gap-4 bg-white/[0.03] backdrop-blur-xl px-6 py-4 rounded-3xl border border-white/5 group-hover:border-cyan-500/20 transition-all duration-500 shadow-xl">

                                    {/* Icon with Live Signal */}
                                    <div className="relative flex-shrink-0">
                                        <div className="absolute -top-1 -right-1 w-2 h-2 bg-cyan-500 rounded-full" />
                                        <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400">
                                            <Users size={20} strokeWidth={1.5} />
                                        </div>
                                    </div>

                                    <div className="text-left flex flex-col justify-center">
                                        <div className="text-[9px] font-mono text-cyan-400/60 uppercase tracking-[0.2em] font-bold mb-1">
                                            System Adoption
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="text-2xl md:text-3xl font-bold text-white tracking-tighter tabular-nums drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                                                {immersiveCount !== null ? (
                                                    <CountUp end={immersiveCount} duration={2500} />
                                                ) : (
                                                    <span className="opacity-20 animate-pulse">---</span>
                                                )}
                                            </div>
                                            <div className="text-[10px] font-mono text-gray-500 uppercase tracking-widest leading-none font-medium border-l border-white/10 pl-3">
                                                Users chose journeys
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Animated Ground Light */}
                        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
                    </button>
                </motion.div>

                {/* 
                  --- SECTION 2: TACTICAL QUICK LINKS --- 
                */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="w-full flex-shrink-0"
                >
                    <div className="w-full flex items-center gap-6 mb-8 opacity-20">
                        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                        <span className="text-[10px] font-mono text-white tracking-[0.6em] uppercase whitespace-nowrap">Direct Access</span>
                        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 w-full max-w-4xl mx-auto">
                        <QuickAction icon={Database} label="Projects" onClick={() => onSelection('PROJECTS')} />
                        <QuickAction icon={Cpu} label="Skills" onClick={() => onSelection('SKILLS')} />
                        <QuickAction icon={User} label="About" onClick={() => onSelection('ABOUT')} />
                        <QuickAction icon={FileText} label="Resume" onClick={() => onSelection('RESUME')} />
                    </div>
                </motion.div>

            </div>
        </div>
    );
};

// Tactical Action Sub-component
const QuickAction = ({ icon: Icon, label, onClick }) => (
    <button
        onClick={onClick}
        className="group relative flex flex-col items-center justify-center py-6 md:py-8 rounded-3xl bg-[#080808] border border-white/5 transition-all duration-500 hover:bg-white/[0.03] hover:border-cyan-500/20 hover:-translate-y-1 shadow-xl"
    >
        <div className="text-gray-500 group-hover:text-cyan-400 group-hover:scale-110 transition-all duration-500 p-2.5 md:p-3 rounded-2xl bg-white/[0.02] mb-3">
            <Icon size={20} strokeWidth={1.5} />
        </div>
        <span className="text-[9px] md:text-[10px] font-bold text-gray-400 uppercase tracking-widest group-hover:text-white transition-colors">{label}</span>

        {/* Subtle Indicator */}
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-40 transition-opacity">
            <div className="w-1 h-1 bg-cyan-400 rounded-full" />
        </div>
    </button>
);

export default JourneyHub;
