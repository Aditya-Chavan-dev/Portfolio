import { motion } from 'framer-motion';
import { useCertifications } from '@/common/hooks/useCertifications';
import { Shield, Fingerprint, CheckCircle } from 'lucide-react';

import { LoadingSpinner } from '@/common/components/LoadingSpinner';

export function Certifications() {
  const { certifications, loading } = useCertifications();

  if (loading && certifications.length === 0) {
    return <LoadingSpinner label="VALIDATING CREDENTIALS…" />;
  }

  return (
    <div className="flex flex-col gap-20">
      {/* ─── Header Section ───────────────────────────────────── */}
      <div className="flex flex-col gap-4 max-w-2xl">
         <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-500/10 rounded-lg text-amber-500 border border-amber-500/20">
               <Shield size={16} />
            </div>
            <span className="text-[10px] font-mono tracking-[0.4em] text-white/30 uppercase">Credential_Ledger</span>
         </div>
         <h2 className="text-5xl font-bold text-white tracking-tighter font-serif uppercase">Verified Keys</h2>
         <p className="text-sm text-white/40 leading-relaxed italic">
           A cryptographic record of verified credentials in architectural design, systems engineering, and data security.
         </p>
      </div>

      {/* ─── Modernized Token Grid ───────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {certifications.map((c, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.05 }}
            className="group relative h-[220px] bg-white/[0.015] border border-white/5 rounded-[2rem] p-8 flex flex-col items-center text-center justify-between hover:bg-white/[0.03] hover:border-amber-500/20 transition-all duration-700"
          >
            {/* Top Security Status */}
            <div className="absolute top-4 left-0 right-0 px-6 flex justify-between items-center opacity-20 group-hover:opacity-100 transition-opacity">
               <Fingerprint size={10} className="text-amber-500" />
               <span className="text-[7px] font-mono tracking-[0.2em] text-white uppercase italic">Sig_Verified.088</span>
            </div>

            {/* Issuer Badge */}
            <div className="relative mt-2">
               <div className="absolute inset-0 bg-white/20 blur-[20px] rounded-full opacity-0 group-hover:opacity-40 transition-opacity" />
               <div className="w-16 h-16 bg-white rounded-2xl p-3 border border-white/10 shadow-xl group-hover:scale-110 transition-transform duration-700 relative z-10 flex items-center justify-center">
                 <img 
                    src={c.icon} 
                    alt={c.issuer} 
                    className="max-w-full max-h-full object-contain grayscale-0" 
                 />
               </div>
            </div>

            {/* Text Segment */}
            <div className="space-y-1">
               <h3 className="text-[12px] font-bold text-white uppercase tracking-wider leading-tight px-4 font-serif">
                 {c.title}
               </h3>
               <p className="text-[9px] font-mono text-white/30 uppercase tracking-[0.2em]">{c.issuer}</p>
            </div>

            {/* Verification Footer */}
            <div className="flex items-center gap-2 pt-2 opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">
               <CheckCircle size={10} className="text-emerald-500" />
               <span className="text-[8px] font-mono text-emerald-500 uppercase tracking-widest">Valid_Deployment_{c.date.split(' ')[1]}</span>
            </div>
            
            {/* Corner Decorative Notch */}
            <div className="absolute bottom-4 left-4 w-2 h-2 border-l border-b border-white/5 group-hover:border-amber-500/40 transition-colors" />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
