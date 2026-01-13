import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, Calendar, CheckCircle, Flame, Layers, X, Github } from 'lucide-react';
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
            className="fixed inset-0 z-50 bg-[#020202] text-white flex flex-col font-sans selection:bg-cyan-500/30 overflow-hidden"
        >
            {/* Background Gradient for Depth */}
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-900/20 via-black to-black opacity-50" />

            {/* === GLOBAL HEADER === */}
            <header className="h-16 flex-shrink-0 flex items-center justify-between px-6 border-b border-white/5 bg-black/50 backdrop-blur-md relative z-50">
                <div className="flex items-center gap-4">
                    <div className="w-2 h-8 bg-cyan-500 rounded-full shadow-[0_0_15px_rgba(6,182,212,0.5)]" />
                    <div>
                        <h1 className="text-xl font-bold font-display tracking-tight text-white uppercase">
                            {metadata?.title || project.title}
                        </h1>
                        <p className="text-[10px] text-gray-500 font-mono tracking-widest uppercase">
                            Secure System Access // {metadata?.timeline?.[0]?.year || '2024'}
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    {/* Github Link */}
                    <a
                        href={project.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hidden md:flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/5 rounded-full text-xs font-mono text-gray-300 transition-all hover:border-cyan-500/30"
                    >
                        <Github size={14} />
                        <span>REPO</span>
                    </a>

                    <button
                        onClick={onClose}
                        className="p-2 rounded-full bg-white/5 hover:bg-red-500/20 text-gray-400 hover:text-red-400 transition-colors border border-white/5 hover:border-red-500/30"
                    >
                        <X size={20} />
                    </button>
                </div>
            </header>


            {/* === 2x2 GRID LAYOUT === */}
            {/* Height = 100vh - 64px (header) */}
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 lg:grid-rows-2 w-full h-[calc(100vh-64px)] overflow-y-auto lg:overflow-hidden">

                {/* === Q1: INTRO & TIMELINE (Top-Left) === */}
                <div className="relative p-8 md:p-12 lg:border-r lg:border-b border-white/5 lg:overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent bg-black/20">
                    <div className="space-y-8 max-w-2xl">
                        {/* Status Badge */}
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-950/30 border border-cyan-500/20 rounded-full">
                            <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                            <span className="text-[10px] uppercase tracking-widest text-cyan-400 font-mono">System Online</span>
                        </div>

                        {/* Description */}
                        <div>
                            <h2 className="text-3xl md:text-4xl font-light text-white mb-6 leading-tight">
                                <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Mission Protocol:</span><br />
                                {metadata?.description || project.desc}
                            </h2>

                            {/* CTA Buttons */}
                            {metadata?.demoUrl && (
                                <a
                                    href={metadata.demoUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-3 px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-sm tracking-wide rounded-lg shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] transition-all transform hover:-translate-y-1"
                                >
                                    <ExternalLink size={16} />
                                    INITIALIZE DEMO
                                </a>
                            )}
                        </div>

                        {/* Timeline */}
                        <div className="pt-8 border-t border-white/5">
                            <h3 className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                                <Calendar size={14} /> Execution Timeline
                            </h3>
                            <div className="space-y-4 pl-2 relative">
                                <div className="absolute left-[7px] top-2 bottom-2 w-px bg-white/5" />
                                {metadata?.timeline?.map((item, index) => (
                                    <div key={index} className="relative pl-6 group">
                                        <div className="absolute left-[4px] top-1.5 w-1.5 h-1.5 rounded-full bg-cyan-900 border border-cyan-500/50 group-hover:bg-cyan-500 transition-colors" />
                                        <div className="flex flex-col">
                                            <span className="text-cyan-400 font-mono text-xs">{item.year}</span>
                                            <span className="text-gray-400 text-sm">{item.event}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* === Q2: TECH STACK (Top-Right) === */}
                <div className="relative lg:border-b border-white/5 lg:overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent bg-black/10">
                    <div className="sticky top-0 z-20 px-8 py-4 bg-black/80 backdrop-blur-sm border-b border-white/5 flex items-center gap-3">
                        <Layers size={16} className="text-purple-400" />
                        <span className="text-xs font-mono uppercase tracking-widest text-gray-300">Technology Stack</span>
                    </div>

                    <div className="p-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                        {config.projectDetails?.ATLAS?.stack?.map((tech, i) => (
                            <div key={i} className="flex flex-col items-center justify-center gap-3 p-6 bg-white/[0.02] border border-white/5 hover:border-purple-500/40 hover:bg-purple-500/5 rounded-xl transition-all group aspect-square">
                                <img
                                    src={getTechIcon(tech)}
                                    alt={tech}
                                    className="w-12 h-12 opacity-50 group-hover:opacity-100 transition-all grayscale group-hover:grayscale-0 transform group-hover:scale-110"
                                />
                                <span className="text-xs text-gray-500 group-hover:text-purple-300 font-mono text-center transition-colors">{tech}</span>
                            </div>
                        )) || (
                                project.tags?.map((tag, i) => (
                                    <div key={i} className="p-4 bg-white/5 rounded text-center text-gray-400 text-sm border border-white/5 flex items-center justify-center aspect-square">{tag}</div>
                                ))
                            )}
                    </div>
                </div>

                {/* === Q3: FEATURES (Bottom-Left) === */}
                <div className="relative lg:border-r border-white/5 lg:overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent bg-black/10">
                    <div className="sticky top-0 z-20 px-8 py-4 bg-black/80 backdrop-blur-sm border-b border-white/5 flex items-center gap-3">
                        <CheckCircle size={16} className="text-yellow-500" />
                        <span className="text-xs font-mono uppercase tracking-widest text-gray-300">Flagship Features</span>
                    </div>

                    <div className="p-8">
                        {(metadata?.features || metadata?.flagshipFeatures) && (
                            metadata?.features ? (
                                <div className="space-y-4">
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
                                        <div key={i} className="p-4 border border-white/5 bg-white/[0.02] rounded flex items-center gap-3">
                                            <div className="w-1.5 h-1.5 rounded-full bg-yellow-500" />
                                            <span className="text-gray-300 font-mono text-sm">{feat}</span>
                                        </div>
                                    ))}
                                </div>
                            )
                        )}
                    </div>
                </div>

                {/* === Q4: FAILURES (Bottom-Right) === */}
                <div className="relative lg:overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent bg-black/20">
                    <div className="sticky top-0 z-20 px-8 py-4 bg-black/80 backdrop-blur-sm border-b border-white/5 flex items-center gap-3">
                        <Flame size={16} className="text-red-500" />
                        <span className="text-xs font-mono uppercase tracking-widest text-gray-300">Critical Failures</span>
                    </div>

                    <div className="p-8">
                        {metadata?.failures && (
                            <div className="space-y-4">
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
