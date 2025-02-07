import type { NextConfig } from "next";

const nextConfig: NextConfig = {
 
  reactStrictMode: true,
  images: {
    domains: ['cdn.sanity.io'], // Add the hostname of your Sanity image URLs
  },
};

export default nextConfig;
