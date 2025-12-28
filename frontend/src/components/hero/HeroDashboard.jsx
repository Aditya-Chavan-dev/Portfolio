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
        className="glass-panel p-6 rounded-2xl w-full md:w-auto min-w-[180px] relative overflow-hidden group hover:bg-[rgba(255,255,255,0.05)] transition-colors duration-300"
    >
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[var(--color-accent-blue)] to-transparent opacity-20"></div>

        <div className="flex items-center space-x-2 text-[var(--color-text-secondary)] text-[10px] uppercase tracking-widest mb-3 font-mono">
            {icon}
            <span>{label}</span>
        </div>
        <div className="text-3xl md:text-4xl font-display font-bold text-[var(--color-text-primary)] group-hover:text-glow transition-all duration-300">
            {value}
        </div>
    </motion.div>
);

const HeroDashboard = () => {
    const [metrics, setMetrics] = useState({
        loc: config.hero.metrics.loc.value,
        repos: 40, // Default/Fallback
        streak: config.hero.metrics.streak.value
    });

    useEffect(() => {
        const fetchData = async () => {
            const stats = await GitHubService.getRealStats();
            if (stats) {
                setMetrics(prev => ({
                    ...prev,
                    loc: stats.loc,
                    repos: stats.repos,
                    streak: stats.streak
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

    return (
        <div className="min-h-screen w-full bg-[var(--color-bg-deep)] relative flex flex-col justify-center px-6 md:px-20 py-20 overflow-y-auto">

            {/* Top Bar (Time/Status) */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="absolute top-0 left-0 w-full p-6 flex justify-between items-center text-[var(--color-text-secondary)] text-xs font-mono uppercase tracking-widest"
            >
                <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent-green)] animate-pulse shadow-[0_0_5px_var(--color-accent-green)]"></span>
                    System Online
                </div>
                <div>{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} IST</div>
            </motion.div>

            <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

                {/* Left Column: Identity & Bio */}
                <div className="lg:col-span-7 flex flex-col items-center lg:items-start space-y-8 text-center lg:text-left z-10">

                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-[var(--color-accent-blue)] font-mono text-xs tracking-[0.2em] mb-4 uppercase drop-shadow-[0_0_5px_rgba(0,240,255,0.3)]">
                            {config.hero.role}
                        </h2>
                        <h1 className="text-hero leading-none mb-6">
                            {config.hero.name.split(' ')[0]}<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-text-secondary)] to-[var(--color-text-primary)]">
                                {config.hero.name.split(' ')[1]}
                            </span>
                        </h1>
                        <p className="text-differentiator max-w-xl leading-relaxed">
                            {config.hero.tagline}
                        </p>
                    </motion.div>

                    {/* Tech Stack Engine - Glass Pills */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="flex flex-wrap justify-center lg:justify-start gap-3 mt-8"
                    >
                        {config.hero.stack.map((tech) => (
                            <span key={tech.name} className="px-4 py-1.5 border border-[var(--border-subtle)] bg-[var(--glass-overlay)] backdrop-blur-sm rounded-full text-[10px] font-mono tracking-wider text-[var(--color-text-secondary)] hover:border-[var(--color-accent-blue)] hover:text-[var(--color-accent-blue)] transition-colors duration-300">
                                {tech.name}
                            </span>
                        ))}
                    </motion.div>
                </div>

                {/* Right Column: Hologram & Metrics (Desktop) */}
                <div className="lg:col-span-5 flex flex-col items-center space-y-12 relative">

                    {/* Background Glow behind Hologram */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-[var(--color-accent-blue)] opacity-[0.1] blur-[100px] rounded-full pointer-events-none"></div>

                    {/* Desktop Identity */}
                    <div className="hidden lg:block relative z-10 scale-125">
                        <HolographicID />
                    </div>

                    {/* Live Metrics Grid */}
                    <div className="grid grid-cols-1 gap-4 w-full max-w-sm pl-8">
                        <MetricItem
                            label={config.hero.metrics.loc.label}
                            value={formatNumber(metrics.loc)}
                            icon={<Code2 size={12} />}
                            delay={0.6}
                        />
                        {/* Swapped "Commits" for "Active Repos" as it is a more verifiable real stat via API */}
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
            </div>
        </div>
    );
};

export default HeroDashboard;
