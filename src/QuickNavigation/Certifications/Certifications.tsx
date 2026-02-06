import { useDeviceType } from '@/hooks/useDeviceType';
import { CertificationsDesktop } from './CertificationsDesktop';
import { CertificationsMobile } from './CertificationsMobile';

interface CertificationsProps {
    onNavigate: (section: string) => void;
}

export const Certifications = ({ onNavigate }: CertificationsProps) => {
    const { isMobile } = useDeviceType();
    return isMobile
        ? <CertificationsMobile onBack={() => onNavigate('hero')} onNavigate={onNavigate} />
        : <CertificationsDesktop onNavigate={onNavigate} />;
};
