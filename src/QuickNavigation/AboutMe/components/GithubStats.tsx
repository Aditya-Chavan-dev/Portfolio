import { useState, useEffect } from 'react';
import { Github } from 'lucide-react';
import { getGitHubStats, getGitHubContributions } from '@/services/githubService';
import { ABOUT_ME_DATA } from '@/data/aboutMeData';

export const GithubStats = () => {
    const [stats, setStats] = useState<any>(null);
    const [contributions, setContributions] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [githubStats, githubContribs] = await Promise.all([
                    getGitHubStats(ABOUT_ME_DATA.personal.github),
                    getGitHubContributions(ABOUT_ME_DATA.personal.github)
                ]);
                setStats(githubStats);
                setContributions(githubContribs);
            } catch (error) {
                console.error('Error fetching GitHub data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Calculate current streak
    const calculateStreak = () => {
        if (!contributions?.contributions) return 0;
        const days = contributions.contributions;
        let streak = 0;
        const today = new Date();

        for (let i = days.length - 1; i >= 0; i--) {
            const day = days[i];
            if (day.count > 0) streak++;
            else break;
        }

        return streak;
    };

    const streak = calculateStreak();

    const getContributionColor = (count: number) => {
        if (count === 0) return 'bg-white/10';
        if (count < 5) return 'bg-yellow-900/50';
        if (count < 10) return 'bg-yellow-600/70';
        if (count < 20) return 'bg-yellow-400/90';
        return 'bg-yellow-300';
    };

    return (
        <div className="glass-panel p-2.5 rounded-2xl border border-white/10 relative overflow-hidden hover:border-gold-dim/20 transition-all duration-300 group">
            {/* Animated background glow */}
            <div className="absolute inset-0 bg-gradient-to-bl from-gold-glow/0 via-gold-dim/5 to-gold-glow/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative z-10">
                <h3 className="text-xs font-bold mb-2 flex items-center gap-1.5">
                    <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-gold-dim/20 to-gold-glow/10 border border-gold-dim/30 flex items-center justify-center">
                        <Github className="w-4 h-4 text-gold-glow" />
                    </div>
                    <span className="bg-gradient-to-r from-white to-secondary bg-clip-text text-transparent">
                        Github Activity <span className="text-gold-dim">(Realtime)</span>
                    </span>
                </h3>

                {loading ? (
                    <div className="flex items-center justify-center h-24">
                        <div className="loader" />
                    </div>
                ) : (
                    <>
                        {/* Stats Grid */}
                        <div className="grid grid-cols-3 gap-2 mb-2">
                            <div className="glass-panel p-2 rounded-xl border border-white/5 hover:border-gold-dim/30 transition-all cursor-pointer group/stat">
                                <p className="text-[9px] text-secondary mb-0.5 uppercase tracking-wide">Total</p>
                                <p className="text-xl font-bold bg-gradient-to-br from-white to-secondary bg-clip-text text-transparent group-hover/stat:from-gold-glow group-hover/stat:to-gold-muted transition-all">
                                    {contributions?.total.lastYear || 0}
                                </p>
                                <p className="text-[8px] text-gold-muted uppercase">Commits</p>
                            </div>
                            <div className="glass-panel p-2 rounded-xl border border-white/5 hover:border-emerald-500/30 transition-all cursor-pointer group/stat">
                                <p className="text-[9px] text-secondary mb-0.5 uppercase tracking-wide">Projects</p>
                                <p className="text-xl font-bold bg-gradient-to-br from-emerald-400 to-emerald-600 bg-clip-text text-transparent">
                                    {stats?.public_repos || 0}
                                </p>
                                <p className="text-[8px] text-emerald-400/70 uppercase">Active</p>
                            </div>
                            <div className="glass-panel p-2 rounded-xl border border-white/5 hover:border-blue-500/30 transition-all cursor-pointer group/stat">
                                <p className="text-[9px] text-secondary mb-0.5 uppercase tracking-wide">Streak</p>
                                <p className="text-xl font-bold bg-gradient-to-br from-blue-400 to-blue-600 bg-clip-text text-transparent">
                                    {streak}
                                </p>
                                <p className="text-[8px] text-blue-400/70 uppercase">Days</p>
                            </div>
                        </div>

                        {/* Contribution Heatmap - Compact */}
                        <div className="glass-panel p-2 rounded-xl border border-white/5">
                            <div className="space-y-0.5">
                                {['Mon', 'Wed', 'Fri'].map((day, dayIndex) => (
                                    <div key={day} className="flex items-center gap-1">
                                        <span className="text-[8px] text-secondary w-6">{day}</span>
                                        <div className="flex gap-0.5">
                                            {Array.from({ length: 52 }, (_, weekIndex) => {
                                                const contributions_data = contributions?.contributions || [];
                                                const dayOffset = weekIndex * 7 + dayIndex * 2;
                                                const contribution_count = contributions_data[dayOffset]?.count || 0;
                                                return (
                                                    <div
                                                        key={weekIndex}
                                                        className={`w-1.5 h-1.5 rounded-sm ${getContributionColor(contribution_count)} hover:ring-1 hover:ring-gold-glow transition-all cursor-pointer`}
                                                        title={`${contribution_count} contributions`}
                                                    />
                                                );
                                            })}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="flex items-center justify-end gap-1 mt-1.5">
                                <span className="text-[8px] text-secondary">Less</span>
                                <div className="flex gap-0.5">
                                    {[0, 1, 2, 3, 4].map((level) => (
                                        <div key={level} className={`w-1.5 h-1.5 rounded-sm ${getContributionColor(level * 5)}`} />
                                    ))}
                                </div>
                                <span className="text-[8px] text-secondary">More</span>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};
