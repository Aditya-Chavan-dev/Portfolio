import React, { useState, useEffect } from 'react';
import { ref, onValue } from 'firebase/database';
import { db } from '@src/services/firebase';
import { Users, FileText, Linkedin, Shield } from 'lucide-react';

const MetricCard = ({ label, value, icon: Icon, color }) => (
    <div className={`
        relative overflow-hidden rounded-xl p-6 border border-white/10 bg-white/5 
        flex flex-col items-start gap-4 transition-all duration-300
        active:scale-95 active:bg-white/10
    `}>
        {/* Glow Effect */}
        <div className={`absolute -top-10 -right-10 w-24 h-24 bg-${color}-500/20 blur-3xl rounded-full`} />

        <div className={`p-3 rounded-lg bg-${color}-500/10 border border-${color}-500/20 text-${color}-400`}>
            <Icon size={24} />
        </div>

        <div>
            <div className="text-3xl font-bold text-white font-mono tracking-tighter">
                {value !== null ? value.toLocaleString() : '---'}
            </div>
            <div className="text-[10px] uppercase tracking-widest text-white/40 font-bold mt-1">
                {label}
            </div>
        </div>
    </div>
);

const MetricGrid = () => {
    const [metrics, setMetrics] = useState({
        linkedin: null,
        resume: null,
        anonymous: null
    });
    const [debugStatus, setDebugStatus] = useState("INITIALIZING...");
    const [error, setError] = useState(null);

    useEffect(() => {
        setDebugStatus("CONNECTING TO DB...");
        const sourcesRef = ref(db, 'sources');

        // Real-time Listener
        const unsubscribe = onValue(sourcesRef,
            (snapshot) => {
                setDebugStatus("DATA RECEIVED");
                const data = snapshot.val() || {};
                setMetrics({
                    linkedin: data.linkedin || 0,
                    resume: data.resume || 0,
                    anonymous: data.anonymous || 0
                });
            },
            (err) => {
                console.error("Metric Error:", err);
                setDebugStatus("CONNECTION FAILED");
                setError(err.message);
            }
        );

        return () => unsubscribe();
    }, []);

    return (
        <div className="w-full max-w-sm space-y-4">
            {error && (
                <div className="p-2 bg-red-900/50 border border-red-500 rounded text-[10px] text-red-200 font-mono mb-4 break-words">
                    ERROR: {error}
                </div>
            )}

            <MetricCard
                label="LINKEDIN TRAFFIC"
                value={metrics.linkedin}
                icon={Linkedin}
                color="blue"
            />
            <MetricCard
                label="RESUME DOWNLOADS"
                value={metrics.resume}
                icon={FileText}
                color="green"
            />
            <MetricCard
                label="ANONYMOUS HITS"
                value={metrics.anonymous}
                icon={Shield}
                color="slate"
            />

            <div className="text-center pt-8 opacity-30">
                <div className="flex flex-col items-center justify-center gap-2 text-[10px] font-mono text-white">
                    <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${error ? 'bg-red-500' : 'bg-green-500 animate-pulse'}`} />
                        STATUS: {debugStatus}
                    </div>
                    {metrics.linkedin === null && <div>WAITING FOR STREAM...</div>}
                </div>
            </div>
        </div>
    );
};

export default MetricGrid;
