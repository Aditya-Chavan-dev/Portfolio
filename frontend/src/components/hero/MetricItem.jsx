import React from 'react';
import { motion } from 'framer-motion';
import MagicCounter from '../ui/MagicCounter';

const MetricItem = ({ label, rawValue, formatter, icon, delay }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay, duration: 0.5 }}
        className="glass-panel p-4 md:p-6 rounded-2xl min-w-[140px] md:min-w-[170px] relative overflow-hidden group hover:bg-[rgba(255,255,255,0.05)] transition-colors duration-300 flex flex-col justify-center"
    >
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[var(--color-accent-blue)] to-transparent opacity-20"></div>

        <div className="flex items-center space-x-2 text-[var(--color-text-secondary)] text-[9px] md:text-[10px] uppercase tracking-widest mb-2 md:mb-3 font-mono">
            {icon}
            <span>{label}</span>
        </div>
        <div className="text-2xl md:text-3xl font-display font-bold text-[var(--color-text-primary)] group-hover:text-glow transition-all duration-300">
            <MagicCounter value={rawValue} formatter={formatter} />
        </div>
    </motion.div>
);

export default MetricItem;
