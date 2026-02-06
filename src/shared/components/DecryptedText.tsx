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
            setDisplayText(text); // Reset if not revealing
            return;
        }

        let iteration = 0;

        clearInterval(intervalRef.current!);

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
                clearInterval(intervalRef.current!);
            }

            iteration += 1 / 3; // Slow down the reveal
        }, speed);

        return () => clearInterval(intervalRef.current!);
    }, [text, reveal, speed]);

    return (
        <span className={className}>
            {displayText}
        </span>
    );
};
