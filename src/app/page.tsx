import CoreFeatures from "@/components/sections/CoreFeatures";
import HeroSection from "@/components/sections/HeroSection";
import ProblemSection from "@/components/sections/ProblemSection";
import TelemetryBar from "@/components/sections/TelemetryBar";

export default function Home() {
  return (
    <>
      <HeroSection />
      <ProblemSection />
      <TelemetryBar />
      <CoreFeatures />
    </>
  );
}
