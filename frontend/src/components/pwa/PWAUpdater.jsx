import { useEffect } from 'react';
import { useRegisterSW } from 'virtual:pwa-register/react';

const PWAUpdater = () => {
    // Check standalone mode once
    const isStandalone = typeof window !== 'undefined' &&
        (window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true);

    const {
        needRefresh: [needRefresh],
        updateServiceWorker,
    } = useRegisterSW({
        onRegistered(r) {
            console.log('SW Registered: ' + r);
            if (r) {
                // 1. Standard Interval Check (every 60s)
                setInterval(() => {
                    console.log('Interval: Checking for SW update...');
                    r.update();
                }, 60 * 1000);

                // 2. Aggressive Checks for PWA (Real-time feel)
                if (isStandalone) {
                    const checkUpdate = () => {
                        if (document.visibilityState === 'visible') {
                            console.log('Focus/Vis: Checking for SW update...');
                            r.update();
                        }
                    };

                    window.addEventListener('visibilitychange', checkUpdate);
                    window.addEventListener('focus', checkUpdate);

                    // Initial check on load
                    r.update();
                }
            }
        },
        onRegisterError(error) {
            console.log('SW registration error', error);
        },
    });

    useEffect(() => {
        if (needRefresh) {
            if (isStandalone) {
                console.log('PWA Mode: Critical update found, executing instant refresh...');
                updateServiceWorker(true);
            } else {
                console.log('Browser Mode: Update queued. Waiting for manual refresh.');
            }
        }
    }, [needRefresh, updateServiceWorker, isStandalone]);

    return null;
};

export default PWAUpdater;
