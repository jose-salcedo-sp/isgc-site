import Image from "next/image";

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
    <figure className="mt-auto pt-6">
      <Image
        src={project.image}
        alt=""
        width={1200}
        height={600}
        sizes="(max-width: 767px) 100vw, 550px"
        className="rounded-card aspect-[2/1] w-full object-cover"
      />
      <figcaption className="text-piedra mt-2 text-xs">
        Imagen ilustrativa de referencia.
      </figcaption>
    </figure>
  </article>
);
