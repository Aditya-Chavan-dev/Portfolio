import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Shield, Code, Lightbulb } from 'lucide-react';

const ExpandableFeature = ({ title, what, tech, security, tip, isExpanded, onToggle, className = '' }) => {
    return (
        <motion.div
            layout
            className={`relative p-6 transition-all duration-500 ${isExpanded
                ? 'bg-cyan-900/20'
                : 'bg-[#0A0A0A] hover:bg-white/[0.02]'
                } ${className}`}
        >

            {/* Header with Title (No Arrow) */}
            <div className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-yellow-500 shrink-0" />
                <span className="text-gray-300 font-mono text-lg md:text-xl break-words">{title}</span>
            </div>

            {/* Expandable Content */}
            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                        className="overflow-hidden"
                    >
                        <div className="mt-5 flex flex-col gap-4">
                            {/* Box 1: Mission Objective (Full Width) */}
                            <div className="w-full h-40 border border-white/10 rounded-lg bg-white/5 p-4 flex flex-col justify-center">
                                <div className="flex items-center gap-2 mb-2 text-cyan-400/90">
                                    <Lightbulb size={16} className="" />
                                    <span className="text-sm uppercase font-mono tracking-widest font-bold">Mission Objective</span>
                                </div>
                                <p className="text-gray-300 text-[18.2px] leading-[30px]">
                                    {what}
                                </p>
                            </div>

                            {/* Middle Row: Tech & Security */}
                            <div className="grid grid-cols-2 gap-4">
                                {/* Box 2: Tech Matrix */}
                                <div className="h-40 border border-white/10 rounded-lg bg-white/5 p-4 flex flex-col justify-center">
                                    <div className="flex items-center gap-2 mb-2 text-purple-400/90">
                                        <Code size={16} className="" />
                                        <span className="text-sm uppercase font-mono tracking-widest font-bold">Tech Matrix</span>
                                    </div>
                                    <p className="text-gray-400 text-[18.2px] leading-[30px]">
                                        {tech}
                                    </p>
                                </div>

                                {/* Box 3: Security Protocol */}
                                <div className="h-40 border border-white/10 rounded-lg bg-white/5 p-4 flex flex-col justify-center">
                                    <div className="flex items-center gap-2 mb-2 text-rose-400/90">
                                        <Shield size={16} className="" />
                                        <span className="text-sm uppercase font-mono tracking-widest font-bold">Security Protocol</span>
                                    </div>
                                    <p className="text-gray-400 text-[18.2px] leading-[30px]">
                                        {security}
                                    </p>
                                </div>
                            </div>

                            {/* Box 4: War Story (Full Width) */}
                            {tip && (
                                <div className="w-full h-40 border border-white/10 rounded-lg bg-white/5 p-4 flex flex-col justify-center">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="text-yellow-500/80 text-[20px]">💡</span>
                                        <span className="text-yellow-500/50 text-xs uppercase font-mono tracking-widest">
                                            War Story
                                        </span>
                                    </div>
                                    <p className="text-yellow-100/90 text-[18.2px] font-light italic leading-[30px]">
                                        {tip}
                                    </p>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default ExpandableFeature;

