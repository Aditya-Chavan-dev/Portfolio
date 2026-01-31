import { useEffect, useState } from 'react';
import { getRandomLine } from '@/data/humorousLines';
import { Loader } from '@/shared/Loader';

interface TransitionLoaderProps {
    onComplete: () => void;
}

export const TransitionLoader = ({ onComplete }: TransitionLoaderProps) => {
    const [line, setLine] = useState('');

    useEffect(() => {
        // Get a random humorous line when component mounts
        const randomLine = getRandomLine();
        setLine(randomLine);
    }, []);

    return <Loader onComplete={onComplete} message={line} />;
};
