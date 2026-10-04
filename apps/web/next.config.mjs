/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  distDir: 'dist',
  trailingSlash: true,
  images: { unoptimized: true },
  productionBrowserSourceMaps: false,
};

export default nextConfig;
