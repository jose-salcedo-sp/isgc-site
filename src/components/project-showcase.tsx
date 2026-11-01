import { ProjectGallery } from "@/components/project-gallery";

export type ProjectMedia =
  | { alt: string; caption: string; kind: "photo"; src: string }
  | {
      caption: string;
      captions: string;
      kind: "video";
      poster: string;
      src: string;
      type: string;
    }
  | { alt: string; caption: string; kind: "model"; src: string };

export interface ProjectShowcaseData {
  description: string;
  media: ProjectMedia[];
  result: string;
  team: { name: string; role: string }[];
  title: string;
  year: string;
}

export const ProjectShowcase = ({
  project,
}: {
  project: ProjectShowcaseData;
}) => (
  <article className="grid items-start gap-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-16">
    <ProjectGallery media={project.media} />
    <div className="min-w-0">
      <p className="text-tinto text-sm font-bold tracking-[0.18em] uppercase">
        {project.year} · Proyecto
      </p>
      <h3 className="text-grafito mt-4 text-4xl leading-[1.05] tracking-[-0.03em] sm:text-5xl">
        {project.title}
      </h3>
      <p className="text-piedra mt-5 max-w-lg text-lg">{project.description}</p>

      <section className="mt-9">
        <h4 className="text-grafito text-sm font-bold tracking-[0.18em] uppercase">
          Equipo
        </h4>
        <dl className="mt-3">
          {project.team.map((person) => (
            <div
              key={person.name}
              className="border-grafito/15 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b py-3"
            >
              <dt className="text-grafito text-lg font-semibold">
                {person.name}
              </dt>
              <dd className="text-piedra text-sm">{person.role}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="border-dorado mt-8 border-l-2 pl-4">
        <h4 className="text-grafito text-sm font-bold tracking-[0.18em] uppercase">
          Resultado
        </h4>
        <p className="text-grafito mt-1 text-lg font-medium">
          {project.result}
        </p>
      </section>
    </div>
  </article>
);
