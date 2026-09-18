import type { Dictionary } from "@/lib/dictionary";

export const ProjectCard = ({
  project,
}: {
  project: Dictionary["projects"][number];
}) => (
  <article className="project-card rounded-card flex min-w-0 flex-col bg-white p-6 sm:p-7">
    <h3 className="text-grafito font-serif text-2xl sm:text-3xl">
      {project.title}
    </h3>
    <p className="text-piedra mt-3">{project.process}</p>
    <p className="text-tinto mt-4 font-semibold">{project.learning}</p>
    <p className="text-piedra mt-4 text-sm">
      {project.authors}. {project.caption}
    </p>
  </article>
);
