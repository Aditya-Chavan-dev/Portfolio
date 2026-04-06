import React from "react";
import { motion } from "framer-motion";

interface QuickAccessCardProps {
  title: string;
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
  className?: string;
}

export const QuickAccessCard: React.FC<QuickAccessCardProps> = ({
  title,
  label,
  icon,
  onClick,
  className = "",
}) => {

  return (
    <motion.button
      whileHover={{ y: -4, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`group relative flex flex-col items-start w-full p-6 rounded-[20px] border border-white/5 bg-bg-card backdrop-blur-md overflow-hidden transition-all hover:bg-bg-card-hover hover:border-accent-gold/20 ${className}`}
    >
      {/* Gold Glow Effect */}
      <div className="absolute -inset-1 bg-accent-gold/5 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />

      {/* Icon with Gold Glow */}
      <div className="relative mb-5">
        <div className="absolute inset-0 bg-accent-gold/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="relative p-3 rounded-xl bg-accent-gold/10 border border-accent-gold/20 flex items-center justify-center">
          <div className="w-5 h-5 text-accent-gold">
            {icon}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative">
        <h3 className="text-xl font-extrabold text-white tracking-tight mb-1 font-syne group-hover:text-accent-gold transition-colors">
          {title}
        </h3>
        <p className="text-xs font-bold text-accent-gold/60 tracking-widest uppercase text-left leading-relaxed font-mono">
          {label}
        </p>
      </div>
      
      {/* Bottom Accent Line */}
      <div className="absolute bottom-0 left-0 w-0 h-1 bg-accent-gold group-hover:w-full transition-all duration-500" />
    </motion.button>
  );
};
