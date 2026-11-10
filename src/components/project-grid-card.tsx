import Image from "next/image";
import Link from "next/link";

import type { Project } from "@/content/projects";
import type { Dictionary } from "@/lib/dictionary";
import { localizedPath } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";

const hasVideo = (project: Project) =>
  project.media.some((item) => item.kind === "video");

const hasModel = (project: Project) =>
  project.media.some((item) => item.kind === "model");

const teamSummary = (project: Project) => {
  if (project.team.length === 0) {
    return null;
  }
  const [lead, ...rest] = project.team;
  return rest.length === 0 ? lead.name : `${lead.name} · +${rest.length}`;
};

export const ProjectGridCard = ({
  dict,
  index,
  locale,
  project,
}: {
  dict: Dictionary;
  index: number;
  locale: Locale;
  project: Project;
}) => {
  const labels = dict.pages.proyectos;
  const href = localizedPath(locale, `/proyectos/${project.slug}`);
  const summary = teamSummary(project);

  return (
    <article className="project-card group rounded-card shadow-soft/40 relative flex h-full flex-col overflow-hidden bg-white">
      <div className="bg-grafito relative aspect-[4/3] overflow-hidden">
        <Image
          alt={project.cover.alt}
          className="object-cover motion-safe:transition-transform motion-safe:duration-300 motion-safe:group-focus-within:scale-[1.02] motion-safe:group-hover:scale-[1.02]"
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          src={project.cover.src}
          priority={index < 4}
        />
        <div className="pointer-events-none absolute top-3 right-3 flex gap-2">
          {hasVideo(project) && (
            <span className="bg-grafito/90 rounded-full px-2 py-0.5 text-[10px] font-bold tracking-wider text-[#e2c58f] uppercase">
              {labels.badgeVideo}
            </span>
          )}
          {hasModel(project) && (
            <span className="bg-grafito/90 rounded-full px-2 py-0.5 text-[10px] font-bold tracking-wider text-[#e2c58f] uppercase">
              {labels.badge3d}
            </span>
          )}
        </div>
      </div>
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p className="text-tinto text-xs font-bold tracking-[0.18em] uppercase">
          {project.year} · {labels.cardKind}
        </p>
        <h3 className="text-grafito mt-2 line-clamp-2 text-xl leading-snug tracking-[-0.02em] sm:text-2xl">
          {project.title}
        </h3>
        <p className="text-piedra mt-2 line-clamp-2 text-sm">
          {project.description}
        </p>
        <div className="mt-auto flex items-end justify-between gap-3 pt-4">
          {summary ? (
            <p className="text-piedra text-sm">{summary}</p>
          ) : (
            <span />
          )}
          {project.githubUrl ? (
            <a
              href={project.githubUrl}
              className="text-tinto decoration-dorado relative z-20 text-sm font-semibold underline decoration-2 underline-offset-4"
              rel="noreferrer"
              target="_blank"
            >
              {labels.githubLink}
            </a>
          ) : null}
        </div>
      </div>
      <Link
        className="rounded-card absolute inset-0 z-10 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-[#5d1028]"
        href={href}
      >
        <span className="sr-only">
          {project.title} ({project.year})
        </span>
      </Link>
    </article>
  );
};
