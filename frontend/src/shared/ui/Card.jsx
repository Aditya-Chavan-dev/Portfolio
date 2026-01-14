import React from 'react';
import { motion } from 'framer-motion';

/**
 * ATOMIC CARD COMPONENT
 * Enforces Design System Tokens:
 * - bg-card (Translucent)
 * - border-subtle
 * - glass-overlay
 */

const Card = ({
    children,
    className = '',
    hoverEffect = false,
    delay = 0
}) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay, duration: 0.5 }}
            className={`
                group relative overflow-hidden rounded-xl 
                bg-bg-card backdrop-blur-md border border-border-subtle
                shadow-lg
                ${hoverEffect ? 'hover:border-tactical-cyan/30 hover:bg-white/5 transition-all duration-300' : ''}
                ${className}
            `}
        >
            {/* Standard Glass Highlight */}
            <div className="absolute inset-0 bg-glass-overlay pointer-events-none" />

            {/* Content Buffer */}
            <div className="relative z-10 p-6">
                {children}
            </div>
        </motion.div>
    );
};

export default Card;
