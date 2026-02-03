import { Sparkles, ScanEye, Network } from 'lucide-react';

export const StrengthsStrip = () => {
    return (
        <div className="glass-panel w-full h-full rounded-2xl border border-white/10 flex items-center justify-between px-8 bg-surface/30">
            {/* Strength 1: Agentic UX */}
            <div className="flex items-center gap-4 group cursor-default flex-1">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 group-hover:border-gold-dim/30 transition-all">
                    <Sparkles className="w-5 h-5 text-gold-muted group-hover:text-gold-glow" />
                </div>
                <div className="flex flex-col">
                    <span className="text-sm font-bold text-white group-hover:text-gold-glow transition-colors">Agentic UX</span>
                </div>
            </div>

            <div className="h-8 w-px bg-white/10" />

            {/* Strength 2: Pixel Perfection */}
            <div className="flex items-center gap-4 group cursor-default flex-1 justify-center">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 group-hover:border-emerald-500/30 transition-all">
                    <ScanEye className="w-5 h-5 text-emerald-400/80 group-hover:text-emerald-400" />
                </div>
                <div className="flex flex-col">
                    <span className="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors">Pixel Perfection</span>
                </div>
            </div>

            <div className="h-8 w-px bg-white/10" />

            {/* Strength 3: System Architecture */}
            <div className="flex items-center gap-4 group cursor-default flex-1 justify-end">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 group-hover:border-blue-500/30 transition-all">
                    <Network className="w-5 h-5 text-blue-400/80 group-hover:text-blue-400" />
                </div>
                <div className="flex flex-col items-end">
                    <span className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">System Architecture</span>
                </div>
            </div>

            {/* Status Indicator (Kept for vibe) */}
            <div className="hidden lg:flex items-center gap-2 pl-8 border-l border-white/5 ml-8">
                <div className="relative">
                    <div className="w-2 h-2 bg-gold-glow rounded-full animate-pulse" />
                    <div className="absolute inset-0 w-2 h-2 bg-gold-glow rounded-full animate-ping opacity-50" />
                </div>
                <span className="text-[10px] text-gold-glow/80 font-mono tracking-tight">OPEN TO WORK</span>
            </div>
        </div>
    );
};
