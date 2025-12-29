const express = require('express');
const axios = require('axios');
const router = express.Router();

const USERNAME = 'Aditya-Chavan-dev';

// Helper to calculate streak from GraphQL data
const calculateCalendarStreak = (data) => {
    if (!data || !data.contributions) return 0;
    // GraphQL returns sorted by date ASC usually, but let's reverse to be safe for backward counting
    const contributions = [...data.contributions].reverse();

    const todayStr = new Date().toISOString().split('T')[0];

    // Yesterday
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];

    let currentStreak = 0;

    // Check start
    let startIndex = contributions.findIndex(c => c.date === todayStr);

    if (startIndex !== -1 && contributions[startIndex].count > 0) {
        // Started today
    } else {
        startIndex = contributions.findIndex(c => c.date === yesterdayStr);
        if (startIndex === -1 || contributions[startIndex].count === 0) {
            return 0; // No streak
        }
    }

    // Count backwards from startIndex
    for (let i = startIndex; i < contributions.length; i++) {
        if (contributions[i].count > 0) {
            currentStreak++;
            // Check gaps
            if (i < contributions.length - 1) {
                const curr = new Date(contributions[i].date);
                const next = new Date(contributions[i + 1].date);
                // Difference should be 1 day (approx 86400000ms)
                // Since we are iterating backwards, curr is NEWER than next
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
        console.log(`[GITHUB] Fetching stats for ${USERNAME} via GraphQL...`);

        if (!process.env.GITHUB_TOKEN) {
            console.warn("[GITHUB] No GITHUB_TOKEN found. GraphQL API requires auth.");
            return res.status(500).json({ error: "Missing GITHUB_TOKEN in backend environment variables. Please add it in Render Dashboard." });
        }

        const query = `
          query($username: String!) {
            user(login: $username) {
              contributionsCollection {
                contributionCalendar {
                  totalContributions
                  weeks {
                    contributionDays {
                      contributionCount
                      date
                    }
                  }
                }
              }
              repositories(first: 100, orderBy: {field: PUSHED_AT, direction: DESC}, privacy: PUBLIC) {
                nodes {
                  languages(first: 1, orderBy: {field: SIZE, direction: DESC}) {
                    edges {
                      node {
                        name
                      }
                    }
                  }
                }
              }
            }
          }
        `;

        const headers = {
            'Authorization': `bearer ${process.env.GITHUB_TOKEN}`,
            'User-Agent': 'Portfolio-Backend'
        };

        // Execute GraphQL Query
        const response = await axios.post('https://api.github.com/graphql', {
            query,
            variables: { username: USERNAME }
        }, { headers });

        if (response.data.errors) {
            console.error("GraphQL Error:", JSON.stringify(response.data.errors));
            throw new Error("GitHub GraphQL Query Failed");
        }

        const data = response.data.data.user;

        // Extract Data
        const totalContributions = data.contributionsCollection.contributionCalendar.totalContributions;

        // Flatten calendar for streak calc
        const allContributions = data.contributionsCollection.contributionCalendar.weeks
            .flatMap(week => week.contributionDays)
            .map(day => ({
                date: day.date,
                count: day.contributionCount
            }));

        // Parse Tech Stack
        const languageMap = {};
        if (data.repositories && data.repositories.nodes) {
            data.repositories.nodes.forEach(repo => {
                if (repo.languages && repo.languages.edges && repo.languages.edges[0]) {
                    const langName = repo.languages.edges[0].node.name;
                    languageMap[langName] = (languageMap[langName] || 0) + 1;
                }
            });
        }

        const topStack = Object.entries(languageMap)
            .sort(([, a], [, b]) => b - a)
            .slice(0, 5)
            .map(([name]) => ({ name }));

        const streak = calculateCalendarStreak({ contributions: allContributions });

        // Return Stats
        const stats = {
            loc: totalContributions,
            repos: data.repositories.nodes.length,
            streak: `${streak} Days`,
            stack: topStack.length > 0 ? topStack : null,
            timestamp: Date.now()
        };

        res.json(stats);

    } catch (error) {
        console.error("[GITHUB] Error fetching stats:", error.message);
        res.status(500).json({ error: "Failed to fetch GitHub stats" });
    }
});

module.exports = router;
