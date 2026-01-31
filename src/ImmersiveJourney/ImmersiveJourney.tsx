import { useDeviceType } from '@/hooks/useDeviceType';
import { ImmersiveJourneyDesktop } from './ImmersiveJourneyDesktop';
import { ImmersiveJourneyMobile } from './ImmersiveJourneyMobile';

export const ImmersiveJourney = () => {
    const { isMobile } = useDeviceType();
    return isMobile ? <ImmersiveJourneyMobile /> : <ImmersiveJourneyDesktop />;
};
