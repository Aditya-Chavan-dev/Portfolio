import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, Calendar, CheckCircle, Flame, Layers, X, Github, Hexagon } from 'lucide-react';
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
            className="fixed inset-0 z-50 bg-[#000508] text-white flex flex-col font-sans selection:bg-cyan-500/30 overflow-hidden"
        >
            {/* Inline Styles for hiding scrollbars */}
            <style>{`
                .scrollbar-hide::-webkit-scrollbar { display: none; }
                .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
            `}</style>

            {/* Background: Complex Holographic Gradient */}
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-cyan-900/10 via-[#000508] to-[#000508]" />
            <div className="absolute inset-0 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5" />

            {/* === GLOBAL HEADER (Borderless Glass) === */}
            <header className="h-20 flex-shrink-0 flex items-center justify-between px-8 bg-transparent z-50">
                <div className="flex items-center gap-6">
                    <div className="relative group">
                        <div className="absolute -inset-2 bg-cyan-500/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
                        <Hexagon size={28} className="text-cyan-400 relative z-10" strokeWidth={1.5} />
                    </div>

                    <div className="flex flex-col">
                        <h1 className="text-2xl font-bold font-display tracking-tight text-white uppercase leading-none mb-1">
                            {metadata?.title || project.title}
                        </h1>
                        <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                            <span className="text-[10px] text-green-500/80 font-mono tracking-[0.2em] uppercase">
                                System Active
                            </span>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <a
                        href={project.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hidden md:flex items-center gap-2 px-5 py-2 hover:bg-white/5 rounded-full text-xs font-mono text-cyan-400/60 hover:text-cyan-400 transition-all group"
                    >
                        <span>SOURCE_CODE</span>
                        <Github size={14} className="group-hover:rotate-12 transition-transform" />
                    </a>

                    <button
                        onClick={onClose}
                        className="group relative p-3 rounded-full hover:bg-white/5 transition-colors"
                    >
                        <X size={24} className="text-gray-500 group-hover:text-white transition-colors" />
                    </button>
                </div>
            </header>


            {/* === 2x2 GRID (Soft Dividers) === */}
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 lg:grid-rows-2 w-full h-[calc(100vh-80px)] lg:gap-px bg-white/[0.02]">

                {/* === Q1: HERO (Top-Left) === */}
                <div className="relative p-8 md:p-16 bg-[#000508]/80 backdrop-blur-sm scrollbar-hide overflow-y-auto">
                    <div className="max-w-xl mx-auto lg:mx-0 space-y-12">
                        {/* Hero Text */}
                        <div className="space-y-6">
                            <span className="inline-block px-3 py-1 rounded bg-cyan-500/10 text-cyan-400 text-[10px] font-mono tracking-widest uppercase mb-2">
                                Briefing
                            </span>
                            <p className="text-2xl md:text-3xl lg:text-4xl font-light text-gray-200 leading-snug">
                                {metadata?.description || project.desc}
                            </p>

                            {metadata?.demoUrl && (
                                <a
                                    href={metadata.demoUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group inline-flex items-center gap-4 text-cyan-400 hover:text-cyan-300 transition-colors pt-4"
                                >
                                    <span className="text-lg font-bold tracking-wide border-b-2 border-cyan-500/30 group-hover:border-cyan-400 transition-colors pb-1">
                                        INITIALIZE SEQUENCE
                                    </span>
                                    <ExternalLink size={20} className="group-hover:translate-x-1 transition-transform" />
                                </a>
                            )}
                        </div>

                        {/* Minimal Timeline */}
                        <div className="space-y-6">
                            <h3 className="text-xs font-mono text-gray-600 uppercase tracking-widest pl-1">Execution Log</h3>
                            <div className="flex flex-col gap-6 border-l border-white/[0.05] pl-6 py-2">
                                {metadata?.timeline?.map((item, index) => (
                                    <div key={index} className="group flex flex-col gap-1 relative">
                                        <div className="absolute -left-[27px] top-1.5 w-1.5 h-1.5 rounded-full bg-gray-800 group-hover:bg-cyan-500 transition-colors" />
                                        <span className="text-xs font-mono text-gray-500 group-hover:text-cyan-400 transition-colors">
                                            {item.year}
                                        </span>
                                        <span className="text-sm text-gray-400">
                                            {item.event}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* === Q2: TECH (Top-Right) === */}
                <div className="relative bg-[#000508]/60 backdrop-blur-sm scrollbar-hide overflow-y-auto flex flex-col">
                    <div className="sticky top-0 z-20 px-8 py-6 bg-[#000508]/90 backdrop-blur-md border-b border-white/[0.02] flex items-center justify-between">
                        <h2 className="text-xs font-mono uppercase tracking-widest text-gray-500 flex items-center gap-3">
                            <Layers size={14} /> Technology Stack
                        </h2>
                        <span className="text-[10px] text-gray-700 font-mono">
                            {config.projectDetails?.ATLAS?.stack?.length || 0} MODULES
                        </span>
                    </div>

                    <div className="p-8 md:p-12 flex flex-wrap gap-8 justify-center content-start min-h-0">
                        {config.projectDetails?.ATLAS?.stack?.map((tech, i) => (
                            <div key={i} className="group flex flex-col items-center gap-3 relative p-4">
                                <div className="absolute inset-0 bg-white/[0.02] scale-0 group-hover:scale-100 rounded-2xl transition-transform duration-300" />
                                <img
                                    src={getTechIcon(tech)}
                                    alt={tech}
                                    className="w-12 h-12 opacity-40 group-hover:opacity-100 grayscale group-hover:grayscale-0 transition-all duration-300 relative z-10"
                                />
                                <span className="opacity-0 group-hover:opacity-100 text-[10px] font-mono text-gray-400 uppercase tracking-wider transition-opacity duration-300 absolute -bottom-2 whitespace-nowrap z-10">
                                    {tech}
                                </span>
                            </div>
                        )) || (
                                project.tags?.map((tag, i) => (
                                    <span key={i} className="text-gray-500 border border-white/10 px-3 py-1 rounded-full text-sm">{tag}</span>
                                ))
                            )}
                    </div>
                </div>

                {/* === Q3: FEATURES (Bottom-Left) === */}
                <div className="relative bg-[#000508]/60 backdrop-blur-sm scrollbar-hide overflow-y-auto">
                    <div className="sticky top-0 z-20 px-8 py-6 bg-[#000508]/90 backdrop-blur-md border-b border-white/[0.02] flex items-center gap-3">
                        <CheckCircle size={14} className="text-cyan-500/50" />
                        <span className="text-xs font-mono uppercase tracking-widest text-gray-500">Core Directives</span>
                    </div>

                    <div className="p-8 md:p-12">
                        {(metadata?.features || metadata?.flagshipFeatures) && (
                            metadata?.features ? (
                                <div className="space-y-6">
                                    {metadata.features.map((feature, index) => (
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
                                    ))}
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 gap-4">
                                    {metadata.flagshipFeatures.map((feat, i) => (
                                        <div key={i} className="p-4 bg-white/5 rounded text-gray-300 text-sm">{feat}</div>
                                    ))}
                                </div>
                            )
                        )}
                    </div>
                </div>

                {/* === Q4: FAILURES (Bottom-Right) === */}
                <div className="relative bg-[#000508]/40 backdrop-blur-sm scrollbar-hide overflow-y-auto">
                    <div className="sticky top-0 z-20 px-8 py-6 bg-[#000508]/90 backdrop-blur-md border-b border-white/[0.02] flex items-center gap-3">
                        <Flame size={14} className="text-red-500/50" />
                        <span className="text-xs font-mono uppercase tracking-widest text-gray-500">System Anomalies</span>
                    </div>

                    <div className="p-8 md:p-12">
                        {metadata?.failures && (
                            <div className="space-y-6">
                                {metadata.failures.map((f, i) => (
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
                        )}
                    </div>
                </div>

            </div>
        </motion.div>
    );
};

export default ProjectDetailsPage;
