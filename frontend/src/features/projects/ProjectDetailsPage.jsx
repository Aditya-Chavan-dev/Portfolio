import React from 'react';
import config from '../../portfolio.config';
import ProjectTemplate from './ProjectTemplate';

const ProjectDetailsPage = ({ project, onClose }) => {
    // 1. Normalize Helper
    const normalize = (str) => str ? str.toLowerCase().replace(/[^a-z0-9]/g, '') : '';

    // 2. Lookup Metadata
    const metadataKey = Object.keys(config.projectDetails || {}).find(
        key => normalize(key) === normalize(project.name) || normalize(project.name).includes(normalize(key))
    );
    const metadata = config.projectDetails?.[metadataKey] || {};

    // 3. Prepare Data (Auto-Fetched from GitHub where possible)

    // Project Name (Repo Name)
    const title = project.name || metadata?.title || "Untitled Project";

    // Description
    const description = metadata?.description || project.description || "This project is currently under active development. Detailed architectural documentation, feature breakdowns, and forensic failure analysis are being compiled and will be rendered here automatically upon next deployment.";

    // Timeline: Auto-calculated from Commit History (Provied by GitHub API dates)
    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    };

    const start = formatDate(project.created_at); // First Commit / Repo Creation
    const end = formatDate(project.pushed_at);    // Last Commit / Update
    const timeline = (start && end) ? `${start} - ${end}` : "Timeline Unavailable";

    // Links
    const links = {
        demo: project.homepage || metadata?.demoUrl || '#',
        source: project.html_url || metadata?.repoUrl || '#'
    };

    // Tech Stack
    // If config has tech, use it. Else try to construct from project topics/language if accessible, or default.
    const techStack = metadata?.tech || {
        frontend: ['React', 'Vite', 'Tailwind'],
        backend: ['Node.js'],
        database: [],
        versionControl: ['Git', 'GitHub']
    };

    // Features (Auto-Gen Placeholders if missing)
    const features = metadata?.features || metadata?.flagshipFeatures || [
        { title: "Flagship Feature 01" },
        { title: "Flagship Feature 02" },
        { title: "Flagship Feature 03" },
        { title: "Flagship Feature 04" }
    ];

    // Failures (Auto-Gen Placeholders if missing)
    const failures = metadata?.failures || [
        { title: "Critical Failure 01" },
        { title: "Critical Failure 02" },
        { title: "Critical Failure 03" },
        { title: "Critical Failure 04" }
    ];

    return (
        <ProjectTemplate
            title={title}
            description={description}
            timeline={timeline}
            links={links}
            techStack={techStack}
            features={features}
            failures={failures}
            onClose={onClose}
        />
    );
};

export default ProjectDetailsPage;
