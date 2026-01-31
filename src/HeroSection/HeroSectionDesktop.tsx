import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { subscribeToMetrics, type PortfolioMetrics } from '@/services/metricsService';

interface HeroSectionDesktopProps {
    onStartJourney: () => void;
}

export const HeroSectionDesktop = ({ onStartJourney }: HeroSectionDesktopProps) => {
    const [metrics, setMetrics] = useState<PortfolioMetrics>({
        totalVisitors: 0,
        activeUsers: 0,
        linkedinReferrals: 0
    });
    const [isLoading, setIsLoading] = useState(true);

    // Firebase Realtime Database subscription
    useEffect(() => {
        const unsubscribe = subscribeToMetrics((data) => {
            if (data) {
                setMetrics(data);
                setIsLoading(false);
            } else {
                // No data in Firebase yet
                setIsLoading(false);
            }
        });

        return () => unsubscribe();
    }, []);

    const navigationItems = [
        { label: 'Projects', href: '#projects', icon: '📁' },
        { label: 'About Me', href: '#about', icon: '👤' },
        { label: 'Professional Experience', href: '#experience', icon: '💼' },
        { label: 'Certification', href: '#certification', icon: '🏆' }
    ];

    return (
        <div className="relative w-full h-screen flex flex-col bg-slate-950 text-white overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0" style={{
                    backgroundImage: 'linear-gradient(rgba(6, 182, 212, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(6, 182, 212, 0.1) 1px, transparent 1px)',
                    backgroundSize: '50px 50px'
                }} />
            </div>

            {/* Top Navbar - Metrics Bar */}
            <motion.nav
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="relative z-10 flex items-center justify-between px-8 py-4 border-b border-slate-800/50 backdrop-blur-sm bg-slate-900/30"
            >
                {/* System Status */}
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse" />
                        <div className="absolute inset-0 w-2.5 h-2.5 bg-emerald-500 rounded-full animate-ping opacity-75" />
                    </div>
                    <span className="text-sm font-medium text-emerald-400 tracking-wider uppercase">
                        System Online
                    </span>
                </div>

                {/* Metrics */}
                <div className="flex items-center gap-4">
                    {/* Total Visitors */}
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 border border-slate-700/50 rounded-lg backdrop-blur-sm"
                    >
                        <span className="text-lg">👥</span>
                        <div className="flex flex-col">
                            <span className="text-xs text-slate-400">Total Visitors</span>
                            <span className="text-sm font-bold text-cyan-400">
                                {isLoading ? '---' : metrics.totalVisitors.toLocaleString()}
                            </span>
                        </div>
                    </motion.div>

                    {/* Active Now */}
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 border border-slate-700/50 rounded-lg backdrop-blur-sm"
                    >
                        <span className="text-lg">⚡</span>
                        <div className="flex flex-col">
                            <span className="text-xs text-slate-400">Active Now</span>
                            <span className="text-sm font-bold text-emerald-400">
                                {isLoading ? '-' : metrics.activeUsers}
                            </span>
                        </div>
                    </motion.div>

                    {/* From LinkedIn */}
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 border border-slate-700/50 rounded-lg backdrop-blur-sm"
                    >
                        <span className="text-lg">💼</span>
                        <div className="flex flex-col">
                            <span className="text-xs text-slate-400">From LinkedIn</span>
                            <span className="text-sm font-bold text-blue-400">
                                {isLoading ? '--' : metrics.linkedinReferrals}
                            </span>
                        </div>
                    </motion.div>
                </div>
            </motion.nav>

            {/* Center Content */}
            <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-8">
                <motion.div
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="text-center"
                >
                    <h1 className="text-7xl md:text-8xl font-bold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white via-cyan-100 to-white">
                        ADITYA CHAVAN
                    </h1>
                    <p className="text-xl text-cyan-400 tracking-[0.3em] uppercase font-light mb-12">
                        Software Engineer
                    </p>

                    {/* Immersive Journey Button */}
                    <motion.button
                        onClick={onStartJourney}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="group relative px-10 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg font-semibold text-white tracking-wider uppercase text-sm shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 transition-all duration-300 overflow-hidden"
                    >
                        <span className="relative z-10 flex items-center gap-2">
                            Immersive Journey
                            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </motion.button>
                </motion.div>
            </div>

            {/* Bottom Navigation */}
            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.6 }}
                className="relative z-10 px-8 pb-12"
            >
                <p className="text-xs text-slate-500 uppercase tracking-widest mb-4 text-center">
                    Quick Navigation
                </p>
                <div className="grid grid-cols-4 gap-4 max-w-5xl mx-auto">
                    {navigationItems.map((item, index) => (
                        <motion.a
                            key={item.label}
                            href={item.href}
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.8 + index * 0.1 }}
                            whileHover={{ y: -4, scale: 1.02 }}
                            className="group relative flex flex-col items-center gap-3 p-6 bg-slate-800/30 border border-slate-700/50 rounded-xl hover:bg-slate-800/50 hover:border-cyan-500/50 transition-all duration-300 backdrop-blur-sm"
                        >
                            <span className="text-3xl group-hover:scale-110 transition-transform duration-300">
                                {item.icon}
                            </span>
                            <span className="text-sm text-slate-300 group-hover:text-cyan-400 transition-colors text-center">
                                {item.label}
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 to-blue-500/0 group-hover:from-cyan-500/5 group-hover:to-blue-500/5 rounded-xl transition-all duration-300" />
                        </motion.a>
                    ))}
                </div>
            </motion.div>
        </div>
    );
};
