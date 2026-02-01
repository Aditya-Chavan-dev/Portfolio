interface ImmersiveJourneyMobileProps {
    onBack: () => void;
}

export const ImmersiveJourneyMobile: React.FC<ImmersiveJourneyMobileProps> = ({ onBack }) => {
    return (
        <div className="fixed inset-0 z-[100] bg-obsidian text-primary flex items-center justify-center p-6 text-center">
            <div className="animate-fade-in flex flex-col items-center">
                <h2 className="text-3xl font-light tracking-[0.5em] uppercase mb-6 text-glow-white">
                    Journey
                </h2>
                <p className="text-gold-dim text-xs font-mono tracking-widest uppercase mb-12">
                    [ Independent Mobile Experience ]
                </p>

                <button
                    onClick={onBack}
                    className="px-6 py-3 bg-white/5 border border-white/10 rounded-sm text-xs font-mono tracking-widest uppercase active:bg-gold-glow/20 transition-all"
                >
                    Return to Base
                </button>
            </div>
        </div>
    );
};
