import { coordination, externalLinks } from "@/content/site-content";
import curriculum from "@/data/curriculum.json";

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://isgc-site.vercel.app";

export const universityUrl = externalLinks.admissions;

export const siteLastModified = new Date("2026-09-18T00:00:00.000Z");

const { program } = curriculum;

export const org = {
  address: program.address,
  campus: program.campus,
  coordination,
  name: program.name,
  plan: program.plan,
  rvoe: program.rvoe,
  summary: program.summary,
} as const;

export const siteRoutes = [
  "/",
  "/carrera",
  "/proyectos",
  "/comunidad",
  "/alumnos",
  "/aspirantes",
  "/oportunidades",
] as const;
