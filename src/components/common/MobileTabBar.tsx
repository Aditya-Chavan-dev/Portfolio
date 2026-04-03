import { NavLink } from 'react-router-dom';
import { Layers, Briefcase, Cpu, Award, User } from 'lucide-react';

const tabs = [
  { label: 'Projects', path: '/hub/projects', icon: Layers },
  { label: 'Experience', path: '/hub/experience', icon: Briefcase },
  { label: 'Stack', path: '/hub/stack', icon: Cpu },
  { label: 'Certs', path: '/hub/certifications', icon: Award },
  { label: 'About', path: '/hub/about', icon: User },
];

export function MobileTabBar() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 h-20 bg-bg-surface/80 backdrop-blur-xl border-t border-border-default flex items-center justify-around px-2 pb-safe z-50">
      {tabs.map((tab) => (
        <NavLink
          key={tab.path}
          to={tab.path}
          className={({ isActive }) => `
            flex flex-col items-center gap-1 min-w-[64px] min-h-[44px] justify-center transition-colors duration-base
            ${isActive ? 'text-accent' : 'text-text-muted'}
          `}
        >
          <tab.icon size={20} />
          <span className="text-[10px] font-body font-bold uppercase tracking-tighter">{tab.label}</span>
        </NavLink>
      ))}
    </nav>
  );
}
