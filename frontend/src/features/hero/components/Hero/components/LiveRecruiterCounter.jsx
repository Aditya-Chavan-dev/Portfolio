import React, { useEffect, useState } from 'react';
import { db } from '../../../services/firebase';
import { ref, onValue, runTransaction, onDisconnect } from 'firebase/database';

const LiveRecruiterCounter = () => {
    const [activeCount, setActiveCount] = useState(1); // Default to 1 (self)

    useEffect(() => {
        // Reference to active visitors counter
        const activeRef = ref(db, 'analytics/active_visitors');
        const connectedRef = ref(db, '.info/connected');

        // Manage presence
        const unsubscribeConnected = onValue(connectedRef, (snap) => {
            if (snap.val() === true) {
                // Determine a unique ID for this session/tab? 
                // For simplicity in this scope, we just increment/decrement safely
                // But strictly, we should push a device ID. 
                // Requirements say "Increment activeVisitors on page load, Decrement safely on unload"

                // We will use a transaction to safely increment
                runTransaction(activeRef, (current) => {
                    return (current || 0) + 1;
                })
                    .then(() => {
                        // On disconnect (close tab/refresh), decrement
                        onDisconnect(activeRef).transaction((current) => {
                            return (current && current > 0) ? current - 1 : 0;
                        });
                    });
            }
        });

        // Listen for live updates
        const unsubscribeCount = onValue(activeRef, (snapshot) => {
            const val = snapshot.val();
            // Ensure at least 1 (the user themselves)
            setActiveCount(val && val > 0 ? val : 1);
        });

        return () => {
            unsubscribeConnected();
            unsubscribeCount();
            // Note: onDisconnect cleanup happens automatically on server side socket break
        };
    }, []);

    return (
        <div className="metric-card" title="Real-time recruiters on site">
            <div className="metric-value">
                <span className="live-indicator" style={{ color: '#ef4444' }}>●</span>
                {activeCount}
            </div>
            <div className="metric-label">Active Visitors</div>
        </div>
    );
};

export default LiveRecruiterCounter;
