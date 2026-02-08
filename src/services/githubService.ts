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



import { logger } from '@/utils/logger';

/**
 * Utility: Delays execution for exponential backoff
 */
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Utility: Validates GitHub username format
 * @throws Error if username is invalid
 */
function validateUsername(username: string): void {
    if (!username || typeof username !== 'string') {
        throw new Error('[GithubService] Username is required and must be a string');
    }

    // GitHub username rules: alphanumeric, hyphens, max 39 chars
    // Must not start or end with hyphen, no consecutive hyphens
    if (!/^[a-zA-Z0-9]([a-zA-Z0-9]|-(?!-))*[a-zA-Z0-9]$|^[a-zA-Z0-9]$/.test(username) || username.length > 39) {
        throw new Error(`[GithubService] Invalid GitHub username format: "${username}"`);
    }
}

/**
 * Utility: Fetch with automatic retry and exponential backoff
 * @param url - URL to fetch
 * @param options - Fetch options (including signal for abort)
 * @param retries - Number of retries (default 3)
 * @returns Response object
 */
async function fetchWithRetry(url: string, options: RequestInit = {}, retries = 3): Promise<Response> {
    for (let attempt = 0; attempt < retries; attempt++) {
        try {
            const response = await fetch(url, options);

            // Don't retry on 4xx errors (client errors like 404, 401)
            if (response.status >= 400 && response.status < 500) {
                return response;
            }

            // Return successful responses
            if (response.ok) {
                return response;
            }

            // Retry on 5xx errors (server errors)
            if (attempt < retries - 1) {
                const backoffMs = 1000 * Math.pow(2, attempt); // 1s, 2s, 4s
                logger.warn(`[GithubService] Request failed (${response.status}), retrying in ${backoffMs}ms...`);
                await delay(backoffMs);
                continue;
            }

            return response;
        } catch (error) {
            // Don't retry on abort errors
            if (error instanceof Error && error.name === 'AbortError') {
                throw error;
            }

            // Retry on network errors
            if (attempt < retries - 1) {
                const backoffMs = 1000 * Math.pow(2, attempt);
                logger.warn(`[GithubService] Network error, retrying in ${backoffMs}ms...`);
                await delay(backoffMs);
                continue;
            }

            throw error;
        }
    }

    throw new Error('[GithubService] Max retries exceeded');
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
     * Fetches GitHub user statistics with retry logic and validation
     */
    fetchUserStats: async (username: string, signal?: AbortSignal): Promise<GithubUser | null> => {
        try {
            // Validate input
            validateUsername(username);

            // Fetch with retry
            const response = await fetchWithRetry(`https://api.github.com/users/${username}`, { signal });
            if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
            return await response.json();
        } catch (error) {
            // Don't log abort errors (component unmounting is expected behavior)
            if (error instanceof Error && error.name === 'AbortError') {
                return null;
            }

            logger.error('[GithubService] User Stats Error:', error);
            return null;
        }
    },

    /**
     * Fetches GitHub contribution data and transforms it for heatmap
     */
    fetchContributions: async (username: string, signal?: AbortSignal): Promise<GithubContributionResponse | null> => {
        try {
            // Validate input
            validateUsername(username);

            const response = await fetchWithRetry(`https://github-contributions-api.jogruber.de/v4/${username}?y=last`, { signal });

            if (!response.ok) {
                throw new Error(`Failed to fetch contributions: ${response.status}`);
            }

            const data = await response.json();

            // STRICT VALIDATION
            if (!data || !Array.isArray(data.contributions)) {
                logger.error('[GithubService] Validation Failed: Invalid schema');
                return null;
            }

            if (data.contributions.length < 360) {
                logger.error('[GithubService] Validation Failed: Insufficient coverage (<360 days)');
                return null;
            }

            const isValid = data.contributions.every((d: { date: string; count: number }) => {
                const validDate = /^\d{4}-\d{2}-\d{2}$/.test(d.date);
                const validCount = Number.isInteger(d.count) && d.count >= 0;
                return validDate && validCount;
            });

            if (!isValid) {
                logger.error('[GithubService] Validation Failed: Corrupt data entries');
                return null;
            }

            return data;

        } catch (error) {
            // Don't log abort errors (component unmounting is expected behavior)
            if (error instanceof Error && error.name === 'AbortError') {
                return null;
            }

            logger.error('[GithubService] Contribution Fetch Error:', error);
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

        const iteratorDate = new Date(gridStartSunday);
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

                iteratorDate.setDate(iteratorDate.getDate() + 1);
            }

            // Use the month of the first day of the week (Sunday) for labeling
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
    fetchUserRepos: async (username: string, signal?: AbortSignal): Promise<GithubRepo[] | null> => {
        try {
            // Validate input
            validateUsername(username);

            // Sort by updated to show most recent activity first
            const response = await fetchWithRetry(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`, { signal });
            if (!response.ok) throw new Error(`Failed to fetch user repos: ${response.status}`);
            return await response.json();
        } catch (error) {
            // Don't log abort errors (component unmounting is expected behavior)
            if (error instanceof Error && error.name === 'AbortError') {
                return null;
            }

            logger.error('[GithubService] User Repos Error:', error);
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
            logger.error('[GithubService] Commit Count Error:', error);
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

