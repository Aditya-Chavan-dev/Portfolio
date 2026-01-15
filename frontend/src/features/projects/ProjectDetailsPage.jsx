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
    // activeItem: { type: 'feature' | 'failure', index: number } | null
    const [activeItem, setActiveItem] = useState(null);

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
                {/* Mobile: Hidden when item is active (Focus Mode) */}
                <div className={`lg:col-span-4 flex flex-col h-full overflow-y-auto scrollbar-hide pr-2 ${activeItem ? 'hidden lg:flex' : 'flex'}`}>
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


                {/* === RIGHT COLUMN: DYNAMIC MASTER-DETAIL (Span 8) === */}
                <div className={`lg:col-span-8 h-full relative overflow-hidden ${activeItem ? 'col-span-1' : ''}`}>
                    <AnimatePresence mode="wait">

                        {/* --- VIEW 1: OVERVIEW (Split Top/Bottom) --- */}
                        {/* Mobile: Hidden when item is active */}
                        {activeItem === null ? (
                            <motion.div
                                key="overview"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                                className="flex flex-col h-full gap-4 pb-20 md:pb-0" // Add padding bottom on mobile to avoid cut off
                            >
                                {/* TOP: FEATURES */}
                                <div className="flex-1 flex flex-col min-h-0 overflow-hidden bg-white/[0.02] border border-white/5 rounded-2xl p-4">

                                    {/* Features Grid */}
                                    <div className="flex-1 overflow-y-auto pr-2 scrollbar-hide mask-fade-bottom">
                                        <div className="space-y-3">
                                            <div className="flex items-center gap-2 mb-2 sticky top-0 bg-[#02040a]/0 backdrop-blur-sm z-10 py-1">
                                                <Component size={14} className="text-emerald-500" />
                                                <h3 className="text-xs font-mono uppercase tracking-widest text-emerald-500/80">Flagship Capabilities</h3>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                {features.length > 0 ? features.map((feature, index) => (
                                                    typeof feature === 'string' ? (
                                                        <div key={index} className="p-4 bg-white/[0.03] border border-white/5 rounded text-gray-300 text-sm break-words">{feature}</div>
                                                    ) : (
                                                        <div key={index} onClick={() => setActiveItem({ type: 'feature', index })} className="cursor-pointer active:scale-[0.98] transition-transform min-w-0">
                                                            <ExpandableFeature
                                                                title={feature.title}
                                                                what={feature.what}
                                                                tech={feature.tech}
                                                                security={feature.security}
                                                                tip={feature.tip}
                                                                isExpanded={false}
                                                                onToggle={() => { }}
                                                                className="hover:border-cyan-500/30 transition-colors h-full"
                                                            />
                                                        </div>
                                                    )
                                                )) : (
                                                    <div className="p-4 text-gray-500 text-xs text-center border border-white/5 border-dashed rounded">Loading Features...</div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* BOTTOM: FAILURES */}
                                <div className="flex-1 flex flex-col min-h-0 overflow-hidden bg-white/[0.02] border border-white/5 rounded-2xl p-4">
                                    <div className="flex items-center gap-2 mb-3 sticky top-0 z-10">
                                        <Flame size={14} className="text-rose-500" />
                                        <h3 className="text-xs font-mono uppercase tracking-widest text-rose-500/80">System Critical Events</h3>
                                    </div>

                                    <div className="flex-1 overflow-y-auto pr-2 scrollbar-hide mask-fade-bottom">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pb-2">
                                            {failures.length > 0 ? failures.map((f, i) => (
                                                <div key={i} onClick={() => setActiveItem({ type: 'failure', index: i })} className="cursor-pointer active:scale-[0.98] transition-transform min-w-0">
                                                    <ExpandableFailure
                                                        index={i}
                                                        title={f.title}
                                                        summary={f.summary || f.failure?.split('.')[0] + '.'}
                                                        failure={f.failure}
                                                        solution={f.solution}
                                                        outcome={f.outcome}
                                                        isExpanded={false}
                                                        onToggle={() => { }}
                                                        className="hover:border-red-500/30 transition-colors h-full"
                                                    />
                                                </div>
                                            )) : (
                                                <div className="col-span-full p-6 border border-white/5 border-dashed rounded text-gray-600 text-xs text-center italic">
                                                    No critical system failures recorded for this module.
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ) : (

                            /* --- VIEW 2: MASTER-DETAIL (Side List + Full View) --- */
                            <motion.div
                                key="detail"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                                className="grid grid-cols-1 md:grid-cols-12 h-full gap-4"
                            >
                                {/* MASTER: SIDEBAR LIST (Span 4) */}
                                {/* Mobile: Hidden, only visible on Desktop/Tablet */}
                                <div className="hidden md:flex md:col-span-4 flex-col h-full bg-white/[0.02] border border-white/5 rounded-2xl overflow-hidden">
                                    {/* Back Button */}
                                    <button
                                        onClick={() => setActiveItem(null)}
                                        className="flex items-center gap-2 p-4 text-xs font-mono uppercase tracking-widest text-gray-500 hover:text-white hover:bg-white/5 transition-colors border-b border-white/5"
                                    >
                                        <ArrowUpLeft size={14} /> Back to Overview
                                    </button>

                                    <div className="flex-1 overflow-y-auto p-3 space-y-6 scrollbar-hide">
                                        {/* List Features */}
                                        <div className="space-y-2">
                                            <h3 className="text-xs font-mono uppercase tracking-widest text-emerald-500/60 px-2 flex items-center gap-2">
                                                <Component size={12} /> Capabilities
                                            </h3>
                                            <div className="space-y-1">
                                                {features.map((f, i) => {
                                                    const isActive = activeItem.type === 'feature' && activeItem.index === i;
                                                    return (
                                                        <button
                                                            key={i}
                                                            onClick={() => setActiveItem({ type: 'feature', index: i })}
                                                            className={`w-full text-left p-3 rounded text-xs transition-all ${isActive
                                                                ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20'
                                                                : 'text-gray-400 hover:bg-white/5 hover:text-gray-200 border border-transparent'
                                                                }`}
                                                        >
                                                            {typeof f === 'string' ? f : f.title}
                                                        </button>
                                                    );
                                                })}
                                            </div>
                                        </div>

                                        {/* List Failures */}
                                        {failures.length > 0 && (
                                            <div className="space-y-2">
                                                <h3 className="text-xs font-mono uppercase tracking-widest text-rose-500/60 px-2 flex items-center gap-2">
                                                    <Flame size={12} /> Critical Events
                                                </h3>
                                                <div className="space-y-1">
                                                    {failures.map((f, i) => {
                                                        const isActive = activeItem.type === 'failure' && activeItem.index === i;
                                                        return (
                                                            <button
                                                                key={i}
                                                                onClick={() => setActiveItem({ type: 'failure', index: i })}
                                                                className={`w-full text-left p-3 rounded text-xs transition-all ${isActive
                                                                    ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                                                                    : 'text-gray-400 hover:bg-white/5 hover:text-gray-200 border border-transparent'
                                                                    }`}
                                                            >
                                                                {f.title}
                                                            </button>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* DETAIL: FULL CONTENT (Span 8) */}
                                {/* Mobile: Takes Full Width/Height */}
                                <div className="col-span-1 md:col-span-8 h-full bg-white/[0.02] border border-white/5 rounded-2xl overflow-hidden flex flex-col relative pb-safe">
                                    <div id="detail-content-container" className="flex-1 overflow-y-auto p-1 scrollbar-hide pb-24 md:pb-1">
                                        {activeItem.type === 'feature' && features[activeItem.index] && (
                                            typeof features[activeItem.index] === 'string' ? (
                                                <div className="p-6 text-gray-300 text-base leading-relaxed">{features[activeItem.index]}</div>
                                            ) : (
                                                <ExpandableFeature
                                                    {...features[activeItem.index]}
                                                    isExpanded={true}
                                                    onToggle={() => { }}
                                                    className="h-full border-none bg-transparent !p-5 md:!p-8"
                                                />
                                            )
                                        )}

                                        {activeItem.type === 'failure' && failures[activeItem.index] && (
                                            <ExpandableFailure
                                                index={activeItem.index}
                                                {...failures[activeItem.index]}
                                                summary={failures[activeItem.index].summary || failures[activeItem.index].failure?.split('.')[0] + '.'}
                                                isExpanded={true}
                                                onToggle={() => { }}
                                                className="h-full border-none bg-transparent !p-5 md:!p-8"
                                            />
                                        )}
                                    </div>

                                    {/* Bottom Fade Mask */}
                                    <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#02040a] via-[#02040a]/80 to-transparent pointer-events-none md:hidden" />

                                    {/* MOBILE STICKY BOTTOM BAR */}
                                    {/* Only visible on mobile in detail view */}
                                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-50 md:hidden w-full px-6 pb-safe">
                                        <button
                                            onClick={() => setActiveItem(null)}
                                            className="w-full flex items-center justify-center gap-2 py-4 bg-white text-black font-bold uppercase tracking-widest text-sm rounded-full shadow-[0_0_30px_rgba(255,255,255,0.15)] active:scale-95 transition-transform"
                                        >
                                            <ArrowUpLeft size={16} /> Back to Overview
                                        </button>
                                    </div>
                                </div>

                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

            </div>
        </motion.div>
    );
};

export default ProjectDetailsPage;
