import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FadeIn } from "@/components/motion/FadeIn";
import {
  StaggerContainer,
  StaggerItem,
} from "@/components/motion/StaggerContainer";
import { Badge } from "@/components/ui/badge";
import { blogPosts } from "@/lib/data";
import { formatDate } from "@/lib/format";
import { Calendar, Clock, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Dental Health Blog",
  description:
    "Expert dental health tips, treatment guides, and insights from Dr. Arpita Dash. Stay informed about oral health.",
};

export default function BlogPage() {
  return (
    <>
      <Header />
      <main className="flex-1 pt-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <FadeIn className="text-center mb-16 lg:mb-20">
            <span className="text-teal-700 font-medium text-sm tracking-[0.15em] uppercase">
              Blog
            </span>
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-[56px] font-semibold text-slate-900 mt-4 mb-5 tracking-tight leading-[1.1]">
              Dental Health <span className="text-gradient-teal">Insights</span>
            </h1>
            <p className="text-slate-500 max-w-2xl mx-auto text-[15px] leading-relaxed">
              Expert advice, treatment guides, and tips for maintaining a
              healthy smile from Dr. Arpita Dash.
            </p>
          </FadeIn>

          <StaggerContainer
            staggerDelay={0.1}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {blogPosts.map((post) => (
              <StaggerItem key={post.slug}>
                <Link href={`/blog/${post.slug}`}>
                  <article className="group bg-white rounded-xl overflow-hidden border border-slate-200/60 h-full shadow-premium hover:shadow-premium-hover hover:-translate-y-1 transition-all duration-300">
                    <div className="aspect-video bg-teal-50 flex items-center justify-center border-b border-slate-100">
                      <span className="text-slate-500 font-medium text-sm">
                        {post.category}
                      </span>
                    </div>
                    <div className="p-7">
                      <Badge className="bg-teal-50 text-teal-700 hover:bg-teal-100 border border-teal-100 mb-3 font-medium text-xs">
                        {post.category}
                      </Badge>
                      <h2 className="font-heading text-lg font-semibold text-slate-900 mb-3 group-hover:text-teal-800 transition-colors duration-300 line-clamp-2 leading-snug">
                        {post.title}
                      </h2>
                      <p className="text-slate-500 text-[14px] mb-5 line-clamp-3 leading-relaxed">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 text-xs text-slate-500">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {formatDate(post.date)}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {post.readTime}
                          </span>
                        </div>
                        <ArrowRight className="w-4 h-4 text-teal-700 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-0.5" />
                      </div>
                    </div>
                  </article>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </main>
      <Footer />
    </>
  );
}
