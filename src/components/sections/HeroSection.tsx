"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Users, Award, Stethoscope } from "lucide-react";
import { Button } from "@/components/ui/button";
import { clinicInfo, doctor } from "@/lib/data";
import gsap from "gsap";

export function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        delay: 0.2,
      });

      tl.fromTo(
        labelRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6 },
      )
        .fromTo(
          lineRef.current,
          { scaleX: 0 },
          { scaleX: 1, duration: 0.8, transformOrigin: "left" },
          "-=0.3",
        )
        .fromTo(
          titleRef.current,
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 1 },
          "-=0.5",
        )
        .fromTo(
          descRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.5",
        )
        .fromTo(
          ctaRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5 },
          "-=0.3",
        )
        .fromTo(
          cardRef.current,
          { opacity: 0, x: 60, rotateY: 8 },
          { opacity: 1, x: 0, rotateY: 0, duration: 1.2 },
          "-=0.8",
        )
        .fromTo(
          statsRef.current?.children || [],
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.12 },
          "-=0.5",
        );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative min-h-screen flex items-center pt-28 pb-16 sm:pb-20 overflow-hidden bg-cream"
    >
      {/* Subtle texture background */}
      <div className="absolute inset-0 bg-dot-grid-subtle opacity-40" />

      {/* Decorative vertical line */}
      <div className="absolute top-0 left-[15%] w-px h-32 bg-linear-to-b from-transparent via-slate-300 to-transparent opacity-40 hidden lg:block" />
      <div className="absolute bottom-0 right-[20%] w-px h-40 bg-linear-to-b from-transparent via-slate-300 to-transparent opacity-40 hidden lg:block" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Content - spans 7 columns */}
          <div className="order-2 lg:order-1 lg:col-span-7">
            <p
              ref={labelRef}
              className="text-teal-700 font-medium text-sm tracking-[0.15em] uppercase mb-5 opacity-0"
            >
              Welcome to YourDentist
            </p>

            {/* Decorative line */}
            <div
              ref={lineRef}
              className="w-12 h-[2px] bg-teal-600 rounded-full mb-6"
            />

            <h1
              ref={titleRef}
              className="font-heading text-5xl sm:text-6xl lg:text-[72px] font-semibold text-slate-900 leading-[1.05] mb-7 opacity-0 tracking-tight"
            >
              Your Smile,
              <br />
              <span className="text-gradient-teal">Our Passion</span>
            </h1>
            <p
              ref={descRef}
              className="text-slate-500 text-lg sm:text-xl mb-10 max-w-xl leading-relaxed opacity-0"
            >
              Experience advanced laser dental care in Bhubaneswar with{" "}
              <span className="text-slate-700 font-medium">
                Dr. Arpita Dash
              </span>
              . Painless treatments, beautiful results.
            </p>

            <div ref={ctaRef} className="flex flex-wrap gap-4 mb-14 opacity-0">
              <a
                href={clinicInfo.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  size="lg"
                  className="bg-teal-700 hover:bg-teal-800 text-white gap-2.5 px-8 py-6 text-base rounded-lg font-medium transition-all duration-300 shadow-none hover:shadow-premium-lg group"
                >
                  Book Appointment
                  <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-0.5" />
                </Button>
              </a>
              <Link href="/services">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-slate-300 text-slate-700 hover:bg-slate-100/80 hover:border-slate-400 px-8 py-6 text-base rounded-lg font-medium transition-all duration-300"
                >
                  Explore Services
                </Button>
              </Link>
            </div>

            {/* Stats - refined treatment */}
            <div ref={statsRef} className="flex flex-wrap gap-8 sm:gap-10">
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 bg-teal-50 border border-teal-100 rounded-lg flex items-center justify-center">
                  <Award className="w-[18px] h-[18px] text-teal-700" />
                </div>
                <div>
                  <p className="font-heading font-semibold text-xl text-slate-900 leading-tight">
                    {doctor.experience}
                  </p>
                  <p className="text-slate-500 text-[13px]">Years Experience</p>
                </div>
              </div>
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 bg-amber-50 border border-amber-100 rounded-lg flex items-center justify-center">
                  <Users className="w-[18px] h-[18px] text-amber-700" />
                </div>
                <div>
                  <p className="font-heading font-semibold text-xl text-slate-900 leading-tight">
                    {doctor.patients}
                  </p>
                  <p className="text-slate-500 text-[13px]">Happy Patients</p>
                </div>
              </div>
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 bg-teal-50 border border-teal-100 rounded-lg flex items-center justify-center">
                  <Stethoscope className="w-[18px] h-[18px] text-teal-700" />
                </div>
                <div>
                  <p className="font-heading font-semibold text-xl text-slate-900 leading-tight">
                    12
                  </p>
                  <p className="text-slate-500 text-[13px]">Services Offered</p>
                </div>
              </div>
            </div>
          </div>

          {/* Image/Card - spans 5 columns */}
          <div
            ref={cardRef}
            className="order-1 lg:order-2 lg:col-span-5 relative opacity-0"
          >
            <div className="relative w-full max-w-md mx-auto lg:max-w-none">
              <div className="absolute -top-4 -right-4 w-full h-full bg-teal-50 rounded-2xl border border-teal-100 hidden sm:block" />
              <div className="absolute -bottom-3 -left-3 w-full h-full bg-teal-50/40 rounded-2xl border border-teal-100/40 hidden sm:block" />

              <div className="relative bg-white rounded-2xl shadow-premium-lg border border-slate-200/60 overflow-hidden">
                <div className="relative w-full aspect-square">
                  <Image
                    src="/images/hero-welcome.jpeg"
                    alt="Welcome to YourDentist Laser Dental Clinic in Bhubaneswar"
                    fill
                    priority
                    className="object-cover"
                  />
                </div>
                <div className="h-1.5 bg-linear-to-r from-teal-600 via-teal-500 to-teal-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <button
          onClick={() =>
            document
              .getElementById("about")
              ?.scrollIntoView({ behavior: "smooth" })
          }
          className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-2 cursor-pointer bg-transparent border-none group"
          aria-label="Scroll to explore"
        >
          <span className="text-slate-400 text-xs tracking-wide">
            Scroll to explore
          </span>
          <svg
            className="w-5 h-5 text-slate-400 group-hover:text-teal-600 transition-colors"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </button>
      </div>
    </section>
  );
}
