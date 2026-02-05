import type { SimpleIcon } from 'simple-icons';

export interface TechStackItem {
    name: string;
    icon: SimpleIcon;
    color?: string; // Optional override, otherwise use icon.hex
}

export interface TechCategory {
    category: "Frontend" | "Backend" | "Database" | "DevOps" | "Other";
    items: TechStackItem[];
}

export interface ProjectMetadata {
    id: string;             // Unique internal ID
    repoName: string;       // EXACT match to GitHub repository name
    officialName: string;   // Display name
    description: string;    // Curated short description

    topFeatures: [string, string]; // Strict tuple of 2 items
    topFailures: [string, string]; // Strict tuple of 2 items

    techStack: TechCategory[];     // Categorized stack

    // Optional extras
    demoVideoUrl?: string;
    architectureImage?: string;
    liveStatusUrl?: string;
}
