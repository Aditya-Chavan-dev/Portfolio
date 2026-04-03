import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { AdaptiveSidebar } from '@/components/common/AdaptiveSidebar';
import { MobileTabBar } from '@/components/common/MobileTabBar';

interface DetailLayoutProps {
  children: React.ReactNode;
  title: string;
}

export function DetailLayout({ children, title }: DetailLayoutProps) {
  const navigate = useNavigate();

  return (
    <div className="flex h-full w-full bg-bg-base overflow-hidden">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block h-full">
        <AdaptiveSidebar />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full relative">
        {/* Mobile Header */}
        <header className="lg:hidden flex items-center h-16 px-6 bg-bg-surface border-b border-border-default">
          <button 
            onClick={() => navigate('/hub')}
            className="p-2 -ml-2 text-text-secondary hover:text-accent transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="flex-1 text-center font-display font-bold text-lg text-text-primary pl-4 tracking-tight">
            {title}
          </h1>
          <div className="w-10" /> {/* Spacer */}
        </header>

        {/* Content Region */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden p-6 lg:p-12 pb-32 lg:pb-12 scroll-smooth">
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </main>

        {/* Mobile Navigation */}
        <div className="lg:hidden">
          <MobileTabBar />
        </div>
      </div>
    </div>
  );
}
