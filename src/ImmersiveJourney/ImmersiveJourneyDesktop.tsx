interface ImmersiveJourneyDesktopProps {
    onBack: () => void;
}

export const ImmersiveJourneyDesktop: React.FC<ImmersiveJourneyDesktopProps> = ({ onBack }) => {
    return (
        <div className="fixed inset-0 z-[100] bg-obsidian text-primary flex items-center justify-center">
            <div className="text-center animate-fade-in flex flex-col items-center">
                <h2 className="text-5xl font-light tracking-[1em] uppercase mb-8 ml-[1em] text-glow-white">
                    The Journey Begins
                </h2>
                <p className="text-gold-dim font-mono tracking-widest uppercase text-sm mb-12">
                    [ Independent Immersive Experience ]
                </p>

                <button
                    onClick={onBack}
                    className="group px-8 py-3 bg-transparent border border-white/10 hover:border-gold-glow rounded-sm text-xs font-mono tracking-widest uppercase transition-all duration-300"
                >
                    <span className="group-hover:text-gold-glow transition-colors">Return to Base</span>
                </button>
            </div>
        </div>
    );
};
