export interface Certification {
    id: string;
    title: string;
    issuer: string;
    issueDate: string;
    certificatePath: string; // Path to PDF or Image
    skills: string[];
    associatedProject?: string; // Repo name to link to
    link: string; // External verification link
}

export const CERTIFICATIONS_DATA: Certification[] = [
    {
        id: '1',
        title: 'AWS Certified Solutions Architect – Associate',
        issuer: 'Amazon Web Services',
        issueDate: '2024',
        certificatePath: '', // Placeholder
        skills: ['AWS', 'Cloud Architecture', 'Security'],
        associatedProject: 'ATLAS', // Example linking to Flagship
        link: 'https://aws.amazon.com/verification'
    },
    {
        id: '2',
        title: 'Meta Front-End Developer Professional Certificate',
        issuer: 'Meta',
        issueDate: '2023',
        certificatePath: '',
        skills: ['React', 'JavaScript', 'UI/UX'],
        link: 'https://www.coursera.org/account/accomplishments/specialization/certificate/...'
    }
];
