import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Loader2 } from 'lucide-react';

/**
 * ATOMIC BUTTON COMPONENT
 * Enforces Design System Tokens:
 * - tactical-cyan / accent-blue
 * - font-mono
 * - spacing consistency
 * 
 * Variants:
 * - primary: Solid tactical color, high viz
 * - ghost: Border only, subtle
 * - danger: Warning state
 */

const variants = {
    primary: "bg-tactical-cyan text-black hover:bg-accent-blue hover:shadow-[0_0_20px_rgba(0,240,255,0.4)] border-transparent",
    ghost: "bg-transparent border border-tactical-cyan text-tactical-cyan hover:bg-tactical-cyan/10",
    danger: "bg-red-500/10 border border-red-500 text-red-500 hover:bg-red-500/20"
};

const Button = ({
    children,
    onClick,
    variant = 'primary',
    size = 'md',
    loading = false,
    disabled = false,
    icon: Icon,
    className = ''
}) => {
    return (
        <motion.button
            whileHover={!disabled && !loading ? { scale: 1.02 } : {}}
            whileTap={!disabled && !loading ? { scale: 0.98 } : {}}
            onClick={onClick}
            disabled={disabled || loading}
            className={`
                relative flex items-center justify-center gap-2 
                font-mono uppercase tracking-widest font-bold rounded-sm
                disabled:opacity-50 disabled:cursor-not-allowed
                ${variants[variant]}
                ${size === 'sm' ? 'px-4 py-2 text-xs' : 'px-8 py-4 text-sm'}
                ${className}
            `}
        >
            {loading ? (
                <Loader2 className="animate-spin" size={16} />
            ) : (
                <>
                    {Icon && <Icon size={16} />}
                    {children}
                </>
            )}
        </motion.button>
    );
};

export default Button;
