import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    GitBranch, CheckCircle, Activity, Globe, Database,
    Server, Zap, Lock, RefreshCw, Flame, Cpu
} from 'lucide-react';

// --- Enhanced Icons ---
const TechIcons = {
    // ... Existing Icons (React, Node, Firebase, GitHub, Render) ...
    // Keeping inline SVGs for the main nodes to ensure exact brand matches
    React: (
        <svg viewBox="0 0 24 24" fill="none" className="w-10 h-10 text-[#61DAFB]">
            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="1.5" opacity="0.2" />
            <circle cx="12" cy="12" r="2" fill="currentColor" />
            <ellipse cx="12" cy="12" rx="10" ry="4" stroke="currentColor" strokeWidth="1.5" transform="rotate(60 12 12)" />
            <ellipse cx="12" cy="12" rx="10" ry="4" stroke="currentColor" strokeWidth="1.5" transform="rotate(120 12 12)" />
        </svg>
    ),
    Node: (
        <svg viewBox="0 0 24 24" fill="none" className="w-10 h-10 text-[#339933]">
            <path d="M12 2L2 7V17L12 22L22 17V7L12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
            <path d="M12 22V12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M12 12L2 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M12 12L22 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
    ),
    Firebase: (
        <svg viewBox="0 0 24 24" fill="none" className="w-10 h-10 text-[#FFAB00]">
            <path d="M4.5 16.5L1.5 19.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M19.5 16.5L22.5 19.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M12 22L3 8L12 2L21 8L12 22Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
            <path d="M12 12L12 22" stroke="currentColor" strokeWidth="1.5" />
        </svg>
    ),
    GitHub: (
        <svg viewBox="0 0 24 24" fill="none" className="w-10 h-10 text-[#EDEDED]">
            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    ),
    Render: (
        <svg viewBox="0 0 24 24" fill="none" className="w-10 h-10 text-[#bc13fe]">
            <rect x="2" y="2" width="20" height="20" rx="4" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.5" />
            <path d="M16 8L8 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M8 8H12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M12 16H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
    )
};


const PortfolioArchitecture = () => {
    // Animation Phase State: 0=Idle, 1=Push, 2=Process, 3=Distribute
    const [phase, setPhase] = useState(0);
    // Randomize metrics slightly for "Live" feel
    const [stats, setStats] = useState({ latency: 45, fps: 60, requests: 1240 });

    useEffect(() => {
        const interval = setInterval(() => {
            setPhase(p => (p + 1) % 4);
            // Simulate subtle metric fluctuation
            setStats(prev => ({
                latency: Math.max(30, Math.min(60, prev.latency + (Math.random() * 10 - 5))).toFixed(0),
                fps: Math.max(58, Math.min(60, prev.fps + (Math.random() * 2 - 1))).toFixed(0),
                requests: prev.requests + Math.floor(Math.random() * 5)
            }));
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    const isPhaseActive = (targetPhase) => phase >= targetPhase;

    return (
        <section className="min-h-screen w-full relative flex items-center justify-center py-20 bg-[var(--color-bg-deep)] overflow-hidden">

            {/* Background: Radar Scan & Particles */}
            <div className="absolute inset-0 opacity-[0.05] pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-[var(--color-accent-blue)] rounded-full animate-[spin_10s_linear_infinite] opacity-20 border-dashed"></div>
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
            </div>

            <div className="max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 px-4 relative z-10 items-center">

                {/* --- LEFT: Narrative & Context --- */}
                <div className="lg:col-span-4 flex flex-col space-y-8">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="flex items-center gap-2 mb-4">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-accent-green)] opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--color-accent-green)]"></span>
                            </span>
                            <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--color-accent-green)]">System Online</span>
                        </div>

                        <h2 className="font-display text-4xl font-bold leading-none mb-4">
                            Mission Control
                        </h2>

                        <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed mb-6 opacity-80">
                            This isn't a resume. It's a distributed system.
                            Watch the live telemetry as code flows from repository to validation, processing, and finally to your screen.
                        </p>

                        <div className="flex flex-col gap-4">
                            <StatRow label="System Uptime" value="99.9%" icon={<Activity size={12} className="text-[var(--color-accent-green)]" />} />
                            <StatRow label="Avg Latency" value={`${stats.latency}ms`} icon={<Zap size={12} className="text-[var(--color-accent-orange)]" />} />
                            <StatRow label="24h Requests" value={stats.requests.toLocaleString()} icon={<Globe size={12} className="text-[var(--color-accent-blue)]" />} />
                        </div>
                    </motion.div>
                </div>

                {/* --- RIGHT: The Holographic Diagram --- */}
                <div className="lg:col-span-8 relative h-[600px] w-full flex items-center justify-center">

                    {/* Diagram Container */}
                    <div className="relative w-full max-w-[800px] h-[400px]">

                        {/* --- CONNECTIONS (SVG Layer) --- */}
                        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" overflow="visible">

                            {/* Path 1: GitHub -> Render (Commit Flow) */}
                            <EnhancedCable
                                d="M 100 200 C 180 200, 220 200, 350 200"
                                active={isPhaseActive(1)}
                                color="white"
                                type="particle" // Special "Commit" particles
                            />

                            {/* Path 2: Render -> Node (Backend Logic) */}
                            <EnhancedCable
                                d="M 450 200 L 530 200"
                                active={isPhaseActive(2)}
                                color="var(--color-accent-purple)"
                                type="dash"
                            />

                            {/* Path 3: Node -> Firebase (DB Sync - Upward) */}
                            <EnhancedCable
                                d="M 580 200 C 620 200, 620 100, 680 100"
                                active={isPhaseActive(3)}
                                color="var(--color-accent-orange)"
                                type="dash"
                            />

                            {/* Path 4: Node -> React (Frontend Delivery - Downward) */}
                            <EnhancedCable
                                d="M 580 200 C 620 200, 620 300, 680 300"
                                active={isPhaseActive(3)}
                                color="var(--color-accent-blue)"
                                type="dash"
                            />

                        </svg>

                        {/* --- NODES --- */}

                        {/* 1. GitHub Node (Far Left) */}
                        <div className="absolute top-[160px] left-0">
                            <NodeCard
                                icon={TechIcons.GitHub}
                                title="Repository"
                                active={phase >= 0}
                                color="#eee"
                                badges={[
                                    { text: "main", icon: <GitBranch size={10} />, color: "text-gray-400" },
                                    { text: "Passing", icon: <CheckCircle size={10} />, color: "text-green-400" }
                                ]}
                                details="Last commit: 2h ago"
                            />
                        </div>

                        {/* 2. Render Node (Center Hub) */}
                        <div className="absolute top-[130px] left-[350px] z-30">
                            <HubNode
                                icon={TechIcons.Render}
                                active={phase >= 1}
                                isProcessing={phase === 1}
                            />
                        </div>

                        {/* 3. Node.js Middleware (Right of Hub) */}
                        <div className="absolute top-[160px] left-[530px] z-20">
                            <NodeCard
                                icon={TechIcons.Node}
                                title="API Gateway"
                                active={phase >= 2}
                                color="#339933"
                                badges={[
                                    { text: "REST", color: "text-blue-300" },
                                    { text: "WSS", color: "text-purple-300" }
                                ]}
                                size="sm"
                            />
                        </div>

                        {/* 4. Firebase (Top Right) */}
                        <div className="absolute top-[50px] right-0">
                            <NodeCard
                                icon={TechIcons.Firebase}
                                title="NoSQL DB"
                                active={phase >= 3}
                                color="#FFAB00"
                                badges={[
                                    { text: "R/W", icon: <RefreshCw size={10} className="animate-spin" />, color: "text-orange-400" }
                                ]}
                                details="Sync: ~12ms"
                            />
                        </div>

                        {/* 5. React (Bottom Right) */}
                        <div className="absolute top-[250px] right-0">
                            <NodeCard
                                icon={TechIcons.React}
                                title="Client"
                                active={phase >= 3}
                                color="#61DAFB"
                                badges={[
                                    { text: `v18.2`, icon: <CheckCircle size={10} />, color: "text-blue-400" },
                                    { text: `${stats.fps} FPS`, icon: <Activity size={10} />, color: "text-green-400" }
                                ]}
                                details="Hot Reload: Active"
                            />
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
};

// --- Subcomponent: Sidebar Stat Row ---
const StatRow = ({ label, value, icon }) => (
    <div className="flex items-center justify-between p-3 rounded-lg bg-[rgba(255,255,255,0.03)] border border-[var(--border-subtle)]">
        <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-md bg-white/5">{icon}</span>
            <span className="text-xs font-mono uppercase text-[var(--color-text-secondary)]">{label}</span>
        </div>
        <span className="font-mono text-sm font-bold text-[var(--color-text-primary)]">{value}</span>
    </div>
);

// --- Subcomponent: Enhanced Data Cable ---
const EnhancedCable = ({ d, active, color, type = "dash" }) => {
    // type="particle" = white dots (commits)
    // type="dash" = colored lines (data)

    return (
        <>
            {/* Base Path (Dim) */}
            <motion.path
                d={d}
                stroke={color}
                strokeWidth={type === "particle" ? 1 : 2}
                strokeOpacity="0.1"
                fill="none"
            />
            {/* Active Data Packet */}
            <motion.path
                d={d}
                stroke={color}
                strokeWidth={3}
                fill="none"
                strokeDasharray={type === "particle" ? "2 20" : "10 120"}
                strokeLinecap="round"
                initial={{ strokeDashoffset: 0, opacity: 0 }}
                animate={active ? {
                    strokeDashoffset: [-150, 0],
                    opacity: 1
                } : { opacity: 0 }}
                transition={{
                    duration: type === "particle" ? 2 : 1.5,
                    repeat: Infinity,
                    ease: "linear"
                }}
            />
        </>
    );
};

// --- Subcomponent: The Central Hub (Render) ---
const HubNode = ({ icon, active, isProcessing }) => (
    <div className="relative flex items-center justify-center w-36 h-36">

        {/* Rotating Outer Rings */}
        <div className="absolute inset-0 border border-dashed border-[var(--color-accent-purple)] rounded-full animate-[spin_8s_linear_infinite] opacity-30"></div>
        <div className="absolute inset-4 border border-[var(--color-accent-purple)] rounded-full animate-[spin_4s_linear_infinite_reverse] opacity-20"></div>

        {/* Sync Badge */}
        <div className="absolute -top-8 bg-[var(--color-bg-deep)] border border-[var(--color-accent-purple)] px-3 py-1 rounded-full flex items-center gap-2 shadow-[0_0_15px_rgba(188,19,254,0.4)] z-20">
            <div className={`w-1.5 h-1.5 rounded-full bg-[var(--color-accent-purple)] ${active ? 'animate-pulse' : ''}`}></div>
            <span className="text-[10px] font-mono font-bold text-[var(--color-accent-purple)] tracking-widest uppercase">
                {active ? 'Sync Active' : 'Standby'}
            </span>
        </div>

        {/* Glass Core */}
        <motion.div
            className="w-20 h-20 rounded-2xl bg-[rgba(20,20,20,0.8)] backdrop-blur-xl border border-[var(--color-accent-purple)] flex items-center justify-center shadow-[0_0_30px_rgba(188,19,254,0.2)] z-10"
            animate={isProcessing ? { scale: [1, 1.05, 1], borderColor: ['#bc13fe', '#ffffff', '#bc13fe'] } : {}}
            transition={{ duration: 0.5, repeat: isProcessing ? Infinity : 0 }}
        >
            {icon}
        </motion.div>

        {/* Tech Stack Chips Below */}
        <div className="absolute -bottom-6 flex gap-1">
            <span className="px-1.5 py-0.5 rounded text-[8px] bg-white/10 text-white/60 font-mono">Node</span>
            <span className="px-1.5 py-0.5 rounded text-[8px] bg-white/10 text-white/60 font-mono">Express</span>
        </div>
    </div>
);

// --- Subcomponent: Detailed Node Card ---
const NodeCard = ({ icon, title, active, color, badges = [], details, size = "md" }) => {
    return (
        <motion.div
            className={`
                relative flex flex-col items-start p-3
                w-32 rounded-xl
                bg-[rgba(20,20,20,0.8)] backdrop-blur-md border 
                transition-all duration-500
                group
            `}
            style={{
                borderColor: active ? color : 'rgba(255,255,255,0.05)',
                boxShadow: active ? `0 4px 20px ${color}10` : 'none'
            }}
            whileHover={{ scale: 1.05, zIndex: 50 }}
        >
            {/* Header */}
            <div className="flex items-center gap-3 mb-2 w-full">
                <div className="p-1.5 rounded-lg bg-white/5 opacity-80 group-hover:opacity-100 transition-opacity">
                    {icon}
                </div>
                <div className="flex flex-col">
                    <span className="text-[10px] uppercase font-mono tracking-wider text-[var(--color-text-secondary)]">{title}</span>
                </div>
            </div>

            {/* Badges Row */}
            <div className="flex flex-wrap gap-1.5 mb-2">
                {badges.map((b, i) => (
                    <div key={i} className="flex items-center gap-1 bg-white/5 px-1.5 py-0.5 rounded text-[9px] font-mono border border-white/5">
                        {b.icon}
                        <span className={b.color}>{b.text}</span>
                    </div>
                ))}
            </div>

            {/* Footer Details */}
            {details && (
                <div className="w-full pt-2 border-t border-white/5 text-[9px] text-[var(--color-text-primary)] opacity-50 font-mono flex justify-between">
                    <span>{details}</span>
                </div>
            )}

            {/* Active Indicator Line */}
            {active && (
                <motion.div layoutId="activeGlow" className="absolute top-0 left-0 w-1 h-full rounded-l-xl" style={{ backgroundColor: color }} />
            )}
        </motion.div>
    );
}

export default PortfolioArchitecture;
