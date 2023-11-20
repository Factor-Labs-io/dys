// @ts-check

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: process.env.NEXT_PUBLIC_IGNORE_BUILD_ERROR === "true",
  },
  eslint: {
    ignoreDuringBuilds: process.env.NEXT_PUBLIC_IGNORE_BUILD_ERROR === "true",
  },
  webpack: config => {
    config.resolve.fallback = { fs: false, net: false, tls: false };
    return config;
  },
  async rewrites() {
    return [
      {
        source: "/upload",
        destination: "https://docjanff.onrender.com/api/upload_video/scaffold_vid.mp4/",
      },
      {
        source: "/generate",
        destination: "https://docjan.varounhanooman4.repl.co/api_call/",
      },
    ];
  },
};

module.exports = nextConfig;
