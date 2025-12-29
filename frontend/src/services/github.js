import config from '../portfolio.config';
import api from './api';

const CACHE_KEY = 'github_stats_v2';
const CACHE_DURATION = 1000 * 60 * 15; // 15 Mins

export const GitHubService = {
    /**
     * Fetches stats from our Render Backend.
     * The backend handles the complexity of calling GitHub/Jogruber APIs.
     */
    async getRealStats() {
        try {
            console.log("Fetching GitHub stats from Backend...");

            // Call our own backend API
            const response = await api.get('/github');
            const stats = response.data;

            // Timestamp it for client-side caching
            stats.timestamp = Date.now();

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
                repos: "40+",
                streak: config.hero.metrics.streak.value,
                stack: config.hero.stack,
                timestamp: Date.now()
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
            return JSON.parse(cached);
        } catch (e) {
            return null;
        }
    },

    /**
     * Smart Fetch:
     * - If cache is fresh (< 15 Mins), return cache.
     * - If cache is stale or missing, fetch from Backend.
     */
    async getSmartStats() {
        const cached = this.getCachedStats();
        const isFresh = cached && (Date.now() - cached.timestamp < CACHE_DURATION);

        if (isFresh) {
            console.log("GitHub Stats: Cache is fresh. Using cached data.");
            return cached;
        }

        console.log("GitHub Stats: Cache is stale or missing. Fetching new data...");
        return this.getRealStats();
    }
};
