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
                <span className="text-gray-300 font-mono text-base md:text-lg break-words">{title}</span>
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
                        <div className="mt-4 flex flex-col gap-6">
                            {/* Mission Objective (Full) */}
                            <div>
                                <div className="flex items-center gap-2 mb-2 text-cyan-400/90">
                                    <Lightbulb size={14} className="" />
                                    <span className="text-xs uppercase font-mono tracking-widest font-bold">Mission Objective</span>
                                </div>
                                <p className="text-gray-300 text-base leading-relaxed pl-1">
                                    {what}
                                </p>
                            </div>

                            {/* Grid for Tech & Security */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {/* Tech Used */}
                                <div>
                                    <div className="flex items-center gap-2 mb-2 text-purple-400/90">
                                        <Code size={14} className="" />
                                        <span className="text-xs uppercase font-mono tracking-widest font-bold">Tech Matrix</span>
                                    </div>
                                    <p className="text-gray-400 text-sm leading-relaxed pl-1">
                                        {tech}
                                    </p>
                                </div>

                                {/* Security */}
                                <div>
                                    <div className="flex items-center gap-2 mb-2 text-rose-400/90">
                                        <Shield size={14} className="" />
                                        <span className="text-xs uppercase font-mono tracking-widest font-bold">Security Protocol</span>
                                    </div>
                                    <p className="text-gray-400 text-sm leading-relaxed pl-1">
                                        {security}
                                    </p>
                                </div>
                            </div>

                            {/* War Story Tip (Bottom Pinned, No Divider) */}
                            {tip && (
                                <div className="mt-2">
                                    <div className="flex items-start gap-3">
                                        <div className="mt-0.5 text-yellow-500/80 text-base">💡</div>
                                        <div className="flex-1">
                                            <span className="text-yellow-500/50 text-[10px] uppercase font-mono tracking-widest block mb-1">
                                                War Story
                                            </span>
                                            <p className="text-yellow-100/90 text-sm font-light italic leading-relaxed">
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
