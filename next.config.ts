import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['s1.ticketm.net', 'media.ticketmaster.com', 'media.ticketmaster.eu'],
  },
  devIndicators: false,
};

export default nextConfig;
