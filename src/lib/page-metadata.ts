import type { Metadata } from "next";

import type { Project } from "@/content/projects";
import type { Dictionary } from "@/lib/dictionary";
import { languageAlternates, locales, localizedPath } from "@/lib/i18n";
import type { Locale, SitePath } from "@/lib/i18n";
import { siteUrl } from "@/lib/site";

const titleSuffix = " | CSE";

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

export const pageMetadata = (
  locale: Locale,
  path: SitePath,
  dict: Dictionary
): Metadata => {
  const { description, title } = dict.pages[pageKey[path]].meta;
  const url = `${siteUrl}${localizedPath(locale, path)}`;
  const isHome = path === "/";
  const ogTitle = isHome ? title : `${title}${titleSuffix}`;

  return {
    alternates: {
      canonical: localizedPath(locale, path),
      languages: languageAlternates(path),
    },
    description,
    openGraph: {
      description,
      locale: dict.ogLocale,
      title: ogTitle,
      type: "website",
      url,
    },
    title: isHome ? { absolute: title } : title,
    twitter: {
      description,
      title: ogTitle,
    },
  };
};

export const projectMetadata = (
  locale: Locale,
  project: Project,
  dict: Dictionary
): Metadata => {
  const { metaDescription, metaTitle, title } = project;
  const pageTitle = metaTitle ?? title;
  const path = localizedPath(locale, `/proyectos/${project.slug}`);
  const renderedTitle = `${pageTitle}${titleSuffix}`;
  const url = `${siteUrl}${path}`;

  const projectPath = `/proyectos/${project.slug}`;
  const languages = {
    "x-default": `${siteUrl}${localizedPath("es", projectPath)}`,
    ...Object.fromEntries(
      locales.map((item) => [
        item,
        `${siteUrl}${localizedPath(item, projectPath)}`,
      ])
    ),
  } satisfies Record<string, string>;

  return {
    alternates: {
      canonical: path,
      languages,
    },
    description: metaDescription,
    openGraph: {
      description: metaDescription,
      images: [{ url: `${siteUrl}${project.cover.src}` }],
      locale: dict.ogLocale,
      title: renderedTitle,
      type: "article",
      url,
    },
    title: pageTitle,
    twitter: {
      description: metaDescription,
      images: [`${siteUrl}${project.cover.src}`],
      title: renderedTitle,
    },
  };
};
