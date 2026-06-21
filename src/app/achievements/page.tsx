import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import Image from "next/image";
import { FadeIn } from "@/components/motion/FadeIn";
import {
  StaggerContainer,
  StaggerItem,
} from "@/components/motion/StaggerContainer";
import { achievementPhotos } from "@/lib/data";

export const metadata: Metadata = {
  title: "Achievements",
  description:
    "Discover the achievements and milestones of YourDentist Laser Dental Clinic.",
};

export default function AchievementsPage() {
  return (
    <>
      <Header />
      <main className="flex-1 pt-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <FadeIn className="text-center mb-16 lg:mb-20">
            <span className="text-teal-700 font-medium text-sm tracking-[0.15em] uppercase">
              Milestones
            </span>
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-[56px] font-semibold text-slate-900 mt-4 mb-5 tracking-tight leading-[1.1]">
              Our <span className="text-gradient-teal">Achievements</span>
            </h1>
            <p className="text-slate-500 max-w-2xl mx-auto text-[15px] leading-relaxed">
              Milestones that reflect our commitment to excellence in dental
              care.
            </p>
          </FadeIn>

          <StaggerContainer
            staggerDelay={0.08}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5"
          >
            {achievementPhotos.map((photo) => (
              <StaggerItem key={photo.id}>
                <div className="relative aspect-4/5 rounded-xl overflow-hidden border border-slate-200/60 bg-slate-100 shadow-premium hover:shadow-premium-hover transition-all duration-300">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    className="object-cover"
                    loading="lazy"
                  />
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </main>
      <Footer />
    </>
  );
}
