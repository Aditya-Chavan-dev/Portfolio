import { ArrowLeft } from 'lucide-react';

interface ProfessionalExperienceMobileProps {
    onBack?: () => void;
}

export const ProfessionalExperienceMobile = ({ onBack }: ProfessionalExperienceMobileProps) => {
    return (
        <section id="experience" className="min-h-screen flex flex-col items-start pt-16 px-6 bg-obsidian text-primary">
            {onBack && (
                <div className="w-full flex justify-start mb-6 relative z-50">
                    <button
                        onClick={onBack}
                        className="nav-button-mobile"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back
                    </button>
                </div>
            )}
            <h2 className="text-3xl font-bold">Experience (Mobile)</h2>
        </section>
    );
};
