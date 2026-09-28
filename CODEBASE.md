# CODEBASE.md — YourDentist Laser Dental Clinic

> AI agent context for the Astro static site at `/yourdentist-website/`.
> Read this file before any code change to understand architecture, data flow, and conventions.

---

## 1. Project Overview

A premium static marketing site for **Dr. Arpita Dash's YourDentist Laser Dental Clinic** in Bhubaneswar, Odisha. Built with Astro 6, Tailwind CSS v4, and an SEO/AEO-first content architecture (106 blog posts, 12 service pages, 9 blog category hubs). **Zero client frameworks** — all interactivity is vanilla JS in `.astro` components (React was removed).

- **Output**: Static build (`dist/`)
- **Hosting**: Cloudflare Workers (auto-deploys on push to `main` via GitHub Actions — do not push without approval)
- **Primary booking flow**: WhatsApp deep-link CTA (no backend)

---

## 2. Tech Stack

| Layer | Technology |
| ------- | ------------ |
| Framework | Astro 6.4 (static, content collections) |
| Islands | **None** — vanilla `<script>` in `.astro` components (StickyMobileCTA.astro etc.) |
| Language | TypeScript 5 (strict) |
| Styling | Tailwind CSS v4 (`@tailwindcss/vite`) |
| Content | Markdown collections (`src/content/`) + `rehype-slug` heading anchors |
| SEO | `@astrojs/sitemap` (with lastmod), JSON-LD in `BaseLayout.astro` via `jsonLd()` |
| Fonts | Lora (headings) + Source Sans 3 (body) — **self-hosted** in `public/fonts/` |
| Tests | Vitest (jsdom) — 11 test files |

---

## 3. Directory Structure

```text
yourdentist-website/
├── astro.config.mjs         # site URL, trailingSlash, sitemap (lastmod serialize), rehype-slug, tailwind
├── src/
│   ├── content.config.ts    # collections: blog (106 md) + services (12 md), zod schemas
│   ├── content/
│   │   ├── blog/            # 106 markdown posts (frontmatter: title, excerpt, category, date, readTime, lastUpdated)
│   │   └── services/        # 12 service pages
│   ├── layouts/
│   │   └── BaseLayout.astro # <head>, meta, canonical, OG/Twitter, JSON-LD (Dentist/Person/Org/FAQ/WebPage)
│   ├── components/
│   │   ├── Header.astro / Footer.astro / Breadcrumbs.astro (emits BreadcrumbList JSON-LD)
│   │   ├── EmergencyBanner.astro / ScrollToTop.astro / ThemeToggle.astro / StickyMobileCTA.astro
│   │   └── sections/        # Hero, About, Services, Gallery, Testimonials, Reviews, FAQ, Blog, Contact, Booking, BeforeAfter, Talks
│   ├── lib/
│   │   ├── data.ts          # clinicInfo, doctor, faqItems (10 global FAQs), serviceList, serviceRelated, navLinks, videos, photos
│   │   ├── site.ts          # SITE_URL + absoluteUrl() — single source for the canonical origin
│   │   ├── json-ld.ts       # jsonLd() (escaped) + buildBreadcrumbSchema()
│   │   ├── blog-faq.ts      # parseFaq(body), countWords(body), extractToc(body)
│   │   ├── blog-categories.ts # slugifyCategory + per-category hub intro/meta copy
│   │   ├── sitemap-lastmod.ts # buildLastmodMap() used by astro.config
│   │   ├── icons.ts         # getServiceIcon() — inline lucide SVG paths per service
│   │   └── format.ts        # deterministic date formatter (en-IN, timeZone UTC)
│   ├── pages/
│   │   ├── index.astro, about, achievements, certificates, contact, gallery, videos, 404
│   │   ├── robots.txt.ts    # static robots with sitemap pointer
│   │   ├── blog/index.astro # all posts + category chips + client-side search
│   │   ├── blog/[slug].astro        # post detail: BlogPosting + per-post FAQPage JSON-LD, TOC, prev/next, speakable box, NAP bio
│   │   ├── blog/category/[category].astro # 9 category hubs: ItemList schema, intro copy, chip nav
│   │   └── services/index.astro, services/[slug].astro
│   └── styles/global.css    # Tailwind v4 theme tokens, dark mode, reveal animations, @font-face
├── scripts/gen-covers.mjs   # regenerates og/*.jpg from blog covers + resized hero assets
├── tests/                   # vitest: data-integrity, blog-content, schema-output, accessibility, dark-mode, etc.
└── public/images, /videos, /fonts  # static assets (blog covers, og rasters, video posters)
```

**Untracked/ignored**: `assets/` (96MB archive dup of public/images), `humanizer-main/` (third-party plugin), `.astro/` (generated cache), `updated blogs/` (migration source). Don't re-add them.

---

## 4. Architecture Rules

- **Content collections**: blog posts live in `src/content/blog/*.md`. Schema (zod): `title`, `excerpt`, `category`, `date`, `readTime` required; `lastUpdated` optional. Post URL = filename (`/blog/<id>/`).
- **Blog content conventions**: every post ends with `## Frequently asked questions` using `### Question?` + answer paragraphs (parsed by `parseFaq` for FAQPage schema). Posts link to `/services/<slug>/` with local anchor text. No future publish dates (capped at migration date 2026-09-28).
- **Trailing slash**: `trailingSlash: 'always'` — all internal links end with `/`.
- **No client islands**: every interactive widget is `.astro` + vanilla `<script>` (no hydration, no framework JS). Keep it that way.
- **Reveal animations**: `.reveal` / `.stagger-item` classes animated by IntersectionObserver in `BaseLayout.astro`; stagger delays capped with `Math.min(i, 8)`. `<html>` starts as `class="no-js"` and the head script removes it — `html.no-js` CSS keeps everything visible without JS. Always pair hidden-by-default classes with the `no-js` fallback.
- **Dark mode**: class-based (`documentElement.classList.add('dark')`), inline script in BaseLayout head, theme-color meta swaps. Note: `.dark` remaps `--color-slate-*` to a warm scale (`global.css`) — `slate-*` utilities change meaning in dark mode deliberately; new components should use `warm-*`/`teal-*` for dark variants.
- **Emergency banner**: `html.no-emergency` hides it pre-paint (set by head script from sessionStorage); Header positions itself from `banner.offsetHeight` (0 when hidden).
- **format-detection**: `telephone=no` is deliberate — prevents iOS auto-linking numbers; use `tel:` links (`clinicInfo.phoneLink`) instead.

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
| `Dentist`/`MedicalBusiness`/`LocalBusiness` (NAP, geo, hours, offers — **no self-serving review markup**) | every page (BaseLayout) |
| `Person` (Dr. Arpita Dash, `@id: .../#person`) | every page (BaseLayout) |
| `Organization` (`@id: .../#organization`) | every page (BaseLayout) |
| `WebPage` (+ speakable) | every page (BaseLayout) |
| `FAQPage` (global 10 FAQs) | **only** home + service pages (`includeGlobalFaq` prop) |
| `BlogPosting` (keywords, articleSection, wordCount, inLanguage, speakable, author/publisher @id refs) | blog posts |
| `FAQPage` (per-post, from `parseFaq`) | blog posts |
| `ItemList` | blog index + category hubs |
| `BreadcrumbList` | all pages with Breadcrumbs component |

### Sitemap lastmod

`src/lib/sitemap-lastmod.ts` (`buildLastmodMap()`) reads blog frontmatter at config time: `/blog/<slug>/` → `lastUpdated || date`; category hubs → newest post in category. Static pages get no lastmod.

### Canonical URL + JSON-LD rules

- **`SITE_URL` from `src/lib/site.ts`** is the only place the origin is hardcoded — never inline `https://www.yourdentistdentalclinic.com` in pages/components.
- **`jsonLd()` from `src/lib/json-ld.ts`** is required for every `set:html` JSON-LD emission (escapes `<` → `\u003c`). `buildBreadcrumbSchema()` normalizes relative and absolute `href`s.
- **og:image**: default `/images/og/default.jpg` (real 1200×630); blog posts + category hubs use `/images/og/<category-slug>.jpg` (regenerate via `node scripts/gen-covers.mjs` when covers change).

### AEO/GEO conventions

- Blog posts open with a `.speakable-summary` excerpt box (target of speakable schema).
- Author bio box on posts includes clinic NAP + phone link.
- Category chip on each post links to its hub; related posts = up to 6 (same category, date-sorted, then cross-category fill).
- Post TOC auto-builds from `##` headings (`extractToc` + `rehype-slug` anchors); prev/next links are chronological.
- `lastReviewed` (WebPage schema) = post `lastUpdated || date` on blog posts; omitted elsewhere.

---

## 8. Content Conventions

- **Date formatting**: always `formatDate()` from `lib/format.ts` (en-IN + `timeZone:'UTC'` — deterministic across build machines; never `toLocaleDateString` in templates).
- **Pricing consistency**: YourDentist single-tooth implant = **₹15,000–₹50,000** everywhere (posts, FAQ, service frontmatter). City/clinic comparison figures in dedicated comparison tables may differ — those describe the market, not our prices.
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
npm run lint       # eslint (eslint-plugin-astro + typescript-eslint)
npm test           # vitest run (includes dist-output checks — run after build)
node scripts/gen-covers.mjs  # regenerate og rasters + hero webp when covers/photos change
```

Deploy: push to `main` → GitHub Actions runs **check → build → test → deploy** to Cloudflare Workers (`wrangler.github.jsonc`). **Never push without user approval.**

---

## 10. Key File References

| Purpose | File |
| --------- | ------ |
| Clinic data | `src/lib/data.ts` |
| Canonical site URL | `src/lib/site.ts` |
| JSON-LD helper + breadcrumb schema | `src/lib/json-ld.ts` |
| FAQ/TOC/word extraction | `src/lib/blog-faq.ts` |
| Category slugs + hub copy | `src/lib/blog-categories.ts` |
| Sitemap lastmod map | `src/lib/sitemap-lastmod.ts` |
| Service icon SVG paths | `src/lib/icons.ts` |
| Site metadata & JSON-LD | `src/layouts/BaseLayout.astro` |
| Blog post template | `src/pages/blog/[slug].astro` |
| Category hubs | `src/pages/blog/category/[category].astro` |
| Sitemap lastmod | `astro.config.mjs` |
| Blog content rules (tests) | `tests/blog-content.test.ts` |
| Schema output rules (tests) | `tests/schema-output.test.ts` |
| og/cover/hero asset generator | `scripts/gen-covers.mjs` |
