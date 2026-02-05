import { githubService, type GithubRepo } from '@/services/githubService';
import { ExternalLink, Github, Clock, History, GitCommit, AlertTriangle, CheckCircle, X } from 'lucide-react';
import { getProjectMetadata } from '@/data/projectsData';
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

    // Fetch standardized metadata
    const metadata = getProjectMetadata(repo.name);

    // Use official name if available, otherwise fallback to repo name
    const displayName = metadata?.officialName || repo.name;
    const displayDescription = metadata?.description || repo.description || "No description provided.";

    useEffect(() => {
        let isMounted = true;
        const fetchCommits = async () => {
            if (!repo.name) return;
            setLoadingCommits(true);

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
            className="flex-1 h-full flex flex-col bg-black/20 p-6 md:p-8 overflow-hidden"
        >
            {/* Header Area */}
            <div className="flex-shrink-0 flex justify-between items-start mb-6 border-b border-white/10 pb-4 relative">
                <div className="flex items-center gap-4">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold text-white bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">
                            {displayName}
                        </h1>
                        <div className="flex flex-wrap items-center gap-2 mt-2">
                            {repo.language && (
                                <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getLanguageColor(repo.language)}`}>
                                    {repo.language}
                                </div>
                            )}
                            {repo.topics && repo.topics.slice(0, 3).map(topic => (
                                <span key={topic} className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-white/5 text-secondary border border-white/5">
                                    #{topic}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="flex gap-2 items-center">
                    {repo.homepage && (
                        <a href={repo.homepage} target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-xl bg-gold-glow text-black hover:scale-105 transition-transform">
                            <ExternalLink className="w-4 h-4" />
                        </a>
                    )}
                    <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors">
                        <Github className="w-4 h-4" />
                    </a>

                    {/* Close Button - Clean 'X' */}
                    <button
                        onClick={onClose}
                        className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-secondary hover:text-white hover:bg-red-500/10 hover:border-red-500/20 transition-all ml-2"
                        aria-label="Close details"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Dashboard Grid - Fills remaining height */}
            <div className="flex-1 min-h-0 grid grid-cols-1 md:grid-cols-12 gap-6">

                {/* Column 1: Stats & Overview (3 cols) */}
                <motion.div variants={itemVariants} className="md:col-span-3 flex flex-col gap-4 h-full overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-white/10">
                    <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
                        <h3 className="text-xs font-bold text-white/50 uppercase tracking-wider mb-4">Project Stats</h3>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-secondary flex items-center gap-2"><GitCommit className="w-4 h-4" /> Commits</span>
                                <span className="text-white font-mono font-bold">
                                    {loadingCommits ? "..." : commits?.toLocaleString() ?? "N/A"}
                                </span>
                            </div>
                            <div className="h-px bg-white/5" />
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-secondary flex items-center gap-2"><History className="w-4 h-4" /> Created</span>
                                <span className="text-white font-mono">{formatDate(repo.created_at)}</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-secondary flex items-center gap-2"><Clock className="w-4 h-4" /> Updated</span>
                                <span className="text-white font-mono">{formatDate(repo.updated_at)}</span>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Column 2: Description & Tech Stack (5 cols) */}
                <motion.div variants={itemVariants} className="md:col-span-5 flex flex-col gap-6 h-full overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-white/10">
                    <div className="prose prose-sm prose-invert max-w-none">
                        <h3 className="text-lg font-bold text-white mb-2">About</h3>
                        <p className="text-secondary/80 leading-relaxed">
                            {displayDescription}
                        </p>
                    </div>

                    {metadata?.techStack && (
                        <div className="space-y-4">
                            <h3 className="text-md font-bold text-white">Tech Stack</h3>
                            <div className="flex flex-wrap gap-2">
                                {metadata.techStack.flatMap(cat => cat.items).map((item, idx) => (
                                    <div key={idx} className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-secondary hover:text-white hover:border-white/20 transition-colors">
                                        <div className="w-3.5 h-3.5" style={{ color: item.color ? `#${item.color}` : (item.icon?.hex ? `#${item.icon.hex}` : '#ffffff') }}>
                                            {item.icon ? (
                                                <svg role="img" viewBox="0 0 24 24" className="w-full h-full fill-current"><path d={item.icon.path} /></svg>
                                            ) : (
                                                <div className="w-full h-full bg-current rounded-full opacity-50" />
                                            )}
                                        </div>
                                        <span>{item.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </motion.div>

                {/* Column 3: Features & Challenges (4 cols) */}
                <motion.div variants={itemVariants} className="md:col-span-4 flex flex-col gap-4 h-full overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-white/10">
                    {metadata ? (
                        <>
                            {(metadata.topFeatures && metadata.topFeatures.length > 0) && (
                                <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/10">
                                    <div className="flex items-center gap-2 mb-3 text-emerald-400">
                                        <CheckCircle className="w-4 h-4" />
                                        <h3 className="font-bold text-sm">Top Features</h3>
                                    </div>
                                    <ul className="space-y-2">
                                        {metadata.topFeatures.map((f, i) => (
                                            <li key={i} className="text-xs text-secondary/90 leading-relaxed list-disc list-inside marker:text-emerald-500/50">
                                                {f}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {(metadata.topFailures && metadata.topFailures.length > 0) && (
                                <div className="p-4 rounded-xl bg-orange-500/5 border border-orange-500/10">
                                    <div className="flex items-center gap-2 mb-3 text-orange-400">
                                        <AlertTriangle className="w-4 h-4" />
                                        <h3 className="font-bold text-sm">Challenges</h3>
                                    </div>
                                    <ul className="space-y-2">
                                        {metadata.topFailures.map((f, i) => (
                                            <li key={i} className="text-xs text-secondary/90 leading-relaxed list-disc list-inside marker:text-orange-500/50">
                                                {f}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="p-6 rounded-xl bg-white/5 border border-white/10 border-dashed text-center">
                            <p className="text-secondary/50 text-sm italic">Standard metadata not available for this project.</p>
                        </div>
                    )}
                </motion.div>

            </div>
        </motion.div>
    );
};
