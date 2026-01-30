import { isMobile } from '@/shared/utils/device';
import { ProfessionalExperienceDesktop } from './ProfessionalExperienceDesktop';
import { ProfessionalExperienceMobile } from './ProfessionalExperienceMobile';

export const ProfessionalExperience = () => {
    return isMobile() ? <ProfessionalExperienceMobile /> : <ProfessionalExperienceDesktop />;
};
