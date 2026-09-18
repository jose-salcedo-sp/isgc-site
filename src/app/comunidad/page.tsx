import type { Metadata } from "next";

import {
  PageFrame,
  PageIntro,
  PageSection,
  SectionHeading,
} from "@/components/page-frame";
import { BreadcrumbJsonLd } from "@/components/seo/breadcrumb-json-ld";
import {
  campusSpaces,
  coordination,
  externalLinks,
  faculty,
  homepageEvents,
} from "@/content/site-content";
import { siteUrl } from "@/lib/site";

export const revalidate = 3600;

export const metadata: Metadata = {
  alternates: {
    canonical: "/comunidad",
  },
  description:
    "Comunidad ISGC en la Universidad Panamericana Guadalajara: equipo académico, espacios del campus, coordinación, noticias y eventos de Ingeniería en Sistemas.",
  openGraph: {
    description:
      "Comunidad ISGC en la Universidad Panamericana Guadalajara: equipo académico, espacios del campus, coordinación, noticias y eventos de Ingeniería en Sistemas.",
    title: "Comunidad | ISGC",
    type: "website",
    url: `${siteUrl}/comunidad`,
  },
  title: "Comunidad",
};

const ComunidadPage = () => (
  <PageFrame>
    <BreadcrumbJsonLd
      items={[
        { name: "Inicio", path: "/" },
        { name: "Comunidad", path: "/comunidad" },
      ]}
    />
    <PageIntro
      title="La carrera también se construye con otras personas."
      description="Conoce al equipo académico, los espacios del campus y las noticias que conectan a la comunidad ISGC."
    />
    <PageSection>
      <SectionHeading title="Equipo académico" />
      <div className="grid gap-4 md:grid-cols-2">
        {faculty.map((person) => (
          <article
            key={person.name}
            className="rounded-card bg-marfil shadow-soft/50 p-7"
          >
            <div className="bg-tinto flex h-12 w-12 items-center justify-center rounded-full font-serif text-xl text-white">
              {person.name
                .split(" ")
                .map((part) => part[0])
                .slice(0, 2)
                .join("")}
            </div>
            <h3 className="text-grafito mt-4 font-serif text-2xl">
              {person.name}
            </h3>
            <p className="text-tinto mt-1 font-semibold">{person.role}</p>
            <p className="text-piedra mt-2">{person.area}</p>
            <a
              href={`mailto:${person.email}`}
              className="text-tinto mt-5 inline-flex text-sm font-semibold underline underline-offset-4"
            >
              {person.email}
            </a>
          </article>
        ))}
      </div>
    </PageSection>
    <PageSection tone="marfil" id="archivo">
      <SectionHeading title="Noticias y eventos" />
      <div className="grid gap-4 md:grid-cols-2">
        {homepageEvents.flatMap((event) =>
          event.published
            ? [
                <article
                  id={event.id}
                  key={event.title}
                  className="rounded-card shadow-soft/50 bg-white p-6"
                >
                  <h3 className="text-grafito font-serif text-2xl">
                    {event.title}
                  </h3>
                  <p className="text-tinto mt-3 font-semibold">{event.date}</p>
                  <p className="text-piedra mt-3">{event.text}</p>
                </article>,
              ]
            : []
        )}
      </div>
      <p className="text-piedra mt-7">
        Consulta con Coordinación las próximas actividades. Aquí podrás
        consultar las noticias publicadas y su archivo.
      </p>
    </PageSection>
    <PageSection>
      <SectionHeading
        title="Espacios para encontrarnos"
        description="Ubica los puntos donde puedes estudiar, resolver dudas o trabajar con otras personas."
      />
      <div className="grid gap-4 md:grid-cols-3">
        {campusSpaces.map((space) => (
          <article key={space.title} className="rounded-card bg-marfil p-6">
            <h3 className="text-grafito font-serif text-2xl">{space.title}</h3>
            <p className="text-tinto mt-3 font-semibold">{space.location}</p>
            <p className="text-piedra mt-3">{space.text}</p>
          </article>
        ))}
      </div>
      <a
        href={externalLinks.campusMap}
        target="_blank"
        rel="noreferrer"
        className="text-tinto decoration-dorado mt-8 inline-flex font-semibold underline decoration-2 underline-offset-4"
      >
        Abrir mapa del campus ↗
      </a>
    </PageSection>
    <PageSection tone="marfil">
      <div className="rounded-card bg-tinto p-8 text-white sm:p-10">
        <h2 className="font-serif text-4xl">Contacta a Coordinación</h2>
        <p className="mt-4 text-white/80">
          {coordination.name} · {coordination.location}
        </p>
        <a
          href={`mailto:${coordination.email}`}
          className="text-dorado mt-6 inline-flex font-bold underline underline-offset-4"
        >
          {coordination.email} ↗
        </a>
      </div>
    </PageSection>
  </PageFrame>
);

export default ComunidadPage;
