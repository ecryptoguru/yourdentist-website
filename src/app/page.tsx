import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { GallerySection } from "@/components/sections/GallerySection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { TalksSection } from "@/components/sections/TalksSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { BookingForm } from "@/components/sections/BookingForm";
import { BeforeAfterSection } from "@/components/sections/BeforeAfterSection";
import { ReviewsSection } from "@/components/sections/ReviewsSection";
import { FAQSection } from "@/components/sections/FAQSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home | YourDentist Laser Dental Clinic",
};

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <HeroSection />
        <ReviewsSection />
        <AboutSection />
        <ServicesSection />
        <BeforeAfterSection />
        <TestimonialsSection />
        <GallerySection />
        <TalksSection />
        <FAQSection />
        <section className="section-padding bg-cream relative" id="appointment">
          <div className="absolute inset-0 bg-dot-grid-subtle opacity-20" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="text-center mb-16">
              <span className="text-teal-700 font-medium text-sm tracking-[0.15em] uppercase">
                Appointment
              </span>
              <h2 className="font-heading text-4xl sm:text-[42px] font-semibold text-slate-900 mt-4 mb-5 tracking-tight leading-[1.1]">
                Book Your <span className="text-gradient-teal">Visit</span>
              </h2>
              <p className="text-slate-500 max-w-2xl mx-auto text-[15px] leading-relaxed">
                Fill in your details and we will confirm your appointment via
                WhatsApp within 2 hours.
              </p>
            </div>
            <BookingForm />
          </div>
        </section>
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
