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
            </div>

            {/* Fixed GitHub Link (Positioned below Compact Navbar) */}
            <a
                href={project.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="fixed top-24 right-6 z-[90] flex items-center gap-3 px-5 py-2.5 bg-black/80 backdrop-blur-md border border-white/10 rounded-full text-xs font-mono uppercase tracking-widest text-gray-300 hover:text-white hover:border-cyan-500/50 hover:shadow-[0_0_20px_rgba(6,182,212,0.2)] transition-all group"
            >
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 group-hover:animate-pulse" />
                <span>GitHub Repo</span>
                <ExternalLink size={14} className="opacity-50 group-hover:opacity-100" />
            </a>

            {/* --- Main Content: Split Layout --- */}
            <div className="w-full max-w-[1800px] mx-auto px-4 md:px-6 lg:px-12 py-8 md:py-12 flex flex-col lg:flex-row gap-8 md:gap-12 items-start">

                {/* === LEFT COLUMN: Sticky Anchor (Identity, Core, Tech) === */}
                <div className="w-full lg:w-[480px] flex-shrink-0 flex flex-col gap-10 lg:sticky lg:top-20 transition-all">

                    {/* 1. Hero identity */}
                    <div>
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
                        {/* Core Idea & Timeline Side-by-Side */}
                        <div className="flex flex-col xl:flex-row gap-6">
                            {/* Description */}
                            <div className="flex-1 pl-4 border-l-2 border-cyan-500/50">
                                <h3 className="text-xs font-mono text-cyan-400 uppercase tracking-widest mb-2">Core Concept</h3>
                                <p className="text-sm text-gray-300 font-light leading-relaxed">
                                    {metadata?.coreIdea || project.description || "No core analysis available."}
                                </p>
                            </div>

                            {/* Timeline (Compact Right) */}
                            {metadata?.timeline && (
                                <div className="w-full xl:w-[120px] shrink-0 pt-1">
                                    <h3 className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                                        <Calendar size={12} /> Timeline
                                    </h3>
                                    <div className="flex flex-row flex-wrap xl:flex-col gap-x-6 gap-y-3">
                                        {metadata.timeline.map((t, i) => (
                                            <div key={i} className="relative pl-3 border-l border-white/10">
                                                <div className="absolute -left-[3px] top-1.5 w-1.5 h-1.5 rounded-full bg-cyan-500" />
                                                <span className="block text-xs font-bold text-cyan-400">{t.year}</span>
                                                <span className="block text-[10px] text-gray-500 leading-tight">{t.event.replace(/^\d{4}\s?/, '')}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Demo Link */}
                        {metadata?.demoUrl && (
                            <a href={metadata.demoUrl} className="mt-6 flex items-center justify-center gap-2 w-full py-3 bg-cyan-500/10 border border-cyan-500/20 rounded hover:bg-cyan-500/20 text-cyan-400 text-xs font-mono uppercase tracking-widest transition-all">
                                <ExternalLink size={14} /> Initialize Demo Sequence
                            </a>
                        )}
                    </div>

                    {/* 2. Tech Stack (In Sidebar) */}
                    <section>
                        <div className="flex items-center gap-4 mb-4">
                            <div className="p-2 rounded bg-cyan-900/20 text-cyan-400"><Layers size={20} /></div>
                            <h2 className="text-xl font-bold text-white tracking-tight">System Specs</h2>
                        </div>

                        {metadata?.tech ? (
                            <div className="flex flex-col gap-5">
                                {/* Frontend */}
                                <div className="space-y-1.5">
                                    <span className="text-[9px] uppercase font-mono text-gray-500 tracking-widest pl-1">Frontend Layer</span>
                                    <div className="flex flex-wrap gap-2">
                                        {metadata.tech.frontend.map(item => <TechBadge key={item} name={item} />)}
                                    </div>
                                </div>

                                {/* Backend */}
                                <div className="space-y-1.5">
                                    <span className="text-[9px] uppercase font-mono text-gray-500 tracking-widest pl-1">Server Core</span>
                                    <div className="flex flex-wrap gap-2">
                                        {metadata.tech.backend.map(item => <TechBadge key={item} name={item} />)}
                                    </div>
                                </div>

                                {/* Database */}
                                <div className="space-y-1.5">
                                    <span className="text-[9px] uppercase font-mono text-gray-500 tracking-widest pl-1">Data Storage</span>
                                    <div className="flex flex-wrap gap-2">
                                        {metadata.tech.database.map(item => <TechBadge key={item} name={item} />)}
                                    </div>
                                </div>

                                {/* Infra */}
                                <div className="space-y-1.5">
                                    <span className="text-[9px] uppercase font-mono text-gray-500 tracking-widest pl-1">Infrastructure</span>
                                    <div className="flex flex-wrap gap-2">
                                        {metadata.tech.infrastructure.map(item => <TechBadge key={item} name={item} />)}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="p-6 rounded-xl border border-white/5 bg-white/[0.02] flex items-center gap-4">
                                <span className="text-gray-500 italic">Detailed tech stack not indexed.</span>
                            </div>
                        )}
                    </section>
                </div>

                {/* === RIGHT COLUMN: Scrollable Feed (Failures, Timeline) === */}
                <div className="w-full lg:flex-1 flex flex-col gap-16 pb-20">

                    {/* 2.5 Flagship Features (New Main Section) */}
                    {metadata?.flagshipFeatures && (
                        <section>
                            <div className="flex items-center gap-4 mb-8">
                                <div className="p-2 rounded bg-yellow-500/20 text-yellow-500"><CheckCircle size={20} /></div>
                                <h2 className="text-2xl font-bold text-white tracking-tight">Flagship Features</h2>
                                <div className="h-px flex-1 bg-yellow-500/20" />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {metadata.flagshipFeatures.map((feat, i) => (
                                    <div key={i} className="p-4 border border-white/5 bg-white/[0.02] rounded flex items-center gap-3">
                                        <div className="w-1.5 h-1.5 rounded-full bg-yellow-500" />
                                        <span className="text-gray-300 font-mono text-sm">{feat}</span>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* 3. Failure Analysis (The Main Content) */}
                    {metadata?.failures && (
                        <section>
                            <div className="flex items-center gap-4 mb-8">
                                <div className="p-2 rounded bg-red-900/20 text-red-500"><Flame size={20} /></div>
                                <h2 className="text-2xl font-bold text-white tracking-tight">Critical Failures</h2>
                                <div className="h-px flex-1 bg-red-900/20" />
                            </div>

                            <div className="grid grid-cols-1 gap-8">
                                {metadata.failures.map((f, i) => (
                                    <div key={i} className="group relative bg-[#0A0A0A] border border-white/5 rounded-xl p-6 md:p-8 hover:border-red-500/20 transition-all duration-500 overflow-hidden">
                                        {/* Subtle background glow */}
                                        <div className="absolute -right-20 -top-20 w-64 h-64 bg-red-900/5 blur-[80px] rounded-full group-hover:bg-red-900/10 transition-all" />

                                        <div className="relative z-10 flex flex-col gap-6">
                                            {/* Failure Header */}
                                            <div className="flex items-start justify-between">
                                                <div className="flex items-center gap-3 text-red-400 font-mono text-xs uppercase tracking-widest">
                                                    <AlertTriangle size={14} /> Critical Failure #{i + 1}
                                                </div>
                                            </div>

                                            <h3 className="text-2xl font-bold text-white leading-tight">{f.title}</h3>

                                            {/* The Split: Problem vs Solution */}
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                                                {/* Problem */}
                                                <div className="space-y-2">
                                                    <span className="text-red-500/50 text-[10px] uppercase font-mono tracking-widest">Incident Report</span>
                                                    <p className="text-gray-400 leading-relaxed font-light border-l-2 border-red-900/30 pl-4">
                                                        "{f.failure}"
                                                    </p>
                                                </div>

                                                {/* Solution */}
                                                <div className="space-y-2">
                                                    <span className="text-green-500/50 text-[10px] uppercase font-mono tracking-widest">Patch Applied</span>
                                                    <p className="text-gray-300 leading-relaxed">
                                                        {f.solution}
                                                    </p>
                                                    <div className="pt-2">
                                                        <span className="text-green-400/80 text-sm font-medium">{f.outcome}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}


                </div>

            </div>
        </div>
    );
};

// Helper Item for badges (COMPACT)
const TechBadge = ({ name }) => {
    const icon = getTechIcon(name);
    return (
        <div className="flex items-center gap-1.5 px-2 py-1.5 rounded bg-white/5 border border-white/5 hover:bg-white/10 hover:border-cyan-500/30 transition-all cursor-default group">
            {icon ? <img src={icon} alt={name} className="w-3.5 h-3.5 object-contain" /> : <div className="w-1.5 h-1.5 rounded-full bg-cyan-500" />}
            <span className="text-[10px] font-mono text-gray-400 group-hover:text-cyan-400 transition-colors whitespace-nowrap">{name}</span>
        </div>
    )
}

export default ProjectDetailsPage;
