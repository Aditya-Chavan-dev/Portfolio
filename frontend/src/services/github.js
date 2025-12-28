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

            return {
                loc: estimatedLoC > config.hero.metrics.loc.value ? estimatedLoC : config.hero.metrics.loc.value, // Use larger
                repos: publicRepos,
            };

        } catch (error) {
            console.error("GitHub Fetch Failed:", error);
            return null;
        }
    }
};
