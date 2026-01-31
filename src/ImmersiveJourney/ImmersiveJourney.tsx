import { isMobile } from '@/shared/utils/device';
import { ImmersiveJourneyDesktop } from './ImmersiveJourneyDesktop';
import { ImmersiveJourneyMobile } from './ImmersiveJourneyMobile';

export const ImmersiveJourney = () => {
    return isMobile() ? <ImmersiveJourneyMobile /> : <ImmersiveJourneyDesktop />;
};
