import type { MetadataRoute } from "next";

import { locales, localizedPath, sitePaths } from "@/lib/i18n";
import { siteLastModified, siteUrl } from "@/lib/site";

const routeConfig: Record<
  (typeof sitePaths)[number],
  {
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
    priority: number;
  }
> = {
  "/": { changeFrequency: "weekly", priority: 1 },
  "/aspirantes": { changeFrequency: "monthly", priority: 0.9 },
  "/avisos": { changeFrequency: "weekly", priority: 0.8 },
  "/carrera": { changeFrequency: "monthly", priority: 0.9 },
  "/hall-of-fame": { changeFrequency: "monthly", priority: 0.8 },
  "/oportunidades": { changeFrequency: "monthly", priority: 0.8 },
  "/proyectos": { changeFrequency: "monthly", priority: 0.8 },
  "/recursos": { changeFrequency: "weekly", priority: 0.7 },
};

export default function sitemap(): MetadataRoute.Sitemap {
  return locales.flatMap((locale) =>
    sitePaths.map((path) => {
      const { changeFrequency, priority } = routeConfig[path];
      const languages: Record<string, string> = {};
      for (const item of locales) {
        languages[item] = `${siteUrl}${localizedPath(item, path)}`;
      }

      return {
        alternates: { languages },
        changeFrequency,
        lastModified: siteLastModified,
        priority,
        url: `${siteUrl}${localizedPath(locale, path)}`,
      };
    })
  );
}
