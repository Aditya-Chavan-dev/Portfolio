import { useState, useEffect } from 'react';
import { Github } from 'lucide-react';
import { githubService, type ContributionDay } from '@/services/githubService';
import { ABOUT_ME_DATA } from '@/data/aboutMeData';

export const GithubStats = () => {
    const [stats, setStats] = useState<any>(null);
    const [contributions, setContributions] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [githubStats, githubContribs] = await Promise.all([
                    githubService.fetchUserStats(ABOUT_ME_DATA.personal.github),
                    githubService.fetchContributions(ABOUT_ME_DATA.personal.github)
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

    // Calculate current streak using the service method
    const streak = contributions?.contributions
        ? githubService.calculateStreak(contributions.contributions)
        : 0;

    // GitHub's actual color scheme
    const getContributionColor = (count: number) => {
        if (count === 0) return 'bg-[#161b22]'; // GitHub's empty cell color
        if (count < 5) return 'bg-[#0e4429]';   // Level 1
        if (count < 10) return 'bg-[#006d32]';  // Level 2
        if (count < 20) return 'bg-[#26a641]';  // Level 3
        return 'bg-[#39d353]';                   // Level 4
    };

    return (
        <div className="glass-panel p-2.5 rounded-2xl border border-white/10 h-full relative overflow-hidden hover:border-gold-dim/20 transition-all duration-300 group">
            {/* Animated background glow */}
            <div className="absolute inset-0 bg-gradient-to-bl from-gold-glow/0 via-gold-dim/5 to-gold-glow/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative z-10 h-full flex flex-col">
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

                        {/* Contribution Heatmap - GitHub Style */}
                        <div className="glass-panel p-5 rounded-2xl border border-white/5 w-full overflow-hidden">
                            <div className="flex flex-col gap-3">
                                {/* Scrollable container with fixed day labels */}
                                <div className="flex gap-4 w-full">
                                    {/* Fixed Day labels column */}
                                    <div className="flex flex-col gap-[3px] pt-6 flex-shrink-0">
                                        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, i) => (
                                            <div key={i} className="text-[10px] text-secondary/50 h-[10px] flex items-center">
                                                {i % 2 === 1 ? day : ''}
                                            </div>
                                        ))}
                                    </div>

                                    {/* Scrollable Month labels and Grid */}
                                    <div className="flex-1 overflow-x-auto scrollbar-hide">
                                        {(() => {
                                            const contributions_data = contributions?.contributions || [];
                                            if (contributions_data.length === 0) return null;

                                            // Organize contributions into weeks
                                            // We want to show the last 30 weeks to fit the container (~6-7 months)
                                            const TOTAL_WEEKS_TO_SHOW = 30;

                                            // Calculate start date: Go back 30 weeks from the last contribution date
                                            const lastContribDate = new Date(contributions_data[contributions_data.length - 1]?.date);
                                            const startDate = new Date(lastContribDate);
                                            startDate.setDate(startDate.getDate() - (TOTAL_WEEKS_TO_SHOW * 7));

                                            // Align to the previous Sunday
                                            startDate.setDate(startDate.getDate() - startDate.getDay());

                                            // Build a map for quick lookup
                                            const contributionMap = new Map(
                                                contributions_data.map((c: ContributionDay) => [c.date, c.count])
                                            );

                                            // Generate weeks of data with month tracking
                                            const weeks: Array<{
                                                days: Array<{ date: Date; count: number }>;
                                                monthLabel?: string;
                                            }> = [];

                                            let currentDate = new Date(startDate);
                                            let lastMonth = -1;

                                            for (let weekIdx = 0; weekIdx < TOTAL_WEEKS_TO_SHOW; weekIdx++) {
                                                const weekDays: Array<{ date: Date; count: number }> = [];

                                                for (let dayIdx = 0; dayIdx < 7; dayIdx++) {
                                                    const dateStr = currentDate.toISOString().split('T')[0];
                                                    const count = (contributionMap.get(dateStr) ?? 0) as number;
                                                    weekDays.push({ date: new Date(currentDate), count });
                                                    currentDate.setDate(currentDate.getDate() + 1);
                                                }

                                                // Check if this week starts a new month
                                                const firstDayOfWeek = weekDays[0].date;
                                                const currentMonth = firstDayOfWeek.getMonth();

                                                let monthLabel: string | undefined;
                                                // Only show label if month changed
                                                if (currentMonth !== lastMonth) {
                                                    monthLabel = firstDayOfWeek.toLocaleDateString('en-US', { month: 'short' });
                                                    lastMonth = currentMonth;
                                                }

                                                weeks.push({ days: weekDays, monthLabel });
                                            }

                                            return (
                                                <div className="min-w-max">
                                                    {/* Month labels row */}
                                                    <div className="flex gap-[3px] mb-2 h-4 relative">
                                                        {weeks.map((week, idx) => (
                                                            <div key={idx} className="relative" style={{ width: '10px' }}>
                                                                {week.monthLabel && (
                                                                    <span className="absolute top-0 left-0 text-[10px] text-secondary/80 font-medium whitespace-nowrap">
                                                                        {week.monthLabel}
                                                                    </span>
                                                                )}
                                                            </div>
                                                        ))}
                                                    </div>

                                                    {/* Contribution grid */}
                                                    <div className="flex gap-[3px]">
                                                        {/* Week columns */}
                                                        <div className="flex gap-[3px]">
                                                            {weeks.map((week, weekIndex) => (
                                                                <div key={weekIndex} className="flex flex-col gap-[3px]">
                                                                    {week.days.map((day, dayIndex) => {
                                                                        const dateStr = day.date.toLocaleDateString('en-US', {
                                                                            year: 'numeric',
                                                                            month: 'short',
                                                                            day: 'numeric'
                                                                        });
                                                                        return (
                                                                            <div
                                                                                key={dayIndex}
                                                                                className={`w-[10px] h-[10px] rounded-[2px] ${getContributionColor(day.count)} border border-black/10 hover:ring-1 hover:ring-white/50 transition-all cursor-pointer`}
                                                                                title={`${dateStr}: ${day.count} contributions`}
                                                                            />
                                                                        );
                                                                    })}
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })()}
                                    </div>
                                </div>

                                {/* Legend */}
                                <div className="flex items-center justify-end gap-1.5 mt-2 px-1">
                                    <span className="text-[10px] text-secondary/70">Less</span>
                                    <div className="flex gap-[3px]">
                                        {[0, 1, 2, 3, 4].map((level) => (
                                            <div
                                                key={level}
                                                className={`w-[10px] h-[10px] rounded-[2px] ${getContributionColor(level * 5)} border border-black/10`}
                                            />
                                        ))}
                                    </div>
                                    <span className="text-[10px] text-secondary/70">More</span>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div >
    );
};
