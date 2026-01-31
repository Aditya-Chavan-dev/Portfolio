import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

// Typewriter Effect Component
export const TypewriterText = React.memo(({
    text,
    onComplete,
    delayStart = 0,
    className = ""
}: {
    text: string;
    onComplete?: () => void,
    delayStart?: number,
    className?: string
}) => {
    const [charCount, setCharCount] = useState(0);
    const [started, setStarted] = useState(false);
    const completedRef = useRef(false);

    // Startup Delay
    useEffect(() => {
        const timer = setTimeout(() => setStarted(true), delayStart);
        return () => clearTimeout(timer);
    }, [delayStart]);

    // Typing Logic
    useEffect(() => {
        if (!started) return;

        if (charCount < text.length) {
            const timeout = setTimeout(() => {
                setCharCount((prev) => prev + 1);
            }, 50);
            return () => clearTimeout(timeout);
        } else if (charCount === text.length && !completedRef.current) {
            completedRef.current = true;
            if (onComplete) onComplete();
        }
    }, [started, charCount, text, onComplete]);

    return (
        <span className={`font-['Space_Grotesk'] inline-block ${className}`}>
            {text.slice(0, charCount)}
        </span>
    );
});

// Blinking Cursor Component
export const Cursor = React.memo(({ className = "" }: { className?: string }) => (
    <motion.span
        animate={{ opacity: [0, 1, 0] }}
        transition={{ repeat: Infinity, duration: 0.8 }}
        className={`inline-block w-[2px] h-[1em] bg-white ml-1 align-middle ${className}`}
    />
));
