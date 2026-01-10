import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const TypewriterText = ({
    text,
    delay = 0,
    speed = 50,
    deleteSpeed = 30,
    waitBeforeDelete = 2000,
    loop = true,
    onComplete,
    className = ""
}) => {
    const [displayedText, setDisplayedText] = useState("");
    const [isTyping, setIsTyping] = useState(true); // true = typing, false = deleting
    const [textIndex, setTextIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);
    const [hasStarted, setHasStarted] = useState(false);

    // Parse text input into array
    const textArray = Array.isArray(text)
        ? text
        : (typeof text === 'string' && text.includes('|'))
            ? text.split('|')
            : [text];

    useEffect(() => {
        const startTimeout = setTimeout(() => {
            setHasStarted(true);
        }, delay * 1000);
        return () => clearTimeout(startTimeout);
    }, [delay]);

    useEffect(() => {
        if (!hasStarted) return;

        let timeout;
        const currentFullText = textArray[textIndex];

        if (isTyping) {
            if (charIndex < currentFullText.length) {
                // Typing forward
                timeout = setTimeout(() => {
                    setDisplayedText(currentFullText.slice(0, charIndex + 1));
                    setCharIndex(prev => prev + 1);
                }, speed + (Math.random() * 15)); // Add mild human variance
            } else {
                // Finished string
                if (textArray.length > 1 || loop) {
                    timeout = setTimeout(() => {
                        setIsTyping(false);
                    }, waitBeforeDelete);
                } else if (onComplete) {
                    onComplete();
                }
            }
        } else {
            // Deleting backward
            if (charIndex > 0) {
                timeout = setTimeout(() => {
                    setDisplayedText(currentFullText.slice(0, charIndex - 1));
                    setCharIndex(prev => prev - 1);
                }, deleteSpeed);
            } else {
                // Finished deleting, move to next string
                setIsTyping(true);
                setTextIndex(prev => (prev + 1) % textArray.length);
            }
        }

        return () => clearTimeout(timeout);
    }, [charIndex, isTyping, hasStarted, textArray, textIndex, speed, deleteSpeed, waitBeforeDelete, loop, onComplete]);

    return (
        <motion.span
            className={`font-mono inline-block ${className}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >
            {displayedText}
            <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ repeat: Infinity, duration: 0.8 }}
                className="inline-block w-[2px] h-[1em] bg-cyan-400 ml-1 align-middle"
            />
        </motion.span>
    );
};

export default TypewriterText;
