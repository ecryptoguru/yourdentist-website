import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FadeIn } from "@/components/motion/FadeIn";
import { doctor } from "@/lib/data";
import Image from "next/image";
import { Award, Users, Stethoscope, Smile } from "lucide-react";

export const metadata: Metadata = {
  title: "About Dr. Arpita Dash | YourDentist Laser Dental Clinic",
  description: `Learn about Dr. Arpita Dash, a dental surgeon with ${doctor.experience} years of experience in Bhubaneswar. Specializing in root canal, orthodontics, implants and aesthetic dentistry.`,
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="flex-1 pt-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <FadeIn className="text-center mb-16 lg:mb-20">
            <span className="text-teal-700 font-medium text-sm tracking-[0.15em] uppercase">
              About Us
            </span>
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-[56px] font-semibold text-slate-900 mt-4 mb-5 tracking-tight leading-[1.1]">
              Meet Dr. <span className="text-gradient-teal">Arpita Dash</span>
            </h1>
          </FadeIn>

          <div className="grid lg:grid-cols-12 gap-16 lg:gap-20 items-center mb-24">
            <FadeIn className="lg:col-span-5">
              <div className="relative aspect-4/5 max-w-md mx-auto lg:max-w-none">
                <div className="absolute inset-0 bg-teal-50 rounded-2xl translate-x-5 translate-y-5 border border-teal-100 hidden sm:block" />
                <div className="absolute inset-0 bg-teal-50/40 rounded-2xl overflow-hidden border border-slate-200/60 shadow-premium">
                  <Image
                    src="/images/about-clinic.jpg"
                    alt="YourDentist Laser Dental Clinic in Bhubaneswar"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            </FadeIn>

            <div className="lg:col-span-7">
              <FadeIn>
                <h2 className="font-heading text-3xl font-semibold text-slate-900 mb-6 tracking-tight leading-[1.15]">
                  Dedicated to Your Smile
                </h2>
              </FadeIn>
              <FadeIn delay={0.1}>
                <div className="space-y-5 text-slate-600 leading-[1.75] text-[15px] mb-8">
                  {doctor.bio.map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                  ))}
                </div>
              </FadeIn>
              <FadeIn delay={0.2}>
                <p className="text-teal-700 font-medium italic text-[15px] leading-relaxed border-l-2 border-teal-200 pl-5">
                  &ldquo;{doctor.philosophy}&rdquo;
                </p>
              </FadeIn>
            </div>
          </div>

          <FadeIn className="text-center mb-14">
            <h2 className="font-heading text-3xl sm:text-[36px] font-semibold text-slate-900 mb-4 tracking-tight leading-[1.1]">
              Specializations
            </h2>
          </FadeIn>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-24">
            {doctor.specializations.map((spec, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="bg-white rounded-xl p-6 border border-slate-200/60 flex items-center gap-4 shadow-premium hover:shadow-premium-hover transition-all duration-300 hover:-translate-y-0.5">
                  <div className="w-11 h-11 bg-teal-50 border border-teal-100 rounded-lg flex items-center justify-center shrink-0">
                    <Smile className="w-5 h-5 text-teal-700" />
                  </div>
                  <p className="font-medium text-slate-900 text-[15px]">
                    {spec}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn className="text-center mb-14">
            <h2 className="font-heading text-3xl sm:text-[36px] font-semibold text-slate-900 mb-4 tracking-tight leading-[1.1]">
              By The Numbers
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <FadeIn>
              <div className="text-center p-8 sm:p-10 bg-white rounded-xl border border-slate-200/60 shadow-premium">
                <Award className="w-8 h-8 text-teal-700 mx-auto mb-4" />
                <p className="font-heading text-3xl sm:text-4xl font-semibold text-slate-900">
                  {doctor.experience}
                </p>
                <p className="text-slate-500 mt-2 text-sm">Years Experience</p>
              </div>
            </FadeIn>
            <FadeIn delay={0.1}>
              <div className="text-center p-8 sm:p-10 bg-white rounded-xl border border-slate-200/60 shadow-premium">
                <Users className="w-8 h-8 text-teal-700 mx-auto mb-4" />
                <p className="font-heading text-3xl sm:text-4xl font-semibold text-slate-900">
                  {doctor.patients}
                </p>
                <p className="text-slate-500 mt-2 text-sm">Happy Patients</p>
              </div>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div className="text-center p-8 sm:p-10 bg-white rounded-xl border border-slate-200/60 shadow-premium">
                <Stethoscope className="w-8 h-8 text-teal-700 mx-auto mb-4" />
                <p className="font-heading text-3xl sm:text-4xl font-semibold text-slate-900">
                  {doctor.procedures}
                </p>
                <p className="text-slate-500 mt-2 text-sm">Procedures Done</p>
              </div>
            </FadeIn>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
