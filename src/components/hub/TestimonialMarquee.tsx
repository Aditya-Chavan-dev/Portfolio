

const testimonials = [
  {
    name: "Sarah Jenkins",
    role: "Product Lead @ FinTech",
    testimony: "Aditya's ability to translate complex logic into visceral, beautiful interfaces is unmatched. A tier-one architect.",
    avatar: "https://i.pravatar.cc/80?u=sarah"
  },
  {
    name: "Marcus Thorne",
    role: "CTO, Nexus Lab",
    testimony: "The architecture behind the redesign was clean, scalable, and met all our paint budget constraints. Incredible focus.",
    avatar: "https://i.pravatar.cc/80?u=marcus"
  },
  {
    name: "Elena Rossi",
    role: "Design Director",
    testimony: "Working with Aditya is like seeing the future. The spatial grid approach transformed our user engagement metrics overnight.",
    avatar: "https://i.pravatar.cc/80?u=elena"
  },
  {
    name: "David Chen",
    role: "Senior Dev",
    testimony: "Rare to find a developer with such a keen eye for aesthetics. The midnight palette implementation is flawless.",
    avatar: "https://i.pravatar.cc/80?u=david"
  }
];

export function TestimonialMarquee() {
  return (
    <aside className="relative h-full overflow-hidden flex flex-col gap-4">
      <h3 className="text-xs font-body font-bold tracking-widest uppercase text-text-muted mb-2 px-2">
        Testimonials
      </h3>

      {/* Glass Panel Restricted Usage (Max 2 in View) */}
      <div className="flex-1 relative overflow-hidden bg-bg-elevated/40 backdrop-blur-xl border border-border-default rounded-xl group/marquee">
        <div className="absolute inset-0 flex flex-col gap-4 animate-vertical-scroll hover:[animation-play-state:paused] p-4">
          {[...testimonials, ...testimonials].map((t, i) => (
            <div 
              key={i} 
              className="flex flex-col gap-3 p-4 rounded-lg bg-bg-elevated/60 border border-border-default shadow-sm hover:border-accent/20 transition-colors duration-base"
            >
              <div className="flex items-center gap-3">
                <img 
                  src={t.avatar} 
                  alt={t.name}
                  width={40}
                  height={40}
                  className="w-10 h-10 rounded-full object-cover bg-bg-surface"
                />
                <div className="flex flex-col">
                  <span className="text-sm font-body font-bold text-text-primary">{t.name}</span>
                  <span className="text-[10px] uppercase tracking-wider text-text-secondary">{t.role}</span>
                </div>
              </div>
              <p className="text-xs leading-relaxed text-text-muted line-clamp-3 italic">
                "{t.testimony}"
              </p>
            </div>
          ))}
        </div>

        {/* Gradient Fades */}
        <div className="absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-bg-surface/80 to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-bg-surface/80 to-transparent pointer-events-none" />
      </div>

      <style>{`
        @keyframes vertical-scroll {
          0% { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
        .animate-vertical-scroll {
          animation: vertical-scroll 30s linear infinite;
        }
      `}</style>
    </aside>
  );
}
