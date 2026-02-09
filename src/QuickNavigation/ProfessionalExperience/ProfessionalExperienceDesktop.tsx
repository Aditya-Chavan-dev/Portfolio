import { Briefcase, Code2, CheckCircle2, Calendar } from 'lucide-react';
import { EXPERIENCES } from '@/data/experienceData';

export const ProfessionalExperienceDesktop = () => {
    return (
        <div className="h-full w-full bg-black overflow-auto flex flex-col">
            {/* Header */}
            <div className="border-b border-white/10 px-12 py-8">
                <div className="flex items-center gap-4">
                    <div className="w-1 h-12 bg-gradient-to-b from-gold-glow to-emerald-500" />
                    <div>
                        <p className="text-xs font-mono text-emerald-500 uppercase tracking-wider">Professional Journey</p>
                        <h1 className="text-5xl font-black text-white">Experience</h1>
                    </div>
                </div>
            </div>

            {/* Experience Cards */}
            <div className="flex-1 px-12 py-12 max-w-7xl mx-auto w-full">
                <div className="space-y-8">
                    {EXPERIENCES.map((exp) => (
                        <div
                            key={exp.id}
                            className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-lg p-8"
                        >
                            {/* Type badge */}
                            <div className="flex items-center gap-3 mb-4">
                                {exp.type === 'internship' ? (
                                    <Briefcase className="w-5 h-5 text-gold-glow" />
                                ) : (
                                    <Code2 className="w-5 h-5 text-emerald-500" />
                                )}
                                <span className={`text-sm font-mono uppercase tracking-wider ${exp.type === 'internship' ? 'text-gold-glow' : 'text-emerald-500'
                                    }`}>
                                    {exp.type}
                                </span>
                            </div>

                            {/* Role */}
                            <h2 className="text-4xl font-black text-white leading-tight mb-2">
                                {exp.role}
                            </h2>

                            {/* Company */}
                            <p className="text-xl text-white/70 mb-4">{exp.company}</p>

                            {/* Duration */}
                            <div className="flex items-center gap-2 text-white/60 text-sm mb-6 font-mono">
                                <Calendar className="w-4 h-4" />
                                {exp.duration}
                            </div>

                            {/* Achievements */}
                            <div className="space-y-3 pt-4 border-t border-white/10">
                                {exp.achievements.map((achievement, i) => (
                                    <div key={i} className="flex items-start gap-3">
                                        <CheckCircle2 className={`w-5 h-5 mt-0.5 flex-shrink-0 ${exp.type === 'internship' ? 'text-gold-glow' : 'text-emerald-500'
                                            }`} />
                                        <p className="text-white/80 leading-relaxed">
                                            {achievement}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Bottom credits */}
            <div className="border-t border-white/10 px-12 py-4">
                <p className="text-xs font-mono text-white/30 text-center">
                    {EXPERIENCES.length} Professional Experiences • Impact-Driven Development
                </p>
            </div>
        </div>
    );
};
