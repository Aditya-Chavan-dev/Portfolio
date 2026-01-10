import React from 'react';
import { motion } from 'framer-motion';

const HolographicID = () => {
    return (
        <div className="relative w-full max-w-[400px] mx-auto flex items-center justify-center pointer-events-none select-none">

            {/* Hexagonal Tech Frame */}
            <div className="relative w-[280px] h-[350px]">

                {/* Animated Scanning Lines */}
                <motion.div
                    className="absolute inset-0 overflow-hidden"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                >
                    {/* Vertical scan lines - Reduced for performance */}
                    {[...Array(4)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute h-full w-[1px] bg-gradient-to-b from-transparent via-cyan-400 to-transparent"
                            style={{
                                left: `${i * 25}%`,
                                willChange: 'opacity'
                            }}
                            animate={{
                                opacity: [0.2, 0.6, 0.2]
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                delay: i * 0.2
                            }}
                        />
                    ))}

                    {/* Horizontal scanning beam */}
                    <motion.div
                        className="absolute w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_10px_rgba(0,255,255,0.8)]"
                        animate={{
                            top: ['0%', '100%']
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                        style={{ willChange: 'top' }}
                    />
                </motion.div>

                {/* Corner Brackets - Tech Frame */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 280 350">
                    {/* Top Left */}
                    <motion.g
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <path d="M 0 60 L 0 0 L 60 0" stroke="#00ffff" strokeWidth="2" fill="none" />
                        <circle cx="5" cy="5" r="3" fill="#00ffff" className="animate-pulse" />
                    </motion.g>

                    {/* Top Right */}
                    <motion.g
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                    >
                        <path d="M 220 0 L 280 0 L 280 60" stroke="#00ffff" strokeWidth="2" fill="none" />
                        <circle cx="275" cy="5" r="3" fill="#00ffff" className="animate-pulse" />
                    </motion.g>

                    {/* Bottom Left */}
                    <motion.g
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        <path d="M 0 290 L 0 350 L 60 350" stroke="#00ffff" strokeWidth="2" fill="none" />
                        <circle cx="5" cy="345" r="3" fill="#00ffff" className="animate-pulse" />
                    </motion.g>

                    {/* Bottom Right */}
                    <motion.g
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                    >
                        <path d="M 280 290 L 280 350 L 220 350" stroke="#00ffff" strokeWidth="2" fill="none" />
                        <circle cx="275" cy="345" r="3" fill="#00ffff" className="animate-pulse" />
                    </motion.g>

                    {/* Center horizontal lines */}
                    <line x1="0" y1="175" x2="60" y2="175" stroke="#00ffff" strokeWidth="1" opacity="0.5" />
                    <line x1="220" y1="175" x2="280" y2="175" stroke="#00ffff" strokeWidth="1" opacity="0.5" />
                </svg>

                {/* Holographic Photo */}
                <motion.div
                    className="absolute inset-0 m-4 overflow-hidden"
                    initial={{ opacity: 0, scale: 0.9, filter: "blur(4px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    transition={{ duration: 1.2, delay: 0.6 }}
                    style={{
                        clipPath: "polygon(50px 0, 100% 0, 100% 100%, 0 100%, 0 50px)",
                        willChange: 'opacity, transform, filter'
                    }}
                >
                    {/* Photo */}
                    <img
                        src="/assets/hero-portrait.png"
                        alt="Developer Portrait"
                        className="w-full h-full object-cover object-center"
                    />

                    {/* Holographic overlay */}
                    <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/10 via-transparent to-cyan-500/10 mix-blend-overlay" />

                    {/* Edge glow */}
                    <div className="absolute inset-0 shadow-[inset_0_0_30px_rgba(0,255,255,0.3)]" />
                </motion.div>

                {/* Ambient glow */}
                <div className="absolute inset-0 -z-10 bg-cyan-500/10 blur-3xl animate-pulse" />
            </div>
        </div>
    );
};

export default HolographicID;
