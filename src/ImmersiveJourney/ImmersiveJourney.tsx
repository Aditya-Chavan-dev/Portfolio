import { useDeviceType } from '@/hooks/useDeviceType';
import { ImmersiveJourneyDesktop } from './ImmersiveJourneyDesktop';
import { ImmersiveJourneyMobile } from './ImmersiveJourneyMobile';

interface ImmersiveJourneyProps {
    onBack: () => void;
}

export const ImmersiveJourney: React.FC<ImmersiveJourneyProps> = ({ onBack }) => {
    const { isMobile } = useDeviceType();
    return isMobile ? <ImmersiveJourneyMobile onBack={onBack} /> : <ImmersiveJourneyDesktop onBack={onBack} />;
};
