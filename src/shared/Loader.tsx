import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface LoaderProps {
    onComplete: () => void;
    message?: string;
}

export const Loader = ({ onComplete, message }: LoaderProps) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        // Animate progress from 0 to 100
        const duration = 4000; // 4 seconds
        const steps = 100;
        const interval = duration / steps;

        let currentProgress = 0;
        const timer = setInterval(() => {
            currentProgress += 1;
            setProgress(currentProgress);

            if (currentProgress >= 100) {
                clearInterval(timer);
                setTimeout(() => onComplete(), 200);
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
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black overflow-hidden px-8"
            style={{ width: '100vw', height: '100dvh' }}
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
                            className="text-2xl md:text-3xl lg:text-4xl text-center font-light tracking-wide text-amber-100 leading-relaxed"
                            style={{ fontFamily: 'Georgia, serif' }}
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
                    <div className="relative mb-6" style={{ width: '80px', height: '80px' }}>
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

            {/* Very subtle ambient particles */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
                {[...Array(6)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-0.5 h-0.5 bg-amber-400/20 rounded-full"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                        animate={{
                            opacity: [0, 0.4, 0],
                            scale: [0, 1, 0]
                        }}
                        transition={{
                            duration: 4 + Math.random() * 2,
                            repeat: Infinity,
                            delay: Math.random() * 4,
                            ease: 'easeInOut'
                        }}
                    />
                ))}
            </div>
        </motion.div>
    );
};
