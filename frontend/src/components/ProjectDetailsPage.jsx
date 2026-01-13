import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, Calendar, CheckCircle, Flame, Layers } from 'lucide-react';
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

    // Smooth scroll to top on mount is handled by the quadrants individually now if needed, 
    // but primarily we just mount.

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#030303] flex flex-col overflow-hidden" // FULL SCREEN CONTAINER
        >

            {/* Close Button - Fixed Context */}
            <button
                onClick={onClose}
                className="fixed top-6 right-8 z-[60] p-3 rounded-full bg-black/50 hover:bg-white/10 text-gray-400 hover:text-white transition-colors border border-white/5 backdrop-blur-md"
            >
                <ArrowLeft size={24} />
            </button>

            {/* 2x2 Grid Layout - Full Height */}
            <div className="grid grid-cols-1 lg:grid-cols-2 lg:grid-rows-2 w-full h-full">

                {/* === QUADRANT 1: Header/Timeline (Top-Left) === */}
                <div className="p-8 md:p-12 lg:p-16 lg:border-r lg:border-b border-white/10 space-y-10 overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                    {/* Header Content */}
                    <div className="space-y-6">
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono tracking-wider">
                                    PROJECT DETAILS
                                </span>
                                {metadata?.demoUrl && (
                                    <a
                                        href={metadata.demoUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-mono tracking-wider hover:bg-green-500/20 transition-colors flex items-center gap-2"
                                    >
                                        <ExternalLink size={12} /> DEMO AVAILABLE
                                    </a>
                                )}
                            </div>
                            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight leading-tight">
                                {metadata?.title || project.title}
                            </h1>
                        </div>
                        <p className="text-lg md:text-xl text-gray-400 leading-relaxed max-w-2xl">
                            {metadata?.description || project.desc}
                        </p>
                        {metadata?.demoUrl && (
                            <div className="pt-4">
                                <a
                                    href={metadata.demoUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-cyan-500 text-black font-bold tracking-wide hover:bg-cyan-400 hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all transform hover:-translate-y-1"
                                >
                                    <ExternalLink size={20} />
                                    LAUNCH LIVE DEMO
                                </a>
                            </div>
                        )}
                    </div>

                    {/* Timeline Integration in Q1 */}
                    <div className="space-y-4 pt-8 border-t border-white/10">
                        <div className="flex items-center gap-3 text-cyan-400">
                            <Calendar size={18} />
                            <span className="text-sm font-mono tracking-widest uppercase">Project Timeline</span>
                        </div>
                        <div className="space-y-6 relative pl-2">
                            <div className="absolute left-[8px] top-2 bottom-2 w-px bg-white/10" />
                            {metadata?.timeline?.map((item, index) => (
                                <div key={index} className="relative pl-6">
                                    <div className="absolute left-[4px] top-1.5 w-2 h-2 rounded-full bg-[#0A0A0A] border border-cyan-500/50" />
                                    <span className="block text-cyan-500/70 text-xs font-mono mb-1">{item.year}</span>
                                    <span className="text-gray-300 text-sm leading-snug block">{item.event}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* === QUADRANT 2: Tech Stack (Top-Right) === */}
                <div className="p-8 md:p-12 lg:p-16 lg:border-b border-white/10 flex flex-col overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                    <div className="flex items-center gap-4 mb-8 sticky top-0 bg-[#030303]/90 backdrop-blur-sm z-10 py-2">
                        <div className="p-2 rounded bg-purple-500/20 text-purple-400"><Layers size={20} /></div>
                        <h2 className="text-2xl font-bold text-white tracking-tight">Tech Stack</h2>
                        <div className="h-px flex-1 bg-white/10" />
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {config.projectDetails?.ATLAS?.stack?.map((tech, i) => (
                            <div key={i} className="flex flex-col items-center justify-center gap-3 p-6 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-purple-500/30 transition-all group aspect-square">
                                <img
                                    src={getTechIcon(tech)}
                                    alt={tech}
                                    className="w-16 h-16 opacity-70 group-hover:opacity-100 transition-opacity grayscale group-hover:grayscale-0"
                                />
                                <span className="text-sm text-gray-500 group-hover:text-gray-300 font-mono text-center">{tech}</span>
                            </div>
                        )) || (
                                project.tags?.map((tag, i) => (
                                    <div key={i} className="p-4 bg-white/5 rounded text-center text-gray-400 text-sm border border-white/5 flex items-center justify-center aspect-square">{tag}</div>
                                ))
                            )}
                    </div>
                </div>

                {/* === QUADRANT 3: Features (Bottom-Left) === */}
                <div className="p-8 md:p-12 lg:p-16 lg:border-r border-white/10 bg-white/[0.01] overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                    <div className="flex items-center gap-4 mb-8 sticky top-0 bg-[#030303]/90 backdrop-blur-sm z-10 py-2">
                        <div className="p-2 rounded bg-yellow-500/20 text-yellow-500"><CheckCircle size={20} /></div>
                        <h2 className="text-2xl font-bold text-white tracking-tight">Flagship Features</h2>
                        <div className="h-px flex-1 bg-yellow-500/20" />
                    </div>

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

                {/* === QUADRANT 4: Failures (Bottom-Right) === */}
                <div className="p-8 md:p-12 lg:p-16 bg-white/[0.01] overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                    <div className="flex items-center gap-4 mb-8 sticky top-0 bg-[#030303]/90 backdrop-blur-sm z-10 py-2">
                        <div className="p-2 rounded bg-red-900/20 text-red-500"><Flame size={20} /></div>
                        <h2 className="text-2xl font-bold text-white tracking-tight">Critical Failures</h2>
                        <div className="h-px flex-1 bg-red-900/20" />
                    </div>

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
        </motion.div>
    );
};

export default ProjectDetailsPage;
