"use client";

import Image from "next/image";
import Link from "next/link";
import { Award, BadgeCheck, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/motion/FadeIn";
import { doctor } from "@/lib/data";

export function AboutSection() {
  return (
    <section
      className="section-padding bg-white relative overflow-hidden"
      id="about"
    >
      {/* Subtle texture */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-linear-to-l from-slate-50/50 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-12 gap-16 lg:gap-20 items-center">
          {/* Image - spans 5 columns */}
          <FadeIn direction="left" className="lg:col-span-5 relative">
            <div className="relative w-full aspect-4/5 max-w-md mx-auto lg:max-w-none">
              {/* Decorative offset layer */}
              <div className="absolute inset-0 bg-teal-50 rounded-2xl translate-x-5 translate-y-5 border border-teal-100 hidden sm:block" />

              <div className="absolute inset-0 bg-teal-50/40 rounded-2xl overflow-hidden border border-slate-200/60 shadow-premium">
                <Image
                  src="/images/about-clinic.jpg"
                  alt="YourDentist Laser Dental Clinic in Bhubaneswar"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </FadeIn>

          {/* Content - spans 7 columns */}
          <div className="lg:col-span-7">
            <FadeIn>
              <span className="text-teal-700 font-medium text-sm tracking-[0.15em] uppercase">
                About Us
              </span>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h2 className="font-heading text-4xl sm:text-[42px] font-semibold text-slate-900 mt-4 mb-7 tracking-tight leading-[1.1]">
                Over a Decade of{" "}
                <span className="text-gradient-teal">Dental Excellence</span>
              </h2>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div className="space-y-5 text-slate-600 leading-[1.75] text-[15px] mb-10">
                {doctor.bio.map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
            </FadeIn>
            <FadeIn delay={0.3}>
              <div className="flex flex-wrap gap-3">
                <Link href="/certificates">
                  <Button
                    variant="outline"
                    className="border-slate-300 text-slate-700 hover:bg-slate-100/80 hover:border-slate-400 hover:text-slate-900 gap-2 rounded-lg h-11 px-5 transition-all duration-300"
                  >
                    <BadgeCheck className="w-4 h-4" />
                    Certificates
                  </Button>
                </Link>
                <Link href="/achievements">
                  <Button
                    variant="outline"
                    className="border-slate-300 text-slate-700 hover:bg-slate-100/80 hover:border-slate-400 hover:text-slate-900 gap-2 rounded-lg h-11 px-5 transition-all duration-300"
                  >
                    <Award className="w-4 h-4" />
                    Achievements
                  </Button>
                </Link>
                <Link href="/gallery">
                  <Button
                    variant="outline"
                    className="border-slate-300 text-slate-700 hover:bg-slate-100/80 hover:border-slate-400 hover:text-slate-900 gap-2 rounded-lg h-11 px-5 transition-all duration-300"
                  >
                    <Play className="w-4 h-4" />
                    Watch Videos
                  </Button>
                </Link>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
