import { MapPin, Mail, Linkedin, Github } from 'lucide-react';
import { ABOUT_ME_DATA } from '@/data/aboutMeData';

export const Connect = () => {
    return (
        <div className="glass-panel p-4 rounded-2xl border-white-10 h-full relative overflow-hidden group hover:border-gold-dim/30 transition-fast flex flex-col justify-center">
            <div className="hover-glow-gold" />

            <div className="relative z-10 flex flex-col gap-3">
                <div className="flex items-center gap-icon-text text-sm text-secondary hover:text-white transition-colors group/item cursor-pointer">
                    <div className="w-8 h-8 rounded-lg bg-white/5 border-white-10 flex-center group-hover/item:bg-gold-dim/10 group-hover/item:border-gold-dim/30 transition-all">
                        <MapPin className="w-4 h-4 text-gold-muted group-hover/item:text-gold-glow" />
                    </div>
                    <span className="text-xs font-medium tracking-wide">{ABOUT_ME_DATA.personal.location}</span>
                </div>

                <div className="flex items-center gap-icon-text text-sm text-secondary hover:text-white transition-colors group/item cursor-pointer">
                    <div className="w-8 h-8 rounded-lg bg-white/5 border-white-10 flex-center group-hover/item:bg-gold-dim/10 group-hover/item:border-gold-dim/30 transition-all">
                        <Mail className="w-4 h-4 text-gold-muted group-hover/item:text-gold-glow" />
                    </div>
                    <a href={`mailto:${ABOUT_ME_DATA.personal.email}`} className="text-xs font-medium tracking-wide hover:text-gold-glow transition-colors">
                        Email
                    </a>
                </div>

                <div className="flex items-center gap-icon-text text-sm text-secondary hover:text-white transition-colors group/item cursor-pointer">
                    <div className="w-8 h-8 rounded-lg bg-white/5 border-white-10 flex-center group-hover/item:bg-gold-dim/10 group-hover/item:border-gold-dim/30 transition-all">
                        <Linkedin className="w-4 h-4 text-gold-muted group-hover/item:text-gold-glow" />
                    </div>
                    <a href="#" className="text-xs font-medium tracking-wide hover:text-gold-glow transition-colors">
                        LinkedIn
                    </a>
                </div>

                <div className="flex items-center gap-icon-text text-sm text-secondary hover:text-white transition-colors group/item cursor-pointer">
                    <div className="w-8 h-8 rounded-lg bg-white/5 border-white-10 flex-center group-hover/item:bg-gold-dim/10 group-hover/item:border-gold-dim/30 transition-all">
                        <Github className="w-4 h-4 text-gold-muted group-hover/item:text-gold-glow" />
                    </div>
                    <a href={`https://github.com/${ABOUT_ME_DATA.personal.github}`} target="_blank" rel="noreferrer" className="text-xs font-medium tracking-wide hover:text-gold-glow transition-colors">
                        GitHub
                    </a>
                </div>
            </div>
        </div>
    );
};
