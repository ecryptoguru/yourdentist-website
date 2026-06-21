# CODEBASE.md — YourDentist Laser Dental Clinic

> AI agent context for the Next.js 16 static site at `/yourdentist-website/`.
> Read this file before any code change to understand architecture, data flow, and conventions.

---

## 1. Project Overview

A premium static marketing site for **Dr. Arpita Dash's YourDentist Laser Dental Clinic** in Bhubaneswar, Odisha. It clones all content from the original `yourdentistdentalclinic.com` website into a modern Next.js 16 stack with fluid animations and SEO-first architecture.

- **Output**: Static HTML export (`output: "export"`)
- **Target hosts**: Vercel, Netlify, Cloudflare Pages, any static host
- **Primary booking flow**: WhatsApp deep-link CTA (no backend)

---

## 2. Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 16.2.6 (App Router, Turbopack) |
| Language | TypeScript 5 (strict) |
| Styling | Tailwind CSS v4 (`@theme` CSS-first config) |
| UI Library | shadcn/ui (base-nova style, RSC) |
| Animation | Framer Motion (scroll reveals) + GSAP 3 (hero timeline) |
| Icons | Lucide React |
| Fonts | Playfair Display (display/headings) + Inter (body) via `next/font/google` |

---

## 3. Directory Structure

```
yourdentist-website/
├── next.config.ts           # static export, unoptimized images, trailingSlash
├── tsconfig.json            # path alias @/* -> ./src/*
├── components.json          # shadcn/ui config (base-nova, CSS variables)
├── src/
│   ├── app/
│   │   ├── layout.tsx       # RootLayout: fonts, metadata, JSON-LD, viewport
│   │   ├── page.tsx         # Home: composes 8 sections
│   │   ├── globals.css      # Tailwind v4 theme tokens + custom colors
│   │   ├── not-found.tsx    # 404 page
│   │   ├── robots.ts        # force-static, allow all
│   │   ├── sitemap.ts       # force-static, 28 URLs
│   │   ├── about/page.tsx
│   │   ├── achievements/page.tsx
│   │   ├── certificates/page.tsx
│   │   ├── contact/page.tsx
│   │   ├── gallery/page.tsx
│   │   ├── services/page.tsx
│   │   ├── services/[slug]/page.tsx   # 12 service detail pages
│   │   ├── blog/page.tsx
│   │   └── blog/[slug]/page.tsx      # 8 blog posts
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx      # sticky, scroll-aware, mobile sheet
│   │   │   └── Footer.tsx      # RSC (no "use client"), 4-column
│   │   ├── motion/
│   │   │   ├── FadeIn.tsx      # Framer Motion viewport reveal wrapper
│   │   │   └── StaggerContainer.tsx  # parent/child stagger variants
│   │   ├── sections/
│   │   │   ├── HeroSection.tsx      # GSAP cinematic timeline + stats
│   │   │   ├── AboutSection.tsx     # doctor profile, cert/achiev links
│   │   │   ├── ServicesSection.tsx  # 12-card grid linking to detail pages
│   │   │   ├── GallerySection.tsx   # masonry grid + Dialog lightbox
│   │   │   ├── TestimonialsSection.tsx  # Carousel (6 reviews)
│   │   │   ├── TalksSection.tsx    # video thumbnails + Dialog
│   │   │   ├── BlogSection.tsx     # featured post + 3 recent
│   │   │   └── ContactSection.tsx  # info cards + map placeholder
│   │   └── ui/                # shadcn components (auto-installed)
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── badge.tsx
│   │       ├── sheet.tsx
│   │       ├── dialog.tsx
│   │       ├── carousel.tsx
│   │       ├── separator.tsx
│   │       ├── accordion.tsx
│   │       ├── scroll-area.tsx
│   │       └── avatar.tsx
│   ├── lib/
│   │   ├── data.ts            # ALL content: clinic, doctor, services, testimonials, blog, gallery, nav
│   │   ├── icons.ts           # shared serviceIconMap (12 Lucide icons)
│   │   ├── format.ts          # deterministic date formatter (en-US)
│   │   └── utils.ts           # cn() helper (clsx + tailwind-merge)
│   └── types/
│       └── index.ts             # shared TypeScript types
├── public/
│   ├── images/                # placeholder for real clinic photos
│   └── favicon.ico
```

---

## 4. Architecture Rules

### Static Export Constraints
- `output: "export"` in `next.config.ts` — **no API routes, no dynamic server features**
- `images.unoptimized: true` — Next.js Image component requires this for static export
- `trailingSlash: true` — all routes end in `/`
- Route handlers (`robots.ts`, `sitemap.ts`) must declare `export const dynamic = "force-static"`

### Server vs Client Components
| Pattern | Rule |
|---------|------|
| Pages | Server Components by default (no `"use client"`) |
| Sections | `"use client"` only if they use GSAP, Framer Motion, or React state |
| Layout (Header) | `"use client"` because it uses `usePathname`, `useState`, `useEffect` |
| Footer | RSC (no hooks) — renders statically, smaller bundle |
| Animation wrappers | `"use client"` — `FadeIn.tsx`, `StaggerContainer.tsx` |

### shadcn/ui Conventions
- Style: `base-nova` (not default/new-york)
- Uses CSS variables defined in `globals.css` `:root`
- Icons from `lucide-react` (never `react-icons`)
- The `SheetClose` component does **NOT** accept `asChild` prop — always wrap `SheetClose` around the clickable element directly

### Tailwind v4 Conventions
- Custom colors defined in `@theme inline` block in `globals.css`
- **Use v4 native utilities**: `bg-linear-to-br` (not `bg-gradient-to-br`), `aspect-4/5` (not `aspect-[4/5]`), `rounded-4xl` (not `rounded-[2rem]`)
- Custom palette:
  - **Teal** `#0D9488` — primary brand color (trust, health)
  - **Amber** `#D97706` — accent warmth
  - **Warm** `#FAFAF9` — backgrounds

---

## 5. Data Layer (`lib/data.ts`)

All website content lives in a single source-of-truth file. **Never hardcode** clinic data in components — always import from `lib/data.ts`.

### Exported Data Objects

```ts
clinicInfo     // name, address, phone, whatsapp, email, hours, copyright
doctor         // name, title, experience, patients, procedures, bio, philosophy, specializations
services       // 12 objects: { id, slug, title, shortDescription, fullDescription, benefits[], process[], icon }
testimonials   // 6 objects: { id, name, initials, text, rating }
galleryImages  // 8 objects: { id, src, alt }
blogPosts      // 8 objects: { slug, title, excerpt, category, date, readTime, content, faq[] }
navLinks       // 6 objects: { label, href }
```

### Service Icons
Each service has an `icon` string key. The mapping lives in `lib/icons.ts` as `serviceIconMap`:

```ts
import { serviceIconMap } from "@/lib/icons";
const Icon = serviceIconMap[service.icon] || serviceIconMap.Heart;
```

Supported keys: `Heart`, `AlignCenterHorizontal`, `CircleDot`, `Smile`, `Sparkles`, `Sun`, `Hammer`, `Palette`, `Scissors`, `Zap`, `Anchor`, `Baby`.

> **Known issue**: `services/page.tsx` still defines its own local `iconMap` — a refactor TODO is to import `serviceIconMap` instead for DRY consistency.

---

## 6. Routing & Pages

| Route | File | Type | Notes |
|-------|------|------|-------|
| `/` | `app/page.tsx` | Static | Composes 8 sections |
| `/about/` | `app/about/page.tsx` | Static | Doctor bio, stats, specializations |
| `/services/` | `app/services/page.tsx` | Static | Grid of 12 services |
| `/services/[slug]/` | `app/services/[slug]/page.tsx` | SSG | `generateStaticParams()` for all 12 |
| `/blog/` | `app/blog/page.tsx` | Static | Grid of 8 posts |
| `/blog/[slug]/` | `app/blog/[slug]/page.tsx` | SSG | `generateStaticParams()` for all 8 |
| `/gallery/` | `app/gallery/page.tsx` | Static | Clinic photo grid |
| `/contact/` | `app/contact/page.tsx` | Static | Reuses `ContactSection` |
| `/certificates/` | `app/certificates/page.tsx` | Static | Credential list |
| `/achievements/` | `app/achievements/page.tsx` | Static | Milestone cards |
| `/robots.txt` | `app/robots.ts` | Route handler | `force-static` |
| `/sitemap.xml` | `app/sitemap.ts` | Route handler | `force-static`, 28 URLs |

### Dynamic Route Pattern
Service detail and blog detail pages follow the same pattern:

```ts
export async function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const item = data.find((d) => d.slug === slug);
  return { title: item?.title, description: item?.description };
}

export default async function Page({ params }) {
  const { slug } = await params;
  // ...
}
```

---

## 7. Animation System

### Framer Motion (scroll-triggered reveals)
- **`<FadeIn>`** — single element entrance (opacity + translate)
  - Props: `direction` (up/down/left/right), `delay`, `duration`, `className`
  - Uses `whileInView` with `viewport={{ once: true, margin: "-50px" }}`
- **`<StaggerContainer>` + `<StaggerItem>`** — parent orchestrates child stagger
  - Props: `staggerDelay`, `className`

### GSAP (hero cinematic entrance)
- **`<HeroSection>`** uses `useEffect` + `gsap.context()` for timeline cleanup
- Timeline sequence: title → subtitle → description → CTA → image → stats
- Always cleans up with `ctx.revert()` on unmount

### Accessibility
- `prefers-reduced-motion` CSS in `globals.css` forces instant transitions
- GSAP timeline does NOT auto-respect this — currently the CSS layer handles it for Framer Motion only. GSAP reduction is a future enhancement.

---

## 8. SEO & Structured Data

### Metadata (per page)
Every page exports `metadata: Metadata` with:
- `title` (uses `metadata.title.template` from layout)
- `description`
- Open Graph tags
- Twitter card tags

### Root layout (`app/layout.tsx`)
- `viewport` export: `width=device-width, initialScale=1, themeColor: "#0d9488"`
- `alternates.canonical` set to root domain
- JSON-LD `MedicalBusiness` schema with:
  - Address, geo coordinates, opening hours
  - `AggregateRating` (4.9 / 150 reviews)
- `metadataBase` for absolute OG/Twitter image URLs

### Sitemap (`app/sitemap.ts`)
- 28 URLs: home + 7 static + 12 services + 8 blog posts
- `lastmod` auto-generated at build time

---

## 9. Content Conventions

### Date Formatting
Never use `new Date().toLocaleDateString()` directly in JSX — it causes hydration mismatches. Always use the shared formatter:

```ts
import { formatDate } from "@/lib/format";
formatDate(post.date); // defaults to "short day numeric year"
formatDate(post.date, { month: "long", day: "numeric" });
```

### WhatsApp Booking CTA
All booking buttons use the same deep-link from `clinicInfo.whatsapp`:
```
https://wa.me/917064719630?text=Hi,%20I%20would%20like%20to%20book%20an%20appointment.
```

### Image Placeholders
All images currently use gradient placeholder divs (`bg-linear-to-br`) with text labels. Replacing with real clinic photos:
1. Add images to `public/images/`
2. Update `src` paths in `lib/data.ts` (gallery, doctor image, blog featured images)
3. Remove placeholder gradient divs, replace with `<img>` or Next.js Image

---

## 10. Known Issues & TODOs

| Priority | Issue | Location |
|----------|-------|----------|
| Low | `services/page.tsx` defines its own `iconMap` instead of importing `serviceIconMap` | `app/services/page.tsx` |
| Low | Blog markdown parser in `blog/[slug]/page.tsx` is naive (`startsWith("## ")`, `startsWith("- ")`) | `app/blog/[slug]/page.tsx` |
| Low | Gallery / video lightbox use placeholder divs, not real media | `GallerySection.tsx`, `TalksSection.tsx` |
| Low | No `loading.tsx` or `error.tsx` boundary files | `app/` root |
| Low | GSAP hero animation does not read `prefers-reduced-motion` | `HeroSection.tsx` |
| Future | Consider MDX or content layer for blog posts | architectural |
| Future | Add `manifest.json` if PWA support desired | `public/` |

---

## 11. Build & Deploy

```bash
# Development
npm run dev

# Production build (static export)
npm run build
# Output directory: ./out/

# Type check only
npx tsc --noEmit
```

Deploy the `out/` folder to any static host:
- **Vercel**: `vercel --prod`
- **Netlify**: drag `out/` folder
- **Cloudflare Pages**: upload `out/`

---

## 12. Key File References

| Purpose | File |
|---------|------|
| All content data | `src/lib/data.ts` |
| Service icon mapping | `src/lib/icons.ts` |
| Date formatter | `src/lib/format.ts` |
| Tailwind theme + colors | `src/app/globals.css` |
| Site metadata & JSON-LD | `src/app/layout.tsx` |
| Shared animation components | `src/components/motion/*.tsx` |
| Section components | `src/components/sections/*.tsx` |
| Layout shell | `src/components/layout/Header.tsx`, `Footer.tsx` |
