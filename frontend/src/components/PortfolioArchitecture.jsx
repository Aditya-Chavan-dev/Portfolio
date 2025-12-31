import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const ArchitectureSection = () => {
    const targetRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start end", "end start"]
    });

    const steps = [
        {
            title: "The Origin",
            description: "Code is crafted in VS Code, the local development environment where ideas take shape.",
            step: 1
        },
        {
            title: "Version Control",
            description: "Commits are pushed to GitHub, ensuring version history and collaboration.",
            step: 2
        },
        {
            title: "Split Deployment",
            description: "The pipeline splits: Render builds the Node.js backend API, while Firebase hosts the React frontend.",
            step: 3
        },
        {
            title: "Real-time Sync",
            description: "The Firebase Realtime Database acts as the central customized nervous system, syncing data instantly.",
            step: 4
        },
        {
            title: "User Experience",
            description: "Users receive live updates on any device, powered by the low-latency edge network.",
            step: 5
        }
    ];

    return (
        <section ref={targetRef} className="relative min-h-[200vh] bg-black text-white py-24">
            <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
                {/* Background Gradient */}
                <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black opacity-50" />

                {/* The Master Diagram */}
                <motion.img
                    src="/architecture.png"
                    alt="System Architecture"
                    className="relative z-10 w-full max-w-5xl object-contain p-4 drop-shadow-2xl"
                    style={{ opacity: useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]) }}
                />
            </div>

            {/* Scrollytelling Overlay Text */}
            <div className="relative z-20 max-w-7xl mx-auto px-4">
                {steps.map((item, index) => (
                    <div key={index} className="h-screen flex items-center justify-start lg:justify-end pointer-events-none">
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="bg-gray-900/80 backdrop-blur-md border border-gray-700 p-8 rounded-2xl max-w-md pointer-events-auto border-l-4 border-l-blue-500 shadow-xl"
                        >
                            <h3 className="text-3xl font-bold mb-4 text-blue-400">0{item.step} {item.title}</h3>
                            <p className="text-gray-300 text-lg leading-relaxed">
                                {item.description}
                            </p>
                        </motion.div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default ArchitectureSection;
