import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import CountUp from '../../../shared/ui/CountUp';

const MetricValue = ({ isUptime, uptimeStart, rawValue, formatter }) => {
    const [uptimeString, setUptimeString] = useState("");

    useEffect(() => {
        if (!isUptime) return;

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

            setUptimeString(
                `${days}d ${hours.toString().padStart(2, '0')}h ${minutes.toString().padStart(2, '0')}m`
            );
        };

        const interval = setInterval(updateTimer, 1000);
        updateTimer();

        return () => clearInterval(interval);
    }, [isUptime, uptimeStart]);

    return (
        <span className="tabular-nums">
            {isUptime ? uptimeString : <CountUp end={rawValue} duration={2500} formatter={formatter} />}
        </span>
    );
};

const MetricItem = ({ label, icon, rawValue, formatter, delay, isUptime, uptimeStart, className, layoutId }) => {
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
                ease: [0.16, 1, 0.3, 1]
            }}
            className={`glass-panel p-4 md:p-6 rounded-2xl min-w-[140px] relative overflow-hidden group hover:bg-[rgba(255,255,255,0.05)] flex flex-col justify-center h-full ${className}`}
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
                <div className="flex items-center gap-4 mb-3 opacity-60">
                    <div className="p-2 bg-white/5 rounded-lg">
                        {icon}
                    </div>
                    <span className="text-xs md:text-sm font-mono text-gray-400 uppercase tracking-widest font-bold">
                        {label}
                    </span>
                </div>
            </motion.div>

            <div className={`text-4xl md:text-5xl font-display font-bold text-white tracking-tight`}>
                <MetricValue
                    isUptime={isUptime}
                    uptimeStart={uptimeStart}
                    rawValue={rawValue}
                    formatter={formatter}
                />
            </div>
        </motion.div>
    );
};

export default MetricItem;
