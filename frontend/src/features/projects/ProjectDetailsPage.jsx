import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ExternalLink, Calendar, CheckCircle, Flame, Layers, X, Github, Hexagon, Component, Activity, Terminal, ChevronRight, ArrowUpLeft } from 'lucide-react';
import config from '../../portfolio.config';
import ExpandableFeature from './ExpandableFeature';
import ExpandableFailure from './ExpandableFailure';

const getTechIcon = (language) => {
    if (!language) return null;
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

const ProjectDetailsPage = ({ project, onClose }) => {
    // Normalize helper for robust matching
    const normalize = (str) => str ? str.toLowerCase().replace(/[^a-z0-9]/g, '') : '';

    // Case-insensitive + symbol-agnostic lookup for metadata
    const metadataKey = Object.keys(config.projectDetails || {}).find(
        key => normalize(key) === normalize(project.name) || normalize(project.name).includes(normalize(key))
    );
    const metadata = config.projectDetails?.[metadataKey];

    // Unified State for Master-Detail View
    // activeItem: { type: 'feature' | 'failure', index: number }
    // Initialize with the first feature selected by default
    const [activeItem, setActiveItem] = useState({ type: 'feature', index: 0 });

    const features = metadata?.features || metadata?.flagshipFeatures || [];
    const failures = metadata?.failures || [];

    // Reset scroll when switching items
    useEffect(() => {
        const detailContainer = document.getElementById('detail-content-container');
        if (detailContainer) detailContainer.scrollTop = 0;
    }, [activeItem]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-[#02040a] text-white font-sans selection:bg-cyan-500/30 flex flex-col overflow-hidden"
            style={{ height: '100dvh' }} // Use Dynamic Viewport Height for mobile browsers
        >
            <style>{`
                .scrollbar-hide::-webkit-scrollbar { display: none; }
                .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
                .mask-fade-bottom { mask-image: linear-gradient(to bottom, black 90%, transparent 100%); -webkit-mask-image: linear-gradient(to bottom, black 90%, transparent 100%); }
            `}</style>

            {/* Background Atmosphere */}
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-950/20 via-[#02040a] to-[#02040a]" />
            <div className="absolute inset-0 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.02]" />

            {/* Global Header (Minimal - Close Button Only) */}
            <div className="absolute top-0 right-0 p-4 md:p-6 z-50 pointer-events-none">
                <button
                    onClick={onClose}
                    className="pointer-events-auto p-3 md:p-2 rounded-full bg-black/20 md:bg-transparent backdrop-blur-md md:backdrop-blur-none hover:bg-white/10 text-gray-400 hover:text-white transition-all border border-white/5 md:border-transparent"
                >
                    <X size={24} />
                </button>
            </div>

            {/* MAIN GRID LAYOUT */}
            {/* Added proper padding-bottom for safe areas (pb-safe) via pb-20 on mobile */}
            <div className="flex-1 w-full h-full max-w-[1920px] mx-auto relative z-10 p-4 pt-16 md:p-6 md:pt-20 lg:p-10 lg:pt-24 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 overflow-hidden pb-safe">

                {/* === LEFT COLUMN: IDENTITY (Span 4) === */}
                <div className="lg:col-span-4 flex flex-col h-full overflow-y-auto scrollbar-hide pr-2">
                    <div className="flex flex-col gap-6 md:gap-8 pb-10">
                        {/* 1. Header & Title */}
                        <div className="space-y-3 md:space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="relative">
                                    <div className="absolute inset-0 bg-cyan-500/30 blur-lg rounded-full animate-pulse" />
                                    <Hexagon className="text-cyan-400 relative z-10" fill="currentColor" fillOpacity={0.1} size={32} />
                                </div>
                                <span className="text-xs font-mono uppercase tracking-[0.3em] text-cyan-500/80">Project Atlas // {metadata?.timeline?.[metadata.timeline.length - 1]?.year || '2025'}</span>
                            </div>

                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-gray-500 leading-none">
                                {metadata?.title || project.name}
                            </h1>
                        </div>

                        {/* 2. Action Buttons */}
                        <div className="flex items-center gap-3 flex-wrap">
                            {metadata?.demoUrl && (
                                <a href={metadata.demoUrl} target="_blank" rel="noopener noreferrer"
                                    className="flex-1 md:flex-none flex justify-center items-center gap-2 px-6 py-3 md:py-2 bg-white text-black font-bold tracking-wide rounded-full hover:scale-105 transition-transform shadow-[0_0_20px_rgba(255,255,255,0.1)] text-xs uppercase min-h-[44px]">
                                    <ExternalLink size={14} /> Live Demo
                                </a>
                            )}
                            <a href={project.html_url} target="_blank" rel="noopener noreferrer"
                                className="flex-1 md:flex-none flex justify-center items-center gap-2 px-6 py-3 md:py-2 bg-white/5 border border-white/10 text-white font-medium tracking-wide rounded-full hover:bg-white/10 transition-colors text-xs uppercase min-h-[44px]">
                                <Github size={14} /> Source
                            </a>
                        </div>

                        {/* 3. Description (Collapsible on Mobile?) - Kept visible but Font Bumped */}
                        <div className="space-y-2 pt-2">
                            <h3 className="text-xs font-mono uppercase tracking-widest text-gray-500 flex items-center gap-2">
                                <Activity size={14} /> Mission Brief
                            </h3>
                            <p className="text-gray-400 font-light leading-relaxed text-sm md:text-base selection:bg-cyan-500/20">
                                {metadata?.description || project.description || "No description provided."}
                            </p>
                        </div>

                        {/* 4. Timeline */}
                        {metadata?.timeline && (
                            <div className="space-y-3 pt-4 border-t border-white/5 hidden md:block">
                                <h3 className="text-xs font-mono uppercase tracking-widest text-gray-500 flex items-center gap-2">
                                    <Calendar size={14} /> Timeline
                                </h3>
                                <div className="space-y-4 pl-2 border-l border-white/10 ml-1">
                                    {metadata.timeline.map((item, i) => (
                                        <div key={i} className="relative pl-4 group">
                                            <div className="absolute left-[-5px] top-1.5 w-2 h-2 rounded-full bg-cyan-900 border border-cyan-500/50 group-hover:bg-cyan-400 transition-colors" />
                                            <span className="text-[10px] text-cyan-500/80 font-mono block mb-0.5">{item.year}</span>
                                            <span className="text-xs text-gray-400 group-hover:text-white transition-colors">{item.event}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* 5. System Specs (Tech Stack) - Moved from Right Column */}
                        {metadata?.tech && (
                            <div className="space-y-3 pt-4 border-t border-white/5 hidden md:block">
                                <h3 className="text-xs font-mono uppercase tracking-widest text-gray-500 flex items-center gap-2">
                                    <Layers size={14} /> System Specs
                                </h3>

                                <div className="space-y-4">
                                    {/* Frontend */}
                                    {metadata.tech.frontend && (
                                        <div className="space-y-2">
                                            <span className="text-[10px] text-cyan-500/60 font-mono uppercase tracking-wider block">Frontend</span>
                                            <div className="flex flex-wrap gap-2">
                                                {metadata.tech.frontend.map((t, i) => (
                                                    <div key={i} className="flex items-center gap-1.5 px-2 py-1 bg-white/[0.03] rounded border border-white/5" title={t}>
                                                        <img src={getTechIcon(t)} alt={t} className="w-3.5 h-3.5" />
                                                        <span className="text-[10px] text-gray-400 font-mono">{t}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Backend */}
                                    {metadata.tech.backend && (
                                        <div className="space-y-2">
                                            <span className="text-[10px] text-purple-500/60 font-mono uppercase tracking-wider block">Backend</span>
                                            <div className="flex flex-wrap gap-2">
                                                {metadata.tech.backend.map((t, i) => (
                                                    <div key={i} className="flex items-center gap-1.5 px-2 py-1 bg-white/[0.03] rounded border border-white/5" title={t}>
                                                        <img src={getTechIcon(t)} alt={t} className="w-3.5 h-3.5" />
                                                        <span className="text-[10px] text-gray-400 font-mono">{t}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Database */}
                                    {metadata.tech.database && (
                                        <div className="space-y-2">
                                            <span className="text-[10px] text-emerald-500/60 font-mono uppercase tracking-wider block">Database</span>
                                            <div className="flex flex-wrap gap-2">
                                                {metadata.tech.database.map((t, i) => (
                                                    <div key={i} className="flex items-center gap-1.5 px-2 py-1 bg-white/[0.03] rounded border border-white/5" title={t}>
                                                        <img src={getTechIcon(t)} alt={t} className="w-3.5 h-3.5" />
                                                        <span className="text-[10px] text-gray-400 font-mono">{t}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Version Control */}
                                    {(metadata.tech.versionControl || metadata.tech.infrastructure) && (
                                        <div className="space-y-2">
                                            <span className="text-[10px] text-orange-500/60 font-mono uppercase tracking-wider block">Version Control</span>
                                            <div className="flex flex-wrap gap-2">
                                                {(metadata.tech.versionControl || metadata.tech.infrastructure).map((t, i) => (
                                                    <div key={i} className="flex items-center gap-1.5 px-2 py-1 bg-white/[0.03] rounded border border-white/5" title={t}>
                                                        <img src={getTechIcon(t)} alt={t} className="w-3.5 h-3.5" />
                                                        <span className="text-[10px] text-gray-400 font-mono">{t}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>


                {/* === RIGHT COLUMN: MASTER-DETAIL INTERFACE (Span 8) === */}
                <div className="lg:col-span-8 flex flex-col md:flex-row h-full overflow-hidden bg-white/[0.02] border border-white/5 rounded-2xl relative">

                    {/* --- COLUMN 2: NAVIGATION LIST (W-1/3) --- */}
                    <div className="w-full md:w-1/3 flex flex-col border-b md:border-b-0 md:border-r border-white/5 bg-white/[0.01]">
                        <div className="flex-1 overflow-y-auto p-2 md:p-3 space-y-6 scrollbar-hide">

                            {/* List Features */}
                            <div className="space-y-2">
                                <h3 className="text-[10px] font-mono uppercase tracking-widest text-emerald-500/60 px-3 py-2 flex items-center gap-2 sticky top-0 bg-[#02040a]/95 backdrop-blur z-10">
                                    <Component size={12} /> Capabilities
                                </h3>
                                <div className="space-y-1 px-1">
                                    {features.map((f, i) => {
                                        const isActive = activeItem?.type === 'feature' && activeItem?.index === i;
                                        return (
                                            <button
                                                key={i}
                                                onClick={() => setActiveItem({ type: 'feature', index: i })}
                                                className={`w-full text-left p-3 rounded-lg text-xs transition-all duration-200 border ${isActive
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

                            {/* List Failures */}
                            {failures.length > 0 && (
                                <div className="space-y-2">
                                    <h3 className="text-[10px] font-mono uppercase tracking-widest text-rose-500/60 px-3 py-2 flex items-center gap-2 sticky top-0 bg-[#02040a]/95 backdrop-blur z-10">
                                        <Flame size={12} /> Critical Events
                                    </h3>
                                    <div className="space-y-1 px-1">
                                        {failures.map((f, i) => {
                                            const isActive = activeItem?.type === 'failure' && activeItem?.index === i;
                                            return (
                                                <button
                                                    key={i}
                                                    onClick={() => setActiveItem({ type: 'failure', index: i })}
                                                    className={`w-full text-left p-3 rounded-lg text-xs transition-all duration-200 border ${isActive
                                                        ? 'bg-rose-500/10 text-rose-400 border-rose-500/20 shadow-[0_0_10px_rgba(239,68,68,0.1)]'
                                                        : 'text-gray-400 hover:bg-white/5 hover:text-gray-200 border-transparent'
                                                        }`}
                                                >
                                                    <div className="font-medium truncate">{f.title}</div>
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* --- COLUMN 3: DETAIL VIEW (Flex-1) --- */}
                    <div className="flex-1 relative overflow-hidden bg-white/[0.01]">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={`${activeItem?.type}-${activeItem?.index}`}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                                className="absolute inset-0 overflow-y-auto scrollbar-hide p-4 md:p-6 lg:p-8"
                            >
                                {activeItem?.type === 'feature' && features[activeItem.index] && (
                                    typeof features[activeItem.index] === 'string' ? (
                                        <div className="text-gray-300 text-base leading-relaxed bg-white/5 p-6 rounded-xl border border-white/5">{features[activeItem.index]}</div>
                                    ) : (
                                        <ExpandableFeature
                                            {...features[activeItem.index]}
                                            isExpanded={true}
                                            onToggle={() => { }}
                                            className="h-full border-none bg-transparent !p-0 shadow-none"
                                        />
                                    )
                                )}

                                {activeItem?.type === 'failure' && failures[activeItem.index] && (
                                    <ExpandableFailure
                                        index={activeItem.index}
                                        {...failures[activeItem.index]}
                                        summary={failures[activeItem.index].summary || failures[activeItem.index].failure?.split('.')[0] + '.'}
                                        isExpanded={true}
                                        onToggle={() => { }}
                                        className="h-full border-none bg-transparent !p-0 shadow-none"
                                    />
                                )}
                            </motion.div>
                        </AnimatePresence>

                        {/* Bottom fade for scrolling indication */}
                        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#02040a] to-transparent pointer-events-none" />
                    </div>

                </div>

            </div>
        </motion.div>
    );
};

export default ProjectDetailsPage;
