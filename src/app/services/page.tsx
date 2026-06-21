import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FadeIn } from "@/components/motion/FadeIn";
import {
  StaggerContainer,
  StaggerItem,
} from "@/components/motion/StaggerContainer";
import { services } from "@/lib/data";
import { serviceIconMap } from "@/lib/icons";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Our Dental Services",
  description:
    "Explore our comprehensive range of dental services including Root Canal, Orthodontics, Implants, Whitening and more in Bhubaneswar.",
};

export default function ServicesPage() {
  return (
    <>
      <Header />
      <main className="flex-1 pt-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <FadeIn className="text-center mb-16 lg:mb-20">
            <span className="text-teal-700 font-medium text-sm tracking-[0.15em] uppercase">
              Services
            </span>
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-[56px] font-semibold text-slate-900 mt-4 mb-5 tracking-tight leading-[1.1]">
              Our <span className="text-gradient-teal">Services</span>
            </h1>
            <p className="text-slate-500 max-w-2xl mx-auto text-[15px] leading-relaxed">
              Comprehensive dental care solutions using advanced technology and
              techniques.
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
                        "hover:shadow-premium-hover hover:-translate-y-1 transition-all duration-500",
                        "hover:border-teal-200/80",
                      )}
                    >
                      <div className="w-12 h-12 bg-teal-50 border border-teal-100 rounded-lg flex items-center justify-center mb-6 group-hover:bg-teal-100/60 transition-colors duration-300">
                        <Icon className="w-5 h-5 text-teal-700" />
                      </div>
                      <h2 className="font-heading text-lg font-semibold text-slate-900 mb-2.5 group-hover:text-teal-800 transition-colors duration-300">
                        {service.title}
                      </h2>
                      <p className="text-slate-500 text-[14px] leading-relaxed mb-5">
                        {service.shortDescription}
                      </p>
                      <span className="inline-flex items-center text-teal-700 text-sm font-medium group-hover:gap-2 transition-all duration-300">
                        Learn More
                        <ArrowRight className="w-4 h-4 ml-1 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-0.5" />
                      </span>
                    </div>
                  </Link>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </main>
      <Footer />
    </>
  );
}
