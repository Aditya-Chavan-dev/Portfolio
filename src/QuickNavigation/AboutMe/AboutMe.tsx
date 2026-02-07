import { useDeviceType } from '@/hooks/useDeviceType';
import { AboutMeDesktop } from './AboutMeDesktop';
import { AboutMeMobile } from './AboutMeMobile';

interface AboutMeProps {
    onNavigate: (section: string) => void;
}

export const AboutMe = ({ onNavigate }: AboutMeProps) => {
    const { isMobile } = useDeviceType();
    // For Mobile, we map the Back button to navigating to 'hero'
    const handleMobileBack = () => onNavigate('hero');

    return isMobile
        ? <AboutMeMobile onBack={handleMobileBack} />
        : <AboutMeDesktop />;
};
