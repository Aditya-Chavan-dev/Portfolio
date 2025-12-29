import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import config from '../../portfolio.config';
import HolographicID from './HolographicID';
import { GitHubService } from '../../services/github';
import { Flame, GitCommit, Code2, Server } from 'lucide-react';

// Sub-component for a Metric Ticker with Glass Effect
const MetricItem = ({ label, value, icon, delay }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay, duration: 0.5 }}
        className="glass-panel p-4 md:p-6 rounded-2xl min-w-[140px] md:min-w-[170px] relative overflow-hidden group hover:bg-[rgba(255,255,255,0.05)] transition-colors duration-300 flex flex-col justify-center"
    >
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[var(--color-accent-blue)] to-transparent opacity-20"></div>

        <div className="flex items-center space-x-2 text-[var(--color-text-secondary)] text-[9px] md:text-[10px] uppercase tracking-widest mb-2 md:mb-3 font-mono">
            {icon}
            <span>{label}</span>
        </div>
        <div className="text-2xl md:text-3xl font-display font-bold text-[var(--color-text-primary)] group-hover:text-glow transition-all duration-300">
            {value}
        </div>
    </motion.div>
);

// Expanded Brand Icons for Real-Time Tech Stack
// Covering top languages likely to appear in GitHub stats
const TechIcons = {
    // Web Core
    "JavaScript": (
        <svg viewBox="0 0 24 24" fill="none" className="w-2.5 h-2.5 text-[#F7DF1E]"><path d="M4 4h16v16H4V4z" fill="currentColor" fillOpacity="0.1" /><path d="M7 17v-4c0-.55.45-1 1-1h1" stroke="currentColor" strokeWidth="1.5" /><path d="M14 17v-1.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5V17" stroke="currentColor" strokeWidth="1.5" /></svg>
    ),
    "TypeScript": (
        <svg viewBox="0 0 24 24" fill="none" className="w-2.5 h-2.5 text-[#3178C6]"><path d="M4 4h16v16H4V4z" fill="currentColor" fillOpacity="0.1" /><path d="M8 12h3m-1.5 0v5" stroke="currentColor" strokeWidth="1.5" /><path d="M17 14c-.5-.5-1.5-.5-2 0s-.5 1.5 0 2 2 .5 2 2-.5 2.5-2 2" stroke="currentColor" strokeWidth="1.5" /></svg>
    ),
    "HTML": (
        <svg viewBox="0 0 24 24" fill="none" className="w-2.5 h-2.5 text-[#E34F26]"><path d="M4 3l1.5 14L12 21l6.5-4L20 3H4z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /></svg>
    ),
    "CSS": (
        <svg viewBox="0 0 24 24" fill="none" className="w-2.5 h-2.5 text-[#1572B6]"><path d="M4 3l1.5 14L12 21l6.5-4L20 3H4z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /></svg>
    ),
    // Backend/Languages
    "Python": (
        <svg viewBox="0 0 24 24" fill="none" className="w-2.5 h-2.5 text-[#3776AB]"><path d="M12 9V5a3 3 0 00-3-3H4" stroke="currentColor" strokeWidth="1.5" /><path d="M12 15v4a3 3 0 003 3h5" stroke="currentColor" strokeWidth="1.5" /><circle cx="9" cy="9" r="1" fill="currentColor" /><circle cx="15" cy="15" r="1" fill="currentColor" /></svg>
    ),
    "Java": (
        <svg viewBox="0 0 24 24" fill="none" className="w-2.5 h-2.5 text-[#007396]"><path d="M4 19c2 2 8 2 16 0M4 14c2 2 8 2 16 0" stroke="currentColor" strokeWidth="1.5" /></svg>
    ),
    "C++": (
        <svg viewBox="0 0 24 24" fill="none" className="w-2.5 h-2.5 text-[#00599C]"><path d="M6 12h4m-2-2v4" stroke="currentColor" strokeWidth="1.5" /><path d="M14 10l2-2 2 2m-4 4l2 2 2-2" stroke="currentColor" strokeWidth="1.5" /></svg>
    ),
    "Shell": (
        <svg viewBox="0 0 24 24" fill="none" className="w-2.5 h-2.5 text-[#4EAA25]"><path d="M4 6l4 6-4 6m8-2h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
    ),
    // Generic Code fallback
    "Code": (
        <svg viewBox="0 0 24 24" fill="none" className="w-2.5 h-2.5 text-gray-400"><path d="M8 12H4m16 0h-4M10 7l2 10" stroke="currentColor" strokeWidth="1.5" /></svg>
    ),
    // Specifics requested before (keeping them)
    "React 18": (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-2.5 h-2.5 text-[#61DAFB]"><path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="1.5" opacity="0.2" /><circle cx="12" cy="12" r="2" fill="currentColor" /><ellipse cx="12" cy="12" rx="10" ry="4" stroke="currentColor" strokeWidth="1.5" transform="rotate(60 12 12)" /><ellipse cx="12" cy="12" rx="10" ry="4" stroke="currentColor" strokeWidth="1.5" transform="rotate(120 12 12)" /><ellipse cx="12" cy="12" rx="10" ry="4" stroke="currentColor" strokeWidth="1.5" /></svg>
    ),
    "Node.js": (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-2.5 h-2.5 text-[#339933]"><path d="M12 2L2 7V17L12 22L22 17V7L12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /><path d="M12 22V12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /><path d="M12 12L2 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /><path d="M12 12L22 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
    ),
    "Postgres": (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-2.5 h-2.5 text-[#336791]"><path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.58 20 4 16.42 4 12C4 7.58 7.58 4 12 4C16.42 4 20 7.58 20 12C20 16.42 16.42 20 12 20Z" fill="currentColor" opacity="0.2" /><path d="M12 6C9 6 7 8 7 11C7 14 9 16 12 16C15 16 16.5 14 16.5 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /><path d="M12 12L17 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /><path d="M12 9V15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
    )
};

const HeroDashboard = () => {
    const [metrics, setMetrics] = useState(() => {
        const cached = GitHubService.getCachedStats();
        if (cached) return cached;
        return {
            loc: config.hero.metrics.loc.value,
            repos: 40,
            streak: config.hero.metrics.streak.value,
            stack: config.hero.stack,
            projectStart: null,
            projectLastActive: null,
            source: 'INIT'
        };
    });

    useEffect(() => {
        const fetchData = async () => {
            // Smart fetch: Only hits API if cache is > 1 hour old
            const stats = await GitHubService.getSmartStats();
            if (stats) {
                setMetrics(prev => ({
                    ...prev,
                    loc: stats.loc,
                    repos: stats.repos,
                    streak: stats.streak,
                    stack: stats.stack || config.hero.stack,
                    projectStart: stats.projectStart,
                    projectLastActive: stats.projectLastActive,
                    source: stats.source || 'OFFLINE'
                }));
            }
        };
        fetchData();
    }, []);

    // Helper to format large numbers
    const formatNumber = (num) => {
        if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M+';
        if (num >= 1000) return (num / 1000).toFixed(1) + 'K+';
        return num.toLocaleString();
    };

    // Timeline Formatter
    const getTimelineString = () => {
        if (!metrics.projectStart || !metrics.projectLastActive) return "Loading timeline...";

        const start = new Date(metrics.projectStart).toLocaleDateString(undefined, { month: 'short', year: 'numeric' });
        const lastActive = new Date(metrics.projectLastActive);
        const now = new Date();
        const diffDays = Math.ceil((now - lastActive) / (1000 * 60 * 60 * 24));

        const isRecent = diffDays <= 7; // Consider "Active" if pushed in last 7 days

        const endStr = isRecent ? "still going on" : `went on till ${lastActive.toLocaleDateString(undefined, { month: 'short', year: 'numeric' })}`;

        return `Build started ${start} • ${endStr}`;
    };

    return (
        <div className="min-h-screen w-full bg-[var(--color-bg-deep)] relative flex flex-col justify-center px-6 py-20 md:px-20 md:py-0 overflow-x-hidden">

            {/* Top Bar (Time/Status) - Compact Position */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="absolute top-0 left-0 w-full p-4 md:p-8 flex justify-between items-center text-[var(--color-text-secondary)] text-[10px] font-mono uppercase tracking-widest z-50"
            >
                <div className="flex items-center gap-2">
                    <span className={`w-1.5 h-1.5 rounded-full ${metrics.source === 'LIVE' ? 'bg-[var(--color-accent-green)] shadow-[0_0_5px_var(--color-accent-green)]' : metrics.source === 'CACHE' ? 'bg-[var(--color-accent-blue)]' : 'bg-[var(--color-accent-orange)]'} animate-pulse`}></span>
                    <span className="opacity-80">
                        {metrics.source === 'LIVE' ? 'System Online: LIVE' : metrics.source === 'CACHE' ? 'System Online: CACHED' : 'System Online: OFFLINE'}
                    </span>
                </div>
                <div>{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} IST</div>
            </motion.div>

            {/* Main Content Grid - Adjusted for Viewport Fit */}
            <div className="max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center translate-y-[-2%]">

                {/* Left Column: Identity & Bio */}
                <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left z-10 w-full">

                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-[var(--color-accent-blue)] font-mono text-xs tracking-[0.2em] mb-3 uppercase drop-shadow-[0_0_5px_rgba(0,240,255,0.3)]">
                            {config.hero.role}
                        </h2>
                        <h1 className="text-hero leading-[0.9] mb-6">
                            {config.hero.name.split(' ')[0]}<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-text-secondary)] to-[var(--color-text-primary)]">
                                {config.hero.name.split(' ')[1]}
                            </span>
                        </h1>
                        <p className="text-differentiator max-w-lg leading-relaxed mb-6 opacity-80 lg:mx-0 mx-auto">
                            {config.hero.tagline}
                        </p>
                    </motion.div>

                    {/* Tech Stack Engine - Glass Pills (Now Dynamic) */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="flex flex-wrap justify-center lg:justify-start gap-3 mb-8"
                    >
                        {metrics.stack.map((tech) => {
                            // "Lie" a bit for the portfolio: Show React instead of JS
                            const displayTech = tech.name === 'JavaScript' ? { name: 'React 18' } : tech;

                            return (
                                <span key={displayTech.name} className="pl-2.5 pr-3.5 py-1 border border-[var(--border-subtle)] bg-[var(--glass-overlay)] backdrop-blur-sm rounded-full text-[9px] font-mono tracking-wider text-[var(--color-text-secondary)] hover:border-[var(--color-accent-blue)] hover:text-[var(--color-accent-blue)] transition-colors duration-300 flex items-center gap-1.5 group">
                                    {TechIcons[displayTech.name] ? (
                                        <span className="opacity-70 group-hover:opacity-100 transition-opacity">
                                            {TechIcons[displayTech.name]}
                                        </span>
                                    ) : (
                                        <span className="opacity-50">
                                            {TechIcons["Code"]}
                                        </span>
                                    )}
                                    {displayTech.name}
                                </span>
                            );
                        })}
                    </motion.div>

                    {/* Live Metrics Row (Horizontal) */}
                    <div className="flex flex-row flex-wrap justify-center lg:justify-start gap-4 w-full">
                        <MetricItem
                            label={config.hero.metrics.loc.label}
                            value={formatNumber(metrics.loc)}
                            icon={<GitCommit size={12} />}
                            delay={0.6}
                        />
                        <MetricItem
                            label="Active Projects"
                            value={metrics.repos.toLocaleString()}
                            icon={<Server size={12} />}
                            delay={0.7}
                        />
                        <MetricItem
                            label={config.hero.metrics.streak.label}
                            value={metrics.streak}
                            icon={<Flame size={12} className="text-[var(--color-accent-orange)]" />}
                            delay={0.8}
                        />
                    </div>
                </div>

                {/* Right Column: Hologram (Mobile & Desktop) */}
                <div className="flex lg:col-span-5 flex-col items-center justify-center relative translate-y-4 lg:translate-y-4 order-first lg:order-last mb-8 lg:mb-0">

                    {/* Background Glow - Expanded */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] lg:w-[600px] lg:h-[600px] bg-[var(--color-accent-blue)] opacity-[0.08] blur-[60px] lg:blur-[120px] rounded-full pointer-events-none"></div>

                    {/* Hologram - Responsive Scaling */}
                    <div className="relative z-10 scale-100 lg:scale-150 transform transition-transform duration-700 hover:scale-110 lg:hover:scale-[1.6]">
                        <HolographicID />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeroDashboard;
