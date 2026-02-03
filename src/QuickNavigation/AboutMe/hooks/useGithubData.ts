import { useState, useEffect } from 'react';
import { ABOUT_ME_DATA } from '@/data/aboutMeData';
import { githubService } from '@/services/githubService';

export const useGithubData = () => {
    const [stats, setStats] = useState<any>(null);
    const [contributions, setContributions] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [githubStats, githubContribs] = await Promise.all([
                    githubService.fetchUserStats(ABOUT_ME_DATA.personal.github),
                    githubService.fetchContributions(ABOUT_ME_DATA.personal.github)
                ]);
                setStats(githubStats);
                setContributions(githubContribs);
            } catch (error) {
                console.error('Error fetching GitHub data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const streak = contributions?.contributions
        ? githubService.calculateStreak(contributions.contributions)
        : 0;

    return { stats, contributions, streak, loading };
};
