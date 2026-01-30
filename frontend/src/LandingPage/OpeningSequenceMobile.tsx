import { useState, useEffect } from 'react';
import { useTypewriter } from '@/shared/hooks/useTypewriter';

interface OpeningSequenceProps {
    onComplete: () => void;
}

export const OpeningSequenceMobile = ({ onComplete }: OpeningSequenceProps) => {
    const [showDisclaimer, setShowDisclaimer] = useState(false);
    const [isExiting, setIsExiting] = useState(false);
    const [ignite, setIgnite] = useState(false);

    // New Dialogue Logic for Mobile
    const line1Part1 = useTypewriter("IT'S NOT HOW I", { speed: 40 });
    const line1Part2 = useTypewriter("WRITE THE CODE", { speed: 40, delay: 1000 });

    const line2Part1 = useTypewriter("BUT HOW I ", { speed: 40, delay: 2000 });
    const keyword = useTypewriter("THINK", { speed: 40, delay: 2600 });
    const line2Part2 = useTypewriter(" THAT DEFINES ME", { speed: 40, delay: 3200 });

    const disclaimerText = "STRICTLY TYPED • OPINIONATED • HEAVILY COMMENTED";

    // Trigger Ignite
    useEffect(() => {
        if (keyword.displayText === "THINK") {
            setIgnite(true);
        }
    }, [keyword.displayText]);

    // Trigger Sequence End
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
        <div className={`relative w-full h-screen overflow-hidden bg-[#020617] text-white transition-opacity duration-1000 ${isExiting ? "animate-fadeOut" : "opacity-100"}`}>
            <div className="absolute inset-0 z-10 bg-gradient-to-b from-[#020617]/30 via-[#020617]/60 to-[#020617]" />

            <div className="relative z-20 h-full flex flex-col justify-end pb-24 px-6 font-bold">
                <div className="mb-8">
                    <h1 className="text-3xl leading-tight text-slate-400">
                        {/* Line 1 */}
                        <span className="block mb-1">{line1Part1.displayText}</span>
                        <span className="block mb-4 text-slate-300">{line1Part2.displayText}</span>

                        {/* Line 2 */}
                        <span className="block text-white">
                            {line2Part1.displayText}
                            <span className={`inline-block mx-1 transition-all duration-300 ${ignite ? "text-cyan-400 scale-110 drop-shadow-[0_0_10px_rgba(34,211,238,0.8)]" : "text-white"}`}>
                                {keyword.displayText}
                            </span>
                        </span>
                        <span className="block">{line2Part2.displayText}</span>
                    </h1>
                </div>

                <div className="mt-8 min-h-[4em]">
                    <p className={`text-xs text-slate-500 font-mono text-center max-w-[280px] leading-relaxed mx-auto transition-all duration-1000 ease-out transform ${showDisclaimer ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
                        {disclaimerText}
                    </p>
                </div>
            </div>
        </div>
    );
};
