import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, Calendar, AlertTriangle, CheckCircle, Flame, Layers } from 'lucide-react';
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

    // Smooth scroll to top on mount
    useEffect(() => {
        const topOfPage = document.querySelector('#project-details-top');
        if (topOfPage) topOfPage.scrollIntoView({ behavior: 'smooth' });
    }, [project]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/95 backdrop-blur-xl overflow-y-auto"
        >
            <div className="relative w-full max-w-5xl bg-[#030303] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col my-auto">
                <div id="project-details-top" />

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 z-50 p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                >
                    <ArrowLeft size={20} />
                </button>

                <div className="p-8 md:p-12 space-y-16">

                    {/* === PART 1: HEADER & TIMELINE === */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        {/* 1A: Intro (Left - 2cols) */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Title & Badge */}
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
                                <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
                                    {metadata?.title || project.title}
                                </h1>
                            </div>

                            {/* Description */}
                            <p className="text-lg text-gray-400 leading-relaxed max-w-2xl">
                                {metadata?.description || project.desc}
                            </p>

                            {/* Demo Button (Primary CTA) */}
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

                        {/* 1B: Timeline (Right - 1col) */}
                        <div className="lg:col-span-1 border-l border-white/10 pl-8 space-y-6">
                            <div className="flex items-center gap-3 text-cyan-400 mb-4">
                                <Calendar size={18} />
                                <span className="text-sm font-mono tracking-widest uppercase">Project Timeline</span>
                            </div>

                            <div className="space-y-6 relative">
                                {metadata?.timeline?.map((item, index) => (
                                    <div key={index} className="relative pl-4 border-l border-white/10">
                                        <div className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-[#0A0A0A] border border-cyan-500/50" />
                                        <span className="block text-cyan-500/70 text-xs font-mono mb-1">{item.year}</span>
                                        <span className="text-gray-300 text-sm leading-snug block">{item.event}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* === PART 2: TECH STACK === */}
                    <section className="space-y-6">
                        <div className="flex items-center gap-4">
                            <div className="p-2 rounded bg-purple-500/20 text-purple-400"><Layers size={20} /></div>
                            <h2 className="text-2xl font-bold text-white tracking-tight">Tech Stack & Infrastructure</h2>
                            <div className="h-px flex-1 bg-white/10" />
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
                            {config.projectDetails?.ATLAS?.stack?.map((tech, i) => ( // Fallback to ATLAS stack pattern, really should use metadata.stack if structure matches
                                <div key={i} className="flex flex-col items-center justify-center gap-3 p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-purple-500/30 transition-all group">
                                    <img
                                        src={getTechIcon(tech)}
                                        alt={tech}
                                        className="w-10 h-10 opacity-70 group-hover:opacity-100 transition-opacity grayscale group-hover:grayscale-0"
                                    />
                                    <span className="text-xs text-gray-500 group-hover:text-gray-300 font-mono text-center">{tech}</span>
                                </div>
                            )) || (
                                    // Fallback
                                    project.tags?.map((tag, i) => (
                                        <div key={i} className="p-3 bg-white/5 rounded text-center text-gray-400 text-sm border border-white/5">{tag}</div>
                                    ))
                                )}
                        </div>
                    </section>

                    {/* === PART 3: FLAGSHIP FEATURES === */}
                    {(metadata?.features || metadata?.flagshipFeatures) && (
                        <section className="space-y-8">
                            <div className="flex items-center gap-4">
                                <div className="p-2 rounded bg-yellow-500/20 text-yellow-500"><CheckCircle size={20} /></div>
                                <h2 className="text-2xl font-bold text-white tracking-tight">Flagship Features</h2>
                                <div className="h-px flex-1 bg-white/10" />
                            </div>

                            {metadata?.features ? (
                                <div className="grid grid-cols-1 gap-4">
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
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {metadata.flagshipFeatures.map((feat, i) => (
                                        <div key={i} className="p-4 border border-white/5 bg-white/[0.02] rounded flex items-center gap-3">
                                            <div className="w-1.5 h-1.5 rounded-full bg-yellow-500" />
                                            <span className="text-gray-300 font-mono text-sm">{feat}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </section>
                    )}

                    {/* === PART 4: CRITICAL FAILURES === */}
                    {metadata?.failures && (
                        <section className="space-y-8">
                            <div className="flex items-center gap-4">
                                <div className="p-2 rounded bg-red-900/20 text-red-500"><Flame size={20} /></div>
                                <h2 className="text-2xl font-bold text-white tracking-tight">Critical Failures & Solutions</h2>
                                <div className="h-px flex-1 bg-white/10" />
                            </div>

                            <div className="grid grid-cols-1 gap-4">
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
                        </section>
                    )}

                </div>
            </div>
        </motion.div>
    );
};

export default ProjectDetailsPage;
