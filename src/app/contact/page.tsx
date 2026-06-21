import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FadeIn } from "@/components/motion/FadeIn";
import { ContactSection } from "@/components/sections/ContactSection";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Contact YourDentist Laser Dental Clinic in Bhubaneswar. Book appointments via WhatsApp or call us at +91 7064719630.",
};

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="flex-1 pt-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <FadeIn className="text-center mb-16">
            <span className="text-teal-700 font-medium text-sm tracking-[0.15em] uppercase">
              Contact
            </span>
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-[56px] font-semibold text-slate-900 mt-4 mb-5 tracking-tight leading-[1.1]">
              Get in <span className="text-gradient-teal">Touch</span>
            </h1>
            <p className="text-slate-500 max-w-2xl mx-auto text-[15px] leading-relaxed">
              We&apos;re here to help you achieve the smile you deserve. Reach
              out to us today.
            </p>
          </FadeIn>
        </div>
        <ContactSection hideHeader />
      </main>
      <Footer />
    </>
  );
}
