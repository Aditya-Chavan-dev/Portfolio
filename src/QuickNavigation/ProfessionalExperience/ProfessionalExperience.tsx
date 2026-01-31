import { useDeviceType } from '@/hooks/useDeviceType';
import { ProfessionalExperienceDesktop } from './ProfessionalExperienceDesktop';
import { ProfessionalExperienceMobile } from './ProfessionalExperienceMobile';

export const ProfessionalExperience = () => {
    const { isMobile } = useDeviceType();
    return isMobile ? <ProfessionalExperienceMobile /> : <ProfessionalExperienceDesktop />;
};
