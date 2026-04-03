import { motion } from 'framer-motion';
import { Layout, Server, Terminal, Shield } from 'lucide-react';

const stack = [
  {
    category: "Visual Architecture",
    icon: Layout,
    tools: ["React 19", "Vite 7", "Framer Motion", "Tailwind CSS", "Canvas API"]
  },
  {
    category: "Core Engineering",
    icon: Terminal,
    tools: ["TypeScript", "Rust (WASM)", "Node.js", "Zod", "Go"]
  },
  {
    category: "System State",
    icon: Server,
    tools: ["Firebase", "Zustand", "Redis", "PostgreSQL", "Tantstack Query"]
  },
  {
    category: "Ops & Scale",
    icon: Shield,
    tools: ["Docker", "Vercel Edge", "GitOps", "Cloudflare", "Lighthouse"]
  }
];

export function TechStack() {
  return (
    <div className="flex flex-col gap-12">
      <div className="flex flex-col gap-2">
        <h2 className="text-4xl font-display font-bold text-text-primary tracking-tight">Technology Stack</h2>
        <p className="text-text-muted font-body">My current battle-tested arsenal for high-velocity development.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {stack.map((group, i) => (
          <motion.section
            key={i}
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className="flex flex-col gap-6 p-8 bg-bg-surface border border-border-default rounded-2xl group hover:border-accent/20 transition-all shadow-sm"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-bg-elevated rounded-xl text-accent border border-border-default group-hover:shadow-[0_0_15px_rgba(212,165,116,0.15)] transition-all">
                <group.icon size={28} strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-display font-bold text-text-primary uppercase tracking-tight">
                {group.category}
              </h3>
            </div>

            <div className="flex flex-wrap gap-3">
              {group.tools.map(tool => (
                <div 
                  key={tool} 
                  className="px-4 py-2 bg-bg-elevated border border-border-default rounded-lg font-body font-medium text-sm text-text-secondary hover:text-text-primary hover:border-accent/30 transition-all"
                >
                  {tool}
                </div>
              ))}
            </div>
          </motion.section>
        ))}
      </div>
    </div>
  );
}
