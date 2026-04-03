import { motion } from 'framer-motion'
import { IdentityCard } from '@/components/hub/IdentityCard'
import { QuickAccessGrid } from '@/components/hub/QuickAccessGrid'
import { TestimonialsPanel } from '@/components/hub/TestimonialsPanel'

export const Hub = () => {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      className="relative h-[100dvh] w-full bg-bg-base overflow-hidden flex"
    >
      {/* COLUMN 1: IDENTITY (22%) */}
      <section className="w-[22%] h-full border-r border-border min-w-[320px] overflow-y-auto scrollbar-hide">
        <IdentityCard />
      </section>

      {/* COLUMN 2: QUICK ACCESS GRID (50%) */}
      <section className="w-[50%] h-full border-r border-border overflow-y-auto scrollbar-hide">
        <QuickAccessGrid />
      </section>

      {/* COLUMN 3: TESTIMONIALS (28%) */}
      <section className="w-[28%] h-full min-w-[380px] overflow-y-auto scrollbar-hide">
        <TestimonialsPanel />
      </section>
    </motion.main>
  )
}
