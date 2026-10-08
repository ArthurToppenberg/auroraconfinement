import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { sessionCookie, verifySession } from '@/lib/admin/session';

const policy = (scriptSrc: string) =>
  [
    "default-src 'self'",
    "base-uri 'self'",
    "connect-src 'self'",
    "font-src 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    "img-src 'self' data:",
    "object-src 'none'",
    scriptSrc,
    "style-src 'self'",
    'upgrade-insecure-requests',
  ].join('; ');

// Public pages are prerendered, so their inline bootstrap scripts are allowed by
// SHA-256 hash (written after the build by scripts/write-csp-hashes.mjs).
let staticScriptSrc: string | undefined;
function staticHashes(): string {
  if (staticScriptSrc) return staticScriptSrc;
  if (process.env.NODE_ENV !== 'production')
    return "script-src 'self' 'unsafe-inline' 'unsafe-eval'";
  try {
    const hashes = JSON.parse(
      readFileSync(join(process.cwd(), 'dist', 'csp-hashes.json'), 'utf8'),
    ) as string[];
    return (staticScriptSrc = `script-src 'self' ${hashes.join(' ')}`);
  } catch {
    return "script-src 'self'";
  }
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isAdmin = pathname === '/admin' || pathname.startsWith('/admin/');
  const isLogin = /^\/admin\/login\/?$/.test(pathname);

  if (isAdmin && !isLogin) {
    if (!verifySession(request.cookies.get(sessionCookie)?.value))
      return NextResponse.redirect(new URL('/admin/login/', request.url), 303);
  }

  const requestHeaders = new Headers(request.headers);
  let csp: string;
  if (isAdmin) {
    // Admin is rendered per request, so it can use a per-request nonce.
    const nonce = Buffer.from(crypto.randomUUID()).toString('base64');
    csp = policy(
      `script-src 'self' 'nonce-${nonce}' 'strict-dynamic'${
        process.env.NODE_ENV === 'production' ? '' : " 'unsafe-eval'"
      }`,
    );
    requestHeaders.set('x-nonce', nonce);
  } else {
    csp = policy(staticHashes());
  }
  requestHeaders.set('Content-Security-Policy', csp);

  const response = NextResponse.next({ request: { headers: requestHeaders } });
  response.headers.set('Content-Security-Policy', csp);
  if (isAdmin) response.headers.set('Cache-Control', 'no-store');
  return response;
}

export const config = {
  matcher: [
    {
      source: '/((?!_next/static|_next/image|favicon.png).*)',
      missing: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' },
      ],
    },
  ],
};
