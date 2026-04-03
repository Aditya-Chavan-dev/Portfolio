export function About() {
  return (
    <div className="flex flex-col gap-12 lg:gap-20">
      {/* Intro Section */}
      <section className="flex flex-col lg:flex-row gap-12 items-start">
        <div className="flex-1 flex flex-col gap-8">
          <h2 className="text-5xl font-display font-extrabold text-text-primary tracking-tighter leading-none">
            Architecting the <br />
            <span className="text-accent underline decoration-accent/20 underline-offset-8">Invisible.</span>
          </h2>
          
          <div className="flex flex-col gap-6 text-lg font-body text-text-secondary leading-relaxed max-w-[60ch]">
            <p>
              I am a digital architect based at the intersection of aesthetic intent and engineering rigor. With over a decade of experience, I specialize in building interfaces that feel alive, fluid, and spatially aware.
            </p>
            <p>
              My philosophy is simple: complexity should be handled by the machine, so the user experiences only simplicity. I optimize for the "Aha!" moment—that split second where a user realizes they are interacting with something truly premium.
            </p>
          </div>
        </div>

        <div className="w-full lg:w-80 flex flex-col gap-6">
          <div className="p-8 bg-bg-surface border border-accent/20 rounded-2xl flex flex-col gap-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-accent/5 blur-3xl -mr-12 -mt-12 group-hover:bg-accent/10 transition-all" />
            
            <div className="flex flex-col gap-1">
              <span className="text-3xl font-display font-bold text-accent tracking-tight">10+</span>
              <span className="text-xs font-body font-bold text-text-muted uppercase tracking-widest">Years Experience</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-3xl font-display font-bold text-accent tracking-tight">150+</span>
              <span className="text-xs font-body font-bold text-text-muted uppercase tracking-widest">Projects Shipped</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-3xl font-display font-bold text-accent tracking-tight">24k+</span>
              <span className="text-xs font-body font-bold text-text-muted uppercase tracking-widest">Commits Made</span>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy / Facts */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="flex flex-col gap-4">
          <h3 className="text-xl font-display font-bold text-text-primary tracking-wide">Design Philosophy</h3>
          <p className="font-body text-text-muted leading-relaxed">
            I believe in the "Nyquist Validation" of UI—testing every interaction at its threshold to ensure zero friction. My layouts are built on spatial grids, ensuring mathematical harmony across any viewport.
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <h3 className="text-xl font-display font-bold text-text-primary tracking-wide">Outside the IDE</h3>
          <p className="font-body text-text-muted leading-relaxed">
            When I'm not architecting systems, I'm likely exploring automotive design, studying mid-century modern furniture, or experimenting with generative art in GLSL.
          </p>
        </div>
      </section>
    </div>
  );
}
