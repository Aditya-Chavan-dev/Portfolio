import { useState, useEffect, useCallback, useRef } from 'react';
import { ABOUT_ME_DATA } from '@/data/aboutMeData';
import { githubService, type HeatmapWeek, type GithubUser, type GithubContributionResponse } from '@/services/githubService';

export const useGithubData = () => {
    const [stats, setStats] = useState<GithubUser | null>(null);
    const [heatmapGrid, setHeatmapGrid] = useState<HeatmapWeek[] | null>(null);
    const [totalContributions, setTotalContributions] = useState<number>(0);
    const [loading, setLoading] = useState(true);
    const [streak, setStreak] = useState(0);

    const CACHE_KEY_STATS = 'github_stats_v2';
    const CACHE_KEY_CONTRIBS = 'github_contribs_v2';
    const CACHE_TIMEOUT = 2 * 60 * 60 * 1000; // 2 hours

    // Ref to track mounted state and prevent race conditions
    const isMounted = useRef(true);

    const processData = useCallback((statsData: GithubUser, contribData: GithubContributionResponse) => {
        if (!statsData || !contribData) return;

        // Generate Strict Grid
        const grid = githubService.generateHeatmapGrid(contribData.contributions);
        const currentStreak = githubService.calculateStreak(contribData.contributions);
        // Safely access lastYear or fallback
        const total = contribData.total ? (contribData.total.lastYear || 0) : 0;

        if (isMounted.current) {
            setStats(statsData);
            setHeatmapGrid(grid);
            setStreak(currentStreak);
            setTotalContributions(total);
            setLoading(false);
        }
    }, []);

    const fetchData = useCallback(async () => {
        try {
            const [githubStats, githubContribs] = await Promise.all([
                githubService.fetchUserStats(ABOUT_ME_DATA.personal.github),
                githubService.fetchContributions(ABOUT_ME_DATA.personal.github)
            ]);

            if (githubStats && githubContribs) {
                const timestamp = Date.now();

                // Persist
                localStorage.setItem(CACHE_KEY_STATS, JSON.stringify({ data: githubStats, timestamp }));
                localStorage.setItem(CACHE_KEY_CONTRIBS, JSON.stringify({ data: githubContribs, timestamp }));

                processData(githubStats, githubContribs);
            } else {
                console.warn('[GithubData] Fetch failed/invalid, keeping stale data.');
                // Do NOT clear state, keep stale
                if (isMounted.current) setLoading(false);
            }
        } catch (error) {
            console.error('[GithubData] Error:', error);
            if (isMounted.current) setLoading(false);
        }
    }, [processData]);

    useEffect(() => {
        isMounted.current = true;

        const loadInitialData = async () => {
            const now = Date.now();
            const cachedStatsStr = localStorage.getItem(CACHE_KEY_STATS);
            const cachedContribsStr = localStorage.getItem(CACHE_KEY_CONTRIBS);

            let hasValidCache = false;

            if (cachedStatsStr && cachedContribsStr) {
                try {
                    const cachedStats = JSON.parse(cachedStatsStr);
                    const cachedContribs = JSON.parse(cachedContribsStr);

                    // Check validity
                    if (now - cachedStats.timestamp < CACHE_TIMEOUT) {
                        processData(cachedStats.data, cachedContribs.data);
                        hasValidCache = true;
                    }
                } catch (e) {
                    console.error('[GithubData] Cache Pass Error');
                }
            }

            if (!hasValidCache) {
                await fetchData();
            }
        };

        loadInitialData();

        // Smart Polling Interval
        const intervalId = setInterval(() => {
            const lastStats = localStorage.getItem(CACHE_KEY_STATS);
            let lastFetch = 0;
            if (lastStats) {
                try { lastFetch = JSON.parse(lastStats).timestamp; } catch (e) { }
            }

            const now = Date.now();
            const shouldPoll =
                document.visibilityState === 'visible' &&
                (now - lastFetch >= CACHE_TIMEOUT);

            if (shouldPoll) {
                fetchData();
            }
        }, 1000 * 60); // Check every minute if we need to poll

        // Visibility Listener for immediate return
        const handleVisibilityChange = () => {
            if (document.visibilityState === 'visible') {
                const lastStats = localStorage.getItem(CACHE_KEY_STATS);
                let lastFetch = 0;
                if (lastStats) {
                    try { lastFetch = JSON.parse(lastStats).timestamp; } catch (e) { }
                }
                if (Date.now() - lastFetch >= CACHE_TIMEOUT) {
                    fetchData();
                }
            }
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);

        return () => {
            isMounted.current = false;
            clearInterval(intervalId);
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, [fetchData, processData]);

    return { stats, heatmapGrid, streak, totalContributions, loading };
};
