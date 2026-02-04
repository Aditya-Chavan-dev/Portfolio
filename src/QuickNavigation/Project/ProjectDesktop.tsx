import { useState } from 'react';
import { useGithubProjects } from './hooks/useGithubProjects';
import { ProjectCard } from './components/ProjectCard';
import { FlagshipProjectCard } from './components/FlagshipProjectCard';
import { ProjectListSidebar } from './components/ProjectListSidebar';
import { ProjectDetailView } from './components/ProjectDetailView';
import { type GithubRepo } from '@/services/githubService';
import { AnimatePresence, motion } from 'framer-motion';

export const ProjectDesktop = () => {
    const { projects, flagship, loading, error } = useGithubProjects();
    const [selectedRepo, setSelectedRepo] = useState<GithubRepo | null>(null);

    return (
        <section id="projects" className="h-screen bg-black relative overflow-hidden flex flex-col">
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold-glow/5 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="relative z-10 w-full h-full">
                <AnimatePresence mode="wait">
                    {!selectedRepo ? (
                        /* GALLERY VIEW */
                        <motion.div
                            key="gallery"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="h-full overflow-y-auto px-8 py-20 scrollbar-thin scrollbar-thumb-white/10"
                        >
                            <div className="max-w-7xl mx-auto">
                                <div className="mb-12 text-center md:text-left">
                                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                                        Featured <span className="text-gold-glow">Projects</span>
                                    </h2>
                                    <p className="text-secondary text-lg max-w-2xl">
                                        A collection of my open-source contributions and personal projects.
                                    </p>
                                </div>

                                {loading ? (
                                    <div className="flex items-center justify-center h-64">
                                        <div className="loader" />
                                    </div>
                                ) : error ? (
                                    <div className="text-center text-red-400 p-8 glass-panel rounded-2xl">
                                        {error}
                                    </div>
                                ) : (
                                    <>
                                        {/* Flagship Project */}
                                        {flagship && (
                                            <FlagshipProjectCard
                                                repo={flagship}
                                                onClick={() => setSelectedRepo(flagship)}
                                            />
                                        )}

                                        {/* Other Projects Grid */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-20">
                                            {projects.map((repo, index) => (
                                                <ProjectCard
                                                    key={repo.id}
                                                    repo={repo}
                                                    index={index}
                                                    onClick={() => setSelectedRepo(repo)}
                                                />
                                            ))}
                                        </div>
                                    </>
                                )}
                            </div>
                        </motion.div>
                    ) : (
                        /* MASTER-DETAIL VIEW */
                        <motion.div
                            key="detail"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="h-full flex"
                        >
                            {/* Left Sidebar */}
                            <ProjectListSidebar
                                projects={projects}
                                flagship={flagship}
                                selectedId={selectedRepo.id}
                                onSelect={setSelectedRepo}
                            />

                            {/* Right Detail View */}
                            <ProjectDetailView
                                repo={selectedRepo}
                                onClose={() => setSelectedRepo(null)}
                            />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
};
