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
                        <div className="mt-8 flex flex-col gap-6">
                            {/* Mission Objective Card */}
                            <div className="bg-black/40 rounded-xl p-6 border border-white/5">
                                <div className="flex items-center gap-2 mb-4 text-cyan-400">
                                    <Lightbulb size={18} />
                                    <span className="text-sm uppercase font-mono tracking-widest font-bold">Mission Objective</span>
                                </div>
                                <p className="text-gray-300 text-lg leading-relaxed">
                                    {what}
                                </p>
                            </div>

                            {/* Tech & Security Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Tech Card */}
                                <div className="bg-black/40 rounded-xl p-6 border border-white/5">
                                    <div className="flex items-center gap-2 mb-4 text-purple-400">
                                        <Code size={18} />
                                        <span className="text-sm uppercase font-mono tracking-widest font-bold">Tech Matrix</span>
                                    </div>
                                    <p className="text-gray-400 text-base leading-relaxed">
                                        {tech}
                                    </p>
                                </div>

                                {/* Security Card */}
                                <div className="bg-black/40 rounded-xl p-6 border border-white/5">
                                    <div className="flex items-center gap-2 mb-4 text-rose-400">
                                        <Shield size={18} />
                                        <span className="text-sm uppercase font-mono tracking-widest font-bold">Security Protocol</span>
                                    </div>
                                    <p className="text-gray-400 text-base leading-relaxed">
                                        {security}
                                    </p>
                                </div>
                            </div>

                            {/* War Story Card (Distinct Highlight) */}
                            {tip && (
                                <div className="bg-yellow-900/10 rounded-xl p-6 border border-yellow-500/10">
                                    <div className="flex items-start gap-4">
                                        <div className="mt-1 text-yellow-500/80 text-xl">💡</div>
                                        <div>
                                            <span className="text-yellow-500/50 text-xs uppercase font-mono tracking-widest block mb-2">
                                                War Story
                                            </span>
                                            <p className="text-yellow-100/90 text-base font-light italic leading-relaxed">
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
