import type { Metadata } from "next";

import type { Dictionary } from "@/lib/dictionary";
import type { Locale, SitePath } from "@/lib/i18n";
import { languageAlternates, localizedPath } from "@/lib/i18n";
import { siteUrl } from "@/lib/site";

const pageKey = {
  "/": "home",
  "/alumnos": "alumnos",
  "/aspirantes": "aspirantes",
  "/carrera": "carrera",
  "/comunidad": "comunidad",
  "/oportunidades": "oportunidades",
  "/proyectos": "proyectos",
} as const;

export const pageMetadata = (
  locale: Locale,
  path: SitePath,
  dict: Dictionary
): Metadata => {
  const { description, title } = dict.pages[pageKey[path]].meta;
  const url = `${siteUrl}${localizedPath(locale, path)}`;
  const isHome = path === "/";
  const ogTitle = isHome ? title : `${title} | ISGC`;

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
