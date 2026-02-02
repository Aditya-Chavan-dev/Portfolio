import { Sparkles, Users, Lightbulb } from 'lucide-react';

export const Strengths = () => {
    const strengths = [
        {
            icon: Users,
            title: "Collaborative Team Player",
            description: "Foster positive working relationships and adapt communication styles to work effectively with diverse teams.",
            gradient: "from-blue-500/20 to-cyan-500/10",
            iconColor: "text-blue-400"
        },
        {
            icon: Sparkles,
            title: "Adaptive Problem Solver",
            description: "Quickly assess situations and adjust approach to meet changing requirements and dynamic project needs.",
            gradient: "from-purple-500/20 to-pink-500/10",
            iconColor: "text-purple-400"
        },
        {
            icon: Lightbulb,
            title: "Strategic Efficiency",
            description: "Prioritize high-impact solutions and leverage modern tools to deliver optimal results with maximum efficiency.",
            gradient: "from-amber-500/20 to-orange-500/10",
            iconColor: "text-amber-400"
        }
    ];

    return (
        <div className="glass-panel p-2 rounded-2xl border border-white/10 relative overflow-hidden hover:border-gold-dim/20 transition-all duration-300 group">
            {/* Animated background glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/0 via-blue-500/5 to-pink-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative z-10">
                <h3 className="text-[10px] font-bold mb-1.5 flex items-center gap-1.5">
                    <div className="w-6 h-6 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/10 border border-purple-500/30 flex items-center justify-center">
                        <span className="text-xs">💪</span>
                    </div>
                    <span className="bg-gradient-to-r from-white to-secondary bg-clip-text text-transparent">
                        Top <span className="text-purple-400">Strengths</span>
                    </span>
                </h3>

                <div className="space-y-1">
                    {strengths.map((strength, i) => {
                        const Icon = strength.icon;
                        return (
                            <div
                                key={i}
                                className="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-purple-400/30 transition-all duration-300 group/strength cursor-pointer"
                            >
                                <div className="flex items-center gap-1.5">
                                    <div className={`w-6 h-6 rounded-lg bg-gradient-to-br ${strength.gradient} border border-white/10 flex items-center justify-center flex-shrink-0 group-hover/strength:scale-110 transition-transform`}>
                                        <Icon className={`w-3 h-3 ${strength.iconColor}`} />
                                    </div>
                                    <h4 className="text-[10px] font-bold text-white group-hover/strength:text-purple-400 transition-colors">
                                        {strength.title}
                                    </h4>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};
