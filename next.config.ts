import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["gray-matter"],
  images: {
    formats: ["image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    qualities: [65, 75, 90],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
  async redirects() {
    return [{ source: "/about", destination: "/events", permanent: true }];
  },
};

export default nextConfig;
