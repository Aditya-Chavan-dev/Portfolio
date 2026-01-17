import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, ArrowRight, Layers, Database, Globe, Cpu } from 'lucide-react';
import config from '../../portfolio.config';
import { getTechIcon } from '../../utils/techIcons';

const TechNexus = ({ isOpen, techName, allProjects, onClose, onHub }) => {

    // Auto-Filter Logic (Option A: "Automated")
    // Scans all projects and configuration to find usage of this tech
    const relatedProjects = useMemo(() => {
        if (!techName || !allProjects) return [];

        const normalizedTech = techName.toLowerCase();

        return allProjects.filter(project => {
            // 1. Check Primary Language (GitHub API)
            if (project.language && project.language.toLowerCase().includes(normalizedTech)) return true;

            // 2. Check Config Metadata (Tech Stack Arrays)
            // We need to find the config entry for this project
            const normalizedProjName = project.name.toLowerCase().replace(/[^a-z0-9]/g, '');
            const configKey = Object.keys(config.projectDetails || {}).find(
                key => {
                    const k = key.toLowerCase().replace(/[^a-z0-9]/g, '');
                    return k === normalizedProjName || normalizedProjName.includes(k);
                }
            );

            const metadata = config.projectDetails?.[configKey];
            if (!metadata || !metadata.tech) return false;

            // Flatten all tech arrays and search
            const fullStack = [
                ...(metadata.tech.frontend || []),
                ...(metadata.tech.backend || []),
                ...(metadata.tech.database || []),
                ...(metadata.tech.versionControl || [])
            ];

            return fullStack.some(t => t.toLowerCase().includes(normalizedTech));
        });
    }, [techName, allProjects]);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-[250] bg-black/60 backdrop-blur-sm"
                    />

                    {/* Slide-over Panel */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                        className="fixed inset-y-0 right-0 z-[260] w-full max-w-md bg-[#02040a] border-l border-white/10 shadow-2xl flex flex-col"
                    >
                        {/* Decorative Header */}
                        <div className="relative h-48 overflow-hidden bg-black">
                            <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/20 to-black" />
                            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTAwIDAgTDEwMCA1MCBMMTU1IDUwIE0xMDAgNTAgTDEwMCAxMDAgTDUwIDEwMCBNMTAwIDEwMCBMMTAwIDE1MCBMMTUyIDE1MCBNMTAwIDE1MCBMMTQ1IDIwMCIgc3Ryb2tlPSIjMjJkM2VlIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiLz48L3N2Zz4=')] opacity-20" />

                            <button
                                onClick={onClose}
                                className="absolute top-6 right-6 p-2 rounded-full bg-black/40 hover:bg-white/10 text-white/50 hover:text-white transition-colors border border-white/5 backdrop-blur-md z-10"
                            >
                                <X size={20} />
                            </button>

                            <div className="absolute bottom-8 left-8 flex items-center gap-4">
                                <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl flex items-center justify-center shadow-2xl shadow-cyan-900/20">
                                    <img src={getTechIcon(techName)} alt={techName} className="w-8 h-8 md:w-10 md:h-10" />
                                </div>
                                <div>
                                    <h2 className="text-3xl font-display font-bold text-white tracking-tight">{techName}</h2>
                                    <p className="text-sm text-cyan-400 font-mono uppercase tracking-widest mt-1">Usage Matrix</p>
                                </div>
                            </div>
                        </div>

                        {/* Content Scroll Area */}
                        <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8">

                            <div className="flex items-center justify-between text-xs font-mono uppercase tracking-widest text-gray-500 border-b border-white/5 pb-4">
                                <span>Deployed In</span>
                                <span className="text-cyan-400">{relatedProjects.length} Systems</span>
                            </div>

                            {relatedProjects.length > 0 ? (
                                <div className="space-y-4">
                                    {relatedProjects.map(project => (
                                        <div key={project.id} className="group relative p-5 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] hover:border-cyan-500/30 transition-all duration-300">
                                            <div className="flex items-start justify-between mb-3">
                                                <h3 className="text-lg font-bold text-gray-200 group-hover:text-cyan-400 transition-colors">
                                                    {project.name.replace(/-/g, ' ')}
                                                </h3>
                                                {project.homepage && (
                                                    <a href={project.homepage} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-white transition-colors">
                                                        <ExternalLink size={14} />
                                                    </a>
                                                )}
                                            </div>

                                            <p className="text-sm text-gray-400 font-light leading-relaxed mb-4">
                                                {project.description || "No description provided."}
                                            </p>

                                            <div className="flex items-center gap-2 mt-auto">
                                                <div className={`h-1.5 w-1.5 rounded-full ${project.homepage ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-amber-500'}`} />
                                                <span className="text-[10px] font-mono uppercase text-gray-500">
                                                    {project.homepage ? 'Live Deployment' : 'Source Available'}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="py-12 text-center border border-dashed border-white/10 rounded-xl">
                                    <p className="text-gray-500 font-mono text-sm">No specific projects indexed with this tag.</p>
                                </div>
                            )}

                        </div>

                        {/* Footer decorative */}
                        <div className="p-6 border-t border-white/5 bg-black/40 text-center">
                            <p className="text-[10px] text-gray-600 font-mono uppercase tracking-widest mb-4">
                                Engineering DNA // Verified
                            </p>
                            <button
                                onClick={onHub}
                                className="w-full py-3 bg-white/5 hover:bg-cyan-500/10 border border-white/10 hover:border-cyan-500/30 rounded-lg text-xs font-mono uppercase tracking-widest text-gray-400 hover:text-cyan-400 transition-all flex items-center justify-center gap-2"
                            >
                                <ArrowRight size={14} className="rotate-180" />
                                <span>Return to Command Hub</span>
                            </button>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default TechNexus;
