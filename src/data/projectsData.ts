import type { ProjectMetadata } from '@/types/project';
import {
    siReact,
    siTypescript,
    siTailwindcss,
    siNodedotjs,
    siFirebase,
    siPython,
    siOpencv
} from 'simple-icons';

export const PROJECTS_DATA: ProjectMetadata[] = [
    {
        id: "atlas",
        repoName: "ATLAS", // Must match GitHub repo name exactly
        officialName: "ATLAS",
        description: "A comprehensive portfolio management system designed to showcase technical capabilities and project milestones.",
        topFeatures: [
            "Dynamic Content Loading: Project details fetched in real-time.",
            "Immersive UI: Glassmorphism and gold-glow aesthetic."
        ],
        topFailures: [
            "Initial Load Time: Optimized large asset loading strategies.",
            "Mobile Responsiveness: Refactored grid layouts for smaller screens."
        ],
        techStack: [
            {
                category: "Frontend",
                items: [
                    { name: "React", icon: siReact },
                    { name: "TypeScript", icon: siTypescript },
                    { name: "Tailwind", icon: siTailwindcss }
                ]
            },
            {
                category: "Backend",
                items: [
                    { name: "Node.js", icon: siNodedotjs },
                    { name: "Firebase", icon: siFirebase }
                ]
            }
        ]
    },
    // Template for other projects
    {
        id: "template-project",
        repoName: "example-repo",
        officialName: "Example Project",
        description: "This is a placeholder description for a standardized project.",
        topFeatures: [
            "Feature One: Description of the first key feature.",
            "Feature Two: Description of the second key feature."
        ],
        topFailures: [
            "Failure One: Description of a challenge faced.",
            "Failure Two: Description of another challenge faced."
        ],
        techStack: [
            {
                category: "Backend",
                items: [
                    { name: "Python", icon: siPython }
                ]
            },
            {
                category: "Other",
                items: [
                    { name: "OpenCV", icon: siOpencv }
                ]
            }
        ]
    }
];

export const getProjectMetadata = (repoName: string): ProjectMetadata | undefined => {
    return PROJECTS_DATA.find(p => p.repoName.toLowerCase() === repoName.toLowerCase());
};
