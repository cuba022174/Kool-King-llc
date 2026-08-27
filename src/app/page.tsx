import AboutSection from "@/components/sections/AboutSection";
import ContactSection from "@/components/sections/ContactSection";
import CoreFeatures from "@/components/sections/CoreFeatures";
import HeroSection from "@/components/sections/HeroSection";
import ProblemSection from "@/components/sections/ProblemSection";
import ServicesSection from "@/components/sections/ServicesSection";
import TelemetryBar from "@/components/sections/TelemetryBar";

export default function Home() {
  return (
    <>
      <HeroSection />
      <ProblemSection />
      <TelemetryBar />
      <CoreFeatures />
      <ServicesSection />
      <AboutSection />
      <ContactSection />
    </>
  );
}
