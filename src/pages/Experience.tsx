import { motion } from 'framer-motion';
import { useExperience } from '@/common/hooks/useExperience';

export function Experience() {
  const { experience, loading } = useExperience();

  if (loading && experience.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 opacity-40">
        <div className="w-6 h-6 border-2 border-accent border-t-transparent rounded-full animate-spin mb-4" />
        <span className="font-hud text-[10px] tracking-widest uppercase">Initializing History…</span>
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-2">
        <h2 className="text-4xl font-display font-bold text-text-primary tracking-tight">Professional Experience</h2>
        <p className="text-text-muted font-body">Decade of engineering premium digital interfaces.</p>
      </div>

      <div className="relative flex flex-col gap-12 pl-8 border-l border-accent/20 ml-4 py-4">
        {experience.map((ex, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="relative flex flex-col gap-4"
          >
            {/* Timeline Dot */}
            <div className="absolute -left-[41px] top-1.5 w-[17px] h-[17px] bg-bg-base border-2 border-accent rounded-full shadow-[0_0_8px_rgba(212,165,116,0.3)]" />

            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-2">
              <h3 className="text-2xl font-display font-bold text-text-primary">
                {ex.company}
              </h3>
              <span className="text-xs font-body font-bold text-accent uppercase tracking-widest bg-accent/5 px-3 py-1 rounded-full border border-accent/10 whitespace-nowrap lg:ml-4">
                {ex.date}
              </span>
            </div>

            <p className="text-lg font-body font-bold text-text-secondary">
              {ex.role}
            </p>

            <ul className="flex flex-col gap-3">
              {ex.bullets.map((b, bi) => (
                <li key={bi} className="text-sm font-body text-text-muted leading-relaxed flex gap-3">
                  <span className="text-accent opacity-60">•</span>
                  {b}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
