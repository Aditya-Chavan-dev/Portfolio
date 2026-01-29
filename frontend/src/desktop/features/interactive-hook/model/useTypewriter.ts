import { useState, useEffect } from 'react';

interface TypewriterOptions {
    speed?: number;
    delay?: number;
    infinite?: boolean;
}

export const useTypewriter = (text: string, options: TypewriterOptions = {}) => {
    const { speed = 50, delay = 1000, infinite = false } = options;
    const [displayText, setDisplayText] = useState('');
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
        let timeout: NodeJS.Timeout;
        let i = 0;

        const startTyping = () => {
            if (i < text.length) {
                setDisplayText(text.substring(0, i + 1));
                i++;
                timeout = setTimeout(startTyping, speed);
            } else {
                setIsComplete(true);
                if (infinite) {
                    setTimeout(() => {
                        i = 0;
                        setDisplayText('');
                        setIsComplete(false);
                        startTyping();
                    }, delay);
                }
            }
        };

        const startDelay = setTimeout(startTyping, delay);

        return () => {
            clearTimeout(startDelay);
            clearTimeout(timeout);
        };
    }, [text, speed, delay, infinite]);

    return { displayText, isComplete };
};
