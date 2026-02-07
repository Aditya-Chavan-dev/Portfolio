import { useState } from 'react';
import { getRandomLine } from '@/data/humorousLines';
import { Loader } from '@/shared/Loader';

interface TransitionLoaderProps {
    onComplete: () => void;
}

export const TransitionLoader = ({ onComplete }: TransitionLoaderProps) => {
    // Initialize state with random line directly instead of using useEffect
    const [line] = useState(() => getRandomLine());

    return <Loader onComplete={onComplete} message={line} />;
};
