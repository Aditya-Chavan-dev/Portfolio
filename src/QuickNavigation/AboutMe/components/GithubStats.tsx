import { useState, useEffect, Fragment } from 'react';
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
                    <div className="flex items-center justify-center h-full">
                        <div className="loader" />
                    </div>
                ) : (
                    <div className="flex items-center gap-8 h-full px-4 pt-10">
                        {/* Left: Stats Column - Distinct Cards */}
                        <div className="w-56 flex-shrink-0 flex flex-col gap-3 justify-center">
                            <div className="p-4 rounded-xl bg-white/5 border border-white/5 hover:border-gold-dim/30 hover:bg-white/10 transition-all cursor-pointer group/stat flex items-center justify-between">
                                <div>
                                    <p className="text-[10px] text-secondary mb-1 uppercase tracking-wide opacity-70">Total Commits</p>
                                    <p className="text-2xl font-bold text-white group-hover/stat:text-gold-glow transition-colors leading-none">
                                        {contributions?.total.lastYear || 0}
                                    </p>
                                </div>
                                <div className="w-8 h-8 rounded-lg bg-gold-dim/10 flex items-center justify-center">
                                    <span className="text-sm">🔥</span>
                                </div>
                            </div>
                            <div className="p-4 rounded-xl bg-white/5 border border-white/5 hover:border-emerald-500/30 hover:bg-white/10 transition-all cursor-pointer group/stat flex items-center justify-between">
                                <div>
                                    <p className="text-[10px] text-secondary mb-1 uppercase tracking-wide opacity-70">Active Projects</p>
                                    <p className="text-2xl font-bold text-white group-hover/stat:text-emerald-400 transition-colors leading-none">
                                        {stats?.public_repos || 0}
                                    </p>
                                </div>
                                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                                    <span className="text-sm">🚀</span>
                                </div>
                            </div>
                            <div className="p-4 rounded-xl bg-white/5 border border-white/5 hover:border-blue-500/30 hover:bg-white/10 transition-all cursor-pointer group/stat flex items-center justify-between">
                                <div>
                                    <p className="text-[10px] text-secondary mb-1 uppercase tracking-wide opacity-70">Current Streak</p>
                                    <p className="text-2xl font-bold text-white group-hover/stat:text-blue-400 transition-colors leading-none">
                                        {streak}
                                    </p>
                                </div>
                                <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                                    <span className="text-sm">⚡</span>
                                </div>
                            </div>
                        </div>

                        {/* Vertical Divider */}
                        <div className="w-px h-2/3 bg-gradient-to-b from-transparent via-white/10 to-transparent" />

                        {/* Right: Contribution Heatmap */}
                        <div className="flex-1 min-w-0 h-full flex items-center justify-start pl-6">
                            <div className="w-full overflow-hidden flex justify-start">
                                {/* Scrollable container with fixed day labels */}
                                <div className="flex gap-4">
                                    {/* Fixed Day labels column */}
                                    <div className="flex flex-col gap-[3px] pt-6 flex-shrink-0">
                                        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, i) => (
                                            <div key={i} className="text-[9px] text-secondary/50 h-[10px] flex items-center leading-none">
                                                {i % 2 === 1 ? day : ''}
                                            </div>
                                        ))}
                                    </div>

                                    {/* Scrollable Month labels and Grid */}
                                    <div className="overflow-visible">
                                        {(() => {
                                            const contributions_data = contributions?.contributions || [];
                                            if (contributions_data.length === 0) return null;

                                            // Organize contributions into weeks
                                            // Show last 52 weeks (1 year)
                                            const TOTAL_WEEKS_TO_SHOW = 52;

                                            // Calculate start date: Go back 52 weeks from the last contribution date
                                            const lastContribDate = new Date(contributions_data[contributions_data.length - 1]?.date);
                                            const startDate = new Date(lastContribDate);
                                            startDate.setDate(startDate.getDate() - (TOTAL_WEEKS_TO_SHOW * 7));

                                            // Align to the previous Sunday
                                            startDate.setDate(startDate.getDate() - startDate.getDay());

                                            // Build a map for quick lookup
                                            const contributionMap = new Map(
                                                contributions_data.map((c: ContributionDay) => [c.date, c.count])
                                            );

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
                                                <div className="flex flex-wrap md:flex-nowrap gap-1">
                                                    {weeks.map((week, idx) => (
                                                        <Fragment key={idx}>
                                                            {/* Forced break for mobile after 26 weeks (6 months) */}
                                                            {idx === 26 && (
                                                                <div className="basis-full h-8 md:hidden" key="mobile-break" />
                                                            )}

                                                            <div className="flex flex-col gap-1">
                                                                {/* Month Label container */}
                                                                <div className="h-4 relative w-3.5 mb-2">
                                                                    {week.monthLabel && (
                                                                        <span className="absolute top-0 left-0 text-[10px] text-secondary/80 font-medium whitespace-nowrap">
                                                                            {week.monthLabel}
                                                                        </span>
                                                                    )}
                                                                </div>

                                                                {/* Days Column */}
                                                                <div className="flex flex-col gap-1">
                                                                    {week.days.map((day, dayIndex) => {
                                                                        const dateStr = day.date.toLocaleDateString('en-US', {
                                                                            year: 'numeric',
                                                                            month: 'short',
                                                                            day: 'numeric'
                                                                        });
                                                                        return (
                                                                            <div
                                                                                key={dayIndex}
                                                                                className={`w-3.5 h-3.5 rounded-sm ${getContributionColor(day.count)} border border-black/10 hover:ring-1 hover:ring-white/50 transition-all cursor-pointer`}
                                                                                title={`${dateStr}: ${day.count} contributions`}
                                                                            />
                                                                        );
                                                                    })}
                                                                </div>
                                                            </div>
                                                        </Fragment>
                                                    ))}
                                                </div>
                                            );
                                        })()}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div >
    );
};
