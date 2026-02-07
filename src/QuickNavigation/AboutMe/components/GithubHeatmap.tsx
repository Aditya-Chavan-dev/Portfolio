import { useGithubData } from '../hooks/useGithubData';
import { Github } from 'lucide-react';

export const GithubHeatmap = () => {
    // Consume the pre-calculated grid from our audit-hardened hook
    const { heatmapGrid, loading } = useGithubData();

    // GitHub's official color scale (strict mapping)
    const getContributionColor = (count: number) => {
        if (count === 0) return 'bg-[#161b22]'; // Empty
        if (count < 5) return 'bg-[#0e4429]';   // Level 1
        if (count < 10) return 'bg-[#006d32]';  // Level 2
        if (count < 20) return 'bg-[#26a641]';  // Level 3
        return 'bg-[#39d353]';                   // Level 4
    };

    return (
        <div className="glass-panel p-4 rounded-2xl border-white-10 h-full relative overflow-hidden hover:border-gold-dim/20 transition-fast group flex flex-col items-center justify-center">
            {/* Animated background glow */}
            <div className="card-gradient-overlay" />

            <h3 className="text-xs font-bold mb-4 flex items-center gap-2 flex-shrink-0 self-start w-full">
                <div className="w-6 h-6 rounded-lg bg-white/5 flex-center">
                    <Github className="w-3.5 h-3.5 text-white/80" />
                </div>
                <span className="text-white/90">Github Activity</span>
            </h3>

            {loading ? (
                <div className="flex-1 flex-center w-full">
                    <div className="loader" />
                </div>
            ) : (
                <div className="flex flex-col gap-2 overflow-x-auto scrollbar-hide max-w-full pb-2">
                    <div className="flex gap-3">
                        {/* Day Labels (Left Axis) */}
                        <div className="flex flex-col gap-1 mt-[26px]">
                            {/* Adjusted top spacer for larger cells/month header */}
                            <div className="h-3" /> {/* Spacer */}
                            <span className="text-2xs text-secondary h-3 flex items-center leading-none">Mon</span>
                            <div className="h-3" />
                            <span className="text-2xs text-secondary h-3 flex items-center leading-none">Wed</span>
                            <div className="h-3" />
                            <span className="text-2xs text-secondary h-3 flex items-center leading-none">Fri</span>
                            <div className="h-3" />
                        </div>

                        {/* Heatmap Grid */}
                        <div className="flex flex-col gap-1">
                            {/* Month Labels (Top Axis) */}
                            <div className="flex gap-1 h-4 relative">
                                {heatmapGrid && heatmapGrid.map((week, i) => (
                                    <div key={i} className={`w-3 flex flex-col justify-end relative ${week.monthLabel && i > 0 ? 'ml-3' : ''}`}>
                                        {week.monthLabel && (
                                            <span className="absolute top-0 left-0 text-2xs text-secondary whitespace-nowrap font-medium">
                                                {week.monthLabel}
                                            </span>
                                        )}
                                    </div>
                                ))}
                            </div>

                            {/* Cells */}
                            <div className="flex gap-1">
                                {heatmapGrid && heatmapGrid.map((week, weekIndex) => (
                                    <div key={weekIndex} className={`flex flex-col gap-1 ${week.monthLabel && weekIndex > 0 ? 'ml-3' : ''}`}>
                                        {week.days && week.days.map((day, dayIndex) => {
                                            const date = new Date(day.date);
                                            const dateStr = date.toLocaleDateString('en-US', {
                                                month: 'short',
                                                day: 'numeric',
                                                year: 'numeric'
                                            });
                                            return (
                                                <div
                                                    key={`${weekIndex}-${dayIndex}`}
                                                    className={`w-3 h-3 rounded-[2px] ${getContributionColor(day.count)} border border-black/10 hover:ring-1 hover:ring-white/50 transition-all cursor-pointer`}
                                                    title={`${day.count} contributions on ${dateStr}`}
                                                    aria-label={`${day.count} contributions on ${dateStr}`}
                                                    role="gridcell"
                                                />
                                            );
                                        })}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Footer Legend */}
                    <div className="flex items-center justify-between pl-8 mt-2 w-full">
                        <a href="https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-github-profile/managing-contribution-settings-on-your-profile/why-are-my-contributions-not-showing-up-on-my-profile" target="_blank" rel="noopener noreferrer" className="text-2xs text-secondary/60 hover:text-gold-glow transition-colors">
                            Learn how we count contributions
                        </a>
                        <div className="flex items-center gap-1.5">
                            <span className="text-2xs text-secondary mr-1">Less</span>
                            <div className="w-3 h-3 rounded-[2px] bg-[#161b22] border-white-5" />
                            <div className="w-3 h-3 rounded-[2px] bg-[#0e4429] border-white-5" />
                            <div className="w-3 h-3 rounded-[2px] bg-[#006d32] border-white-5" />
                            <div className="w-3 h-3 rounded-[2px] bg-[#26a641] border-white-5" />
                            <div className="w-3 h-3 rounded-[2px] bg-[#39d353] border-white-5" />
                            <span className="text-2xs text-secondary ml-1">More</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
