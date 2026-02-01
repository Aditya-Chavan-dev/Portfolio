
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FolderGit2, User, Briefcase, Award, Users, Zap, Linkedin } from 'lucide-react';
import { subscribeToMetrics } from '@/services/metricsService';

interface HeroSectionDesktopProps {
    onStartJourney: () => void;
    onNavigate: (id: string) => void;
}

export const HeroSectionDesktop: React.FC<HeroSectionDesktopProps> = ({ onStartJourney, onNavigate }) => {
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
            } else {
                // No data in Firebase yet
                setIsLoading(false);
            }
        });

        return () => unsubscribe();
    }, []);

    const navigationItems = [
        {
            label: 'Projects',
            id: 'projects',
            icon: <FolderGit2 className="w-12 h-12" />,
            description: 'Full Stack, AI & Creative Dev'
        },
        {
            label: 'About Me',
            id: 'about',
            icon: <User className="w-12 h-12" />,
            description: 'My Journey, Philosophy & Skills'
        },
        {
            label: 'Experience',
            id: 'experience',
            icon: <Briefcase className="w-12 h-12" />,
            description: 'Professional Roles & Impact'
        },
        {
            label: 'Certification',
            id: 'certification',
            icon: <Award className="w-12 h-12" />,
            description: 'Achievements & continuous learning'
        }
    ];

    return (
        <div className="relative w-full h-screen flex flex-col bg-obsidian text-primary overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0" style={{
                    backgroundImage: 'linear-gradient(rgba(255, 215, 0, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 215, 0, 0.05) 1px, transparent 1px)',
                    backgroundSize: '50px 50px'
                }} />
            </div>

            {/* Top Navbar - Metrics Bar */}
            <motion.nav
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="relative z-10 flex items-center justify-between px-8 py-4 border-b border-white/5 backdrop-blur-sm bg-obsidian/30"
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
                    <div className="flex items-center gap-3 px-4 py-2 bg-surface/50 border border-white/5 rounded-lg backdrop-blur-sm min-w-[140px]">
                        <Users className="w-5 h-5 text-gold-glow" />
                        <div className="flex flex-col">
                            <span className="text-[10px] text-slate-400 uppercase tracking-wider">Total Visitors</span>
                            <span className="text-sm font-bold text-white">
                                {isLoading ? '---' : metrics.totalVisitors.toLocaleString()}
                            </span>
                        </div>
                    </div>

                    {/* Active Now */}
                    <div className="flex items-center gap-3 px-4 py-2 bg-surface/50 border border-white/5 rounded-lg backdrop-blur-sm min-w-[140px]">
                        <Zap className="w-5 h-5 text-emerald-400" />
                        <div className="flex flex-col">
                            <span className="text-[10px] text-slate-400 uppercase tracking-wider">Active Now</span>
                            <span className="text-sm font-bold text-white">
                                {isLoading ? '-' : metrics.activeUsers}
                            </span>
                        </div>
                    </div>

                    {/* From LinkedIn */}
                    <div className="flex items-center gap-3 px-4 py-2 bg-surface/50 border border-white/5 rounded-lg backdrop-blur-sm min-w-[140px]">
                        <Linkedin className="w-5 h-5 text-blue-400" />
                        <div className="flex flex-col">
                            <span className="text-[10px] text-slate-400 uppercase tracking-wider">From LinkedIn</span>
                            <span className="text-sm font-bold text-white">
                                {isLoading ? '--' : metrics.linkedinReferrals}
                            </span>
                        </div>
                    </div>
                </div>
            </motion.nav>

            {/* Main Content - Split Screen */}
            <div className="relative z-10 flex-1 w-full max-w-7xl mx-auto px-8 grid grid-cols-2 gap-12 items-center">

                {/* LEFT COLUMN: Intro & Immersive Journey */}
                <motion.div
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="flex flex-col items-start justify-center h-full"
                >
                    <h1 className="text-7xl lg:text-8xl font-bold tracking-tight mb-2 text-primary leading-none">
                        ADITYA<br />CHAVAN
                    </h1>
                    <p className="text-xl text-gold-glow tracking-[0.3em] uppercase font-light mb-12 ml-1">
                        Software Engineer
                    </p>

                    {/* Immersive Journey Button */}
                    <motion.button
                        onClick={onStartJourney}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="group relative px-8 py-6 w-full max-w-md bg-gold-glow/5 border border-gold-glow/50 rounded-sm font-semibold text-gold-glow tracking-wider uppercase text-lg shadow-[0_0_30px_rgba(255,215,0,0.1)] hover:shadow-[0_0_50px_rgba(255,215,0,0.3)] hover:bg-gold-glow hover:text-black transition-all duration-300 overflow-hidden text-left"
                    >
                        <div className="relative z-10 flex items-center justify-between">
                            <span className="flex flex-col">
                                <span>Start Immersive Journey</span>
                                <span className="text-xs opacity-60 font-normal normal-case tracking-normal mt-1">Explore the 3D Interactive Experience</span>
                            </span>
                            <svg className="w-6 h-6 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </div>
                    </motion.button>
                    {/* Suggestive Text Left */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1, duration: 1 }}
                        className="mt-6 text-slate-400 text-sm italic max-w-md pl-1"
                    >
                        A complete journey where you get to know me in detail
                    </motion.p>
                </motion.div>

                {/* RIGHT COLUMN: Rich Navigation Grid */}
                <motion.div
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.7, duration: 0.8 }}
                    className="h-full flex flex-col justify-center"
                >
                    {/* Right Column Title */}
                    <div className="mb-6 flex items-center gap-4">
                        <div className="h-[1px] bg-white/10 flex-1" />
                        <span className="text-xs text-slate-500 uppercase tracking-widest whitespace-nowrap">Quick Navigation</span>
                        <div className="h-[1px] bg-white/10 flex-1" />
                    </div>

                    <div className="grid grid-cols-2 gap-4 w-full">
                        {navigationItems.map((item, index) => (
                            <motion.button
                                key={item.label}
                                onClick={() => onNavigate(item.id)}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.8 + index * 0.1 }}
                                whileHover={{ y: -4, scale: 1.02 }}
                                className="group relative flex flex-col justify-between p-6 h-48 bg-surface/50 border border-white/5 rounded-2xl hover:border-gold-glow/50 transition-all duration-300 backdrop-blur-md text-left overflow-hidden"
                            >
                                {/* Hover Gradient */}
                                <div className="absolute inset-0 bg-gradient-to-br from-gold-glow/0 via-gold-glow/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                <span className="text-4xl text-secondary group-hover:text-gold-glow transition-colors duration-300">
                                    {item.icon}
                                </span>

                                <div className="relative z-10">
                                    <h3 className="text-xl font-bold text-primary group-hover:text-gold-glow transition-colors mb-1">
                                        {item.label}
                                    </h3>
                                    <p className="text-xs text-slate-400 group-hover:text-primary/80 transition-colors uppercase tracking-wide leading-relaxed">
                                        {item.description}
                                    </p>
                                </div>

                                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-2 group-hover:translate-x-0 text-gold-glow">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                            </motion.button>
                        ))}
                    </div>

                    {/* Suggestive Text Right */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.2, duration: 1 }}
                        className="mt-6 text-center text-slate-500 text-xs tracking-wide"
                    >
                        Quick access section in case you are tight on schedule
                    </motion.p>
                </motion.div>
            </div>
        </div>
    );
};
