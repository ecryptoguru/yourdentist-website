# CODEBASE.md — YourDentist Laser Dental Clinic

> AI agent context for the Astro static site at `/yourdentist-website/`.
> Read this file before any code change to understand architecture, data flow, and conventions.

---

## 1. Project Overview

A premium static marketing site for **Dr. Arpita Dash's YourDentist Laser Dental Clinic** in Bhubaneswar, Odisha. Built with Astro 6 + React islands, Tailwind CSS v4, and an SEO/AEO-first content architecture (106 blog posts, 12 service pages, 9 blog category hubs).

- **Output**: Static build (`dist/`)
- **Hosting**: Cloudflare Workers (auto-deploys on push to `main` via GitHub Actions — do not push without approval)
- **Primary booking flow**: WhatsApp deep-link CTA (no backend)

---

## 2. Tech Stack

| Layer | Technology |
| ------- | ------------ |
| Framework | Astro 6.4 (static, content collections) |
| Islands | React 19 (`@astrojs/react`) — StickyMobileCTA, CookieConsent |
| Language | TypeScript 5 (strict) |
| Styling | Tailwind CSS v4 (`@tailwindcss/vite`) |
| Content | Markdown collections (`src/content/`) + MDX integration |
| SEO | `@astrojs/sitemap` (with lastmod), JSON-LD in `BaseLayout.astro` |
| Fonts | Lora (headings) + Source Sans 3 (body) via Google Fonts |
| Tests | Vitest (jsdom) — 9 test files |

---

## 3. Directory Structure

```text
yourdentist-website/
├── astro.config.mjs         # site URL, trailingSlash, sitemap (lastmod serialize), react/sitemap/mdx/tailwind
├── src/
│   ├── content.config.ts    # collections: blog (106 md) + services (12 md), zod schemas
│   ├── content/
│   │   ├── blog/            # 106 markdown posts (frontmatter: title, excerpt, category, date, readTime, lastUpdated)
│   │   └── services/        # 12 service pages
│   ├── layouts/
│   │   └── BaseLayout.astro # <head>, meta, canonical, OG/Twitter, JSON-LD (Dentist/Person/Org/FAQ/WebPage)
│   ├── layouts components:
│   ├── components/
│   │   ├── Header.astro / Footer.astro / Breadcrumbs.astro (emits BreadcrumbList JSON-LD)
│   │   ├── EmergencyBanner.astro / ScrollToTop.astro / ThemeToggle.astro
│   │   ├── react/           # CookieConsent.tsx, StickyMobileCTA.tsx (client islands)
│   │   └── sections/        # Hero, About, Services, Gallery, Testimonials, Reviews, FAQ, Blog, Contact, Booking, BeforeAfter, Talks
│   ├── lib/
│   │   ├── data.ts          # clinicInfo, doctor, faqItems (10 global FAQs), serviceList, navLinks, videos, photos
│   │   ├── blog-faq.ts      # parseFaq(body) → Q&A pairs for FAQPage JSON-LD; countWords(body)
│   │   ├── blog-categories.ts # slugifyCategory + per-category hub intro/meta copy
│   │   ├── format.ts        # deterministic date formatter (en-US)
│   │   └── utils.ts         # cn() helper
│   ├── pages/
│   │   ├── index.astro, about, achievements, certificates, contact, gallery, videos, 404
│   │   ├── robots.txt.ts    # static robots with sitemap pointer
│   │   ├── blog/index.astro # all posts + category filter chips
│   │   ├── blog/[slug].astro        # post detail: BlogPosting + per-post FAQPage JSON-LD, speakable box, NAP bio
│   │   ├── blog/category/[category].astro # 9 category hubs: ItemList schema, intro copy, chip nav
│   │   └── services/index.astro, services/[slug].astro
│   └── styles/global.css    # Tailwind v4 theme tokens, dark mode, reveal animations
├── tests/                   # vitest: data-integrity, blog-content, accessibility, dark-mode, etc.
└── public/images, /videos   # static assets
```

---

## 4. Architecture Rules

- **Content collections**: blog posts live in `src/content/blog/*.md`. Schema (zod): `title`, `excerpt`, `category`, `date`, `readTime` required; `lastUpdated` optional. Post URL = filename (`/blog/<id>/`).
- **Blog content conventions**: every post ends with `## Frequently asked questions` using `### Question?` + answer paragraphs (parsed by `parseFaq` for FAQPage schema). Posts link to `/services/<slug>/` with local anchor text. No future publish dates (capped at migration date 2026-09-28).
- **Trailing slash**: `trailingSlash: 'always'` — all internal links end with `/`.
- **Server vs client**: `.astro` components are static by default; only `react/` islands hydrate (`client:only` / `client:load`).
- **Reveal animations**: `.reveal` / `.stagger-item` classes animated by IntersectionObserver in `BaseLayout.astro`; disabled on mobile via CSS.
- **Dark mode**: class-based (`documentElement.classList.add('dark')`), inline script in BaseLayout head, theme-color meta swaps.

---

## 5. Data Layer (`lib/data.ts`)

All clinic content lives here — never hardcode clinic data in components.

```ts
clinicInfo     // name, address, phone, phoneLink, whatsapp, email, hours, mapUrl
doctor         // name, title, experience, patients, procedures, bio, specializations
faqItems       // 10 global FAQs (rendered on home + service pages only)
serviceList    // 12 services
navLinks, youtubeVideos, achievementPhotos, certificatePhotos, galleryImages, testimonials
```

---

## 6. Routing & Pages

| Route | File | Notes |
| ------- | ------ | ------- |
| `/` | `pages/index.astro` | 8 sections + global FAQ (includeGlobalFaq) |
| `/about/`, `/achievements/`, `/certificates/`, `/contact/`, `/gallery/`, `/videos/` | static pages | |
| `/blog/` | `pages/blog/index.astro` | all 106 posts, sorted by date, category chips |
| `/blog/<slug>/` | `pages/blog/[slug].astro` | SSG via getStaticPaths |
| `/blog/category/<cat>/` | `pages/blog/category/[category].astro` | 9 hubs, SSG |
| `/services/`, `/services/<slug>/` | `pages/services/*.astro` | 12 services, global FAQ (includeGlobalFaq) |
| `/robots.txt` | `pages/robots.txt.ts` | static, sitemap pointer |
| `/sitemap-index.xml`, `/sitemap-0.xml` | @astrojs/sitemap | lastmod from blog frontmatter |

---

## 7. SEO & Structured Data

### JSON-LD inventory

| Schema | Where |
| ------- | ------ |
| `Dentist`/`MedicalBusiness`/`LocalBusiness` (NAP, geo, hours, offers, ratings) | every page (BaseLayout) |
| `Person` (Dr. Arpita Dash, `@id: .../#person`) | every page (BaseLayout) |
| `Organization` (`@id: .../#organization`) | every page (BaseLayout) |
| `WebPage` (+ speakable) | every page (BaseLayout) |
| `FAQPage` (global 10 FAQs) | **only** home + service pages (`includeGlobalFaq` prop) |
| `BlogPosting` (keywords, articleSection, wordCount, inLanguage, speakable, author/publisher @id refs) | blog posts |
| `FAQPage` (per-post, from `parseFaq`) | blog posts |
| `ItemList` | blog index + category hubs |
| `BreadcrumbList` | all pages with Breadcrumbs component |

### Sitemap lastmod

`astro.config.mjs` reads blog frontmatter at config time (`buildLastmodMap()`): `/blog/<slug>/` → `lastUpdated || date`; category hubs → newest post in category. Static pages get no lastmod.

### AEO/GEO conventions

- Blog posts open with a `.speakable-summary` excerpt box (target of speakable schema).
- Author bio box on posts includes clinic NAP + phone link.
- Category chip on each post links to its hub; related posts = 3 (same category first).

---

## 8. Content Conventions

- **Date formatting**: always `formatDate()` from `lib/format.ts` (never `toLocaleDateString` in JSX/templates — hydration safety).
- **WhatsApp CTA**: `clinicInfo.whatsapp` deep link.
- **Tables/bullets in blog markdown**: `| x |` pipe style with `| --- |` separators; `- ` bullets.
- **FAQ format**: `### Question?` heading, answer paragraph(s) directly below, no blank line between Q and A.

---

## 9. Build & Deploy

```bash
npm run dev        # astro dev
npm run build      # astro build -> dist/
npm run preview    # serve dist/
npm run check      # astro check (types)
npm test           # vitest run
```

Deploy: push to `main` → GitHub Actions builds and deploys to Cloudflare Workers (`wrangler.github.jsonc`). **Never push without user approval.**

---

## 10. Key File References

| Purpose | File |
| --------- | ------ |
| Clinic data | `src/lib/data.ts` |
| FAQ extraction for schema | `src/lib/blog-faq.ts` |
| Category slugs + hub copy | `src/lib/blog-categories.ts` |
| Site metadata & JSON-LD | `src/layouts/BaseLayout.astro` |
| Blog post template | `src/pages/blog/[slug].astro` |
| Category hubs | `src/pages/blog/category/[category].astro` |
| Sitemap lastmod | `astro.config.mjs` |
| Blog content rules (tests) | `tests/blog-content.test.ts` |
