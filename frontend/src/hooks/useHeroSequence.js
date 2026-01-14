import { useState, useEffect } from 'react';

// Sequence Steps
export const HERO_STEPS = {
    INIT: 0,
    TEXT_1: 1, // "Welcome friend"
    TEXT_2: 2, // "I'm Chavan"
    TEXT_3: 3, // "Aditya Chavan"
    LOC: 4,
    REPOS: 5,
    STREAK: 6,
    REARRANGE: 7,
    HOLOGRAM: 8,
    COMPLETE: 9
};

export const useHeroSequence = () => {
    const [step, setStep] = useState(HERO_STEPS.INIT);

    useEffect(() => {
        const delay = (ms) => new Promise(res => setTimeout(res, ms));

        let isMounted = true;

        const runSequence = async () => {
            const next = (s, ms) => {
                if (!isMounted) return Promise.reject("unmounted");
                setStep(s);
                return delay(ms);
            };

            try {
                await delay(500);
                await next(HERO_STEPS.TEXT_1, 2000);
                await next(HERO_STEPS.TEXT_2, 2000);
                await next(HERO_STEPS.TEXT_3, 2500);
                await next(HERO_STEPS.LOC, 1500);
                await next(HERO_STEPS.REPOS, 1500);
                await next(HERO_STEPS.STREAK, 2000);
                await next(HERO_STEPS.REARRANGE, 800);
                await next(HERO_STEPS.HOLOGRAM, 500);
                if (isMounted) setStep(HERO_STEPS.COMPLETE);
            } catch (e) {
                // Ignore unmount rejections
            }
        };

        runSequence();

        return () => { isMounted = false; };
    }, []);

    return step;
};
