import React, { useMemo } from 'react';
import config from '../../portfolio.config';
import ProjectTemplate from './ProjectTemplate';
import AtlasProject from './items/AtlasProject'; // Static Import

const ProjectDetailsPage = ({ project, onClose, onTechClick }) => {
    // 1. Normalize Helper (Memoized to avoid re-creation)
    const normalizedName = useMemo(() => {
        return project.name ? project.name.toLowerCase().replace(/[^a-z0-9]/g, '') : '';
    }, [project.name]);

    // 2. ROUTER: Check if we have a Dedicated Component file
    if (normalizedName.includes('atlas')) {
        return <AtlasProject onClose={onClose} onTechClick={onTechClick} />;
    }

    // --- FALLBACK GENERIC TEMPLATE ---
    // Use useMemo for all derived data to prevent recalculation on parent re-renders
    const templateData = useMemo(() => {
        // ... (Memoized data logic remains unchanged)
        // Lookup Metadata
        const metadataKey = Object.keys(config.projectDetails || {}).find(
            key => {
                const normalizedKey = key.toLowerCase().replace(/[^a-z0-9]/g, '');
                return normalizedKey === normalizedName || normalizedName.includes(normalizedKey);
            }
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

        return { title, description, timeline, links, techStack, features, failures };
    }, [project, normalizedName]);

    return (
        <ProjectTemplate
            title={templateData.title}
            description={templateData.description}
            timeline={templateData.timeline}
            links={templateData.links}
            techStack={templateData.techStack}
            features={templateData.features}
            failures={templateData.failures}
            onClose={onClose}
            onTechClick={onTechClick}
        />
    );
};

export default ProjectDetailsPage;
