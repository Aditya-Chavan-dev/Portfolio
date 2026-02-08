import { useState, useEffect, useRef, useCallback } from 'react';
import { githubService, type GithubRepo } from '@/services/githubService';
import { ABOUT_ME_DATA } from '@/data/aboutMeData';
import { CACHE_KEY_PROJECTS, CACHE_TIMEOUT } from '@/utils/constants';
import { safeLocalStorage } from '@/utils/safeStorage';
import { logger } from '@/utils/logger';

/**
 * Helper: Separates flagship project from all projects
 * @param allProjects - All GitHub repositories
 * @param flagshipName - Name of the flagship project
 * @returns Object with flagship and other projects
 */
function extractFlagship(allProjects: GithubRepo[], flagshipName: string) {
    const flagshipRepo = allProjects.find(r => r.name === flagshipName) || null;
    const otherProjects = allProjects.filter(r => r.name !== flagshipName);
    return { flagship: flagshipRepo, others: otherProjects };
}

export const useGithubProjects = () => {
    const [projects, setProjects] = useState<GithubRepo[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [flagship, setFlagship] = useState<GithubRepo | null>(null);

    const isMounted = useRef(true);

    const fetchData = useCallback(async (signal?: AbortSignal) => {
        try {
            setLoading(true);
            const data = await githubService.fetchUserRepos(ABOUT_ME_DATA.personal.github, signal);

            if (isMounted.current) {
                if (data) {
                    // Filter out non-owner repos if needed
                    const sorted = data.sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime());

                    // Use helper to extract flagship
                    const flagshipName = ABOUT_ME_DATA.personal.flagshipProject;
                    const { flagship: flagshipRepo, others: otherProjects } = extractFlagship(sorted, flagshipName);

                    setProjects(otherProjects);
                    setFlagship(flagshipRepo);

                    const timestamp = Date.now();
                    // SAFE: Store with error handling (app continues if save fails)
                    safeLocalStorage.setItem(CACHE_KEY_PROJECTS, { data: sorted, timestamp });
                } else {
                    setError('Failed to fetch projects');
                }
                setLoading(false);
            }
        } catch (err) {
            // Don't log abort errors
            if (err instanceof Error && err.name === 'AbortError') return;

            if (isMounted.current) {
                logger.error(err);
                setError('An error occurred');
                setLoading(false);
            }
        }
    }, []);

    useEffect(() => {
        isMounted.current = true;
        // AbortController to cancel fetch on unmount
        const controller = new AbortController();

        const loadInitialData = async () => {
            const now = Date.now();
            // SAFE: Use safe storage wrapper
            const cachedResult = safeLocalStorage.getItem<{
                data: GithubRepo[];
                timestamp: number;
            }>(CACHE_KEY_PROJECTS);
            let hasValidCache = false;

            if (cachedResult.success && cachedResult.data) {
                const cached = cachedResult.data;

                // Validate cache structure
                if (cached.timestamp && Array.isArray(cached.data)) {
                    if (now - cached.timestamp < CACHE_TIMEOUT) {
                        const sorted: GithubRepo[] = cached.data;

                        // Use helper to extract flagship
                        const flagshipName = ABOUT_ME_DATA.personal.flagshipProject;
                        const { flagship: flagshipRepo, others: otherProjects } = extractFlagship(sorted, flagshipName);

                        setProjects(otherProjects);
                        setFlagship(flagshipRepo);
                        setLoading(false);
                        hasValidCache = true;
                    }
                }
            }

            if (!hasValidCache) {
                await fetchData(controller.signal);
            }
        };

        loadInitialData();

        return () => {
            isMounted.current = false;
            // Cancel ongoing fetch request
            controller.abort();
        };
    }, [fetchData]);

    return { projects, flagship, loading, error };
};
