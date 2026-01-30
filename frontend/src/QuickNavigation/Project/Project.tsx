import { isMobile } from '@/shared/utils/device';
import { ProjectDesktop } from './ProjectDesktop';
import { ProjectMobile } from './ProjectMobile';

export const Project = () => {
    return isMobile() ? <ProjectMobile /> : <ProjectDesktop />;
};
