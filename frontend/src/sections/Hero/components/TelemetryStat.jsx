import React, { useEffect, useState } from 'react';
import { db } from '../../../services/firebase';
import { ref, onValue } from 'firebase/database';

const TelemetryStat = () => {
    const [stats, setStats] = useState({
        totalSessions: 9432, // Fallback/Initial
        activeTime: '00:00',
        coreStack: 'Active'
    });

    useEffect(() => {
        // subscribe to real-time sessions
        const metaRef = ref(db, 'analytics/total_sessions');
        const unsubscribe = onValue(metaRef, (snapshot) => {
            if (snapshot.exists()) {
                setStats(prev => ({ ...prev, totalSessions: snapshot.val() }));
            }
        });

        // Current Session Timer
        let storedStart = sessionStorage.getItem('session_start_time');
        if (!storedStart) {
            storedStart = Date.now();
            sessionStorage.setItem('session_start_time', storedStart);
        }
        const startTime = parseInt(storedStart);
        const timer = setInterval(() => {
            const now = Date.now();
            const diff = Math.floor((now - startTime) / 1000);
            const m = Math.floor(diff / 60).toString().padStart(2, '0');
            const s = (diff % 60).toString().padStart(2, '0');
            setStats(prev => ({ ...prev, activeTime: `${m}:${s}` }));
        }, 1000);

        return () => {
            unsubscribe();
            clearInterval(timer);
        };
    }, []);

    return (
        <div className="stats-grid">
            <div className="stat-item">
                <h3>20+</h3>
                <p>Projects Shipped</p>
            </div>
            <div className="stat-item">
                <h3>{stats.activeTime}</h3>
                <p>Session Active</p>
            </div>
            <div className="stat-item">
                <h3>100%</h3>
                <p>Completion Rate</p>
            </div>
        </div>
    );
};

export default TelemetryStat;
