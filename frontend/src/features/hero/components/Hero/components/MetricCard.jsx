import React, { useEffect, useState, useRef } from 'react';

const MetricCard = ({ value, label, tooltip, isLive }) => {
    const [displayValue, setDisplayValue] = useState(0);
    const [hasAnimated, setHasAnimated] = useState(false);
    const cardRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !hasAnimated) {
                    animateValue(0, parseInt(value) || 0, 1500);
                    setHasAnimated(true);
                }
            },
            { threshold: 0.5 }
        );

        if (cardRef.current) observer.observe(cardRef.current);

        return () => observer.disconnect();
    }, [value, hasAnimated]);

    const animateValue = (start, end, duration) => {
        if (isNaN(end)) return;
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            setDisplayValue(Math.floor(progress * (end - start) + start));
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    };

    return (
        <div className="metric-card" ref={cardRef} title={tooltip}>
            <div className="metric-value">
                {isLive ? (
                    <span className="live-indicator">●</span>
                ) : null}
                {isNaN(parseInt(value)) ? value : displayValue}
                {String(value).includes('+') ? '+' : ''}
            </div>
            <div className="metric-label">{label}</div>
        </div>
    );
};

export default MetricCard;
