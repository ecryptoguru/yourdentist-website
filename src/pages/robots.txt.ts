import type { APIRoute } from 'astro';

export const GET: APIRoute = () => {
  const body = `User-agent: *
Allow: /
Allow: /images/
Allow: /fonts/
Crawl-delay: 1

Sitemap: https://www.yourdentistdentalclinic.com/sitemap.xml
`;

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
};
