import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

/**
 * Props for the Loader component
 */
interface LoaderProps {
    /** Callback function to execute when loading completes */
    onComplete: () => void;
    /** Optional humorous message to display during loading */
    message?: string;
}

// Constants
const LOADER_DURATION_MS = 4000; // 4 seconds
const PROGRESS_STEPS = 100;
const COMPLETION_DELAY_MS = 200;
const PARTICLE_COUNT = 6;

/**
 * Full-screen loader component with animated progress bar and particle effects
 * Displays a humorous message and animates from 0 to 100% over 4 seconds
 * 
 * @example
 * ```tsx
 * <Loader 
 *   message="Brewing coffee for the developer..." 
 *   onComplete={() => setLoading(false)}
 * />
 * ```
 */
export const Loader = ({ onComplete, message }: LoaderProps) => {
    const [progress, setProgress] = useState(0);

    // Generate random particle positions and delays once using lazy initialization
    const [particles] = useState(() =>
        Array.from({ length: PARTICLE_COUNT }).map(() => ({
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            duration: 4 + Math.random() * 2,
            delay: Math.random() * 4
        }))
    );

    useEffect(() => {
        // Animate progress from 0 to 100
        const duration = LOADER_DURATION_MS;
        const steps = PROGRESS_STEPS;
        const interval = duration / steps;

        let currentProgress = 0;
        const timer = setInterval(() => {
            currentProgress += 1;
            setProgress(currentProgress);

            if (currentProgress >= steps) {
                clearInterval(timer);
                setTimeout(() => onComplete(), COMPLETION_DELAY_MS);
            }
        }, interval);

        return () => clearInterval(timer);
    }, [onComplete]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black overflow-hidden px-8 w-screen h-dvh"
        >
            {/* Main Content - Humor Line as Hero */}
            <div className="relative flex flex-col items-center max-w-4xl w-full">
                {/* Humorous Line - HERO ELEMENT */}
                {message && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        className="mb-20"
                    >
                        <motion.p
                            className="text-2xl md:text-3xl lg:text-4xl text-center font-light tracking-wide text-amber-100 leading-relaxed font-serif"
                            animate={{
                                textShadow: [
                                    '0 0 20px rgba(251, 191, 36, 0.3)',
                                    '0 0 30px rgba(251, 191, 36, 0.5)',
                                    '0 0 20px rgba(251, 191, 36, 0.3)'
                                ]
                            }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                ease: 'easeInOut'
                            }}
                        >
                            <span className="italic">"{message}"</span>
                        </motion.p>
                    </motion.div>
                )}

                {/* Subtle Minimal Loader Below */}
                <div className="relative flex flex-col items-center">
                    {/* Small Golden Ring */}
                    <div className="relative mb-6 w-20 h-20">
                        {/* Subtle glow */}
                        <div className="absolute inset-0 rounded-full bg-amber-500/20 blur-lg" />

                        {/* Background ring */}
                        <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
                            <circle
                                cx="50"
                                cy="50"
                                r="45"
                                fill="none"
                                stroke="rgba(251, 191, 36, 0.2)"
                                strokeWidth="1.5"
                            />
                        </svg>

                        {/* Animated progress ring */}
                        <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
                            <defs>
                                <linearGradient id="subtleGoldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#fbbf24" />
                                    <stop offset="50%" stopColor="#f59e0b" />
                                    <stop offset="100%" stopColor="#fbbf24" />
                                </linearGradient>
                                <filter id="ringGlow">
                                    <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
                                    <feMerge>
                                        <feMergeNode in="coloredBlur" />
                                        <feMergeNode in="SourceGraphic" />
                                    </feMerge>
                                </filter>
                            </defs>
                            <motion.circle
                                cx="50"
                                cy="50"
                                r="45"
                                fill="none"
                                stroke="url(#subtleGoldGradient)"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeDasharray="283"
                                initial={{ strokeDashoffset: 283 }}
                                animate={{ strokeDashoffset: 283 - (283 * progress) / 100 }}
                                transition={{ duration: 0.04, ease: 'linear' }}
                                filter="url(#ringGlow)"
                            />
                        </svg>

                        {/* Small bright spot */}
                        <motion.div
                            className="absolute w-2 h-2 bg-amber-400 rounded-full shadow-md shadow-amber-400/60"
                            style={{
                                top: '50%',
                                left: '50%',
                                transform: `rotate(${(progress * 3.6) - 90}deg) translateX(36px) translateY(-50%)`
                            }}
                            animate={{
                                opacity: [0.7, 1, 0.7],
                                scale: [1, 1.2, 1]
                            }}
                            transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                ease: 'easeInOut'
                            }}
                        />
                    </div>

                    {/* Clear percentage text */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="text-base font-medium text-amber-200/80 tabular-nums"
                        style={{
                            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                            letterSpacing: '0.02em'
                        }}
                    >
                        {progress}%
                    </motion.div>
                </div>
            </div>

            {/* Ambient Background Particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-subtle">
                {particles.map((particle, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-amber-400/20 rounded-full"
                        style={{
                            left: particle.left,
                            top: particle.top,
                        }}
                        animate={{
                            opacity: [0, 0.4, 0],
                            scale: [0, 1, 0]
                        }}
                        transition={{
                            duration: particle.duration,
                            repeat: Infinity,
                            delay: particle.delay,
                            ease: 'easeInOut'
                        }}
                    />
                ))}
            </div>
        </motion.div>
    );
};
