import { SITE_URL, absoluteUrl } from './site';

/**
 * Serialize a JSON-LD object for use inside a <script type="application/ld+json">
 * block. Escapes `<` so embedded content can never break out of the script tag.
 */
export function jsonLd(data: object): string {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}

export interface BreadcrumbItem {
  name: string;
  href: string;
}

/**
 * Build BreadcrumbList JSON-LD. `href` may be site-relative ("/blog/") or an
 * absolute same-origin URL — both normalize to a single-domain absolute URL.
 */
export function buildBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.href),
    })),
  };
}

export { SITE_URL, absoluteUrl };
