import { ABOUT_ME_DATA } from '@/data/aboutMeData';
import { Mail, Linkedin, Github } from 'lucide-react';

export const ProfileHorizontal = () => {
    return (
        <div className="w-full h-full glass-panel px-6 rounded-2xl border border-white/10 flex items-center justify-between hover:border-gold-dim/20 transition-all">
            {/* Left: Avatar & Name */}
            <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-white/10 shadow-lg relative bg-black flex items-center justify-center bg-gradient-to-br from-obsidian to-black">
                    <span className="text-xl font-bold text-gold-glow">
                        {ABOUT_ME_DATA.personal.name.charAt(0)}
                    </span>
                </div>

                <div className="flex flex-col">
                    <h1 className="text-xl font-bold text-white tracking-wide">
                        {ABOUT_ME_DATA.personal.name}
                    </h1>
                    <div className="px-3 py-0.5 rounded-full bg-white/5 border border-white/10 w-max mt-1">
                        <span className="text-[10px] text-secondary font-mono">
                            @ {ABOUT_ME_DATA.personal.name.replace(' ', '-').toLowerCase()}-dev
                        </span>
                    </div>
                </div>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-3">
                <a
                    href={`mailto:${ABOUT_ME_DATA.personal.email}`}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#161b22] border border-white/10 hover:border-gold-glow/30 hover:bg-white/5 transition-all group"
                >
                    <Mail className="w-3.5 h-3.5 text-secondary group-hover:text-gold-glow transition-colors" />
                    <span className="text-xs text-secondary group-hover:text-white transition-colors">Email</span>
                </a>

                <a
                    href={ABOUT_ME_DATA.personal.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#161b22] border border-white/10 hover:border-[#0077b5]/50 hover:bg-white/5 transition-all group"
                >
                    <Linkedin className="w-3.5 h-3.5 text-secondary group-hover:text-[#0077b5] transition-colors" />
                    <span className="text-xs text-secondary group-hover:text-white transition-colors">LinkedIn</span>
                </a>

                <div className="flex items-center gap-2">
                    <a
                        href={ABOUT_ME_DATA.personal.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-9 h-9 rounded-lg bg-[#161b22] border border-white/10 hover:border-white/30 hover:bg-white/5 transition-all flex items-center justify-center group"
                    >
                        <Github className="w-4 h-4 text-secondary group-hover:text-white transition-colors" />
                    </a>
                    <a
                        href={ABOUT_ME_DATA.personal.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#161b22] border border-white/10 hover:border-white/30 hover:bg-white/5 transition-all group"
                    >
                        <Github className="w-3.5 h-3.5 text-secondary group-hover:text-white transition-colors" />
                        <span className="text-xs text-secondary group-hover:text-white transition-colors">GitHub</span>
                    </a>
                </div>
            </div>
        </div>
    );
};
