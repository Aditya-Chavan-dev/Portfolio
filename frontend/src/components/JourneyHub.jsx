import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Database, Cpu, User, FileText, Users, PlayCircle, ArrowRight } from 'lucide-react';
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
        <div className="relative w-full h-full flex flex-col items-center justify-center bg-[#050505] overflow-hidden selection:bg-cyan-500/30 pt-20">

            {/* Subtle Gradient Background */}
            <div className="absolute inset-0 pointer-events-none">
                <div
                    className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[80vw] h-[80vw] bg-[radial-gradient(circle,rgba(34,211,238,0.03)_0%,transparent_60%)]"
                />
            </div>

            <div className="relative z-10 w-full max-w-[1400px] px-8 md:px-12 flex flex-col justify-center items-center h-full gap-12 md:gap-16">

                {/* 
                  --- SECTION 1: HERO FEATURE (Start Journey) --- 
                */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="w-full"
                >
                    <button
                        onClick={() => {
                            trackMetric('paths', 'immersive');
                            onSelection('STORY');
                        }}
                        className="group relative w-full h-[340px] md:h-[400px] bg-[#0A0A0A] border border-white/10 rounded-[2.5rem] overflow-hidden transition-all duration-500 hover:border-cyan-500/50 hover:shadow-[0_0_50px_rgba(0,0,0,0.5)] flex items-center justify-center text-center"
                    >
                        {/* Background Image / Texture Placeholder */}
                        <div className="absolute inset-0 bg-[url('/assets/noise.svg')] opacity-10" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />

                        {/* Hover Gradient */}
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-br from-cyan-900/10 via-transparent to-purple-900/10" />

                        <div className="relative z-20 flex flex-col items-center max-w-3xl px-6">

                            <div className="mb-6 p-4 rounded-full bg-cyan-500/10 text-cyan-400 group-hover:scale-110 group-hover:bg-cyan-400 group-hover:text-black transition-all duration-500">
                                <PlayCircle size={48} strokeWidth={1.5} />
                            </div>

                            <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-6 tracking-tight group-hover:tracking-normal transition-all duration-500">
                                Enter the Immersive Journey
                            </h2>

                            <p className="text-gray-400 text-lg md:text-xl max-w-2xl font-light leading-relaxed mb-10 group-hover:text-white transition-colors">
                                Explore a non-linear narrative of my work, philosophy, and technical expertise in a cinematic experience.
                            </p>

                            {/* Live Social Proof Badge */}
                            <div className="flex items-center gap-4 py-2 px-5 bg-white/5 rounded-full border border-white/10 backdrop-blur-sm group-hover:bg-white/10 transition-colors">
                                <Users size={16} className="text-cyan-400" />
                                <span className="text-sm text-gray-300 font-mono">
                                    <span className="text-white font-bold">{immersiveCount || '---'}</span> Travelers have entered
                                </span>
                            </div>

                        </div>
                    </button>
                </motion.div>

                {/* 
                  --- SECTION 2: DIRECT ACCESS GRID --- 
                */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                    className="w-full"
                >
                    <div className="flex items-center gap-6 mb-8">
                        <span className="text-xs font-mono text-gray-500 uppercase tracking-[0.2em]">Quick Navigation</span>
                        <div className="h-px flex-1 bg-white/10" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <QuickActionCard
                            icon={Database}
                            title="Projects"
                            desc="Case Studies & Code"
                            onClick={() => onSelection('PROJECTS')}
                        />
                        <QuickActionCard
                            icon={Cpu}
                            title="Tech Stack"
                            desc="Skills & Tools"
                            onClick={() => onSelection('SKILLS')}
                        />
                        <QuickActionCard
                            icon={User}
                            title="About Me"
                            desc="Bio & Philosophy"
                            onClick={() => onSelection('ABOUT')}
                        />
                        <QuickActionCard
                            icon={FileText}
                            title="Resume"
                            desc="Download PDF"
                            onClick={() => onSelection('RESUME')}
                        />
                    </div>
                </motion.div>

            </div>
        </div>
    );
};

// Modern, Clean Card Component
const QuickActionCard = ({ icon: Icon, title, desc, onClick }) => (
    <button
        onClick={onClick}
        className="group relative flex items-center p-6 bg-[#0A0A0A] border border-white/5 rounded-2xl hover:bg-white/[0.03] hover:border-white/20 transition-all duration-300 hover:-translate-y-1 text-left"
    >
        <div className="p-4 rounded-xl bg-white/[0.03] text-gray-400 group-hover:bg-white/[0.08] group-hover:text-cyan-400 transition-colors duration-300 mr-5">
            <Icon size={24} strokeWidth={1.5} />
        </div>

        <div className="flex-1">
            <h3 className="text-lg font-bold text-white mb-1 tracking-wide group-hover:text-cyan-400 transition-colors">
                {title}
            </h3>
            <p className="text-sm text-gray-500 font-mono group-hover:text-gray-400">
                {desc}
            </p>
        </div>

        <div className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300 text-cyan-500">
            <ArrowRight size={20} />
        </div>
    </button>
);

export default JourneyHub;
