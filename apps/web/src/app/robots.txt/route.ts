import { siteOrigin } from '@/content/site';

export const dynamic = 'force-static';

export function GET() {
  const lines = ['User-agent: *', 'Allow: /', 'Disallow: /admin/'];
  if (siteOrigin) lines.push(`Sitemap: ${siteOrigin}/sitemap.xml`);
  return new Response(`${lines.join('\n')}\n`, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
