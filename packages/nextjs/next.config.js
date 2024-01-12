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
        destination: "https://49fd5f7c-0d25-427c-9860-bca614076d07-00-2gh41qc5pizqo.hacker.replit.dev/api_call",
        // destination: "https://docjan.varounhanooman4.repl.co/api_call/",
      },
      {
        source: "/generate_specific",
        destination: "https://49fd5f7c-0d25-427c-9860-bca614076d07-00-2gh41qc5pizqo.hacker.replit.dev/api_generate",
        // destination: "https://docjan.varounhanooman4.repl.co/api_call/",
      },
      {
        source: "/get_files/:path*",
        destination: "https://49fd5f7c-0d25-427c-9860-bca614076d07-00-2gh41qc5pizqo.hacker.replit.dev/get_files/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
