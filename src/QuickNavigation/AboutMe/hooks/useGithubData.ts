import { useState, useEffect, useCallback, useRef } from 'react';
import { ABOUT_ME_DATA } from '@/data/aboutMeData';
import { githubService, type HeatmapWeek, type GithubUser, type GithubContributionResponse } from '@/services/githubService';
import { safeLocalStorage } from '@/utils/safeStorage';
import { logger } from '@/utils/logger';

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

    const fetchData = useCallback(async (signal?: AbortSignal) => {
        try {
            const [githubStats, githubContribs] = await Promise.all([
                githubService.fetchUserStats(ABOUT_ME_DATA.personal.github, signal),
                githubService.fetchContributions(ABOUT_ME_DATA.personal.github, signal)
            ]);

            if (githubStats && githubContribs) {
                const timestamp = Date.now();

                // SAFE: Persist with error handling (app continues if save fails)
                safeLocalStorage.setItem(CACHE_KEY_STATS, { data: githubStats, timestamp });
                safeLocalStorage.setItem(CACHE_KEY_CONTRIBS, { data: githubContribs, timestamp });

                if (isMounted.current) {
                    processData(githubStats, githubContribs);
                }
            } else {
                logger.warn('[GithubData] Fetch failed/invalid, keeping stale data.');
                if (isMounted.current) {
                    setLoading(false);
                }
            }
        } catch (error) {
            // Don't log abort errors
            if (error instanceof Error && error.name === 'AbortError') return;

            logger.error('Failed to fetch GitHub stats:', error);
            if (isMounted.current) {
                setLoading(false);
            }
        }
    }, [processData]);

    useEffect(() => {
        isMounted.current = true;
        // AbortController to cancel fetch on unmount
        const controller = new AbortController();

        const loadInitialData = async () => {
            const now = Date.now();
            // SAFE: Use safe storage wrapper
            const cachedStatsResult = safeLocalStorage.getItem<{
                data: GithubUser;
                timestamp: number;
            }>(CACHE_KEY_STATS);
            const cachedContribsResult = safeLocalStorage.getItem<{
                data: GithubContributionResponse;
                timestamp: number;
            }>(CACHE_KEY_CONTRIBS);

            let hasValidCache = false;

            if (cachedStatsResult.success && cachedStatsResult.data &&
                cachedContribsResult.success && cachedContribsResult.data) {

                const cachedStats = cachedStatsResult.data;
                const cachedContribs = cachedContribsResult.data;

                // Validate cache structure
                if (cachedStats.timestamp && cachedStats.data &&
                    cachedContribs.timestamp && cachedContribs.data) {
                    // Check validity
                    if (now - cachedStats.timestamp < CACHE_TIMEOUT) {
                        processData(cachedStats.data, cachedContribs.data);
                        hasValidCache = true;
                    }
                }
            }

            if (!hasValidCache) {
                await fetchData(controller.signal);
            }
        };

        loadInitialData();

        // Smart Polling Interval
        const intervalId = setInterval(() => {
            // SAFE: Check last fetch timestamp
            const lastStatsResult = safeLocalStorage.getItem<{
                data: GithubUser;
                timestamp: number;
            }>(CACHE_KEY_STATS);
            let lastFetch = 0;
            if (lastStatsResult.success && lastStatsResult.data?.timestamp) {
                lastFetch = lastStatsResult.data.timestamp;
            }

            const now = Date.now();
            const shouldPoll =
                document.visibilityState === 'visible' &&
                (now - lastFetch >= CACHE_TIMEOUT);

            if (shouldPoll) {
                fetchData(controller.signal);
            }
        }, 1000 * 60); // Check every minute if we need to poll

        // Visibility Listener for immediate return
        const handleVisibilityChange = () => {
            if (document.visibilityState === 'visible') {
                // SAFE: Check last fetch timestamp
                const lastStatsResult = safeLocalStorage.getItem<{
                    data: GithubUser;
                    timestamp: number;
                }>(CACHE_KEY_STATS);
                let lastFetch = 0;
                if (lastStatsResult.success && lastStatsResult.data?.timestamp) {
                    lastFetch = lastStatsResult.data.timestamp;
                }
                if (Date.now() - lastFetch >= CACHE_TIMEOUT) {
                    fetchData(controller.signal);
                }
            }
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);

        return () => {
            isMounted.current = false;
            clearInterval(intervalId);
            // Cancel ongoing fetch request
            controller.abort();
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fetchData, processData]);

    return { stats, heatmapGrid, streak, totalContributions, loading };
};
