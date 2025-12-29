const express = require('express');
const axios = require('axios');
const router = express.Router();

const GITHUB_API_BASE = 'https://api.github.com';
const CONTRIBUTIONS_API_BASE = 'https://github-contributions-api.jogruber.de/v4';
const USERNAME = 'Aditya-Chavan-dev';

// Helper to calculate streak
const calculateCalendarStreak = (data) => {
    if (!data || !data.contributions) return 0;
    const contributions = data.contributions.sort((a, b) => new Date(b.date) - new Date(a.date));
    const todayStr = new Date().toISOString().split('T')[0];

    // Yesterday
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];

    let currentStreak = 0;
    let startIndex = contributions.findIndex(c => c.date === todayStr);

    if (startIndex !== -1 && contributions[startIndex].count > 0) {
        // Started today
    } else {
        // Check yesterday
        startIndex = contributions.findIndex(c => c.date === yesterdayStr);
        if (startIndex === -1 || contributions[startIndex].count === 0) {
            return 0; // No streak
        }
    }

    // Count backwards
    for (let i = startIndex; i < contributions.length; i++) {
        if (contributions[i].count > 0) {
            currentStreak++;
            // Check gaps (simplified)
            if (i < contributions.length - 1) {
                const curr = new Date(contributions[i].date);
                const next = new Date(contributions[i + 1].date);
                const diff = Math.abs(curr - next);
                const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
                if (days > 1) break;
            }
        } else {
            break;
        }
    }
    return currentStreak;
};

router.get('/', async (req, res) => {
    try {
        console.log(`[GITHUB] Fetching stats for ${USERNAME}...`);

        const [userRes, reposRes, calendarRes] = await Promise.all([
            axios.get(`${GITHUB_API_BASE}/users/${USERNAME}`),
            axios.get(`${GITHUB_API_BASE}/users/${USERNAME}/repos?per_page=100&sort=pushed`),
            axios.get(`${CONTRIBUTIONS_API_BASE}/${USERNAME}`)
        ]);

        const publicRepos = userRes.data.public_repos;
        const repos = reposRes.data;

        // Contributions
        const totalContributions = calendarRes.data.contributions.reduce((acc, day) => acc + day.count, 0);

        // Tech Stack
        const languageMap = {};
        repos.forEach(repo => {
            if (repo.language) {
                languageMap[repo.language] = (languageMap[repo.language] || 0) + 1;
            }
        });
        const topStack = Object.entries(languageMap)
            .sort(([, a], [, b]) => b - a)
            .slice(0, 5)
            .map(([name]) => ({ name }));

        // Streak
        const streak = calculateCalendarStreak(calendarRes.data);

        const stats = {
            loc: totalContributions,
            repos: publicRepos,
            streak: `${streak} Days`,
            stack: topStack.length > 0 ? topStack : null, // Frontend has fallback
            timestamp: Date.now()
        };

        res.json(stats);

    } catch (error) {
        console.error("[GITHUB] Error fetching stats:", error.message);
        res.status(500).json({ error: "Failed to fetch GitHub stats" });
    }
});

module.exports = router;
