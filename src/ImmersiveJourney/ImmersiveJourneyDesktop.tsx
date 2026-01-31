export const ImmersiveJourneyDesktop = () => {
    return (
        <div className="fixed inset-0 z-[100] bg-black text-white flex items-center justify-center">
            <div className="text-center animate-fadeIn">
                <h2 className="text-5xl font-light tracking-[1em] uppercase mb-8 ml-[1em]">
                    The Journey Begins
                </h2>
                <p className="text-slate-500 font-mono tracking-widest uppercase">
                    [ Independent Immersive Experience ]
                </p>
                {/* Independent internal navigation/interaction logic will go here */}
            </div>
        </div>
    );
};
