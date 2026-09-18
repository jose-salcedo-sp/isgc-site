import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";

import { describe, expect, it } from "vitest";

import sitemap from "@/app/sitemap";
import { getDictionary } from "@/lib/dictionary";
import { locales, sitePaths } from "@/lib/i18n";
import { siteLastModified, siteRoutes } from "@/lib/site";

const appDir = path.join(process.cwd(), "src/app");
const titleSuffix = " | ISGC";
const maxTitleLength = 60;
const maxDescriptionLength = 160;
const minDescriptionLength = 120;

const pageKey = {
  "/": "home",
  "/alumnos": "alumnos",
  "/aspirantes": "aspirantes",
  "/carrera": "carrera",
  "/comunidad": "comunidad",
  "/oportunidades": "oportunidades",
  "/proyectos": "proyectos",
} as const;

const findPageFiles = (dir: string): string[] => {
  const entries = readdirSync(dir, { withFileTypes: true });
  return entries.flatMap((entry) => {
    const filePath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      return findPageFiles(filePath);
    }
    return entry.name === "page.tsx" ? [filePath] : [];
  });
};

const routeFromPageFile = (file: string): string => {
  const relative =
    file.replace(`${appDir}`, "").replace("/page.tsx", "") || "/";
  return relative.replace("/[lang]", "") || "/";
};

const collectPageIssues = (pageFiles: string[]): string[] => {
  const issues: string[] = [];

  if (pageFiles.length !== sitePaths.length) {
    issues.push(
      `expected ${sitePaths.length} page routes, found ${pageFiles.length}`
    );
  }

  for (const file of pageFiles) {
    const route = routeFromPageFile(file);
    const source = readFileSync(file, "utf-8");

    if (!/export const generateMetadata/u.test(source)) {
      issues.push(`${route}: missing generateMetadata export`);
    }

    if (!/pageMetadata\(/u.test(source)) {
      issues.push(`${route}: metadata helper not used`);
    }
  }

  return issues;
};

describe("seo metadata", () => {
  const pageFiles = findPageFiles(appDir).toSorted();

  it("exports generateMetadata on every route", () => {
    expect(collectPageIssues(pageFiles)).toStrictEqual([]);
  });

  it("keeps dictionary titles and descriptions within bounds", () => {
    const issues: string[] = [];

    for (const locale of locales) {
      const dict = getDictionary(locale);
      for (const route of sitePaths) {
        const { description, title } = dict.pages[pageKey[route]].meta;
        const rendered = route === "/" ? title : `${title}${titleSuffix}`;
        if (description.length > maxDescriptionLength) {
          issues.push(
            `${locale} ${route}: description exceeds ${maxDescriptionLength} chars`
          );
        }
        if (description.length < minDescriptionLength) {
          issues.push(
            `${locale} ${route}: description below ${minDescriptionLength} chars (${description.length})`
          );
        }
        if (rendered.length > maxTitleLength) {
          issues.push(
            `${locale} ${route}: title exceeds ${maxTitleLength} chars (${rendered.length})`
          );
        }
      }
    }

    expect(issues).toStrictEqual([]);
  });

  it("lists every localized route in sitemap.ts", () => {
    const entries = sitemap();
    const paths = entries.map((entry) => new URL(entry.url).pathname);

    for (const route of siteRoutes) {
      expect(paths).toContain(route);
    }
    expect(entries).toHaveLength(siteRoutes.length);
    expect(entries.map((entry) => entry.lastModified)).toStrictEqual(
      siteRoutes.map(() => siteLastModified)
    );
  });

  it("keeps sitemap.ts aligned with page routes", () => {
    const routesFromPages = pageFiles.map(routeFromPageFile).toSorted();
    expect([...sitePaths].toSorted()).toStrictEqual(routesFromPages);
  });
});
