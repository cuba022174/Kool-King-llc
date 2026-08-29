import { Hero3DScene } from "@/components/3d/Hero3DScene";

export default function Home() {
  return (
    <section className="relative flex min-h-[calc(100vh-5rem)] flex-col overflow-hidden px-6">
      <div className="absolute inset-0">
        <Hero3DScene />
      </div>
      {/* The 3D badge renders the Kool King LLC wordmark itself - this
          heading exists for SEO/accessibility, not sighted display. */}
      <h1 className="sr-only">Kool King LLC - The King of Keeping It Kool</h1>
      <div className="pointer-events-none relative z-10 mt-auto pb-16 text-center">
        <p className="mx-auto max-w-xl text-balance text-cryo-cyan">
          The King of Keeping It Kool — refrigeration specialists.
        </p>
      </div>
    </section>
  );
}
