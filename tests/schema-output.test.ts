import { describe, it, expect } from 'vitest';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';
import { jsonLd, buildBreadcrumbSchema } from '../src/lib/json-ld';
import { SITE_URL } from '../src/lib/site';
import { buildLastmodMap } from '../src/lib/sitemap-lastmod';

describe('jsonLd()', () => {
  it('escapes < so JSON-LD cannot break out of the script tag', () => {
    const html = jsonLd({ name: 'x</script><script>alert(1)</script>' });
    expect(html).not.toContain('</script>');
    expect(html).toContain('\\u003c');
  });

  it('round-trips to the original object', () => {
    const data = { name: 'test', nested: { a: [1, 2] } };
    expect(JSON.parse(jsonLd(data))).toEqual(data);
  });
});

describe('buildBreadcrumbSchema()', () => {
  it('keeps relative hrefs as single-domain absolute URLs', () => {
    const schema = buildBreadcrumbSchema([{ name: 'Blog', href: '/blog/' }]);
    expect(schema.itemListElement[0].item).toBe(`${SITE_URL}/blog/`);
  });

  it('normalizes already-absolute same-origin hrefs (no double domain)', () => {
    const schema = buildBreadcrumbSchema([
      { name: 'Category', href: `${SITE_URL}/blog/category/orthodontics/` },
    ]);
    expect(schema.itemListElement[0].item).toBe(`${SITE_URL}/blog/category/orthodontics/`);
    expect(schema.itemListElement[0].item).not.toContain(`${SITE_URL}${SITE_URL}`);
  });

  it('numbers positions starting at 1', () => {
    const schema = buildBreadcrumbSchema([
      { name: 'Home', href: '/' },
      { name: 'Blog', href: '/blog/' },
      { name: 'Post', href: '/blog/x/' },
    ]);
    expect(schema.itemListElement.map((i) => i.position)).toEqual([1, 2, 3]);
    expect(schema['@type']).toBe('BreadcrumbList');
  });
});

describe('buildLastmodMap()', () => {
  const map = buildLastmodMap();

  it('maps every blog post URL to a lastmod date', () => {
    expect(map.size).toBeGreaterThanOrEqual(106);
    for (const [url, date] of map) {
      expect(url).toMatch(/^\/blog\//);
      expect(date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    }
  });

  it('includes category hub URLs', () => {
    const categoryUrls = [...map.keys()].filter((u) => u.includes('/blog/category/'));
    expect(categoryUrls.length).toBe(9);
  });
});

describe('LocalBusiness schema policy (no self-serving review markup)', () => {
  const layout = readFileSync(join(process.cwd(), 'src/layouts/BaseLayout.astro'), 'utf-8');

  it('does not embed aggregateRating or review entities in the Dentist schema', () => {
    expect(layout).not.toMatch(/aggregateRating/);
    expect(layout).not.toMatch(/'@type': 'Review'|"@type":\s*['"]Review['"]/);
  });
});

describe('built dist schema output', () => {
  const distDir = join(process.cwd(), 'dist');
  const read = (p: string) => readFileSync(join(distDir, p), 'utf-8');
  const distExists = existsSync(join(distDir, 'index.html'));

  const describeIf = distExists ? describe : describe.skip;

  describeIf('category hubs', () => {
    it('BreadcrumbList item URLs are well-formed (no double domain)', () => {
      const html = read('blog/category/orthodontics/index.html');
      expect(html).not.toContain(`${SITE_URL}${SITE_URL}`);
      expect(html).toContain('"@type":"BreadcrumbList"');
      expect(html).toContain(`"item":"${SITE_URL}/blog/category/orthodontics/"`);
    });
  });

  describeIf('blog posts', () => {
    it('emits BlogPosting + FAQPage JSON-LD', () => {
      const html = read('blog/root-canal-cost-bhubaneswar/index.html');
      expect(html).toContain('"@type":"BlogPosting"');
      expect(html).toContain('"@type":"FAQPage"');
      expect(html).toMatch(/"datePublished":"\d{4}-\d{2}-\d{2}"/);
    });

    it('does not preload the hero image on non-home pages', () => {
      const html = read('blog/root-canal-cost-bhubaneswar/index.html');
      expect(html).not.toContain('hero-welcome');
    });
  });

  describeIf('homepage', () => {
    it('preloads the resized hero webp', () => {
      const html = read('index.html');
      expect(html).toContain('hero-welcome-1200.webp');
      expect(html).not.toContain('src="/images/hero-welcome.jpeg"');
    });
  });
});
