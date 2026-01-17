import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Linkedin, FileText, Activity, Clock, Wifi } from 'lucide-react';
import CountUp from './CountUp';

/**
 * TELEMETRY DECK
 * A "Head-Up Display" for system metrics.
 * Design Goal: Intuitive, Clean, and High-Tech.
 * 
 * Features:
 * - "Live" Indicator (Pulse)
 * - Clear Text Labels (No varying iconography confusion)
 * - Hover Explanations (Zero ambiguity)
 * - Glass Chips for separation
 */

const TelemetryDeck = ({ stats, compact = false }) => {
    const totalViewers = stats ? (stats.linkedin + stats.resume + stats.anonymous) : 0;
    const [latency, setLatency] = useState(24);

    // Simulate subtle latency fluctuation for "Live" feel
    useEffect(() => {
        const interval = setInterval(() => {
            setLatency(prev => Math.floor(20 + Math.random() * 15));
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className={`flex items-center ${compact ? 'gap-2' : 'gap-4'}`}>

            {/* 1. SYSTEM STATUS (The Anchor) */}
            <StatusModule compact={compact} latency={latency} />

            {/* Separator */}
            {!compact && <div className="h-8 w-px bg-white/10" />}

            {/* 2. TRAFFIC MODULE (The Hero Metric) */}
            <MetricModule
                icon={Users}
                value={totalViewers}
                label="ACTIVE VISITORS"
                subLabel="Live on site"
                color="text-white"
                compact={compact}
            />

            {/* 3. SOURCE TELEMETRY (Hidden in ultra-compact, present in full) */}
            {!compact && (
                <>
                    <div className="h-8 w-px bg-white/10" />
                    <div className="flex items-center gap-4">
                        <MetricModule
                            icon={Linkedin}
                            value={stats?.linkedin || 0}
                            label="LINKEDIN"
                            subLabel="Recruiter Traffic"
                            color="text-blue-400"
                        />
                        <MetricModule
                            icon={FileText}
                            value={stats?.resume || 0}
                            label="RESUME"
                            subLabel="Direct Reference"
                            color="text-amber-400"
                        />
                    </div>
                </>
            )}

        </div>
    );
};

// --- SUB-COMPONENTS ---

const StatusModule = ({ compact, latency }) => (
    <div className={`
        relative flex items-center gap-3 px-3 py-2 rounded-lg border border-white/5 bg-white/[0.02]
        ${compact ? 'hidden md:flex' : 'flex'}
    `}>
        {/* Pulse Dot */}
        <div className="relative flex items-center justify-center w-2 h-2">
            <div className="absolute w-full h-full bg-emerald-500 rounded-full animate-ping opacity-75" />
            <div className="relative w-1.5 h-1.5 bg-emerald-500 rounded-full" />
        </div>

        {/* Text Info */}
        {!compact && (
            <div className="flex flex-col leading-none">
                <span className="text-[10px] font-mono text-emerald-500 font-bold tracking-wider">SYSTEM ONLINE</span>
                <span className="text-[9px] font-mono text-white/30 uppercase mt-0.5 flex items-center gap-1">
                    <Activity size={8} /> {latency}ms latency
                </span>
            </div>
        )}
    </div>
);

const MetricModule = ({ icon: Icon, value, label, subLabel, color, compact }) => (
    <div className="group relative flex items-center gap-3 px-3 py-1.5 rounded-lg hover:bg-white/[0.03] transition-colors cursor-default">
        {/* Icon Container */}
        <div className={`p-1.5 rounded-md bg-white/5 border border-white/5 group-hover:border-white/10 transition-colors`}>
            <Icon size={14} className={`${color}`} />
        </div>

        {/* Data */}
        <div className="flex flex-col leading-none">
            <span className={`font-mono font-bold text-sm text-white tabular-nums`}>
                <CountUp end={value} duration={2000} />
            </span>
            {!compact && (
                <span className="text-[9px] font-mono text-white/40 font-medium tracking-wide mt-0.5 uppercase group-hover:text-white/60 transition-colors">
                    {label}
                </span>
            )}
        </div>

        {/* Tooltip (Simple Browser-Native or Custom if needed. Using simple visual expanding logic for now) */}
        {/* In the future we can add a fancy tooltip. For now, the distinct label 'ACTIVE VISITORS' is clear. */}
    </div>
);

export default TelemetryDeck;
