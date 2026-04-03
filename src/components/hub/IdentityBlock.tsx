import { motion } from 'framer-motion';

export function IdentityBlock() {
  return (
    <section className="flex flex-col items-center lg:items-start text-center lg:text-left gap-6 h-full py-8 lg:py-0">
      {/* Developer Photo */}
      <div className="relative group">
        <div className="absolute -inset-1 bg-accent/20 rounded-lg blur-md group-hover:bg-accent/30 transition-all duration-slow" />
        <img 
          src="/profile.png" 
          alt="Aditya Chavan"
          width={180}
          height={180}
          className="relative w-[clamp(120px,15vw,180px)] h-[clamp(120px,15vw,180px)] object-cover rounded-lg aspect-square bg-bg-elevated border border-border-default shadow-xl"
        />
      </div>

      {/* Identity Info */}
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl md:text-4xl font-display font-extrabold text-text-primary tracking-tight">
          Aditya Chavan
        </h2>
        <p className="text-lg font-body font-medium text-text-secondary">
          Senior UI/UX Architect
        </p>
        <p className="max-w-[200px] text-sm font-body text-text-muted italic leading-relaxed">
          Spearheading the future of digital interaction through spatial design.
        </p>
      </div>

      {/* Hub CTA */}
      <div className="mt-auto pt-8">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => window.location.href = '/coming-soon'}
          className="px-6 py-2.5 bg-bg-elevated border border-accent/30 text-accent font-body font-bold text-xs tracking-widest uppercase rounded-sm hover:border-accent hover:shadow-[0_0_15px_rgba(212,165,116,0.2)] transition-all duration-base"
        >
          Immersive Journey
        </motion.button>
      </div>
    </section>
  );
}
