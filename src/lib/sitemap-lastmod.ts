import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { slugifyCategory } from './blog-categories';

/**
 * Build a URL -> lastmod map from blog frontmatter so the sitemap carries
 * accurate freshness signals for updated content. Used by astro.config.mjs
 * at build time; kept in lib so tests can exercise it directly.
 */
export function buildLastmodMap(blogDir = join(process.cwd(), 'src/content/blog')): Map<string, string> {
  const map = new Map<string, string>();
  try {
    const byCategory = new Map<string, string[]>();
    for (const file of readdirSync(blogDir).filter((f) => f.endsWith('.md'))) {
      const fm = readFileSync(join(blogDir, file), 'utf8').split(/^---\n/)[1] ?? '';
      const date = fm.match(/^date:\s*(\d{4}-\d{2}-\d{2})/m)?.[1];
      const lastUpdated = fm.match(/^lastUpdated:\s*(\d{4}-\d{2}-\d{2})/m)?.[1];
      const lastmod = lastUpdated || date;
      if (!lastmod) continue;
      const slug = file.replace(/\.md$/, '');
      map.set(`/blog/${slug}/`, lastmod);
      const category = fm.match(/^category:\s*"([^"]+)"/m)?.[1];
      if (category) {
        const list = byCategory.get(category) ?? [];
        list.push(lastmod);
        byCategory.set(category, list);
      }
    }
    for (const [category, dates] of byCategory) {
      const newest = dates.sort()[dates.length - 1];
      if (newest) map.set(`/blog/category/${slugifyCategory(category)}/`, newest);
    }
  } catch {
    // sitemap simply has no lastmod if content is unreadable
  }
  return map;
}
