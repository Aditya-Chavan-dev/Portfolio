import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, Calendar, CheckCircle, Flame, Layers, X, Github, Hexagon, Activity, Cpu } from 'lucide-react';
import config from '../portfolio.config';
import ExpandableFeature from './ExpandableFeature';
import ExpandableFailure from './ExpandableFailure';

// Reusing the icon helper
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
        'Files': 'file-icons/file-icons-original', // Fallback
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

    // Fuzzy matching for arrays of strings
    const key = Object.keys(map).find(k => language.includes(k));
    const slug = key ? map[key] : null;

    if (!slug) return null;
    return `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${slug}.svg`;
};

const ProjectDetailsPage = ({ project, onClose }) => {
    const metadata = config.projectDetails?.[project.name];
    const [expandedFeatureIndex, setExpandedFeatureIndex] = useState(null);
    const [expandedFailureIndex, setExpandedFailureIndex] = useState(null);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#000508] text-white font-sans selection:bg-cyan-500/30 flex flex-col overflow-hidden"
        >
            {/* Inline Styles for hiding scrollbars */}
            <style>{`
                .scrollbar-hide::-webkit-scrollbar { display: none; }
                .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
            `}</style>

            {/* Background Texture */}
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-900/10 via-[#000508] to-[#000508]" />
            <div className="absolute inset-0 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03]" />

            {/* === GLOBAL HEADER === */}
            <header className="h-16 flex-shrink-0 flex items-center justify-between px-6 bg-white/[0.02] border-b border-white/[0.05] z-50 backdrop-blur-md">
                <div className="flex items-center gap-4">
                    <Hexagon size={20} className="text-cyan-400" strokeWidth={2} />
                    <span className="text-sm font-mono uppercase tracking-widest text-gray-400">Panoramic View // {project.name}</span>
                </div>
                <button onClick={onClose} className="p-2 text-gray-500 hover:text-white transition-colors">
                    <X size={20} />
                </button>
            </header>


            {/* === 3-COLUMN PANORAMIC GRID === */}
            <div className="flex-1 overflow-hidden grid grid-cols-1 lg:grid-cols-[30%_30%_40%] lg:divide-x divide-white/[0.05]">

                {/* === COL 1: IDENTITY (30%) === */}
                <div className="relative h-full flex flex-col bg-[#000508]/50 overflow-y-auto scrollbar-hide p-8 md:p-12 space-y-10">
                    <div className="space-y-6">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-900/20 border border-cyan-500/20 rounded-full w-fit">
                            <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                            <span className="text-[10px] uppercase tracking-widest text-cyan-400 font-mono">System Deployed</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter leading-none">
                            {metadata?.title || project.title}
                        </h1>
                        <p className="text-gray-400 leading-relaxed font-light text-lg">
                            {metadata?.description || project.desc}
                        </p>
                    </div>

                    {/* Buttons */}
                    <div className="flex flex-col gap-3">
                        {metadata?.demoUrl && (
                            <a href={metadata.demoUrl} target="_blank" rel="noopener noreferrer"
                                className="flex items-center justify-center gap-3 px-6 py-4 bg-cyan-500 hover:bg-cyan-400 text-black font-bold tracking-wide rounded-lg transition-all shadow-[0_0_20px_rgba(6,182,212,0.2)] hover:shadow-[0_0_30px_rgba(6,182,212,0.4)]">
                                <ExternalLink size={18} /> INITIALIZE DEMO
                            </a>
                        )}
                        <a href={project.html_url} target="_blank" rel="noopener noreferrer"
                            className="flex items-center justify-center gap-3 px-6 py-4 bg-white/5 hover:bg-white/10 text-gray-300 font-medium tracking-wide rounded-lg border border-white/10 transition-colors">
                            <Github size={18} /> SOURCE CODE
                        </a>
                    </div>

                    {/* Compact Timeline */}
                    <div className="pt-8 mt-auto border-t border-white/5">
                        <div className="flex items-center gap-2 mb-4">
                            <Calendar size={14} className="text-gray-500" />
                            <span className="text-xs font-mono uppercase tracking-widest text-gray-500">Timeline</span>
                        </div>
                        <div className="space-y-4 pl-2 relative border-l border-white/5">
                            {metadata?.timeline?.map((item, index) => (
                                <div key={index} className="pl-4 relative group">
                                    <div className="absolute -left-[4.5px] top-1.5 w-[9px] h-[9px] rounded-full bg-[#000508] border border-white/20 group-hover:border-cyan-500 transition-colors" />
                                    <div className="text-xs text-gray-500 font-mono mb-0.5 group-hover:text-cyan-400">{item.year}</div>
                                    <div className="text-sm text-gray-400">{item.event}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>


                {/* === COL 2: SYSTEMS & TECH (30%) === */}
                <div className="relative h-full flex flex-col bg-[#000508]/30 overflow-y-auto scrollbar-hide">
                    {/* Header */}
                    <div className="sticky top-0 z-10 px-8 py-6 bg-[#000508]/90 backdrop-blur-md border-b border-white/[0.05] flex items-center justify-between">
                        <h2 className="text-xs font-mono uppercase tracking-widest text-gray-500 flex items-center gap-2">
                            <Cpu size={16} /> Systems Architecture
                        </h2>
                    </div>

                    <div className="p-8 space-y-12">
                        {/* Tech Cloud */}
                        <div className="space-y-6">
                            <div className="flex flex-wrap gap-2">
                                {config.projectDetails?.ATLAS?.stack?.map((tech, i) => (
                                    <div key={i} className="flex items-center gap-2 px-3 py-2 bg-white/[0.03] hover:bg-white/[0.08] rounded border border-white/[0.05] transition-all cursor-default group">
                                        <img
                                            src={getTechIcon(tech)}
                                            alt={tech}
                                            className="w-5 h-5 opacity-60 group-hover:opacity-100 grayscale group-hover:grayscale-0 transition-all"
                                        />
                                        <span className="text-xs text-gray-400 group-hover:text-gray-200 font-mono">{tech}</span>
                                    </div>
                                )) || (
                                        project.tags?.map((tag, i) => (
                                            <div key={i} className="px-3 py-1 bg-white/5 rounded text-xs text-gray-400 border border-white/5">{tag}</div>
                                        ))
                                    )}
                            </div>
                        </div>

                        {/* Extra Metrics/Stats (Mocked for visual balance if not in metadata) */}
                        <div className="space-y-6">
                            <h3 className="text-xs font-mono uppercase tracking-widest text-gray-600 flex items-center gap-2">
                                <Activity size={14} /> Performance Metrics
                            </h3>
                            <div className="grid grid-cols-1 gap-4">
                                <div className="p-4 bg-green-500/5 border border-green-500/10 rounded-lg">
                                    <div className="text-2xl font-mono text-green-400">99.9%</div>
                                    <div className="text-[10px] text-green-500/60 uppercase tracking-widest">Uptime Guarantee</div>
                                </div>
                                <div className="p-4 bg-purple-500/5 border border-purple-500/10 rounded-lg">
                                    <div className="text-2xl font-mono text-purple-400">&lt;100ms</div>
                                    <div className="text-[10px] text-purple-500/60 uppercase tracking-widest">Latency (Global)</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                {/* === COL 3: DIAGNOSTICS (40%) === */}
                <div className="relative h-full flex flex-col bg-[#000508]/10 overflow-y-auto scrollbar-hide">
                    {/* Header */}
                    <div className="sticky top-0 z-10 px-8 py-6 bg-[#000508]/90 backdrop-blur-md border-b border-white/[0.05] flex items-center justify-between">
                        <h2 className="text-xs font-mono uppercase tracking-widest text-gray-500 flex items-center gap-2">
                            <Layers size={16} /> Diagnostics & Features
                        </h2>
                    </div>

                    <div className="p-8 space-y-16">
                        {/* Features List */}
                        <section className="space-y-6">
                            <div className="flex items-center gap-3 text-cyan-500/60 pb-2 border-b border-white/5">
                                <CheckCircle size={16} />
                                <span className="text-xs font-mono uppercase tracking-widest">Active Modules</span>
                            </div>
                            <div className="grid grid-cols-1 gap-4">
                                {(metadata?.features || metadata?.flagshipFeatures) && (
                                    metadata?.features ? (
                                        metadata.features.map((feature, index) => (
                                            <ExpandableFeature
                                                key={index}
                                                title={feature.title}
                                                what={feature.what}
                                                tech={feature.tech}
                                                security={feature.security}
                                                tip={feature.tip}
                                                isExpanded={expandedFeatureIndex === index}
                                                onToggle={() => {
                                                    setExpandedFeatureIndex(
                                                        expandedFeatureIndex === index ? null : index
                                                    );
                                                }}
                                            />
                                        ))
                                    ) : (
                                        <div className="text-gray-500 text-sm">Modules Loading...</div>
                                    )
                                )}
                            </div>
                        </section>

                        {/* Failures List */}
                        <section className="space-y-6">
                            <div className="flex items-center gap-3 text-red-500/60 pb-2 border-b border-white/5">
                                <Flame size={16} />
                                <span className="text-xs font-mono uppercase tracking-widest">Resolved Incidents</span>
                            </div>
                            <div className="grid grid-cols-1 gap-4">
                                {metadata?.failures && metadata.failures.map((f, i) => (
                                    <ExpandableFailure
                                        key={i}
                                        index={i}
                                        title={f.title}
                                        summary={f.summary || f.failure?.split('.')[0] + '.'}
                                        failure={f.failure}
                                        solution={f.solution}
                                        outcome={f.outcome}
                                        isExpanded={expandedFailureIndex === i}
                                        onToggle={() => {
                                            setExpandedFailureIndex(
                                                expandedFailureIndex === i ? null : i
                                            );
                                        }}
                                    />
                                ))}
                            </div>
                        </section>
                    </div>
                </div>

            </div>
        </motion.div>
    );
};

export default ProjectDetailsPage;
