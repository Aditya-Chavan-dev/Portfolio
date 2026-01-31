import { useDeviceType } from '@/hooks/useDeviceType';
import { HeroSectionDesktop } from './HeroSectionDesktop';
import { HeroSectionMobile } from './HeroSectionMobile';

interface HeroSectionProps {
    onStartJourney: () => void;
}

export const HeroSection = ({ onStartJourney }: HeroSectionProps) => {
    const { isMobile } = useDeviceType();
    return isMobile ? (
        <HeroSectionMobile onStartJourney={onStartJourney} />
    ) : (
        <HeroSectionDesktop onStartJourney={onStartJourney} />
    );
};
