import { useState, useEffect } from 'react';
import { WelcomeDesktop } from './WelcomeDesktop';
import { WelcomeMobile } from './WelcomeMobile';

/**
 * Dynamic serving router — selects Desktop or Mobile component
 * based on User-Agent string, not viewport width.
 *
 * This ensures touch-only devices (tablets in landscape, etc.)
 * always get the mobile component regardless of screen size.
 */
function detectMobile(): boolean {
  const ua = navigator.userAgent || '';
  // Match common mobile/tablet UA tokens
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|Tablet/i.test(ua);
}

export const LandingPage: React.FC = () => {
  // Resolve once on mount — UA doesn't change during a session
  const [isMobile] = useState<boolean>(() => detectMobile());

  // Reset body opacity in case we're returning from a fade-out navigation
  useEffect(() => {
    document.body.style.opacity = '1';
    document.body.style.transition = '';
  }, []);

  return isMobile ? <WelcomeMobile /> : <WelcomeDesktop />;
};
