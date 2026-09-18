import type { projects } from "@/content/site-content";

export const ProjectCard = ({
  project,
}: {
  project: (typeof projects)[number];
}) => (
  <article className="project-card rounded-card flex min-w-0 flex-col bg-white p-6 sm:p-7">
    <h3 className="text-grafito font-serif text-2xl sm:text-3xl">
      {project.title}
    </h3>
    <p className="text-piedra mt-3">{project.process}</p>
    <p className="text-tinto mt-4 font-semibold">{project.learning}</p>
    <p className="text-piedra mt-4 text-sm">
      {project.authors}.{" "}
      {project.date === "Archivo · 2015"
        ? "Proyecto realizado en 2015."
        : "Aplicación ilustrativa de análisis de datos."}
    </p>
  </article>
);
