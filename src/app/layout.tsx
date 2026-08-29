import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { MobileDrawer } from "@/components/layout/MobileDrawer";
import { Footer } from "@/components/layout/Footer";
import { MatrixRain } from "@/components/effects/MatrixRain";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kool King LLC",
  description: "Kool King LLC",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-obsidian font-sans text-liquid-chrome">
        <MatrixRain />
        <Navbar />
        <MobileDrawer />
        <main className="flex-1 pt-20">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
