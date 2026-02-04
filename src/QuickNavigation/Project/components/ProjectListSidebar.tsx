import { type GithubRepo } from '@/services/githubService';
import { Star, GitFork, Search, Trophy } from 'lucide-react';

interface ProjectListSidebarProps {
    projects: GithubRepo[];
    selectedId: number | null;
    onSelect: (repo: GithubRepo) => void;
    flagship: GithubRepo | null;
}

export const ProjectListSidebar = ({ projects, selectedId, onSelect, flagship }: ProjectListSidebarProps) => {
    return (
        <div className="h-full flex flex-col bg-white/5 border-r border-white/10 w-full md:w-[320px] ls:w-[360px] flex-shrink-0 backdrop-blur-md">
            {/* Header */}
            <div className="p-4 border-b border-white/10">
                <h3 className="text-white font-bold mb-4">Project Explorer</h3>
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary" />
                    <input
                        type="text"
                        placeholder="Filter projects..."
                        className="w-full bg-black/40 border border-white/10 rounded-xl py-2 pl-9 pr-4 text-sm text-white focus:outline-none focus:border-gold-glow/50 transition-colors"
                    />
                </div>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                <div className="flex flex-col p-2 gap-1">
                    {/* Flagship Pinned */}
                    {flagship && (
                        <div className="mb-2">
                            <div className="px-3 py-1.5 text-xs font-bold text-gold-glow uppercase tracking-wider opacity-70">Flagship</div>
                            <button
                                onClick={() => onSelect(flagship)}
                                className={`w-full text-left p-3 rounded-xl transition-all duration-300 group relative overflow-hidden ${selectedId === flagship.id
                                        ? 'bg-gold-glow/10 border border-gold-glow/30'
                                        : 'hover:bg-white/5 border border-transparent hover:border-white/10'
                                    }`}
                            >
                                {/* Active Indicator Bar */}
                                {selectedId === flagship.id && (
                                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-gold-glow" />
                                )}

                                <div className="flex justify-between items-start pl-2">
                                    <div className="flex items-center gap-2">
                                        <Trophy className={`w-4 h-4 transition-colors ${selectedId === flagship.id ? 'text-gold-glow' : 'text-secondary group-hover:text-gold-glow'}`} />
                                        <span className={`font-medium transition-colors ${selectedId === flagship.id ? 'text-white' : 'text-secondary group-hover:text-white'}`}>
                                            {flagship.name}
                                        </span>
                                    </div>
                                </div>
                            </button>
                        </div>
                    )}

                    <div className="h-px bg-white/5 my-2 mx-2" />

                    {/* All Projects */}
                    <div className="px-3 py-1.5 text-xs font-medium text-secondary/50 uppercase tracking-wider">All Projects</div>
                    {projects.map((repo, idx) => (
                        <div
                            key={repo.id}
                            className={`transform transition-all duration-500`}
                            style={{ animationDelay: `${idx * 50}ms` }}
                        >
                            <button
                                onClick={() => onSelect(repo)}
                                className={`w-full text-left p-3 rounded-xl transition-all duration-200 group relative overflow-hidden ${selectedId === repo.id
                                        ? 'bg-white/10 border border-white/20 translate-x-1'
                                        : 'hover:bg-white/5 border border-transparent hover:translate-x-1'
                                    }`}
                            >
                                {/* Active Indicator Bar */}
                                {selectedId === repo.id && (
                                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-white/50" />
                                )}

                                <div className="flex justify-between items-start mb-1 pl-2">
                                    <span className={`font-medium line-clamp-1 transition-colors ${selectedId === repo.id ? 'text-white' : 'text-secondary group-hover:text-white'}`}>
                                        {repo.name}
                                    </span>
                                </div>
                                <div className="flex items-center gap-3 text-xs text-secondary/60 pl-2">
                                    <div className="flex items-center gap-1">
                                        <Star className="w-3 h-3" /> {repo.stargazers_count}
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <GitFork className="w-3 h-3" /> {repo.forks_count}
                                    </div>
                                </div>
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
