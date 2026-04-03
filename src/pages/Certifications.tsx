import { motion } from 'framer-motion';

const certs = [
  { title: "AWS Solutions Architect", issuer: "Amazon Web Services", date: "2023", icon: "https://upload.wikimedia.org/wikipedia/commons/5/5c/Amazon_Web_Services_Logo.svg" },
  { title: "Meta Senior UI Engineer", issuer: "Meta / Coursera", date: "2022", icon: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg" },
  { title: "Professional Google Cloud Dev", issuer: "Google Cloud", date: "2022", icon: "https://upload.wikimedia.org/wikipedia/commons/5/51/Google_Cloud_logo.svg" },
  { title: "React Performance Expert", issuer: "Frontend Masters", date: "2021", icon: "https://frontendmasters.com/favicon-32x32.png" },
  { title: "UX Design Specialization", issuer: "Google", date: "2020", icon: "https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" }
];

export function Certifications() {
  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-2">
        <h2 className="text-4xl font-display font-bold text-text-primary tracking-tight">Certifications & Badges</h2>
        <p className="text-text-muted font-body">Verified credentials in cloud architecture and specialized UI/UX design.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {certs.map((c, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className="flex flex-col items-center text-center p-6 bg-bg-surface border border-border-default rounded-xl hover:border-accent/40 hover:bg-bg-elevated transition-all duration-base group"
          >
            <div className="w-16 h-16 mb-4 flex items-center justify-center p-3 bg-white rounded-lg border border-border-default group-hover:scale-110 transition-transform">
              <img src={c.icon} alt={c.issuer} className="max-w-full max-h-full object-contain grayscale group-hover:grayscale-0 transition-all" />
            </div>
            <h3 className="text-sm font-display font-bold text-text-primary leading-tight h-10 flex items-center">
              {c.title}
            </h3>
            <span className="mt-2 text-[10px] font-body font-bold text-text-muted uppercase tracking-widest">
              {c.issuer}
            </span>
            <span className="mt-1 text-[9px] font-body text-accent opacity-60">
              Issued {c.date}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
