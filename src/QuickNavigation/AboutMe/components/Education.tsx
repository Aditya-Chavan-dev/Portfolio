import { ABOUT_ME_DATA } from '@/data/aboutMeData';
import { GraduationCap } from 'lucide-react';

export const Education = () => {
    return (
        <div className="w-full h-full flex flex-col p-4">
            <h3 className="text-sm font-bold mb-3 flex items-center gap-2.5 text-white shrink-0">
                <div className="w-7 h-7 rounded-lg bg-gold-glow flex items-center justify-center text-obsidian">
                    <GraduationCap className="w-4 h-4" />
                </div>
                Academic Timeline
            </h3>

            <div className="flex flex-col gap-3 flex-1 overflow-y-auto scrollbar-hide pr-1">
                {ABOUT_ME_DATA.education.map((edu, i) => (
                    <div key={i} className="bg-[#121212] border border-white/5 rounded-xl p-4 flex flex-col gap-1.5 relative group hover:border-gold-dims/20 hover:bg-white/5 transition-all">
                        {/* Dot */}
                        <div className="absolute top-5 -left-[5px] w-2 h-2 rounded-full bg-gold-glow opacity-0 group-hover:opacity-100 transition-opacity" />

                        <div className="flex items-center gap-2 mb-0.5">
                            <div className="w-1.5 h-1.5 rounded-full bg-gold-glow" />
                            <span className="text-gold-glow text-xs font-bold font-mono">{edu.year}</span>
                        </div>

                        <h4 className="text-sm font-bold text-white leading-tight">{edu.degree}</h4>
                        <p className="text-xs text-secondary">{edu.institution}</p>

                        <div className="mt-1.5 self-start px-2 py-0.5 rounded-md bg-white/5 border border-white/10 flex items-center gap-1.5">
                            <span className="text-xs font-bold text-white/90">
                                {edu.grade.includes('%') ? edu.grade : `CGPA: ${edu.grade}`}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
