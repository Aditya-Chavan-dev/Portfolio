import { db } from './firebase';
import { ref, onValue, off } from 'firebase/database';

export const RealtimeService = {
    /**
     * Subscribes to global visitor statistics.
     * @param {function} callback - Receives the updated stats object
     * @returns {function} unsubscribe - Call this to stop listening
     */
    subscribeToVisitorStats(callback) {
        // We need to listen to both 'sources' and 'paths' to mirror the aggregation logic
        const sourcesRef = ref(db, 'sources');
        const pathsRef = ref(db, 'paths');

        let sourcesData = {};
        let pathsData = {};

        // Helper to aggregate and emit
        const emitUpdate = () => {
            const stats = {
                visitorStats: {
                    linkedin: Number(sourcesData.linkedin) || 0,
                    resume: Number(sourcesData.resume) || 0,
                    anonymous: Number(sourcesData.anonymous) || 0,
                    immersive: Number(pathsData.immersive) || 0,
                    quickAccess: Number(pathsData.quick) || 0
                },
                timestamp: Date.now(),
                source: 'REALTIME'
            };
            callback(stats);
        };

        // Listen to Sources
        const unsubSources = onValue(sourcesRef, (snapshot) => {
            sourcesData = snapshot.val() || {};
            emitUpdate();
        });

        // Listen to Paths
        const unsubPaths = onValue(pathsRef, (snapshot) => {
            pathsData = snapshot.val() || {};
            emitUpdate();
        });

        // Return combined unsubscribe function
        return () => {
            unsubSources();
            unsubPaths();
        };
    }
};
