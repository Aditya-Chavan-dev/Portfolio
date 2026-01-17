import React from 'react';
import ProjectTemplate from '../ProjectTemplate';

import { ATLAS_DATA } from '../../../data/projects/atlas';

const AtlasProject = ({ onClose, onTechClick, onHub }) => {
    return (
        <ProjectTemplate
            title={ATLAS_DATA.title}
            description={ATLAS_DATA.description}
            timeline={ATLAS_DATA.timeline}
            links={ATLAS_DATA.links}
            techStack={ATLAS_DATA.tech}
            features={ATLAS_DATA.features}
            failures={ATLAS_DATA.failures}
            onClose={onClose}
            onTechClick={onTechClick}
            onHub={onHub}
        />
    );
};

export default AtlasProject;
