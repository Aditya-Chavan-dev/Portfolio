import { useDeviceType } from '@/hooks/useDeviceType';
import { ProfessionalExperienceDesktop } from './ProfessionalExperienceDesktop';
import { ProfessionalExperienceMobile } from './ProfessionalExperienceMobile';

interface ProfessionalExperienceProps {
    onNavigate: (section: string) => void;
}

export const ProfessionalExperience = ({ onNavigate }: ProfessionalExperienceProps) => {
    const { isMobile } = useDeviceType();
    return isMobile ? <ProfessionalExperienceMobile onBack={() => onNavigate('hero')} /> : <ProfessionalExperienceDesktop />;
};
