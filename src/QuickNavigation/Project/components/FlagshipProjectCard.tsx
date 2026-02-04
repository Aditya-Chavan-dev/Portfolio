import { type GithubRepo } from '@/services/githubService';
import { Star, GitFork, ExternalLink, Github, Trophy, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

interface FlagshipProjectCardProps {
    repo: GithubRepo;
    onClick?: () => void;
}

export const FlagshipProjectCard = ({ repo, onClick }: FlagshipProjectCardProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="group relative w-full mb-8 cursor-pointer"
            onClick={onClick}
        >
            {/* Dynamic Glow Background */}
            <div className="absolute -inset-1 bg-gradient-to-r from-gold-glow/20 via-purple-500/20 to-gold-glow/20 rounded-3xl blur-2xl opacity-50 group-hover:opacity-80 transition-opacity duration-700 animate-pulse-slow pointer-events-none" />

            <div className="glass-panel relative z-10 p-8 rounded-3xl border border-gold-glow/20 overflow-hidden flex flex-col md:flex-row gap-8 bg-black/60 md:items-center group-hover:border-gold-glow/40 transition-colors duration-500">

                {/* Visual / Icon Section */}
                <div className="flex-shrink-0 relative">
                    <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-gradient-to-br from-gold-glow/10 to-amber-900/10 flex items-center justify-center border border-gold-glow/20 group-hover:scale-105 transition-transform duration-500">
                        <Trophy className="w-10 h-10 md:w-12 md:h-12 text-gold-glow dropshadow-glow" />
                    </div>
                    <div className="absolute -top-2 -right-2 bg-gradient-to-r from-gold-glow to-amber-300 rounded-full p-1.5 shadow-lg shadow-gold-glow/20">
                        <Sparkles className="w-4 h-4 text-black fill-current" />
                    </div>
                </div>

                {/* Content Section */}
                <div className="flex-1 flex flex-col">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-glow/10 border border-gold-glow/20 text-gold-glow text-xs font-bold uppercase tracking-wider mb-2">
                                <Sparkles className="w-3 h-3" />
                                Flagship Project
                            </div>
                            <h3 className="text-3xl font-bold text-white tracking-tight group-hover:text-gold-glow transition-colors">
                                {repo.name}
                            </h3>
                        </div>

                        <div className="flex gap-3">
                            {repo.homepage && (
                                <a
                                    href={repo.homepage}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-4 py-2 rounded-xl bg-gold-glow text-black font-bold text-sm hover:translate-y-[-2px] hover:shadow-lg hover:shadow-gold-glow/20 transition-all flex items-center gap-2"
                                >
                                    <ExternalLink className="w-4 h-4" />
                                    <span>Live Demo</span>
                                </a>
                            )}
                            <a
                                href={repo.html_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white font-medium text-sm hover:bg-white/10 hover:border-white/20 transition-all flex items-center gap-2"
                            >
                                <Github className="w-4 h-4" />
                                <span>Source</span>
                            </a>
                        </div>
                    </div>

                    <p className="text-secondary/90 text-lg leading-relaxed mb-6 max-w-3xl">
                        {repo.description || "The crown jewel of my development journey, demonstrating advanced problem-solving and architectural skills."}
                    </p>

                    <div className="flex flex-wrap items-center gap-6 mt-auto">
                        {repo.language && (
                            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/5">
                                <div className="w-2.5 h-2.5 rounded-full bg-gold-glow animate-pulse" />
                                <span className="text-sm font-medium text-white/80">{repo.language}</span>
                            </div>
                        )}

                        <div className="h-4 w-px bg-white/10 hidden md:block" />

                        <div className="flex items-center gap-2 text-secondary hover:text-gold-glow transition-colors cursor-default">
                            <Star className="w-4 h-4" />
                            <span className="font-mono">{repo.stargazers_count} Stars</span>
                        </div>

                        <div className="flex items-center gap-2 text-secondary hover:text-gold-glow transition-colors cursor-default">
                            <GitFork className="w-4 h-4" />
                            <span className="font-mono">{repo.forks_count} Forks</span>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};
