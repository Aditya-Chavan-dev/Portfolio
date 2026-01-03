import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import MagicCounter from '../ui/MagicCounter';

const MetricItem = ({ label, rawValue, formatter, icon, delay, isUptime = false, uptimeStart }) => {

    // --- UPTIME SPECIFIC LOGIC ---
    const [uptimeString, setUptimeString] = useState("00d 00h 00m 00s");

    useEffect(() => {
        if (!isUptime || !uptimeStart) return;

        const updateTimer = () => {
            const now = new Date();
            const start = new Date(uptimeStart);
            const diff = now - start;

            if (diff < 0) {
                setUptimeString("SOON");
                return;
            }

            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((diff / 1000 / 60) % 60);
            const seconds = Math.floor((diff / 1000) % 60);

            setUptimeString(
                `${days}d ${hours.toString().padStart(2, '0')}h ${minutes.toString().padStart(2, '0')}m`
            );
        };

        const interval = setInterval(updateTimer, 1000); // Precise ticking
        updateTimer(); // Initial call

        return () => clearInterval(interval);
    }, [isUptime, uptimeStart]);

    // --- RENDER ---
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay, duration: 0.5 }}
            className="glass-panel p-4 md:p-6 rounded-2xl min-w-[140px] relative overflow-hidden group hover:bg-[rgba(255,255,255,0.05)] transition-colors duration-300 flex flex-col justify-center h-full"
        >
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[var(--color-accent-blue)] to-transparent opacity-20"></div>

            <div className="flex items-center space-x-2 text-[var(--color-text-secondary)] text-[9px] md:text-[10px] uppercase tracking-widest mb-2 md:mb-3 font-mono">
                {icon}
                <span>{label}</span>
            </div>

            <div className={`text-2xl md:text-3xl font-display font-bold text-[var(--color-text-primary)] group-hover:text-glow transition-all duration-300 ${isUptime ? 'font-mono text-xl md:text-2xl tracking-tight' : ''}`}>
                {isUptime ? (
                    <span>{uptimeString}</span>
                ) : (
                    <MagicCounter value={rawValue} formatter={formatter} />
                )}
            </div>
        </motion.div>
    );
};

export default MetricItem;
