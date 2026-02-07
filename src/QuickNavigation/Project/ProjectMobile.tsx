import { useGithubProjects } from './hooks/useGithubProjects';
import { ProjectCard } from './components/ProjectCard';
import { ArrowLeft } from 'lucide-react';

interface ProjectMobileProps {
    onBack?: () => void;
}

export const ProjectMobile = ({ onBack }: ProjectMobileProps) => {
    const { projects, flagship, loading, error } = useGithubProjects();

    return (
        <section id="projects" className="min-h-screen py-16 px-6 bg-black relative overflow-hidden">
            <div className="relative z-10">
                {onBack && (
                    <div className="w-full flex justify-start mb-6 relative z-50">
                        <button
                            onClick={onBack}
                            className="nav-button-mobile"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Back
                        </button>
                    </div>
                )}
                <div className="mb-8">
                    <h2 className="text-3xl font-bold text-white mb-2">
                        Featured <span className="text-gold-glow">Projects</span>
                    </h2>
                    <p className="text-secondary text-sm">
                        Live from GitHub.
                    </p>
                </div>

                {loading ? (
                    <div className="flex-center h-40">
                        <div className="loader" />
                    </div>
                ) : error ? (
                    <div className="text-center text-red-400 p-4 glass-panel rounded-xl">
                        {error}
                    </div>
                ) : (
                    <div className="flex flex-col gap-4">
                        {/* Flagship */}
                        {flagship && <ProjectCard repo={flagship} isActive={true} />}

                        {/* List */}
                        {projects.map((repo) => (
                            <ProjectCard key={repo.id} repo={repo} />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};
