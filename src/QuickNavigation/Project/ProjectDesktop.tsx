import { useState } from 'react';
import { useGithubProjects } from './hooks/useGithubProjects';
import { ProjectShowcase } from './components/ProjectShowcase';
import { ProjectDetailView } from './components/ProjectDetailView';
import { type GithubRepo } from '@/services/githubService';
import { AnimatePresence, motion } from 'framer-motion';

export const ProjectDesktop = () => {
    const { projects, flagship, loading, error } = useGithubProjects();
    const [selectedRepo, setSelectedRepo] = useState<GithubRepo | null>(null);

    // Merge flagship into projects list at the start for the showcase if it exists
    const allProjects = flagship ? [flagship, ...projects.filter(p => p.id !== flagship.id)] : projects;

    return (
        <div className="h-full w-full relative">
            <AnimatePresence mode="wait">
                {!selectedRepo ? (
                    /* SHOWCASE VIEW */
                    <motion.div
                        key="showcase"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.5 }}
                        className="h-full w-full"
                    >
                        {loading ? (
                            <div className="flex items-center justify-center h-full">
                                <div className="loader" />
                            </div>
                        ) : error ? (
                            <div className="text-center text-red-400 p-8 glass-panel rounded-2xl m-auto mt-20 max-w-lg">
                                {error}
                            </div>
                        ) : (
                            <ProjectShowcase
                                projects={allProjects}
                                onSelect={setSelectedRepo}
                            />
                        )}
                    </motion.div>
                ) : (
                    /* DETAIL VIEW */
                    <motion.div
                        key="detail"
                        initial={{ opacity: 0, y: '100%' }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="h-full w-full absolute inset-0 z-50 bg-black/95 backdrop-blur-xl"
                    >
                        <ProjectDetailView
                            repo={selectedRepo}
                            onClose={() => setSelectedRepo(null)}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
