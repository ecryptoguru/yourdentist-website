import { MetadataRoute } from "next";
import { services, blogPosts } from "@/lib/data";

export const dynamic = "force-static";

const LAST_MODIFIED = new Date("2025-05-18");

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.yourdentistdentalclinic.com";

  const staticPages = [
    "",
    "about/",
    "services/",
    "gallery/",
    "blog/",
    "contact/",
    "certificates/",
    "achievements/",
  ];

  const servicePages = services.map((service) => `services/${service.slug}/`);
  const blogPages = blogPosts.map((post) => `blog/${post.slug}/`);

  const allPages = [...staticPages, ...servicePages, ...blogPages];

  return allPages.map((page) => ({
    url: `${baseUrl}/${page}`,
    lastModified: LAST_MODIFIED,
    changeFrequency: page === "" ? "weekly" : "monthly",
    priority: page === "" ? 1 : 0.8,
  }));
}
