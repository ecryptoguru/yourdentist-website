import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FadeIn } from "@/components/motion/FadeIn";
import { GalleryGrid } from "@/components/sections/GalleryGrid";

export const metadata: Metadata = {
  title: "Clinic Gallery | YourDentist Laser Dental Clinic",
  description:
    "Explore our modern dental clinic facilities and equipment in Bhubaneswar.",
};

export default function GalleryPage() {
  return (
    <>
      <Header />
      <main className="flex-1 pt-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <FadeIn className="text-center mb-16 lg:mb-20">
            <span className="text-teal-700 font-medium text-sm tracking-[0.15em] uppercase">
              Gallery
            </span>
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-[56px] font-semibold text-slate-900 mt-4 mb-5 tracking-tight leading-[1.1]">
              Our <span className="text-gradient-teal">Clinic</span>
            </h1>
            <p className="text-slate-500 max-w-2xl mx-auto text-[15px] leading-relaxed">
              Take a look at our modern facilities designed for your comfort and
              care.
            </p>
          </FadeIn>

          <GalleryGrid />
        </div>
      </main>
      <Footer />
    </>
  );
}
