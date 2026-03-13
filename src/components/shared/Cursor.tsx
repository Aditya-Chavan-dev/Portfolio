import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export const Cursor = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 300, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 300, damping: 30 });
  const isHovering = useRef(false);

  useEffect(() => {
    const move = (e: MouseEvent) => { mouseX.set(e.clientX); mouseY.set(e.clientY); };
    const onEnter = () => { isHovering.current = true; };
    const onLeave = () => { isHovering.current = false; };

    window.addEventListener("mousemove", move);
    const elements = document.querySelectorAll("a, button, [data-cursor]");
    elements.forEach((el) => { 
      el.addEventListener("mouseenter", onEnter); 
      el.addEventListener("mouseleave", onLeave); 
    });

    return () => {
      window.removeEventListener("mousemove", move);
      elements.forEach((el) => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      });
    };
  }, [mouseX, mouseY]);

  return (
    <motion.div
      style={{ x: springX, y: springY }}
      className="fixed top-0 left-0 w-4 h-4 rounded-full pointer-events-none z-[9999] mix-blend-difference bg-[#f0f0f0] -translate-x-1/2 -translate-y-1/2"
    />
  );
};
