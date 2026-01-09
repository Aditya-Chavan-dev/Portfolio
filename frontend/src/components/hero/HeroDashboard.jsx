import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import config from '../../portfolio.config';
import HolographicID from './HolographicID';
import { Flame, GitCommit, Server, ShieldCheck, Cpu, Clock, User, Users, Globe, FileText, Linkedin } from 'lucide-react';
import MetricItem from './MetricItem';
import TypewriterText from '../ui/TypewriterText';
import NavigationMenu from '../ui/NavigationMenu';


// Expanded Brand Icons for Real-Time Tech Stack
const TechIcons = {
    "JavaScript": (<svg viewBox="0 0 24 24" fill="none" className="w-2.5 h-2.5 text-[#F7DF1E]"><path d="M4 4h16v16H4V4z" fill="currentColor" fillOpacity="0.1" /><path d="M7 17v-4c0-.55.45-1 1-1h1" stroke="currentColor" strokeWidth="1.5" /><path d="M14 17v-1.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5V17" stroke="currentColor" strokeWidth="1.5" /></svg>),
    "TypeScript": (<svg viewBox="0 0 24 24" fill="none" className="w-2.5 h-2.5 text-[#3178C6]"><path d="M4 4h16v16H4V4z" fill="currentColor" fillOpacity="0.1" /><path d="M8 12h3m-1.5 0v5" stroke="currentColor" strokeWidth="1.5" /><path d="M17 14c-.5-.5-1.5-.5-2 0s-.5 1.5 0 2 2 .5 2 2-.5 2.5-2 2" stroke="currentColor" strokeWidth="1.5" /></svg>),
    "HTML": (<svg viewBox="0 0 24 24" fill="none" className="w-2.5 h-2.5 text-[#E34F26]"><path d="M4 3l1.5 14L12 21l6.5-4L20 3H4z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /></svg>),
    "CSS": (<svg viewBox="0 0 24 24" fill="none" className="w-2.5 h-2.5 text-[#1572B6]"><path d="M4 3l1.5 14L12 21l6.5-4L20 3H4z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /></svg>),
    "Python": (<svg viewBox="0 0 24 24" fill="none" className="w-2.5 h-2.5 text-[#3776AB]"><path d="M12 9V5a3 3 0 00-3-3H4" stroke="currentColor" strokeWidth="1.5" /><path d="M12 15v4a3 3 0 003 3h5" stroke="currentColor" strokeWidth="1.5" /><circle cx="9" cy="9" r="1" fill="currentColor" /><circle cx="15" cy="15" r="1" fill="currentColor" /></svg>),
    "Java": (<svg viewBox="0 0 24 24" fill="none" className="w-2.5 h-2.5 text-[#007396]"><path d="M4 19c2 2 8 2 16 0M4 14c2 2 8 2 16 0" stroke="currentColor" strokeWidth="1.5" /></svg>),
    "C++": (<svg viewBox="0 0 24 24" fill="none" className="w-2.5 h-2.5 text-[#00599C]"><path d="M6 12h4m-2-2v4" stroke="currentColor" strokeWidth="1.5" /><path d="M14 10l2-2 2 2m-4 4l2 2 2-2" stroke="currentColor" strokeWidth="1.5" /></svg>),
    "Shell": (<svg viewBox="0 0 24 24" fill="none" className="w-2.5 h-2.5 text-[#4EAA25]"><path d="M4 6l4 6-4 6m8-2h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>),
    "Code": (<svg viewBox="0 0 24 24" fill="none" className="w-2.5 h-2.5 text-gray-400"><path d="M8 12H4m16 0h-4M10 7l2 10" stroke="currentColor" strokeWidth="1.5" /></svg>),
    "React 18": (<svg viewBox="0 0 24 24" fill="none" className="w-2.5 h-2.5 text-[#61DAFB]"><path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="1.5" opacity="0.2" /><circle cx="12" cy="12" r="2" fill="currentColor" /><ellipse cx="12" cy="12" rx="10" ry="4" stroke="currentColor" strokeWidth="1.5" transform="rotate(60 12 12)" /><ellipse cx="12" cy="12" rx="10" ry="4" stroke="currentColor" strokeWidth="1.5" transform="rotate(120 12 12)" /><ellipse cx="12" cy="12" rx="10" ry="4" stroke="currentColor" strokeWidth="1.5" /></svg>),
    "Node.js": (<svg viewBox="0 0 24 24" fill="none" className="w-2.5 h-2.5 text-[#339933]"><path d="M12 2L2 7V17L12 22L22 17V7L12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /><path d="M12 22V12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /><path d="M12 12L2 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /><path d="M12 12L22 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>),
    "Postgres": (<svg viewBox="0 0 24 24" fill="none" className="w-2.5 h-2.5 text-[#336791]"><path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.58 20 4 16.42 4 12C4 7.58 7.58 4 12 4C16.42 4 20 7.58 20 12C20 16.42 16.42 20 12 20Z" fill="currentColor" opacity="0.2" /><path d="M12 6C9 6 7 8 7 11C7 14 9 16 12 16C15 16 16.5 14 16.5 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /><path d="M12 12L17 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /><path d="M12 9V15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>)
};

// --- CONSTANTS ---
const STEP_INIT = 0;
const STEP_TEXT_1 = 1; // "Welcome friend"
const STEP_TEXT_2 = 2; // "I'm Chavan"
const STEP_TEXT_3 = 3; // "Aditya Chavan"
// Metrics Phase
const STEP_LOC = 4;
const STEP_REPOS = 5;
const STEP_STREAK = 6;
// Removed STEP_UPTIME
// Visitor Phase (Consolidated)
const STEP_GLOBAL_TRACKING = 7;
// Final Rearrange & Reveal
const STEP_REARRANGE = 8;
const STEP_HOLOGRAM = 9;
const STEP_COMPLETE = 10;

const HeroDashboard = ({ onInitiate, metrics }) => {
    const [introStep, setIntroStep] = useState(STEP_INIT);
    const [sessionId] = useState(() => {
        // Generate simple, readable session ID: SES-XXXXXX
        const randomNum = Math.floor(Math.random() * 999999).toString().padStart(6, '0');
        return `SES-${randomNum}`;
    });

    useEffect(() => {
        // Strict Timing Sequence
        const delay = (ms) => new Promise(res => setTimeout(res, ms));

        const runSequence = async () => {
            await delay(500); setIntroStep(STEP_TEXT_1);
            await delay(2500); setIntroStep(STEP_TEXT_2);
            await delay(2500); setIntroStep(STEP_TEXT_3);
            await delay(3000); setIntroStep(STEP_LOC);
            await delay(2000); setIntroStep(STEP_REPOS);
            await delay(2000); setIntroStep(STEP_STREAK);
            // Removed STEP_UPTIME

            // Final Rearrange
            await delay(2500); setIntroStep(STEP_REARRANGE);
            await delay(1000); setIntroStep(STEP_HOLOGRAM);
            await delay(1000); setIntroStep(STEP_COMPLETE);
        };

        runSequence();
    }, []);

    const formatNumber = (num) => {
        if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M+';
        if (num >= 1000) return (num / 1000).toFixed(1) + 'K+';
        return num.toLocaleString();
    };

    return (
        <div className="min-h-screen w-full bg-[var(--color-bg-deep)] relative flex flex-col justify-center px-6 py-20 md:px-20 md:py-0 overflow-x-hidden">

            {/* Session ID - Top Left Corner */}
            <motion.div
                className="fixed top-6 left-6 z-50 bg-black/60 border border-cyan-400/40 px-4 py-2 rounded backdrop-blur-sm"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: introStep >= STEP_REARRANGE ? 1 : 0, x: introStep >= STEP_REARRANGE ? 0 : -20 }}
                transition={{ duration: 0.8, delay: 1 }}
            >
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-[12px] text-cyan-400 font-mono font-semibold tracking-wider">{sessionId}</span>
                </div>
            </motion.div>

            {/* Navigation Menu */}
            <NavigationMenu />

            {/* --- INTRO OVERLAY --- */}
            <AnimatePresence>
                {/* Fullscreen Overlay for Text Phases */}
                {introStep >= STEP_TEXT_1 && introStep <= STEP_TEXT_3 && (
                    <motion.div
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-black"
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }}
                        transition={{ duration: 1.2, ease: [0.43, 0.13, 0.23, 0.96] }}
                    >
                        {introStep === STEP_TEXT_1 && (
                            <TypewriterText text="Welcome friend..." className="text-4xl md:text-6xl text-[var(--color-accent-green)] font-hitmarker" />
                        )}
                        {introStep === STEP_TEXT_2 && (
                            <TypewriterText text="I'm Chavan..." className="text-4xl md:text-6xl text-white font-hitmarker" />
                        )}
                        {introStep === STEP_TEXT_3 && (
                            <TypewriterText text="Aditya Chavan" className="text-4xl md:text-6xl text-[var(--color-accent-blue)] font-hitmarker" />
                        )}
                    </motion.div>
                )}

                {/* Centered Metrics (Spawn Phase) */}
                {introStep >= STEP_LOC && introStep < STEP_REARRANGE && (
                    <div className="fixed inset-0 z-[90] pointer-events-none">
                        {/* Metrics Row - Stacked Top */}
                        {introStep >= STEP_LOC && (
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8">
                                {introStep >= STEP_LOC && (
                                    <MetricItem layoutId="metric-loc" label={config.hero.metrics.loc.label} rawValue={metrics.loc} formatter={formatNumber} icon={<GitCommit size={20} />} className="w-[200px] h-[120px] lg:w-[240px] lg:h-[140px] border border-[var(--color-accent-blue)]" font="font-hitmarker" />
                                )}
                                {introStep >= STEP_REPOS && (
                                    <MetricItem layoutId="metric-repos" label="Active Projects" rawValue={metrics.repos} formatter={(v) => v.toLocaleString()} icon={<Server size={20} />} className="w-[200px] h-[120px] lg:w-[240px] lg:h-[140px] border border-[var(--color-accent-blue)]" font="font-hitmarker" />
                                )}
                                {introStep >= STEP_STREAK && (
                                    <MetricItem layoutId="metric-streak" label={config.hero.metrics.streak.label} rawValue={metrics.streak} formatter={(v) => `${v} Days`} icon={<Flame size={20} className="text-[var(--color-accent-orange)]" />} className="w-[200px] h-[120px] lg:w-[240px] lg:h-[140px] border border-[var(--color-accent-orange)]" font="font-hitmarker" />
                                )}
                                {/* Removed STEP_UPTIME */}
                            </div>
                        )}


                    </div>
                )}
            </AnimatePresence>


            {/* --- MAIN DASHBOARD (Target Position) --- */}

            {/* Top Bar */}
            {/* --- SYMMETRICAL HUD LAYOUT --- */}

            <div className={`relative z-10 w-full max-w-[1400px] mx-auto flex flex-col items-center justify-center transition-opacity duration-1000 ${introStep >= STEP_LOC ? 'opacity-100' : 'opacity-0'}`}>

                {/* 1. TOP HEADER (Name & Role) */}
                <motion.div
                    initial={{ opacity: 0, y: -30, filter: "blur(10px)" }}
                    animate={{
                        opacity: introStep >= STEP_REARRANGE ? 1 : 0,
                        y: introStep >= STEP_REARRANGE ? 0 : -30,
                        filter: introStep >= STEP_REARRANGE ? "blur(0px)" : "blur(10px)"
                    }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="text-center mb-8"
                >
                    <motion.h2
                        className="text-[var(--color-accent-blue)] font-mono text-[10px] md:text-xs tracking-[0.3em] uppercase mb-2 opacity-80"
                        initial={{ opacity: 0, letterSpacing: "0.8em" }}
                        animate={{
                            opacity: introStep >= STEP_REARRANGE ? 0.8 : 0,
                            letterSpacing: introStep >= STEP_REARRANGE ? "0.3em" : "0.8em"
                        }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                    >
                        {introStep >= STEP_REARRANGE ? config.hero.role : ''}
                    </motion.h2>
                    <motion.h1
                        className="text-4xl md:text-6xl font-hitmarker text-white tracking-wider outline-text uppercase"
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.5, ease: "backOut" }}
                        style={{ textShadow: "0 0 30px rgba(0, 200, 255, 0.5)" }}
                    >
                        {config.hero.name}
                    </motion.h1>
                </motion.div>

                {/* 2. MAIN 3-COLUMN CONTROL GRID */}
                <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-6 items-center">

                    {/* LEFT COLUMN: Developer Metrics */}
                    <div className="md:col-span-3 flex flex-col gap-4 order-2 md:order-1">
                        <div className="relative h-[120px]">{introStep >= STEP_REARRANGE && <MetricItem layoutId="metric-loc" label="Contributions" rawValue={metrics.loc} formatter={formatNumber} icon={<GitCommit size={14} />} font="font-hitmarker" className="border-white/10" />}</div>
                        <div className="relative h-[120px]">{introStep >= STEP_REARRANGE && <MetricItem layoutId="metric-streak" label={config.hero.metrics.streak.label} rawValue={metrics.streak} formatter={(v) => `${v} Days`} icon={<Flame size={14} className="text-[var(--color-accent-orange)]" />} font="font-hitmarker" className="border-white/10" />}</div>
                        <div className="relative h-[120px]">{introStep >= STEP_REARRANGE && <MetricItem layoutId="metric-repos" label="Active Projects" rawValue={metrics.repos} formatter={(v) => v.toLocaleString()} icon={<Server size={14} />} font="font-hitmarker" className="border-white/10" />}</div>
                        {/* Removed uptime metric */}
                    </div>

                    {/* CENTER COLUMN: Holographic Avatar */}
                    <div className="md:col-span-6 flex justify-center order-1 md:order-2">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8, filter: "blur(40px)", rotateY: -20 }}
                            animate={{
                                opacity: introStep >= STEP_HOLOGRAM ? 1 : 0,
                                scale: introStep >= STEP_HOLOGRAM ? 1 : 0.8,
                                filter: introStep >= STEP_HOLOGRAM ? "blur(0px)" : "blur(40px)",
                                rotateY: introStep >= STEP_HOLOGRAM ? 0 : -20
                            }}
                            transition={{
                                duration: 2,
                                ease: [0.16, 1, 0.3, 1],
                                scale: { duration: 1.8 },
                                rotateY: { duration: 2.2 }
                            }}
                            className="relative w-full flex justify-center"
                            style={{ perspective: 1000 }}
                        >
                            <motion.div
                                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] lg:w-[500px] lg:h-[500px] bg-[var(--color-accent-blue)] opacity-[0.08] blur-[60px] lg:blur-[100px] rounded-full pointer-events-none"
                                animate={{
                                    scale: [1, 1.2, 1],
                                    opacity: [0.08, 0.12, 0.08]
                                }}
                                transition={{
                                    duration: 4,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                            />
                            <motion.div
                                className="relative z-10 scale-100 lg:scale-125 transform transition-transform duration-700"
                                whileHover={{ scale: 1.05 }}
                            >
                                <HolographicID />
                            </motion.div>
                        </motion.div>
                    </div>

                    {/* RIGHT COLUMN: Visitor Analytics */}
                    <div className="md:col-span-3 flex flex-col gap-4 order-3 md:order-3">
                        {/* Header for Visitor Stats */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: introStep >= STEP_REARRANGE ? 1 : 0 }}
                            className="flex items-center justify-between mb-1 px-1"
                        >
                            <span className="text-[10px] text-[var(--color-accent-blue)] font-mono tracking-widest uppercase opacity-70">Who visited my portfolio...</span>
                            <div className="flex gap-1">
                                <span className="w-1 h-1 rounded-full bg-[var(--color-accent-blue)] animate-pulse"></span>
                                <span className="w-1 h-1 rounded-full bg-[var(--color-accent-blue)] opacity-50"></span>
                            </div>
                        </motion.div>

                        <div className="relative h-[120px]">{introStep >= STEP_REARRANGE && <MetricItem layoutId="metric-resume" label="Visited from Resume" rawValue={metrics.visitorStats?.resume || 0} formatter={(v) => v.toLocaleString()} icon={<FileText size={14} className="text-[var(--color-accent-green)]" />} font="font-hitmarker" className="border-white/10" />}</div>
                        <div className="relative h-[120px]">{introStep >= STEP_REARRANGE && <MetricItem layoutId="metric-linkedin" label="Visited from LinkedIn" rawValue={metrics.visitorStats?.linkedin || 0} formatter={(v) => v.toLocaleString()} icon={<Linkedin size={14} className="text-[#0077b5]" />} font="font-hitmarker" className="border-white/10" />}</div>
                        <div className="relative h-[120px]">{introStep >= STEP_REARRANGE && <MetricItem layoutId="metric-anon" label="Anonymous Visits" rawValue={metrics.visitorStats?.anonymous || 0} formatter={(v) => v.toLocaleString()} icon={<User size={14} className="text-[var(--color-text-secondary)]" />} font="font-hitmarker" className="border-white/10" />}</div>
                    </div>
                </div>

            </div>

            {/* System Core Trigger */}
            <motion.div
                initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
                animate={{
                    opacity: introStep === STEP_COMPLETE ? 1 : 0,
                    y: introStep === STEP_COMPLETE ? 0 : 50,
                    filter: introStep === STEP_COMPLETE ? "blur(0px)" : "blur(10px)"
                }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-40 flex items-center justify-center mt-8"
            >
                <motion.button
                    onClick={onInitiate}
                    disabled={introStep !== STEP_COMPLETE}
                    className="group relative px-8 py-3 bg-transparent overflow-hidden rounded-none"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <div className="absolute inset-0 w-full h-full bg-[var(--color-bg-deep)] opacity-80 border border-[var(--color-accent-blue)] transition-all duration-300 group-hover:bg-[var(--color-accent-blue)] group-hover:opacity-10 group-hover:shadow-[0_0_30px_rgba(0,255,255,0.5)]"></div>
                    <div className="absolute inset-0 w-full h-full border border-[var(--color-accent-blue)] opacity-30 scale-105 transition-all duration-500 group-hover:scale-100 group-hover:opacity-100"></div>

                    {/* Corner Markers */}
                    <motion.div
                        className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[var(--color-accent-blue)]"
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    />
                    <motion.div
                        className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[var(--color-accent-blue)]"
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                    />
                    <motion.div
                        className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[var(--color-accent-blue)]"
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                    />
                    <motion.div
                        className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[var(--color-accent-blue)]"
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
                    />

                    <span className="relative z-10 font-mono text-xs tracking-[0.3em] text-[var(--color-accent-blue)] group-hover:text-white transition-colors duration-300 uppercase">
                        [ Initiate_System_Core ]
                    </span>

                    {/* Scanline Hover */}
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-[var(--color-accent-blue)] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 opacity-20"></div>
                </motion.button>
            </motion.div>
        </div >
    );
};

export default HeroDashboard;
