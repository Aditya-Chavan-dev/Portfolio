
import { useEffect, useState } from 'react';
import { Github, GitCommit, Zap, Layers } from 'lucide-react';
import { githubService } from '@/services/githubService';
import type { GithubUser, GithubContributionResponse } from '@/services/githubService';
import { ABOUT_ME_DATA } from '@/data/aboutMeData';
import { useDeviceType } from '@/hooks/useDeviceType';

export const GithubStats = () => {
    const { isMobile } = useDeviceType();
    const [stats, setStats] = useState<GithubUser | null>(null);
    const [contributions, setContributions] = useState<GithubContributionResponse | null>(null);
    const [streak, setStreak] = useState<number>(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            try {
                const username = ABOUT_ME_DATA.personal.github;
                const [userStats, contributionData] = await Promise.all([
                    githubService.fetchUserStats(username),
                    githubService.fetchContributions(username)
                ]);

                setStats(userStats);
                setContributions(contributionData);

                if (contributionData) {
                    setStreak(githubService.calculateStreak(contributionData.contributions));
                }
            } catch (error) {
                console.error("Failed to load Github data", error);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, []);

    if (loading) {
        return <div className="animate-pulse h-64 bg-surface rounded-xl border border-white/5"></div>;
    }

    // Prepare contribution graph data - show full year for both devices
    const days = contributions?.contributions || [];

    // Show 12 months with 4 weeks each = 48 weeks total
    const weeksToShow = 48;
    const daysToShow = weeksToShow * 7;
    const meaningfulDays = days.slice(-daysToShow);

    // Helper to check if a week starts a new month (every 4 weeks)
    const startsNewMonth = (weekIndex: number): boolean => {
        return weekIndex > 0 && weekIndex % 4 === 0;
    };

    // Generate month labels for 12 months
    const monthLabels: { label: string; weekIndex: number }[] = [];
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    for (let i = 0; i < 12; i++) {
        monthLabels.push({
            label: monthNames[i],
            weekIndex: i * 4
        });
    }

    // Helper to determine color intensity - YELLOW/GOLD shades for streak
    const getLevelColor = (level: number) => {
        switch (level) {
            case 0: return 'bg-white/10';
            case 1: return 'bg-yellow-900/50';
            case 2: return 'bg-yellow-600/70';
            case 3: return 'bg-yellow-400/90';
            case 4: return 'bg-yellow-300';
            default: return 'bg-white/10';
        }
    };

    return (
        <div className="glass-panel p-4 rounded-2xl border border-white/10 relative overflow-hidden">
            <div className="relative z-10">
                <h3 className="text-base font-bold mb-3 flex items-center gap-2">
                    <Github className="w-4 h-4 text-gold-muted" />
                    <span>Github Activity <span className="text-secondary">(Realtime)</span></span>
                </h3>

                {loading ? (
                    <div className="flex items-center justify-center h-32">
                        <div className="loader" />
                    </div>
                ) : (
                    <>
                        {/* Stats Grid */}
                        <div className="grid grid-cols-3 gap-3 mb-4">
                            {/* Total Commits */}
                            <div className="bg-white/5 rounded-xl p-3 border border-white/5 hover:border-gold-dim/30 transition-all">
                                <div className="flex items-center gap-2 mb-2">
                                    <GitCommit className="w-4 h-4 text-gold-dim" />
                                    <span className="text-xs text-secondary uppercase tracking-wide">Total Commits</span>
                                </div>
                                <p className="text-2xl font-bold text-white">{contributions?.total.lastYear || 0}</p>
                            </div>

                            {/* Projects */}
                            <div className="bg-white/5 rounded-xl p-3 border border-white/5 hover:border-gold-dim/30 transition-all">
                                <div className="flex items-center gap-2 mb-2">
                                    <Layers className="w-4 h-4 text-emerald-500" />
                                    <span className="text-xs text-secondary uppercase tracking-wide">Projects</span>
                                </div>
                                <p className="text-2xl font-bold text-white">{stats?.public_repos || 0}</p>
                            </div>

                            {/* Live Streak */}
                            <div className="bg-white/5 rounded-xl p-3 border border-white/5 hover:border-gold-dim/30 transition-all">
                                <div className="flex items-center gap-2 mb-2">
                                    <Zap className="w-4 h-4 text-gold-glow" />
                                    <span className="text-xs text-secondary uppercase tracking-wide">Live Streak</span>
                                </div>
                                <p className="text-2xl font-bold text-gold-glow">{streak} Days</p>
                            </div>
                        </div>

                        {/* Custom Contribution Graph - Full Calendar Grid */}
                        <div className="w-full pb-1 overflow-hidden">
                            {isMobile ? (
                                // Mobile: Two rows of 6 months each
                                <div className="flex flex-col gap-4">
                                    {/* First Row - 6 months */}
                                    <div className="flex gap-2">
                                        <div className="flex flex-col justify-start pt-6 gap-[2px]">
                                            <div className="h-[6px] text-[9px] text-white/30"></div>
                                            <div className="h-[6px] text-[9px] text-white/30 flex items-center">Mon</div>
                                            <div className="h-[6px] text-[9px] text-white/30"></div>
                                            <div className="h-[6px] text-[9px] text-white/30 flex items-center">Wed</div>
                                            <div className="h-[6px] text-[9px] text-white/30"></div>
                                            <div className="h-[6px] text-[9px] text-white/30 flex items-center">Fri</div>
                                            <div className="h-[6px] text-[9px] text-white/30"></div>
                                        </div>
                                        <div className="flex-1 max-w-full overflow-hidden">
                                            <div className="relative h-5 mb-1 flex items-start">
                                                {monthLabels.slice(0, 6).map((monthLabel, idx) => {
                                                    const weekWidth = 8;
                                                    const monthContentWidth = (weekWidth * 4) - 2;
                                                    const monthGap = 10;
                                                    const totalMonthWidth = monthContentWidth + monthGap;
                                                    const position = idx === 0 ? 0 : (idx * totalMonthWidth);

                                                    return (
                                                        <div key={idx} className="absolute text-[10px] text-white/30" style={{ left: `${position}px` }}>
                                                            {monthLabel.label}
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                            <div className="flex gap-0 w-max max-w-full">
                                                {Array.from({ length: 24 }).map((_, weekIndex) => {
                                                    const weekStart = weekIndex * 7;
                                                    const weekDays = meaningfulDays.slice(weekStart, weekStart + 7);
                                                    const isMonthStart = startsNewMonth(weekIndex);

                                                    return (
                                                        <div key={weekIndex} className={`flex flex-col gap-[2px] ${isMonthStart ? 'ml-[10px]' : weekIndex === 0 ? '' : 'ml-[2px]'}`}>
                                                            {weekDays.map((day, dayIndex) => (
                                                                <div
                                                                    key={weekStart + dayIndex}
                                                                    className={`w-[6px] h-[6px] rounded-[1px] ${getLevelColor(day.level)} transition-all hover:scale-125 hover:z-10`}
                                                                    title={`${day.date}: ${day.count} contributions`}
                                                                />
                                                            ))}
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Second Row - 6 months */}
                                    <div className="flex gap-2">
                                        <div className="flex flex-col justify-start pt-6 gap-[2px]">
                                            <div className="h-[6px] text-[9px] text-white/30"></div>
                                            <div className="h-[6px] text-[9px] text-white/30 flex items-center">Mon</div>
                                            <div className="h-[6px] text-[9px] text-white/30"></div>
                                            <div className="h-[6px] text-[9px] text-white/30 flex items-center">Wed</div>
                                            <div className="h-[6px] text-[9px] text-white/30"></div>
                                            <div className="h-[6px] text-[9px] text-white/30 flex items-center">Fri</div>
                                            <div className="h-[6px] text-[9px] text-white/30"></div>
                                        </div>
                                        <div className="flex-1 max-w-full overflow-hidden">
                                            <div className="relative h-5 mb-1 flex items-start">
                                                {monthLabels.slice(6, 12).map((monthLabel, idx) => {
                                                    const weekWidth = 8;
                                                    const monthContentWidth = (weekWidth * 4) - 2;
                                                    const monthGap = 10;
                                                    const totalMonthWidth = monthContentWidth + monthGap;
                                                    const position = idx === 0 ? 0 : (idx * totalMonthWidth);

                                                    return (
                                                        <div key={idx + 6} className="absolute text-[10px] text-white/30" style={{ left: `${position}px` }}>
                                                            {monthLabel.label}
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                            <div className="flex gap-0 w-max max-w-full">
                                                {Array.from({ length: 24 }).map((_, weekIndex) => {
                                                    const actualWeekIndex = weekIndex + 24;
                                                    const weekStart = actualWeekIndex * 7;
                                                    const weekDays = meaningfulDays.slice(weekStart, weekStart + 7);
                                                    const isMonthStart = startsNewMonth(actualWeekIndex);

                                                    return (
                                                        <div key={weekIndex} className={`flex flex-col gap-[2px] ${isMonthStart ? 'ml-[10px]' : weekIndex === 0 ? '' : 'ml-[2px]'}`}>
                                                            {weekDays.map((day, dayIndex) => (
                                                                <div
                                                                    key={weekStart + dayIndex}
                                                                    className={`w-[6px] h-[6px] rounded-[1px] ${getLevelColor(day.level)} transition-all hover:scale-125 hover:z-10`}
                                                                    title={`${day.date}: ${day.count} contributions`}
                                                                />
                                                            ))}
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                // Desktop: Single row with all 12 months
                                <div className="flex gap-2 justify-center">
                                    {/* Day Labels Column - Responsive */}
                                    <div className="flex flex-col justify-start pt-6 gap-[2px]">
                                        <div className="h-[6px] text-[9px] text-white/30"></div>
                                        <div className="h-[6px] text-[9px] text-white/30 flex items-center">Mon</div>
                                        <div className="h-[6px] text-[9px] text-white/30"></div>
                                        <div className="h-[6px] text-[9px] text-white/30 flex items-center">Wed</div>
                                        <div className="h-[6px] text-[9px] text-white/30"></div>
                                        <div className="h-[6px] text-[9px] text-white/30 flex items-center">Fri</div>
                                        <div className="h-[6px] text-[9px] text-white/30"></div>
                                    </div>

                                    {/* Graph Container */}
                                    <div className="flex-1 max-w-full overflow-hidden">
                                        {/* Month Labels - Perfectly aligned with 4-week groups */}
                                        <div className="relative h-5 mb-1 flex items-start">
                                            {monthLabels.map((monthLabel, idx) => {
                                                const weekWidth = 8;
                                                const monthContentWidth = (weekWidth * 4) - 2;
                                                const monthGap = 10;
                                                const totalMonthWidth = monthContentWidth + monthGap;
                                                const position = idx === 0 ? 0 : (idx * totalMonthWidth);

                                                return (
                                                    <div
                                                        key={idx}
                                                        className="absolute text-[10px] md:text-[11px] text-white/30"
                                                        style={{ left: `${position}px` }}
                                                    >
                                                        {monthLabel.label}
                                                    </div>
                                                );
                                            })}
                                        </div>

                                        {/* Contribution Grid - 12 months with 4 weeks each */}
                                        <div className="flex gap-0 w-max max-w-full">
                                            {Array.from({ length: weeksToShow }).map((_, weekIndex) => {
                                                const weekStart = weekIndex * 7;
                                                const weekDays = meaningfulDays.slice(weekStart, weekStart + 7);
                                                const isMonthStart = startsNewMonth(weekIndex);

                                                return (
                                                    <div
                                                        key={weekIndex}
                                                        className={`flex flex-col gap-[2px] ${isMonthStart ? 'ml-[10px]' : weekIndex === 0 ? '' : 'ml-[2px]'}`}
                                                    >
                                                        {weekDays.map((day, dayIndex) => (
                                                            <div
                                                                key={weekStart + dayIndex}
                                                                className={`w-[6px] h-[6px] rounded-[1px] ${getLevelColor(day.level)} transition-all hover:scale-125 hover:z-10`}
                                                                title={`${day.date}: ${day.count} contributions`}
                                                            />
                                                        ))}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="mt-2 text-[10px] text-right text-white/20 flex justify-end gap-1 items-center">
                            <span>Less</span>
                            <div className="w-[6px] h-[6px] rounded-sm bg-white/10"></div>
                            <div className="w-[6px] h-[6px] rounded-sm bg-yellow-900/50"></div>
                            <div className="w-[6px] h-[6px] rounded-sm bg-yellow-600/70"></div>
                            <div className="w-[6px] h-[6px] rounded-sm bg-yellow-400/90"></div>
                            <div className="w-[6px] h-[6px] rounded-sm bg-yellow-300"></div>
                            <span>More</span>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};
