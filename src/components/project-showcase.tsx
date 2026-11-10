import Image from "next/image";

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
  githubUrl?: string;
  media: ProjectMedia[];
  result: string;
  team: { name: string; role: string }[];
  title: string;
  year: string;
}

const ProjectCoverStage = ({
  cover,
}: {
  cover: { alt: string; src: string };
}) => (
  <div className="min-w-0">
    <div className="lab-panel relative aspect-[16/10] overflow-hidden">
      <Image
        alt={cover.alt}
        className="object-cover"
        fill
        sizes="(max-width: 1024px) 100vw, 58vw"
        src={cover.src}
      />
    </div>
  </div>
);

const mediaColumn = (
  media: ProjectShowcaseData["media"],
  cover?: { alt: string; src: string }
) => {
  if (media.length > 0) {
    return <ProjectGallery media={media} />;
  }
  if (cover) {
    return <ProjectCoverStage cover={cover} />;
  }
  return null;
};

export const ProjectShowcase = ({
  cover,
  labels,
  project,
  showHeading = true,
}: {
  cover?: { alt: string; src: string };
  labels: { result: string; team: string };
  project: ProjectShowcaseData;
  showHeading?: boolean;
}) => (
  <article className="grid items-start gap-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-16">
    {mediaColumn(project.media, cover)}
    <div className="min-w-0">
      {showHeading ? (
        <>
          <p className="text-tinto text-sm font-bold tracking-[0.18em] uppercase">
            {project.year} · Proyecto
          </p>
          <h2 className="text-grafito mt-4 text-4xl leading-[1.05] tracking-[-0.03em] sm:text-5xl">
            {project.title}
          </h2>
        </>
      ) : null}
      <p
        className={`text-piedra max-w-lg text-lg ${showHeading ? "mt-5" : "mt-0"}`}
      >
        {project.description}
      </p>

      {project.team.length > 0 ? (
        <section className="mt-9">
          <h2 className="text-grafito text-sm font-bold tracking-[0.18em] uppercase">
            {labels.team}
          </h2>
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
      ) : null}

      <section className="border-dorado mt-8 border-l-2 pl-4">
        <h2 className="text-grafito text-sm font-bold tracking-[0.18em] uppercase">
          {labels.result}
        </h2>
        <p className="text-grafito mt-1 text-lg font-medium">
          {project.result}
        </p>
      </section>
    </div>
  </article>
);
