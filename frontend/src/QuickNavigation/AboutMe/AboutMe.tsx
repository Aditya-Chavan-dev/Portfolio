import { isMobile } from '@/shared/utils/device';
import { AboutMeDesktop } from './AboutMeDesktop';
import { AboutMeMobile } from './AboutMeMobile';

export const AboutMe = () => {
    return isMobile() ? <AboutMeMobile /> : <AboutMeDesktop />;
};
