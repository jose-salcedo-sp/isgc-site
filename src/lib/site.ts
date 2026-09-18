import { coordination } from "@/content/site-content";
import curriculum from "@/data/curriculum.json";

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

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
