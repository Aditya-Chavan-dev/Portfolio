import config from '../portfolio.config';
import api from './api';

const CACHE_KEY = 'github_stats_v3';
const CACHE_DURATION = 1000 * 60 * 5; // 5 Mins - Updated for freshness

export const GitHubService = {
    /**
     * Fetches stats from our Render Backend.
     * The backend handles the complexity of calling GitHub/Jogruber APIs.
     */
    async getRealStats() {
        try {
            if (import.meta.env.DEV) console.log("Fetching GitHub stats from Backend...");

            // Call our own backend API
            const response = await api.get('/github');
            const stats = response.data;

            // Timestamp it for client-side caching
            stats.timestamp = Date.now();
            stats.source = 'LIVE'; // Tag as Live

            // Save to Cache
            try {
                localStorage.setItem(CACHE_KEY, JSON.stringify(stats));
            } catch (e) {
                console.warn("Failed to save GitHub stats to cache", e);
            }

            return stats;

        } catch (error) {
            console.error("GitHub Fetch Failed (Backend):", error);
            // Fallback to config defaults
            return {
                loc: config.hero.metrics.loc.value,
                repos: 0,
                streak: config.hero.metrics.streak.value,
                stack: config.hero.stack,
                timestamp: Date.now(),
                source: 'OFFLINE' // Tag as Offline/Fallback
            };
        }
    },

    /**
     * Tries to get stats from local storage.
     */
    getCachedStats() {
        try {
            const cached = localStorage.getItem(CACHE_KEY);
            if (!cached) return null;
            const parsed = JSON.parse(cached);
            return { ...parsed, source: 'CACHE' }; // Tag as Cache
        } catch (e) {
            return null;
        }
    },

    /**
     * Smart Fetch:
     * - If cache is fresh (< 5 Mins), return cache.
     * - If cache is stale or missing, fetch from Backend.
     */
    async getSmartStats() {
        const cached = this.getCachedStats();
        // Check if cache exists and is fresh
        // Note: getCachedStats now returns an object with source='CACHE', so we check the timestamp inside it
        const isFresh = cached && (Date.now() - cached.timestamp < CACHE_DURATION);

        if (isFresh) {
            if (import.meta.env.DEV) console.log("GitHub Stats: Cache is fresh. Using cached data.");
            return cached;
        }

        if (import.meta.env.DEV) console.log("GitHub Stats: Cache is stale or missing. Fetching new data...");
        return this.getRealStats();
    },

    /**
     * Fetches all public repositories for the user.
     */
    async getRepositories() {
        // Cache Key for Repos
        const REPO_CACHE_KEY = 'github_repos_v1';
        const REPO_CACHE_DURATION = 1000 * 60 * 30; // 30 Mins

        try {
            // 1. Check Cache
            const cached = localStorage.getItem(REPO_CACHE_KEY);
            if (cached) {
                const { timestamp, data } = JSON.parse(cached);
                if (Date.now() - timestamp < REPO_CACHE_DURATION) {
                    if (import.meta.env.DEV) console.log("GitHub Repos: Cache is fresh.");
                    return data;
                }
            }

            // 2. Fetch from GitHub API
            if (import.meta.env.DEV) console.log("GitHub Repos: Fetching from API...");
            const username = config.hero.githubUsername;
            const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);

            if (!response.ok) throw new Error('GitHub API Limit or Error');

            const repos = await response.json();

            // 3. Save to Cache
            localStorage.setItem(REPO_CACHE_KEY, JSON.stringify({
                timestamp: Date.now(),
                data: repos
            }));

            return repos;

        } catch (error) {
            console.error("GitHub Repos Fetch Failed:", error);
            return [];
        }
    }
};
