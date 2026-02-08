import { githubService, type GithubRepo } from '@/services/githubService';
import { ExternalLink, Github, AlertTriangle, CheckCircle, X, Terminal, Code2 } from 'lucide-react';
import { getProjectMetadata } from '@/data/projectsData';
import { motion, type Variants } from 'framer-motion';
import { useEffect, useState } from 'react';
import { extractOwnerFromGithubUrl } from '@/utils/githubHelpers';
import { logger } from '@/utils/logger';

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

            // SAFE: Validate URL structure before using
            const owner = extractOwnerFromGithubUrl(repo.html_url);

            if (!owner) {
                logger.error('[ProjectDetailView] Cannot fetch commits: invalid repository URL', repo.html_url);
                setLoadingCommits(false);
                return;
            }

            setLoadingCommits(true);

            try {
                const count = await githubService.fetchCommitCount(owner, repo.name);

                if (isMounted) {
                    setCommits(count);
                    setLoadingCommits(false);
                }
            } catch (error) {
                logger.error('[ProjectDetailView] Failed to fetch commits', error);
                if (isMounted) {
                    setLoadingCommits(false);
                }
            }
        };

        fetchCommits();

        return () => {
            isMounted = false;
        };
    }, [repo.name, repo.html_url]);

    const formatDate = (dateStr: string) => {
        return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    };

    // Editorial Animation Variants
    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.08,
                delayChildren: 0.1
            }
        }
    };

    const slideInLeft: Variants = {
        hidden: { opacity: 0, x: -40 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
    };

    const slideInRight: Variants = {
        hidden: { opacity: 0, x: 40 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
    };

    const fadeInUp: Variants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
    };

    return (
        <motion.div
            key={repo.id}
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="flex-1 h-full relative bg-black overflow-y-auto"
        >
            {/* Diagonal Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 right-0 w-[800px] h-[2px] bg-gradient-to-r from-transparent via-gold-glow/20 to-transparent rotate-[-5deg] translate-y-40"></div>
                <div className="absolute bottom-0 left-0 w-[600px] h-[1px] bg-gradient-to-r from-emerald-500/20 via-transparent to-transparent rotate-[8deg] -translate-y-60"></div>
                <div className="absolute top-20 left-10 w-[1px] h-[400px] bg-gradient-to-b from-blue-500/10 to-transparent"></div>
            </div>

            {/* Close Button - Fixed top right */}
            <motion.button
                variants={fadeInUp}
                onClick={onClose}
                className="fixed top-6 right-6 z-50 p-3 rounded-2xl bg-black/80 backdrop-blur-md border border-white/10 text-white/70 hover:text-white hover:bg-red-500/10 hover:border-red-500/30 transition-all"
                aria-label="Close details"
            >
                <X className="w-5 h-5" />
            </motion.button>

            {/* MAGAZINE LAYOUT */}
            <div className="relative px-8 md:px-16 py-12 max-w-[1600px] mx-auto">

                {/* MASSIVE TITLE - Editorial Style */}
                <motion.div variants={slideInLeft} className="mb-12 relative">
                    {/* Small eyebrow */}
                    <div className="flex items-center gap-3 mb-4">
                        <Code2 className="w-4 h-4 text-gold-glow" />
                        <span className="text-xs font-mono text-gold-glow/70 uppercase tracking-[0.3em]">
                            Project Archive
                        </span>
                    </div>

                    {/* Huge Title */}
                    <h1 className="text-6xl md:text-8xl font-black text-white leading-[0.9] tracking-tight mb-6">
                        {displayName}
                    </h1>

                    {/* Language badge positioned creatively */}
                    <div className="absolute -left-4 top-0 -rotate-90 origin-left">
                        {repo.language && (
                            <div className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold ${getLanguageColor(repo.language)}`}>
                                {repo.language}
                            </div>
                        )}
                    </div>
                </motion.div>

                {/* DIAGONAL DIVIDER */}
                <motion.div variants={fadeInUp} className="h-[1px] bg-gradient-to-r from-white/20 via-gold-glow/40 to-transparent mb-16 -rotate-1"></motion.div>

                {/* ASYMMETRIC GRID LAYOUT */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                    {/* LEFT COLUMN - Terminal Style Stats */}
                    <motion.div variants={slideInLeft} className="lg:col-span-4 space-y-6">

                        {/* TERMINAL STATS PANEL */}
                        <div className="relative p-6 bg-black/60 backdrop-blur-sm border border-emerald-500/20 rounded-2xl overflow-hidden">
                            {/* Terminal header */}
                            <div className="flex items-center gap-2 mb-6 pb-3 border-b border-emerald-500/20">
                                <Terminal className="w-4 h-4 text-emerald-400" />
                                <span className="text-xs font-mono text-emerald-400/80">sys.stats</span>
                                <div className="flex-1"></div>
                                <div className="flex gap-1.5">
                                    <div className="w-2 h-2 rounded-full bg-red-500/50"></div>
                                    <div className="w-2 h-2 rounded-full bg-yellow-500/50"></div>
                                    <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                                </div>
                            </div>

                            {/* Terminal-style stats */}
                            <div className="space-y-3 font-mono text-sm">
                                <div className="flex items-baseline gap-3">
                                    <span className="text-emerald-500">$</span>
                                    <span className="text-white/50">commits:</span>
                                    <span className="text-white font-bold text-2xl ml-auto">{loadingCommits ? "..." : commits?.toLocaleString() ?? "N/A"}</span>
                                </div>
                                <div className="flex items-baseline gap-3">
                                    <span className="text-emerald-500">$</span>
                                    <span className="text-white/50">created:</span>
                                    <span className="text-white/80 ml-auto">{formatDate(repo.created_at)}</span>
                                </div>
                                <div className="flex items-baseline gap-3">
                                    <span className="text-emerald-500">$</span>
                                    <span className="text-white/50">updated:</span>
                                    <span className="text-white/80 ml-auto">{formatDate(repo.updated_at)}</span>
                                </div>
                            </div>

                            {/* Scan line effect */}
                            <div className="absolute inset-0 pointer-events-none">
                                <motion.div
                                    className="absolute inset-x-0 h-[1px] bg-emerald-500/30"
                                    animate={{ top: ['0%', '100%'] }}
                                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                />
                            </div>
                        </div>

                        {/* ACTIONS - Clean Buttons */}
                        <div className="flex flex-col gap-3">
                            {repo.homepage && (
                                <a
                                    href={repo.homepage}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-between px-6 py-4 bg-gold-glow text-black font-bold rounded-xl hover:scale-[1.02] transition-transform"
                                >
                                    <span>Launch Project</span>
                                    <ExternalLink className="w-5 h-5" />
                                </a>
                            )}
                            <a
                                href={repo.html_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-between px-6 py-4 bg-white/5 border border-white/10 text-white font-medium rounded-xl hover:bg-white/10 transition-colors"
                            >
                                <span>View Source</span>
                                <Github className="w-5 h-5" />
                            </a>
                        </div>

                        {/* TOPICS - Vertical Pills */}
                        {repo.topics && repo.topics.length > 0 && (
                            <div className="space-y-2">
                                <p className="text-xs font-mono text-white/50 uppercase tracking-wider">Tags</p>
                                <div className="flex flex-wrap gap-2">
                                    {repo.topics.map(topic => (
                                        <span key={topic} className="px-3 py-1 rounded-full text-xs font-mono bg-white/5 text-white/70 border border-white/10">
                                            #{topic}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </motion.div>

                    {/* RIGHT COLUMN - Content */}
                    <motion.div variants={slideInRight} className="lg:col-span-8 space-y-12">

                        {/* DESCRIPTION - Magazine Pull Quote Style */}
                        <div className="relative">
                            {/* Giant quote mark */}
                            <div className="absolute -left-6 -top-4 text-8xl font-serif text-gold-glow/10 leading-none">"</div>
                            <div className="relative pl-6 border-l-4 border-gold-glow/30">
                                <p className="text-2xl md:text-3xl font-light text-white/90 leading-relaxed italic">
                                    {displayDescription}
                                </p>
                            </div>
                        </div>

                        {/* TECH STACK - Bento Grid Style */}
                        {metadata?.techStack && (
                            <div className="space-y-6">
                                <div className="flex items-baseline gap-4">
                                    <h3 className="text-4xl font-black text-white">Stack</h3>
                                    <div className="flex-1 h-[2px] bg-gradient-to-r from-white/20 to-transparent"></div>
                                </div>

                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {metadata.techStack.flatMap(cat => cat.items).map((item, idx) => (
                                        <motion.div
                                            key={idx}
                                            whileHover={{ scale: 1.05, rotate: -2 }}
                                            className="group relative p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-white/30 transition-all overflow-hidden"
                                        >
                                            {/* Icon */}
                                            <div
                                                className="w-8 h-8 mb-3"
                                                style={{ color: item.color ? `#${item.color}` : (item.icon?.hex ? `#${item.icon.hex}` : '#ffffff') }}
                                            >
                                                {item.icon ? (
                                                    <svg role="img" viewBox="0 0 24 24" className="w-full h-full fill-current">
                                                        <path d={item.icon.path} />
                                                    </svg>
                                                ) : (
                                                    <div className="w-full h-full bg-current rounded-full opacity-20" />
                                                )}
                                            </div>
                                            {/* Name */}
                                            <p className="text-sm font-bold text-white">{item.name}</p>

                                            {/* Hover glow */}
                                            <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* FEATURES & CHALLENGES - Side by Side Cards with Rotated Headers */}
                        {metadata && (metadata.topFeatures?.length || metadata.topFailures?.length) && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                                {/* FEATURES */}
                                {metadata.topFeatures && metadata.topFeatures.length > 0 && (
                                    <div className="relative p-6 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-black/50 border border-emerald-500/20 overflow-hidden">
                                        {/* Rotated header on the left edge */}
                                        <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 -rotate-90 origin-center">
                                            <div className="flex items-center gap-2 px-4 py-2 bg-emerald-500 text-black rounded-full whitespace-nowrap">
                                                <CheckCircle className="w-4 h-4" />
                                                <span className="text-sm font-black uppercase tracking-wider">Features</span>
                                            </div>
                                        </div>

                                        <ul className="space-y-3 pl-8">
                                            {metadata.topFeatures.map((f, i) => (
                                                <li key={i} className="flex items-start gap-3 text-sm text-emerald-100/90">
                                                    <span className="text-emerald-400 mt-0.5">▸</span>
                                                    <span className="leading-relaxed">{f}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {/* CHALLENGES */}
                                {metadata.topFailures && metadata.topFailures.length > 0 && (
                                    <div className="relative p-6 rounded-2xl bg-gradient-to-br from-orange-500/10 to-black/50 border border-orange-500/20 overflow-hidden">
                                        {/* Rotated header on the left edge */}
                                        <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 -rotate-90 origin-center">
                                            <div className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-black rounded-full whitespace-nowrap">
                                                <AlertTriangle className="w-4 h-4" />
                                                <span className="text-sm font-black uppercase tracking-wider">Challenges</span>
                                            </div>
                                        </div>

                                        <ul className="space-y-3 pl-8">
                                            {metadata.topFailures.map((f, i) => (
                                                <li key={i} className="flex items-start gap-3 text-sm text-orange-100/90">
                                                    <span className="text-orange-400 mt-0.5">▸</span>
                                                    <span className="leading-relaxed">{f}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        )}
                    </motion.div>
                </div>

                {/* BOTTOM CREDITS - Small footer */}
                <motion.div variants={fadeInUp} className="mt-20 pt-6 border-t border-white/10">
                    <p className="text-xs font-mono text-white/30 uppercase tracking-wider">
                        Project ID: {repo.id} • Repository: {repo.name} • Owner: {extractOwnerFromGithubUrl(repo.html_url)}
                    </p>
                </motion.div>
            </div>
        </motion.div>
    );
};
