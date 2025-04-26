/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compress: true, // ✅ Enable gzip compression
  swcMinify: true, // ✅ Use super-fast SWC minifier
  experimental: {
    serverActions: true, // ✅ Future-proofing (optional, safe to leave)
  },
};

export default nextConfig;
