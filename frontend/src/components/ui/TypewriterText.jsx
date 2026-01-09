import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const TypewriterText = ({ text, delay = 0, speed = 50, onComplete, className = "" }) => {
    const [displayedText, setDisplayedText] = useState("");
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
        let timeout;
        let currentIndex = 0;

        const startTyping = () => {
            if (currentIndex < text.length) {
                setDisplayedText(text.slice(0, currentIndex + 1));
                currentIndex++;
                timeout = setTimeout(startTyping, speed + (Math.random() * 20));
            } else {
                setIsComplete(true);
                if (onComplete) onComplete();
            }
        };

        const initialDelay = setTimeout(startTyping, delay * 1000);

        return () => {
            clearTimeout(initialDelay);
            clearTimeout(timeout);
        };
    }, [text, delay, speed, onComplete]);

    return (
        <motion.span
            className={`font-hitmarker uppercase tracking-widest ${className}`}
            initial={{ opacity: 0, filter: "blur(8px)" }}
            animate={{
                opacity: 1,
                filter: "blur(0px)",
                textShadow: [
                    "0 0 0px currentColor",
                    "0 0 20px currentColor",
                    "0 0 10px currentColor"
                ]
            }}
            transition={{
                duration: 0.6,
                textShadow: { duration: 1, delay: 0.3 }
            }}
        >
            {displayedText}
            {!isComplete && (
                <motion.span
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ repeat: Infinity, duration: 0.8 }}
                    className="inline-block w-[0.5em] h-[1em] bg-[var(--color-accent-green)] ml-1 align-middle"
                    style={{ boxShadow: "0 0 10px var(--color-accent-green)" }}
                />
            )}
        </motion.span>
    );
};

export default TypewriterText;
