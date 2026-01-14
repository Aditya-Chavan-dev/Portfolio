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
                        <div className="mt-3 pt-4 border-t border-white/5 space-y-4">
                            {/* What is it */}
                            <div>
                                <div className="flex items-center gap-2 text-cyan-400 mb-2">
                                    <Lightbulb size={14} />
                                    <span className="text-xs uppercase font-mono tracking-widest font-semibold">Mission Objective</span>
                                </div>
                                <p className="text-gray-300 text-sm leading-relaxed bg-white/[0.03] p-4 rounded border-l-2 border-cyan-500/30">
                                    {what}
                                </p>
                            </div>

                            {/* Tech Used */}
                            <div>
                                <div className="flex items-center gap-2 text-purple-400 mb-2">
                                    <Code size={14} />
                                    <span className="text-xs uppercase font-mono tracking-widest font-semibold">Tech Matrix</span>
                                </div>
                                <p className="text-gray-400 text-sm leading-relaxed bg-white/[0.03] p-4 rounded border-l-2 border-purple-500/30">
                                    {tech}
                                </p>
                            </div>

                            {/* Security */}
                            <div>
                                <div className="flex items-center gap-2 text-red-400 mb-2">
                                    <Shield size={14} />
                                    <span className="text-xs uppercase font-mono tracking-widest font-semibold">Security Protocol</span>
                                </div>
                                <p className="text-gray-400 text-sm leading-relaxed bg-white/[0.03] p-4 rounded border-l-2 border-red-500/30">
                                    {security}
                                </p>
                            </div>

                            {/* War Story Tip */}
                            {tip && (
                                <div className="mt-2 p-4 rounded bg-yellow-500/5 border border-yellow-500/20">
                                    <div className="flex items-start gap-3">
                                        <div className="mt-0.5 text-yellow-500 text-sm">💡</div>
                                        <div className="flex-1">
                                            <span className="text-yellow-500/70 text-[10px] uppercase font-mono tracking-widest block mb-1">
                                                War Story
                                            </span>
                                            <p className="text-yellow-200/90 text-sm font-light italic leading-relaxed">
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
