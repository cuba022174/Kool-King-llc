import CoreFeatures from "@/components/sections/CoreFeatures";
import HeroSection from "@/components/sections/HeroSection";
import TelemetryBar from "@/components/sections/TelemetryBar";

export default function Home() {
  return (
    <>
      <HeroSection />
      <TelemetryBar />
      <CoreFeatures />
    </>
  );
}
