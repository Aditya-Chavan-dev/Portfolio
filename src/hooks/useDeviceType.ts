import { useState, useEffect } from 'react';
import { BREAKPOINTS } from '@/utils/constants';

export const useDeviceType = () => {
    const [isMobile, setIsMobile] = useState<boolean>(false);

    useEffect(() => {
        // Create media query ONCE using centralized breakpoint constant
        const mobileQuery = window.matchMedia(`(max-width: ${BREAKPOINTS.MOBILE_MAX}px)`);

        const checkDevice = () => {
            setIsMobile(mobileQuery.matches);
        };

        // Initial check
        checkDevice();

        // Add listener using the same query instance
        mobileQuery.addEventListener('change', checkDevice);

        return () => mobileQuery.removeEventListener('change', checkDevice);
    }, []);

    return { isMobile, isDesktop: !isMobile };
};
