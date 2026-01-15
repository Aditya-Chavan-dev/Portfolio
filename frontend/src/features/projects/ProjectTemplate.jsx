import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ExternalLink, Activity, Layers, Flame, Component, CheckCircle, Github, Hexagon, Terminal, ChevronRight, ArrowUpLeft } from 'lucide-react';
import ExpandableFeature from './ExpandableFeature';

// --- Icon Helper ---
const getTechIcon = (language) => {
    if (!language) return null;
    if (language === 'TanStack Query') return 'https://raw.githubusercontent.com/TanStack/query/main/media/logo.svg';

    const map = {
        'JavaScript': 'javascript/javascript-original',
        'TypeScript': 'typescript/typescript-original',
        'Python': 'python/python-original',
        'Java': 'java/java-original',
        'C#': 'csharp/csharp-original',
        'C++': 'cplusplus/cplusplus-original',
        'HTML': 'html5/html5-original',
        'CSS': 'css3/css3-original',
        'Vue': 'vuejs/vuejs-original',
        'React': 'react/react-original',
        'Dart': 'dart/dart-original',
        'Go': 'go/go-original-wordmark',
        'Shell': 'bash/bash-original',
        'Files': 'file-icons/file-icons-original',
        'Node.js': 'nodejs/nodejs-original',
        'Express': 'express/express-original',
        'Redis': 'redis/redis-original',
        'Postgres': 'postgresql/postgresql-original',
        'Firebase': 'firebase/firebase-plain',
        'Google Cloud': 'googlecloud/googlecloud-original',
        'Vite': 'vitejs/vitejs-original',
        'Tailwind': 'tailwindcss/tailwindcss-original',
        'Sass': 'sass/sass-original',
        'Less': 'less/less-plain-wordmark',
        'Redux': 'redux/redux-original',
        'Git': 'git/git-original',
        'Docker': 'docker/docker-original',
        'Kubernetes': 'kubernetes/kubernetes-plain',
        'AWS': 'amazonwebservices/amazonwebservices-original-wordmark',
        'Azure': 'azure/azure-original',
        'Nginx': 'nginx/nginx-original',
        'Linux': 'linux/linux-original',
    };

    const key = Object.keys(map).find(k => language.includes(k));
    const slug = key ? map[key] : null;
    if (!slug) return null;
    return `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${slug}.svg`;
};

const ProjectTemplate = ({
    title,
    description,
    timeline,
    links = { demo: null, source: null },
    techStack = {},
    features = [],
    failures = [],
    onClose
}) => {
    // Local UI State for Navigation
    const [activeItem, setActiveItem] = useState({ type: 'feature', index: 0 });

    // Ensure scroll reset
    useEffect(() => {
        const detailContainer = document.getElementById('template-detail-content');
        if (detailContainer) detailContainer.scrollTop = 0;
    }, [activeItem]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-[#02040a] text-white font-sans selection:bg-cyan-500/30 flex flex-col overflow-hidden"
            style={{ height: '100dvh' }}
        >
            <style>{`
                .scrollbar-hide::-webkit-scrollbar { display: none; }
                .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
                .mask-fade-bottom { mask-image: linear-gradient(to bottom, black 90%, transparent 100%); -webkit-mask-image: linear-gradient(to bottom, black 90%, transparent 100%); }
            `}</style>

            <div className="flex-1 max-w-[1800px] w-full mx-auto p-4 md:p-6 lg:p-8 flex flex-col lg:grid lg:grid-cols-12 gap-6 lg:gap-8 overflow-hidden h-full">

                {/* === LEFT COLUMN: METADATA (Span 4) === */}
                <div className="lg:col-span-4 flex flex-col gap-6 lg:h-full lg:overflow-y-auto scrollbar-hide">

                    {/* 1. Project Name & Actions */}
                    <div className="space-y-4">
                        {/* Header Row */}
                        <div className="flex items-center justify-between">
                            <button
                                onClick={onClose}
                                className="group flex items-center gap-2 text-gray-500 hover:text-white transition-colors"
                            >
                                <div className="p-2 rounded-full border border-white/10 group-hover:bg-white/10 transition-colors">
                                    <ArrowLeft size={18} />
                                </div>
                                <span className="text-sm font-medium tracking-wide">BACK</span>
                            </button>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 md:w-12 md:h-12 bg-cyan-500/10 rounded-xl border border-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0">
                                <Hexagon size={24} strokeWidth={1.5} />
                            </div>
                            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white leading-none">
                                {title}
                            </h1>
                        </div>

                        {/* Actions Row: Demo | Source | Timeline */}
                        <div className="flex flex-wrap items-center gap-3">
                            {/* Demo */}
                            {links.demo && links.demo !== '#' && (
                                <a
                                    href={links.demo}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-4 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white rounded-lg text-sm font-medium shadow-[0_0_15px_rgba(6,182,212,0.3)] hover:shadow-[0_0_25px_rgba(6,182,212,0.5)] transition-all flex items-center gap-2 group border border-white/10"
                                >
                                    <span>Live Mission</span>
                                    <ExternalLink size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                </a>
                            )}

                            {/* Source */}
                            <a
                                href={links.source}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-4 py-2 bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white rounded-lg text-sm font-medium border border-white/10 transition-all flex items-center gap-2"
                            >
                                <Github size={16} />
                                <span>Source</span>
                            </a>

                            {/* Timeline Badge */}
                            {timeline && (
                                <div className="px-3 py-2 rounded-lg bg-[#0F1115] border border-white/10 text-xs font-mono text-emerald-500/80 flex items-center gap-2 shadow-inner">
                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                    {timeline}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* 2. Description - "A little less" font size */}
                    <div className="space-y-2 pt-2">
                        <h3 className="text-xs font-mono uppercase tracking-widest text-gray-500 flex items-center gap-2">
                            <Activity size={14} /> Mission Brief
                        </h3>
                        <p className="text-gray-400 font-light leading-relaxed text-[14.5px] md:text-[16px] selection:bg-cyan-500/20">
                            {description || "No description provided."}
                        </p>
                    </div>

                    {/* 3. Tech Stack - "A little bigger" font size */}
                    {Object.keys(techStack).length > 0 && (
                        <div className="space-y-3 pt-4 border-t border-white/5 hidden md:block">
                            <h3 className="text-xs font-mono uppercase tracking-widest text-gray-500 flex items-center gap-2">
                                <Layers size={14} /> System Specs
                            </h3>

                            <div className="space-y-4">
                                {/* Frontend */}
                                {techStack.frontend && (
                                    <div className="space-y-2">
                                        <span className="text-xs text-cyan-500/60 font-mono uppercase tracking-wider block">Frontend</span>
                                        <div className="flex flex-wrap gap-2">
                                            {techStack.frontend.map((t, i) => (
                                                <div key={i} className="flex items-center gap-1.5 px-3 py-1.5 bg-white/[0.03] rounded border border-white/5" title={t}>
                                                    <img src={getTechIcon(t)} alt={t} className="w-4 h-4" />
                                                    <span className="text-xs text-gray-400 font-mono">{t}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                                {/* Backend */}
                                {techStack.backend && (
                                    <div className="space-y-2">
                                        <span className="text-xs text-purple-500/60 font-mono uppercase tracking-wider block">Backend</span>
                                        <div className="flex flex-wrap gap-2">
                                            {techStack.backend.map((t, i) => (
                                                <div key={i} className="flex items-center gap-1.5 px-3 py-1.5 bg-white/[0.03] rounded border border-white/5" title={t}>
                                                    <img src={getTechIcon(t)} alt={t} className="w-4 h-4" />
                                                    <span className="text-xs text-gray-400 font-mono">{t}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                                {/* Database */}
                                {techStack.database && (
                                    <div className="space-y-2">
                                        <span className="text-xs text-emerald-500/60 font-mono uppercase tracking-wider block">Database</span>
                                        <div className="flex flex-wrap gap-2">
                                            {techStack.database.map((t, i) => (
                                                <div key={i} className="flex items-center gap-1.5 px-3 py-1.5 bg-white/[0.03] rounded border border-white/5" title={t}>
                                                    <img src={getTechIcon(t)} alt={t} className="w-4 h-4" />
                                                    <span className="text-xs text-gray-400 font-mono">{t}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                                {/* Version Control */}
                                {techStack.versionControl && (
                                    <div className="space-y-2">
                                        <span className="text-xs text-orange-500/60 font-mono uppercase tracking-wider block">Version Control</span>
                                        <div className="flex flex-wrap gap-2">
                                            {techStack.versionControl.map((t, i) => (
                                                <div key={i} className="flex items-center gap-1.5 px-3 py-1.5 bg-white/[0.03] rounded border border-white/5" title={t}>
                                                    <img src={getTechIcon(t)} alt={t} className="w-4 h-4" />
                                                    <span className="text-xs text-gray-400 font-mono">{t}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                {/* === RIGHT COLUMN: MASTER-DETAIL INTERFACE (Span 8) === */}
                <div className="lg:col-span-8 flex flex-col md:flex-row h-full overflow-hidden bg-white/[0.02] border border-white/5 rounded-2xl relative">

                    {/* --- NAVIGATION LIST (W-1/3) --- */}
                    <div className="w-full md:w-1/3 flex flex-col border-b md:border-b-0 md:border-r border-white/5 bg-white/[0.01]">
                        <div className="flex-1 overflow-y-auto p-2 md:p-3 space-y-6 scrollbar-hide">

                            {/* Features List */}
                            <div className="space-y-2">
                                <h3 className="text-xs font-mono uppercase tracking-widest text-emerald-500/60 px-3 py-2 flex items-center gap-2 sticky top-0 bg-[#02040a]/95 backdrop-blur z-10">
                                    <Component size={14} /> Features
                                </h3>
                                <div className="space-y-1 px-1">
                                    {features.map((f, i) => {
                                        const isActive = activeItem.type === 'feature' && activeItem.index === i;
                                        return (
                                            <button
                                                key={i}
                                                onClick={() => setActiveItem({ type: 'feature', index: i })}
                                                className={`w-full text-left p-3 rounded-lg text-sm transition-all duration-200 border ${isActive
                                                    ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20 shadow-[0_0_10px_rgba(6,182,212,0.1)]'
                                                    : 'text-gray-400 hover:bg-white/5 hover:text-gray-200 border-transparent'
                                                    }`}
                                            >
                                                <div className="font-medium truncate">{typeof f === 'string' ? f : f.title}</div>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Failures List */}
                            {failures.length > 0 && (
                                <div className="space-y-2">
                                    <h3 className="text-xs font-mono uppercase tracking-widest text-rose-500/60 px-3 py-2 flex items-center gap-2 sticky top-0 bg-[#02040a]/95 backdrop-blur z-10">
                                        <Flame size={14} /> Critical Failures
                                    </h3>
                                    <div className="space-y-1 px-1">
                                        {failures.map((f, i) => {
                                            const isActive = activeItem.type === 'failure' && activeItem.index === i;
                                            return (
                                                <button
                                                    key={i}
                                                    onClick={() => setActiveItem({ type: 'failure', index: i })}
                                                    className={`w-full text-left p-3 rounded-lg text-sm transition-all duration-200 border ${isActive
                                                        ? 'bg-rose-500/10 text-rose-400 border-rose-500/20 shadow-[0_0_10px_rgba(239,68,68,0.1)]'
                                                        : 'text-gray-400 hover:bg-white/5 hover:text-gray-200 border-transparent'
                                                        }`}
                                                >
                                                    <div className="font-medium truncate">{f.title.split('(')[0].trim()}</div>
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}

                        </div>
                    </div>

                    {/* --- DETAIL VIEW (Flex-1) --- */}
                    <div className="flex-1 relative overflow-hidden bg-white/[0.01]" id="template-detail-content">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={`${activeItem.type}-${activeItem.index}`}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                                className="absolute inset-0 overflow-y-auto scrollbar-hide flex flex-col"
                            >
                                {/* FEATURE RENDER */}
                                {activeItem.type === 'feature' && features[activeItem.index] && (
                                    typeof features[activeItem.index] === 'string' ? (
                                        <div className="text-gray-300 text-base leading-relaxed bg-white/5 p-6 rounded-xl border border-white/5 m-6">
                                            {features[activeItem.index]}
                                        </div>
                                    ) : (
                                        <ExpandableFeature
                                            {...features[activeItem.index]}
                                            isExpanded={true}
                                            onToggle={() => { }}
                                            className="flex-1 w-full border-none shadow-none rounded-none pb-10"
                                        />
                                    )
                                )}

                                {/* FAILURE RENDER */}
                                {activeItem.type === 'failure' && failures[activeItem.index] && (
                                    <div className="flex-1 w-full p-6 pb-10 flex flex-col gap-4">
                                        {['Box 1', 'Box 2', 'Box 3', 'Box 4'].map((box, i) => (
                                            <div key={i} className="flex-1 w-full border border-white/10 rounded-lg bg-white/5 flex items-center justify-center">
                                                <span className="text-white/20 font-mono text-sm">{box}</span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </motion.div>
                        </AnimatePresence>

                        {/* Scroll hint gradient */}
                        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#02040a] to-transparent pointer-events-none" />
                    </div>

                </div>
            </div>
        </motion.div>
    );
};

export default ProjectTemplate;
