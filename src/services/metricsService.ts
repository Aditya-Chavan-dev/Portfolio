import { getDatabase, ref, onValue, off, type DataSnapshot } from 'firebase/database';
import { app } from './firebase';
import { logger } from '@/utils/logger';

export interface PortfolioMetrics {
    totalVisitors: number;
    activeUsers: number;
    linkedinReferrals: number;
    lastUpdated?: number;
}

const database = getDatabase(app);
const metricsRef = ref(database, 'public/metrics');

/**
 * Subscribe to real-time portfolio metrics from Firebase Realtime Database
 * @param callback Function to call when metrics update
 * @returns Unsubscribe function
 */
export const subscribeToMetrics = (
    callback: (metrics: PortfolioMetrics | null) => void
): (() => void) => {
    const listener = onValue(
        metricsRef,
        (snapshot: DataSnapshot) => {
            const data = snapshot.val();
            if (data) {
                callback({
                    totalVisitors: data.totalVisitors || 0,
                    activeUsers: data.activeUsers || 0,
                    linkedinReferrals: data.linkedinReferrals || 0,
                    lastUpdated: data.lastUpdated || Date.now()
                });
            } else {
                // No data exists yet
                callback(null);
            }
        },
        (error: Error) => {
            logger.error('Error fetching metrics:', error);
            callback(null);
        }
    );

    // Return unsubscribe function
    return () => off(metricsRef, 'value', listener);
};
