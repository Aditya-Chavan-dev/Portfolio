import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

const TimeModule = ({ compact }) => {
    const [time, setTime] = useState(new Date().toLocaleTimeString('en-US', { hour12: false, hour: "2-digit", minute: "2-digit" }));

    useEffect(() => {
        const clockInterval = setInterval(() => {
            setTime(new Date().toLocaleTimeString('en-US', { hour12: false, hour: "2-digit", minute: "2-digit" }));
        }, 1000);
        return () => clearInterval(clockInterval);
    }, []);

    return (
        <div className={`flex items-center gap-3 ${compact ? 'pl-4 border-l border-white/10' : 'bg-white/[0.03] border border-white/10 px-6 py-3 rounded-full'}`}>
            <Clock size={16} className="text-gray-400" />
            <span className="text-sm font-mono text-gray-300 tracking-widest font-medium tabular-nums">
                {time}
            </span>
        </div>
    );
};

export default React.memo(TimeModule);
