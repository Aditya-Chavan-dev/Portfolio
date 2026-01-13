import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, Calendar, CheckCircle, Flame, Layers, X, Github, Hexagon, Component, Activity, Terminal } from 'lucide-react';
import config from '../portfolio.config';
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
    const metadata = config.projectDetails?.[project.name];
    const [expandedFeatureIndex, setExpandedFeatureIndex] = useState(null);
    const [expandedFailureIndex, setExpandedFailureIndex] = useState(null);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#02040a] text-white font-sans selection:bg-cyan-500/30 overflow-hidden flex flex-col"
        >
            <style>{`
                .scrollbar-hide::-webkit-scrollbar { display: none; }
                .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
                .mask-fade-bottom { mask-image: linear-gradient(to bottom, black 85%, transparent 100%); -webkit-mask-image: linear-gradient(to bottom, black 85%, transparent 100%); }
            `}</style>

            {/* Background Atmosphere */}
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-950/20 via-[#02040a] to-[#02040a]" />
            <div className="absolute inset-0 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.02]" />

            {/* Global Header (Minimal) */}
            <div className="absolute top-0 left-0 right-0 h-16 flex items-center justify-between px-8 z-50 pointer-events-none">
                <div className="pointer-events-auto cursor-default">
                    {/* Placeholder for left header content if needed */}
                </div>
                <button
                    onClick={onClose}
                    className="pointer-events-auto p-2 rounded-full hover:bg-white/5 text-gray-500 hover:text-white transition-colors"
                >
                    <X size={24} />
                </button>
            </div>

            {/* SEAMLESS 2x2 GRID */}
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 grid-rows-2 p-4 md:p-12 gap-8 md:gap-16 w-full max-w-[1920px] mx-auto">

                {/* === Q1: IDENTITY (Top Left) === */}
                <div className="flex flex-col justify-center space-y-8 relative group">
                    <div className="space-y-6">
                        <div className="flex items-center gap-3">
                            <div className="relative">
                                <div className="absolute inset-0 bg-cyan-500/30 blur-lg rounded-full animate-pulse" />
                                <Hexagon className="text-cyan-400 relative z-10" fill="currentColor" fillOpacity={0.1} size={32} />
                            </div>
                            <span className="text-xs font-mono uppercase tracking-[0.3em] text-cyan-500/80">Project Atlas // {metadata?.timeline?.[metadata.timeline.length - 1]?.year || '2025'}</span>
                        </div>

                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-gray-500">
                            {metadata?.title || project.title}
                        </h1>
                        <p className="text-lg md:text-xl text-gray-400 font-light max-w-lg leading-relaxed">
                            {metadata?.description || project.desc}
                        </p>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap gap-4">
                        {metadata?.demoUrl && (
                            <a href={metadata.demoUrl} target="_blank" rel="noopener noreferrer"
                                className="px-6 py-3 bg-white text-black font-semibold tracking-wide rounded hover:scale-105 transition-transform shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                                OPEN DEMO
                            </a>
                        )}
                        <a href={project.html_url} target="_blank" rel="noopener noreferrer"
                            className="px-6 py-3 bg-white/5 border border-white/10 text-white font-medium tracking-wide rounded hover:bg-white/10 transition-colors">
                            SOURCE CODE
                        </a>
                    </div>
                </div>


                {/* === Q2: TECH STACK (Top Right) === */}
                <div className="relative flex flex-col justify-center items-start md:items-end md:text-right space-y-6 min-h-0">
                    <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Terminal size={100} className="text-gray-800/20 rotate-12" />
                    </div>

                    <div className="space-y-4 z-10">
                        <h3 className="text-sm font-mono uppercase tracking-widest text-gray-500">Core Technologies</h3>
                        <div className="flex flex-wrap justify-start md:justify-end gap-3 max-w-md">
                            {config.projectDetails?.ATLAS?.stack?.map((tech, i) => (
                                <div key={i} className="flex items-center gap-2 px-4 py-2 bg-white/[0.03] backdrop-blur-md rounded-lg border border-white/5 hover:border-cyan-500/30 hover:bg-cyan-500/5 transition-all duration-300 group/icon cursor-default">
                                    <img
                                        src={getTechIcon(tech)}
                                        alt={tech}
                                        className="w-5 h-5 opacity-60 group-hover/icon:opacity-100 grayscale group-hover/icon:grayscale-0 transition-all"
                                    />
                                    <span className="text-sm text-gray-400 group-hover/icon:text-cyan-200 font-mono">{tech}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Timeline as minimal visuals */}
                    <div className="flex items-center justify-end gap-1 mt-8 opacity-50 hover:opacity-100 transition-opacity">
                        {metadata?.timeline?.map((item, i) => (
                            <div key={i} className="h-1 w-8 rounded-full bg-white/20 hover:bg-cyan-400 transition-colors" title={`${item.year}: ${item.event}`} />
                        ))}
                    </div>
                </div>


                {/* === Q3: FEATURES (Bottom Left) === */}
                <div className="relative flex flex-col overflow-hidden group min-h-0">
                    <div className="flex items-center gap-3 mb-6">
                        <Activity size={18} className="text-emerald-500" />
                        <h3 className="text-sm font-mono uppercase tracking-widest text-gray-400">Flagship Capabilities</h3>
                    </div>

                    <div className="flex-1 overflow-y-auto scrollbar-hide mask-fade-bottom pb-12 pr-4 -mr-4">
                        <div className="space-y-4">
                            {(metadata?.features || metadata?.flagshipFeatures) ? (
                                (metadata.features || metadata.flagshipFeatures).map((feature, index) => (
                                    // Handle both object (new) and string (legacy) formats
                                    typeof feature === 'string' ? (
                                        <div key={index} className="p-4 bg-white/[0.03] border border-white/5 rounded text-gray-300 text-sm">
                                            {feature}
                                        </div>
                                    ) : (
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
                                    )
                                ))
                            ) : (
                                <div className="p-4 border border-white/5 rounded text-gray-500">Loading Features...</div>
                            )}
                        </div>
                    </div>
                </div>


                {/* === Q4: FAILURES (Bottom Right) === */}
                <div className="relative flex flex-col overflow-hidden group min-h-0">
                    <div className="flex items-center gap-3 mb-6">
                        <Flame size={18} className="text-rose-500" />
                        <h3 className="text-sm font-mono uppercase tracking-widest text-gray-400">Critical Incidents</h3>
                    </div>

                    <div className="flex-1 overflow-y-auto scrollbar-hide mask-fade-bottom pb-12 pr-4 -mr-4">
                        <div className="space-y-4">
                            {metadata?.failures?.map((f, i) => (
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
                    </div>
                </div>

            </div>
        </motion.div>
    );
};

export default ProjectDetailsPage;
