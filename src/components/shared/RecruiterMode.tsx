import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PERSONAL } from "../../lib/constants";

export const RecruiterMode = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <motion.button
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2 }}
        onClick={() => setOpen(true)}
        className="fixed bottom-6 left-6 z-50 text-xs border border-[#1f1f1f] bg-[#111111] text-[#6b6b6b] px-4 py-2 rounded-full hover:border-[#c9a96e] hover:text-[#c9a96e] transition-all">
        👔 I'm a Recruiter
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center px-6"
            onClick={() => setOpen(false)}>
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#111111] border border-[#1f1f1f] rounded-2xl p-8 max-w-md w-full">
              <h2 className="text-2xl font-display text-[#f0f0f0] mb-1" style={{ fontFamily: "var(--font-display)" }}>
                TL;DR
              </h2>
              <p className="text-[#6b6b6b] text-sm mb-6">Everything you need in 30 seconds.</p>
              <ul className="space-y-3 text-sm text-[#f0f0f0] mb-8">
                <li>⚡ Full-Stack Developer — React, Node.js, Firebase</li>
                <li>🏗️ Built ATLAS — crown jewel project</li>
                <li>📍 Pune, India — open to remote & relocation</li>
                <li>🎓 Computer Engineering student</li>
                <li>✅ Available for opportunities</li>
              </ul>
              <div className="flex gap-3">
                <a href={PERSONAL.resumeUrl} download
                  className="flex-1 text-center text-sm bg-[#c9a96e] text-[#080808] py-3 rounded-xl font-medium hover:opacity-90 transition-opacity">
                  Download Resume
                </a>
                <a href={`mailto:${PERSONAL.email}`}
                  className="flex-1 text-center text-sm border border-[#1f1f1f] text-[#f0f0f0] py-3 rounded-xl hover:border-[#6e8efb] transition-colors">
                  Email Me
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
