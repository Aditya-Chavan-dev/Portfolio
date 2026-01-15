import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Shield, Code, Lightbulb } from 'lucide-react';

const ExpandableFeature = ({ title, what, tech, security, tip, isExpanded, onToggle, className = '' }) => {
    return (
        <motion.div
            layout
            className={`relative bg-[#0A0A0A] border rounded-lg p-3 transition-all duration-300 ${isExpanded
                ? 'border-cyan-500/50 shadow-[0_0_20px_rgba(6,182,212,0.15)]'
                : 'border-white/5 hover:border-white/10'
                } ${className}`}
        >
            {/* Glow effect when expanded */}
            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute -inset-[1px] bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-cyan-500/20 rounded-xl blur-sm -z-10"
                    />
                )}
            </AnimatePresence>

            {/* Header with Title and Arrow */}
            <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className="w-1.5 h-1.5 rounded-full bg-yellow-500 shrink-0" />
                    <span className="text-gray-300 font-mono text-sm md:text-base break-words">{title}</span>
                </div>

                {/* Arrow Button */}
                <button
                    onClick={onToggle}
                    className="p-2 rounded-lg bg-white/5 hover:bg-cyan-500/10 border border-white/5 hover:border-cyan-500/30 transition-all group"
                    aria-label={isExpanded ? 'Collapse' : 'Expand'}
                >
                    <motion.div
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        transition={{ duration: 0.25, ease: 'easeOut' }}
                    >
                        <ChevronDown size={16} className="text-gray-400 group-hover:text-cyan-400 transition-colors" />
                    </motion.div>
                </button>
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
                        <div className="mt-2 pt-3 border-t border-white/5 flex flex-col gap-2">
                            {/* Row 1: Mission Objective (Full) */}
                            <div>
                                <div className="flex items-center gap-2 text-cyan-400 mb-1">
                                    <Lightbulb size={12} />
                                    <span className="text-[10px] uppercase font-mono tracking-widest font-semibold opacity-80">Mission Objective</span>
                                </div>
                                <p className="text-gray-300 text-sm leading-snug bg-white/[0.03] p-3 rounded border-l-2 border-cyan-500/30">
                                    {what}
                                </p>
                            </div>

                            {/* Row 2: Grid for Tech & Security */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                {/* Tech Used */}
                                <div>
                                    <div className="flex items-center gap-2 text-purple-400 mb-1">
                                        <Code size={12} />
                                        <span className="text-[10px] uppercase font-mono tracking-widest font-semibold opacity-80">Tech Matrix</span>
                                    </div>
                                    <p className="text-gray-400 text-xs leading-snug bg-white/[0.03] p-2.5 rounded border-l-2 border-purple-500/30 h-full flex items-center">
                                        {tech}
                                    </p>
                                </div>

                                {/* Security */}
                                <div>
                                    <div className="flex items-center gap-2 text-red-400 mb-1">
                                        <Shield size={12} />
                                        <span className="text-[10px] uppercase font-mono tracking-widest font-semibold opacity-80">Security Protocol</span>
                                    </div>
                                    <p className="text-gray-400 text-xs leading-snug bg-white/[0.03] p-2.5 rounded border-l-2 border-red-500/30 h-full flex items-center">
                                        {security}
                                    </p>
                                </div>
                            </div>

                            {/* Row 3: War Story Tip (Bottom Pinned) */}
                            {tip && (
                                <div className="mt-1 p-2.5 rounded bg-yellow-500/5 border border-yellow-500/20">
                                    <div className="flex items-start gap-2">
                                        <div className="mt-0.5 text-yellow-500 text-xs">💡</div>
                                        <div className="flex-1">
                                            <span className="text-yellow-500/70 text-[10px] uppercase font-mono tracking-widest block mb-0.5">
                                                War Story
                                            </span>
                                            <p className="text-yellow-200/90 text-xs font-light italic leading-snug">
                                                {tip}
                                            </p>
                                        </div>
                                    </div>
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
