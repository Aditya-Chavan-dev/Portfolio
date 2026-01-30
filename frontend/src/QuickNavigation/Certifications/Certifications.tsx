import { isMobile } from '@/shared/utils/device';
import { CertificationsDesktop } from './CertificationsDesktop';
import { CertificationsMobile } from './CertificationsMobile';

export const Certifications = () => {
    return isMobile() ? <CertificationsMobile /> : <CertificationsDesktop />;
};
