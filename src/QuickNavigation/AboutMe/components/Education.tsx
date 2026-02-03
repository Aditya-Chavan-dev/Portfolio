
import { ABOUT_ME_DATA } from '@/data/aboutMeData';
import { GraduationCap } from 'lucide-react';

export const Education = () => {
    return (
        <div className="w-full h-full flex flex-col overflow-hidden">
            <h3 className="text-xs font-bold mb-2 flex items-center gap-1.5 flex-shrink-0">
                <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-gold-dim/20 to-gold-glow/10 border border-gold-dim/30 flex items-center justify-center">
                    <GraduationCap className="w-4 h-4 text-gold-glow" />
                </div>
                <span className="bg-gradient-to-r from-white to-secondary bg-clip-text text-transparent">Academic Timeline</span>
            </h3>

            <div className="relative border-l-2 border-white/10 ml-3 flex-1 flex flex-col justify-between py-1">
                {ABOUT_ME_DATA.education.map((edu, i) => (
                    <div key={i} className="relative pl-4 group">
                        {/* Enhanced Timeline Node with glow effect */}
                        <div className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-gradient-to-br from-gold-glow to-gold-dim ring-2 ring-obsidian group-hover:ring-gold-dim/50 transition-all duration-300 group-hover:scale-110">
                            <div className="absolute inset-0 rounded-full bg-gold-glow/50 blur-sm opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>

                        <div className="glass-panel p-2.5 rounded-xl border border-white/5 hover:border-gold-dim/30 hover:bg-white/5 transition-all duration-300 cursor-pointer">
                            <span className="text-xs font-mono text-gold-glow block mb-0.5 font-semibold">{edu.year}</span>
                            <h4 className="text-sm font-bold text-white leading-tight mb-0.5 group-hover:text-gold-glow transition-colors">{edu.degree}</h4>
                            <p className="text-xs text-secondary leading-tight mb-1.5">{edu.institution}</p>
                            <div className="inline-flex items-center px-2 py-0.5 bg-gradient-to-r from-white/5 to-white/10 rounded-lg text-sm text-white/90 font-bold border border-white/10">
                                <span className="mr-1">📊</span>
                                {edu.grade}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
