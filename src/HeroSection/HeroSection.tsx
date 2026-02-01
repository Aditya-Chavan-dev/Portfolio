import { useDeviceType } from '@/hooks/useDeviceType';
import { HeroSectionDesktop } from './HeroSectionDesktop';
import { HeroSectionMobile } from './HeroSectionMobile';

interface HeroSectionProps {
    onStartJourney: () => void;
    onNavigate: (section: string) => void;
}

export const HeroSection = ({ onStartJourney, onNavigate }: HeroSectionProps) => {
    const { isMobile } = useDeviceType();
    return isMobile ? (
        <HeroSectionMobile onStartJourney={onStartJourney} onNavigate={onNavigate} />
    ) : (
        <HeroSectionDesktop onStartJourney={onStartJourney} onNavigate={onNavigate} />
    );
};
