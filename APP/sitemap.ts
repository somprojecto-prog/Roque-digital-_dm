import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";
import { navCategories } from "@/data/nav-categories";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: siteConfig.url,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1,
    },
  ];

  const categoryRoutes: MetadataRoute.Sitemap = navCategories.flatMap((cat) => [
    {
      url: `${siteConfig.url}${cat.href}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    ...cat.subcategories.map((sub) => ({
      url: `${siteConfig.url}${cat.href}/${sub.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    })),
  ]);

  return [...staticRoutes, ...categoryRoutes];
}
