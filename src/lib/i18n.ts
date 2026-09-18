import type { ReactNode } from "react";

export const locales = ["es", "en-GB", "en-US"] as const;

export type Locale = (typeof locales)[number];

export interface LocaleParams {
  params: Promise<{ lang: string }>;
}

export interface LocaleLayoutProps extends LocaleParams {
  children: ReactNode;
}

export const defaultLocale: Locale = "es";

export const sitePaths = [
  "/",
  "/carrera",
  "/proyectos",
  "/comunidad",
  "/alumnos",
  "/aspirantes",
  "/oportunidades",
] as const;

export type SitePath = (typeof sitePaths)[number];

export const hasLocale = (value: string): value is Locale =>
  locales.some((locale) => locale === value);

export const localizedPath = (locale: Locale, path: string): string => {
  const [pathname, hash] = path.split("#");
  const normalized = pathname === "/" ? "" : (pathname ?? "");
  const href = `/${locale}${normalized}`;
  return hash ? `${href}#${hash}` : href;
};

export const stripLocale = (pathname: string): string => {
  for (const locale of locales) {
    if (pathname === `/${locale}`) {
      return "/";
    }
    if (pathname.startsWith(`/${locale}/`)) {
      const rest = pathname.slice(locale.length + 1);
      return rest || "/";
    }
  }
  return pathname;
};

export const languageAlternates = (path: SitePath) => ({
  "en-GB": localizedPath("en-GB", path),
  "en-US": localizedPath("en-US", path),
  es: localizedPath("es", path),
  "x-default": localizedPath(defaultLocale, path),
});

const regionEnglish = new Set(["en-gb", "en-uk", "en-au", "en-nz", "en-ie"]);

const parseAcceptLanguage = (header: string): string[] =>
  header
    .split(",")
    .map((part) => {
      const [tag, ...params] = part.trim().split(";");
      const q = params.find((param) => param.trim().startsWith("q="));
      const quality = q ? Number(q.trim().slice(2)) : 1;
      return { quality: Number.isNaN(quality) ? 0 : quality, tag: tag?.trim() };
    })
    .filter((part): part is { quality: number; tag: string } =>
      Boolean(part.tag)
    )
    .toSorted((left, right) => right.quality - left.quality)
    .map((part) => part.tag);

export const fill = (
  template: string,
  vars: Record<string, string | number>
): string => {
  let result = template;
  for (const [key, value] of Object.entries(vars)) {
    result = result.replaceAll(`{${key}}`, String(value));
  }
  return result;
};

export const negotiateLocale = (acceptLanguage: string | null): Locale => {
  for (const tag of parseAcceptLanguage(acceptLanguage ?? "")) {
    const lower = tag.toLowerCase();
    if (lower === "*" || lower.length === 0) {
      continue;
    }
    if (lower === "en-us" || lower === "en") {
      return "en-US";
    }
    if (regionEnglish.has(lower) || lower.startsWith("en-gb")) {
      return "en-GB";
    }
    if (lower === "es" || lower.startsWith("es-")) {
      return "es";
    }
  }

  return defaultLocale;
};
