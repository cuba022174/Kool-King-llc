import { Hero3DScene } from "@/components/3d/Hero3DScene";
import { ScanLine } from "@/components/motion/ScanLine";
import { HeroContent } from "@/components/sections/HeroContent";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Problem } from "@/components/sections/Problem";
import { BuiltDifferent } from "@/components/sections/BuiltDifferent";
import { PricingTeaser } from "@/components/sections/PricingTeaser";
import { PatternEngine } from "@/components/sections/PatternEngine";
import { FounderStory } from "@/components/sections/FounderStory";
import { WaitlistForm } from "@/components/sections/WaitlistForm";

export default function Home() {
  return (
    <>
      <section className="relative overflow-hidden pb-10 pt-6 sm:pt-10">
        {/* The 3D badge renders the Kool King LLC wordmark itself - this
            heading exists for SEO/accessibility, not sighted display. */}
        <h1 className="sr-only">Kool King LLC - The King of Keeping It Kool</h1>

        <div className="relative h-[42vh] min-h-[300px] sm:h-[48vh] sm:min-h-[380px]">
          <Hero3DScene />
          <ScanLine />
        </div>

        <HeroContent />
      </section>

      <HowItWorks />
      <Problem />
      <BuiltDifferent />
      <PricingTeaser />
      <PatternEngine />
      <FounderStory />
      <WaitlistForm />
    </>
  );
}
