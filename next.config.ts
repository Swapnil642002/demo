import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  { key: "X-DNS-Prefetch-Control", value: "on" },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com data:",
      "img-src 'self' data: blob:",
      "frame-src https://www.google.com https://www.openstreetmap.org",
      "connect-src 'self'",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'self'",
    ].join("; "),
  },
];

/**
 * Legacy routes from the existing PHP site are preserved so that existing
 * inbound links and search rankings continue to resolve after the rebuild.
 */
const legacyRedirects: NonNullable<NextConfig["redirects"]> = async () => [
  { source: "/home", destination: "/", permanent: true },
  { source: "/about-us", destination: "/about", permanent: true },
  { source: "/our-courses", destination: "/courses", permanent: true },
  { source: "/our-teams", destination: "/faculty", permanent: true },
  { source: "/our-gallery", destination: "/gallery", permanent: true },
  { source: "/contact-us", destination: "/contact", permanent: true },
  {
    source: "/course_general-nursing-and-midwifery-:slug",
    destination: "/courses/gnm",
    permanent: true,
  },
  { source: "/course_b.sc-wHKo", destination: "/courses/d-pharma-ayurveda", permanent: true },
];

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  poweredByHeader: false,
  compress: true,
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [360, 480, 640, 750, 828, 1080, 1200, 1920],
    imageSizes: [64, 96, 128, 200, 256, 384],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async headers() {
    return [{ source: "/(.*)", headers: securityHeaders }];
  },
  async redirects() {
    return legacyRedirects();
  },
};

export default nextConfig;
