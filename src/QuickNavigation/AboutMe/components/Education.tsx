
import { ABOUT_ME_DATA } from '@/data/aboutMeData';
import { GraduationCap } from 'lucide-react';

export const Education = () => {
    return (
        <div className="w-full">
            <h3 className="text-base font-bold mb-3 flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-gold-muted" />
                <span>Academic Timeline</span>
            </h3>

            <div className="relative border-l border-white/10 ml-3 space-y-3">
                {ABOUT_ME_DATA.education.map((edu, i) => (
                    <div key={i} className="relative pl-5">
                        {/* Timeline Node */}
                        <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-gold-dim ring-4 ring-obsidian"></div>

                        <div className="glass-panel p-3 rounded-lg border border-white/5 hover:border-gold-dim/30 transition-colors">
                            <span className="text-[10px] font-mono text-gold-glow mb-0.5 block">{edu.year}</span>
                            <h4 className="text-sm font-bold text-white mb-0.5">{edu.degree}</h4>
                            <p className="text-[11px] text-secondary mb-1.5">{edu.institution}</p>
                            <div className="inline-block px-1.5 py-0.5 bg-white/5 rounded text-[10px] text-white/70">
                                {edu.grade}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
