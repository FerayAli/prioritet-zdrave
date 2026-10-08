import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["gray-matter"],
  async redirects() {
    return [{ source: "/about", destination: "/events", permanent: true }];
  },
};

export default nextConfig;
