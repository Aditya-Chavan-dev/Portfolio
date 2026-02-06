import { useDeviceType } from '@/hooks/useDeviceType';
import { ProjectDesktop } from './ProjectDesktop';
import { ProjectMobile } from './ProjectMobile';

interface ProjectProps {
    onNavigate: (section: string) => void;
}

export const Project = ({ onNavigate }: ProjectProps) => {
    const { isMobile } = useDeviceType();
    return isMobile ? <ProjectMobile onBack={() => onNavigate('hero')} /> : <ProjectDesktop />;
};
