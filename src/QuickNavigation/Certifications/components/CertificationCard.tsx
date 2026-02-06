import { ArrowUpRight, Award, FolderGit2 } from 'lucide-react';
import type { Certification } from '@/data/certificationsData';
import { motion } from 'framer-motion';

interface CertificationCardProps {
    cert: Certification;
    onViewProject?: (projectName: string) => void;
}

export const CertificationCard = ({ cert, onViewProject }: CertificationCardProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="group relative flex flex-col bg-obsidian/80 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden hover:border-gold-dim/40 transition-all duration-300 shadow-lg hover:shadow-gold-dim/10"
        >
            {/* 1. Header: Issuer & Title */}
            <div className="p-5 border-b border-white/5 bg-white/5">
                <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-2 text-gold-dim text-xs font-semibold uppercase tracking-wider">
                        <Award className="w-4 h-4" />
                        <span>{cert.issuer}</span>
                    </div>
                    <span className="text-secondary/60 text-xs">{cert.issueDate}</span>
                </div>
                <h3 className="text-xl font-bold text-white group-hover:text-gold-glow transition-colors line-clamp-2">
                    {cert.title}
                </h3>
            </div>

            {/* 2. Middle: PDF Thumbnail Preview (Placeholder for now) */}
            <div className="h-48 w-full bg-black/40 relative overflow-hidden group-hover:bg-black/20 transition-colors">
                {/* Visual Placeholder */}
                <div className="absolute inset-0 flex items-center justify-center text-white/10 group-hover:text-white/20 transition-colors">
                    <div className="text-center">
                        <Award className="w-12 h-12 mx-auto mb-2 opacity-50" />
                        <span className="text-sm font-medium">Certificate Preview</span>
                    </div>
                </div>

                {/* Hover overlay hint */}
                <div className="absolute inset-0 bg-gold-dim/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[1px]">
                    <a
                        href={cert.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-obsidian border border-gold-dim/50 rounded-lg text-gold-glow text-sm font-medium flex items-center gap-2 transform translate-y-2 group-hover:translate-y-0 transition-all shadow-xl"
                    >
                        Verify Credential <ArrowUpRight className="w-4 h-4" />
                    </a>
                </div>
            </div>

            {/* 3. Footer: Skills & Actions */}
            <div className="p-5 flex-1 flex flex-col justify-between gap-4 bg-gradient-to-b from-transparent to-black/20">
                {/* Skills */}
                <div className="flex flex-wrap gap-2">
                    {cert.skills.map((skill) => (
                        <span key={skill} className="px-2 py-1 rounded-md bg-white/5 border border-white/5 text-xs text-secondary/80 group-hover:border-white/10 transition-colors">
                            {skill}
                        </span>
                    ))}
                </div>

                {/* Project Link */}
                {cert.associatedProject && onViewProject && (
                    <button
                        onClick={() => onViewProject(cert.associatedProject!)}
                        className="w-full flex items-center justify-center gap-2 py-2 mt-2 rounded-lg bg-white/5 border border-white/10 hover:bg-gold-dim/10 hover:border-gold-dim/30 hover:text-gold-glow text-secondary transition-all text-sm font-medium group/btn"
                    >
                        <FolderGit2 className="w-4 h-4 group-hover/btn:text-gold-glow transition-colors" />
                        View Project used in
                    </button>
                )}
            </div>
        </motion.div>
    );
};
