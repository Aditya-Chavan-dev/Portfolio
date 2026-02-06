import { ProfileHorizontal } from '@/QuickNavigation/AboutMe/components/ProfileHorizontal';
import { CERTIFICATIONS_DATA } from '@/data/certificationsData';
import { CertificationCard } from './components/CertificationCard';

interface CertificationsDesktopProps {
    onNavigate?: (section: string) => void;
}

export const CertificationsDesktop = ({ onNavigate }: CertificationsDesktopProps) => {

    // Placeholder for View Project interaction
    const handleViewProject = (repoName: string) => {
        // Logic to navigate to Project View and select this repo
        console.log(`Deep link to project: ${repoName}`);
        if (onNavigate) onNavigate('projects');
    };

    return (
        <div className="h-full w-full flex flex-col gap-4 relative z-10 min-h-0">
            {/* Header */}
            <div className="w-full shrink-0 h-20">
                <ProfileHorizontal />
            </div>

            {/* Scrollable Grid Area */}
            <div className="flex-1 overflow-y-auto min-h-0 pr-2 pb-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-max">
                    {CERTIFICATIONS_DATA.map((cert) => (
                        <CertificationCard
                            key={cert.id}
                            cert={cert}
                            onViewProject={handleViewProject}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};
