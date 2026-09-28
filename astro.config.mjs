import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { unified } from '@astrojs/markdown-remark';
import rehypeSlug from 'rehype-slug';
import { buildLastmodMap } from './src/lib/sitemap-lastmod';

const lastmodMap = buildLastmodMap();

export default defineConfig({
  site: 'https://www.yourdentistdentalclinic.com',
  trailingSlash: 'always',
  integrations: [
    sitemap({
      serialize(item) {
        const lastmod = lastmodMap.get(new URL(item.url).pathname);
        return lastmod ? { ...item, lastmod } : item;
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  markdown: {
    processor: unified({ rehypePlugins: [rehypeSlug] }),
  },
  build: {
    format: 'directory',
  },
});
