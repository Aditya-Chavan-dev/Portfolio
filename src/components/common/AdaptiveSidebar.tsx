import { motion } from 'framer-motion';
import { NavLink, useNavigate } from 'react-router-dom';
import { ArrowLeft, Layers, Briefcase, Cpu, Award, User } from 'lucide-react';

const navItems = [
  { label: 'Projects', path: '/hub/projects', icon: Layers },
  { label: 'Experience', path: '/hub/experience', icon: Briefcase },
  { label: 'Stack', path: '/hub/stack', icon: Cpu },
  { label: 'Certs', path: '/hub/certifications', icon: Award },
  { label: 'About', path: '/hub/about', icon: User },
];

export function AdaptiveSidebar() {
  const navigate = useNavigate();

  return (
    <aside className="w-80 h-full bg-bg-surface border-r border-border-default p-8 flex flex-col gap-10">
      <button 
        onClick={() => navigate('/hub')}
        className="flex items-center gap-3 text-text-muted hover:text-accent transition-colors duration-base group"
      >
        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
        <span className="font-body font-bold text-sm tracking-widest uppercase">Hub</span>
      </button>

      <nav className="flex flex-col gap-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `
              relative flex items-center gap-4 px-4 py-3 rounded-md font-body font-medium text-sm transition-all duration-base
              ${isActive 
                ? 'text-accent bg-accent/5 translate-x-2' 
                : 'text-text-secondary hover:text-text-primary hover:bg-bg-elevated hover:translate-x-1'
              }
            `}
          >
            {({ isActive }) => (
              <>
                <item.icon size={20} strokeWidth={isActive ? 2 : 1.5} />
                {item.label}
                {isActive && (
                  <motion.div 
                    layoutId="active-nav"
                    className="absolute left-0 w-1 h-2/3 bg-accent rounded-full"
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }} // easing-default
                  />
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
