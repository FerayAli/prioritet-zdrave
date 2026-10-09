import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["gray-matter"],
  // Dynamic routes (e.g. /search) get their own serverless bundle; without this,
  // layout-only fs reads like content/contact.md in SiteFooter are missing on Vercel.
  outputFileTracingIncludes: {
    "/**/*": [
      "./content/**/*",
      "./locales/**/*",
      "./test/fixtures/**/*",
    ],
  },
  images: {
    formats: ["image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1280, 1600, 1920],
    qualities: [65, 75, 90],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
  async redirects() {
    return [{ source: "/about", destination: "/events", permanent: true }];
  },
};

export default nextConfig;
