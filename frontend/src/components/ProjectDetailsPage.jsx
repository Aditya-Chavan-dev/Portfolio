import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, Calendar, AlertTriangle, CheckCircle, Flame, Layers, Server, Database, Cloud } from 'lucide-react';
import config from '../portfolio.config';

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

    // Smooth scroll to top on mount
    useEffect(() => {
        const topOfPage = document.querySelector('#project-details-top');
        if (topOfPage) topOfPage.scrollIntoView({ behavior: 'smooth' });
    }, [project]);

    return (
        <div className="relative w-full h-full bg-[#050505] overflow-y-auto overflow-x-hidden text-white scrollbar-thin scrollbar-thumb-cyan-900 scrollbar-track-black">
            <div id="project-details-top" />

            {/* --- Header / Nav --- */}
            <div className="sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10 px-6 py-4 flex items-center justify-between">
                <button
                    onClick={onClose}
                    className="flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition-colors"
                >
                    <ArrowLeft size={18} />
                    <span className="font-mono text-sm uppercase tracking-wider">Back to List</span>
                </button>

                <div className="flex items-center gap-4">
                    <a
                        href={project.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-900/40 to-cyan-500/20 hover:from-cyan-500 hover:to-cyan-400 hover:text-black border border-cyan-500/30 rounded text-xs font-mono uppercase tracking-widest transition-all shadow-[0_0_10px_rgba(6,182,212,0.1)] hover:shadow-[0_0_20px_rgba(6,182,212,0.4)]"
                    >
                        <ExternalLink size={14} /> GitHub Repo
                    </a>
                </div>
            </div>

            <div className="max-w-5xl mx-auto px-6 py-12 flex flex-col gap-16">

                {/* --- 1. Hero & Core Idea --- */}
                <div className="flex flex-col md:flex-row gap-12 items-start">
                    <div className="flex-1">
                        <div className="flex items-center gap-3 mb-4">
                            <h1 className="text-4xl md:text-5xl font-display font-bold text-white tracking-tighter">
                                {project.name}
                            </h1>
                            {metadata && (
                                <span className="px-2 py-1 rounded bg-yellow-500/10 text-yellow-500 text-[10px] font-mono uppercase tracking-widest border border-yellow-500/20">
                                    System Analysis
                                </span>
                            )}
                        </div>

                        {/* Core Idea (Summarized) */}
                        <div className="pl-4 border-l-2 border-cyan-500/50">
                            <h3 className="text-xs font-mono text-cyan-400 uppercase tracking-widest mb-2">Core Concept</h3>
                            <p className="text-lg md:text-xl text-gray-300 font-light leading-relaxed">
                                {metadata?.coreIdea || project.description || "No core analysis available."}
                            </p>
                        </div>
                    </div>
                </div>

                {/* --- 2. Tech Stack (PROMINENT with Icons) --- */}
                <section>
                    <div className="flex items-center gap-4 mb-6">
                        <div className="p-2 rounded bg-cyan-900/20 text-cyan-400"><Layers size={20} /></div>
                        <h2 className="text-2xl font-bold text-white tracking-tight">Technology Matrix</h2>
                        <div className="h-px flex-1 bg-white/10" />
                    </div>

                    {metadata?.tech ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            <TechCard title="Frontend" icon={Layers} items={metadata.tech.frontend} />
                            <TechCard title="Backend" icon={Server} items={metadata.tech.backend} />
                            <TechCard title="Database" icon={Database} items={metadata.tech.database} />
                            <TechCard title="Infra" icon={Cloud} items={metadata.tech.infrastructure} />
                        </div>
                    ) : (
                        <div className="p-6 rounded-xl border border-white/5 bg-white/[0.02] flex items-center gap-4">
                            <span className="text-gray-500 italic">Detailed tech stack not indexed.</span>
                            {project.language && (
                                <div className="flex items-center gap-2 px-3 py-1 rounded bg-white/5 border border-white/5">
                                    {getTechIcon(project.language) && <img src={getTechIcon(project.language)} className="w-4 h-4" alt="" />}
                                    <span className="text-gray-300">{project.language}</span>
                                </div>
                            )}
                        </div>
                    )}
                </section>

                {/* --- 3. Failure Analysis (CRITICAL SECTION) --- */}
                {metadata?.failures && (
                    <section>
                        <div className="flex items-center gap-4 mb-8">
                            <div className="p-2 rounded bg-red-900/20 text-red-500"><Flame size={20} /></div>
                            <h2 className="text-2xl font-bold text-white tracking-tight">System Failure Log</h2>
                            <div className="h-px flex-1 bg-red-900/20" />
                        </div>

                        <div className="grid grid-cols-1 gap-6">
                            {metadata.failures.map((f, i) => (
                                <div key={i} className="group relative bg-[#0A0A0A] border border-white/5 rounded-xl p-6 md:p-8 hover:border-red-500/20 transition-all duration-500 overflow-hidden">
                                    {/* Subtle background glow */}
                                    <div className="absolute -right-20 -top-20 w-64 h-64 bg-red-900/5 blur-[80px] rounded-full group-hover:bg-red-900/10 transition-all" />

                                    <div className="relative z-10 flex flex-col md:flex-row gap-8">
                                        {/* Left: The Failure */}
                                        <div className="flex-1 space-y-4">
                                            <div className="flex items-center gap-3 text-red-400 font-mono text-xs uppercase tracking-widest">
                                                <AlertTriangle size={14} /> Critical Failure #{i + 1}
                                            </div>
                                            <h3 className="text-xl font-bold text-white">{f.title}</h3>
                                            <p className="text-gray-400 leading-relaxed font-light border-l-2 border-red-900/30 pl-4 py-1">
                                                "{f.failure}"
                                            </p>
                                        </div>

                                        {/* Divider */}
                                        <div className="hidden md:block w-px bg-white/5" />

                                        {/* Right: The Solution */}
                                        <div className="flex-1 space-y-4">
                                            <div className="flex items-center gap-3 text-green-400 font-mono text-xs uppercase tracking-widest">
                                                <CheckCircle size={14} /> Engineered Solution
                                            </div>
                                            <p className="text-gray-300 leading-relaxed">
                                                {f.solution}
                                            </p>
                                            <div className="pt-4 border-t border-white/5">
                                                <span className="text-xs text-gray-500 font-mono uppercase tracking-wider mr-2">Result:</span>
                                                <span className="text-green-400/80 text-sm">{f.outcome}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* --- 4. Timeline (Brief Footer) --- */}
                {metadata?.timeline && (
                    <section className="opacity-60 hover:opacity-100 transition-opacity duration-500 pb-20">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="p-2 rounded bg-white/5 text-gray-400"><Calendar size={16} /></div>
                            <h2 className="text-lg font-bold text-gray-400 tracking-tight">Development Timeline</h2>
                            <div className="h-px flex-1 bg-white/5" />
                        </div>
                        <div className="flex flex-wrap gap-8 font-mono text-sm">
                            {metadata.timeline.map((t, i) => (
                                <div key={i} className="flex gap-4 items-center">
                                    <span className="text-cyan-500">{t.year}</span>
                                    <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
                                    <span className="text-gray-500">{t.event}</span>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

            </div>
        </div>
    );
};

// Helper Component for Tech Cards
const TechCard = ({ title, icon: Icon, items }) => {
    if (!items) return null;
    return (
        <div className="p-5 bg-[#0F0F0F] border border-white/5 rounded-xl hover:border-cyan-500/20 transition-colors">
            <div className="flex items-center gap-2 mb-4 text-cyan-400/80">
                <Icon size={16} />
                <span className="font-mono text-xs uppercase tracking-widest">{title}</span>
            </div>
            <div className="space-y-3">
                {items.map((item, i) => {
                    // Try to find an icon for this item
                    const iconUrl = getTechIcon(item);
                    return (
                        <div key={i} className="flex items-center gap-3 group">
                            <div className="w-6 h-6 flex items-center justify-center bg-white/5 rounded p-1 group-hover:bg-white/10 transition-colors">
                                {iconUrl ? <img src={iconUrl} alt={item} className="w-full h-full object-contain filter grayscale group-hover:grayscale-0 transition-all" /> : <div className="w-1.5 h-1.5 rounded-full bg-cyan-500/50" />}
                            </div>
                            <span className="text-sm text-gray-400 group-hover:text-white transition-colors">{item}</span>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default ProjectDetailsPage;
