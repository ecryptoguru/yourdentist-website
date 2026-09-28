import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import tailwindcss from '@tailwindcss/vite';
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { slugifyCategory } from './src/lib/blog-categories';

// Build a URL -> lastmod map from blog frontmatter so the sitemap
// carries accurate freshness signals for updated content.
function buildLastmodMap() {
  const map = new Map();
  try {
    const blogDir = join(process.cwd(), 'src/content/blog');
    const byCategory = new Map();
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

const lastmodMap = buildLastmodMap();

export default defineConfig({
  site: 'https://www.yourdentistdentalclinic.com',
  trailingSlash: 'always',
  integrations: [
    react(),
    sitemap({
      serialize(item) {
        const lastmod = lastmodMap.get(new URL(item.url).pathname);
        return lastmod ? { ...item, lastmod } : item;
      },
    }),
    mdx(),
  ],
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      dedupe: ['react', 'react-dom'],
    },
  },
  build: {
    format: 'directory',
  },
});
