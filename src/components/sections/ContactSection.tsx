"use client";

import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/motion/FadeIn";
import { clinicInfo } from "@/lib/data";

export function ContactSection({ hideHeader = false }: { hideHeader?: boolean }) {
  return (
    <section className={hideHeader ? "py-0 bg-white relative" : "section-padding bg-white relative"} id="contact">
      {!hideHeader && <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-slate-200 to-transparent" />}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {!hideHeader && (
          <FadeIn className="text-center mb-16 lg:mb-20">
            <span className="text-teal-700 font-medium text-sm tracking-[0.15em] uppercase">
              Contact Us
            </span>
            <h2 className="font-heading text-4xl sm:text-[42px] font-semibold text-slate-900 mt-4 mb-5 tracking-tight leading-[1.1]">
              Get in <span className="text-gradient-teal">Touch</span>
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto text-[15px] leading-relaxed">
              Ready to start your journey to a healthier smile? Reach out to us
              today.
            </p>
          </FadeIn>
        )}

        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12">
          {/* Contact Info - spans 5 */}
          <FadeIn className="lg:col-span-5">
            <div className="space-y-5">
              <div className="bg-cream rounded-xl p-7 sm:p-8 border border-slate-200/60 shadow-premium">
                <h3 className="font-heading text-xl font-semibold text-slate-900 mb-7">
                  Contact Information
                </h3>
                <ul className="space-y-5">
                  <li className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-teal-50 border border-teal-100 rounded-lg flex items-center justify-center shrink-0">
                      <Phone className="w-[18px] h-[18px] text-teal-700" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 mb-0.5 tracking-wide uppercase">
                        Phone
                      </p>
                      <a
                        href={clinicInfo.phoneLink}
                        className="text-slate-900 font-medium hover:text-teal-700 transition-colors text-[15px]"
                      >
                        {clinicInfo.phone}
                      </a>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-teal-50 border border-teal-100 rounded-lg flex items-center justify-center shrink-0">
                      <MessageCircle className="w-[18px] h-[18px] text-teal-700" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 mb-0.5 tracking-wide uppercase">
                        WhatsApp
                      </p>
                      <a
                        href={clinicInfo.whatsapp}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-900 font-medium hover:text-teal-700 transition-colors text-[15px]"
                      >
                        {clinicInfo.phone}
                      </a>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-teal-50 border border-teal-100 rounded-lg flex items-center justify-center shrink-0">
                      <Mail className="w-[18px] h-[18px] text-teal-700" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 mb-0.5 tracking-wide uppercase">
                        Email
                      </p>
                      <a
                        href={`mailto:${clinicInfo.email}`}
                        className="text-slate-900 font-medium hover:text-teal-700 transition-colors text-[15px]"
                      >
                        {clinicInfo.email}
                      </a>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-teal-50 border border-teal-100 rounded-lg flex items-center justify-center shrink-0">
                      <MapPin className="w-[18px] h-[18px] text-teal-700" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 mb-0.5 tracking-wide uppercase">
                        Address
                      </p>
                      <a
                        href={clinicInfo.mapUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-900 font-medium hover:text-teal-700 transition-colors text-[15px] leading-relaxed"
                      >
                        {clinicInfo.address}
                      </a>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-teal-50 border border-teal-100 rounded-lg flex items-center justify-center shrink-0">
                      <Clock className="w-[18px] h-[18px] text-teal-700" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 mb-0.5 tracking-wide uppercase">
                        Opening Hours
                      </p>
                      <div className="text-slate-900 text-[15px]">
                        <p>Tuesday - Sunday</p>
                        <p className="text-slate-500 text-sm">
                          Morning: {clinicInfo.hours.tuesdayToSunday.morning}
                        </p>
                        <p className="text-slate-500 text-sm">
                          Evening: {clinicInfo.hours.tuesdayToSunday.evening}
                        </p>
                        <p className="text-slate-500 text-sm mt-1">
                          Monday: Closed
                        </p>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>

              <a
                href={clinicInfo.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <Button className="w-full bg-teal-700 hover:bg-teal-800 text-white gap-2 py-6 text-base rounded-lg font-medium transition-all duration-300 shadow-none hover:shadow-premium-lg">
                  <MessageCircle className="w-5 h-5" />
                  Book Appointment via WhatsApp
                </Button>
              </a>
            </div>
          </FadeIn>

          {/* Map - spans 7 */}
          <FadeIn direction="right" delay={0.2} className="lg:col-span-7">
            <div className="bg-cream rounded-xl p-3 sm:p-4 border border-slate-200/60 shadow-premium h-full min-h-[400px] lg:min-h-[500px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3742.1234567890123!2d85.8245!3d20.2961!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjDCsDE3JzQ2LjAiTiA4NcKwNDknMjguMiJF!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: "400px", borderRadius: "8px" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="YourDentist Laser Dental Clinic Location"
                className="block"
              />
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
