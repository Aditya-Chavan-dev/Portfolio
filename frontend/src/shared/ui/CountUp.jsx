import React, { useState, useEffect } from 'react';

const CountUp = ({ end, duration = 2000, prefix = "", suffix = "" }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            // Ease out expo for that "spin up" feel
            const easeOutExpo = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
            // Safety check for invalid end values
            const target = Number(end) || 0;
            setCount(Math.floor(easeOutExpo * target));
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }, [end, duration]);

    return (
        <span>
            {prefix}{count.toLocaleString()}{suffix}
        </span>
    );
};

export default CountUp;
