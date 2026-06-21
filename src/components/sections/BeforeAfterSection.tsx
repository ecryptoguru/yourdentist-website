"use client";

import Image from "next/image";
import { FadeIn } from "@/components/motion/FadeIn";
import { achievementPhotos } from "@/lib/data";

export function BeforeAfterSection() {
  return (
    <section className="section-padding bg-white" id="results">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center mb-16 lg:mb-20">
          <span className="text-teal-700 font-medium text-sm tracking-[0.15em] uppercase">
            Results
          </span>
          <h2 className="font-heading text-4xl sm:text-[42px] font-semibold text-slate-900 mt-4 mb-5 tracking-tight leading-[1.1]">
            Real <span className="text-gradient-teal">Transformations</span>
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-[15px] leading-relaxed">
            See the incredible results our patients have achieved. Every smile
            tells a story.
          </p>
        </FadeIn>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {achievementPhotos.slice(0, 8).map((photo, i) => (
            <FadeIn key={photo.id} delay={i * 0.08}>
              <div className="group relative aspect-4/5 rounded-xl overflow-hidden border border-slate-200/60 bg-slate-100 shadow-premium group-hover:shadow-premium-hover transition-all duration-300">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className="object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/10 transition-colors duration-300" />
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
