import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { INTRO_LINES } from "../../lib/constants";

export const Intro = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (sessionStorage.getItem("intro_seen")) { navigate("/hub"); return; }
    const timer = setTimeout(() => {
      sessionStorage.setItem("intro_seen", "true");
      navigate("/hub");
    }, INTRO_LINES.length * 1800 + 2000);
    return () => clearTimeout(timer);
  }, [navigate]);

  const skip = () => {
    sessionStorage.setItem("intro_seen", "true");
    navigate("/hub");
  };

  return (
    <div className="fixed inset-0 bg-[#080808] flex flex-col items-center justify-center z-50">
      <div className="flex flex-col gap-6 text-center px-6">
        {INTRO_LINES.map((line, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 1.8, duration: 0.9, ease: "easeOut" }}
            className="text-2xl md:text-4xl font-display text-[#f0f0f0] tracking-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {i === INTRO_LINES.length - 1
              ? <span className="text-[#c9a96e]">{line}</span>
              : line}
          </motion.p>
        ))}
      </div>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        onClick={skip}
        className="absolute bottom-10 right-10 text-[#6b6b6b] text-sm border border-[#1f1f1f] px-4 py-2 rounded-full hover:text-[#f0f0f0] hover:border-[#c9a96e] transition-all"
      >
        skip →
      </motion.button>
    </div>
  );
};
