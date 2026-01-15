export const ATLAS_DATA = {
    // 1. Metadata
    title: "ATLAS", // Required for lookup
    description: "The Managing Director carried the mental burden of tracking 10+ sites daily. It was a high-stakes memory game. If they forgot to call a site, the attendance data was lost forever, forcing a reliance on unverified claims.",

    // 2. Tech Stack
    tech: {
        frontend: ["React", "Vite", "TanStack Query", "Tailwind"],
        backend: ["Firebase Cloud Functions", "Node.js"],
        database: ["Firebase Realtime Database"],
        versionControl: ["Git", "GitHub"]
    },

    // 3. Links
    links: {
        demo: "#", // Placeholder
        source: "https://github.com/Aditya-Chavan-dev/Atlas" // Will be auto-synced ideally, but good to have explicit override
    },

    // 4. Timeline
    timeline: "Dec 2025 - Present",

    // 5. Flagship Features (1-2-1 Grid)
    features: [
        {
            title: "The 'Cognitive Load' Assassin",
            overview: "The Managing Director carried the mental burden of tracking 10+ sites daily. It was a high-stakes memory game. If they forgot to call a site, the attendance data was lost forever, forcing a reliance on unverified claims.",
            problem: [
                "Mental Fatigue: Tracking 10+ sites mentally.",
                "Data Loss: Forgotten calls = Lost revenue.",
                "Fraud Risk: 'He-said-she-said' claims."
            ],
            solution: [
                "One-Tap: Open App -> 'Mark In' -> Done.",
                "Server Lock: Immutable timestamp (No fakes).",
                "Instant Feedback: Success card = Zero anxiety."
            ],
            impact: "We shifted the burden from the Brain to the Pocket. The system eliminates valid input. The employee simply taps 'Mark In,' and the server locks the truth. Zero cognitive load, zero fraud, and absolute peace of mind."
        },
        {
            title: "The 'Executive Pivot' Engine",
            // Placeholder: Wireframes will render
        },
        {
            title: "The 'Smart Contract' Logic",
            // Placeholder: Wireframes will render
        },
        {
            title: "The 'Ghost Protocol' Security",
            // Placeholder: Wireframes will render
        }
    ],

    // 6. Critical Failures (Sidebar List)
    failures: [
        // Placeholder for now, copying one structure or leaving empty
        // {
        //     id: "f1",
        //     title: "The 30x Speedup",
        //     summary: "Legacy code fetched data day-by-day.",
        //     failure: "Serial Fetching caused 6s load times.",
        //     solution: "Promise.all() Parallel Aggregation.",
        //     outcome: "Dropped to 0.3s."
        // }
    ]
};
