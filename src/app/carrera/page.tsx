import Link from "next/link";

import { FaqAccordion } from "@/components/home-interactions";
import {
  ExternalLink,
  PageFrame,
  PageIntro,
  PageSection,
  SectionHeading,
} from "@/components/page-frame";
import { externalLinks, specialties } from "@/content/site-content";

export const metadata = {
  description: "Conoce la formación, el plan y las áreas de ISGC.",
  title: "Carrera | ISGC",
};

const CarreraPage = () => (
  <PageFrame>
    <PageIntro
      title="Aprende a construir sistemas, experiencias y herramientas que hacen diferencia."
      description="Ingeniería en Sistemas y Gráficas Computacionales combina programación, datos, gráficas y proyectos para que aprendas haciendo."
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
        description="Revisa tus materias en Tu Ruta Ideal. Para conocer el programa completo, requisitos y equivalencias, solicita el plan vigente a Coordinación."
      />
      <div className="mt-8 flex flex-wrap gap-5">
        <Link
          href="/carrera/plan-de-estudios"
          className="text-tinto decoration-dorado font-semibold underline decoration-2 underline-offset-4"
        >
          Ver el mapa del plan de estudios ↗
        </Link>
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
    <PageSection tone="marfil">
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
    <PageSection tone="marfil">
      <SectionHeading title="Preguntas de ingreso" />
      <FaqAccordion audience="aspirantes" />
    </PageSection>
  </PageFrame>
);

export default CarreraPage;
