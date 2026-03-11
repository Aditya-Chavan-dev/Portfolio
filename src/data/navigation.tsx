import { FolderGit2, User, Briefcase, Award } from 'lucide-react';

export const NAVIGATION_ITEMS = [
    {
        label: 'Projects',
        id: 'projects',
        icon: FolderGit2,
        description: 'Full Stack, AI & Creative Dev'
    },
    {
        label: 'About Me',
        id: 'about',
        icon: User,
        description: 'My Journey, Philosophy & Skills'
    },
    {
        label: 'Experience',
        id: 'experience',
        icon: Briefcase,
        description: 'Professional Roles & Impact'
    },
    {
        label: 'Certification',
        id: 'certification',
        icon: Award,
        description: 'Achievements & continuous learning'
    }
] as const;
