import { isMobile } from '@/shared/utils/device';
import { HeroSectionDesktop } from './HeroSectionDesktop';
import { HeroSectionMobile } from './HeroSectionMobile';

export const HeroSection = () => {
    return isMobile() ? <HeroSectionMobile /> : <HeroSectionDesktop />;
};
