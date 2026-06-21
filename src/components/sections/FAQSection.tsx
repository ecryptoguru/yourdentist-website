"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FadeIn } from "@/components/motion/FadeIn";
import { faqItems } from "@/lib/data";
import { HelpCircle } from "lucide-react";
import { useMounted } from "@/hooks/useMounted";

interface FAQSectionProps {
  customFaq?: { question: string; answer: string }[];
  title?: string;
  subtitle?: string;
}

export function FAQSection({
  customFaq,
  title = "Frequently Asked Questions",
  subtitle = "Have questions? We have answers.",
}: FAQSectionProps) {
  const mounted = useMounted();
  const items = customFaq ?? faqItems;

  return (
    <section className="section-padding bg-cream relative" id="faq">
      <div className="absolute inset-0 bg-dot-grid-subtle opacity-15" />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <FadeIn className="text-center mb-12">
          <div className="w-11 h-11 bg-teal-50 border border-teal-100 rounded-lg flex items-center justify-center mx-auto mb-5">
            <HelpCircle className="w-5 h-5 text-teal-700" />
          </div>
          <h2 className="font-heading text-4xl sm:text-[42px] font-semibold text-slate-900 mb-4 tracking-tight leading-[1.1]">
            {title}
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto text-[15px] leading-relaxed">
            {subtitle}
          </p>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="bg-white rounded-xl border border-slate-200/60 shadow-premium overflow-hidden">
            {mounted ? (
              <Accordion>
                {items.map((item, i) => (
                  <AccordionItem
                    key={i}
                    value={`item-${i}`}
                    className="border-b border-slate-100 last:border-b-0 px-1"
                  >
                    <AccordionTrigger className="text-left text-slate-900 font-medium text-[15px] hover:text-teal-800 hover:no-underline py-5 px-5 transition-colors duration-200">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-slate-600 text-[15px] leading-[1.7] pb-5 px-5">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            ) : (
              <div className="space-y-3 p-1">
                {items.map((item, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-xl border border-slate-100 px-5"
                  >
                    <div className="flex w-full items-center justify-between py-5 text-left text-slate-900 font-medium text-[15px]">
                      {item.question}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="shrink-0 text-slate-400"
                      >
                        <path d="m6 9 6 6 6-6" />
                      </svg>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
