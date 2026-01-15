import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Shield, Code, Lightbulb } from 'lucide-react';

const ExpandableFeature = ({ title, overview, problem, solution, impact, className = '' }) => {
    return (
        <motion.div
            layout
            className={`relative p-6 transition-all duration-500 bg-[#0A0A0A] hover:bg-white/[0.02] ${className}`}
        >
            <div className="flex flex-col gap-4 h-full">
                {/* Box 1: Overview / The Before */}
                <div className="flex-1 w-full border border-white/10 rounded-lg bg-white/5 flex flex-col justify-center p-6 min-h-[100px]">
                    {overview ? (
                        <>
                            <h4 className="text-xs font-mono text-cyan-500/70 mb-2 uppercase tracking-widest">The Before</h4>
                            <p className="text-gray-300 text-sm md:text-base leading-relaxed">{overview}</p>
                        </>
                    ) : <span className="text-white/20 font-mono text-sm m-auto">Box 1 (Overview)</span>}
                </div>

                {/* Middle Row */}
                <div className="flex-1 grid grid-cols-2 gap-4 min-h-[100px]">
                    {/* Box 2: The Pain */}
                    <div className="h-full border border-white/10 rounded-lg bg-white/5 flex flex-col justify-center p-4 md:p-6">
                        {problem ? (
                            <>
                                <h4 className="text-xs font-mono text-rose-500/70 mb-3 uppercase tracking-widest">The Pain</h4>
                                <ul className="space-y-2">
                                    {Array.isArray(problem) ? problem.map((item, i) => (
                                        <li key={i} className="text-xs md:text-sm text-gray-400 flex items-start gap-2">
                                            <span className="text-rose-500/50 mt-1">×</span>
                                            <span>{item}</span>
                                        </li>
                                    )) : <p className="text-sm text-gray-400">{problem}</p>}
                                </ul>
                            </>
                        ) : <span className="text-white/20 font-mono text-sm m-auto">Box 2 (Pain)</span>}
                    </div>

                    {/* Box 3: The Fix */}
                    <div className="h-full border border-white/10 rounded-lg bg-white/5 flex flex-col justify-center p-4 md:p-6">
                        {solution ? (
                            <>
                                <h4 className="text-xs font-mono text-emerald-500/70 mb-3 uppercase tracking-widest">The Fix</h4>
                                <ul className="space-y-2">
                                    {Array.isArray(solution) ? solution.map((item, i) => (
                                        <li key={i} className="text-xs md:text-sm text-gray-400 flex items-start gap-2">
                                            <span className="text-emerald-500/50 mt-1">✓</span>
                                            <span>{item}</span>
                                        </li>
                                    )) : <p className="text-sm text-gray-400">{solution}</p>}
                                </ul>
                            </>
                        ) : <span className="text-white/20 font-mono text-sm m-auto">Box 3 (Fix)</span>}
                    </div>
                </div>

                {/* Box 4: Impact / The After */}
                <div className="flex-1 w-full border border-white/10 rounded-lg bg-white/5 flex flex-col justify-center p-6 min-h-[100px]">
                    {impact ? (
                        <>
                            <h4 className="text-xs font-mono text-blue-500/70 mb-2 uppercase tracking-widest">The After</h4>
                            <p className="text-gray-300 text-sm md:text-base leading-relaxed">{impact}</p>
                        </>
                    ) : <span className="text-white/20 font-mono text-sm m-auto">Box 4 (Impact)</span>}
                </div>
            </div>
        </motion.div>
    );
};

export default ExpandableFeature;

