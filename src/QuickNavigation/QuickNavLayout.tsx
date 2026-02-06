import type { ReactNode } from 'react';
import { SidebarNav } from './components/SidebarNav';
import { easeInOut, motion, AnimatePresence } from 'framer-motion';

interface QuickNavLayoutProps {
    children: ReactNode;
    activeSection: string;
    onNavigate: (section: string) => void;
}

import { useDeviceType } from '@/hooks/useDeviceType';

export const QuickNavLayout = ({ children, activeSection, onNavigate }: QuickNavLayoutProps) => {
    const { isMobile } = useDeviceType();

    if (isMobile) {
        return <>{children}</>;
    }

    return (
        <div className="h-screen w-full flex flex-col p-6 relative overflow-hidden bg-obsidian text-white font-sans selection:bg-gold-dim/30">
            {/* Enhanced Ambient Background Effects (Persistent) */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[5%] right-[10%] w-[600px] h-[600px] bg-gradient-to-br from-gold-dim/10 to-gold-glow/5 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '8s' }} />
                <div className="absolute bottom-[10%] left-[5%] w-[550px] h-[550px] bg-gradient-to-tr from-emerald-500/10 to-emerald-400/5 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '10s' }} />
            </div>

            {/* Main Layout Grid */}
            <div className="flex-1 w-full h-full max-w-[1600px] mx-auto grid grid-cols-[auto_1fr] gap-4 relative z-10">
                {/* Column 1: persistent Sidebar Nav Dock */}
                <div className="w-16 h-full pt-4 pb-4">
                    <SidebarNav onNavigate={onNavigate} activeSection={activeSection} />
                </div>

                {/* Column 2: Dynamic Content Area */}
                <div className="relative flex-1 h-full min-h-0 min-w-0">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeSection}
                            initial={{ opacity: 0, x: 20, filter: 'blur(10px)' }}
                            animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                            exit={{ opacity: 0, x: -20, filter: 'blur(10px)' }}
                            transition={{ duration: 0.4, ease: easeInOut }}
                            className="w-full h-full"
                        >
                            {children}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};
