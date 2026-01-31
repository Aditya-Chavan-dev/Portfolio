import { useDeviceType } from '@/hooks/useDeviceType';
import { CertificationsDesktop } from './CertificationsDesktop';
import { CertificationsMobile } from './CertificationsMobile';

export const Certifications = () => {
    const { isMobile } = useDeviceType();
    return isMobile ? <CertificationsMobile /> : <CertificationsDesktop />;
};
