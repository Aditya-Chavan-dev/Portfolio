import React, { useState, useEffect } from 'react';
import { motion, useSpring } from 'framer-motion';

const MagicCounter = ({ value, formatter = (v) => v, className = "" }) => {
    const springValue = useSpring(0, {
        stiffness: 75,
        damping: 20,
        restDelta: 0.001
    });

    const [displayValue, setDisplayValue] = useState(0);

    useEffect(() => {
        springValue.set(value);
    }, [value, springValue]);

    useEffect(() => {
        return springValue.on("change", (latest) => {
            setDisplayValue(formatter(Math.round(latest)));
        });
    }, [springValue]);

    return (
        <span className={`inline-block min-w-[1ch] text-center ${className}`}>
            {displayValue}
        </span>
    );
};

export default MagicCounter;
