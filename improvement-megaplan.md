# Improvement Megaplan — Best UX, Performance, SEO & Hygiene Roadmap

> Generated from the multi-domain code review (2026-09-28, commit `8a0a8b0`).
> Every item cites file:line evidence. Ordered by phase: **P0 verified bugs → P1 performance → P2 SEO/schema → P3 UX depth → P4 infra/hygiene**.
> Work phases independently; each item lists its own verification. **No push to `main` without explicit approval — push auto-deploys to Cloudflare Workers.**

**Finding IDs** (`F#`) reference the Review Report for cross-checking.

---

## Phase 0 — Verified Bug Fixes (quick wins, no design decisions)

### F1. BreadcrumbList double-URL on all 9 category hubs — 🔴 shipped-schema bug

- **Evidence**: `src/pages/blog/category/[category].astro:51` passes absolute `categoryUrl` as breadcrumb `href`; `src/components/Breadcrumbs.astro:20` unconditionally prepends `https://www.yourdentistdentalclinic.com`. Rendered dist output contains `item: "https://www.yourdentistdentalclinic.comhttps://www.yourdentistdentalclinic.com/blog/category/orthodontics/"`.
- **Fix**: Pass a relative path (`/blog/category/${slug}/`) as `href` on the category page; keep Breadcrumbs' absolute-URL logic for the schema (or make it normalize `href` via `new URL(href, siteUrl)` so both forms work).
- **Verify**: `npm run build` then check any `dist/blog/category/*/index.html` BreadcrumbList JSON-LD has well-formed absolute URLs; add the regression test in F32.

### F2. Unbounded stagger delay on blog index — 🔴 UX bug

- **Evidence**: `src/pages/blog/index.astro:61` emits `transition-delay: ${i * 0.1}s` for all 106 cards → 10.5s delay on the last card. Dist confirms `transition-delay: 10.3s–10.5s`. Category hubs correctly cap via `Math.min(i, 8)` (`category/[category].astro:81`).
- **Fix**: `Math.min(i, 8) * 0.1` — mirror the hub pattern.
- **Verify**: `grep -o 'transition-delay: [0-9.]*' dist/blog/index.html | sort -rn | head` shows ≤ 0.8s.

### F3. Dead hero scroll indicator

- **Evidence**: `src/components/sections/HeroSection.astro:167` targets `#about`; the section id is `clinic-about` (`src/pages/index.astro:24`). Optional chaining swallows the miss — the button silently does nothing.
- **Fix**: Point to `#clinic-about` (or the next visible section after the hero).
- **Verify**: Click "Scroll to explore" in a browser — page scrolls to the About section.

### F4. Dead no-JS fallback (invisible content without JS) — 🔴 robustness

- **Evidence**: `src/styles/global.css:388-394` defines `html.no-js .reveal` overrides, but nothing ever adds `no-js` to `<html>` (`BaseLayout.astro` head script only sets theme). Without JS, all `.reveal`/`.stagger-item`/`.reveal-up` content stays `opacity: 0`, and hero elements start `opacity-0` (HeroSection:19-77).
- **Fix**: Standard pattern — emit `class="no-js h-full antialiased"` on `<html>` and remove `no-js` in the inline head script (same script that sets `.dark`). The CSS fallback then activates automatically when JS is absent.
- **Verify**: Load a page with JS disabled — content must be fully visible. `grep 'no-js' dist/index.html` shows the class on `<html>` and removal in the inline script.

### F5. Service "icons" render as stray letters

- **Evidence**: `src/pages/services/index.astro:50`, `src/pages/services/[slug].astro:83,171` render `data.icon.charAt(0)` where `icon` holds lucide names — `"Heart"`→"H", `"Zap"`→"Z", `"Anchor"`→"A". All 12 service cards + detail headers show random letters.
- **Fix**: Create a small `ServiceIcon.astro` that maps each of the 12 `serviceList` icon names to its inline SVG path (copy paths from lucide, as done elsewhere in the codebase — no new dependency). Replace all three `charAt(0)` usages.
- **Verify**: `npm run check`; services index shows real icons; detail + related cards too.

### F6. Build-time staleness baked into pages

- **6a. Booking form date min/max** — `src/components/sections/BookingForm.astro:3-4` bakes `today`/`maxDate` at build; on a static site the `min` goes stale and past dates become selectable as the site ages.
  - **Fix**: Remove `min`/`max` attributes in markup; set them in the existing `<script>` on load (`dateInput.min = new Date().toISOString().split('T')[0]`).
  - **Verify**: `dist/index.html` has no hardcoded `min="YYYY-MM-DD"`; browser shows today's date as min.
- **6b. WebPage `lastReviewed` fabricates build-day freshness** — `BaseLayout.astro:251` `lastReviewed: new Date()` claims "reviewed today" on all ~130 pages at every build.
  - **Fix**: Accept an optional `lastReviewed` prop; blog posts pass `lastUpdated || date`, service pages pass a curated date, static pages omit it.
  - **Verify**: `grep 'lastReviewed' dist/blog/<any>/index.html` shows the post date, not build day.

### F7. Related posts unsorted within category

- **Evidence**: `src/pages/blog/[slug].astro:33-40` — same-category filter keeps collection order; only the cross-category filler is date-sorted.
- **Fix**: Sort the same-category slice by `date` desc before concatenation.
- **Verify**: On a post in a 12+ post category, "Related Articles" = 3 newest same-category posts.

### F8. `formatDate` is build-TZ dependent (+ docs drift)

- **Evidence**: `src/lib/format.ts:9-10` — date-only strings parse as UTC midnight, then `Intl.DateTimeFormat("en-IN")` formats in the build machine's timezone → rendered dates can shift a day. CODEBASE.md:55 claims "en-US deterministic" but the code says `en-IN` (needs `timeZone: 'UTC'` to be deterministic).
- **Fix**: Add `timeZone: 'UTC'` to the formatter options; reconcile CODEBASE.md wording.
- **Verify**: Date renders identically under `TZ=America/New_York npm run build` vs `TZ=Asia/Kolkata npm run build`.

### F9. Mobile-menu phone link shows WhatsApp glyph

- **Evidence**: `src/components/Header.astro:180-182` reuses the WhatsApp SVG for the `tel:` link.
- **Fix**: Swap to a phone handset SVG path.
- **Verify**: Mobile menu footer shows a phone icon next to the number.

### F27. Nav active state lacks `aria-current`

- **Evidence**: `Header.astro:56-68` — `isActive` only adds classes.
- **Fix**: Add `aria-current="page"` on the active desktop + mobile nav link.
- **Verify**: `grep 'aria-current="page"' dist/index.html` → 2 occurrences (desktop + mobile menus).

---

## Phase 1 — Performance

### F17. 1.36MB 12MP hero image + site-wide preload — 🔴 biggest single win

- **Evidence**: `public/images/hero-welcome.jpeg` is 4032×3024, 1.36MB (verified); rendered at ≤600px (`HeroSection.astro:84`); `<link rel="preload">` in `BaseLayout.astro:311` fetches it on **all ~130 pages** — including blog posts that never show it.
- **Fix**: (a) Re-encode to ~1200×900 WebP/AVIF (~60–100KB) + JPEG fallback; serve via `srcset` for 1x/2x. (b) Move the `<link rel="preload">` behind a prop (`preloadHero`) so only `index.astro` triggers it. (c) Keep `width/height`/`fetchpriority` attributes.
- **Verify**: `du -sh` new asset ≪200KB; `grep hero-welcome dist/blog/*/index.html` → 0 matches; homepage still preloads.

### F18. React islands hydrate on every page

- **Evidence**: `BaseLayout.astro:351-352` — StickyMobileCTA + CookieConsent both `client:only="react"` → React runtime + framer-motion + lucide shipped on all pages. StickyMobileCTA renders `null` on desktop (`sm:hidden`) but still hydrates; framer-motion powers a slide-up bar that CSS could do.
- **Fix (recommended order)**:
  1. Replace both islands with Astro components + inline `<script>` (progress bar + dismiss already exist as patterns). Removes React entirely if desired.
  2. Or: `client:media="(max-width: 640px)"` for the mobile CTA; `client:idle` for consent.
- **Verify**: `dist` JS bundle no longer includes react/framer-motion for the CTAs; mobile CTA still appears after 600px scroll; Lighthouse TBT improves.

### F19. Prune unused heavy dependencies

- **Evidence**: zero `src/` usage of `gsap`, `embla-carousel-react`, `@base-ui/react`, `shadcn`, `class-variance-authority`, `tw-animate-css` (grep-verified). `framer-motion` + `lucide-react` only power the two islands (may also go after F18).
- **Fix**: `npm rm` the six (and framer/lucide if F18 removes islands); `components.json` is a shadcn leftover — delete with it.
- **Verify**: `npm ci && npm run build && npm test` all pass; bundle size unchanged for remaining islands.

### F20. Image/video pipeline

- **Evidence**: 26MB raw JPEGs under `public/images`; `<img>` without optimization; `public/videos` = 21MB with space-containing filenames (`src/lib/data.ts:113-124`, `156-175` — `/videos/root canal.mp4`); no posters; `AESTHETIC DENTISTRY.mp4` reused for 3 different services.
- **Fix**: (a) Adopt Astro `<Image>`/`<Picture>` (or a one-off build script) for gallery/hero/achievement images → responsive AVIF/WebP + intrinsic dims. (b) Rename videos to URL-safe slugs, add `poster` frames + `loading="lazy"`/`preload="none"`, fix duplicate-video mappings. (c) Transcode the largest videos to ~5–10Mbps H.264.
- **Verify**: Page-weight drop on `/gallery/` and `/services/<slug>/`; no spaces in asset URLs; Lighthouse LCP/CLS improve.

### F21. Blog index pagination

- **Evidence**: `src/pages/blog/index.astro` renders all 106 cards (and a 106-item ItemList) on one page.
- **Fix**: 24 posts/page → `/blog/page/[n]/` static pagination, or drive category-first browsing via the chips. Update the ItemList to paginated form.
- **Verify**: `dist/blog/` card count ≤24; canonical + `itemList` correct; chips still work.

### F22. Self-host fonts

- **Evidence**: `BaseLayout.astro:300-305` — Google Fonts stylesheet is render-blocking third-party (swap already set).
- **Fix**: Download Lora + Source Sans 3 woff2 subsets into `public/fonts`, `@font-face` in `global.css`, drop the Google links.
- **Verify**: No `fonts.googleapis.com` in dist; fonts render; FCP improves.

---

## Phase 2 — SEO / Structured-Data Hardening

### F10. Self-serving reviews + AggregateRating — ⚠️ policy risk

- **Evidence**: `BaseLayout.astro:140-177` — `aggregateRating 4.9/150` + 2 curated `review` entities emitted on every page via LocalBusiness. Google's review-snippet guidelines exclude self-serving reviews → rich-result eligibility risk (worst case: structured-data ignore/manual action).
- **Fix (default, policy-safe)**: Remove `aggregateRating` + `review` from the LocalBusiness entity. Keep testimonials as visible page content (fine). Optionally carry the rating on `Person` only if sourced from a verifiable third party.
- **Alternative**: Keep if the client accepts the risk — document the tradeoff.
- **Verify**: Schema validator shows no review markup on LocalBusiness; no regression in rendered testimonials.

### F11. og:image + og:type correctness

- **Evidence**: `og:image:width/height` claim 1200×630 (`BaseLayout.astro:289-290`) but `clinic.jpg` is actually 1200×1600 (verified); blog posts all share the generic clinic image; service pages use `type="article"` (`services/[slug].astro:70`).
- **Fix**: (a) Correct dims or generate a real 1200×630 social card (clinic photo + brand, reused site-wide). (b) Per-post og:image — generated via a build step or curated category images. (c) Service pages → `type="website"`.
- **Verify**: OG debugger shows correct image; `og:type` correct per page type.

### F14. Shared escaped JSON-LD helper

- **Evidence**: ~15 `set:html={JSON.stringify(...)}` sites (BaseLayout, `[slug]`, category, services). Local content makes it low-risk, but `</script>` in any answer/title breaks the page.
- **Fix**: `src/lib/json-ld.ts` → `jsonLd(obj) → JSON.stringify(obj).replace(/</g, '\\u003c')`; use everywhere.
- **Verify**: grep shows all JSON-LD uses the helper; pages render identical schema.

### F13. Schema/robots nits

- **Evidence**: `contactOption: 'TollFree'` on a regular mobile (`BaseLayout.astro:71`); `Crawl-delay: 1` in `robots.txt.ts:8` (Bing slowdown, ignored by Google); redundant hreflang `en-IN` + `x-default` on a single-locale site.
- **Fix**: Drop `contactOption` or use `TollFree` only if true; remove `Crawl-delay`; drop `x-default` (or keep only `en-IN`).
- **Verify**: `dist/robots.txt` and a page's head diff-clean.

### F15. Price consistency pass (₹15k vs ₹25k) — content decision needed

- **Evidence**: single-tooth implant = ₹15,000–₹50,000 in some migrated posts, ₹25,000–₹50,000 in others (verified across `src/content/blog/dental-implants*.md`), and the global FAQ says "from ₹25,000" (`src/lib/data.ts:221`). The earlier megaplan deliberately cut ₹25k→₹15k in a subset of posts.
- **Fix**: Confirm the real current price with the owner, then normalize all implant price mentions + FAQ + service-page `priceRange` to one figure.
- **Verify**: `grep -r "implant.*₹" src/content/blog src/lib/data.ts` → one consistent range; FAQPage schema matches.
- **Gate**: ⚠️ Requires owner confirmation — do not guess the price.

### F16. BlogPosting date serialization

- **Evidence**: `datePublished: data.date` serializes a Date object → full ISO datetime; sitemap lastmod is date-only.
- **Fix**: Emit `data.date.toISOString().split('T')[0]`-style values for datePublished/dateModified.
- **Verify**: JSON-LD dates match `YYYY-MM-DD`.

---

## Phase 3 — UX Depth

### F12. Blog cover-art system — biggest visual upgrade

- **Evidence**: every blog card + post hero renders an empty `aspect-video` teal box with only a category label (`blog/index.astro:64-66`, `category/[category].astro:84-86`, `[slug].astro:86-88`) — looks unfinished and wastes the largest visual element.
- **Fix options** (pick one, recommend A):
  - **A. Curated category covers**: 9 dental/clinic images (one per category, locally optimized), used on cards + post hero + og:image (feeds F11).
  - B. Generated art: per-category tinted cover with icon + title typography (unique per post, more work).
  - C. Text-first redesign: drop the fake image box, lead with title/category/meta.
- **Verify**: Cards + post heroes show real images; og:image matches (F11); no CLS (`width`/`height` set).

### F23. Blog reading experience

- **Evidence**: no TOC on 7–10-min posts; no prev/next navigation; related posts = 3 with sort bug (F7).
- **Fix**: (a) Auto-TOC for `##` headings (anchor ids + `scroll-margin`, sidebar on desktop / collapsible on mobile). (b) Prev/Next chronological links at the end of posts. (c) Related = 4–6 with category-first ordering (after F7).
- **Verify**: Long post shows working TOC; prev/next cycle posts; related sorted.

### F24. Analytics + consent decision

- **Evidence**: `CookieConsent.tsx` claims "analyse site traffic", stores consent — but there is **no analytics on the site**. The banner is pure friction and a false statement.
- **Fix — choose**: (a) **No analytics** → delete the banner and its React island (also fixes part of F18). (b) **Privacy-friendly analytics** (Cloudflare Web Analytics is ideal — free, cookieless, GA-exempt) → no banner legally needed, add a privacy note instead. (c) If a tracking tool is chosen later, wire the stored consent to actually gate it.
- **Verify**: Either banner gone site-wide or real analytics tag present and consent-gated.

### F25. Booking form accessibility

- **Evidence**: `BookingForm.astro` — error `<p>`s aren't linked (`aria-describedby`/`aria-invalid` missing); stale date min (F6a).
- **Fix**: `aria-invalid` toggle + `aria-describedby="name-error"`/`"phone-error"`; keep `aria-live` success.
- **Verify**: Screen reader announces errors; axe audit clean.

### F26. Contextual related services

- **Evidence**: `services/[slug].astro:27` → always the same first-3 services on every page.
- **Fix**: Curate a `related` slug list per service in frontmatter (or category-based grouping), fall back to the first-3 only when uncurated.
- **Verify**: Related services vary by page and are topically adjacent.

### F29. Dark-mode slate remap documentation (or de-hack)

- **Evidence**: `global.css:149-156` remaps `--color-slate-*` inside `.dark` into an inverted warm scale (slate-500 == slate-400 = #a8a29e; slate-600 lighter than slate-500). Works, but it silently inverts the meaning of every `slate-*` utility.
- **Fix**: Either (a) document the trick in CODEBASE.md + a comment, or (b) migrate components to explicit `dark:warm-*` classes and remove the remap.
- **Verify**: Dark/light rendering unchanged; convention understood by future editors.

### F30. `format-detection telephone=no` — document intent

- **Evidence**: `BaseLayout.astro:264` suppresses iOS auto-linking while styled tel links exist everywhere — deliberate but undocumented.
- **Fix**: One-line comment; no code change.

### F28. Emergency banner / header JS coupling

- **Evidence**: header offset depends on JS measuring the banner (`Header.astro:195-213`); a no-JS or slow-load state can briefly overlap.
- **Fix**: Emit banner height via CSS var + `margin-top`/`top` in CSS where possible, keeping JS only for the dismiss transition.
- **Verify**: With throttle, no visual jump at load.

---

## Phase 4 — Infra & Repo Hygiene

### F35/F36/F37. Repo bloat cleanup — approved by user

- **Evidence**: `assets/` = 96MB tracked duplicate of `public/images` (59 files incl. `assets/before:after/` — a folder name with a colon that breaks Windows checkouts); `humanizer-main/` = third-party Claude plugin repo tracked (7 files); `out/` = stale Next.js build left on disk (ignored but present).
- **Fix**: `git rm -r --cached assets humanizer-main` (untrack, keep files on disk if still wanted — recommend deleting `out/` from disk entirely), add `assets/`, `humanizer-main/` to `.gitignore`.
- **Verify**: `git ls-files | grep -c "assets/\|humanizer-main"` → 0; working tree clean; repo fresh-clone size reduced going forward (history untouched, no rewrite).

### F33. Ignore `.astro/` generated cache

- **Evidence**: `.astro/data-store.json`, `settings.json`, `collections/*` tracked → churn on every content edit.
- **Fix**: `git rm -r --cached .astro`, add `/.astro/` to `.gitignore`.
- **Verify**: `git ls-files | grep -c "^\.astro/"` → 0; `npm run build` regenerates locally.

### F31. CI quality gate

- **Evidence**: `.github/workflows/deploy.yml` builds and deploys — `astro check` and `vitest run` never run in CI. The F1 schema bug shipped through this hole.
- **Fix**: Add `npm run check` + `npm test` steps before build in `deploy.yml` (deploy step already exists, just gate it).
- **Verify**: Next push runs typecheck + tests; a deliberate failing test blocks deploy.

### F32. New tests for schema/build output

- **Evidence**: existing 10 suites cover content integrity, a11y, dark mode, gallery, videos — nothing validates rendered JSON-LD or sitemap output.
- **Fix**: Add `tests/schema-output.test.ts` run against built `dist/` (or a fixture):
  1. BreadcrumbList `item` URLs all match `^https://www\.yourdentistdentalclinic\.com/` exactly once (F1 regression).
  2. Every blog page has BlogPosting + FAQPage with ≥3 valid Q&A pairs.
  3. `sitemap-0.xml` blog URLs carry `<lastmod>`; category hubs included.
  4. Global FAQPage present on home + service pages only.
  5. `webPageSchema.lastReviewed` ≠ build day for blog posts (F6b).
- **Verify**: `npm test` includes the new suite; intentionally breaking a schema makes it fail.

### F19-followup. Tooling tidies

- `eslint.config.mjs` exists and `npm run lint` is wired — confirm it covers `.astro` files or document its limits.
- `tsconfig.tsbuildinfo` already ignored ✓; `updated blogs/` + `blog-topics.md` remain per owner preference.

---

## Phase Order Summary

| Phase | Theme | Items | Nature |
|-------|-------|-------|--------|
| 0 | Verified bugs | F1–F9, F27 | Trivial fixes, high value |
| 1 | Performance | F17–F22 | Asset/JS diet |
| 2 | SEO/schema | F10, F11, F13–F16 | Policy + correctness |
| 3 | UX depth | F12, F23–F26, F28–F30 | Reading + conversion |
| 4 | Infra/hygiene | F31–F37 | CI, tests, repo bloat |

**Recommended first batch**: F1, F2, F5, F17, F31 — five small diffs fixing a shipped schema bug, a real UX bug, a broken-looking UI element, the biggest performance leak, and the CI hole that let F1 ship.
