import { ArrowLeft, User, Briefcase, Award, FolderGit2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface SidebarNavProps {
    onNavigate: (section: string) => void;
    activeSection?: 'projects' | 'about' | 'experience' | 'certification';
}

export const SidebarNav = ({ onNavigate, activeSection = 'about' }: SidebarNavProps) => {

    const navItems = [
        { id: 'back', icon: ArrowLeft, label: 'Back to Hub', action: () => onNavigate('hero') },
        { id: 'projects', icon: FolderGit2, label: 'Projects', action: () => onNavigate('projects') },
        { id: 'about', icon: User, label: 'About Me', action: () => onNavigate('about') },
        { id: 'experience', icon: Briefcase, label: 'Experience', action: () => onNavigate('experience') },
        { id: 'certification', icon: Award, label: 'Certifications', action: () => onNavigate('certification') },
    ];

    return (
        <div className="h-full w-16 glass-panel rounded-2xl border border-white/10 flex flex-col items-center py-6 gap-6 relative overflow-visible z-50">
            {/* Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-20 rounded-2xl pointer-events-none" />

            {/* Icons */}
            <div className="flex flex-col gap-4 z-10 w-full items-center">
                {navItems.map((item) => {
                    const isActive = item.id === activeSection;
                    return (
                        <button
                            key={item.id}
                            onClick={item.action}
                            className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 group relative
                                ${isActive
                                    ? 'bg-gold-dim/20 border border-gold-dim/50 text-gold-glow shadow-[0_0_15px_rgba(255,215,0,0.3)]'
                                    : 'bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/20 text-secondary hover:text-white'
                                }
                            `}
                        >
                            <motion.span
                                layoutId={item.id === 'back' ? undefined : `nav-icon-${item.id}`}
                                transition={{ type: "spring", stiffness: 50, damping: 20, mass: 1, duration: 1.0, delay: 0.1 }}
                                className="flex items-center justify-center"
                            >
                                <item.icon className="w-5 h-5" />
                            </motion.span>

                            {/* Tooltip */}
                            <span className="absolute left-full ml-4 px-2 py-1 bg-obsidian border border-white/10 rounded-md text-xs font-medium text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none">
                                {item.label}
                            </span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
};
