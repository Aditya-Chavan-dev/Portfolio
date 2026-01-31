import { useDeviceType } from '@/hooks/useDeviceType';
import { ProjectDesktop } from './ProjectDesktop';
import { ProjectMobile } from './ProjectMobile';

export const Project = () => {
    const { isMobile } = useDeviceType();
    return isMobile ? <ProjectMobile /> : <ProjectDesktop />;
};
