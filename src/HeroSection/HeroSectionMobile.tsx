
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FolderGit2, User, Briefcase, Award, Users, Zap, Linkedin } from 'lucide-react';
import { subscribeToMetrics } from '@/services/metricsService';

interface HeroSectionMobileProps {
    onStartJourney: () => void;
    onNavigate: (id: string) => void;
}

export const HeroSectionMobile: React.FC<HeroSectionMobileProps> = ({ onStartJourney, onNavigate }) => {
    const [metrics, setMetrics] = useState({
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
            }
        });

        return () => unsubscribe();
    }, []);

    const navigationItems = [
        { label: 'Projects', id: 'projects', icon: <FolderGit2 className="w-8 h-8" /> },
        { label: 'About Me', id: 'about', icon: <User className="w-8 h-8" /> },
        { label: 'Experience', id: 'experience', icon: <Briefcase className="w-8 h-8" /> },
        { label: 'Certification', id: 'certification', icon: <Award className="w-8 h-8" /> }
    ];

    return (
        <div className="relative w-full h-[100dvh] bg-obsidian text-primary overflow-hidden">
            {/* Scrollable Container */}
            <div className="absolute inset-0 overflow-y-auto overflow-x-hidden px-6 py-6 flex flex-col items-center justify-between min-h-[100dvh] gap-4 supports-[min-height:100dvh]:min-h-[100dvh]">

                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-5 pointer-events-none sticky top-0 h-screen">
                    <div className="absolute inset-0" style={{
                        backgroundImage: 'linear-gradient(rgba(255, 215, 0, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 215, 0, 0.05) 1px, transparent 1px)',
                        backgroundSize: '30px 30px'
                    }} />
                </div>

                {/* Top Section - System Status & Metrics */}
                <motion.div
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6 }}
                    className="relative z-10 w-full flex-none"
                >
                    {/* System Status */}
                    <div className="flex items-center justify-center gap-2 mb-3">
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
                        <div className="flex flex-col items-center gap-1 p-2 bg-surface/50 border border-white/5 rounded-lg backdrop-blur-sm">
                            <Users className="w-4 h-4 text-gold-glow" />
                            <span className="text-[9px] text-slate-400 text-center uppercase tracking-wide">Visitors</span>
                            <span className="text-xs font-bold text-white">
                                {isLoading ? '---' : metrics.totalVisitors.toLocaleString()}
                            </span>
                        </div>

                        {/* Active Now */}
                        <div className="flex flex-col items-center gap-1 p-2 bg-surface/50 border border-white/5 rounded-lg backdrop-blur-sm">
                            <Zap className="w-4 h-4 text-emerald-400" />
                            <span className="text-[9px] text-slate-400 text-center uppercase tracking-wide">Active</span>
                            <span className="text-xs font-bold text-white">
                                {isLoading ? '-' : metrics.activeUsers}
                            </span>
                        </div>

                        {/* From LinkedIn */}
                        <div className="flex flex-col items-center gap-1 p-2 bg-surface/50 border border-white/5 rounded-lg backdrop-blur-sm">
                            <Linkedin className="w-4 h-4 text-blue-400" />
                            <span className="text-[9px] text-slate-400 text-center uppercase tracking-wide">LinkedIn</span>
                            <span className="text-xs font-bold text-white">
                                {isLoading ? '--' : metrics.linkedinReferrals}
                            </span>
                        </div>
                    </div>
                </motion.div>

                {/* Center Content - Natural Flow */}
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                    className="relative z-10 flex-shrink-0 flex flex-col items-center justify-center w-full py-2"
                >
                    <h1 className="text-4xl xs:text-5xl font-bold tracking-tight mb-2 text-primary leading-tight text-center">
                        ADITYA<br />CHAVAN
                    </h1>
                    <p className="text-xs text-gold-glow tracking-[0.3em] uppercase font-light mb-6 text-center">
                        Software Engineer
                    </p>

                    {/* Immersive Journey Button */}
                    <motion.button
                        onClick={onStartJourney}
                        whileTap={{ scale: 0.95 }}
                        className="w-full max-w-xs px-6 py-3 bg-transparent border border-gold-glow rounded-sm font-semibold text-gold-glow tracking-wider uppercase text-xs shadow-[0_0_15px_rgba(255,215,0,0.1)] active:bg-gold-glow active:text-black transition-all duration-300"
                    >
                        <span className="flex items-center justify-center gap-2">
                            Immersive Journey
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </span>
                    </motion.button>
                </motion.div>

                {/* Bottom Navigation - Natural stacking with explicit gap */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    className="relative z-10 w-full flex-none pb-2"
                >
                    <div className="grid grid-cols-2 gap-3 mx-auto max-w-xs">
                        {navigationItems.map((item, index) => (
                            <motion.button
                                key={item.label}
                                onClick={() => onNavigate(item.id)}
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.5 + index * 0.1 }}
                                whileTap={{ scale: 0.95 }}
                                className="flex flex-col items-center justify-center gap-2 p-3 bg-surface/80 border border-white/10 rounded-xl active:border-gold-glow/50 active:bg-gold-glow/10 transition-all duration-200 backdrop-blur-md"
                            >
                                <span className="text-xl text-secondary">
                                    {item.icon}
                                </span>
                                <span className="text-[10px] text-secondary font-medium uppercase tracking-wide leading-tight text-center">
                                    {item.label}
                                </span>
                            </motion.button>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
};
