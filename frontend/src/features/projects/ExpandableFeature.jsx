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
                <div className="w-full h-auto min-h-[160px] border border-white/10 rounded-lg bg-white/5 p-6 flex flex-col justify-center gap-2">
                    <div className="flex items-center gap-2 text-cyan-400/90 mb-1">
                        <Lightbulb size={16} />
                        <span className="text-xs uppercase font-mono tracking-widest font-bold">Mission Objective</span>
                    </div>
                    <p className="text-gray-300 text-[18.2px] leading-[30px]">{what}</p>
                </div>

                {/* Middle Row: Tech & Security */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Box 2: Tech Matrix */}
                    <div className="h-auto min-h-[160px] border border-white/10 rounded-lg bg-white/5 p-6 flex flex-col gap-2">
                        <div className="flex items-center gap-2 text-purple-400/90 mb-1">
                            <Code size={16} />
                            <span className="text-xs uppercase font-mono tracking-widest font-bold">Tech Matrix</span>
                        </div>
                        <p className="text-gray-300 text-[16px] leading-relaxed">{tech}</p>
                    </div>

                    {/* Box 3: Security Protocol */}
                    <div className="h-auto min-h-[160px] border border-white/10 rounded-lg bg-white/5 p-6 flex flex-col gap-2">
                        <div className="flex items-center gap-2 text-rose-400/90 mb-1">
                            <Shield size={16} />
                            <span className="text-xs uppercase font-mono tracking-widest font-bold">Security Protocol</span>
                        </div>
                        <p className="text-gray-300 text-[16px] leading-relaxed">{security}</p>
                    </div>
                </div>

                {/* Box 4: War Story (Full Width) */}
                {tip && (
                    <div className="w-full h-auto min-h-[160px] border border-yellow-500/20 rounded-lg bg-yellow-500/5 p-6 flex flex-col justify-center gap-2">
                        <div className="flex items-center gap-2 text-yellow-500/90 mb-1">
                            <span className="text-lg">💡</span>
                            <span className="text-xs uppercase font-mono tracking-widest font-bold">War Story</span>
                        </div>
                        <p className="text-yellow-100/90 text-[18.2px] font-light italic leading-[30px]">{tip}</p>
                    </div>
                )}
            </div>
        </motion.div>
    );
};

export default ExpandableFeature;

