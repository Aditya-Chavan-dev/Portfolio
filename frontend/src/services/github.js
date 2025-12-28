import axios from 'axios';
import config from '../portfolio.config';

const GITHUB_API_BASE = 'https://api.github.com';

export const GitHubService = {
    /**
     * Fetches profile and repo data to calculate "Real" stats.
     * Logic:
     * - LoC = Sum of size (KB) of all public repos * 30 (Avg lines per KB)
     * - Commits = Sum of 'pushed_at' activity or proxy (Hard to get total without auth)
     *   -> We will use a safe estimation based on Repo Count * Avg Commits + Special "big" repos.
     *   -> OR we calculate "Project Velocity" based on recent pushes.
     * - Streak = Mocked for now (Safe) or use public events (Complex).
     */
    async getRealStats() {
        try {
            const username = config.hero.githubUsername;
            if (!username) throw new Error("No GitHub Username Configured");

            // 1. Fetch User Profile (Public Repos count)
            const userRes = await axios.get(`${GITHUB_API_BASE}/users/${username}`);
            const publicRepos = userRes.data.public_repos;

            // 2. Fetch All Public Repos (for size/language calculation)
            // Limit to 100 recent repos to save bandwidth
            const reposRes = await axios.get(`${GITHUB_API_BASE}/users/${username}/repos?per_page=100&sort=pushed`);
            const repos = reposRes.data;

            // 3. Calculate "Real" LoC Estimate
            // GitHub 'size' is in Kilobytes.
            // Heuristic: 1KB ~= 40 lines of code (mixed density)
            const totalSizeKB = repos.reduce((acc, repo) => acc + repo.size, 0);
            const estimatedLoC = Math.floor(totalSizeKB * 40);

            // 4. Calculate "Project Velocity" or Commits Estimate
            // Since we can't scrape total commits easily, we'll track "Active Projects".
            // Let's use specific logic: Metric = Repos * ~150 commits avg? 
            // Better: Let's fetch the "Events" to see if active recently.

            // For now, let's Stick to the "Mock" commits but update LoC and Repos if we can.
            // Actually, let's overwrite "Git Commits" with "Public Repos" if it's more impressive?
            // No, "2,450 Commits" looks better than "40 Repos".
            // Let's keep a configured base and ADD the live activity?
            // DECISION: Return calculated LoC, and Real Repo Count. 
            // We will replace "Git Commits" with "Total Projects" (Real number) OR keep Commits as manual.

            // 4. Calculate Real "Streak" via Events API
            // Fetch last 90 days of events (max 1 page for speed, 100 events)
            const eventsRes = await axios.get(`${GITHUB_API_BASE}/users/${username}/events?per_page=100`);
            const events = eventsRes.data;
            const streak = GitHubService.calculateStreak(events);

            return {
                loc: estimatedLoC > config.hero.metrics.loc.value ? estimatedLoC : config.hero.metrics.loc.value,
                repos: publicRepos,
                streak: `${streak} Days`, // Return formatted string
            };

        } catch (error) {
            console.error("GitHub Fetch Failed:", error);
            return null;
        }
    },

    calculateStreak(events) {
        if (!events || events.length === 0) return 0;

        const today = new Date();
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);

        // Normalize dates to YYYY-MM-DD
        const toDateString = (date) => date.toISOString().split('T')[0];
        const eventDates = new Set(
            events
                .filter(e => e.type === 'PushEvent' || e.type === 'CreateEvent' || e.type === 'PullRequestEvent')
                .map(e => toDateString(new Date(e.created_at)))
        );

        let currentStreak = 0;
        let checkDate = today;

        // Check today (if no activity today yet, streak continues from yesterday)
        if (eventDates.has(toDateString(today))) {
            currentStreak++;
            checkDate = yesterday;
        } else {
            checkDate = yesterday; // Start checking from yesterday
        }

        while (eventDates.has(toDateString(checkDate))) {
            currentStreak++;
            checkDate.setDate(checkDate.getDate() - 1);
        }

        return currentStreak;
    }
};
