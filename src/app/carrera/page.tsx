import type { Metadata } from "next";

import { GraphView } from "@/components/graph/graph-view";
import {
  ExternalLink,
  PageFrame,
  PageIntro,
  PageSection,
  SectionHeading,
} from "@/components/page-frame";
import { JsonLd } from "@/components/seo/json-ld";
import { externalLinks, specialties } from "@/content/site-content";
import curriculum from "@/data/curriculum.json";
import { curriculumGraph } from "@/lib/curriculum-graph";
import { org, siteUrl, universityUrl } from "@/lib/site";

export const metadata: Metadata = {
  alternates: {
    canonical: "/carrera",
  },
  description:
    "Explora la Ingeniería en Sistemas y Gráficas Computacionales en la Universidad Panamericana Guadalajara: plan de estudios, mapa curricular y especialización.",
  openGraph: {
    description:
      "Explora la Ingeniería en Sistemas y Gráficas Computacionales en la Universidad Panamericana Guadalajara: plan de estudios, mapa curricular y especialización.",
    title: "Plan de estudios UP Guadalajara | ISGC",
    type: "website",
    url: `${siteUrl}/carrera`,
  },
  title: "Plan de estudios UP Guadalajara",
  twitter: {
    description:
      "Explora la Ingeniería en Sistemas y Gráficas Computacionales en la Universidad Panamericana Guadalajara: plan de estudios, mapa curricular y especialización.",
    title: "Plan de estudios UP Guadalajara | ISGC",
  },
};

const carreraDescription =
  "Ingeniería en Sistemas y Gráficas Computacionales combina programación, datos, gráficas y proyectos para que aprendas haciendo.";

const planSemesters = Array.from(
  { length: curriculum.program.semesters },
  (_, index) => {
    const semester = index + 1;

    return {
      courses: curriculum.courses.filter(
        (course) => course.semester === semester
      ),
      semester,
    };
  }
);

const CarreraPage = () => (
  <PageFrame>
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Course",
        description: carreraDescription,
        educationalCredentialAwarded: org.name,
        identifier: org.rvoe,
        name: org.name,
        provider: {
          "@type": "CollegeOrUniversity",
          name: org.campus,
          url: universityUrl,
        },
      }}
    />
    <PageIntro
      crumb={{ name: "Carrera", path: "/carrera" }}
      description={carreraDescription}
      lede="Aprende a construir sistemas, experiencias y herramientas que hacen diferencia."
      title="Plan de estudios de Ingeniería en Sistemas y Gráficas Computacionales"
    />
    <PageSection>
      <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr]">
        <h2 className="text-grafito font-serif text-4xl leading-tight sm:text-5xl">
          Una formación amplia para problemas que todavía no tienen nombre.
        </h2>
        <div>
          <p className="text-piedra text-xl leading-relaxed">
            Vas a programar, modelar, analizar y presentar ideas. La carrera se
            mueve entre fundamentos técnicos y proyectos donde tienes que tomar
            decisiones.
          </p>
        </div>
      </div>
    </PageSection>
    <PageSection tone="marfil">
      <SectionHeading
        title="Cómo se aprende"
        description="La teoría toma forma cuando la conviertes en algo que puede probarse, explicarse y mejorar."
      />
      <div className="grid gap-4 md:grid-cols-3">
        {[
          {
            text: "Observa un problema, formula preguntas y construye una base sólida.",
            title: "Entender",
          },
          {
            text: "Programa, diseña prototipos y trabaja con herramientas que se usan fuera del aula.",
            title: "Construir",
          },
          {
            text: "Presenta decisiones, recibe retroalimentación y trabaja con otras personas.",
            title: "Compartir",
          },
        ].map((item) => (
          <article
            key={item.title}
            className="rounded-card shadow-soft/50 bg-white p-6"
          >
            <h3 className="text-grafito font-serif text-2xl">{item.title}</h3>
            <p className="text-piedra mt-3">{item.text}</p>
          </article>
        ))}
      </div>
    </PageSection>
    <PageSection id="semestres">
      <SectionHeading
        title="Consulta tu plan de estudios"
        description={`Plan ${org.plan} · diez semestres · ${curriculum.courses.length} materias. ${org.campus}. RVOE ${org.rvoe}.`}
      />
      <ul className="grid gap-4 md:grid-cols-2">
        {curriculum.glanceAreas.map((area) => (
          <li key={area.id} className="rounded-card bg-marfil p-6">
            <h3 className="text-grafito font-serif text-2xl">{area.name}</h3>
            <p className="text-piedra mt-3">{area.description}</p>
          </li>
        ))}
      </ul>
      <ol className="mt-10 grid gap-6 md:grid-cols-2">
        {planSemesters.map((item) => (
          <li key={item.semester} className="rounded-card bg-marfil p-6">
            <h3 className="text-grafito font-serif text-2xl">
              Semestre {item.semester}
            </h3>
            <ul className="text-piedra mt-4 list-disc space-y-1 pl-5">
              {item.courses.map((course) => (
                <li key={course.id}>{course.name}</li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
      <div className="mt-8 flex flex-wrap gap-5">
        <ExternalLink href={externalLinks.tuRutaIdeal}>
          Abrir Tu Ruta Ideal
        </ExternalLink>
        <a
          href="mailto:arodrig@up.edu.mx?subject=Plan%20de%20estudios%20ISGC"
          className="text-tinto decoration-dorado font-semibold underline decoration-2 underline-offset-4"
        >
          Solicitar el plan oficial ↗
        </a>
      </div>
    </PageSection>
    <section className="graph-surface w-full py-16 sm:py-20" id="mapa">
      <div className="mx-auto max-w-300 px-5 lg:px-6">
        <p className="text-dorado text-xs font-bold tracking-[0.18em] uppercase">
          Plan 2015
        </p>
        <h2 className="text-foreground mt-4 max-w-3xl font-serif text-4xl leading-[1.05] sm:text-6xl">
          Tu carrera <em className="text-dorado not-italic">de un vistazo</em>.
        </h2>
        <p className="text-muted-foreground mt-5 max-w-2xl text-lg leading-relaxed">
          Diez semestres, 57 materias y los temas que las conectan. {org.campus}
          . RVOE {org.rvoe}. Pasa el cursor por cualquier parte del mapa para
          ver de dónde viene y hacia dónde lleva.
        </p>
        <ul className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
          {[
            { label: "Semestres", tone: "bg-graph-semester" },
            { label: "Materias", tone: "bg-graph-course" },
            { label: "Temas", tone: "bg-graph-subject" },
          ].map((item) => (
            <li
              className="text-muted-foreground flex items-center gap-2 text-sm font-semibold"
              key={item.label}
            >
              <span className={`size-2.5 rounded-full ${item.tone}`} />
              {item.label}
            </li>
          ))}
        </ul>
        <div className="mx-auto mt-10 aspect-square w-full max-w-215">
          <GraphView
            initialEdges={curriculumGraph.edges}
            initialNodes={curriculumGraph.nodes}
            text={curriculumGraph.text}
          />
        </div>
      </div>
    </section>
    <PageSection tone="marfil" id="especializacion">
      <SectionHeading
        title="Dos formas de profundizar"
        description="Explora estas áreas en tus proyectos y confirma la oferta vigente con Coordinación."
      />
      <div className="grid gap-5 md:grid-cols-2">
        {specialties.map((specialty) => (
          <article
            key={specialty.title}
            className="rounded-card shadow-soft/50 bg-white p-7"
          >
            <h3 className="text-grafito font-serif text-3xl">
              {specialty.title}
            </h3>
            <p className="text-piedra mt-4 text-lg">{specialty.text}</p>
            <ul className="text-grafito mt-6 space-y-2 font-semibold">
              {specialty.subjects.map((subject) => (
                <li key={subject}>· {subject}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </PageSection>
    <PageSection>
      <div className="grid gap-5 md:grid-cols-2">
        <article className="rounded-card bg-tinto p-7 text-white sm:p-9">
          <h2 className="font-serif text-3xl">Doble carrera</h2>
          <p className="mt-4 text-white/80">
            Consulta con Coordinación la disponibilidad, el semestre de
            incorporación, las equivalencias y los costos de una doble carrera.
          </p>
        </article>
        <article className="rounded-card bg-marfil p-7 sm:p-9">
          <h2 className="text-grafito font-serif text-3xl">
            Campo profesional
          </h2>
          <p className="text-piedra mt-4">
            Software, datos, visualización, producto digital, automatización,
            investigación y emprendimiento.
          </p>
        </article>
      </div>
    </PageSection>
  </PageFrame>
);

export default CarreraPage;
