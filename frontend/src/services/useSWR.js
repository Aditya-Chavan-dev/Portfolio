import { useState, useEffect } from 'react';

/**
 * useSWR (Stale-While-Revalidate) Hook
 * Gold Standard #10: Zombie Check & Performance
 * 
 * 1. Checks Cache first (Instant load)
 * 2. Fetches fresh data in background
 * 3. Updates Cache & State
 * 4. Prevents updates on unmounted components (Zombie Check)
 */
const cache = new Map();

export function useSWR(key, fetcher, options = {}) {
    // 1. Initialize from Cache (if available)
    const [data, setData] = useState(cache.get(key) || null);
    const [error, setError] = useState(null);
    const [isValidating, setIsValidating] = useState(!cache.has(key)); // If cached, we are just revalidating. If not, we are loading.

    useEffect(() => {
        if (!key) return;

        let isMounted = true; // Zombie Check

        const fetchData = async () => {
            try {
                setIsValidating(true);
                const newData = await fetcher();

                if (isMounted) {
                    // Update Cache
                    cache.set(key, newData);
                    setData(newData);
                    setIsValidating(false);
                }
            } catch (err) {
                if (isMounted) {
                    setError(err);
                    setIsValidating(false);
                }
            }
        };

        fetchData();

        // Cleanup prevents state update on unmount
        return () => { isMounted = false; };
    }, [key]); // Re-run if key changes

    return { data, error, isValidating };
}
