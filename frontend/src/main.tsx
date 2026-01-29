/**
 * BINARY DEVICE CLASSIFIER & BOOTSTRAPPER
 * 
 * Strict Isolation Rule:
 * - iOS/Android/iPad = MOBILE
 * - Windows/Mac/Linux = DESKTOP
 * 
 * No resizing, no media queries, no reconsiderations.
 */

const bootstrap = async () => {
    const ua = navigator.userAgent;

    // 1. Detect Mobile OS
    // Includes standard mobile UAs and iPad "Desktop Mode" (MacIntel + Touch)
    const isMobileOS = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);
    const isIpad = /Macintosh/i.test(ua) && navigator.maxTouchPoints > 1;

    const isMobile = isMobileOS || isIpad;

    if (isMobile) {
        console.log('%c [System] Booting MOBILE Architecture ', 'background: #000; color: #10b981');
        // Lazy load the mobile bundle
        await import('./mobile/app/main.tsx');
    } else {
        console.log('%c [System] Booting DESKTOP Architecture ', 'background: #000; color: #3b82f6');
        // Lazy load the desktop bundle
        await import('./desktop/app/main.tsx');
    }
};

bootstrap(); // Execute immediately
