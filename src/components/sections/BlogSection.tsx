"use client";

import Link from "next/link";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { FadeIn } from "@/components/motion/FadeIn";
import {
  StaggerContainer,
  StaggerItem,
} from "@/components/motion/StaggerContainer";
import { blogPosts } from "@/lib/data";
import { formatDate } from "@/lib/format";

export function BlogSection() {
  const featuredPost = blogPosts[0];
  const recentPosts = blogPosts.slice(1, 4);

  return (
    <section className="section-padding bg-cream relative" id="blog">
      <div className="absolute inset-0 bg-dot-grid-subtle opacity-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <FadeIn className="text-center mb-16 lg:mb-20">
          <span className="text-teal-700 font-medium text-sm tracking-[0.15em] uppercase">
            Our Blog
          </span>
          <h2 className="font-heading text-4xl sm:text-[42px] font-semibold text-slate-900 mt-4 mb-5 tracking-tight leading-[1.1]">
            Dental Health <span className="text-gradient-teal">Insights</span>
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-[15px] leading-relaxed">
            Expert advice, treatment guides, and tips for maintaining a healthy
            smile.
          </p>
        </FadeIn>

        <div className="grid lg:grid-cols-2 gap-6 mb-12">
          {/* Featured Post */}
          <FadeIn>
            <Link href={`/blog/${featuredPost.slug}`}>
              <div className="group bg-white rounded-xl overflow-hidden border border-slate-200/60 h-full shadow-premium hover:shadow-premium-hover transition-all duration-300">
                <div className="aspect-video bg-teal-50 flex items-center justify-center border-b border-slate-100">
                  <span className="text-slate-500 font-medium text-sm">
                    Featured Image
                  </span>
                </div>
                <div className="p-8">
                  <Badge className="bg-teal-50 text-teal-700 hover:bg-teal-100 border border-teal-100 mb-4 font-medium text-xs">
                    {featuredPost.category}
                  </Badge>
                  <h3 className="font-heading text-xl font-semibold text-slate-900 mb-3 group-hover:text-teal-800 transition-colors duration-300 leading-snug">
                    {featuredPost.title}
                  </h3>
                  <p className="text-slate-500 text-[15px] leading-relaxed mb-5">
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-slate-500">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      {formatDate(featuredPost.date)}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      {featuredPost.readTime}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </FadeIn>

          {/* Recent Posts List */}
          <StaggerContainer staggerDelay={0.1} className="flex flex-col gap-5">
            {recentPosts.map((post) => (
              <StaggerItem key={post.slug}>
                <Link href={`/blog/${post.slug}`}>
                  <div className="group flex gap-5 bg-white rounded-xl p-5 border border-slate-200/60 shadow-premium hover:shadow-premium-hover hover:-translate-y-0.5 transition-all duration-300">
                    <div className="w-24 h-24 bg-teal-50 rounded-lg shrink-0 flex items-center justify-center border border-slate-100">
                      <span className="text-slate-300 text-xs font-medium">
                        IMG
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <Badge
                        variant="outline"
                        className="text-xs mb-2 border-teal-200 text-teal-700 font-medium"
                      >
                        {post.category}
                      </Badge>
                      <h4 className="font-heading font-semibold text-slate-900 mb-2 group-hover:text-teal-800 transition-colors duration-300 line-clamp-2 text-[15px] leading-snug">
                        {post.title}
                      </h4>
                      <div className="flex items-center gap-3 text-xs text-slate-500">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {formatDate(post.date, {
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {post.readTime}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>

        <FadeIn className="text-center">
          <Link href="/blog">
            <span className="inline-flex items-center gap-2 text-teal-700 font-medium text-sm hover:gap-3 transition-all duration-300 group">
              View All Articles
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </span>
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}
