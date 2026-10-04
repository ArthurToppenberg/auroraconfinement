import { siteOrigin } from '@/content/site';

export const dynamic = 'force-static';

const routes = [
  '/',
  '/products/',
  '/about/',
  '/contact/',
  '/nff/',
  '/privacy/',
];

function escapeXml(value: string) {
  return value.replace(/[<>&'"]/g, (character) => {
    const entities: Record<string, string> = {
      '<': '&lt;',
      '>': '&gt;',
      '&': '&amp;',
      "'": '&apos;',
      '"': '&quot;',
    };
    return entities[character] ?? character;
  });
}

export function GET() {
  const origin = siteOrigin || 'http://localhost:4321';
  const urls = routes
    .map((route) => `  <url><loc>${escapeXml(`${origin}${route}`)}</loc></url>`)
    .join('\n');

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
    { headers: { 'Content-Type': 'application/xml; charset=utf-8' } },
  );
}
