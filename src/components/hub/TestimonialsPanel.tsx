import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { testimonials, type Testimonial } from '@/data/testimonials'

export const TestimonialsPanel = () => {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="flex flex-col h-full p-8 pt-10">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-20">
        <span className="font-body text-[10px] uppercase tracking-[0.2em] text-text-faint leading-relaxed">
          Testimonials
        </span>
        <div className="relative">
          <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          <div className="absolute inset-0 w-1.5 h-1.5 rounded-full bg-accent animate-ping opacity-40" />
        </div>
      </div>

      {/* CONTENT */}
      <div className="flex-grow flex items-center">
        <div className="relative w-full overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="flex flex-col"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="w-11 h-11 rounded-full overflow-hidden border border-border-dim shadow-xl">
                  <img src={testimonials[currentIndex].avatar} alt="" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="font-body text-[13px] font-semibold text-text-primary leading-tight">
                    {testimonials[currentIndex].name}
                  </h4>
                  <p className="font-body text-[10px] uppercase tracking-[0.14em] text-accent mt-0.5">
                    {testimonials[currentIndex].role}
                  </p>
                </div>
              </div>

              <p className="font-display italic text-[17px] text-text-muted leading-[1.6]">
                "{testimonials[currentIndex].text}"
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="mt-auto flex gap-2">
        {testimonials.map((_: Testimonial, index: number) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
              index === currentIndex ? 'bg-accent w-4' : 'bg-text-faint'
            }`}
          />
        ))}
      </div>
    </div>
  )
}
