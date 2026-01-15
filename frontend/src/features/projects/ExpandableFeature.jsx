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
                            {/* Box 1: Full Width */}
                            <div className="w-full h-40 border border-white/10 rounded-lg bg-white/5 flex items-center justify-center">
                                <span className="text-white/20 font-mono text-sm">Box 1</span>
                            </div>

                            {/* Middle Row: Box 2 & Box 3 */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="h-40 border border-white/10 rounded-lg bg-white/5 flex items-center justify-center">
                                    <span className="text-white/20 font-mono text-sm">Box 2</span>
                                </div>
                                <div className="h-40 border border-white/10 rounded-lg bg-white/5 flex items-center justify-center">
                                    <span className="text-white/20 font-mono text-sm">Box 3</span>
                                </div>
                            </div>

                            {/* Box 4: Full Width */}
                            <div className="w-full h-40 border border-white/10 rounded-lg bg-white/5 flex items-center justify-center">
                                <span className="text-white/20 font-mono text-sm">Box 4</span>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default ExpandableFeature;

