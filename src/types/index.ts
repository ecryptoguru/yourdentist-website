export interface Service {
  id: number;
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  benefits: string[];
  process: string[];
  icon: string;
  priceRange: string;
}

export interface Testimonial {
  id: number;
  name: string;
  initials: string;
  rating: number;
  text: string;
}

export interface GalleryImage {
  id: number;
  src: string;
  alt: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  content: string;
  faq: { question: string; answer: string }[];
}

export interface NavLink {
  label: string;
  href: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}
