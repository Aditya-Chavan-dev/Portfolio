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

        // 0. Config Headers to avoid 403 (GitHub requires User-Agent)
        const headers = {
            'User-Agent': 'Portfolio-Backend-Service',
            'Accept': 'application/vnd.github.v3+json'
        };
        if (process.env.GITHUB_TOKEN) {
            headers['Authorization'] = `token ${process.env.GITHUB_TOKEN}`;
        }

        // 1. Fetch User Profile
        const userRes = await axios.get(`${GITHUB_API_BASE}/users/${USERNAME}`, { headers });
        const createdAt = new Date(userRes.data.created_at);
        const startYear = createdAt.getFullYear();
        const currentYear = new Date().getFullYear();

        // 2. Fetch Repos
        const reposRes = await axios.get(`${GITHUB_API_BASE}/users/${USERNAME}/repos?per_page=100&sort=pushed`, { headers });

        // 3. Fetch Contributions for ALL years
        // Note: Jogruber API might also need UA or might be rate limiting shared IPs
        const contributionPromises = [];
        for (let year = startYear; year <= currentYear; year++) {
            contributionPromises.push(axios.get(`${CONTRIBUTIONS_API_BASE}/${USERNAME}?y=${year}`));
        }

        const contributionResponses = await Promise.all(contributionPromises);


        const publicRepos = userRes.data.public_repos;
        const repos = reposRes.data;

        // Contributions: Sum up ALL years
        let totalContributions = 0;
        let allContributions = []; // Flattened list for streak calc

        contributionResponses.forEach(res => {
            // Jogruber API returns { total: { [year]: count }, contributions: [...] }
            // Safe summing
            if (res.data.total) {
                Object.values(res.data.total).forEach(count => totalContributions += count);
            }

            if (res.data.contributions) {
                allContributions = [...allContributions, ...res.data.contributions];
            }
        });

        // Use the most recent year's data structure for streak calculation or the merged list
        const streakData = { contributions: allContributions };

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
        const streak = calculateCalendarStreak(streakData);

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
