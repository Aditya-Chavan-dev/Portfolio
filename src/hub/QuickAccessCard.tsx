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
      whileHover={{ y: -2, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`group relative flex flex-col items-start p-5 rounded-2xl border border-white/5 bg-white/[0.01] backdrop-blur-md overflow-hidden transition-all hover:bg-white/[0.03] hover:border-accent/20 ${className}`}
    >
      {/* Azure Glow Effect */}
      <div className="absolute -inset-1 bg-accent/5 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />

      {/* Icon with Azure Glow */}
      <div className="relative mb-4">
        <div className="absolute inset-0 bg-accent/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="relative p-2 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center">
          <div className="w-4 h-4 text-accent">
            {icon}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative">
        <h3 className="text-lg font-bold text-[#F8FAFC] tracking-tight mb-1 font-syne group-hover:text-accent transition-colors">
          {title}
        </h3>
        <p className="text-[8px] font-bold text-accent/40 tracking-[0.2em] uppercase text-left leading-relaxed">
          {label}
        </p>
      </div>
      
      {/* Bottom Accent Line */}
      <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-500" />
    </motion.button>
  );
};
