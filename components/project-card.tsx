import Image from "next/image";
import { projects } from "@/content/site-content";

export function ProjectCard({ project }: { project: (typeof projects)[number] }) {
  return (
    <article className="project-card flex min-w-0 flex-col rounded-card bg-white p-6 sm:p-7">
      <h3 className="font-serif text-2xl text-grafito sm:text-3xl">{project.title}</h3>
      <p className="mt-3 text-piedra">{project.process}</p>
      <p className="mt-4 font-semibold text-tinto">{project.learning}</p>
      <p className="mt-4 text-sm text-piedra">{project.authors}. {project.date === "Archivo · 2015" ? "Proyecto realizado en 2015." : "Aplicación ilustrativa de análisis de datos."}</p>
      <figure className="mt-auto pt-6">
        <Image src={project.image} alt="" width={1200} height={600} sizes="(max-width: 767px) 100vw, 550px" className="aspect-[2/1] w-full rounded-card object-cover" />
        <figcaption className="mt-2 text-xs text-piedra">Imagen ilustrativa de referencia.</figcaption>
      </figure>
    </article>
  );
}
