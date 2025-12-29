import React from 'react';
import { motion } from 'framer-motion';
import config from '../../portfolio.config';
import { UserCheck } from 'lucide-react';

const HolographicID = () => {
    const isOnline = config.hero.identity.status === 'available';
    const statusColor = isOnline ? 'var(--color-accent-green)' : 'var(--color-accent-orange)';

    return (
        <div className="relative group cursor-help w-80 h-80 flex-center">

            {/* Layer 1: Outer Slow Ring */}
            <svg className="absolute inset-0 w-full h-full animate-[spin_10s_linear_infinite] opacity-20">
                <circle cx="50%" cy="50%" r="48%" fill="none" stroke="var(--color-accent-blue)" strokeWidth="1" strokeDasharray="40 20" />
            </svg>

            {/* Layer 2: Middle Fast Ring (Counter-Clockwise) */}
            <svg className="absolute inset-0 w-full h-full animate-[spin_5s_linear_infinite_reverse] opacity-30 scale-90">
                <circle cx="50%" cy="50%" r="48%" fill="none" stroke="var(--color-accent-blue)" strokeWidth="0.5" strokeDasharray="10 30" />
            </svg>

            {/* Layer 3: Inner Static Decor */}
            <div className="absolute inset-0 rounded-full border border-[var(--border-subtle)] scale-75 opacity-50"></div>

            {/* The Image Container */}
            <div className="relative w-48 h-48 rounded-full overflow-hidden border-2 border-[var(--border-subtle)] z-10 bg-[var(--color-bg-card)] shadow-[0_0_30px_rgba(0,0,0,0.5)]">
                {/* Inner Glow */}
                <div className="absolute inset-0 shadow-[inset_0_0_20px_rgba(0,0,0,0.8)] z-20 pointer-events-none"></div>

                {/* Live Portrait */}
                <img
                    src="/assets/hero-portrait.jpg"
                    alt={config.hero.name}
                    className="w-full h-full object-cover object-[50%_35%] opacity-90 hover:opacity-100 transition-opacity duration-500"
                />
            </div>

            {/* Status Dot */}
            <div className="absolute bottom-20 right-20 w-6 h-6 bg-[var(--color-bg-deep)] rounded-full flex-center z-20 border border-[var(--border-subtle)]">
                <div
                    className="w-2 h-2 rounded-full animate-pulse shadow-[0_0_8px_currentColor]"
                    style={{ backgroundColor: statusColor, color: statusColor }}
                />
            </div>

            {/* Tooltip Card (Reveals on Hover) */}
            <div className="absolute left-1/2 -translate-x-1/2 bottom-0 w-56 p-2 
                            glass-panel
                            opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none
                            rounded text-center z-30 transform translate-y-4 group-hover:translate-y-0"
            >
                <div className="text-[var(--color-accent-blue)] text-[10px] font-mono tracking-widest uppercase mb-1">
                    Identify Friend/Foe
                </div>
                <div className="h-[1px] w-1/2 mx-auto bg-[var(--color-accent-blue)] opacity-30 mb-2"></div>
                <div className="text-[var(--color-text-primary)] text-xs font-bold tracking-widest uppercase">
                    {config.hero.name}
                </div>
                <div className="text-[var(--color-text-secondary)] text-[10px] font-mono mt-1">
                    v24.0.0 &bull; {config.hero.identity.availabilityText}
                </div>
            </div>
        </div>
    );
};

export default HolographicID;
