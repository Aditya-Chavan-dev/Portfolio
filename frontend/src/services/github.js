import axios from 'axios';
import config from '../portfolio.config';

const GITHUB_API_BASE = 'https://api.github.com';
const CONTRIBUTIONS_API_BASE = 'https://github-contributions-api.jogruber.de/v4';

export const GitHubService = {
    /**
     * Fetches profile and repo data to calculate "Real" stats.
     * Logic:
     * - LoC = Sum of size (KB) of all public repos * 30 (Avg lines per KB)
     * - Public Repos = Direct form API
     * - Streak = Calculated from FULL Contribution Calendar via Proxy API
     */
    async getRealStats() {
        try {
            const username = config.hero.githubUsername;
            if (!username) throw new Error("No GitHub Username Configured");

            // 1. Fetch User Profile
            // 2. Fetch All Public Repos 
            // 3. Fetch Full Contribution Calendar (Parallel)
            const [userRes, reposRes, calendarRes] = await Promise.all([
                axios.get(`${GITHUB_API_BASE}/users/${username}`),
                axios.get(`${GITHUB_API_BASE}/users/${username}/repos?per_page=100&sort=pushed`),
                axios.get(`${CONTRIBUTIONS_API_BASE}/${username}`)
            ]);

            const publicRepos = userRes.data.public_repos;
            const repos = reposRes.data;

            // Calculate "Real" LoC Estimate
            const totalSizeKB = repos.reduce((acc, repo) => acc + repo.size, 0);
            const estimatedLoC = Math.floor(totalSizeKB * 40);

            // Calculate Streak from Calendar (Unbounded)
            const streak = GitHubService.calculateCalendarStreak(calendarRes.data);

            return {
                loc: estimatedLoC > config.hero.metrics.loc.value ? estimatedLoC : config.hero.metrics.loc.value,
                repos: publicRepos,
                streak: `${streak} Days`,
            };

        } catch (error) {
            console.error("GitHub Fetch Failed:", error);
            // Fallback
            return {
                loc: config.hero.metrics.loc.value,
                repos: "40+",
                streak: config.hero.metrics.streak.value
            };
        }
    },

    calculateCalendarStreak(data) {
        if (!data || !data.contributions) return 0;

        // Data structure: { contributions: [ { date: "YYYY-MM-DD", count: 5, level: 2 }, ... ] }
        // The API returns ALL contributions for the current/previous years.
        // We need to sort descending just in case, though usually returned sorted.
        const contributions = data.contributions.sort((a, b) => new Date(b.date) - new Date(a.date));

        const today = new Date();
        // Normalize today to YYYY-MM-DD local logic if needed, but the API returns YYYY-MM-DD.
        // Let's rely on simple string comparison against the API's dates.

        const toDateString = (date) => date.toISOString().split('T')[0];
        const todayStr = toDateString(today);

        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = toDateString(yesterday);

        let currentStreak = 0;
        let streakBroken = false;

        // Find where to start counting
        // We look for Today. If found and count > 0, streak starts 1.
        // If Today not found (or count 0), we look for Yesterday.
        // If Yesterday found and count > 0, streak starts 1 (from yesterday).

        // Note: The API might return today's empty slot if no contribs yet.

        let startIndex = contributions.findIndex(c => c.date === todayStr);

        // If today is not in list (future?) or 0 contribs
        if (startIndex !== -1 && contributions[startIndex].count > 0) {
            // Started today!
        } else {
            // Check yesterday
            startIndex = contributions.findIndex(c => c.date === yesterdayStr);
            if (startIndex === -1 || contributions[startIndex].count === 0) {
                return 0; // No streak active
            }
        }

        // Count backwards from startIndex
        for (let i = startIndex; i < contributions.length; i++) {
            if (contributions[i].count > 0) {
                currentStreak++;

                // Verify continuity
                if (i < contributions.length - 1) {
                    const currDate = new Date(contributions[i].date);
                    const nextDate = new Date(contributions[i + 1].date);
                    const diffTime = Math.abs(currDate - nextDate);
                    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

                    if (diffDays > 1) break; // Gap detected
                }
            } else {
                break; // 0 contributions stops the streak
            }
        }

        return currentStreak;
    }
};
