import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Linkedin, FileText, Globe, Activity, Clock } from 'lucide-react';
import { fetchMetrics } from '../../services/tracking';
import CountUp from './CountUp';

const LiveNavbar = () => {
    const [stats, setStats] = useState(null);
    const [time, setTime] = useState(new Date().toLocaleTimeString());

    const loadStats = async () => {
        const data = await fetchMetrics();
        if (data?.visitorStats) {
            setStats(data.visitorStats);
        }
    };

    useEffect(() => {
        loadStats();
        const interval = setInterval(loadStats, 60000); // Poll Every Minute
        const clockInterval = setInterval(() => setTime(new Date().toLocaleTimeString()), 1000);
        return () => {
            clearInterval(interval);
            clearInterval(clockInterval);
        };
    }, []);

    const totalViewers = stats ? (stats.linkedin + stats.resume + stats.anonymous) : 0;

    return (
        <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full bg-[#050505]/90 backdrop-blur-md border-b border-white/10 z-[100] h-24 flex items-center shadow-2xl flex-shrink-0"
        >
            <div className="w-full max-w-[1600px] mx-auto px-6 md:px-12 flex items-center justify-between">

                {/* 1. BRAND IDENTITY - Bold & Clear */}
                <div className="flex items-center gap-5">
                    <div className="relative flex items-center justify-center w-12 h-12 bg-white/5 rounded-full border border-white/10 shadow-[0_0_20px_rgba(0,255,255,0.1)]">
                        <div className="w-3 h-3 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_10px_rgba(34,211,238,0.8)]" />
                    </div>
                    <div className="flex flex-col justify-center">
                        <span className="text-lg font-display text-white font-bold tracking-wide leading-tight">
                            NEXUS <span className="text-cyan-400">PORTFOLIO</span>
                        </span>
                        <span className="text-xs text-gray-500 font-mono uppercase tracking-[0.2em]">
                            System Online
                        </span>
                    </div>
                </div>

                {/* 2. METRICS TELEMETRY - Large & Readable */}
                <div className="hidden md:flex items-center gap-12">
                    <MetricGroup
                        icon={Users}
                        label="Total Traffic"
                        value={totalViewers}
                        subLabel="Active Sessions"
                        active
                    />
                    <div className="h-10 w-px bg-white/10" />
                    <MetricGroup
                        icon={Linkedin}
                        label="LinkedIn"
                        value={stats?.linkedin || 0}
                        subLabel="Professional"
                        color="text-blue-400"
                    />
                    <div className="h-10 w-px bg-white/10" />
                    <MetricGroup
                        icon={FileText}
                        label="Inquiries"
                        value={stats?.resume || 0}
                        subLabel="Resume Views"
                        color="text-amber-400"
                    />
                </div>

                {/* 3. TIME / STATUS - High Contrast */}
                <div className="flex items-center gap-4 bg-white/[0.03] border border-white/10 px-6 py-3 rounded-full hover:bg-white/[0.06] transition-colors cursor-default">
                    <Clock size={16} className="text-gray-400" />
                    <span className="text-sm font-mono text-gray-300 tracking-widest font-medium">
                        {time} <span className="text-cyan-500 font-bold">IST</span>
                    </span>
                </div>

            </div>
        </motion.nav>
    );
};

// Reusable Metric Component - Clean & Professional
const MetricGroup = ({ icon: Icon, label, value, subLabel, color = "text-white", active }) => (
    <div className="flex items-center gap-4 group cursor-default">
        <div className={`p-3 rounded-2xl bg-white/[0.03] border border-white/5 group-hover:bg-white/[0.08] transition-all duration-300 ${active ? 'shadow-[0_0_15px_rgba(34,211,238,0.15)] border-cyan-500/30' : ''}`}>
            <Icon size={20} className={`${color} opacity-80 group-hover:opacity-100 transition-opacity`} strokeWidth={1.5} />
        </div>
        <div className="flex flex-col">
            <span className="text-[10px] font-mono text-gray-500 uppercase tracking-wider mb-0.5 group-hover:text-gray-400">
                {subLabel}
            </span>
            <div className="flex items-center gap-2">
                <span className={`text-xl font-display font-bold tabular-nums leading-none ${active ? 'text-white' : 'text-gray-300'} group-hover:text-white transition-colors`}>
                    <CountUp end={value} duration={2000} />
                </span>
                {active && <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />}
            </div>
        </div>
    </div>
);

export default LiveNavbar;
