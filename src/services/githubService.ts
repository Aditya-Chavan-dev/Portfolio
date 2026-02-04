export interface GithubUser {
    public_repos: number;
    followers: number;
    following: number;
    total_private_repos?: number;
    owned_private_repos?: number;
    login: string;
    avatar_url: string;
}

export interface ContributionDay {
    date: string;
    count: number;
    level: 0 | 1 | 2 | 3 | 4;
}

export interface GithubContributionResponse {
    total: {
        lastYear: number;
        [key: string]: number;
    };
    contributions: ContributionDay[];
}

// Internal Interface for Grid
export interface HeatmapGrid {
    weeks: HeatmapWeek[];
}

export interface HeatmapWeek {
    days: ContributionDay[];
    monthLabel?: string;
}

export const githubService = {
    /**
     * Strict UTC Date Normalizer
     * Ensures consistent YYYY-MM-DD format regardless of local timezone.
     */
    normalizeDate: (date: Date): string => {
        return date.toISOString().split('T')[0];
    },

    /**
     * Parse YYYY-MM-DD string to Date object (UTC 00:00:00)
     */
    parseDate: (dateStr: string): Date => {
        return new Date(dateStr + 'T00:00:00Z');
    },

    /**
     * Fetches public user profile data from Github API
     */
    fetchUserStats: async (username: string): Promise<GithubUser | null> => {
        try {
            const response = await fetch(`https://api.github.com/users/${username}`);
            if (!response.ok) throw new Error(`Failed to fetch user stats: ${response.status}`);
            return await response.json();
        } catch (error) {
            console.error('[GithubService] User Stats Error:', error);
            return null;
        }
    },

    /**
     * Fetches contribution history from a third-party proxy with STRICT validation.
     */
    fetchContributions: async (username: string): Promise<GithubContributionResponse | null> => {
        try {
            const response = await fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=last`);

            if (!response.ok) {
                throw new Error(`Failed to fetch contributions: ${response.status}`);
            }

            const data = await response.json();

            // STRICT VALIDATION
            if (!data || !Array.isArray(data.contributions)) {
                console.error('[GithubService] Validation Failed: Invalid schema');
                return null;
            }

            // check coverage
            if (data.contributions.length < 360) {
                console.error('[GithubService] Validation Failed: Insufficient coverage (< 360 days)');
                return null;
            }

            // validate individual days
            const isValid = data.contributions.every((d: any) => {
                const validDate = /^\d{4}-\d{2}-\d{2}$/.test(d.date);
                const validCount = Number.isInteger(d.count) && d.count >= 0;
                return validDate && validCount;
            });

            if (!isValid) {
                console.error('[GithubService] Validation Failed: Corrupt data entries');
                return null;
            }

            return data;

        } catch (error) {
            console.error('[GithubService] Contribution Fetch Error:', error);
            return null;
        }
    },

    /**
     * Calculates the current live streak from the contribution array.
     */
    calculateStreak: (contributions: ContributionDay[]): number => {
        // Sort explicitly by date ascending
        const sorted = [...contributions].sort((a, b) =>
            new Date(a.date).getTime() - new Date(b.date).getTime()
        );

        const today = new Date();
        const todayStr = today.toISOString().split('T')[0];
        // Allow for yesterday (Github updates can be delayed)
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toISOString().split('T')[0];

        const lastEntry = sorted[sorted.length - 1];
        if (!lastEntry) return 0;

        // Check if the chain is alive (last entry must be today or yesterday)
        if (lastEntry.date !== todayStr && lastEntry.date !== yesterdayStr) {
            return 0;
        }

        let streak = 0;
        // Iterate backwards
        for (let i = sorted.length - 1; i >= 0; i--) {
            const day = sorted[i];
            if (day.count > 0) {
                streak++;
            } else {
                // If it's today and 0, we don't break yet (user might commit later today)
                if (day.date === todayStr) continue;
                break;
            }
        }
        return streak;
    },

    /**
     * Generates a strict 52x7 Grid Matrix
     */
    generateHeatmapGrid: (contributions: ContributionDay[]): HeatmapWeek[] => {
        const contributionMap = new Map(contributions.map(c => [c.date, c]));

        const weeks: HeatmapWeek[] = [];
        const TOTAL_WEEKS = 52;

        // End Date: Today (UTC)
        const today = new Date();

        // Find the Sunday of the current week.
        const currentWeekSunday = new Date(today);
        currentWeekSunday.setDate(today.getDate() - today.getDay());

        // Go back 51 weeks from that Sunday to form the start of the grid.
        const gridStartSunday = new Date(currentWeekSunday);
        gridStartSunday.setDate(gridStartSunday.getDate() - (51 * 7));

        let iteratorDate = new Date(gridStartSunday);
        let lastMonth: number | null = null;

        for (let w = 0; w < TOTAL_WEEKS; w++) {
            const weekDays: ContributionDay[] = [];
            for (let d = 0; d < 7; d++) {
                const dateStr = iteratorDate.toISOString().split('T')[0];
                const existing = contributionMap.get(dateStr);

                if (existing) {
                    weekDays.push(existing);
                } else {
                    weekDays.push({
                        date: dateStr,
                        count: 0,
                        level: 0
                    });
                }

                // Increment day
                iteratorDate.setDate(iteratorDate.getDate() + 1);
            }

            // Determine Month Label
            // We use the month of the first day of the week (Sunday)
            const firstDay = new Date(weekDays[0].date);
            const month = firstDay.getMonth();
            let monthLabel: string | undefined = undefined;

            if (lastMonth === null || month !== lastMonth) {
                monthLabel = firstDay.toLocaleDateString('en-US', { month: 'short' });
                lastMonth = month;
            }

            weeks.push({ days: weekDays, monthLabel });
        }

        return weeks;
    },

    /**
     * Fetches public repositories for a user
     */
    fetchUserRepos: async (username: string): Promise<GithubRepo[] | null> => {
        try {
            // Sort by updated to show most recent activity first
            const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
            if (!response.ok) throw new Error(`Failed to fetch user repos: ${response.status}`);
            return await response.json();
        } catch (error) {
            console.error('[GithubService] User Repos Error:', error);
            return null;
        }
    },

    /**
     * Fetches approximate commit count for a repository
     */
    fetchCommitCount: async (username: string, repo: string): Promise<number | null> => {
        try {
            // We use the per_page=1 logic to read the 'Link' header for total count
            const response = await fetch(`https://api.github.com/repos/${username}/${repo}/commits?per_page=1&page=1`);
            if (!response.ok) return null;

            const linkHeader = response.headers.get('Link');
            if (linkHeader) {
                // Parse "last" page from Link header
                const match = linkHeader.match(/&page=(\d+)>; rel="last"/);
                if (match) {
                    return parseInt(match[1]);
                }
            }

            // If no link header, count is likely small (<= 1, or just one page). 
            // We can return 1 if successful, or maybe check array length if we fetched more.
            // But with per_page=1, if successful and no link header, it means there is only 1 page (1 commit).
            // Actually if it returns array of 1, it has at least 1. 
            const data = await response.json();
            return Array.isArray(data) ? data.length : 0;
        } catch (error) {
            console.error('[GithubService] Commit Count Error:', error);
            return null;
        }
    }
};

export interface GithubRepo {
    id: number;
    name: string;
    description: string | null;
    html_url: string;
    homepage: string | null;
    language: string | null;
    stargazers_count: number;
    forks_count: number;
    created_at: string;
    updated_at: string;
    topics: string[];
}

