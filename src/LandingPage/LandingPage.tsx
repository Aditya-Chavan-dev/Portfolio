import { isMobile } from '@/shared/utils/device';
import { LandingPageDesktop } from './LandingPageDesktop';
import { LandingPageMobile } from './LandingPageMobile';

export const LandingPage = () => {
    return isMobile() ? <LandingPageMobile /> : <LandingPageDesktop />;
};
