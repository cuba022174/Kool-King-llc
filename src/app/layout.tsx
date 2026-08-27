import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import MobileDrawer from "@/components/layout/MobileDrawer";
import LeadModal from "@/components/sections/LeadModal";
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
        <Navbar />
        <MobileDrawer />
        <LeadModal />
        <main className="pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
