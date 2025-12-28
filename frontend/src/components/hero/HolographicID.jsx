import React from 'react';
import { motion } from 'framer-motion';
import config from '../../portfolio.config';
import { UserCheck } from 'lucide-react';

const HolographicID = () => {
    const isOnline = config.hero.identity.status === 'available';
    const statusColor = isOnline ? 'var(--color-accent-green)' : 'var(--color-accent-orange)';

    return (
        <div className="relative group cursor-help">
            {/* The Rotating Rings */}
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full border border-dashed border-[var(--color-accent-blue)] opacity-20 scale-110"
            />
            <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full border border-[var(--border-subtle)] opacity-40 scale-125"
            />

            {/* The Image Container */}
            <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-2 border-[var(--border-subtle)] z-10 bg-[var(--color-bg-card)]">
                {/* Fallback Icon if no image yet */}
                <div className="w-full h-full flex-center text-[var(--color-accent-blue)] opacity-50">
                    <UserCheck size={48} />
                </div>
            </div>

            {/* Status Dot */}
            <div className="absolute bottom-1 right-2 w-6 h-6 bg-[var(--color-bg-deep)] rounded-full flex-center z-20">
                <div
                    className="w-3 h-3 rounded-full animate-pulse"
                    style={{ backgroundColor: statusColor }}
                />
            </div>

            {/* Tooltip Card (Reveals on Hover) */}
            <div className="absolute left-1/2 -translate-x-1/2 bottom-[-80px] w-64 p-3 
                            backdrop-blur-md bg-[var(--glass-overlay)] border border-[var(--border-subtle)]
                            opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none
                            rounded-lg text-center z-30 transform translate-y-2 group-hover:translate-y-0"
            >
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
