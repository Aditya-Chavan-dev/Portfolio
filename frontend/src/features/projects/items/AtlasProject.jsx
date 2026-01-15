import React from 'react';
import ProjectTemplate from '../ProjectTemplate';

const AtlasProject = ({ onClose }) => {
    // --- CONTENT DEFINITION ---
    const projectData = {
        title: "ATLAS",
        description: "The Managing Director carried the mental burden of tracking 10+ sites daily. It was a high-stakes memory game. If they forgot to call a site, the attendance data was lost forever, forcing a reliance on unverified claims.",

        timeline: "Dec 2025 - Present",

        links: {
            demo: "#",
            source: "https://github.com/Aditya-Chavan-dev/Atlas"
        },

        techStack: {
            frontend: ["React", "Vite", "TanStack Query", "Tailwind"],
            backend: ["Firebase Cloud Functions", "Node.js"],
            database: ["Firebase Realtime Database"],
            versionControl: ["Git", "GitHub"]
        },

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
                // Placeholder
            },
            {
                title: "The 'Smart Contract' Logic",
                // Placeholder
            },
            {
                title: "The 'Ghost Protocol' Security",
                // Placeholder
            }
        ],

        failures: [
            // Placeholders or empty for now
        ]
    };

    return (
        <ProjectTemplate
            title={projectData.title}
            description={projectData.description}
            timeline={projectData.timeline}
            links={projectData.links}
            techStack={projectData.techStack}
            features={projectData.features}
            failures={projectData.failures}
            onClose={onClose}
        />
    );
};

export default AtlasProject;
