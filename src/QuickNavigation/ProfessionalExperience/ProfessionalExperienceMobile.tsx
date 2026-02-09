import { motion } from 'framer-motion';
import { ArrowLeft, Briefcase, Code2, CheckCircle2, Calendar } from 'lucide-react';
import { EXPERIENCES } from '@/data/experienceData';
import { useState } from 'react';

interface ProfessionalExperienceMobileProps {
    onBack?: () => void;
}

export const ProfessionalExperienceMobile = ({ onBack }: ProfessionalExperienceMobileProps) => {
    const [expandedId, setExpandedId] = useState<number | null>(null);

    return (
        <section className="min-h-screen flex flex-col bg-black text-white pt-16 px-6 pb-20">
            {/* Back Button */}
            {onBack && (
                <div className="w-full flex justify-start mb-6 relative z-50">
                    <button
                        onClick={onBack}
                        className="nav-button-mobile"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back
                    </button>
                </div>
            )}

            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
            >
                <p className="text-xs font-mono text-emerald-500 uppercase tracking-wider mb-2">
                    Professional Journey
                </p>
                <h1 className="text-4xl font-black text-white">Experience</h1>
                <div className="w-16 h-1 bg-gradient-to-r from-gold-glow to-emerald-500 mt-3" />
            </motion.div>

            {/* Vertical Timeline */}
            <div className="relative space-y-8">
                {/* Timeline line */}
                <div className="absolute left-4 top-8 bottom-8 w-0.5 bg-gradient-to-b from-gold-glow via-emerald-500 to-gold-glow opacity-30" />

                {EXPERIENCES.map((exp, index) => {
                    const isExpanded = expandedId === exp.id;

                    return (
                        <motion.div
                            key={exp.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.2 }}
                            className="relative pl-12"
                        >
                            {/* Timeline dot */}
                            <div className={`absolute left-2 top-4 w-5 h-5 rounded-full bg-black border-2 flex items-center justify-center ${exp.type === 'internship' ? 'border-gold-glow' : 'border-emerald-500'
                                }`}>
                                {exp.type === 'internship' ? (
                                    <Briefcase className="w-2.5 h-2.5 text-gold-glow" />
                                ) : (
                                    <Code2 className="w-2.5 h-2.5 text-emerald-500" />
                                )}
                            </div>

                            {/* Card */}
                            <div
                                onClick={() => setExpandedId(isExpanded ? null : exp.id)}
                                className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-lg p-5 active:scale-[0.98] transition-transform"
                            >
                                {/* Type badge */}
                                <span className={`inline-block text-xs font-mono uppercase tracking-wider px-2 py-1 rounded mb-3 ${exp.type === 'internship'
                                        ? 'bg-gold-glow/10 text-gold-glow border border-gold-glow/20'
                                        : 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20'
                                    }`}>
                                    {exp.type}
                                </span>

                                {/* Role */}
                                <h2 className="text-2xl font-black text-white leading-tight mb-2">
                                    {exp.role}
                                </h2>

                                {/* Company */}
                                <p className="text-base text-white/70 mb-3">{exp.company}</p>

                                {/* Duration */}
                                <div className="bg-black/60 border border-white/10 rounded px-3 py-2 font-mono mb-4">
                                    <div className="flex items-center gap-2 text-white/70 text-sm">
                                        <Calendar className="w-3 h-3" />
                                        {exp.duration}
                                    </div>
                                </div>

                                {/* Achievements - accordion */}
                                <motion.div
                                    initial={false}
                                    animate={{
                                        height: isExpanded ? 'auto' : '0px',
                                        opacity: isExpanded ? 1 : 0
                                    }}
                                    transition={{ duration: 0.3 }}
                                    className="overflow-hidden"
                                >
                                    <div className="space-y-3 pt-3 border-t border-white/10">
                                        {exp.achievements.map((achievement, i) => (
                                            <motion.div
                                                key={i}
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: i * 0.08 }}
                                                className="flex items-start gap-2"
                                            >
                                                <CheckCircle2 className={`w-4 h-4 mt-0.5 flex-shrink-0 ${exp.type === 'internship' ? 'text-gold-glow' : 'text-emerald-500'
                                                    }`} />
                                                <p className="text-white/80 text-sm leading-relaxed">
                                                    {achievement}
                                                </p>
                                            </motion.div>
                                        ))}
                                    </div>
                                </motion.div>

                                {/* Expand hint */}
                                {!isExpanded && (
                                    <div className="mt-3 text-xs font-mono text-white/40">
                                        Tap to view {exp.achievements.length} achievements ↓
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {/* Footer */}
            <div className="mt-12 border-t border-white/10 pt-6">
                <p className="text-xs font-mono text-white/30 text-center">
                    {EXPERIENCES.length} Professional Experiences
                </p>
            </div>
        </section>
    );
};
