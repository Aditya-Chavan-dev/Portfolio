import type { LucideIcon } from 'lucide-react';

interface StatCardProps {
    icon: LucideIcon;
    label: string;
    value: string;
    variant?: 'desktop' | 'mobile';
    iconColorClass?: string;
}

export const StatCard = ({ icon: Icon, label, value, variant = 'desktop', iconColorClass = "text-gold-glow" }: StatCardProps) => {
    if (variant === 'mobile') {
        return (
            <div className="stat-card-mobile">
                <Icon className={`w-4 h-4 ${iconColorClass}`} />
                <span className="text-3xs text-slate-400 text-center uppercase tracking-wide">{label}</span>
                <span className="text-xs font-bold text-white">{value}</span>
            </div>
        );
    }

    return (
        <div className="stat-card min-w-[140px]">
            <Icon className={`w-5 h-5 ${iconColorClass}`} />
            <div className="flex flex-col">
                <span className="text-2xs text-slate-400 uppercase tracking-wider">{label}</span>
                <span className="text-lg font-bold text-white">{value}</span>
            </div>
        </div>
    );
};
