import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Icons (Inline for portability, matching Hero style) ---
const TechIcons = {
    React: (
        <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8 text-[#61DAFB]">
            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="1.5" opacity="0.2" />
            <circle cx="12" cy="12" r="2" fill="currentColor" />
            <ellipse cx="12" cy="12" rx="10" ry="4" stroke="currentColor" strokeWidth="1.5" transform="rotate(60 12 12)" />
            <ellipse cx="12" cy="12" rx="10" ry="4" stroke="currentColor" strokeWidth="1.5" transform="rotate(120 12 12)" />
        </svg>
    ),
    Node: (
        <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8 text-[#339933]">
            <path d="M12 2L2 7V17L12 22L22 17V7L12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
            <path d="M12 22V12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M12 12L2 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M12 12L22 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
    ),
    Firebase: (
        <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8 text-[#FFAB00]">
            <path d="M4.5 16.5L1.5 19.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M19.5 16.5L22.5 19.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M12 22L3 8L12 2L21 8L12 22Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
            <path d="M12 12L12 22" stroke="currentColor" strokeWidth="1.5" />
        </svg>
    ),
    GitHub: (
        <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8 text-[#EDEDED]">
            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    ),
    Render: (
        <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8 text-[#bc13fe]">
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

    // Auto-cycle the animation
    useEffect(() => {
        const interval = setInterval(() => {
            setPhase(p => (p + 1) % 4);
        }, 1500); // Speed up slightly for flow (1.5s per phase)
        return () => clearInterval(interval);
    }, []);

    const isPhaseActive = (targetPhase) => phase >= targetPhase;

    return (
        <section className="min-h-screen w-full relative flex items-center justify-center py-20 bg-[var(--color-bg-deep)] overflow-hidden">

            {/* Background Grid Accent */}
            <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]"></div>

            <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 px-6 relative z-10">

                {/* --- LEFT: Narrative --- */}
                <div className="flex flex-col justify-center space-y-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-[var(--color-accent-blue)] font-mono text-sm tracking-widest uppercase mb-4">
                            &gt; System_Unlock_
                        </h2>

                        <div className="font-display text-4xl md:text-5xl font-bold leading-tight mb-6">
                            So.. You know who I am, <br />
                            <span className="opacity-50">what I look like...</span>
                        </div>

                        <p className="text-[var(--color-text-secondary)] text-lg leading-relaxed max-w-lg mb-8">
                            Now let's talk about this portfolio itself. It's not just static HTML.
                            It's a living system, powered by a modern, distributed architecture.
                        </p>

                        <div className="p-6 rounded-2xl bg-[rgba(255,255,255,0.03)] border border-[var(--border-subtle)] backdrop-blur-sm relative overflow-hidden group">
                            <div className="absolute top-0 left-0 w-1 h-full bg-[var(--color-accent-green)]"></div>
                            <h3 className="font-mono text-white text-sm mb-2 opacity-70 uppercase tracking-wider">Metrics Source</h3>
                            <p className="text-gray-400 text-sm">
                                All numbers you see are fetched in <span className="text-[var(--color-accent-blue)]">Real-Time</span>.
                                The backend queries GitHub API every 5 minutes and caches the result in Firebase, serving it instantly to you via Render.
                            </p>
                        </div>
                    </motion.div>
                </div>

                {/* --- RIGHT: Architecture Diagram --- */}
                <div className="relative h-[500px] flex items-center justify-center">

                    {/* Diagram Container */}
                    <div className="relative w-full max-w-[600px] h-[300px]">

                        {/* --- CONNECTIONS (SVG Layer) --- */}
                        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" overflow="visible">
                            <defs>
                                <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="var(--color-accent-blue)" stopOpacity="0" />
                                    <stop offset="50%" stopColor="var(--color-accent-blue)" stopOpacity="1" />
                                    <stop offset="100%" stopColor="var(--color-accent-blue)" stopOpacity="0" />
                                </linearGradient>
                            </defs>

                            {/* Path 1: GitHub -> Render */}
                            <DataCable
                                d="M 80 150 L 250 150"
                                active={isPhaseActive(1)}
                                color="var(--color-accent-blue)"
                            />

                            {/* Path 2: Render -> Node */}
                            <DataCable
                                d="M 320 150 L 400 150"
                                active={isPhaseActive(2)}
                                color="var(--color-accent-purple)"
                                delay={0.2}
                            />

                            {/* Path 3: Node -> Split (Firebase Up / React Down) */}
                            {/* Firebase Branch */}
                            <DataCable
                                d="M 460 150 C 500 150, 500 80, 540 80"
                                active={isPhaseActive(3)}
                                color="var(--color-accent-orange)"
                                delay={0.4}
                            />

                            {/* React Branch */}
                            <DataCable
                                d="M 460 150 C 500 150, 500 220, 540 220"
                                active={isPhaseActive(3)}
                                color="var(--color-accent-blue)"
                                delay={0.4}
                            />

                        </svg>

                        {/* --- NODES --- */}

                        {/* 1. GitHub Node */}
                        <div className="absolute top-[120px] left-0">
                            <NodeCard
                                icon={TechIcons.GitHub}
                                label="Repository"
                                active={phase >= 0}
                                color="white"
                                triggerPulse={phase === 0} // Pulse on start
                            />
                        </div>

                        {/* 2. Render Node (Center) */}
                        <div className="absolute top-[110px] left-[250px] z-20">
                            <NodeCard
                                icon={TechIcons.Render}
                                label="Render Host"
                                subLabel="Live Backend"
                                active={phase >= 1}
                                color="#bc13fe"
                                size="lg"
                                triggerPulse={phase === 1} // Pulse when data hits
                            />
                            {/* Sync Badge */}
                            <div className="absolute -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap">
                                <span className={`
                                    bg-[var(--color-bg-deep)] border border-[var(--color-accent-purple)] text-[var(--color-accent-purple)] text-[9px] px-2 py-0.5 rounded-full uppercase tracking-wider font-mono shadow-[0_0_10px_rgba(188,19,254,0.3)]
                                    transition-opacity duration-300
                                    ${phase >= 1 ? 'opacity-100' : 'opacity-0'}
                                `}>
                                    ● Sync Active
                                </span>
                            </div>
                        </div>

                        {/* 3. Node.js Middleware */}
                        <div className="absolute top-[120px] left-[400px]">
                            <NodeCard
                                icon={TechIcons.Node}
                                label="API Logic"
                                active={phase >= 2}
                                color="#339933"
                                triggerPulse={phase === 2}
                            />
                        </div>

                        {/* 4. Firebase (Top Right) */}
                        <div className="absolute top-[50px] right-0">
                            <NodeCard
                                icon={TechIcons.Firebase}
                                label="Realtime DB"
                                active={phase >= 3}
                                color="#FFAB00"
                                triggerPulse={phase === 3}
                            />
                        </div>

                        {/* 5. React (Bottom Right) */}
                        <div className="absolute top-[190px] right-0">
                            <NodeCard
                                icon={TechIcons.React}
                                label="React Frontend"
                                active={phase >= 3}
                                color="#61DAFB"
                                triggerPulse={phase === 3}
                            />
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
};

// --- Subcomponent: Animated Data Cable (Fiber Optic Effect) ---
const DataCable = ({ d, active, color, delay = 0 }) => {
    return (
        <>
            {/* Base Path (Dim) */}
            <motion.path
                d={d}
                stroke={color}
                strokeWidth="1"
                strokeOpacity="0.2"
                fill="none"
            />
            {/* Active Data Packet (Dash) */}
            <motion.path
                d={d}
                stroke={color}
                strokeWidth="3"
                fill="none"
                strokeDasharray="10 120" // Short dash, long gap
                strokeLinecap="round"
                initial={{ strokeDashoffset: 0, opacity: 0 }}
                animate={active ? {
                    strokeDashoffset: [-130, 0], // Move continuously
                    opacity: 1
                } : { opacity: 0 }}
                transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "linear",
                    delay: delay
                }}
            />
        </>
    );
};

// --- Subcomponent: Glass Node Card (Reactive) ---
const NodeCard = ({ icon, label, subLabel, active, color, size = "md", triggerPulse = false }) => {
    const isLg = size === "lg";

    return (
        <motion.div
            className={`
                relative flex flex-col items-center justify-center 
                ${isLg ? 'w-24 h-24' : 'w-16 h-16'} 
                rounded-2xl 
                bg-[rgba(20,20,20,0.6)] backdrop-blur-xl border 
                transition-all duration-500
                shadow-lg
                z-10
            `}
            style={{
                borderColor: active ? color : 'rgba(255,255,255,0.05)',
                boxShadow: active ? `0 0 20px ${color}20` : 'none'
            }}
            animate={triggerPulse ? {
                scale: [1, 1.15, 1],
                boxShadow: [`0 0 20px ${color}20`, `0 0 40px ${color}60`, `0 0 20px ${color}20`],
                borderColor: [color, 'white', color]
            } : {
                scale: active ? 1.05 : 1
            }}
            transition={{ duration: 0.4 }}
        >
            {/* Inner Glow Pulse */}
            {triggerPulse && (
                <div className="absolute inset-0 rounded-2xl animate-ping opacity-20" style={{ backgroundColor: color }}></div>
            )}

            <div className={`transition-all duration-500 ${active ? 'opacity-100' : 'opacity-30 grayscale'}`}>
                {icon}
            </div>

            {/* Floating Label */}
            <div className="absolute -bottom-8 w-max text-center">
                <div className="text-[10px] font-mono tracking-wider text-[var(--color-text-secondary)] uppercase">{label}</div>
                {subLabel && <div className="text-[9px] text-[var(--color-text-primary)] font-bold">{subLabel}</div>}
            </div>
        </motion.div>
    );
}

export default PortfolioArchitecture;
