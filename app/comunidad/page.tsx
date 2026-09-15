export const dynamic = "force-dynamic";
import { PageFrame, PageIntro, PageSection, SectionHeading } from "@/components/page-frame";
import { campusSpaces, coordination, externalLinks, faculty, homepageEvents } from "@/content/site-content";

export const metadata = { title: "Comunidad | ISGC", description: "Personas, espacios, noticias y eventos de ISGC." };

export default function ComunidadPage() {
  return (
    <PageFrame>
      <PageIntro title="La carrera también se construye con otras personas." description="Conoce al equipo académico, los espacios del campus y las noticias que conectan a la comunidad ISGC." />
      <PageSection><SectionHeading title="Equipo académico" /><div className="grid gap-4 md:grid-cols-2">{faculty.map((person) => <article key={person.name} className="rounded-card bg-marfil p-7 shadow-soft/50"><div className="flex h-12 w-12 items-center justify-center rounded-full bg-tinto font-serif text-xl text-white">{person.name.split(" ").map((part) => part[0]).slice(0, 2).join("")}</div><h3 className="mt-4 font-serif text-2xl text-grafito">{person.name}</h3><p className="mt-1 font-semibold text-tinto">{person.role}</p><p className="mt-2 text-piedra">{person.area}</p><a href={`mailto:${person.email}`} className="mt-5 inline-flex text-sm font-semibold text-tinto underline underline-offset-4">{person.email}</a></article>)}</div></PageSection>
      <PageSection tone="marfil" id="archivo"><SectionHeading title="Noticias y eventos" /><div className="grid gap-4 md:grid-cols-2">{homepageEvents.filter((event) => event.published).map((event) => <article id={event.id} key={event.title} className="rounded-card bg-white p-6 shadow-soft/50"><h3 className="font-serif text-2xl text-grafito">{event.title}</h3><p className="mt-3 font-semibold text-tinto">{event.date}</p><p className="mt-3 text-piedra">{event.text}</p></article>)}</div><p className="mt-7 text-piedra">Consulta con Coordinación las próximas actividades. Aquí podrás consultar las noticias publicadas y su archivo.</p></PageSection>
      <PageSection><SectionHeading title="Espacios para encontrarnos" description="Ubica los puntos donde puedes estudiar, resolver dudas o trabajar con otras personas." /><div className="grid gap-4 md:grid-cols-3">{campusSpaces.map((space) => <article key={space.title} className="rounded-card bg-marfil p-6"><h3 className="font-serif text-2xl text-grafito">{space.title}</h3><p className="mt-3 font-semibold text-tinto">{space.location}</p><p className="mt-3 text-piedra">{space.text}</p></article>)}</div><a href={externalLinks.campusMap} target="_blank" rel="noreferrer" className="mt-8 inline-flex font-semibold text-tinto underline decoration-dorado decoration-2 underline-offset-4">Abrir mapa del campus ↗</a></PageSection>
      <PageSection tone="marfil"><div className="rounded-card bg-tinto p-8 text-white sm:p-10"><h2 className="font-serif text-4xl">Contacta a Coordinación</h2><p className="mt-4 text-white/80">{coordination.name} · {coordination.location}</p><a href={`mailto:${coordination.email}`} className="mt-6 inline-flex font-bold text-dorado underline underline-offset-4">{coordination.email} ↗</a></div></PageSection>
    </PageFrame>
  );
}
