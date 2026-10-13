import type { MetadataRoute } from "next";
import { site } from "@/data/site";
import { courses } from "@/data/courses";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url.replace(/\/$/, "");
  const lastModified = new Date();

  const staticRoutes = [
    "",
    "/about",
    "/courses",
    "/admissions",
    "/faculty",
    "/facilities",
    "/gallery",
    "/notices",
    "/contact",
    "/privacy",
  ].map((path) => ({
    url: `${base}${path === "" ? "/" : path}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const courseRoutes = courses.map((c) => ({
    url: `${base}/courses/${c.slug}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  return [...staticRoutes, ...courseRoutes];
}
