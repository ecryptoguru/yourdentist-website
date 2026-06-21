"use client";

import { useState } from "react";
import { Play, X } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { FadeIn } from "@/components/motion/FadeIn";
import {
  StaggerContainer,
  StaggerItem,
} from "@/components/motion/StaggerContainer";
import { talkVideos } from "@/lib/data";

export function TalksSection() {
  const [selectedVideo, setSelectedVideo] = useState<number | null>(null);

  return (
    <section className="section-padding bg-white" id="talks">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center mb-16 lg:mb-20">
          <span className="text-teal-700 font-medium text-sm tracking-[0.15em] uppercase">
            Dr. Arpita&apos;s Talk
          </span>
          <h2 className="font-heading text-4xl sm:text-[42px] font-semibold text-slate-900 mt-4 mb-5 tracking-tight leading-[1.1]">
            Expert <span className="text-gradient-teal">Insights</span>
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-[15px] leading-relaxed">
            Watch Dr. Arpita share valuable dental health information and
            treatment insights.
          </p>
        </FadeIn>

        <StaggerContainer
          staggerDelay={0.1}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {talkVideos.map((video) => (
            <StaggerItem key={video.id}>
              <button
                onClick={() => setSelectedVideo(video.id)}
                aria-label={`Play ${video.title}`}
                className="group w-full text-left rounded-xl focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2 focus-visible:outline-none"
              >
                <div className="relative aspect-video bg-slate-900 rounded-xl overflow-hidden mb-4 border border-slate-200/40 shadow-premium group-hover:shadow-premium-hover transition-all duration-300">
                  <video
                    src={video.src}
                    preload="metadata"
                    muted
                    playsInline
                    className="object-cover w-full h-full opacity-90 group-hover:opacity-100 transition-opacity duration-300"
                    onLoadedMetadata={(e) => {
                      const v = e.currentTarget;
                      v.currentTime = 0.1;
                      v.pause();
                    }}
                  />
                  <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-slate-900/40 transition-all duration-300" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 bg-white/95 rounded-full flex items-center justify-center shadow-premium-lg group-hover:scale-110 transition-transform duration-300">
                      <Play className="w-5 h-5 text-teal-700 ml-0.5" />
                    </div>
                  </div>
                </div>
                <h3 className="font-heading font-semibold text-slate-900 group-hover:text-teal-800 transition-colors duration-300 text-[15px]">
                  {video.title}
                </h3>
              </button>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <Dialog
          open={selectedVideo !== null}
          onOpenChange={() => setSelectedVideo(null)}
        >
          <DialogContent className="max-w-[95vw] sm:max-w-4xl p-0 bg-transparent border-none flex items-center justify-center">
            <div className="relative w-full bg-slate-900 rounded-2xl overflow-hidden shadow-premium-lg">
              <button
                onClick={() => setSelectedVideo(null)}
                aria-label="Close video player"
                className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 w-11 h-11 bg-white/10 backdrop-blur rounded-full flex items-center justify-center hover:bg-white/20 transition-colors border border-white/10"
              >
                <X className="w-5 h-5 text-white" aria-hidden="true" />
              </button>
              {selectedVideo !== null && (
                <video
                  src={talkVideos.find((v) => v.id === selectedVideo)?.src}
                  controls
                  autoPlay
                  className="w-full aspect-video"
                  onEnded={() => setSelectedVideo(null)}
                />
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}
