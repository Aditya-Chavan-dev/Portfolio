import { motion } from 'framer-motion';

const projects = [
  {
    title: "AI Spatial Dashboard",
    desc: "A futuristic command center for managing multi-modal AI agents with zero-paint budget glassmorphism.",
    tags: ["React 19", "Framer Motion", "Tailwind 4"],
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=2832&auto=format&fit=crop"
  },
  {
    title: "Cyberpunk Terminal",
    desc: "Interactive CLI-based portfolio experience for low-latency developer networking.",
    tags: ["TypeScript", "Vite", "Canvas"],
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2670&auto=format&fit=crop"
  },
  {
    title: "Web3 Identity Hub",
    desc: "Decentralized identity management with biometric fallback and zero-knowledge proofs.",
    tags: ["Solidity", "Next.js", "GraphQL"],
    image: "https://images.unsplash.com/photo-1644088379091-d574269d422f?q=80&w=2593&auto=format&fit=crop"
  }
];

export function Projects() {
  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-2">
        <h2 className="text-4xl font-display font-bold text-text-primary tracking-tight">Featured Projects</h2>
        <p className="text-text-muted font-body">Selected work focusing on high-performance interactive design.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((p, i) => (
          <motion.article
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="group relative flex flex-col gap-4 p-4 bg-bg-surface border border-border-default rounded-xl hover:border-accent/30 transition-all duration-base shadow-sm"
          >
            {/* Image Area */}
            <div className="aspect-[16/9] overflow-hidden rounded-lg bg-bg-elevated relative">
              <motion.img 
                src={p.image} 
                alt={p.title}
                className="w-full h-full object-cover transition-transform duration-slow group-hover:scale-105"
                width={1280}
                height={720}
              />
              <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/10 transition-colors duration-base" />
            </div>

            {/* Content */}
            <div className="flex flex-col gap-3">
              <h3 className="text-2xl font-display font-bold text-text-primary group-hover:text-accent transition-colors">
                {p.title}
              </h3>
              <p className="text-sm font-body text-text-muted leading-relaxed">
                {p.desc}
              </p>
              <div className="flex flex-wrap gap-2 mt-2">
                {p.tags.map(tag => (
                  <span key={tag} className="px-3 py-1 bg-bg-elevated text-text-secondary text-[10px] font-bold uppercase tracking-wider rounded-full border border-border-default">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  );
}
