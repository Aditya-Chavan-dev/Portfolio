import React from 'react';
import confetti from 'canvas-confetti';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

const ConfettiButton = () => {
    const fireConfetti = () => {
        const count = 200;
        const defaults = {
            origin: { y: 0.7 }
        };

        function fire(particleRatio, opts) {
            confetti({
                ...defaults,
                ...opts,
                particleCount: Math.floor(count * particleRatio)
            });
        }

        fire(0.25, {
            spread: 26,
            startVelocity: 55,
        });
        fire(0.2, {
            spread: 60,
        });
        fire(0.35, {
            spread: 100,
            decay: 0.91,
            scalar: 0.8
        });
        fire(0.1, {
            spread: 120,
            startVelocity: 25,
            decay: 0.92,
            scalar: 1.2
        });
        fire(0.1, {
            spread: 120,
            startVelocity: 45,
        });
    };

    return (
        <motion.button
            onClick={fireConfetti}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="fixed bottom-4 left-4 z-[9999] p-3 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 hover:bg-cyan-500/20 transition-all shadow-[0_0_15px_rgba(34,211,238,0.2)] backdrop-blur-md"
            title="Test Confetti"
        >
            <Sparkles size={20} />
        </motion.button>
    );
};

export default ConfettiButton;
