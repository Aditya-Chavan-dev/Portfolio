import { Trophy, Code, FolderKanban } from 'lucide-react';

export const StatsStrip = () => {
    return (
        <div className="glass-panel w-full h-full rounded-2xl border border-white/10 flex items-center justify-between px-8 bg-surface/30">
            {/* Stat 1 */}
            <div className="flex items-center gap-4 group cursor-default">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 group-hover:border-gold-dim/30 transition-all">
                    <FolderKanban className="w-5 h-5 text-gold-muted group-hover:text-gold-glow" />
                </div>
                <div className="flex flex-col">
                    <span className="text-xl font-bold text-white">12+</span>
                    <span className="text-[10px] uppercase tracking-wider text-secondary">Total Projects</span>
                </div>
            </div>

            <div className="h-8 w-px bg-white/10" />

            {/* Stat 2 */}
            <div className="flex items-center gap-4 group cursor-default">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 group-hover:border-gold-dim/30 transition-all">
                    <Trophy className="w-5 h-5 text-gold-muted group-hover:text-gold-glow" />
                </div>
                <div className="flex flex-col">
                    <span className="text-xl font-bold text-white">4</span>
                    <span className="text-[10px] uppercase tracking-wider text-secondary">Awards Won</span>
                </div>
            </div>

            <div className="h-8 w-px bg-white/10" />

            {/* Stat 3 */}
            <div className="flex items-center gap-4 group cursor-default">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 group-hover:border-gold-dim/30 transition-all">
                    <Code className="w-5 h-5 text-gold-muted group-hover:text-gold-glow" />
                </div>
                <div className="flex flex-col">
                    <span className="text-xl font-bold text-white">150k+</span>
                    <span className="text-[10px] uppercase tracking-wider text-secondary">Lines Coded</span>
                </div>
            </div>

            {/* Status Indicator */}
            <div className="flex items-center gap-2 pl-8 border-l border-white/5">
                <div className="relative">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                    <div className="absolute inset-0 w-2 h-2 bg-emerald-500 rounded-full animate-ping opacity-50" />
                </div>
                <span className="text-[10px] text-emerald-500/80 font-mono tracking-tight">ELEVATOR ACTIVE</span>
            </div>
        </div>
    );
};
