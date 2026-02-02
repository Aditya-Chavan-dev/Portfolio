
// Import simple-icons for official brand icons
import {
    siJavascript,
    siReact,
    siFirebase,
    siNodedotjs,
    siPython,
    siFlask,
    siFastapi,
    siTypescript,
    siTailwindcss,
    siMysql
} from 'simple-icons';

export const ABOUT_ME_DATA = {
    personal: {
        name: "Aditya Chavan",
        headline: "Full Stack Developer",
        summary: "I am a passionate developer who translates complex logic into elegant, interactive experiences. With a deep focus on performance and strictly typed systems, I build software that feels as good as it looks.",
        location: "Flexible to relocation",
        email: "satyagchavan3@gmail.com",
        github: "Aditya-Chavan-dev"
    },
    education: [
        {
            id: 1,
            degree: "Bachelor of Computer Science",
            institution: "Smt. Kashibai Navale College Of Engineering",
            year: "2021 - 2025",
            grade: "CGPA: 8.71 / 10"
        },
        {
            id: 2,
            degree: "Higher Secondary Education",
            institution: "MAEER'S MIT Junior College",
            year: "2019 - 2021",
            grade: "88.5%"
        },
        {
            id: 3,
            degree: "Secondary Education",
            institution: "Dnyanganga English Medium School",
            year: "2019",
            grade: "91.20%"
        }
    ],
    techStack: {
        frontend: [
            {
                name: "JavaScript",
                iconPath: siJavascript.path,
                color: siJavascript.hex
            },
            {
                name: "TypeScript",
                iconPath: siTypescript.path,
                color: siTypescript.hex
            },
            {
                name: "React",
                iconPath: siReact.path,
                color: siReact.hex
            },
            {
                name: "TailwindCSS",
                iconPath: siTailwindcss.path,
                color: siTailwindcss.hex
            }
        ],
        backend: [
            {
                name: "Node.js",
                iconPath: siNodedotjs.path,
                color: siNodedotjs.hex
            },
            {
                name: "Python",
                iconPath: siPython.path,
                color: siPython.hex
            },
            {
                name: "Flask",
                iconPath: siFlask.path,
                color: siFlask.hex
            },
            {
                name: "FastAPI",
                iconPath: siFastapi.path,
                color: siFastapi.hex
            }
        ],
        database: [
            {
                name: "MySQL",
                iconPath: siMysql.path,
                color: siMysql.hex
            },
            {
                name: "Firebase RTDB",
                iconPath: siFirebase.path,
                color: siFirebase.hex
            }
        ],
        other: [
            {
                name: "Firebase",
                iconPath: siFirebase.path,
                color: siFirebase.hex
            }
        ]
    }
};

// Helper for Lucide icons since we can't store components directly in JSON if we move this later,
// but for TS file it's fine.
