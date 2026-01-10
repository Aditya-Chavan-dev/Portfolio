import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Database, Cpu, User, FileText, ChevronRight } from 'lucide-react';
import config from '../portfolio.config';

const MODE_INTRO = 'INTRO';
const MODE_HUB = 'HUB';

const RecruiterJourney = ({ onSelection }) => {
    const [mode, setMode] = useState(MODE_INTRO);
    const [hoveredOption, setHoveredOption] = useState(null);

    // Intro Sequence Controller - Optimized: Single timeout for mode switch only
    useEffect(() => {
        if (mode === MODE_INTRO) {
            const timer = setTimeout(() => {
                setMode(MODE_HUB);
            }, 6000); // Allow full sequence to play
            return () => clearTimeout(timer);
        }
    }, [mode]);

    // Orchestration Variants - eliminates partial re-renders
    const introSequenceVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 1.5, // Stagger delays between items
                delayChildren: 0.5
            }
        },
        exit: {
            opacity: 0,
            scale: 0.95,
            filter: "blur(4px)", // Reduced blur load
            transition: { duration: 0.8 }
        }
    };

    // Text reveal variants - optimized
    const itemVariants = {
        hidden: { opacity: 0, y: 15, filter: "blur(2px)" }, // Minimal blur for performance
        visible: {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            transition: { duration: 0.8, ease: "easeOut" }
        }
    };

    return (
        <div className="h-full w-full bg-[var(--color-bg-deep)] text-white flex flex-col items-center justify-center relative overflow-hidden p-6">

            {/* Background Ambience - Optimized with will-change */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent opacity-20" />
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent opacity-20" />
                <div
                    className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--color-accent-blue)_0%,_transparent_70%)] opacity-5 blur-3xl"
                    style={{ willChange: 'opacity' }}
                />
            </div>

            <AnimatePresence mode="wait">

                {/* --- PHASE 1: THE BRIEFING --- */}
                {mode === MODE_INTRO && (
                    <motion.div
                        key="intro-sequence"
                        variants={introSequenceVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="flex flex-col items-center justify-center text-center space-y-8 z-10 max-w-2xl"
                    >
                        {/* 1. Identity Verification */}
                        <motion.div variants={itemVariants} className="flex flex-col items-center">
                            <span className="text-[10px] text-green-400 font-mono tracking-[0.2em] mb-2 uppercase">Identity Verified</span>
                            <h1 className="text-4xl md:text-6xl font-bold tracking-wider text-white">
                                {config.hero.name}
                            </h1>
                        </motion.div>

                        {/* 2. Role Designation */}
                        <motion.div variants={itemVariants} className="flex flex-col items-center">
                            <div className="h-px w-24 bg-cyan-500/50 my-2" />
                            <h2 className="text-xl md:text-2xl text-cyan-400 font-mono tracking-widest uppercase">
                                {config.hero.role}
                            </h2>
                        </motion.div>

                        {/* 3. Primary Directive */}
                        <motion.p
                            variants={itemVariants}
                            className="text-sm md:text-base text-gray-400 font-mono max-w-lg mt-4 leading-relaxed"
                        >
                            "{config.hero.tagline}"
                        </motion.p>
                    </motion.div>
                )}

                {/* --- PHASE 2: COMMAND HUB --- */}
                {mode === MODE_HUB && (
                    <motion.div
                        key="command-hub"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1 }}
                        className="w-full max-w-5xl z-10 flex flex-col items-center"
                    >
                        {/* Header Section - Minimized Identity */}
                        <motion.div
                            initial={{ y: -50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                            className="text-center mb-16"
                        >
                            <h3 className="text-xs font-mono text-green-400 tracking-[0.3em] mb-2">OPERATOR ACTIVE</h3>
                            <h1 className="text-2xl md:text-3xl font-bold tracking-widest text-white">{config.hero.name}</h1>
                        </motion.div>

                        {/* Central Intelligence Display */}
                        <div className="relative w-full grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 items-center justify-center">

                            {/* Dynamic Center Text */}
                            <div className="hidden md:flex absolute inset-0 items-center justify-center pointer-events-none -z-10">
                                <motion.div
                                    key={hoveredOption || 'default'}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="text-center"
                                >
                                    <div
                                        className="text-[100px] text-cyan-500/5 blur-xl font-black absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap"
                                        style={{ willChange: 'transform, opacity' }}
                                    >
                                        {hoveredOption ? hoveredOption.bgText : 'SYSTEM'}
                                    </div>
                                    <div className="text-sm font-mono text-cyan-400 tracking-[0.3em] uppercase mb-1">
                                        {hoveredOption ? hoveredOption.label : 'AWAITING INPUT'}
                                    </div>
                                    <div className="text-2xl font-bold text-white tracking-wide">
                                        {hoveredOption ? hoveredOption.desc : 'Select Protocols'}
                                    </div>
                                </motion.div>
                            </div>

                            {/* Options Grid */}
                            <div className="flex flex-col gap-6 items-end">
                                <HubOption
                                    icon={Database}
                                    label="WORKLOGS"
                                    sub="Deployment History"
                                    bgText="PROJECTS"
                                    desc="5 Active Deployments"
                                    onClick={() => onSelection('WORKLOGS')}
                                    setHover={setHoveredOption}
                                    align="right"
                                />
                                <HubOption
                                    icon={Cpu}
                                    label="TECH STACK"
                                    sub="System Architecture"
                                    bgText="SKILLS"
                                    desc="React • Node • Cloud"
                                    onClick={() => onSelection('TECH_STACK')}
                                    setHover={setHoveredOption}
                                    align="right"
                                />
                            </div>

                            <div className="flex flex-col gap-6 items-start">
                                <HubOption
                                    icon={User}
                                    label="OPERATOR"
                                    sub="Human Profile"
                                    bgText="ABOUT"
                                    desc="Bio & Background"
                                    onClick={() => onSelection('OPERATOR')}
                                    setHover={setHoveredOption}
                                    align="left"
                                />
                                <HubOption
                                    icon={FileText}
                                    label="EXPORT DATA"
                                    sub="Download Resume"
                                    bgText="RESUME"
                                    desc="PDF Format Ready"
                                    onClick={() => onSelection('EXPORT')}
                                    setHover={setHoveredOption}
                                    align="left"
                                />
                            </div>

                        </div>

                        {/* Footer Status */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.5 }}
                            transition={{ delay: 1.5 }}
                            className="absolute bottom-6 text-[10px] font-mono text-cyan-500/50"
                        >
                            SESSION ID: {Math.random().toString(36).substr(2, 9).toUpperCase()} // CONNECTION SECURE
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

// Sub-component
const HubOption = ({ icon: Icon, label, sub, bgText, desc, onClick, setHover, align = 'left' }) => {
    return (
        <motion.button
            className={`group relative flex items-center gap-4 p-4 w-full md:w-64 ${align === 'right' ? 'md:flex-row-reverse md:text-right' : 'flex-row text-left'}`}
            onMouseEnter={() => setHover({ label, desc, bgText })}
            onMouseLeave={() => setHover(null)}
            onClick={onClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
        >
            <div className={`absolute inset-0 bg-cyan-900/0 group-hover:bg-cyan-900/20 border border-transparent group-hover:border-cyan-500/30 transition-all duration-300 transform skew-x-[-10deg] rounded-sm`} />

            <div className={`p-3 rounded-full bg-black/50 border border-white/10 group-hover:border-cyan-400 group-hover:text-cyan-400 text-gray-400 transition-colors z-10`}>
                <Icon size={24} />
            </div>

            <div className="z-10 flex flex-col">
                <span className="text-sm font-bold text-gray-200 group-hover:text-white tracking-widest transition-colors">{label}</span>
                <span className="text-[10px] font-mono text-gray-500 group-hover:text-cyan-400 transition-colors uppercase">{sub}</span>
            </div>

            <div className={`opacity-0 group-hover:opacity-100 text-cyan-400 transition-opacity absolute ${align === 'right' ? '-left-2' : '-right-2'}`}>
                <ChevronRight size={16} />
            </div>
        </motion.button>
    );
};

export default RecruiterJourney;
