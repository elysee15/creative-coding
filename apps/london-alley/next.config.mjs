/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@workspace/ui"],
  images: {
    domains: ["pub-172d5e755f144ace97badb99794353d5.r2.dev"],
  },
};

export default nextConfig;
