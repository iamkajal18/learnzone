// next.config.ts

const nextConfig = {
  experimental: {
    appDir: true, // Required only if you're using the `/app` directory (App Router)
  },
  images: {
    domains: ["img.icons8.com", "cdn.jsdelivr.net"], // Add any external image domains here
  },
};

export default nextConfig;
