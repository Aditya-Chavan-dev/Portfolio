import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { subscribeToMetrics, type PortfolioMetrics } from '@/services/metricsService';

interface HeroSectionMobileProps {
    onStartJourney: () => void;
}

export const HeroSectionMobile = ({ onStartJourney }: HeroSectionMobileProps) => {
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
        <div className="relative w-full h-screen flex flex-col bg-slate-950 text-white overflow-hidden px-6">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0" style={{
                    backgroundImage: 'linear-gradient(rgba(6, 182, 212, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(6, 182, 212, 0.1) 1px, transparent 1px)',
                    backgroundSize: '30px 30px'
                }} />
            </div>

            {/* Top Section - System Status & Metrics */}
            <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="relative z-10 pt-6 pb-4"
            >
                {/* System Status */}
                <div className="flex items-center justify-center gap-2 mb-4">
                    <div className="relative">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                        <div className="absolute inset-0 w-2 h-2 bg-emerald-500 rounded-full animate-ping opacity-75" />
                    </div>
                    <span className="text-xs font-medium text-emerald-400 tracking-wider uppercase">
                        System Online
                    </span>
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-3 gap-2">
                    {/* Total Visitors */}
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="flex flex-col items-center gap-1 p-3 bg-slate-800/50 border border-slate-700/50 rounded-lg backdrop-blur-sm"
                    >
                        <span className="text-lg">👥</span>
                        <span className="text-[10px] text-slate-400 text-center">Visitors</span>
                        <span className="text-xs font-bold text-cyan-400">
                            {isLoading ? '---' : metrics.totalVisitors.toLocaleString()}
                        </span>
                    </motion.div>

                    {/* Active Now */}
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="flex flex-col items-center gap-1 p-3 bg-slate-800/50 border border-slate-700/50 rounded-lg backdrop-blur-sm"
                    >
                        <span className="text-lg">⚡</span>
                        <span className="text-[10px] text-slate-400 text-center">Active</span>
                        <span className="text-xs font-bold text-emerald-400">
                            {isLoading ? '-' : metrics.activeUsers}
                        </span>
                    </motion.div>

                    {/* From LinkedIn */}
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="flex flex-col items-center gap-1 p-3 bg-slate-800/50 border border-slate-700/50 rounded-lg backdrop-blur-sm"
                    >
                        <span className="text-lg">💼</span>
                        <span className="text-[10px] text-slate-400 text-center">LinkedIn</span>
                        <span className="text-xs font-bold text-blue-400">
                            {isLoading ? '--' : metrics.linkedinReferrals}
                        </span>
                    </motion.div>
                </div>
            </motion.div>

            {/* Center Content */}
            <div className="relative z-10 flex-1 flex flex-col items-center justify-center">
                <motion.div
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="text-center w-full"
                >
                    <h1 className="text-5xl font-bold tracking-tight mb-2 bg-clip-text text-transparent bg-gradient-to-r from-white via-cyan-100 to-white leading-tight">
                        ADITYA<br />CHAVAN
                    </h1>
                    <p className="text-sm text-cyan-400 tracking-[0.3em] uppercase font-light mb-8">
                        Software Engineer
                    </p>

                    {/* Immersive Journey Button */}
                    <motion.button
                        onClick={onStartJourney}
                        whileTap={{ scale: 0.95 }}
                        className="w-full max-w-sm mx-auto px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg font-semibold text-white tracking-wider uppercase text-sm shadow-lg shadow-cyan-500/30 active:shadow-cyan-500/50 transition-all duration-300"
                    >
                        <span className="flex items-center justify-center gap-2">
                            Immersive Journey
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </span>
                    </motion.button>
                </motion.div>
            </div>

            {/* Bottom Navigation */}
            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.6 }}
                className="relative z-10 pb-8"
            >
                <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-3 text-center">
                    Quick Navigation
                </p>
                <div className="grid grid-cols-2 gap-3">
                    {navigationItems.map((item, index) => (
                        <motion.a
                            key={item.label}
                            href={item.href}
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.8 + index * 0.1 }}
                            className="flex flex-col items-center gap-2 p-4 bg-slate-800/30 border border-slate-700/50 rounded-xl active:bg-slate-800/50 active:border-cyan-500/50 transition-all duration-200 backdrop-blur-sm"
                        >
                            <span className="text-2xl">
                                {item.icon}
                            </span>
                            <span className="text-[10px] text-slate-300 text-center leading-tight">
                                {item.label}
                            </span>
                        </motion.a>
                    ))}
                </div>
            </motion.div>
        </div>
    );
};
