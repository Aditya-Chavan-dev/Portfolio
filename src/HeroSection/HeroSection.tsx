import { isMobile } from '@/shared/utils/device';
import { HeroSectionDesktop } from './HeroSectionDesktop';
import { HeroSectionMobile } from './HeroSectionMobile';

interface HeroSectionProps {
    onStartJourney: () => void;
}

export const HeroSection = ({ onStartJourney }: HeroSectionProps) => {
    return isMobile() ? (
        <HeroSectionMobile onStartJourney={onStartJourney} />
    ) : (
        <HeroSectionDesktop onStartJourney={onStartJourney} />
    );
};
