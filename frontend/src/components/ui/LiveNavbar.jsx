import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Linkedin, FileText, Globe, Activity } from 'lucide-react';
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
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="w-full bg-black/80 backdrop-blur-xl border-b border-white/10 z-[100] h-20 flex items-center px-8 shadow-[0_4px_30px_rgba(0,0,0,0.5)] flex-shrink-0"
        >
            <div className="w-full max-w-7xl mx-auto flex items-center justify-between">

                {/* Branding / Identification - Updated Label */}
                <div className="flex items-center gap-4">
                    <div className="relative">
                        <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[12px] font-mono text-cyan-400 font-bold tracking-[0.2em] md:tracking-[0.4em] uppercase leading-none mb-1.5">Portfolio Live Metrics</span>
                        <span className="text-[8px] font-mono text-gray-500 uppercase tracking-widest leading-none">System Traffic Telemetry</span>
                    </div>
                </div>

                {/* Live Metrics Container - Prominent & High Contrast */}
                <div className="flex items-center gap-6 md:gap-14 overflow-x-auto no-scrollbar md:overflow-visible pr-4 md:pr-0">

                    {/* Total Viewers */}
                    <MetricPill
                        icon={Users}
                        label="Total Viewers"
                        value={totalViewers}
                        color="text-white"
                        pulse
                    />

                    {/* LinkedIn */}
                    <MetricPill
                        icon={Linkedin}
                        label="LinkedIn"
                        value={stats?.linkedin || 0}
                        color="text-blue-400"
                    />

                    {/* Resume */}
                    <MetricPill
                        icon={FileText}
                        label="Resume"
                        value={stats?.resume || 0}
                        color="text-amber-400"
                    />

                    {/* Anonymous */}
                    <MetricPill
                        icon={Globe}
                        label="Anonymous"
                        value={stats?.anonymous || 0}
                        color="text-emerald-400"
                    />

                </div>

                {/* System Status / Time IST */}
                <div className="hidden lg:flex items-center gap-3 px-4 py-2 rounded-lg bg-white/[0.02] border border-white/5 group transition-colors hover:border-cyan-500/20">
                    <Activity size={14} className="text-cyan-500 animate-pulse" />
                    <span className="text-[10px] font-mono text-gray-400 uppercase tracking-[0.2em]">
                        {time} <span className="text-cyan-500/60 ml-1">IST</span>
                    </span>
                </div>

            </div>
        </motion.nav>
    );
};

const MetricPill = ({ icon: Icon, label, value, color, pulse, size }) => (
    <div className="flex items-center gap-3 md:gap-4 group flex-shrink-0">
        <div className={`p-2 md:p-3 rounded-xl bg-white/[0.04] ${color} transition-all duration-300 group-hover:scale-110 group-hover:bg-white/[0.08]`}>
            <Icon size={14} md:size={16} strokeWidth={2} />
        </div>
        <div className="flex flex-col">
            <span className="text-[8px] md:text-[10px] font-mono text-gray-500 uppercase tracking-widest leading-none mb-1 group-hover:text-gray-400 transition-colors font-semibold truncate max-w-[50px] md:max-w-none">
                {label}
            </span>
            <div className={`text-xs md:text-xl font-bold font-mono tracking-wider tabular-nums leading-none ${pulse ? 'text-white' : 'text-gray-300'}`}>
                <CountUp end={value} duration={2500} />
            </div>
        </div>
    </div>
);

export default LiveNavbar;
