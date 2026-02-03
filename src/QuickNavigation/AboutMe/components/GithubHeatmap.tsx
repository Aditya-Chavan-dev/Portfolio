import { useGithubData } from '../hooks/useGithubData';
import { Github } from 'lucide-react';
import { Fragment } from 'react';

export const GithubHeatmap = () => {
    const { contributions, loading } = useGithubData();

    // GitHub's actual color scheme
    const getContributionColor = (count: number) => {
        if (count === 0) return 'bg-[#161b22]'; // GitHub's empty cell color
        if (count < 5) return 'bg-[#0e4429]';   // Level 1
        if (count < 10) return 'bg-[#006d32]';  // Level 2
        if (count < 20) return 'bg-[#26a641]';  // Level 3
        return 'bg-[#39d353]';                   // Level 4
    };

    return (
        <div className="glass-panel p-4 rounded-2xl border border-white/10 h-full relative overflow-hidden hover:border-gold-dim/20 transition-all duration-300 group flex flex-col">
            {/* Animated background glow */}
            <div className="absolute inset-0 bg-gradient-to-t from-gold-glow/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            <h3 className="text-xs font-bold mb-3 flex items-center gap-2 flex-shrink-0">
                <div className="w-6 h-6 rounded-lg bg-white/5 flex items-center justify-center">
                    <Github className="w-3.5 h-3.5 text-white/80" />
                </div>
                <span className="text-white/90">Github Activity</span>
            </h3>

            {loading ? (
                <div className="flex-1 flex items-center justify-center">
                    <div className="loader" />
                </div>
            ) : (
                <div className="flex-1 flex items-center justify-center w-full overflow-hidden">
                    {/* Heatmap Container */}
                    <div className="overflow-visible flex items-center justify-center">
                        {(() => {
                            const contributions_data = contributions?.contributions || [];
                            if (contributions_data.length === 0) return null;

                            // Organize contributions into weeks
                            // Show last 52 weeks (1 year)
                            const TOTAL_WEEKS_TO_SHOW = 52;

                            // Anchor to TODAY, not the last contribution
                            const today = new Date();
                            const startDate = new Date(today);
                            startDate.setDate(today.getDate() - (TOTAL_WEEKS_TO_SHOW * 7));

                            // Align to the previous Sunday
                            startDate.setDate(startDate.getDate() - startDate.getDay());

                            // Build a map for quick lookup
                            const contributionMap = new Map(
                                contributions_data.map((c: any) => [c.date, c.count])
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
                                <div className="flex flex-col h-full w-full">
                                    <div className="flex-1 overflow-x-auto scrollbar-hide w-full">
                                        <div className="flex gap-1 min-w-max px-4 md:px-0">
                                            {weeks.map((week, weekIndex) => (
                                                <div key={weekIndex} className="flex flex-col gap-1">
                                                    <div className="flex flex-col gap-1">
                                                        {/* Month Label container */}
                                                        <div className="h-4 relative w-2.5 mb-2">
                                                            {week.monthLabel && (
                                                                <span className="absolute top-0 left-0 text-[9px] text-secondary/80 font-medium whitespace-nowrap">
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
                                                                        key={`${weekIndex}-${dayIndex}`}
                                                                        className={`w-2.5 h-2.5 rounded-[2px] ${getContributionColor(day.count)} border border-black/10 hover:ring-1 hover:ring-white/50 transition-all cursor-pointer`}
                                                                        title={`${dateStr}: ${day.count} contributions`}
                                                                    />
                                                                );
                                                            })}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            );
                        })()}
                    </div>
                </div>
            )}
        </div>
    );
};
