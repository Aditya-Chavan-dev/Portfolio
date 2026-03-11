import { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useVisitorCount, useStatus } from "../../hooks/useFirebase";
import { useGitHub } from "../../hooks/useGitHub";
import { PERSONAL } from "../../lib/constants";

export const Hub = () => {
  const navigate = useNavigate();
  const bgRef = useRef<HTMLDivElement>(null);
  const visitorCount = useVisitorCount();
  const status = useStatus();
  const github = useGitHub();

  // Mouse-reactive ambient gradient
  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      if (!bgRef.current) return;
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      bgRef.current.style.background =
        `radial-gradient(ellipse at ${x}% ${y}%, #1a1628 0%, #080808 60%)`;
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  return (
    <div ref={bgRef} className="min-h-screen w-full flex flex-col items-center justify-center relative transition-none px-6"
      style={{ background: "radial-gradient(ellipse at 50% 50%, #1a1628 0%, #080808 60%)" }}>

      {/* Status pill */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
        className="absolute top-8 right-8 flex items-center gap-2 border border-[#1f1f1f] rounded-full px-4 py-2 text-xs text-[#6b6b6b]">
        <span className={`w-2 h-2 rounded-full ${status === "available" ? "bg-green-400 animate-pulse" : "bg-yellow-400"}`} />
        {status === "available" ? "Open to opportunities" : "Currently busy"}
      </motion.div>

      {/* Name + role */}
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.8 }}
        className="text-center mb-16">
        <h1 className="text-6xl md:text-8xl font-display text-[#f0f0f0] mb-4 tracking-tight"
          style={{ fontFamily: "var(--font-display)" }}>
          {PERSONAL.name}
        </h1>
        <p className="text-[#6e8efb] text-lg tracking-widest uppercase">Full-Stack Developer</p>
      </motion.div>

      {/* Two path cards */}
      <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.8 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl mb-16">

        {/* Journey */}
        <motion.button whileHover={{ scale: 1.03, borderColor: "#c9a96e" }} whileTap={{ scale: 0.98 }}
          onClick={() => navigate("/journey")}
          className="group border border-[#1f1f1f] rounded-2xl p-8 text-left transition-all hover:bg-[#111111]">
          <div className="text-[#c9a96e] text-3xl mb-4">⟶</div>
          <h2 className="text-2xl font-display text-[#f0f0f0] mb-2" style={{ fontFamily: "var(--font-display)" }}>
            The Journey
          </h2>
          <p className="text-[#6b6b6b] text-sm leading-relaxed">
            Immersive, cinematic. Take your time. Get to know who I am, what I build, and why it matters.
          </p>
          <div className="mt-6 text-xs text-[#4a4a6a] group-hover:text-[#c9a96e] transition-colors">
            ~4 min experience →
          </div>
        </motion.button>

        {/* Quick Access */}
        <motion.button whileHover={{ scale: 1.03, borderColor: "#6e8efb" }} whileTap={{ scale: 0.98 }}
          onClick={() => navigate("/quick")}
          className="group border border-[#1f1f1f] rounded-2xl p-8 text-left transition-all hover:bg-[#111111]">
          <div className="text-[#6e8efb] text-3xl mb-4">⊞</div>
          <h2 className="text-2xl font-display text-[#f0f0f0] mb-2" style={{ fontFamily: "var(--font-display)" }}>
            Quick Access
          </h2>
          <p className="text-[#6b6b6b] text-sm leading-relaxed">
            In a hurry? Jump directly to Projects, Skills, Experience, or grab my resume.
          </p>
          <div className="mt-6 text-xs text-[#4a4a6a] group-hover:text-[#6e8efb] transition-colors">
            Skip to what matters →
          </div>
        </motion.button>
      </motion.div>

      {/* Bottom live bar */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
        className="absolute bottom-8 left-0 right-0 flex items-center justify-center gap-8 text-xs text-[#6b6b6b]">
        <span>{visitorCount ? `${visitorCount} visitors` : "—"}</span>
        <span className="w-px h-3 bg-[#1f1f1f]" />
        <span>{github.publicRepos ? `${github.publicRepos} public repos` : "—"}</span>
        <span className="w-px h-3 bg-[#1f1f1f]" />
        <span>{new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", timeZone: "Asia/Kolkata" })} IST</span>
      </motion.div>
    </div>
  );
};
