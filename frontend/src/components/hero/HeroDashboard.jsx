import React from 'react';
import { motion } from 'framer-motion';
import config from '../../portfolio.config';
import HolographicID from './HolographicID';
import { Flame, GitCommit, Code2 } from 'lucide-react';

// Sub-component for a Metric Ticker
const MetricItem = ({ label, value, icon, delay }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay, duration: 0.5 }}
        className="flex flex-col items-center md:items-start p-4 border border-[var(--border-subtle)] 
                   bg-[var(--glass-overlay)] rounded-xl w-full md:w-auto min-w-[150px]"
    >
        <div className="flex items-center space-x-2 text-[var(--color-text-secondary)] text-xs uppercase tracking-wider mb-2">
            {icon}
            <span>{label}</span>
        </div>
        <div className="text-2xl md:text-3xl font-mono font-bold text-[var(--color-text-primary)]">
            {value}
        </div>
    </motion.div>
);

const HeroDashboard = () => {
    return (
        <div className="min-h-screen w-full bg-[var(--color-bg-deep)] relative flex flex-col justify-center px-6 md:px-20 py-20 overflow-y-auto">

            {/* Top Bar (Time/Status) */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="absolute top-0 left-0 w-full p-6 flex justify-between items-center text-[var(--color-text-secondary)] text-xs font-mono uppercase"
            >
                <div>System Online</div>
                <div>Local Time: {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
            </motion.div>

            <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

                {/* Left Column: Identity & Bio */}
                <div className="lg:col-span-7 flex flex-col items-center lg:items-start space-y-8 text-center lg:text-left">
                    {/* Mobile Identity (Visible only on small screens) */}
                    <div className="lg:hidden mb-8">
                        <HolographicID />
                    </div>

                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-[var(--color-accent-blue)] font-mono text-sm tracking-widest mb-4">
                            {config.hero.role}
                        </h2>
                        <h1 className="text-hero leading-tight text-[var(--color-text-primary)] mb-6">
                            {config.hero.name}
                        </h1>
                        <p className="text-differentiator max-w-2xl">
                            {config.hero.tagline}
                        </p>
                    </motion.div>

                    {/* Tech Stack Engine */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="flex flex-wrap justify-center lg:justify-start gap-4 mt-8"
                    >
                        {config.hero.stack.map((tech) => (
                            <span key={tech.name} className="px-3 py-1 border border-[var(--border-subtle)] rounded-full text-xs font-mono text-[var(--color-text-secondary)]">
                                {tech.name} <span className="text-[var(--color-text-primary)] opacity-50 ml-1">| {tech.type}</span>
                            </span>
                        ))}
                    </motion.div>
                </div>

                {/* Right Column: Hologram & Metrics (Desktop) */}
                <div className="lg:col-span-5 flex flex-col items-center space-y-12">
                    {/* Desktop Identity */}
                    <div className="hidden lg:block relative z-10">
                        <HolographicID />
                    </div>

                    {/* Live Metrics Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                        <MetricItem
                            label={config.hero.metrics.loc.label}
                            value={config.hero.metrics.loc.value.toLocaleString() + config.hero.metrics.loc.suffix}
                            icon={<Code2 size={14} />}
                            delay={0.6}
                        />
                        <MetricItem
                            label={config.hero.metrics.commits.label}
                            value={config.hero.metrics.commits.value.toLocaleString()}
                            icon={<GitCommit size={14} />}
                            delay={0.7}
                        />
                        <MetricItem
                            label={config.hero.metrics.streak.label}
                            value={config.hero.metrics.streak.value}
                            icon={<Flame size={14} className="text-[var(--color-accent-orange)]" />}
                            delay={0.8}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeroDashboard;
