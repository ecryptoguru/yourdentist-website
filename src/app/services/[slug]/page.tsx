import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FadeIn } from "@/components/motion/FadeIn";
import { FAQSection } from "@/components/sections/FAQSection";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { services, clinicInfo, serviceVideos } from "@/lib/data";
import { ArrowLeft, CheckCircle, Phone, MessageCircle } from "lucide-react";
import { serviceIconMap } from "@/lib/icons";

const BASE_URL = "https://www.yourdentistdentalclinic.com";
const OG_IMAGE = `${BASE_URL}/images/og.jpg`;

export async function generateStaticParams() {
  return services.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) return { title: "Service Not Found" };
  return {
    title: service.title,
    description: service.shortDescription,
    openGraph: {
      type: "article",
      title: service.title,
      description: service.shortDescription,
      images: [
        {
          url: OG_IMAGE,
          width: 1200,
          height: 630,
          alt: service.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: service.title,
      description: service.shortDescription,
      images: [OG_IMAGE],
    },
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  const Icon = serviceIconMap[service.icon] || serviceIconMap.Heart;
  const relatedServices = services
    .filter((s) => s.slug !== service.slug)
    .slice(0, 3);

  return (
    <>
      <Header />
      <main className="flex-1 pt-28">
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-slate-500 hover:text-teal-700 transition-colors text-sm group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
            Back to Services
          </Link>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 md:pb-24">
          <FadeIn>
            <div className="flex items-start gap-4 mb-6">
              <div className="w-14 h-14 bg-teal-50 border border-teal-100 rounded-xl flex items-center justify-center shrink-0">
                <Icon className="w-6 h-6 text-teal-700" />
              </div>
              <div>
                <Badge className="bg-teal-50 text-teal-700 hover:bg-teal-100 border border-teal-100 mb-1.5 font-medium text-xs">
                  Dental Service
                </Badge>
                <h1 className="font-heading text-3xl sm:text-4xl font-semibold text-slate-900 tracking-tight leading-[1.1]">
                  {service.title}
                </h1>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <p className="text-slate-600 leading-[1.75] mb-12 text-[15px]">
              {service.fullDescription}
            </p>
          </FadeIn>

          {serviceVideos[service.slug] && (
            <FadeIn delay={0.15}>
              <video
                src={serviceVideos[service.slug]}
                controls
                className="w-full rounded-xl mb-12 border border-slate-200/60 shadow-premium"
                preload="metadata"
              />
            </FadeIn>
          )}

          <FadeIn delay={0.2}>
            <h2 className="font-heading text-xl font-semibold text-slate-900 mb-5 tracking-tight">
              Benefits
            </h2>
            <ul className="space-y-3 mb-12">
              {service.benefits.map((benefit, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-teal-700 mt-0.5 shrink-0" />
                  <span className="text-slate-600 text-[15px]">{benefit}</span>
                </li>
              ))}
            </ul>
          </FadeIn>

          <FadeIn delay={0.3}>
            <h2 className="font-heading text-xl font-semibold text-slate-900 mb-5 tracking-tight">
              Treatment Process
            </h2>
            <div className="space-y-3 mb-12">
              {service.process.map((step, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 bg-cream rounded-xl p-5 border border-slate-200/60"
                >
                  <div className="w-8 h-8 bg-teal-700 rounded-lg flex items-center justify-center text-white font-bold text-sm shrink-0">
                    {i + 1}
                  </div>
                  <p className="text-slate-700 text-[15px] pt-1 leading-relaxed">
                    {step}
                  </p>
                </div>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={0.25}>
            <div className="bg-teal-50/40 rounded-xl p-6 sm:p-8 border border-teal-100/60 mb-12">
              <h2 className="font-heading text-xl font-semibold text-slate-900 mb-2 tracking-tight">
                Pricing
              </h2>
              <p className="text-3xl font-semibold text-teal-700 mb-1">
                {service.priceRange}
              </p>
              <p className="text-slate-500 text-sm mb-5 leading-relaxed">
                Final cost depends on complexity and materials. Consultation
                required for exact quote.
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href={clinicInfo.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button className="bg-teal-700 hover:bg-teal-800 text-white gap-2 rounded-lg h-11 font-medium transition-all duration-300 shadow-none hover:shadow-premium">
                    <MessageCircle className="w-4 h-4" />
                    Get Exact Quote
                  </Button>
                </a>
                <a href={clinicInfo.phoneLink}>
                  <Button
                    variant="outline"
                    className="border-slate-300 text-slate-700 hover:bg-slate-100/80 hover:border-slate-400 gap-2 rounded-lg h-11 transition-all duration-300"
                  >
                    <Phone className="w-4 h-4" />
                    Call to Discuss
                  </Button>
                </a>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.3}>
            <div className="bg-teal-50/40 rounded-xl p-7 sm:p-8 border border-teal-100/60 mb-12">
              <h2 className="font-heading text-xl font-semibold text-slate-900 mb-3 tracking-tight">
                Ready to Get Started?
              </h2>
              <p className="text-slate-600 text-[15px] mb-6 leading-relaxed">
                Book a consultation with Dr. Arpita Dash and take the first step
                towards a healthier smile.
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href={clinicInfo.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button className="bg-teal-700 hover:bg-teal-800 text-white gap-2 rounded-lg h-11 font-medium transition-all duration-300 shadow-none hover:shadow-premium">
                    <MessageCircle className="w-4 h-4" />
                    Book via WhatsApp
                  </Button>
                </a>
                <a href={clinicInfo.phoneLink}>
                  <Button
                    variant="outline"
                    className="border-teal-200 text-teal-700 hover:bg-teal-50/60 hover:border-teal-300 gap-2 rounded-lg h-11 transition-all duration-300"
                  >
                    <Phone className="w-4 h-4" />
                    Call Us
                  </Button>
                </a>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.5}>
            <h2 className="font-heading text-xl font-semibold text-slate-900 mb-5 tracking-tight">
              Related Services
            </h2>
            <div className="grid sm:grid-cols-3 gap-4">
              {relatedServices.map((related) => {
                const RelatedIcon =
                  serviceIconMap[related.icon] || serviceIconMap.Heart;
                return (
                  <Link key={related.slug} href={`/services/${related.slug}`}>
                    <div className="bg-white rounded-xl p-5 border border-slate-200/60 hover:shadow-premium hover:border-teal-200/80 transition-all duration-300 shadow-premium cursor-pointer-card">
                      <RelatedIcon className="w-5 h-5 text-teal-700 mb-3" />
                      <h3 className="font-medium text-slate-900 text-sm">
                        {related.title}
                      </h3>
                    </div>
                  </Link>
                );
              })}
            </div>
          </FadeIn>
        </div>

        <FAQSection
          title={`${service.title} — FAQs`}
          subtitle={`Common questions about ${service.title.toLowerCase()} answered by Dr. Arpita Dash.`}
        />
      </main>
      <Footer />
    </>
  );
}
