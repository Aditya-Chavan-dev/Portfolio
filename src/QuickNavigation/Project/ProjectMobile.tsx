import { useGithubProjects } from './hooks/useGithubProjects';

import { ProjectCard } from './components/ProjectCard';
import { FlagshipProjectCard } from './components/FlagshipProjectCard';

export const ProjectMobile = () => {
    const { projects, flagship, loading, error } = useGithubProjects();

    return (
        <section id="projects" className="min-h-screen py-16 px-6 bg-black relative overflow-hidden">
            <div className="relative z-10">
                <div className="mb-8">
                    <h2 className="text-3xl font-bold text-white mb-2">
                        Featured <span className="text-gold-glow">Projects</span>
                    </h2>
                    <p className="text-secondary text-sm">
                        Live from GitHub.
                    </p>
                </div>

                {loading ? (
                    <div className="flex items-center justify-center h-40">
                        <div className="loader" />
                    </div>
                ) : error ? (
                    <div className="text-center text-red-400 p-4 glass-panel rounded-xl">
                        {error}
                    </div>
                ) : (
                    <div className="flex flex-col gap-4">
                        {/* Flagship */}
                        {flagship && <FlagshipProjectCard repo={flagship} />}

                        {/* List */}
                        {projects.map((repo, index) => (
                            <ProjectCard key={repo.id} repo={repo} index={index} />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};
