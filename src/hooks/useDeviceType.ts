import { useState, useEffect } from 'react';

export const useDeviceType = () => {
    const [isMobile, setIsMobile] = useState<boolean>(false);

    useEffect(() => {
        const checkDevice = () => {
            const mobileQuery = window.matchMedia('(max-width: 768px)');
            setIsMobile(mobileQuery.matches);
        };

        // Initial check
        checkDevice();

        // Listener
        const mobileQuery = window.matchMedia('(max-width: 768px)');
        mobileQuery.addEventListener('change', checkDevice);

        return () => mobileQuery.removeEventListener('change', checkDevice);
    }, []);

    return { isMobile, isDesktop: !isMobile };
};
