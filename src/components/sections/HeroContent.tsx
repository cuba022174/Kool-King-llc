export function HeroContent() {
  return (
    <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center px-6 text-center">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-liquid-chrome/50">
        Scanning unit history
        <span className="animate-pulse text-cryo-cyan">_</span>
      </p>

      <span className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-liquid-chrome/80">
        <span className="h-2 w-2 animate-pulse rounded-full bg-cryo-cyan" />
        Diagnostic Engine — Status: Learning
      </span>

      <h1 className="mt-6 font-heading text-3xl font-extrabold uppercase leading-tight tracking-tight sm:text-5xl lg:text-6xl">
        <span className="bg-gradient-to-b from-white to-liquid-chrome bg-clip-text text-transparent">
          Software that remembers what{" "}
        </span>
        <span className="text-cryo-cyan">the job</span>
        <span className="bg-gradient-to-b from-white to-liquid-chrome bg-clip-text text-transparent">
          {" "}
          taught you.
        </span>
      </h1>
    </div>
  );
}
