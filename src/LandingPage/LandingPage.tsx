import { motion } from "framer-motion";
import content from "./content.json";

export default function LandingPage() {
  return (
    <section className="min-h-screen w-full flex flex-col justify-center px-8 md:px-24 bg-obsidian text-white">
      
      {/* Intro block mapping to config JSON */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h1 className="text-5xl md:text-7xl font-heading text-gold Glow tracking-tight">
          {content.name}
        </h1>
        <h2 className="mt-4 text-2xl md:text-3xl text-gray-400 tracking-widest font-body uppercase">
          {content.role}
        </h2>
      </motion.div>

      {/* The Punchy Flex / Dialogue logic with whitespace-pre-wrap to respect newlines and spaces exactly as configured in CMS */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 1.2 }}
        className="mt-12 md:mt-16"
      >
        <p className="text-xl md:text-2xl text-gray-300 leading-relaxed max-w-3xl whitespace-pre-wrap font-serif">
          {content.dialogue}
        </p>
      </motion.div>

      {/* Standard Action Area */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="mt-16 flex gap-6"
      >
        <button className="px-8 py-3 bg-gold text-obsidian font-bold rounded hover:bg-gold-muted transition-colors cursor-pointer">
          {content.ctaPrimary}
        </button>
        <button className="px-8 py-3 border border-gold text-gold font-bold rounded hover:bg-gold/10 transition-colors cursor-pointer">
          {content.ctaSecondary}
        </button>
      </motion.div>

    </section>
  );
}
