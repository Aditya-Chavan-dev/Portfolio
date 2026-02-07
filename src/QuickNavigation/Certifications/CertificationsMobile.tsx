import { ArrowLeft } from 'lucide-react';
import { CERTIFICATIONS_DATA } from '@/data/certificationsData';
import { CertificationCard } from './components/CertificationCard';

interface CertificationsMobileProps {
    onBack?: () => void;
    onNavigate?: (section: string) => void;
}

export const CertificationsMobile = ({ onBack, onNavigate }: CertificationsMobileProps) => {
    // Placeholder for View Project interaction
    const handleViewProject = () => {
        if (onNavigate) onNavigate('projects');
    };

    return (
        <section id="certification" className="relative z-10 min-h-screen flex flex-col pt-16 px-6 bg-obsidian text-primary pb-24">
            <div className="w-full flex justify-between items-center mb-8 pt-4">
                {onBack && (
                    <div className="relative z-50">
                        <button
                            onClick={onBack}
                            className="nav-button-mobile"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Back
                        </button>
                    </div>
                )}
                <h2 className="text-xl font-bold uppercase tracking-widest text-secondary">Certifications</h2>
            </div>

            <div className="flex flex-col gap-6">
                {CERTIFICATIONS_DATA.map((cert) => (
                    <CertificationCard
                        key={cert.id}
                        cert={cert}
                        onViewProject={handleViewProject}
                    />
                ))}
            </div>
        </section>
    );
};
