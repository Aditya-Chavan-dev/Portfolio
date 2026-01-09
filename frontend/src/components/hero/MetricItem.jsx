import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import MagicCounter from '../ui/MagicCounter';

const MetricItem = ({ label, rawValue, formatter, icon, delay, isUptime = false, uptimeStart, layoutId, className = "", font = "font-display" }) => {

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
            layoutId={layoutId}
            initial={{ opacity: 0, y: 30, scale: 0.9, filter: "blur(10px)" }}
            animate={{
                opacity: 1,
                y: 0,
                scale: 1,
                filter: "blur(0px)"
            }}
            whileHover={{
                scale: 1.02,
                boxShadow: "0 0 30px rgba(0, 255, 255, 0.3)"
            }}
            transition={{
                delay,
                duration: 0.7,
                ease: [0.16, 1, 0.3, 1] // Custom cubic-bezier for smooth deceleration
            }}
            className={`glass-panel p-4 md:p-6 rounded-2xl min-w-[140px] relative overflow-hidden group hover:bg-[rgba(255,255,255,0.05)] transition-colors duration-300 flex flex-col justify-center h-full ${className}`}
            style={{
                boxShadow: "0 0 20px rgba(0, 255, 255, 0.1)"
            }}
        >
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[var(--color-accent-blue)] to-transparent opacity-20"></div>

            <motion.div
                className="flex items-center space-x-2 text-[var(--color-text-secondary)] text-[9px] md:text-[10px] uppercase tracking-widest mb-2 md:mb-3 font-mono"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: delay + 0.2, duration: 0.5 }}
            >
                {icon}
                <span>{label}</span>
            </motion.div>

            <motion.div
                className={`text-2xl md:text-3xl ${font} font-bold text-[var(--color-text-primary)] group-hover:text-glow transition-all duration-300 ${isUptime ? 'font-mono text-xl md:text-2xl tracking-tight' : ''}`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: delay + 0.3, duration: 0.6, ease: "backOut" }}
            >
                {isUptime ? (
                    <span>{uptimeString}</span>
                ) : (
                    <MagicCounter value={rawValue} formatter={formatter} />
                )}
            </motion.div>
        </motion.div>
    );
};

export default MetricItem;
