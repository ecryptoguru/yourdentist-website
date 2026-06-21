import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FadeIn } from "@/components/motion/FadeIn";
import { FAQSection } from "@/components/sections/FAQSection";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { blogPosts, doctor, clinicInfo } from "@/lib/data";
import type { BlogPost } from "@/types";
import { formatDate } from "@/lib/format";
import { Calendar, Clock, ArrowLeft } from "lucide-react";

const BASE_URL = "https://www.yourdentistdentalclinic.com";
const OG_IMAGE = `${BASE_URL}/images/og.jpg`;

function RenderBold({ text }: { text: string }) {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return (
    <>
      {parts.map((part, idx) =>
        part.startsWith("**") && part.endsWith("**") ? (
          <strong key={idx} className="font-semibold text-slate-800">
            {part.slice(2, -2)}
          </strong>
        ) : (
          <span key={idx}>{part}</span>
        ),
      )}
    </>
  );
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return { title: "Post Not Found" };
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      images: [
        {
          url: OG_IMAGE,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [OG_IMAGE],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = blogPosts
    .filter((p) => p.slug !== post.slug && p.category === post.category)
    .slice(0, 2);

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: OG_IMAGE,
    datePublished: post.date,
    author: {
      "@type": "Person",
      name: doctor.name,
      jobTitle: "Dental Surgeon",
    },
    publisher: {
      "@type": "Organization",
      name: clinicInfo.name,
      logo: {
        "@type": "ImageObject",
        url: `${BASE_URL}/images/logo.jpg`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${BASE_URL}/blog/${post.slug}/`,
    },
  };

  return (
    <>
      <Header />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }}
      />
      <main className="flex-1 pt-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          <FadeIn>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-slate-500 hover:text-teal-700 transition-colors text-sm mb-8 group"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
              Back to Blog
            </Link>
          </FadeIn>

          <article>
            <FadeIn>
              <div className="aspect-video bg-teal-50 rounded-xl flex items-center justify-center mb-8 border border-slate-200/40 shadow-premium">
                <Badge className="bg-white/90 text-teal-700 border border-teal-100 px-4 py-1.5 font-medium">
                  {post.category}
                </Badge>
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <h1 className="font-heading text-3xl sm:text-4xl font-semibold text-slate-900 mb-5 tracking-tight leading-[1.15]">
                {post.title}
              </h1>
            </FadeIn>

            <FadeIn delay={0.15}>
              <div className="flex flex-wrap items-center gap-4 mb-8">
                <div className="flex items-center gap-3">
                  <Avatar className="w-10 h-10 border border-teal-100">
                    <AvatarFallback className="bg-teal-50 text-teal-700 text-sm font-bold">
                      AD
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-slate-900 text-sm">
                      {doctor.name}
                    </p>
                    <p className="text-slate-500 text-xs">Dental Surgeon</p>
                  </div>
                </div>
                <Separator
                  orientation="vertical"
                  className="h-8 hidden sm:block bg-slate-200"
                />
                <div className="flex items-center gap-3 text-sm text-slate-500">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    {formatDate(post.date, {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    {post.readTime}
                  </span>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="prose prose-slate max-w-none mb-12">
                {post.content.split("\n\n").map((block, i) => {
                  if (block.startsWith("## ")) {
                    return (
                      <h2
                        key={i}
                        className="font-heading text-xl font-semibold text-slate-900 mt-8 mb-4 tracking-tight"
                      >
                        {block.replace("## ", "")}
                      </h2>
                    );
                  }
                  if (block.startsWith("- ")) {
                    return (
                      <ul key={i} className="list-disc pl-6 mb-5 space-y-2">
                        {block.split("\n").map((item, j) => (
                          <li key={j} className="text-slate-600 text-[15px]">
                            <RenderBold text={item.replace(/^- /, "")} />
                          </li>
                        ))}
                      </ul>
                    );
                  }
                  return (
                    <p
                      key={i}
                      className="text-slate-600 leading-[1.75] mb-5 text-[15px]"
                    >
                      <RenderBold text={block} />
                    </p>
                  );
                })}
              </div>
            </FadeIn>

            <FadeIn delay={0.3}>
              <div className="bg-teal-50/60 rounded-xl p-6 sm:p-7 border border-teal-100/60 mb-12">
                <h3 className="font-heading text-lg font-semibold text-slate-900 mb-2">
                  Need Professional Advice?
                </h3>
                <p className="text-slate-600 text-[15px] mb-5 leading-relaxed">
                  Schedule a consultation with Dr. Arpita Dash to discuss your
                  dental concerns.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 text-teal-700 font-medium text-sm hover:gap-3 transition-all duration-300 group"
                >
                  Book a Consultation
                  <ArrowLeft className="w-4 h-4 rotate-180 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
            </FadeIn>

            {relatedPosts.length > 0 && (
              <FadeIn delay={0.4}>
                <h3 className="font-heading text-xl font-semibold text-slate-900 mb-5">
                  Related Articles
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {relatedPosts.map((related) => (
                    <Link key={related.slug} href={`/blog/${related.slug}`}>
                      <div className="bg-white rounded-xl p-5 border border-slate-200/60 hover:border-teal-200/80 hover:shadow-premium transition-all duration-300 shadow-premium">
                        <Badge
                          variant="outline"
                          className="text-xs mb-2 border-teal-200 text-teal-700 font-medium"
                        >
                          {related.category}
                        </Badge>
                        <h4 className="font-medium text-slate-900 text-sm line-clamp-2 leading-snug">
                          {related.title}
                        </h4>
                      </div>
                    </Link>
                  ))}
                </div>
              </FadeIn>
            )}
          </article>
        </div>

        {(post as BlogPost).faq && (post as BlogPost).faq!.length > 0 && (
          <FAQSection
            customFaq={(post as BlogPost).faq!}
            title={`Questions About ${post.title}`}
            subtitle="Quick answers to common questions from our patients."
          />
        )}
      </main>
      <Footer />
    </>
  );
}
