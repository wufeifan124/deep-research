import type { NextConfig } from "next";

const API_PROXY_BASE_URL = process.env.API_PROXY_BASE_URL as string;
const GOOGLE_GENERATIVE_AI_API_KEY = process.env
  .GOOGLE_GENERATIVE_AI_API_KEY as string;

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    reactCompiler: true,
  },
  rewrites: async () => {
    return [
      {
        source: "/api/ai/google/v1beta/:path*",
        has: [
          {
            type: "header",
            key: "x-goog-api-key",
            value: "(?<key>.*)",
          },
        ],
        destination: `${
          API_PROXY_BASE_URL || "https://generativelanguage.googleapis.com"
        }/v1beta/:path*?key=${GOOGLE_GENERATIVE_AI_API_KEY}`,
      },
    ];
  },
};

export default nextConfig;
