// Next.js only reads .env files from this folder; ADMIN_KODE and DATABASE_URL live
// in the repo-root .env. Existing environment variables win (production sets them).
try {
  process.loadEnvFile(new URL('../../.env', import.meta.url));
} catch {
  // No root .env (CI, Docker): the host environment provides the values.
}

const securityHeaders = [
  { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
  { key: 'Cross-Origin-Resource-Policy', value: 'same-origin' },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), geolocation=(), microphone=(), payment=(), usb=()',
  },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'DENY' },
];

// The Content-Security-Policy is set per request in src/proxy.ts.
/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: 'dist',
  trailingSlash: true,
  images: { unoptimized: true },
  productionBrowserSourceMaps: false,
  poweredByHeader: false,
  transpilePackages: ['@aurora/db'],
  async headers() {
    return [
      { source: '/:path*', headers: securityHeaders },
      {
        source: '/images/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=86400' }],
      },
    ];
  },
};

export default nextConfig;
