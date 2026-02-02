
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
        2025?: number; // Adjust based on dynamic year
        2026?: number;
    };
    contributions: ContributionDay[];
}

export const githubService = {
    /**
     * Fetches public user profile data from Github API
     */
    fetchUserStats: async (username: string): Promise<GithubUser | null> => {
        try {
            const response = await fetch(`https://api.github.com/users/${username}`);
            if (!response.ok) throw new Error('Failed to fetch user stats');
            return await response.json();
        } catch (error) {
            console.error(error);
            return null;
        }
    },

    /**
     * Fetches contribution history from a third-party proxy
     * Uses https://github-contributions-api.jogruber.de/
     */
    fetchContributions: async (username: string): Promise<GithubContributionResponse | null> => {
        try {
            const response = await fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=last`);
            if (!response.ok) throw new Error('Failed to fetch contributions');
            return await response.json();
        } catch (error) {
            console.error(error);
            return null;
        }
    },

    /**
     * Calculates the current live streak from the contribution array.
     * Iterates backwards from today.
     */
    calculateStreak: (contributions: ContributionDay[]): number => {
        // Sort just in case, though API usually sends sorted
        const sorted = [...contributions].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

        let streak = 0;
        const today = new Date();
        // Normalize today to bubbles format YYYY-MM-DD for comparison if needed, 
        // or just iterate backwards checking day difference.

        // Simple algo: Iterate backwards.
        // If today has 0, check yesterday. 
        // Note: The API might return today as the last entry, or yesterday depending on timezone.

        // We will just check from the last entry backwards.
        // If the last entry is today and empty, start from yesterday.
        // If the last entry is today and has data, start from today.

        const lastEntry = sorted[sorted.length - 1];
        if (!lastEntry) return 0;

        // Check if last entry is today or yesterday (allow 1 missed day if today hasn't pushed yet? 
        // STRICT STREAK: Today or Yesterday MUST have a commit to keep streak alive).
        const lastDate = new Date(lastEntry.date);
        const dayDiff = Math.floor((today.getTime() - lastDate.getTime()) / (1000 * 3600 * 24));

        if (dayDiff > 1) return 0; // Streak broken if gap > 1 day

        for (let i = sorted.length - 1; i >= 0; i--) {
            if (sorted[i].count > 0) {
                streak++;
            } else {
                // If this is strictly the *current* entry (today) and it's 0, we don't break yet if we just started checking
                // But if we encounter a 0 in the middle of a chain, break.

                // Actually simple logic: 
                // Group contiguous days with counts.
                // If today is count 0, ignore it for streak calculation (don't add to streak, but don't break if yesterday had count).
                // But the user wants "Current Live Streak".

                const entryDate = new Date(sorted[i].date);
                const isToday = entryDate.toDateString() === today.toDateString();

                if (isToday && sorted[i].count === 0) continue;
                if (sorted[i].count === 0) break;
            }
        }
        return streak;
    }
};
