import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import config from '../../portfolio.config';
import HolographicID from './HolographicID';
import { Flame, GitCommit, Server, Play } from 'lucide-react';
import MetricItem from './MetricItem';
import TypewriterText from '../ui/TypewriterText';
import NavigationMenu from '../ui/NavigationMenu';

// --- CONSTANTS ---
const STEP_INIT = 0;
const STEP_TEXT_1 = 1; // "Welcome friend"
const STEP_TEXT_2 = 2; // "I'm Chavan"
const STEP_TEXT_3 = 3; // "Aditya Chavan"
// Metrics Phase
const STEP_LOC = 4;
const STEP_REPOS = 5;
const STEP_STREAK = 6;
// Combined Phase
const STEP_REARRANGE = 7;
const STEP_HOLOGRAM = 8;
const STEP_COMPLETE = 9;

const HeroDashboard = ({ onInitiate, metrics }) => {
    // Fail-safe: Merge with config defaults ensuring no "undefined" props
    const safeMetrics = {
        loc: metrics?.loc || config.hero.metrics.loc.value,
        repos: metrics?.repos || 0,
        streak: metrics?.streak || config.hero.metrics.streak.value,
        ...metrics
    };
    const [introStep, setIntroStep] = useState(STEP_INIT);
    const [sessionId] = useState(() => {
        const randomNum = Math.floor(Math.random() * 999999).toString().padStart(6, '0');
        return `SES-${randomNum}`;
    });

    useEffect(() => {
        const delay = (ms) => new Promise(res => setTimeout(res, ms));
        const runSequence = async () => {
            await delay(500); setIntroStep(STEP_TEXT_1);
            await delay(2000); setIntroStep(STEP_TEXT_2);
            await delay(2000); setIntroStep(STEP_TEXT_3);
            await delay(2500); setIntroStep(STEP_LOC);
            await delay(1500); setIntroStep(STEP_REPOS);
            await delay(1500); setIntroStep(STEP_STREAK);
            await delay(2000); setIntroStep(STEP_REARRANGE);
            await delay(800); setIntroStep(STEP_HOLOGRAM);
            await delay(500); setIntroStep(STEP_COMPLETE);
        };
        runSequence();
    }, []);

    const formatNumber = (num) => {
        if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M+';
        if (num >= 1000) return (num / 1000).toFixed(1) + 'K+';
        return num?.toLocaleString() || '0';
    };

    return (
        <div className="h-full w-full bg-[var(--color-bg-deep)] relative flex flex-col justify-center px-6 md:px-20 overflow-hidden">

            {/* Session Monitor - Top Left */}
            <motion.div
                className="absolute top-24 left-8 z-50 hidden md:flex items-center gap-3 bg-white/[0.03] border border-white/10 px-4 py-2 rounded-full backdrop-blur-md"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: introStep >= STEP_REARRANGE ? 1 : 0, x: introStep >= STEP_REARRANGE ? 0 : -20 }}
            >
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xs font-mono text-gray-400 tracking-widest">
                    SESSION: <span className="text-white font-bold">{sessionId}</span>
                </span>
            </motion.div>

            {/* Navigation Menu */}
            <NavigationMenu />

            {/* --- INTRO OVERLAY --- */}
            <AnimatePresence>
                {/* Fullscreen Overlay for Text Phases - SCALED UP */}
                {introStep >= STEP_TEXT_1 && introStep <= STEP_TEXT_3 && (
                    <motion.div
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-black"
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0, scale: 1.05, filter: "blur(5px)" }}
                        transition={{ duration: 1, ease: "easeOut" }}
                    >
                        {introStep === STEP_TEXT_1 && (
                            <TypewriterText text="Welcome friend..." className="text-5xl md:text-8xl text-[var(--color-accent-green)] font-display font-bold" />
                        )}
                        {introStep === STEP_TEXT_2 && (
                            <TypewriterText text="I'm Chavan..." className="text-5xl md:text-8xl text-white font-display font-bold" />
                        )}
                        {introStep === STEP_TEXT_3 && (
                            <TypewriterText text="Aditya Chavan" className="text-5xl md:text-8xl text-[var(--color-accent-blue)] font-display font-bold" />
                        )}
                    </motion.div>
                )}

                {/* Centered Metrics (Spawn Phase) - SCALED UP */}
                {introStep >= STEP_LOC && introStep < STEP_REARRANGE && (
                    <div className="fixed inset-0 z-[90] pointer-events-none flex items-center justify-center">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-4">
                            {introStep >= STEP_LOC && (
                                <MetricItem layoutId="metric-loc" label={config.hero.metrics.loc.label} rawValue={safeMetrics.loc} formatter={formatNumber} icon={<GitCommit size={32} />} className="w-[280px] h-[160px] border border-[var(--color-accent-blue)]" />
                            )}
                            {introStep >= STEP_REPOS && (
                                <MetricItem layoutId="metric-repos" label="Active Projects" rawValue={safeMetrics.repos} formatter={(v) => v.toLocaleString()} icon={<Server size={32} />} className="w-[280px] h-[160px] border border-[var(--color-accent-blue)]" />
                            )}
                            {introStep >= STEP_STREAK && (
                                <MetricItem layoutId="metric-streak" label={config.hero.metrics.streak.label} rawValue={safeMetrics.streak} formatter={(v) => `${v} Days`} icon={<Flame size={32} className="text-[var(--color-accent-orange)]" />} className="w-[280px] h-[160px] border border-[var(--color-accent-orange)]" />
                            )}
                        </div>
                    </div>
                )}
            </AnimatePresence>


            {/* --- MAIN DASHBOARD (Target Position) --- */}
            <div className={`relative z-10 w-full max-w-[1600px] mx-auto flex flex-col items-center justify-center transition-opacity duration-1000 ${introStep >= STEP_LOC ? 'opacity-100' : 'opacity-0'}`}>

                {/* 1. TOP HEADER (Name & Role) */}
                <motion.div
                    initial={{ opacity: 0, y: -20, filter: "blur(10px)" }}
                    animate={{
                        opacity: introStep >= STEP_REARRANGE ? 1 : 0,
                        y: introStep >= STEP_REARRANGE ? 0 : -20,
                        filter: introStep >= STEP_REARRANGE ? "blur(0px)" : "blur(10px)"
                    }}
                    className="text-center mb-16"
                >
                    <motion.h2 className="text-cyan-400 font-mono text-sm md:text-base tracking-[0.4em] uppercase mb-4 opacity-90">
                        {introStep >= STEP_REARRANGE ? config.hero.role : ''}
                    </motion.h2>
                    <motion.h1
                        className="text-6xl md:text-8xl lg:text-9xl font-display font-bold text-white tracking-widest uppercase opacity-90"
                        style={{ textShadow: "0 0 60px rgba(0, 200, 255, 0.2)" }}
                    >
                        {config.hero.name}
                    </motion.h1>
                </motion.div>

                {/* 2. MAIN GRID */}
                <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-12 items-center">

                    {/* LEFT COLUMN: Developer Metrics (Increased Size) */}
                    <div className="md:col-span-4 flex flex-col gap-8 order-2 md:order-1">
                        <div className="relative h-[160px]">
                            {introStep >= STEP_REARRANGE && <MetricItem layoutId="metric-loc" label="Contributions" rawValue={safeMetrics.loc} formatter={formatNumber} icon={<GitCommit size={24} />} className="border-white/10 bg-white/[0.02]" />}
                        </div>
                        <div className="relative h-[160px]">
                            {introStep >= STEP_REARRANGE && <MetricItem layoutId="metric-streak" label={config.hero.metrics.streak.label} rawValue={safeMetrics.streak} formatter={(v) => `${v} Days`} icon={<Flame size={24} className="text-[var(--color-accent-orange)]" />} className="border-white/10 bg-white/[0.02]" />}
                        </div>
                        <div className="relative h-[160px]">
                            {introStep >= STEP_REARRANGE && <MetricItem layoutId="metric-repos" label="Active Projects" rawValue={safeMetrics.repos} formatter={(v) => v.toLocaleString()} icon={<Server size={24} />} className="border-white/10 bg-white/[0.02]" />}
                        </div>
                    </div>

                    {/* CENTER/RIGHT COLUMN: Holographic Avatar */}
                    <div className="md:col-span-8 flex justify-center order-1 md:order-2">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{
                                opacity: introStep >= STEP_HOLOGRAM ? 1 : 0,
                                scale: introStep >= STEP_HOLOGRAM ? 1 : 0.9,
                            }}
                            transition={{ duration: 1.5 }}
                            className="relative w-full flex justify-center"
                        >
                            <div className="relative z-10 scale-110 lg:scale-125 transform">
                                <HolographicID />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* System Core Trigger (Big Button) */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{
                    opacity: introStep === STEP_COMPLETE ? 1 : 0,
                    y: introStep === STEP_COMPLETE ? 0 : 50,
                }}
                className="relative z-40 flex items-center justify-center mt-12"
            >
                <motion.button
                    onClick={onInitiate}
                    disabled={introStep !== STEP_COMPLETE}
                    className="group relative px-12 py-5 bg-white text-black font-bold text-lg md:text-xl tracking-widest uppercase overflow-hidden hover:scale-105 transition-transform duration-300"
                >
                    <span className="relative z-10 flex items-center gap-3">
                        <Play size={24} fill="currentColor" />
                        Initiate System
                    </span>
                    <div className="absolute inset-0 bg-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 mix-blend-difference" />
                </motion.button>
            </motion.div>

        </div >
    );
};

export default HeroDashboard;
