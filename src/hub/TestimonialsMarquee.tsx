import React, { useState } from "react";
import { motion } from "framer-motion";
import { testimonials } from "../data/testimonials";

interface TestimonialsMarqueeProps {
  direction?: "vertical" | "horizontal";
  className?: string;
}

export const TestimonialsMarquee: React.FC<TestimonialsMarqueeProps> = ({
  direction = "vertical",
  className = "",
}) => {
  const [isPaused, setIsPaused] = useState(false);
  const displayItems = [...testimonials, ...testimonials, ...testimonials];

  return (
    <div 
      className={`relative overflow-hidden ${className} ${
        direction === "vertical" ? "h-full" : "w-full"
      }`}
      style={{ maskImage: direction === "vertical" 
        ? "linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)"
        : "linear-gradient(to right, transparent, black 10%, black 90%, transparent)"
      }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
    >
      <motion.div
        className={`flex ${direction === "vertical" ? "flex-col" : "flex-row"} gap-4 pb-4`}
        animate={{
          y: direction === "vertical" ? [0, -33.33 * testimonials.length + "%"] : 0,
          x: direction === "horizontal" ? [0, -33.33 * testimonials.length + "%"] : 0,
        }}
        transition={{
          duration: testimonials.length * 20,
          ease: "linear",
          repeat: Infinity,
        }}
        style={{
          animationPlayState: isPaused ? "paused" : "running"
        }}
      >
        {displayItems.map((item, index) => (
          <div
            key={`${item.id}-${index}`}
            className={`flex-shrink-0 p-5 rounded-2xl border border-white/5 bg-white/[0.01] backdrop-blur-md ${
              direction === "vertical" ? "w-full" : "min-w-[300px] max-w-[300px]"
            }`}
          >
            <div className="flex items-center gap-3.5 mb-4">
              <div className="w-10 h-10 rounded-full overflow-hidden border border-accent/20 flex-none bg-accent/5">
                <img 
                  src={`https://i.pravatar.cc/100?u=${item.id}`} 
                  alt={item.name}
                  className="w-full h-full object-cover grayscale brightness-125 transition-all group-hover:grayscale-0"
                />
              </div>
              <div className="min-w-0">
                <h4 className="text-accent text-[10px] font-black tracking-widest uppercase truncate">
                  {item.name}
                </h4>
                <p className="text-[8px] text-accent/40 font-bold tracking-[0.25em] uppercase truncate">
                  {item.role}
                </p>
              </div>
            </div>
            <p className="text-[13px] text-[#F8FAFC]/80 leading-relaxed font-medium italic">
              "{item.text}"
            </p>
          </div>
        ))}
      </motion.div>
    </div>
  );
};
