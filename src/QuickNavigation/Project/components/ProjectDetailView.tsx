import { githubService, type GithubRepo } from '@/services/githubService';
import { ExternalLink, Github, Clock, ArrowLeft, History, GitCommit } from 'lucide-react';
import { motion, type Variants } from 'framer-motion';
import { useEffect, useState } from 'react';

interface ProjectDetailViewProps {
    repo: GithubRepo;
    onClose: () => void;
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

export const ProjectDetailView = ({ repo, onClose }: ProjectDetailViewProps) => {
    const [commits, setCommits] = useState<number | null>(null);
    const [loadingCommits, setLoadingCommits] = useState(false);

    useEffect(() => {
        let isMounted = true;
        const fetchCommits = async () => {
            if (!repo.name) return;
            setLoadingCommits(true);
            // Assuming owner is fixed to 'Aditya-Chavan-dev' or derived from repo url if needed.
            // For now using the hardcoded username from data would be safer but passing it here is strict.
            // We can extract owner from html_url or use a known constant.
            // html_url: https://github.com/OWNER/REPO
            const owner = repo.html_url.split('/')[3];
            const count = await githubService.fetchCommitCount(owner, repo.name);
            if (isMounted) {
                setCommits(count);
                setLoadingCommits(false);
            }
        };

        fetchCommits();

        return () => { isMounted = false; };
    }, [repo.name, repo.html_url]);

    // Staggered Animation Variants
    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: "easeOut" }
        }
    };

    const formatDate = (dateStr: string) => {
        return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    };

    return (
        <motion.div
            key={repo.id}
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="flex-1 h-full overflow-y-auto bg-black/20 p-8 md:p-12 scrollbar-thin scrollbar-thumb-white/10"
        >
            <div className="max-w-4xl mx-auto">
                <motion.button
                    variants={itemVariants}
                    onClick={onClose}
                    className="mb-8 flex items-center gap-2 text-secondary hover:text-white transition-colors group"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    <span>Back to Gallery</span>
                </motion.button>

                {/* Header */}
                <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8 border-b border-white/10 pb-8">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">
                            {repo.name}
                        </h1>
                        <div className="flex flex-wrap items-center gap-3">
                            {repo.language && (
                                <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getLanguageColor(repo.language)}`}>
                                    {repo.language}
                                </div>
                            )}
                            {/* Topics/Tags */}
                            {repo.topics && repo.topics.map(topic => (
                                <span key={topic} className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-white/5 text-secondary border border-white/5">
                                    #{topic}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="flex gap-3">
                        {repo.homepage && (
                            <a
                                href={repo.homepage}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-5 py-2.5 rounded-xl bg-gold-glow text-black font-bold hover:translate-y-[-2px] hover:shadow-lg hover:shadow-gold-glow/20 transition-all flex items-center gap-2"
                            >
                                <ExternalLink className="w-4 h-4" />
                                <span>Live Demo</span>
                            </a>
                        )}
                        <a
                            href={repo.html_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white font-medium hover:bg-white/10 hover:border-white/20 transition-all flex items-center gap-2"
                        >
                            <Github className="w-4 h-4" />
                            <span>Source Code</span>
                        </a>
                    </div>
                </motion.div>

                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-8">
                        {/* Description */}
                        <motion.div variants={itemVariants} className="prose prose-invert max-w-none">
                            <h3 className="text-xl font-bold text-white mb-4">About Project</h3>
                            <p className="text-secondary/80 text-lg leading-relaxed">
                                {repo.description || "No description provided for this repository."}
                            </p>
                        </motion.div>

                        {/* Placeholder for future detailed content */}
                        <motion.div variants={itemVariants} className="p-8 rounded-2xl bg-white/5 border border-white/10 border-dashed flex items-center justify-center min-h-[250px] relative overflow-hidden group">
                            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                            <p className="text-secondary/50 italic relative z-10">Additional project details, screenshots, or README content would go here.</p>
                        </motion.div>
                    </div>

                    {/* Stats Sidebar */}
                    <div className="space-y-6">
                        <motion.div variants={itemVariants} className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors duration-300">
                            <h3 className="text-sm font-bold text-white/50 uppercase tracking-wider mb-4">Project Stats</h3>

                            <div className="space-y-6">
                                {/* Total Commits */}
                                <div className="flex items-center justify-between group">
                                    <div className="flex items-center gap-3 text-secondary group-hover:text-gold-glow transition-colors">
                                        <div className="p-2 rounded-lg bg-white/5 group-hover:bg-gold-glow/10 transition-colors">
                                            <GitCommit className="w-5 h-5" />
                                        </div>
                                        <span className="font-medium">Total Commits</span>
                                    </div>
                                    <span className="font-mono text-white text-lg font-bold">
                                        {loadingCommits ? (
                                            <span className="animate-pulse text-white/40">...</span>
                                        ) : commits !== null ? (
                                            commits.toLocaleString()
                                        ) : (
                                            "N/A"
                                        )}
                                    </span>
                                </div>

                                {/* Timeline */}
                                <div className="space-y-3 pt-4 border-t border-white/5">
                                    <div className="flex items-center gap-2 text-secondary mb-2">
                                        <History className="w-4 h-4" />
                                        <span className="text-sm font-medium uppercase tracking-wider">Timeline</span>
                                    </div>

                                    <div className="flex items-center justify-between group">
                                        <div className="flex flex-col">
                                            <span className="text-xs text-secondary/60">Started</span>
                                            <span className="text-white font-mono">{formatDate(repo.created_at)}</span>
                                        </div>
                                        <div className="h-px w-8 bg-white/10 group-hover:bg-gold-glow/50 transition-colors" />
                                        <div className="flex flex-col items-end">
                                            <span className="text-xs text-secondary/60">Last Update</span>
                                            <span className="text-white font-mono">{formatDate(repo.updated_at)}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between group pt-4 border-t border-white/5">
                                    <div className="flex items-center gap-2 text-secondary group-hover:text-green-400 transition-colors">
                                        <Clock className="w-4 h-4" />
                                        <span>Last Active</span>
                                    </div>
                                    <span className="font-mono text-white text-sm">
                                        {new Date(repo.updated_at).toLocaleDateString()}
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};
