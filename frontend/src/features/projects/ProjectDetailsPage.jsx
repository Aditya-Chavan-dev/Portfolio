import React from 'react';
import config from '../../portfolio.config';
import ProjectTemplate from './ProjectTemplate';
import AtlasProject from './items/AtlasProject'; // Static Import

const ProjectDetailsPage = ({ project, onClose }) => {
    // 1. Normalize Helper
    const normalize = (str) => str ? str.toLowerCase().replace(/[^a-z0-9]/g, '') : '';
    const normalizedName = normalize(project.name);

    console.log("[ProjectDetailsPage] Opening:", project.name);

    // 2. ROUTER: Check if we have a Dedicated Component file for this project
    if (normalizedName.includes('atlas')) {
        console.log("[ProjectDetailsPage] Rendering AtlasProject (Static)...");
        return <AtlasProject onClose={onClose} />;
    }

    // --- FALLBACK GENERIC TEMPLATE ---
    // If no dedicated file exists, use the "Auto-Hydration" engine (GitHub Data + Config)

    // Lookup Metadata from Config (Legacy/Generic Support)
    const metadataKey = Object.keys(config.projectDetails || {}).find(
        key => normalize(key) === normalizedName || normalizedName.includes(normalize(key))
    );
    const metadata = config.projectDetails?.[metadataKey] || {};

    // Prepare Data
    const title = project.name || metadata?.title || "Untitled Project";
    const description = metadata?.description || project.description || "This project is currently under active development.";

    // Timeline
    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    };
    const timeline = (project.created_at && project.pushed_at)
        ? `${formatDate(project.created_at)} - ${formatDate(project.pushed_at)}`
        : "Timeline Unavailable";

    const links = {
        demo: project.homepage || metadata?.demoUrl || '#',
        source: project.html_url || metadata?.repoUrl || '#'
    };

    const techStack = metadata?.tech || {
        frontend: ['React', 'Vite'],
        backend: [],
        database: [],
        versionControl: ['Git']
    };

    const features = metadata?.features || [
        { title: "Feature 01 (Pending)" }, { title: "Feature 02 (Pending)" },
        { title: "Feature 03 (Pending)" }, { title: "Feature 04 (Pending)" }
    ];

    const failures = metadata?.failures || [
        { title: "Failure 01 (Pending)" }, { title: "Failure 02 (Pending)" },
        { title: "Failure 03 (Pending)" }, { title: "Failure 04 (Pending)" }
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
