import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import MobileDrawer from "@/components/layout/MobileDrawer";
import LeadModal from "@/components/sections/LeadModal";
import MatrixRain from "@/components/effects/MatrixRain";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "KoolKing IQ | Kool King LLC",
  description:
    "KoolKing IQ is the private access platform for Kool King LLC's smart refrigeration and field service technology.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`dark scroll-smooth ${outfit.variable} ${inter.variable}`}
    >
      <body className="bg-obsidian font-sans text-chrome antialiased">
        {/* Global code-rain backdrop, fixed behind every section. Its
            own z-0 stacking is unambiguous only because the real
            content below is wrapped in its own stacking context. */}
        <MatrixRain />

        <div className="relative z-10">
          <Navbar />
          <MobileDrawer />
          <LeadModal />
          {/* No top padding here: HeroSection handles its own navbar
              clearance so its 3D canvas can bleed full-height behind the
              translucent fixed navbar. */}
          <main>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
