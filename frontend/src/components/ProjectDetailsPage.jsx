import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, Calendar, CheckCircle, Flame, Layers, X, Github, ChevronRight } from 'lucide-react';
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
            className="fixed inset-0 z-50 bg-[#0A0A0A] text-white font-sans selection:bg-cyan-500/30 flex flex-col md:flex-row overflow-hidden"
        >
            {/* Inline Styles for hiding scrollbars */}
            <style>{`
                .scrollbar-hide::-webkit-scrollbar { display: none; }
                .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
            `}</style>

            {/* Background Texture */}
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-indigo-900/10 via-[#0A0A0A] to-[#0A0A0A]" />
            <div className="absolute inset-0 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03]" />


            {/* === LEFT PANEL: IDENTITY & CONTROL (Fixed 40%) === */}
            <div className="relative w-full md:w-[40%] h-full flex flex-col border-b md:border-b-0 md:border-r border-white/5 bg-[#050505] z-10">

                {/* Header / Nav */}
                <div className="p-6 md:p-8 flex items-center justify-between">
                    <button
                        onClick={onClose}
                        className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors group"
                    >
                        <div className="p-2 rounded-full bg-white/5 group-hover:bg-white/10 border border-white/5 transition-colors">
                            <ArrowLeft size={18} />
                        </div>
                        <span className="text-sm font-mono uppercase tracking-widest hidden md:block">Back</span>
                    </button>
                    {/* Mobile Close Button */}
                    <button onClick={onClose} className="md:hidden p-2 text-gray-400"><X size={24} /></button>
                </div>

                {/* Content Container - Scrollable on mobile, fixed on desktop if needed but mainly static */}
                <div className="flex-1 overflow-y-auto scrollbar-hide p-6 md:p-12 md:pt-4 flex flex-col gap-10">

                    {/* Title & Desc */}
                    <div className="space-y-6">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-900/20 border border-cyan-500/20 rounded-full">
                            <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                            <span className="text-[10px] uppercase tracking-widest text-cyan-400 font-mono">System Deployed</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tighter leading-none">
                            {metadata?.title || project.title}
                        </h1>
                        <p className="text-lg text-gray-400 leading-relaxed font-light">
                            {metadata?.description || project.desc}
                        </p>

                        {/* Actions */}
                        <div className="flex flex-wrap gap-4 pt-2">
                            {metadata?.demoUrl && (
                                <a
                                    href={metadata.demoUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex-1 md:flex-none inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-black font-bold text-sm tracking-wide rounded hover:bg-gray-200 transition-colors"
                                >
                                    <ExternalLink size={16} />
                                    Launch Demo
                                </a>
                            )}
                            <a
                                href={project.html_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-1 md:flex-none inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/5 text-white font-medium text-sm tracking-wide rounded border border-white/10 hover:bg-white/10 transition-colors"
                            >
                                <Github size={16} />
                                Source
                            </a>
                        </div>
                    </div>

                    {/* Tech Stack - Cloud Layout */}
                    <div className="space-y-4">
                        <h3 className="text-xs font-mono text-gray-600 uppercase tracking-widest">Core Technologies</h3>
                        <div className="flex flex-wrap gap-3">
                            {config.projectDetails?.ATLAS?.stack?.map((tech, i) => (
                                <div key={i} className="flex items-center gap-2 px-3 py-2 bg-white/5 rounded border border-white/5 hover:border-white/20 transition-colors cursor-default group">
                                    <img
                                        src={getTechIcon(tech)}
                                        alt={tech}
                                        className="w-4 h-4 opacity-70 group-hover:opacity-100 grayscale group-hover:grayscale-0 transition-all"
                                    />
                                    <span className="text-xs text-gray-400 group-hover:text-white font-mono">{tech}</span>
                                </div>
                            )) || (
                                    project.tags?.map((tag, i) => (
                                        <span key={i} className="text-gray-500 border border-white/10 px-3 py-1 rounded-full text-sm">{tag}</span>
                                    ))
                                )}
                        </div>
                    </div>

                    {/* Timeline - Compact */}
                    <div className="mt-auto space-y-4 pt-8 md:pt-0">
                        <h3 className="text-xs font-mono text-gray-600 uppercase tracking-widest">Milestones</h3>
                        <div className="space-y-4 border-l border-white/5 pl-4">
                            {metadata?.timeline?.map((item, index) => (
                                <div key={index} className="relative">
                                    <div className="absolute -left-[21px] top-1.5 w-1.5 h-1.5 rounded-full bg-gray-800" />
                                    <div className="text-xs text-gray-500 font-mono mb-0.5">{item.year}</div>
                                    <div className="text-sm text-gray-300">{item.event}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>


            {/* === RIGHT PANEL: DEEP DIVE CONTENT (Scrollable 60%) === */}
            <div className="relative w-full md:w-[60%] h-full bg-[#0A0A0A]/50 overflow-y-auto scrollbar-hide">
                <div className="p-6 md:p-16 space-y-20 max-w-4xl mx-auto">

                    {/* SECTION: FEATURES */}
                    <section className="space-y-8">
                        <div className="flex items-center gap-4 border-b border-white/10 pb-4">
                            <div className="p-2 bg-cyan-900/20 text-cyan-400 rounded"><CheckCircle size={20} /></div>
                            <h2 className="text-xl font-bold text-white tracking-tight">Flagship Features</h2>
                        </div>

                        <div className="grid grid-cols-1 gap-6">
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
                                    <div className="text-gray-400">Features under classification.</div>
                                )
                            )}
                        </div>
                    </section>


                    {/* SECTION: FAILURES */}
                    <section className="space-y-8 pb-16">
                        <div className="flex items-center gap-4 border-b border-white/10 pb-4">
                            <div className="p-2 bg-red-900/20 text-red-400 rounded"><Flame size={20} /></div>
                            <h2 className="text-xl font-bold text-white tracking-tight">Critical Incidents & Solutions</h2>
                        </div>

                        <div className="grid grid-cols-1 gap-6">
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

        </motion.div>
    );
};

export default ProjectDetailsPage;
