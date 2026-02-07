import { useState, useEffect, useRef, useCallback } from 'react';
import { githubService, type GithubRepo } from '@/services/githubService';
import { ABOUT_ME_DATA } from '@/data/aboutMeData';
import { CACHE_KEY_PROJECTS, CACHE_TIMEOUT } from '@/utils/constants';

export const useGithubProjects = () => {
    const [projects, setProjects] = useState<GithubRepo[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [flagship, setFlagship] = useState<GithubRepo | null>(null);

    const isMounted = useRef(true);

    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            const data = await githubService.fetchUserRepos(ABOUT_ME_DATA.personal.github);

            if (isMounted.current) {
                if (data) {
                    // Filter out non-owner repos if needed
                    const sorted = data.sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime());

                    // Identify Flagship
                    const flagshipName = ABOUT_ME_DATA.personal.flagshipProject;
                    const flagshipRepo = sorted.find(r => r.name === flagshipName) || null;
                    const otherProjects = sorted.filter(r => r.name !== flagshipName);

                    setProjects(otherProjects);
                    setFlagship(flagshipRepo);

                    const timestamp = Date.now();
                    localStorage.setItem(CACHE_KEY_PROJECTS, JSON.stringify({ data: sorted, timestamp }));
                } else {
                    setError('Failed to fetch projects');
                }
                setLoading(false);
            }
        } catch (err) {
            if (isMounted.current) {
                console.error(err);
                setError('An error occurred');
                setLoading(false);
            }
        }
    }, []);

    useEffect(() => {
        isMounted.current = true;

        const loadInitialData = async () => {
            const now = Date.now();
            const cachedProjectsStr = localStorage.getItem(CACHE_KEY_PROJECTS);
            let hasValidCache = false;

            if (cachedProjectsStr) {
                try {
                    const cached = JSON.parse(cachedProjectsStr);
                    if (now - cached.timestamp < CACHE_TIMEOUT) {
                        const sorted: GithubRepo[] = cached.data;

                        // Identify Flagship from cache
                        const flagshipName = ABOUT_ME_DATA.personal.flagshipProject;
                        const flagshipRepo = sorted.find(r => r.name === flagshipName) || null;
                        const otherProjects = sorted.filter(r => r.name !== flagshipName);

                        setProjects(otherProjects);
                        setFlagship(flagshipRepo);
                        setLoading(false);
                        hasValidCache = true;
                    }
                } catch (e) {
                    console.error('Project Cache Parse Error', e);
                }
            }

            if (!hasValidCache) {
                await fetchData();
            }
        };

        loadInitialData();

        return () => {
            isMounted.current = false;
        };
    }, [fetchData]);

    return { projects, flagship, loading, error };
};
