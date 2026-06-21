"use client";

import { useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { FadeIn } from "@/components/motion/FadeIn";
import {
  StaggerContainer,
  StaggerItem,
} from "@/components/motion/StaggerContainer";
import { galleryImages } from "@/lib/data";

export function GallerySection() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handlePrev = () => {
    if (selectedIndex !== null) {
      setSelectedIndex(
        selectedIndex === 0 ? galleryImages.length - 1 : selectedIndex - 1,
      );
    }
  };

  const handleNext = () => {
    if (selectedIndex !== null) {
      setSelectedIndex(
        selectedIndex === galleryImages.length - 1 ? 0 : selectedIndex + 1,
      );
    }
  };

  return (
    <section className="section-padding bg-white" id="gallery">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center mb-16 lg:mb-20">
          <span className="text-teal-700 font-medium text-sm tracking-[0.15em] uppercase">
            Gallery
          </span>
          <h2 className="font-heading text-4xl sm:text-[42px] font-semibold text-slate-900 mt-4 mb-5 tracking-tight leading-[1.1]">
            Our <span className="text-gradient-teal">Clinic</span>
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-[15px] leading-relaxed">
            Take a look at our modern facilities and equipment designed for your
            comfort.
          </p>
        </FadeIn>

        <StaggerContainer
          staggerDelay={0.1}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3"
        >
          {galleryImages.map((image, index) => (
            <StaggerItem key={image.id}>
              <button
                onClick={() => setSelectedIndex(index)}
                aria-label={`View ${image.alt}`}
                className="group relative w-full aspect-square rounded-xl overflow-hidden bg-slate-100 cursor-pointer focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2 focus-visible:outline-none border border-slate-200/40"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/50 transition-all duration-300 flex items-center justify-center">
                  <span className="text-white font-medium text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 tracking-wide">
                    View
                  </span>
                </div>
              </button>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <Dialog
          open={selectedIndex !== null}
          onOpenChange={() => setSelectedIndex(null)}
        >
          <DialogContent className="max-w-[95vw] sm:max-w-4xl p-0 bg-transparent border-none">
            <div className="relative bg-slate-900 rounded-2xl overflow-hidden shadow-premium-lg">
              <button
                onClick={() => setSelectedIndex(null)}
                aria-label="Close image viewer"
                className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 w-11 h-11 bg-white/10 backdrop-blur rounded-full flex items-center justify-center hover:bg-white/20 transition-colors border border-white/10"
              >
                <X className="w-5 h-5 text-white" aria-hidden="true" />
              </button>
              {selectedIndex !== null && (
                <div className="relative aspect-video">
                  <Image
                    src={galleryImages[selectedIndex].src}
                    alt={galleryImages[selectedIndex].alt}
                    fill
                    className="object-contain"
                    loading="eager"
                  />
                </div>
              )}
              <div className="flex items-center justify-between p-4 sm:p-5">
                <button
                  onClick={handlePrev}
                  aria-label="Previous image"
                  className="w-11 h-11 bg-white/10 backdrop-blur rounded-full flex items-center justify-center hover:bg-white/20 transition-colors border border-white/10"
                >
                  <ChevronLeft
                    className="w-5 h-5 text-white"
                    aria-hidden="true"
                  />
                </button>
                <span
                  className="text-white/80 text-sm font-medium tabular-nums"
                  aria-live="polite"
                >
                  {selectedIndex !== null ? selectedIndex + 1 : 0} /{" "}
                  {galleryImages.length}
                </span>
                <button
                  onClick={handleNext}
                  aria-label="Next image"
                  className="w-11 h-11 bg-white/10 backdrop-blur rounded-full flex items-center justify-center hover:bg-white/20 transition-colors border border-white/10"
                >
                  <ChevronRight
                    className="w-5 h-5 text-white"
                    aria-hidden="true"
                  />
                </button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}
