"use client";

import Image from "next/image";
import { FadeIn } from "@/components/motion/FadeIn";
import { Star, MapPin, Award, Clock, Shield } from "lucide-react";
import { testimonials, clinicInfo } from "@/lib/data";

const trustBadges = [
  {
    icon: Award,
    label: "10+ Years Experience",
    color: "text-teal-700",
    bg: "bg-teal-50",
    border: "border-teal-100",
  },
  {
    icon: Star,
    label: "4.9 Rating",
    color: "text-teal-700",
    bg: "bg-teal-50",
    border: "border-teal-100",
  },
  {
    icon: Shield,
    label: "Sterilised Equipment",
    color: "text-teal-700",
    bg: "bg-teal-50",
    border: "border-teal-100",
  },
  {
    icon: Clock,
    label: "Timely Appointments",
    color: "text-teal-700",
    bg: "bg-teal-50",
    border: "border-teal-100",
  },
];

export function ReviewsSection() {
  return (
    <section className="section-padding-sm bg-cream relative">
      <div className="absolute inset-0 bg-dot-grid-subtle opacity-15" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <FadeIn className="text-center mb-12">
          <h2 className="font-heading text-4xl sm:text-[42px] font-semibold text-slate-900 mb-5 tracking-tight leading-[1.1]">
            Trusted by{" "}
            <span className="text-gradient-teal">5,000+ Patients</span>
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-[15px] leading-relaxed">
            YourDentist Laser Dental Clinic is one of the most trusted dental
            practices in Bhubaneswar.
          </p>
        </FadeIn>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {trustBadges.map((badge, i) => (
            <FadeIn key={i} delay={i * 0.05}>
              <div className="bg-white rounded-xl p-5 border border-slate-200/60 text-center shadow-premium hover:shadow-premium-hover transition-all duration-300">
                <div
                  className={`w-9 h-9 ${badge.bg} ${badge.border} border rounded-lg flex items-center justify-center mx-auto mb-3`}
                >
                  <badge.icon className={`w-4 h-4 ${badge.color}`} />
                </div>
                <p className="font-medium text-slate-900 text-sm">
                  {badge.label}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.3}>
          <div className="bg-white rounded-xl p-6 sm:p-8 border border-slate-200/60 shadow-premium">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="flex -space-x-2">
                  {testimonials.slice(0, 4).map((t, i) => (
                    <div
                      key={i}
                      className="relative w-9 h-9 rounded-full border-2 border-white shadow-sm overflow-hidden bg-teal-50"
                    >
                      {t.photo ? (
                        <Image
                          src={t.photo}
                          alt={t.name}
                          fill
                          loading="lazy"
                          className="object-cover"
                        />
                      ) : (
                        <span className="absolute inset-0 flex items-center justify-center text-[11px] font-bold text-teal-700">
                          {t.initials}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className="w-3.5 h-3.5 fill-amber-400 text-amber-400"
                      />
                    ))}
                    <span className="text-sm font-semibold text-slate-900 ml-1">
                      4.9
                    </span>
                  </div>
                  <p className="text-slate-500 text-xs">
                    Based on 150+ reviews
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-slate-500 text-sm">
                <MapPin className="w-4 h-4 text-teal-700" />
                <span>{clinicInfo.address}</span>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
