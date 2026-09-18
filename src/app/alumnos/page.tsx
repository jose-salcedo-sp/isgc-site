import type { Metadata } from "next";

import {
  FaqAccordion,
  StudentResourceSearch,
} from "@/components/home-interactions";
import {
  PageFrame,
  PageIntro,
  PageSection,
  SectionHeading,
} from "@/components/page-frame";
import { BreadcrumbJsonLd } from "@/components/seo/breadcrumb-json-ld";
import {
  externalLinks,
  getCurrentHomepageEvents,
  quickAccess,
} from "@/content/site-content";
import { siteUrl } from "@/lib/site";

export const revalidate = 3600;

export const metadata: Metadata = {
  alternates: {
    canonical: "/alumnos",
  },
  description:
    "Centro de alumnos ISGC en la Universidad Panamericana Guadalajara: accesos frecuentes, trámites, recursos de estudio, avisos y herramientas para tu formación.",
  openGraph: {
    description:
      "Centro de alumnos ISGC en la Universidad Panamericana Guadalajara: accesos frecuentes, trámites, recursos de estudio, avisos y herramientas para tu formación.",
    title: "Alumnos | ISGC",
    type: "website",
    url: `${siteUrl}/alumnos`,
  },
  title: "Alumnos",
};

const AlumnosPage = () => (
  <PageFrame>
    <BreadcrumbJsonLd
      items={[
        { name: "Inicio", path: "/" },
        { name: "Alumnos", path: "/alumnos" },
      ]}
    />
    <PageIntro
      title="Todo lo que necesitas para seguir avanzando."
      description="Avisos, accesos frecuentes, trámites, estudio y desarrollo profesional en un solo lugar."
    />
    <PageSection>
      <SectionHeading title="Avisos y próximos eventos" />
      {getCurrentHomepageEvents().length === 0 && (
        <p className="text-piedra">
          Consulta con Coordinación las próximas actividades y convocatorias
          vigentes.
        </p>
      )}
      <div className="grid gap-4 md:grid-cols-2">
        {getCurrentHomepageEvents().map((event) => (
          <article
            id={event.id}
            key={event.title}
            className="rounded-card bg-marfil p-6"
          >
            <h3 className="text-grafito font-serif text-2xl">{event.title}</h3>
            <p className="text-tinto mt-3 font-semibold">{event.date}</p>
            <p className="text-piedra mt-3">{event.text}</p>
          </article>
        ))}
      </div>
    </PageSection>
    <PageSection tone="marfil">
      <SectionHeading title="Accesos frecuentes" />
      <div className="grid gap-4 md:grid-cols-3">
        {quickAccess.map((item) => (
          <a
            key={item.label}
            href={item.href}
            target="_blank"
            rel="noreferrer"
            className="rounded-card shadow-soft/50 bg-white p-6 transition hover:-translate-y-1"
          >
            <h3 className="text-grafito font-serif text-2xl">{item.label}</h3>
            <p className="text-piedra mt-3">Abre este recurso directamente.</p>
            <span className="text-tinto mt-5 inline-flex font-semibold">
              Ingresar ↗
            </span>
          </a>
        ))}
      </div>
    </PageSection>
    <PageSection id="recursos">
      <SectionHeading
        title="Recursos para tu día a día"
        description="Busca por nombre y abre cada herramienta en su destino correspondiente."
      />
      <StudentResourceSearch />
    </PageSection>
    <PageSection tone="marfil">
      <div className="grid gap-5 md:grid-cols-2">
        <article className="rounded-card bg-tinto p-7 text-white sm:p-9">
          <h2 className="font-serif text-3xl">Coordinación</h2>
          <p className="mt-4 text-white/80">
            Edificio C · 3.º piso. Para dudas sobre materias, profesores y
            procesos académicos.
          </p>
          <a
            href="mailto:arodrig@up.edu.mx"
            className="text-dorado mt-6 inline-flex font-bold underline underline-offset-4"
          >
            arodrig@up.edu.mx ↗
          </a>
        </article>
        <article className="rounded-card bg-white p-7 sm:p-9">
          <h2 className="text-grafito font-serif text-3xl">
            Reglamentos y servicios
          </h2>
          <p className="text-piedra mt-4">
            Consulta los documentos y procedimientos institucionales.
          </p>
          <a
            href={externalLinks.schoolServices}
            target="_blank"
            rel="noreferrer"
            className="text-tinto decoration-dorado mt-6 inline-flex font-semibold underline decoration-2 underline-offset-4"
          >
            Abrir Servicios Escolares ↗
          </a>
        </article>
      </div>
    </PageSection>
    <PageSection>
      <SectionHeading title="Preguntas de alumnos" />
      <FaqAccordion audience="alumnos" />
    </PageSection>
  </PageFrame>
);

export default AlumnosPage;
