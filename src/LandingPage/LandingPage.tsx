import React from 'react';
import { useDeviceType } from '../hooks/useDeviceType';
import { LandingPageDesktop } from './LandingPageDesktop';
import { LandingPageMobile } from './LandingPageMobile';

export const LandingPage: React.FC<{ onEnter: () => void }> = ({ onEnter }) => {
    const { isMobile } = useDeviceType();

    // Orchestrator Logic
    if (isMobile) {
        return <LandingPageMobile onEnter={onEnter} />;
    }

    return <LandingPageDesktop onEnter={onEnter} />;
};
