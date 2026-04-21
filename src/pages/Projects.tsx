import { motion } from 'framer-motion';
import { Github, ExternalLink } from 'lucide-react';
import { useProjects } from '@/common/hooks/useProjects';

export function Projects() {
  const { featuredProjects, loading } = useProjects();

  if (loading && featuredProjects.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 opacity-40">
        <div className="w-6 h-6 border-2 border-accent border-t-transparent rounded-full animate-spin mb-4" />
        <span className="font-hud text-[10px] tracking-widest uppercase">Initializing Portfolio…</span>
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-2">
        <h2 className="text-4xl font-display font-bold text-text-primary tracking-tight">Featured Projects</h2>
        <p className="text-text-muted font-body">Selected work focusing on high-performance interactive design.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {featuredProjects.map((p, i) => (
          <motion.article
            key={p.id || i}
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
                {p.description}
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
      {/* Archive Section */}
      {archivedProjects.length > 0 && (
        <div className="flex flex-col gap-8 mt-12 pt-12 border-t border-border-default/50">
          <div className="flex flex-col gap-2">
            <h3 className="text-xl font-display font-bold text-text-primary tracking-wide uppercase opacity-60">System Archive</h3>
            <p className="text-sm text-text-muted font-body italic">Legacy deployments and research prototypes.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {archivedProjects.map((p, i) => (
              <motion.div
                key={p.id || i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="p-4 bg-bg-surface/50 border border-border-default rounded-lg flex flex-col gap-2 group hover:border-accent/20 transition-all shadow-sm"
              >
                <h4 className="text-md font-bold text-text-primary group-hover:text-accent transition-colors">{p.title}</h4>
                <p className="text-[11px] text-text-muted leading-relaxed line-clamp-2">{p.description}</p>
                <div className="flex gap-2 mt-2">
                  {p.repoUrl && <a href={p.repoUrl} target="_blank" className="text-text-muted hover:text-accent transition-colors"><Github size={12} /></a>}
                  {p.liveUrl && <a href={p.liveUrl} target="_blank" className="text-text-muted hover:text-accent transition-colors"><ExternalLink size={12} /></a>}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
