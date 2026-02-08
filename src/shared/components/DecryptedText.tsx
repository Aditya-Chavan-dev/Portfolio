import { useEffect, useState, useRef } from 'react';

interface DecryptedTextProps {
    text: string;
    reveal?: boolean;
    speed?: number;
    className?: string;
}

const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+';

export const DecryptedText = ({
    text,
    reveal = true,
    speed = 50,
    className = ""
}: DecryptedTextProps) => {
    const [displayText, setDisplayText] = useState(text);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (!reveal) {
            return;
        }

        let iteration = 0;

        // SAFE: Check before clearing
        if (intervalRef.current !== null) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }

        intervalRef.current = setInterval(() => {
            setDisplayText(() =>
                text
                    .split("")
                    .map((_, index) => {
                        if (index < iteration) {
                            return text[index];
                        }
                        return characters[Math.floor(Math.random() * characters.length)];
                    })
                    .join("")
            );

            if (iteration >= text.length) {
                // SAFE: Check before clearing
                if (intervalRef.current !== null) {
                    clearInterval(intervalRef.current);
                    intervalRef.current = null;
                }
            }

            iteration += 1 / 3; // Slow down the reveal
        }, speed);

        return () => {
            // SAFE: Check before clearing in cleanup
            if (intervalRef.current !== null) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
        };
    }, [text, reveal, speed]);

    return (
        <span className={className}>
            {displayText}
        </span>
    );
};
