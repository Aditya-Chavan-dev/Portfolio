import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Star, GitFork, ExternalLink, Code, ShieldCheck } from 'lucide-react';
import ProjectDetailsPage from './ProjectDetailsPage';
import { GitHubService } from '../../services/github';
import config from '../../portfolio.config';

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
    };
    const slug = map[language] || map[Object.keys(map).find(k => language.includes(k))];
    if (!slug) return null;
    return `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${slug}.svg`;
};


const ProjectsView = ({ onBack, initialProjectId }) => {
    const [projects, setProjects] = useState([]);
    const [flagship, setFlagship] = useState(null);
    const [selectedProject, setSelectedProject] = useState(null);
    const [loading, setLoading] = useState(true);
    // PERF: Wait for Navbar transition (350ms) before rendering heavy list
    const [isInteractionReady, setInteractionReady] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setInteractionReady(true), 350);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const fetchProjects = async () => {
            const data = await GitHubService.getRepositories();

            // Normalize config flagship name
            const flagshipName = config.projects.flagshipRepository;

            // Find flagship
            const foundFlagship = data.find(repo => repo.name === flagshipName);

            // Filter others
            // Note: If flagship not found in API (e.g. private/missing), we won't show the highlight section

            const others = data
                .filter(repo => repo.name !== flagshipName)
                .filter(repo => !config.projects.others.excludeForked || !repo.fork)
                .filter(repo => !config.projects.others.excludeArchived || !repo.archived);

            setFlagship(foundFlagship);
            setProjects(others);

            // Priority 1: Deep Linking / Props
            if (initialProjectId) {
                if (foundFlagship && foundFlagship.name === initialProjectId) {
                    setSelectedProject(foundFlagship);
                } else {
                    const found = others.find(p => p.name === initialProjectId);
                    if (found) setSelectedProject(found);
                }
            }
            // Priority 2: Persistence
            else {
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
    }, [initialProjectId]);

    // Persist Selection - Only after loading is complete to avoid race condition
    useEffect(() => {
        if (loading) return;

        if (selectedProject) {
            localStorage.setItem('LAST_PROJECT_V2', selectedProject.name);
        } else {
            localStorage.removeItem('LAST_PROJECT_V2');
        }
    }, [selectedProject, loading]);

    // If a project is selected, show the full details page
    if (selectedProject) {
        return (
            <AnimatePresence mode="wait">
                <ProjectDetailsPage
                    project={selectedProject}
                    onClose={() => setSelectedProject(null)}
                />
            </AnimatePresence>
        );
    }

    return (
        <div className="relative w-full h-full bg-[#050505] overflow-y-auto overflow-x-hidden text-white scrollbar-thin scrollbar-thumb-cyan-900 scrollbar-track-black">

            {/* Header / Nav - REMOVED (Conflicting with LiveNavbar) */}
            <div className="pt-20 md:pt-24 px-4 md:px-6 max-w-4xl mx-auto flex items-center justify-between">
                <button
                    onClick={onBack}
                    className="flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition-colors"
                >
                    <ArrowLeft size={18} />
                    <span className="font-mono text-sm uppercase tracking-wider">Back to Hub</span>
                </button>
            </div>

            <div className="max-w-4xl mx-auto px-4 md:px-6 py-8 md:py-12 flex flex-col gap-8 md:gap-12">

                {loading || !isInteractionReady ? (
                    <div className="flex flex-col items-center justify-center py-20">
                        <div className="w-12 h-12 border-2 border-cyan-500/30 border-t-cyan-400 rounded-full animate-spin mb-4" />
                        <span className="text-cyan-500 font-mono text-sm animate-pulse">
                            {!isInteractionReady ? 'Initializing Interface...' : 'Retrieving Repository Data...'}
                        </span>
                    </div>
                ) : (
                    <>
                        {/* --- FLAGSHIP SECTION --- */}
                        {flagship && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                            >
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="h-px flex-1 bg-gradient-to-r from-transparent to-cyan-500/50" />
                                    <span className="text-cyan-400 font-mono text-xs uppercase tracking-[0.2em] flex items-center gap-2">
                                        <ShieldCheck size={14} /> Flagship Architecture
                                    </span>
                                    <div className="h-px flex-1 bg-gradient-to-l from-transparent to-cyan-500/50" />
                                </div>

                                <button
                                    onClick={() => setSelectedProject(flagship)}
                                    className="group relative block w-full bg-gradient-to-br from-cyan-900/10 to-black border border-cyan-500/30 rounded-2xl overflow-hidden hover:border-cyan-400/50 transition-all duration-500 text-left"
                                >
                                    {/* Glow Effect */}
                                    <div className="absolute top-0 right-0 p-32 bg-cyan-500/10 blur-[100px] rounded-full group-hover:bg-cyan-400/20 transition-all duration-700" />

                                    <div className="relative z-10 p-5 md:p-10 flex flex-col md:flex-row gap-8 items-start md:items-center">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-2">
                                                <h2 className="text-3xl md:text-5xl font-display font-bold text-white tracking-tighter group-hover:text-cyan-400 transition-colors">
                                                    {flagship.name}
                                                </h2>
                                                <div className="px-3 py-1 bg-cyan-500/20 border border-cyan-500/30 rounded-full text-cyan-300 text-xs font-mono uppercase tracking-widest hidden md:block">
                                                    Flagship
                                                </div>
                                            </div>

                                            <p className="text-gray-400 text-lg leading-relaxed max-w-2xl mb-6 group-hover:text-gray-300 transition-colors">
                                                {flagship.name === 'ATLAS' ? (
                                                    <>
                                                        <span className="text-cyan-400 font-bold">A</span>ttendance{' '}
                                                        <span className="text-cyan-400 font-bold">T</span>racking &{' '}
                                                        <span className="text-cyan-400 font-bold">L</span>ogging{' '}
                                                        <span className="text-cyan-400 font-bold">A</span>utomation{' '}
                                                        <span className="text-cyan-400 font-bold">S</span>ystem
                                                    </>
                                                ) : (
                                                    flagship.description || "Leading the charge in innovation."
                                                )}
                                            </p>

                                            <div className="flex flex-wrap items-center gap-6 text-sm font-mono text-cyan-600/80">
                                                {flagship.language && (
                                                    <span className="flex items-center gap-2">
                                                        {getTechIcon(flagship.language) ? (
                                                            <img src={getTechIcon(flagship.language)} alt={flagship.language} className="w-5 h-5" />
                                                        ) : (
                                                            <div className="w-2 h-2 rounded-full bg-cyan-400" />
                                                        )}
                                                        {flagship.language}
                                                    </span>
                                                )}
                                                <span className="flex items-center gap-2">
                                                    <Star size={16} /> {flagship.stargazers_count} Stars
                                                </span>
                                                <span className="flex items-center gap-2">
                                                    <GitFork size={16} /> {flagship.forks_count} Forks
                                                </span>
                                            </div>
                                        </div>

                                        <div className="hidden md:flex items-center justify-center w-16 h-16 rounded-full border border-white/10 group-hover:bg-cyan-500 group-hover:border-cyan-400 group-hover:text-black transition-all duration-500 transform group-hover:scale-110">
                                            <ExternalLink size={24} />
                                        </div>
                                    </div>
                                </button>
                            </motion.div>
                        )}

                        {/* --- OTHER PROJECTS --- */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3, duration: 0.6 }}
                            className="space-y-4"
                        >
                            <div className="flex items-center gap-4 mb-6 opacity-60">
                                <span className="text-xs font-mono text-gray-500 uppercase tracking-widest">Available Modules ({projects.length})</span>
                                <div className="h-px flex-1 bg-white/10" />
                            </div>

                            <div className="grid grid-cols-1 gap-4">
                                {projects.map((repo, idx) => (
                                    <motion.button
                                        onClick={() => setSelectedProject(repo)}
                                        key={repo.id}
                                        layout
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.1 * Math.min(idx, 10), duration: 0.3 }}
                                        className="group w-full flex flex-col md:flex-row md:items-center justify-between p-4 md:p-6 bg-[#0A0A0A] border border-white/5 rounded-xl hover:border-white/20 hover:bg-white/[0.02] text-left"
                                    >
                                        <div className="flex-1 mb-4 md:mb-0">
                                            <div className="flex items-center gap-3 mb-2">
                                                <Code size={16} className="text-gray-600 group-hover:text-cyan-500 transition-colors" />
                                                <h3 className="text-lg font-bold text-gray-200 group-hover:text-cyan-100 transition-colors">
                                                    {repo.name}
                                                </h3>
                                            </div>
                                            <p className="text-sm text-gray-500 group-hover:text-gray-400 line-clamp-2 pr-4 transition-colors">
                                                {repo.description || "No description provided."}
                                            </p>
                                        </div>

                                        <div className="flex items-center gap-6 text-xs text-gray-600 font-mono">
                                            {repo.language && (
                                                <span className="px-2 py-1 rounded bg-white/5 border border-white/5 text-gray-400 group-hover:border-cyan-500/20 group-hover:text-cyan-400 transition-colors flex items-center gap-2">
                                                    {getTechIcon(repo.language) ? (
                                                        <img src={getTechIcon(repo.language)} alt={repo.language} className="w-3 h-3" />
                                                    ) : (
                                                        <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                                                    )}
                                                    {repo.language}
                                                </span>
                                            )}
                                            <div className="flex items-center gap-1 group-hover:text-yellow-500 transition-colors">
                                                <Star size={12} /> {repo.stargazers_count}
                                            </div>
                                            <div className="hidden md:flex opacity-0 group-hover:opacity-100 transition-opacity text-cyan-500">
                                                <ExternalLink size={16} />
                                            </div>
                                        </div>
                                    </motion.button>
                                ))}
                            </div>
                        </motion.div>
                    </>
                )}
            </div>

            {/* Modal Layer Removed in favor of Full Page Swap */}
            <AnimatePresence />

        </div>
    );
};

export default ProjectsView;
