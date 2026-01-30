import { useState, useEffect } from 'react';
import { useTypewriter } from '@/shared/hooks/useTypewriter';

interface OpeningSequenceProps {
    onComplete: () => void;
}

export const OpeningSequenceDesktop = ({ onComplete }: OpeningSequenceProps) => {
    const [showDisclaimer, setShowDisclaimer] = useState(false);
    const [isExiting, setIsExiting] = useState(false);
    const [ignite, setIgnite] = useState(false);

    // New Dialogue Logic
    // Line 1: "IT'S NOT HOW I WRITE THE CODE"
    const line1 = useTypewriter("IT'S NOT HOW I WRITE THE CODE", { speed: 40 });

    // Line 2: "BUT HOW I THINK THAT DEFINES ME"
    const line2Part1 = useTypewriter("BUT HOW I ", { speed: 40, delay: 1500 });
    const keyword = useTypewriter("THINK", { speed: 40, delay: 2000 });
    const line2Part2 = useTypewriter(" THAT DEFINES ME", { speed: 40, delay: 2500 });

    const disclaimerText = "STRICTLY TYPED • OPINIONATED • HEAVILY COMMENTED";

    // Trigger Ignite/Glow for "THINK" when it finishes typing
    useEffect(() => {
        if (keyword.displayText === "THINK") {
            setIgnite(true);
        }
    }, [keyword.displayText]);

    // Trigger Disclaimer and Exit
    useEffect(() => {
        if (line2Part2.displayText.length === " THAT DEFINES ME".length) {

            // Show disclaimer
            const discTimer = setTimeout(() => setShowDisclaimer(true), 500);

            // Start Exit Fade
            const exitTimer = setTimeout(() => setIsExiting(true), 3500);

            // Complete Redirect
            const completeTimer = setTimeout(() => onComplete(), 5000);

            return () => {
                clearTimeout(discTimer);
                clearTimeout(exitTimer);
                clearTimeout(completeTimer);
            };
        }
    }, [line2Part2.displayText, onComplete]);

    return (
        <div className={`relative w-full h-screen overflow-hidden bg-transparent text-white transition-opacity duration-1000 ${isExiting ? "animate-fadeOut" : "opacity-100"}`}>

            <div className="absolute inset-0 z-10 bg-gradient-to-b from-transparent via-[#020617]/50 to-[#020617]" />

            <div className="relative z-20 h-full flex flex-col justify-center items-center text-center px-4 font-bold">

                <h1 className="text-2xl md:text-3xl lg:text-5xl tracking-tight mb-6 font-bold text-slate-400 whitespace-nowrap leading-tight">
                    <span className="inline-block mb-3 text-slate-500">{line1.displayText}</span>
                    <br />
                    <span className="inline-block text-slate-200">
                        {line2Part1.displayText}
                        <span className={`transition-all duration-300 ${ignite ? "text-cyan-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.8)]" : "text-white"}`}>
                            {keyword.displayText}
                        </span>
                        {line2Part2.displayText}
                    </span>
                    <span className="animate-pulse text-cyan-500">_</span>
                </h1>

                <div className="max-w-md mt-12 text-center min-h-[4em]">
                    <p className={`text-sm text-slate-500 font-mono leading-relaxed transition-all duration-1000 ease-out transform ${showDisclaimer ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
                        {disclaimerText}
                    </p>
                </div>

            </div>
        </div>
    );
};
