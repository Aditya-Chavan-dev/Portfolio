import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Shield, Code, Lightbulb } from 'lucide-react';

const ExpandableFeature = ({ title, what, tech, security, tip, isExpanded, onToggle, className = '' }) => {
    return (
        <motion.div
            layout
            className={`relative p-6 transition-all duration-500 bg-[#0A0A0A] hover:bg-white/[0.02] ${className}`}
        >
            <div className="flex flex-col gap-4">
                {/* Box 1: Mission Objective (Full Width) */}
                <div className="w-full border border-white/10 rounded-lg bg-white/5 p-5 relative overflow-hidden group">
                    {/* Label */}
                    <div className="flex items-center gap-2 mb-2 text-cyan-400/90">
                        <span className="text-xs uppercase font-mono tracking-widest font-bold opacity-70 group-hover:opacity-100 transition-opacity">Mission Objective</span>
                    </div>
                    <p className="text-gray-300 text-[16px] leading-[26px]">
                        {what}
                    </p>
                </div>

                {/* Middle Row: Tech & Security */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Box 2: Tech Matrix */}
                    <div className="border border-white/10 rounded-lg bg-white/5 p-5 relative overflow-hidden group">
                        <div className="flex items-center gap-2 mb-2 text-purple-400/90">
                            <span className="text-xs uppercase font-mono tracking-widest font-bold opacity-70 group-hover:opacity-100 transition-opacity">Tech Matrix</span>
                        </div>
                        <p className="text-gray-400 text-[15px] leading-[24px]">
                            {tech}
                        </p>
                    </div>

                    {/* Box 3: Security Protocol */}
                    <div className="border border-white/10 rounded-lg bg-white/5 p-5 relative overflow-hidden group">
                        <div className="flex items-center gap-2 mb-2 text-rose-400/90">
                            <span className="text-xs uppercase font-mono tracking-widest font-bold opacity-70 group-hover:opacity-100 transition-opacity">Security Protocol</span>
                        </div>
                        <p className="text-gray-400 text-[15px] leading-[24px]">
                            {security}
                        </p>
                    </div>
                </div>

                {/* Box 4: War Story (Full Width) */}
                <div className="w-full border border-white/10 rounded-lg bg-white/5 p-5 relative overflow-hidden group">
                    <div className="flex items-center gap-2 mb-2 text-yellow-500/90">
                        <span className="text-xs uppercase font-mono tracking-widest font-bold opacity-70 group-hover:opacity-100 transition-opacity">War Story</span>
                    </div>
                    <p className="text-yellow-100/90 text-[16px] leading-[26px] italic font-light">
                        {tip}
                    </p>
                </div>
            </div>
        </motion.div>
    );
};

export default ExpandableFeature;

