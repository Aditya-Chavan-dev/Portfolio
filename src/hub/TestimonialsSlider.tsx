import React, { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { PublicTestimonial } from '@/common/types/testimonial.types';

interface TestimonialsSliderProps {
  testimonials: PublicTestimonial[];
  showArrows?: boolean;
  className?: string;
}

export const TestimonialsSlider: React.FC<TestimonialsSliderProps> = ({
  testimonials,
  showArrows = true,
  className = "",
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const handleNext = useCallback(() => {
    if (!testimonials || testimonials.length === 0) return;
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  }, [testimonials]);

  const handlePrev = useCallback(() => {
    if (!testimonials || testimonials.length === 0) return;
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, [testimonials]);

  useEffect(() => {
    if (!testimonials || testimonials.length <= 1) return;
    const timer = setInterval(() => {
      handleNext();
    }, 5000);
    return () => clearInterval(timer);
  }, [handleNext, testimonials.length]);

  if (!testimonials || testimonials.length === 0) return null;

  const current = testimonials[currentIndex];

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 50 : -50,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 50 : -50,
      opacity: 0,
    }),
  };

  return (
    <div className={`relative flex flex-col items-center gap-4 ${className}`}>
      <div className="relative flex items-center justify-center w-full min-h-[140px]">
        {/* Navigation Arrows (Desktop) */}
        {showArrows && testimonials.length > 1 && (
          <>
            <motion.button
              whileHover={{ scale: 1.1, backgroundColor: "rgba(255, 255, 255, 0.1)" }}
              whileTap={{ scale: 0.9 }}
              onClick={handlePrev}
              aria-label="Previous testimonial"
              className="absolute left-[-60px] z-10 p-3 rounded-full border border-white/10 bg-white/[0.03] text-accent-gold transition-colors hidden md:flex focus-visible:ring-2 focus-visible:ring-accent-gold outline-none"
            >
              <ChevronLeft className="w-6 h-6" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1, backgroundColor: "rgba(255, 255, 255, 0.1)" }}
              whileTap={{ scale: 0.9 }}
              onClick={handleNext}
              aria-label="Next testimonial"
              className="absolute right-[-60px] z-10 p-3 rounded-full border border-white/10 bg-white/[0.03] text-accent-gold transition-colors hidden md:flex focus-visible:ring-2 focus-visible:ring-accent-gold outline-none"
            >
              <ChevronRight className="w-6 h-6" />
            </motion.button>
          </>
        )}

        {/* Content Card Container */}
        <div className="w-full max-w-2xl min-h-[140px] relative">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
              className="w-full glass-surface rounded-[24px] p-6 md:p-8 border border-accent-gold/10 flex flex-col items-center text-center gap-6"
            >
              {current.photo && (
                <div className="w-12 h-12 rounded-xl overflow-hidden border border-accent-gold/20 mb-[-12px]">
                   <img src={current.photo} className="w-full h-full object-cover" alt={current.name} />
                </div>
              )}
              <p className="text-base md:text-xl font-syne italic font-medium leading-relaxed text-text-secondary px-4">
                "{current.text}"
              </p>
              
              <div className="flex flex-col items-center gap-1">
                <span className="text-xs md:text-sm font-bold tracking-[0.2em] text-accent-gold uppercase font-mono">
                   {current.name}
                </span>
                <span className="text-[10px] font-bold tracking-[0.1em] text-accent-gold-header/40 uppercase font-mono">
                  {current.relationship} {current.company ? `@ ${current.company}` : ''}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Pagination Dots */}
      {testimonials.length > 1 && (
        <div className="flex items-center gap-3 mt-2">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setDirection(idx > currentIndex ? 1 : -1);
                setCurrentIndex(idx);
              }}
              aria-label={`Go to testimonial ${idx + 1}`}
              aria-current={idx === currentIndex ? "true" : "false"}
              className={`transition-all duration-300 rounded-full focus-visible:ring-2 focus-visible:ring-accent-gold outline-none ${
                idx === currentIndex 
                  ? "w-8 h-1 bg-accent-gold" 
                  : "w-1.5 h-1.5 bg-white/20 hover:bg-white/40"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};
