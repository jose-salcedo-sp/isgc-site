import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";

import { describe, expect, it } from "vitest";

import sitemap from "@/app/sitemap";
import { siteRoutes } from "@/lib/site";

const appDir = path.join(process.cwd(), "src/app");
const titleSuffix = " | ISGC";
const maxTitleLength = 60;
const maxDescriptionLength = 160;
const minDescriptionLength = 120;

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

const routeFromPageFile = (file: string): string =>
  file.replace(`${appDir}`, "").replace("/page.tsx", "") || "/";

const metadataBlock = (source: string): string | null => {
  const start = source.indexOf("export const metadata");
  return start === -1 ? null : source.slice(start);
};

const parseDescription = (source: string): string | null => {
  const block = metadataBlock(source);
  if (!block) {
    return null;
  }
  const match = block.match(/\n {2}description:\s*\n?\s*"(?<text>[^"]+)"/u);
  return match?.groups?.text ?? null;
};

const parseRenderedTitle = (source: string): string | null => {
  const block = metadataBlock(source);
  if (!block) {
    return null;
  }

  const absoluteMatch = block.match(
    /\n {2}title:\s*\{[\s\S]*?\n {4}absolute:\s*"(?<text>[^"]+)"/u
  );
  if (absoluteMatch?.groups?.text) {
    return absoluteMatch.groups.text;
  }

  const stringMatch = block.match(/\n {2}title:\s*"(?<text>[^"]+)"/u);
  if (stringMatch?.groups?.text) {
    return `${stringMatch.groups.text}${titleSuffix}`;
  }

  return null;
};

const collectMetadataIssues = (pageFiles: string[]): string[] => {
  const issues: string[] = [];

  if (pageFiles.length !== siteRoutes.length) {
    issues.push(
      `expected ${siteRoutes.length} page routes, found ${pageFiles.length}`
    );
  }

  for (const file of pageFiles) {
    const route = routeFromPageFile(file);
    const source = readFileSync(file, "utf-8");

    if (!/export const metadata:\s*Metadata\s*=/u.test(source)) {
      issues.push(`${route}: missing metadata export`);
      continue;
    }

    const description = parseDescription(source);
    if (description) {
      if (description.length > maxDescriptionLength) {
        issues.push(
          `${route}: description exceeds ${maxDescriptionLength} chars`
        );
      }
      if (description.length < minDescriptionLength) {
        issues.push(
          `${route}: description below ${minDescriptionLength} chars`
        );
      }
    } else {
      issues.push(`${route}: missing description`);
    }

    const renderedTitle = parseRenderedTitle(source);
    if (renderedTitle) {
      if (renderedTitle.length > maxTitleLength) {
        issues.push(`${route}: title exceeds ${maxTitleLength} chars`);
      }
    } else {
      issues.push(`${route}: missing title`);
    }

    if (!/alternates:\s*\{\s*canonical:/u.test(source)) {
      issues.push(`${route}: missing alternates.canonical`);
    }
  }

  return issues;
};

describe("seo metadata", () => {
  const pageFiles = findPageFiles(appDir).toSorted();

  it("exports metadata on every route", () => {
    expect(collectMetadataIssues(pageFiles)).toStrictEqual([]);
  });

  it("lists every route in sitemap.ts", () => {
    const entries = sitemap();
    const paths = entries.map((entry) => new URL(entry.url).pathname);

    for (const route of siteRoutes) {
      expect(paths).toContain(route);
    }
    expect(entries).toHaveLength(siteRoutes.length);
  });

  it("keeps sitemap.ts aligned with page routes", () => {
    const routesFromPages = pageFiles.map(routeFromPageFile).toSorted();
    expect([...siteRoutes].toSorted()).toStrictEqual(routesFromPages);
  });
});
