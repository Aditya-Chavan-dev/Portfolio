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
            title: "Employee Benefit: The 'Zero-Touch' Workflow",
            overview: "Attendance was assumed, not recorded. Employees showed up and worked, but their attendance depended on pre-planned schedules and managerial memory. If something was missed or questioned later, there was no clear proof.",
            problem: [
                "Uncertainty - Being present didn't always mean being recorded.",
                "No Ownership - Employees had no direct way to confirm their attendance.",
                "Silent Risk - Honest work could be overlooked without anyone at fault."
            ],
            solution: [
                "One Tap - Employees open the app and tap Mark In.",
                "Automatic Time Capture - The system records the exact time - no manual entry.",
                "Instant Confirmation - A clear success screen confirms attendance is locked."
            ],
            impact: "Employees gained control and clarity. With a single tap, attendance is recorded instantly and securely—no assumptions, no dependence on memory. Just a simple action that ensures their presence is counted—every time."
        },
        {
            title: "Executive Benefit: The 'Decision-First' Engine",
            overview: "The Managing Director was buried in data entry. Each month, attendance review meant opening spreadsheets and manually marking Present or Absent across dozens of days. Valuable executive time was spent filling cells instead of making decisions.",
            problem: [
                "Time Drain — Days spent on repetitive, low-value work.",
                "Mental Fatigue — Reviewing raw data without structure.",
                "Role Misalignment — The MD became a Data Clerk, not a Director."
            ],
            solution: [
                "Approval-First — Attendance flows upward into a single queue.",
                "Structured Queue — Raw data is pre-validated for decisions.",
                "Bulk Efficiency — Confirm or reject valid claims with one click."
            ],
            impact: "We redesigned the system around Executive Intent. Instead of fighting spreadsheets, work shifted from Typing to Deciding. What took days now resolves in minutes. He is no longer recording data; he is validating truth."
        },
        {
            title: "Developer Integrity: The 'Unbreakable' Handshake",
            overview: "In the old system, 'Compensatory Offs' were handshake deals—'I worked Sunday, give me a day off next week.' These verbal agreements were often forgotten, leading to disputes, resentment, and a breakdown of trust.",
            problem: [
                "Memory Leaks — Verbal deals vanished over time.",
                "Friction — Employees had to 'beg' for earned rights.",
                "Opacity — No clear record of who owed what."
            ],
            solution: [
                "Logic Interceptor — Detects holiday work during approval.",
                "Executive Safeguard — Warns MD: 'Approving this costs 1 Credit'.",
                "Atomic Execution — Instantly locks attendance & deposits leave."
            ],
            impact: "I codified the handshake. The system acts as a neutral arbitrator. The MD validates work without fear of accidental costs, and employees never have to negotiate for what they have mathematically earned."
        },
        {
            title: "System Security: The 'Ghost Protocol' Defense",
            overview: "An Excel sheet has no walls—anyone with the file owns the company. We built a digital fortress with a unique twist: Invisibility. Most apps let attackers knock on the door (Login Screen). We removed the door entirely.",
            problem: [
                "Open Targets — Login screens invite brute-force attacks.",
                "Information Leak — 'Access Denied' confirms the system exists.",
                "Zero Accountability — File-based systems lack read-ledgers."
            ],
            solution: [
                "Whitelist-First — Access is verified against an internal hard-list.",
                "Instant Kill-Switch — Unauthorized accounts are destroyed in 200ms.",
                "Crypto-Signing — Every action is digitally stamped with identity."
            ],
            impact: "To an outsider, the system simply doesn't exist. We replaced 'Access Denied' with non-existence. Access is binary, verification is cryptographic, and security is absolute."
        }
    ],

    // 6. Critical Failures (Sidebar List)
    failures: [
        {
            id: "f1",
            title: "The 30x Speedup",
            summary: "Legacy code fetched data day-by-day.",
            failure: "Serial Fetching caused 6s load times.",
            solution: "Promise.all() Parallel Aggregation.",
            outcome: "Dropped to 0.3s."
        }
    ]
};
