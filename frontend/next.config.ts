import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Otimizações de performance
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },

  // Compressão
  compress: true,

  // Otimização de imagens
  images: {
    formats: ["image/webp", "image/avif"],
    minimumCacheTTL: 60,
  },

  // Headers para cache
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
        ],
      },
      {
        source: "/api/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=300, stale-while-revalidate=60",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
