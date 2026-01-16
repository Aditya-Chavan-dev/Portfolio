import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, AlertTriangle, Flame } from 'lucide-react';

const ExpandableFailure = ({ index, title, summary, failure, solution, outcome, isExpanded, onToggle, className = '' }) => {
    return (
        <motion.div
            layout
            className={`relative bg-[#0A0A0A] border-b border-white/5 overflow-hidden group ${className}`}
        >
            {/* Glow effect only via Framer if needed, removed CSS hover transitions on layout elements */}
            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute -inset-[1px] bg-gradient-to-r from-red-900/40 via-orange-900/30 to-red-900/40 rounded-xl blur-sm -z-10"
                    />
                )}
            </AnimatePresence>

            {/* Main Content Container (Title + Summary always visible-ish, details hidden) */}
            <div className={`p-3.5 ${isExpanded ? 'pb-4' : 'pb-3.5'}`}>

                {/* Header Row */}
                <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 space-y-1 min-w-0">
                        {/* Meta Label */}
                        <div className="flex items-center gap-2 text-red-500/70 font-mono text-[10px] uppercase tracking-widest shrink-0">
                            <AlertTriangle size={10} />
                            <span>Critical Failure #{index + 1}</span>
                        </div>

                        {/* Title */}
                        <h3 className="text-sm md:text-base font-bold text-white leading-tight group-hover:text-red-400 transition-colors break-words">
                            {title}
                        </h3>

                        {/* 1-Line Summary */}
                        <p className="text-gray-400/80 text-xs font-light border-l-2 border-red-500/30 pl-2 line-clamp-1 break-all">
                            {summary}
                        </p>
                    </div>

                    {/* Arrow Button */}
                    <button
                        onClick={onToggle}
                        className="flex-shrink-0 mt-0.5 p-1 rounded-md bg-white/5 hover:bg-red-500/10 border border-white/5 hover:border-red-500/30 transition-all"
                        aria-label={isExpanded ? 'Collapse' : 'Expand'}
                    >
                        <motion.div
                            animate={{ rotate: isExpanded ? 180 : 0 }}
                            transition={{ duration: 0.25, ease: 'easeOut' }}
                        >
                            <ChevronDown size={14} className="text-gray-400 group-hover:text-red-400 transition-colors" />
                        </motion.div>
                    </button>
                </div>

                {/* Expanded Details */}
                <AnimatePresence>
                    {isExpanded && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: 'easeOut' }}
                            className="overflow-hidden"
                        >
                            <div className="mt-4 pt-4 border-t border-white/5 flex flex-col gap-6 pl-10">
                                {/* Problem Details */}
                                <div className="space-y-2 relative">
                                    <div className="absolute -left-4 top-1 w-1 h-full bg-red-500/20" />
                                    <div className="flex items-center gap-2 text-red-400/80">
                                        <Flame size={12} />
                                        <span className="text-[10px] uppercase font-mono tracking-widest font-semibold">Incident Report</span>
                                    </div>
                                    <p className="text-gray-300 leading-relaxed font-light text-sm">
                                        "{failure}"
                                    </p>
                                </div>

                                {/* Solution & Outcome */}
                                <div className="space-y-2 relative">
                                    <div className="absolute -left-4 top-1 w-1 h-full bg-green-500/20" />
                                    <div className="space-y-1.5">
                                        <span className="text-green-500/70 text-[10px] uppercase font-mono tracking-widest block font-semibold">Patch Applied</span>
                                        <p className="text-gray-400 leading-relaxed text-sm">
                                            {solution}
                                        </p>
                                    </div>

                                    <div className="mt-3">
                                        <span className="text-green-400 text-[10px] font-medium block uppercase tracking-wide">
                                            Outcome: {outcome}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
};

export default ExpandableFailure;
