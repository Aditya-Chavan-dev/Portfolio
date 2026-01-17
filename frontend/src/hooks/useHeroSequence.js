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
            // Check if user has seen this before
            const hasSeenHero = localStorage.getItem('HAS_SEEN_HERO');

            // returning user speed multiplier (0 = instant, 0.1 = super fast)
            // We use 0.1 to show a quick "system boot" effect rather than a jarring jump
            const speed = hasSeenHero ? 0.1 : 1.0;

            const next = (s, ms) => {
                if (!isMounted) return Promise.reject("unmounted");
                setStep(s);
                return delay(ms * speed);
            };

            try {
                // If returning user, skip the long text intro entirely and jump to metrics
                if (hasSeenHero) {
                    setStep(HERO_STEPS.LOC);
                    await delay(300); // Brief pause
                    await next(HERO_STEPS.REPOS, 100);
                    await next(HERO_STEPS.STREAK, 100);
                    await next(HERO_STEPS.REARRANGE, 200);
                    await next(HERO_STEPS.HOLOGRAM, 200);
                    if (isMounted) setStep(HERO_STEPS.COMPLETE);
                } else {
                    // Full Cinematic Sequence for First Time
                    await delay(500);
                    await next(HERO_STEPS.TEXT_1, 2000);
                    await next(HERO_STEPS.TEXT_2, 2000);
                    await next(HERO_STEPS.TEXT_3, 2500);
                    await next(HERO_STEPS.LOC, 1500);
                    await next(HERO_STEPS.REPOS, 1500);
                    await next(HERO_STEPS.STREAK, 2000);
                    await next(HERO_STEPS.REARRANGE, 800);
                    await next(HERO_STEPS.HOLOGRAM, 500);
                    if (isMounted) {
                        setStep(HERO_STEPS.COMPLETE);
                        localStorage.setItem('HAS_SEEN_HERO', 'true');
                    }
                }
            } catch (e) {
                // Ignore unmount rejections
            }
        };

        runSequence();

        return () => { isMounted = false; };
    }, []);

    return step;
};
