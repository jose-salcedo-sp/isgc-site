import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";

import { describe, expect, it } from "vitest";

import sitemap from "@/app/sitemap";
import { projects } from "@/content/projects";
import { getDictionary } from "@/lib/dictionary";
import { locales, localizedPath, sitePaths } from "@/lib/i18n";
import { siteLastModified, siteRoutes } from "@/lib/site";

const appDir = path.join(process.cwd(), "src/app");
const titleSuffix = " | CSE";
const maxTitleLength = 60;
const maxDescriptionLength = 160;
const minDescriptionLength = 120;

const pageKey = {
  "/": "home",
  "/aspirantes": "aspirantes",
  "/avisos": "avisos",
  "/carrera": "carrera",
  "/hall-of-fame": "hallOfFame",
  "/oportunidades": "oportunidades",
  "/proyectos": "proyectos",
  "/recursos": "alumnos",
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

const isContentGeneratedPage = (file: string): boolean => {
  const relative = file.replace(`${appDir}`, "");
  const dynamicSegments = relative.match(/\[[^\]]+\]/gu) ?? [];
  return dynamicSegments.length > 1;
};

const routeFromPageFile = (file: string): string => {
  const relative =
    file.replace(`${appDir}`, "").replace("/page.tsx", "") || "/";
  return relative.replace("/[lang]", "") || "/";
};

const collectFixedPageIssues = (pageFiles: string[]): string[] => {
  const issues: string[] = [];

  if (pageFiles.length !== sitePaths.length) {
    issues.push(
      `expected ${sitePaths.length} fixed page routes, found ${pageFiles.length}`
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

const collectContentPageIssues = (pageFiles: string[]): string[] => {
  const issues: string[] = [];

  for (const file of pageFiles) {
    const route = routeFromPageFile(file);
    const source = readFileSync(file, "utf-8");

    if (!/export const generateMetadata/u.test(source)) {
      issues.push(`${route}: missing generateMetadata export`);
    }

    if (!/export const generateStaticParams/u.test(source)) {
      issues.push(`${route}: missing generateStaticParams export`);
    }
  }

  return issues;
};

const projectSiteRoutes = locales.flatMap((locale) =>
  projects.map((project) => localizedPath(locale, `/proyectos/${project.slug}`))
);

describe("seo metadata", () => {
  const pageFiles = findPageFiles(appDir).toSorted();
  const fixedPageFiles = pageFiles.filter(
    (file) => !isContentGeneratedPage(file)
  );
  const contentPageFiles = pageFiles.filter(isContentGeneratedPage);

  it("exports generateMetadata on every fixed route", () => {
    expect(collectFixedPageIssues(fixedPageFiles)).toStrictEqual([]);
  });

  it("exports generateMetadata and generateStaticParams on content routes", () => {
    expect(collectContentPageIssues(contentPageFiles)).toStrictEqual([]);
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

  it("keeps project metadata within bounds for every locale", () => {
    const issues: string[] = [];

    for (const locale of locales) {
      for (const project of projects) {
        const pageTitle = project.metaTitle ?? project.title;
        const rendered = `${pageTitle}${titleSuffix}`;
        const { metaDescription } = project;

        if (metaDescription.length > maxDescriptionLength) {
          issues.push(
            `${locale} /proyectos/${project.slug}: description exceeds ${maxDescriptionLength} chars`
          );
        }
        if (metaDescription.length < minDescriptionLength) {
          issues.push(
            `${locale} /proyectos/${project.slug}: description below ${minDescriptionLength} chars (${metaDescription.length})`
          );
        }
        if (rendered.length > maxTitleLength) {
          issues.push(
            `${locale} /proyectos/${project.slug}: title exceeds ${maxTitleLength} chars (${rendered.length})`
          );
        }
      }
    }

    expect(issues).toStrictEqual([]);
  });

  it("lists fixed and project routes in sitemap.ts", () => {
    const entries = sitemap();
    const paths = entries.map((entry) => new URL(entry.url).pathname);
    const expected = [...siteRoutes, ...projectSiteRoutes];

    for (const route of expected) {
      expect(paths).toContain(route);
    }
    expect(entries).toHaveLength(expected.length);
    expect(entries.map((entry) => entry.lastModified)).toStrictEqual(
      expected.map(() => siteLastModified)
    );
  });

  it("keeps sitemap.ts aligned with fixed page routes", () => {
    const routesFromPages = fixedPageFiles.map(routeFromPageFile).toSorted();
    expect([...sitePaths].toSorted()).toStrictEqual(routesFromPages);
  });
});
