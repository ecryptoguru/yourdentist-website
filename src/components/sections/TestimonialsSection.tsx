"use client";

import Image from "next/image";
import { Star, Quote } from "lucide-react";
import { FadeIn } from "@/components/motion/FadeIn";
import { testimonials } from "@/lib/data";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function TestimonialsSection() {
  return (
    <section className="section-padding bg-cream relative" id="testimonials">
      <div className="absolute inset-0 bg-dot-grid-subtle opacity-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <FadeIn className="text-center mb-16 lg:mb-20">
          <span className="text-teal-700 font-medium text-sm tracking-[0.15em] uppercase">
            Testimonials
          </span>
          <h2 className="font-heading text-4xl sm:text-[42px] font-semibold text-slate-900 mt-4 mb-5 tracking-tight leading-[1.1]">
            What Our <span className="text-gradient-teal">Patients Say</span>
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-[15px] leading-relaxed">
            Real stories from real patients who trust us with their smiles.
          </p>
        </FadeIn>

        <FadeIn delay={0.2}>
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {testimonials.map((testimonial) => (
                <CarouselItem
                  key={testimonial.id}
                  className="pl-4 md:basis-1/2 lg:basis-1/3"
                >
                  <div className="bg-white rounded-xl p-8 border border-slate-200/60 h-full flex flex-col shadow-premium">
                    <Quote className="w-8 h-8 text-teal-100 mb-5" />
                    <p className="text-slate-600 text-[15px] leading-[1.7] flex-1 mb-6">
                      &ldquo;{testimonial.text}&rdquo;
                    </p>
                    <div className="flex items-center gap-1 mb-5">
                      {Array.from({ length: testimonial.rating }).map(
                        (_, i) => (
                          <Star
                            key={i}
                            className="w-3.5 h-3.5 fill-amber-400 text-amber-400"
                          />
                        ),
                      )}
                    </div>
                    <div className="flex items-center gap-3">
                      <Avatar className="w-10 h-10 bg-teal-50 border border-teal-100">
                        {testimonial.photo && (
                          <AvatarImage
                            src={testimonial.photo}
                            alt={testimonial.name}
                            loading="lazy"
                            className="object-cover"
                          />
                        )}
                        <AvatarFallback className="bg-teal-700 text-white text-xs font-semibold">
                          {testimonial.initials}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-slate-900 text-sm">
                          {testimonial.name}
                        </p>
                        <p className="text-slate-500 text-xs">
                          Verified Patient
                        </p>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center gap-3 mt-10">
              <CarouselPrevious className="relative left-0 translate-y-0 bg-white border-slate-200/80 hover:bg-teal-50 hover:border-teal-200 h-10 w-10 rounded-lg shadow-premium transition-all duration-300" />
              <CarouselNext className="relative right-0 translate-y-0 bg-white border-slate-200/80 hover:bg-teal-50 hover:border-teal-200 h-10 w-10 rounded-lg shadow-premium transition-all duration-300" />
            </div>
          </Carousel>
        </FadeIn>
      </div>
    </section>
  );
}
