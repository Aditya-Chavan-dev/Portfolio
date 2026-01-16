import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Shield, Code, Lightbulb } from 'lucide-react';

const ExpandableFeature = ({ title, overview, problem, solution, impact, className = '' }) => {
    return (
        <motion.div
            layout
            className={`relative p-5 bg-[#0A0A0A] border-b border-white/5 ${className}`}
        >
            <div className="flex flex-col gap-8">
                {/* 1. THE CHALLENGE (Before + Pain) */}
                <div className="relative pl-6 border-l-2 border-rose-500/30">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="p-1.5 rounded-md bg-rose-500/10 text-rose-400">
                            <Shield size={16} />
                        </div>
                        <h4 className="text-xs font-mono text-rose-400/80 uppercase tracking-widest font-semibold">The Protocol Violation</h4>
                    </div>

                    <div className="space-y-4">
                        {overview && (
                            <p className="text-gray-300 text-base leading-relaxed font-light">
                                <span className="text-gray-500 uppercase text-xs font-mono tracking-wider mr-2 block mb-1">Observation:</span>
                                {overview}
                            </p>
                        )}

                        {problem && (
                            <div className="mt-4">
                                <span className="text-rose-500/60 uppercase text-xs font-mono tracking-wider block mb-2">Capabilities Compromised:</span>
                                <ul className="space-y-2">
                                    {Array.isArray(problem) ? problem.map((item, i) => (
                                        <li key={i} className="text-sm text-gray-400 flex items-start gap-3">
                                            <span className="text-rose-500/40 text-xs mt-[3px]">✕</span>
                                            <span>{item}</span>
                                        </li>
                                    )) : <p className="text-base text-gray-400">{problem}</p>}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>

                {/* 2. THE SOLUTION (Fix + After) */}
                <div className="relative pl-6 border-l-2 border-emerald-500/30">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="p-1.5 rounded-md bg-emerald-500/10 text-emerald-400">
                            <Code size={16} />
                        </div>
                        <h4 className="text-xs font-mono text-emerald-400/80 uppercase tracking-widest font-semibold">System Restoration</h4>
                    </div>

                    <div className="space-y-4">
                        {solution && (
                            <div className="mb-4">
                                <span className="text-emerald-500/60 uppercase text-xs font-mono tracking-wider block mb-2">Patch Deployed:</span>
                                <ul className="space-y-2">
                                    {Array.isArray(solution) ? solution.map((item, i) => (
                                        <li key={i} className="text-sm text-gray-300 flex items-start gap-3">
                                            <span className="text-emerald-500/40 text-xs mt-[3px]">✓</span>
                                            <span>{item}</span>
                                        </li>
                                    )) : <p className="text-base text-gray-400">{solution}</p>}
                                </ul>
                            </div>
                        )}

                        {impact && (
                            <div>
                                <span className="text-cyan-500/60 uppercase text-xs font-mono tracking-wider block mb-2 text-glow-cyan">System Status:</span>
                                <p className="text-gray-200 text-base leading-relaxed font-light">
                                    {impact}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default ExpandableFeature;

