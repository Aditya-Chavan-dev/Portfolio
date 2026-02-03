import { useGithubData } from '../hooks/useGithubData';

export const StatsCards = () => {
    const { stats, contributions, streak, loading } = useGithubData();

    if (loading) {
        return (
            <div className="w-full h-full glass-panel rounded-2xl border border-white/10 flex items-center justify-center">
                <div className="loader scale-75" />
            </div>
        );
    }

    return (
        <div className="grid grid-cols-3 gap-4 h-full">
            {/* Total Commits */}
            <div className="glass-panel p-3 rounded-2xl border border-white/10 hover:border-gold-dim/30 hover:bg-white/5 transition-all duration-300 group flex flex-col justify-center items-center relative overflow-hidden">
                <div className="absolute top-2 right-2 opacity-20 group-hover:opacity-100 transition-opacity">
                    <span className="text-xl">🔥</span>
                </div>
                <p className="text-2xl font-bold text-white group-hover:text-gold-glow transition-colors leading-none mb-1">
                    {contributions?.total.lastYear || 0}
                </p>
                <p className="text-[10px] text-secondary uppercase tracking-wider font-medium">Total Commits</p>
            </div>

            {/* Active Projects */}
            <div className="glass-panel p-3 rounded-2xl border border-white/10 hover:border-emerald-500/30 hover:bg-white/5 transition-all duration-300 group flex flex-col justify-center items-center relative overflow-hidden">
                <div className="absolute top-2 right-2 opacity-20 group-hover:opacity-100 transition-opacity">
                    <span className="text-xl">🚀</span>
                </div>
                <p className="text-2xl font-bold text-white group-hover:text-emerald-400 transition-colors leading-none mb-1">
                    {stats?.public_repos || 0}
                </p>
                <p className="text-[10px] text-secondary uppercase tracking-wider font-medium">Active Projects</p>
            </div>

            {/* Current Streak */}
            <div className="glass-panel p-3 rounded-2xl border border-white/10 hover:border-blue-500/30 hover:bg-white/5 transition-all duration-300 group flex flex-col justify-center items-center relative overflow-hidden">
                <div className="absolute top-2 right-2 opacity-20 group-hover:opacity-100 transition-opacity">
                    <span className="text-xl">⚡</span>
                </div>
                <p className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors leading-none mb-1">
                    {streak}
                </p>
                <p className="text-[10px] text-secondary uppercase tracking-wider font-medium">Current Streak</p>
            </div>
        </div>
    );
};
