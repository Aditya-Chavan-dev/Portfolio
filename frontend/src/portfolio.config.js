
const config = {
    // Phase 1: The Gateway
    entry: {
        title: "Restricted Access",
        subtitle: "Secure connection request detected.",
        message: `Most portfolios are static documents you read.
This is a live production environment you experience.

I have built this system to demonstrate the engineering standards you are looking not just for a candidate, but for a solution.`,
        buttonText: "Initialize Live Session"
    },

    // Phase 2: The Handshake
    handshake: {
        steps: [
            "establishing_secure_connection",
            "assigning_session_id", // Updated as requested
            "loading_assets_core",
            "optimizing_experience"
        ],
        completionMessage: "Environment Loaded."
    },

    // Phase 3: The Dashboard (Hero)
    hero: {
        name: "ADITYA CHAVAN",
        githubUsername: "Aditya-Chavan-dev", // Used for fetching real stats
        role: "Full Stack System Architect",
        tagline: "I don't just write code. I build digital assets that compound in value.",

        // The "Holographic" Identity
        identity: {
            status: "available", // 'available' | 'busy' | 'offline'
            availabilityText: "Available for Hire"
        },

        // The Metrics Ticker
        metrics: {
            loc: {
                label: "Contributions",
                value: 2000,
                suffix: "+"
            },
            commits: {
                label: "Git Commits",
                value: 2450
            },
            streak: {
                label: "Github Streak",
                value: "42 Days",
                icon: "fire"
            }
        },

        // Tech Stack "Engine"
        stack: [
            { name: "React 18", type: "Core" },
            { name: "Node.js", type: "Runtime" },
            { name: "Postgres", type: "Database" }
        ]
    }
};

export default config;
