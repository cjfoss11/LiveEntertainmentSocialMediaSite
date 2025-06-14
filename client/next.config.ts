import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ["@chakra-ui/react"],
    serverActions: {
      bodySizeLimit: '2mb'
    }
  }
};

export default nextConfig;
