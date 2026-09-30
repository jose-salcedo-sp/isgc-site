import curriculum from "@/data/curriculum.json";
import { locales, localizedPath, sitePaths } from "@/lib/i18n";

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://isgc-site.vercel.app";

export const universityUrl = "https://www.up.edu.mx/";

export const siteLastModified = new Date("2026-09-20T00:00:00.000Z");

const { program } = curriculum;

export const org = {
  address: program.address,
  campus: program.campus,
  coordinationEmail: "arodrig@up.edu.mx",
  name: program.name,
  plan: program.plan,
  rvoe: program.rvoe,
} as const;

export const siteRoutes = locales.flatMap((locale) =>
  sitePaths.map((path) => localizedPath(locale, path))
);
