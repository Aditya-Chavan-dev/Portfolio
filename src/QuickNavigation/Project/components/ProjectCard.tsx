import { type GithubRepo } from '@/services/githubService';
import { Star, GitFork, ExternalLink, Github, Folder } from 'lucide-react';
import { motion } from 'framer-motion';

interface ProjectCardProps {
    repo: GithubRepo;
    index: number;
    onClick?: () => void;
}

const getLanguageColor = (language: string | null) => {
    if (!language) return 'bg-white/10 text-white/50';
    switch (language.toLowerCase()) {
        case 'typescript': return 'bg-blue-500/10 text-blue-400';
        case 'javascript': return 'bg-yellow-400/10 text-yellow-400';
        case 'html': return 'bg-orange-500/10 text-orange-400';
        case 'css': return 'bg-blue-400/10 text-blue-300';
        case 'python': return 'bg-green-500/10 text-green-400';
        case 'rust': return 'bg-orange-600/10 text-orange-500';
        case 'go': return 'bg-cyan-500/10 text-cyan-400';
        case 'java': return 'bg-red-500/10 text-red-400';
        default: return 'bg-gold-glow/10 text-gold-glow';
    }
};

export const ProjectCard = ({ repo, index, onClick }: ProjectCardProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05, duration: 0.4 }}
            className="group relative flex flex-col h-full cursor-pointer"
            onClick={onClick}
        >
            <div className="absolute inset-0 bg-gradient-to-br from-gold-glow/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            <div className="glass-panel h-full flex flex-col p-5 rounded-2xl border border-white/10 group-hover:border-gold-dim/30 hover:shadow-lg hover:shadow-gold-glow/5 transition-all duration-300 relative z-10 overflow-hidden transform group-hover:-translate-y-1">

                {/* Header: Folder Icon + Links */}
                <div className="flex justify-between items-start mb-4">
                    <div className="p-2.5 rounded-xl bg-white/5 group-hover:bg-gold-glow/10 transition-colors text-gold-glow/80 group-hover:text-gold-glow">
                        <Folder className="w-5 h-5" />
                    </div>

                    <div className="flex gap-2">
                        {repo.homepage && (
                            <a
                                href={repo.homepage}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 rounded-lg hover:bg-white/10 text-secondary hover:text-white transition-colors"
                                title="Live Demo"
                            >
                                <ExternalLink className="w-4.5 h-4.5" />
                            </a>
                        )}
                        <a
                            href={repo.html_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-lg hover:bg-white/10 text-secondary hover:text-white transition-colors"
                            title="View Code"
                        >
                            <Github className="w-4.5 h-4.5" />
                        </a>
                    </div>
                </div>

                {/* Content: Title + Description */}
                <div className="flex-1 mb-6">
                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-gold-glow transition-colors tracking-tight line-clamp-1">
                        {repo.name}
                    </h3>
                    <p className="text-sm text-secondary/80 leading-relaxed line-clamp-3 h-[4.5em]">
                        {repo.description || "A cool project doing cool things."}
                    </p>
                </div>

                {/* Footer: Language + Stats */}
                <div className="flex items-center justify-between mt-auto">
                    {repo.language ? (
                        <div className={`px-2.5 py-1 rounded-full text-xs font-medium ${getLanguageColor(repo.language)}`}>
                            {repo.language}
                        </div>
                    ) : (<span></span>)}

                    <div className="flex items-center gap-4 text-xs font-medium text-secondary">
                        <div className="flex items-center gap-1.5 hover:text-white transition-colors">
                            <Star className="w-3.5 h-3.5" />
                            <span>{repo.stargazers_count}</span>
                        </div>
                        <div className="flex items-center gap-1.5 hover:text-white transition-colors">
                            <GitFork className="w-3.5 h-3.5" />
                            <span>{repo.forks_count}</span>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};
