---
name: nextjs-react-expert
description: "React and Next.js performance optimization from Vercel Engineering. Use when building React components, optimizing performance, eliminating waterfalls, reducing bundle size, reviewing code for performance issues, or implementing server/client-side optimizations. When building React components, optimizing Next.js performance, eliminating waterfalls, or reducing bundle size. For React/Next.js web projects."
allowed-tools:
  - read
  - write
  - edit
  - glob
  - grep
  - exec
---

# Next.js & React Performance Expert

> **From Vercel Engineering** - 57 optimization rules prioritized by impact
> **Philosophy:** Eliminate waterfalls first, optimize bundles second, then micro-optimize.

---

## 🎯 Selective Reading Rule (MANDATORY)

**Read ONLY sections relevant to your task!** Check the content map below and load what you need.

> 🔴 **For performance reviews: Start with CRITICAL sections (1-2), then move to HIGH/MEDIUM.**

---

## 📑 Content Map

| File                                    | Impact             | Rules      | When to Read                                                    |
| --------------------------------------- | ------------------ | ---------- | --------------------------------------------------------------- |
| `1-async-eliminating-waterfalls.md`     | 🔴 **CRITICAL**    | 5 rules    | Slow page loads, sequential API calls, data fetching waterfalls |
| `2-bundle-bundle-size-optimization.md`  | 🔴 **CRITICAL**    | 5 rules    | Large bundle size, slow Time to Interactive, First Load issues  |
| `3-server-server-side-performance.md`   | 🟠 **HIGH**        | 7 rules    | Slow SSR, API route optimization, server-side waterfalls        |
| `4-client-client-side-data-fetching.md` | 🟡 **MEDIUM-HIGH** | 4 rules    | Client data management, SWR patterns, deduplication             |
| `5-rerender-re-render-optimization.md`  | 🟡 **MEDIUM**      | 12 rules   | Excessive re-renders, React performance, memoization            |
| `6-rendering-rendering-performance.md`  | 🟡 **MEDIUM**      | 9 rules    | Rendering bottlenecks, virtualization, image optimization       |
| `7-js-javascript-performance.md`        | ⚪ **LOW-MEDIUM**  | 12 rules   | Micro-optimizations, caching, loop performance                  |
| `8-advanced-advanced-patterns.md`       | 🔵 **VARIABLE**    | 3 rules    | Advanced React patterns, useLatest, init-once                   |
| `9-cache-components.md`                 | 🔴 **CRITICAL**    | 4 sections | **Next.js 16+ Only**: `use cache`, `cacheLife`, PPR, `cacheTag` |
| `10-file-conventions.md`                | 🟠 **HIGH**        | 7 rules    | File-based routing, dynamic segments, catch-all, proxy.ts       |
| `11-rsc-boundaries.md`                  | 🔴 **CRITICAL**    | 5 rules    | Server vs Client components, serializability, Server Actions    |
| `12-async-patterns.md`                  | 🔴 **CRITICAL**    | 5 rules    | Next.js 15+ Async params, searchParams, cookies, headers        |
| `13-directives.md`                      | 🟠 **HIGH**        | 3 rules    | 'use client', 'use server', 'use cache' directives reference    |
| `14-metadata-images-fonts.md`           | 🟠 **HIGH**        | 3 rules    | SEO, Image and Font optimization guidelines                     |
| `15-route-handlers.md`                  | 🟡 **MEDIUM-HIGH** | 5 rules    | route.ts API endpoints vs Server Actions                        |
| `16-hydration-errors.md`                | 🟠 **HIGH**        | 5 rules    | Hydration mismatches, dates, Suspense boundaries, searchParams  |
| `17-debug-tricks.md`                    | 🟡 **MEDIUM**      | 5 rules    | MCP, --debug-build-paths, Turbopack, bundle analysis            |

**Total: 98 rules across 17 categories**

---

## 🚀 Quick Decision Tree

**What's your performance issue?**

```
🐌 Slow page loads / Long Time to Interactive
  → Read Section 1: Eliminating Waterfalls
  → Read Section 2: Bundle Size Optimization

📦 Large bundle size (> 200KB)
  → Read Section 2: Bundle Size Optimization
  → Check: Dynamic imports, barrel imports, tree-shaking

🖥️ Slow Server-Side Rendering
  → Read Section 3: Server-Side Performance
  → Check: Parallel data fetching, streaming

🔄 Too many re-renders / UI lag
  → Read Section 5: Re-render Optimization
  → Check: React.memo, useMemo, useCallback

🎨 Rendering performance issues
  → Read Section 6: Rendering Performance
  → Check: Virtualization, layout thrashing

🌐 Client-side data fetching problems
  → Read Section 4: Client-Side Data Fetching
  → Check: SWR deduplication, localStorage

✨ Need advanced patterns
  → Read Section 8: Advanced Patterns

🚀 **Next.js 16+ Performance (Caching & PPR)**
  → Read Section 9: Cache Components
```

---

##  Related Skills

| Need                    | Skill                             |
| ----------------------- | --------------------------------- |
| API design patterns     | `@[skills/api-patterns]`          |
| Database optimization   | `@[skills/database-design]`       |
| Testing strategies      | `@[skills/testing-patterns]`      |
| UI/UX design principles | `@[skills/frontend-design]`       |
| TypeScript patterns     | `@[skills/typescript-expert]`     |
| Deployment & DevOps     | `@[skills/deployment-procedures]` |

---

## ✅ Performance Review Checklist

Before shipping to production:

**Critical (Must Fix):**

- [ ] No sequential data fetching (waterfalls eliminated)
- [ ] Bundle size < 200KB for main bundle
- [ ] No barrel imports in app code
- [ ] Dynamic imports used for large components
- [ ] Parallel data fetching where possible

**High Priority:**

- [ ] Server components used where appropriate
- [ ] API routes optimized (no N+1 queries)
- [ ] Suspense boundaries for data fetching
- [ ] Static generation used where possible

**Medium Priority:**

- [ ] Expensive computations memoized
- [ ] List rendering virtualized (if > 100 items)
- [ ] Images optimized with next/image
- [ ] No unnecessary re-renders

**Low Priority (Polish):**

- [ ] Hot path loops optimized
- [ ] RegExp patterns hoisted
- [ ] Property access cached in loops

---

## ❌ Anti-Patterns (Common Mistakes)

**DON'T:**

- ❌ Use sequential `await` for independent operations
- ❌ Import entire libraries when you need one function
- ❌ Use barrel exports (`index.ts` re-exports) in app code
- ❌ Skip dynamic imports for large components/libraries
- ❌ Fetch data in useEffect without deduplication
- ❌ Forget to memoize expensive computations
- ❌ Use client components when server components work

**DO:**

- ✅ Fetch data in parallel with `Promise.all()`
- ✅ Use dynamic imports: `const Comp = dynamic(() => import('./Heavy'))`
- ✅ Import directly: `import { specific } from 'library/specific'`
- ✅ Use Suspense boundaries for better UX
- ✅ Leverage React Server Components
- ✅ Measure performance before optimizing
- ✅ Use Next.js built-in optimizations (next/image, next/font)

---

## 🔍 Validation Script

| Script                                 | Purpose                     | Command                                                      |
| -------------------------------------- | --------------------------- | ------------------------------------------------------------ |
| `scripts/react_performance_checker.py` | Automated performance audit | `python scripts/react_performance_checker.py <project_path>` |

---

## 🎓 Best Practices Summary

**Golden Rules:**

1. **Measure first** - Use React DevTools Profiler, Chrome DevTools
2. **Biggest impact first** - Waterfalls → Bundle → Server → Micro
3. **Don't over-optimize** - Focus on real bottlenecks
4. **Use platform features** - Next.js has optimizations built-in
5. **Think about users** - Real-world conditions matter

**Performance Mindset:**

- Every `await` in sequence = potential waterfall
- Every `import` = potential bundle bloat
- Every re-render = wasted computation (if unnecessary)
- Server components = less JavaScript to ship
- Measure, don't guess

---

**Source:** Vercel Engineering
**Date:** January 2026
**Version:** 1.0.0
**Total Rules:** 57 across 8 categories
