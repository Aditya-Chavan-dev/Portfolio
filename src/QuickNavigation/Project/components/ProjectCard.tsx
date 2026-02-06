import { type GithubRepo } from '@/services/githubService';
import { Star, GitFork, ExternalLink, Github, Folder } from 'lucide-react';
import { motion, useTransform } from 'framer-motion';
import { useParallax } from '@/shared/hooks/useParallax';
import { useDeviceType } from '@/hooks/useDeviceType';

interface ProjectCardProps {
    repo: GithubRepo;
    index: number;
    isActive?: boolean;
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

export const ProjectCard = ({ repo, index, isActive = false, onClick }: ProjectCardProps) => {
    // Device & Parallax Logic
    const { isMobile } = useDeviceType();
    const { x, y, handleMouseMove, handleMouseLeave } = useParallax({
        isActive,
        isMobile
    });

    const contentX = useTransform(x, [-0.5, 0.5], [-20, 20]);
    const contentY = useTransform(y, [-0.5, 0.5], [-20, 20]);

    // Background moves opposite for depth
    const bgX = useTransform(x, [-0.5, 0.5], [10, -10]);
    const bgY = useTransform(y, [-0.5, 0.5], [10, -10]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05, duration: 0.4 }}
            className={`group relative flex flex-col h-full cursor-pointer transition-all duration-500 will-change-transform perspective-1000 ${isActive ? 'scale-[1.02] z-50' : 'hover:scale-[1.01] opacity-40'}`}
            onClick={onClick}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            tabIndex={0}
            role="button"
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onClick?.();
                }
            }}
        >
            {/* Main Card Container */}
            <motion.div
                className={`relative h-full flex flex-col p-8 rounded-3xl border transition-all duration-500 overflow-hidden z-10 ${isActive
                    ? 'border-gold-glow/20 bg-black shadow-2xl shadow-gold-glow/5'
                    : 'border-white/10 bg-white/5 hover:border-white/20'
                    }`}
                style={{
                    x: isActive ? bgX : 0,
                    y: isActive ? bgY : 0
                }}
            >
                {/* Content Layer (Parallax Layer 1 - Floating) */}
                <motion.div
                    className="flex flex-col h-full relative z-20"
                    style={{
                        x: isActive ? contentX : 0,
                        y: isActive ? contentY : 0
                    }}
                >
                    {/* Header: Folder Icon + Links */}
                    <div className="flex justify-between items-start mb-6">
                        <div className={`p-4 rounded-2xl transition-all duration-500 backdrop-blur-sm ${isActive ? 'bg-gold-glow/10 text-gold-glow border border-gold-glow/20' : 'bg-white/5 text-gold-glow/60 group-hover:text-gold-glow'
                            }`}>
                            <Folder className={`w-8 h-8 ${isActive ? 'drop-shadow-[0_0_8px_rgba(255,215,0,0.5)]' : ''}`} />
                        </div>

                        <div className={`flex gap-3 transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                            {repo.homepage && (
                                <a
                                    href={repo.homepage}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-3 rounded-xl bg-white/5 hover:bg-white/20 text-white transition-colors"
                                    title="Live Demo"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <ExternalLink className="w-5 h-5" />
                                </a>
                            )}
                            <a
                                href={repo.html_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-3 rounded-xl bg-white/5 hover:bg-white/20 text-white transition-colors"
                                title="View Code"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <Github className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Content: Title + Description */}
                    <div className="flex-1 flex flex-col justify-center mb-8">
                        <h3 className={`font-black text-white mb-4 transition-all duration-300 ${isActive ? 'text-4xl md:text-5xl drop-shadow-2xl' : 'text-3xl'}`}>
                            {repo.name}
                        </h3>
                        <p className={`text-secondary leading-relaxed transition-all duration-300 ${isActive ? 'text-lg line-clamp-none font-medium text-white/80' : 'text-base line-clamp-4'}`}>
                            {repo.description || "A cool project doing cool things."}
                        </p>

                        {/* Topics (Only visible when active/large) */}
                        {isActive && repo.topics && repo.topics.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-6 animate-fade-in pl-1">
                                {repo.topics.slice(0, 5).map(topic => (
                                    <span key={topic} className="px-3 py-1 rounded-full text-xs font-mono font-medium bg-gold-glow/5 border border-gold-glow/10 text-gold-glow/80">
                                        #{topic}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Footer: Language + Stats */}
                    <div className="flex items-center justify-between mt-auto pt-6 border-t border-white/10">
                        {repo.language ? (
                            <div className={`px-4 py-1.5 rounded-full text-sm font-bold tracking-wide shadow-lg ${getLanguageColor(repo.language)}`}>
                                {repo.language}
                            </div>
                        ) : (<span></span>)}

                        <div className="flex items-center gap-6 text-sm font-medium text-secondary">
                            <div className="flex items-center gap-2">
                                <Star className={`w-4 h-4 ${isActive ? 'text-yellow-400 fill-yellow-400 drop-shadow-lg' : ''}`} />
                                <span>{repo.stargazers_count}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <GitFork className="w-4 h-4" />
                                <span>{repo.forks_count}</span>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </motion.div>
    );
};
