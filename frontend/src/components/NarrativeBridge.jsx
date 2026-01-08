import React from 'react';
import { motion } from 'framer-motion';

const NarrativeBridge = () => {
    return (
        <div className="w-full max-w-4xl mx-auto py-32 px-6 flex flex-col items-center justify-center text-center relative z-10">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-20%" }}
                transition={{ duration: 0.8 }}
            >
                <h2 className="text-[var(--color-accent-blue)] font-mono text-xs md:text-sm tracking-[0.3em] uppercase mb-8 opacity-80">
                    // SYSTEM_VERIFICATION
                </h2>

                <h3 className="text-2xl md:text-3xl lg:text-4xl font-display leading-tight text-[var(--color-text-primary)] mb-12">
                    So... you know who I am.
                    <br />
                    <span className="text-[var(--color-text-secondary)] opacity-60">Now, let's see what I can build.</span>
                </h3>

                <p className="text-[var(--color-text-secondary)] text-md md:text-lg max-w-2xl mx-auto leading-relaxed mb-12">
                    Let's clear the air: this isn't some template I cloned, and it's certainly not a hallucination.
                    <br /><br />
                    This is a <span className="text-[var(--color-accent-blue)]">living system</span>. Engineered from scratch. Powered by real logic.
                    <br />
                    Don't believe me? Take a look at the engine.
                </p>

                <div className="h-16 w-[1px] bg-gradient-to-b from-[var(--color-accent-blue)] to-transparent mx-auto opacity-50"></div>
            </motion.div>
        </div>
    );
};

export default NarrativeBridge;
