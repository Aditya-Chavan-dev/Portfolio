import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, AlertTriangle, Flame } from 'lucide-react';

const ExpandableFailure = ({ index, title, summary, failure, solution, outcome, isExpanded, onToggle }) => {
    return (
        <motion.div
            layout
            className={`relative bg-[#0A0A0A] border rounded-xl overflow-hidden transition-all duration-300 group ${isExpanded
                    ? 'border-red-500/50 shadow-[0_0_30px_rgba(239,68,68,0.15)]'
                    : 'border-white/5 hover:border-red-500/30'
                }`}
        >
            {/* Glow effect when expanded */}
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
            <div className={`p-6 md:p-8 ${isExpanded ? 'pb-8' : 'pb-6 md:pb-8'}`}>

                {/* Header Row */}
                <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 space-y-2">
                        {/* Meta Label */}
                        <div className="flex items-center gap-2 text-red-500/70 font-mono text-xs uppercase tracking-widest">
                            <AlertTriangle size={12} />
                            <span>Critical Failure #{index + 1}</span>
                        </div>

                        {/* Title */}
                        <h3 className="text-xl md:text-2xl font-bold text-white leading-tight group-hover:text-red-400 transition-colors">
                            {title}
                        </h3>

                        {/* 1-Line Summary (Visible primarily when collapsed, or always? User said "Below ... write in 1 line ... when expanded show all". 
                           Let's keep summary visible always for context, or hide it when expanded? 
                           "When expanded we show all the description". 
                           I'll keep the summary as the "intro" always visible, simpler for mental model.) 
                        */}
                        <p className="text-gray-400/80 text-sm font-light border-l-2 border-red-500/30 pl-3 line-clamp-2 md:line-clamp-1">
                            {summary}
                        </p>
                    </div>

                    {/* Arrow Button */}
                    <button
                        onClick={onToggle}
                        className="flex-shrink-0 mt-1 p-2 rounded-lg bg-white/5 hover:bg-red-500/10 border border-white/5 hover:border-red-500/30 transition-all"
                        aria-label={isExpanded ? 'Collapse' : 'Expand'}
                    >
                        <motion.div
                            animate={{ rotate: isExpanded ? 180 : 0 }}
                            transition={{ duration: 0.25, ease: 'easeOut' }}
                        >
                            <ChevronDown size={20} className="text-gray-400 group-hover:text-red-400 transition-colors" />
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
                            <div className="pt-8 grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-white/5 mt-6">
                                {/* Problem Details */}
                                <div className="space-y-3">
                                    <div className="flex items-center gap-2 text-red-400/80">
                                        <Flame size={14} />
                                        <span className="text-[10px] uppercase font-mono tracking-widest">Incident Report</span>
                                    </div>
                                    <p className="text-gray-300 leading-relaxed font-light text-sm">
                                        "{failure}"
                                    </p>
                                </div>

                                {/* Solution & Outcome */}
                                <div className="space-y-4">
                                    <div className="space-y-3">
                                        <span className="text-green-500/70 text-[10px] uppercase font-mono tracking-widest block">Patch Applied</span>
                                        <p className="text-gray-300 leading-relaxed text-sm">
                                            {solution}
                                        </p>
                                    </div>

                                    <div className="p-3 rounded bg-green-500/5 border border-green-500/10">
                                        <span className="text-green-400 text-xs font-medium block">
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
