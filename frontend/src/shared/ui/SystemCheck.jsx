import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SystemCheck = ({ onComplete }) => {
    const [progress, setProgress] = useState(0);
    const [status, setStatus] = useState("Initializing Core...");

    useEffect(() => {
        const statuses = [
            "Initializing Core...",
            "Checking Network Integrity...",
            "Loading Tactical HUD...",
            "Fetching Live Metrics...",
            "Access Granted."
        ];

        let currentStatus = 0;
        const interval = setInterval(() => {
            currentStatus++;
            if (currentStatus < statuses.length) {
                setStatus(statuses[currentStatus]);
            }
        }, 300);

        const timer = setTimeout(() => {
            onComplete();
        }, 1800);

        return () => {
            clearInterval(interval);
            clearTimeout(timer);
        };
    }, [onComplete]);

    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black flex flex-col items-center justify-center font-mono"
        >
            <div className="w-64 h-1 bg-white/5 relative overflow-hidden rounded-full mb-4">
                <motion.div
                    initial={{ x: "-100%" }}
                    animate={{ x: "0%" }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                    className="absolute inset-0 bg-cyan-400"
                />
            </div>

            <div className="flex flex-col items-center gap-1">
                <span className="text-cyan-400 text-[10px] uppercase tracking-[0.3em] animate-pulse">
                    {status}
                </span>
                <span className="text-gray-600 text-[8px] uppercase tracking-[0.5em]">
                    System Authentication in Progress
                </span>
            </div>

            {/* Scanning Line */}
            <motion.div
                initial={{ top: "-10%" }}
                animate={{ top: "110%" }}
                transition={{ duration: 1.5, ease: "linear" }}
                className="absolute left-0 right-0 h-px bg-cyan-400/30 shadow-[0_0_15px_rgba(34,211,238,0.5)] z-[201]"
            />
        </motion.div>
    );
};

export default SystemCheck;
