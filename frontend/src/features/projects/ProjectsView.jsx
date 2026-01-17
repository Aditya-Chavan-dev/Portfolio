import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowUpRight, Star, GitFork, ExternalLink, ShieldCheck, Zap } from 'lucide-react';
import ProjectDetailsPage from './ProjectDetailsPage';
import { GitHubService } from '../../services/github';
import config from '../../portfolio.config';
import { getTechIcon } from '../../utils/techIcons';

const ProjectsView = ({ onBack, initialProjectId, onTechClick, projects: globalProjects }) => {
    const [localProjects, setLocalProjects] = useState([]); // Fallback state
    const [flagship, setFlagship] = useState(null);
    const [selectedProject, setSelectedProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isInteractionReady, setInteractionReady] = useState(false);

    // Use global projects if available, otherwise local
    const displayProjects = globalProjects && globalProjects.length > 0 ? globalProjects : localProjects;

    useEffect(() => {
        // Reduced artificial delay from 350ms to 100ms for snappier feel
        const timer = setTimeout(() => setInteractionReady(true), 100);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const fetchProjects = async () => {
            // Optimize: If we have global projects, just filter flagship.
            // But we need to separate Flagship from Others.
            // Let's assume globalProjects contains ALL repos.
            let data = globalProjects;

            if (!data || data.length === 0) {
                // Fallback fetch
                data = await GitHubService.getRepositories();
                setLocalProjects(data);
            }

            const flagshipName = config.projects.flagshipRepository;
            const foundFlagship = data.find(repo => repo.name === flagshipName);
            const others = data
                .filter(repo => repo.name !== flagshipName)
                .filter(repo => !config.projects.others.excludeForked || !repo.fork)
                .filter(repo => !config.projects.others.excludeArchived || !repo.archived);

            setFlagship(foundFlagship);
            // We only need to set 'projects' state if we were doing local rendering calculation here.
            // But we display 'displayProjects'. Wait, displayProjects is ALL.
            // Local state 'projects' in previous code was 'others'.
            // Let's fix this naming.
            setLocalProjects(others); // Actually we should use a state for 'others'.

            if (initialProjectId) {
                if (foundFlagship && foundFlagship.name === initialProjectId) {
                    setSelectedProject(foundFlagship);
                } else {
                    const found = others.find(p => p.name === initialProjectId);
                    if (found) setSelectedProject(found);
                }
            } else {
                const lastProject = localStorage.getItem('LAST_PROJECT_V2');
                if (lastProject) {
                    if (foundFlagship && foundFlagship.name === lastProject) {
                        setSelectedProject(foundFlagship);
                    } else {
                        const found = others.find(p => p.name === lastProject);
                        if (found) setSelectedProject(found);
                    }
                }
            }
            setLoading(false);
        };
        fetchProjects();
    }, [initialProjectId, globalProjects]); // Re-run if global projects load later

    useEffect(() => {
        if (loading) return;
        if (selectedProject) {
            localStorage.setItem('LAST_PROJECT_V2', selectedProject.name);
        } else {
            localStorage.removeItem('LAST_PROJECT_V2');
        }
    }, [selectedProject, loading]);

    if (selectedProject) {
        return (
            <AnimatePresence mode="wait">
                <ProjectDetailsPage
                    project={selectedProject}
                    onClose={() => setSelectedProject(null)}
                    onTechClick={onTechClick}
                    onHub={onBack}
                />
            </AnimatePresence>
        );
    }

    return (
        <div className="relative w-full h-screen bg-[#050505] overflow-x-hidden text-white flex flex-col">

            {/* Background Circuit Pattern (Cleaner implementation via CSS or lighter opacity) */}
            <div className="fixed top-0 right-0 w-1/2 h-1/2 opacity-[0.03] pointer-events-none bg-circuit-pattern" />

            {/* Header */}
            <div className="pt-24 px-6 md:px-12 max-w-6xl mx-auto w-full">
                <button
                    onClick={onBack}
                    className="flex items-center gap-2 text-white/40 hover:text-cyan-400 transition-colors group mb-8"
                >
                    <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                    <span className="font-mono text-xs uppercase tracking-widest">Back to Hub</span>
                </button>
            </div>

            <div className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-cyan-900 scrollbar-track-black">
                <div className="max-w-6xl mx-auto px-6 md:px-12 pb-32">

                    {loading || !isInteractionReady ? (
                        <div className="flex flex-col items-center justify-center py-32">
                            <div className="w-12 h-12 border border-cyan-500/20 border-t-cyan-400 rounded-full animate-spin mb-4" />
                            <span className="font-mono text-xs text-cyan-500/80 animate-pulse tracking-widest uppercase">
                                {!isInteractionReady ? 'Initializing Interface' : 'Syncing Repository Data'}
                            </span>
                        </div>
                    ) : (
                        <div className="space-y-8">

                            {/* ======================= FLAGSHIP SECTION ======================= */}
                            {flagship && (
                                <motion.div
                                    initial={{ opacity: 0, y: 15 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, ease: 'easeOut' }}
                                >
                                    <button
                                        onClick={() => setSelectedProject(flagship)}
                                        className="group relative w-full text-left overflow-hidden rounded-2xl border border-white/10 bg-black/50 backdrop-blur-2xl hover:border-cyan-500/40 transition-all duration-500"
                                    >
                                        {/* Gradient Glow */}
                                        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-700" />

                                        {/* Decorative Circuit Accent (Top Right) */}
                                        <div className="absolute top-0 right-0 w-48 h-48 opacity-20 bg-circuit-pattern bg-contain bg-no-repeat" />

                                        <div className="relative z-10 p-8 md:p-12 flex flex-col md:flex-row gap-8 items-start">
                                            {/* Left Content */}
                                            <div className="flex-1 space-y-6">
                                                <h2 className="text-5xl md:text-6xl font-display font-bold text-white tracking-tight group-hover:text-cyan-400 transition-colors duration-300">
                                                    {flagship.name}
                                                </h2>
                                                <p className="text-lg text-gray-400 font-light max-w-xl leading-relaxed">
                                                    {flagship.name === 'ATLAS'
                                                        ? "Enterprise-Grade Microservices Platform & Cloud Infrastructure. Scalable, Resilient, and Future-Proof."
                                                        : flagship.description}
                                                </p>

                                                {/* CTA Button */}
                                                <div className="inline-flex items-center gap-3 px-5 py-3 rounded-full border border-cyan-500/30 text-cyan-400 text-sm font-mono uppercase tracking-widest group-hover:bg-cyan-500/10 group-hover:border-cyan-400/50 transition-all">
                                                    <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                                    <span>Explore Architecture</span>
                                                </div>
                                            </div>

                                            {/* Right: Tech Stack Badges */}
                                            <div className="flex flex-wrap gap-2 max-w-xs justify-end">
                                                {['JavaScript', 'React', 'Node.js', 'Firebase', 'Tailwind'].map(tech => (
                                                    <button
                                                        key={tech}
                                                        onClick={(e) => { e.stopPropagation(); onTechClick(tech); }}
                                                        className="px-3 py-1 rounded-md bg-white/5 border border-white/10 text-xs font-mono text-gray-300 hover:bg-cyan-500/10 hover:text-cyan-400 hover:border-cyan-500/30 transition-all"
                                                    >
                                                        {tech}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </button>
                                </motion.div>
                            )}

                            {/* ======================= PROJECT GRID ======================= */}
                            <motion.div
                                className="grid grid-cols-1 md:grid-cols-2 gap-5"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.2, duration: 0.5 }}
                            >
                                {localProjects.map((repo, idx) => (
                                    <div
                                        key={repo.id}
                                        className="relative group"
                                    >
                                        {/* Card Button */}
                                        <motion.button
                                            onClick={() => setSelectedProject(repo)}
                                            initial={{ opacity: 0, y: 15 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.1 * Math.min(idx, 6), duration: 0.4 }}
                                            className="w-full h-full flex flex-row items-stretch text-left overflow-hidden rounded-xl border border-white/10 bg-black/40 backdrop-blur-xl hover:border-cyan-500/40 transition-all duration-300"
                                        >
                                            {/* Left: Decorative Image Placeholder */}
                                            <div className="hidden md:flex w-36 items-center justify-center bg-gradient-to-br from-cyan-900/20 to-black/50 border-r border-white/5 overflow-hidden">
                                                <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1518770660439-464faec72ff6?w=200&q=80')] bg-cover bg-center opacity-40 group-hover:opacity-60 transition-opacity duration-500" />
                                            </div>

                                            {/* Right: Content */}
                                            <div className="flex-1 p-5 flex flex-col justify-between min-h-[180px]">
                                                <div className="space-y-2">
                                                    <h3 className="text-lg font-display font-semibold text-gray-100 group-hover:text-cyan-400 transition-colors">
                                                        {repo.name.replace(/-/g, ' ').toUpperCase()}
                                                    </h3>
                                                    <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed">
                                                        {repo.description || "No description provided."}
                                                    </p>
                                                    {repo.language && (
                                                        <div className="flex items-center gap-2 relative z-20">
                                                            <p className="text-xs font-mono text-gray-600 flex items-center gap-2">
                                                                <span className="text-cyan-500">TECH:</span>
                                                                <button
                                                                    onClick={(e) => { e.stopPropagation(); onTechClick(repo.language); }}
                                                                    className="flex items-center gap-1 hover:text-white transition-colors"
                                                                    title="View Tech Nexus"
                                                                >
                                                                    <img src={getTechIcon(repo.language)} alt={repo.language} className="w-3 h-3 grayscale group-hover:grayscale-0 transition-all" />
                                                                    {repo.language}
                                                                </button>
                                                            </p>
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Footer: Status Bar + Link */}
                                                <div className="mt-4 flex items-center justify-between">
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-[10px] font-mono text-gray-500 uppercase">Status:</span>
                                                        <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                                                            LIVE
                                                        </span>
                                                    </div>
                                                    <span className="flex items-center gap-1 text-xs font-mono text-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity">
                                                        View Project <ArrowUpRight size={12} />
                                                    </span>
                                                </div>
                                            </div>
                                        </motion.button>
                                    </div>
                                ))}
                            </motion.div>
                        </div>
                    )}
                </div>
            </div>

            <AnimatePresence />
        </div>
    );
};


export default ProjectsView;
