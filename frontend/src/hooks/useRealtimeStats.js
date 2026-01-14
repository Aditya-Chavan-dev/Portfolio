import { useState, useEffect } from 'react';
import { RealtimeService } from '../services/realtime';

export const useRealtimeStats = () => {
    const [immersiveCount, setImmersiveCount] = useState(0);

    useEffect(() => {
        const unsubscribe = RealtimeService.subscribeToVisitorStats((data) => {
            if (data?.visitorStats?.immersive) {
                setImmersiveCount(data.visitorStats.immersive);
            } else {
                setImmersiveCount(0);
            }
        });

        return () => unsubscribe();
    }, []);

    return { immersiveCount };
};
