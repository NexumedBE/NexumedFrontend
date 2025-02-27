/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Enables static site export
  images: {
    unoptimized: true, // Required for static export (Next.js doesn't process images in static mode)
    domains: ["localhost"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        port: "",
      },
    ],
  },
};

module.exports = nextConfig;

