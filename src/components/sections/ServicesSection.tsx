"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  StaggerContainer,
  StaggerItem,
} from "@/components/motion/StaggerContainer";
import { FadeIn } from "@/components/motion/FadeIn";
import { services, serviceVideos } from "@/lib/data";
import { serviceIconMap } from "@/lib/icons";
import { cn } from "@/lib/utils";

export function ServicesSection() {
  return (
    <section className="section-padding bg-cream relative" id="services">
      {/* Subtle texture */}
      <div className="absolute inset-0 bg-dot-grid-subtle opacity-30" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <FadeIn className="text-center mb-16 lg:mb-20">
          <span className="text-teal-700 font-medium text-sm tracking-[0.15em] uppercase">
            Our Services
          </span>
          <h2 className="font-heading text-4xl sm:text-[42px] font-semibold text-slate-900 mt-4 mb-5 tracking-tight leading-[1.1]">
            Comprehensive Dental{" "}
            <span className="text-gradient-teal">Care Solutions</span>
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-[15px] leading-relaxed">
            From preventive care to advanced restorative treatments, we offer a
            full spectrum of dental services using the latest technology.
          </p>
        </FadeIn>

        <StaggerContainer
          staggerDelay={0.08}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {services.map((service) => {
            const Icon = serviceIconMap[service.icon] || serviceIconMap.Heart;
            return (
              <StaggerItem key={service.slug}>
                <Link href={`/services/${service.slug}`}>
                  <div
                    className={cn(
                      "group bg-white rounded-xl p-7 sm:p-8 border border-slate-200/60 h-full shadow-premium",
                      "hover:shadow-premium-hover hover:-translate-y-1 transition-all duration-300",
                      "hover:border-teal-200/80 cursor-pointer-card",
                    )}
                  >
                    <div className="w-12 h-12 bg-teal-50 border border-teal-100 rounded-lg flex items-center justify-center mb-6 group-hover:bg-teal-100/60 transition-colors duration-300">
                      <Icon className="w-5 h-5 text-teal-700" />
                    </div>
                    <h3 className="font-heading text-lg font-semibold text-slate-900 mb-2.5 group-hover:text-teal-800 transition-colors duration-300">
                      {service.title}
                    </h3>
                    <p className="text-slate-500 text-[14px] leading-relaxed mb-5">
                      {service.shortDescription}
                    </p>
                    <span className="inline-flex items-center text-teal-700 text-sm font-medium group-hover:gap-2 transition-all duration-300">
                      Learn More
                      <ArrowRight className="w-4 h-4 ml-1 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-0.5" />
                    </span>
                    {serviceVideos[service.slug] && (
                      <video
                        src={serviceVideos[service.slug]}
                        className="w-full h-32 object-cover rounded-lg mt-4 mb-3"
                        muted
                        loop
                        playsInline
                        preload="metadata"
                        onMouseEnter={(e) =>
                          (e.target as HTMLVideoElement).play().catch(() => {})
                        }
                        onMouseLeave={(e) => {
                          const el = e.target as HTMLVideoElement;
                          el.pause();
                          el.currentTime = 0;
                        }}
                      />
                    )}
                  </div>
                </Link>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
