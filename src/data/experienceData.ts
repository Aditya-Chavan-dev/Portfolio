export interface Experience {
    id: number;
    type: 'internship' | 'freelance';
    role: string;
    company: string;
    duration: string;
    achievements: string[];
}

export const EXPERIENCES: Experience[] = [
    {
        id: 1,
        type: 'internship',
        role: 'Software Development Intern',
        company: 'Tech Company Inc.',
        duration: 'June 2023 - August 2023',
        achievements: [
            'Optimized API response times by 40% through caching and query optimization',
            'Developed 5 new features increasing user engagement by 25%',
            'Reduced bug count by 60% through comprehensive unit testing',
            'Collaborated with cross-functional team of 8 developers on agile sprints'
        ]
    },
    {
        id: 2,
        type: 'freelance',
        role: 'Freelance Full Stack Developer',
        company: 'Client Solutions Ltd.',
        duration: 'January 2024 - March 2024',
        achievements: [
            'Built end-to-end e-commerce platform handling 1000+ daily transactions',
            'Improved page load time by 55% using code splitting and lazy loading',
            'Implemented payment gateway integration with 99.9% uptime',
            'Delivered project 2 weeks ahead of schedule with 100% client satisfaction'
        ]
    }
];
