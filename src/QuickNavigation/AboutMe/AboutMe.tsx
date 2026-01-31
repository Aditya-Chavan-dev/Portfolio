import { useDeviceType } from '@/hooks/useDeviceType';
import { AboutMeDesktop } from './AboutMeDesktop';
import { AboutMeMobile } from './AboutMeMobile';

export const AboutMe = () => {
    const { isMobile } = useDeviceType();
    return isMobile ? <AboutMeMobile /> : <AboutMeDesktop />;
};
