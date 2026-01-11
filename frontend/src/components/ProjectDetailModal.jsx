import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Layers, Server, Database, Cloud, Cpu, ArrowRight } from 'lucide-react';

const ProjectDetailModal = ({ project, metadata, onClose }) => {
    if (!project) return null;

    // Fallback if no curated metadata exists
    const description = metadata?.description || project.description || "No detailed system analysis available for this module.";
    const hasStack = !!metadata?.tech;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
            {/* Backdrop */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />

            {/* Modal Content */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative w-full max-w-4xl bg-[#080808] border border-cyan-500/30 rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(6,182,212,0.15)] flex flex-col max-h-[90vh]"
            >

                {/* Header */}
                <div className="flex items-start justify-between p-6 md:p-8 border-b border-white/10 bg-white/[0.02]">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <h2 className="text-2xl md:text-3xl font-display font-bold text-white tracking-tight">
                                {project.name}
                            </h2>
                            {metadata && (
                                <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-400 text-[10px] font-mono uppercase tracking-widest border border-cyan-500/30">
                                    System Analysis
                                </span>
                            )}
                        </div>
                        <div className="flex items-center gap-4 text-xs font-mono text-gray-500">
                            <span className="flex items-center gap-1"><ExternalLink size={12} /> {project.html_url.replace('https://', '')}</span>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Body - Scrollable */}
                <div className="flex-1 overflow-y-auto p-6 md:p-8 scrollbar-thin scrollbar-thumb-cyan-900 scrollbar-track-transparent">

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">

                        {/* LEFT: Problem Statement */}
                        <div className="md:col-span-2 space-y-6">

                            {/* What the system does */}
                            <div className="space-y-3">
                                <h3 className="text-sm font-mono text-cyan-400 uppercase tracking-widest flex items-center gap-2">
                                    <Cpu size={16} /> Core System Function
                                </h3>
                                <div className="text-gray-300 leading-relaxed space-y-4 font-light text-lg">
                                    {description.split('\n').map((line, i) => (
                                        line.trim() && <p key={i}>{line}</p>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* RIGHT: Tech Matrix */}
                        <div className="space-y-6">
                            <h3 className="text-sm font-mono text-cyan-400 uppercase tracking-widest flex items-center gap-2">
                                <Layers size={16} /> Tech Matrix
                            </h3>

                            {hasStack ? (
                                <div className="space-y-4">
                                    <StackCategory icon={Layers} label="Frontend" items={metadata.tech.frontend} />
                                    <StackCategory icon={Server} label="Backend" items={metadata.tech.backend} />
                                    <StackCategory icon={Database} label="Database" items={metadata.tech.database} />
                                    <StackCategory icon={Cloud} label="Infrastructure" items={metadata.tech.infrastructure} />
                                </div>
                            ) : (
                                <div className="p-4 rounded border border-white/5 bg-white/[0.02] text-gray-500 text-sm italic">
                                    Detailed stack data not indexed for this module.
                                    <br />
                                    Primary Language: <span className="text-cyan-400">{project.language}</span>
                                </div>
                            )}

                        </div>
                    </div>
                </div>

                {/* Footer Action */}
                <div className="p-6 border-t border-white/10 bg-white/[0.02] flex justify-end">
                    <a
                        href={project.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-6 py-3 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg font-bold tracking-wide transition-all hover:scale-105 shadow-[0_0_20px_rgba(6,182,212,0.4)]"
                    >
                        Access Repository Source <ArrowRight size={18} />
                    </a>
                </div>

            </motion.div>
        </div>
    );
};

const StackCategory = ({ icon: Icon, label, items }) => {
    if (!items || items.length === 0) return null;
    return (
        <div className="p-4 rounded-xl bg-[#0F0F0F] border border-white/5 hover:border-cyan-500/20 transition-colors">
            <div className="flex items-center gap-2 text-gray-400 mb-3">
                <Icon size={14} />
                <span className="text-xs font-mono uppercase tracking-wider">{label}</span>
            </div>
            <div className="flex flex-wrap gap-2">
                {items.map((item, i) => (
                    <span key={i} className="text-sm text-gray-200 bg-white/5 px-2 py-1 rounded border border-white/5">
                        {item}
                    </span>
                ))}
            </div>
        </div>
    );
}

export default ProjectDetailModal;
