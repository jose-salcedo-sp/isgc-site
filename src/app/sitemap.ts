import type { MetadataRoute } from "next";

import { siteRoutes, siteUrl } from "@/lib/site";

const routeConfig: Record<
  (typeof siteRoutes)[number],
  {
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
    priority: number;
  }
> = {
  "/": { changeFrequency: "weekly", priority: 1 },
  "/alumnos": { changeFrequency: "weekly", priority: 0.7 },
  "/aspirantes": { changeFrequency: "monthly", priority: 0.9 },
  "/carrera": { changeFrequency: "monthly", priority: 0.9 },
  "/comunidad": { changeFrequency: "weekly", priority: 0.7 },
  "/oportunidades": { changeFrequency: "monthly", priority: 0.8 },
  "/proyectos": { changeFrequency: "monthly", priority: 0.8 },
};

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return siteRoutes.map((route) => {
    const { changeFrequency, priority } = routeConfig[route];

    return {
      changeFrequency,
      lastModified,
      priority,
      url: `${siteUrl}${route === "/" ? "" : route}`,
    };
  });
}
