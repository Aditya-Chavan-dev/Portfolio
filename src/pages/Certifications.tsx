import { motion } from 'framer-motion';
import { useCertifications } from '@/common/hooks/useCertifications';

export function Certifications() {
  const { certifications, loading } = useCertifications();

  if (loading && certifications.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 opacity-40">
        <div className="w-6 h-6 border-2 border-accent border-t-transparent rounded-full animate-spin mb-4" />
        <span className="font-hud text-[10px] tracking-widest uppercase">Verifying Credentials…</span>
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-2">
        <h2 className="text-4xl font-display font-bold text-text-primary tracking-tight">Certifications & Badges</h2>
        <p className="text-text-muted font-body">Verified credentials in cloud architecture and specialized UI/UX design.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {certs.map((c, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className="flex flex-col items-center text-center p-6 bg-bg-surface border border-border-default rounded-xl hover:border-accent/40 hover:bg-bg-elevated transition-all duration-base group"
          >
            <div className="w-16 h-16 mb-4 flex items-center justify-center p-3 bg-white rounded-lg border border-border-default group-hover:scale-110 transition-transform">
              <img src={c.icon} alt={c.issuer} className="max-w-full max-h-full object-contain grayscale group-hover:grayscale-0 transition-all" />
            </div>
            <h3 className="text-sm font-display font-bold text-text-primary leading-tight h-10 flex items-center">
              {c.title}
            </h3>
            <span className="mt-2 text-[10px] font-body font-bold text-text-muted uppercase tracking-widest">
              {c.issuer}
            </span>
            <span className="mt-1 text-[9px] font-body text-accent opacity-60">
              Issued {c.date}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
