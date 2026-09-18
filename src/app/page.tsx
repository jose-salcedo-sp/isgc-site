import type { Metadata } from "next";
import Link from "next/link";

import { HomeMotion } from "@/components/home-motion";
import { LabVisual } from "@/components/lab-visual";
import { LearningStory } from "@/components/learning-story";
import {
  PageFrame,
  PageSection,
  SectionHeading,
} from "@/components/page-frame";
import {
  capabilities,
  externalLinks,
  getCurrentHomepageEvents,
  projects,
  quickAccess,
  specialties,
} from "@/content/site-content";
import { siteUrl } from "@/lib/site";

export const revalidate = 3600;

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
  description:
    "Conoce la Ingeniería en Sistemas y Gráficas Computacionales en la Universidad Panamericana Guadalajara: software, datos, gráficas y proyectos aplicados.",
  openGraph: {
    description:
      "Conoce la Ingeniería en Sistemas y Gráficas Computacionales en la Universidad Panamericana Guadalajara: software, datos, gráficas y proyectos aplicados.",
    title: "ISGC | Ingeniería en Sistemas y Gráficas Computacionales",
    type: "website",
    url: siteUrl,
  },
  title: {
    absolute: "ISGC | Ingeniería en Sistemas y Gráficas Computacionales",
  },
  twitter: {
    description:
      "Conoce la Ingeniería en Sistemas y Gráficas Computacionales en la Universidad Panamericana Guadalajara: software, datos, gráficas y proyectos aplicados.",
    title: "ISGC | Ingeniería en Sistemas y Gráficas Computacionales",
  },
};

const campusNews = [
  {
    text: "Conoce las experiencias, equipos y resultados que forman parte de la vida de ISGC.",
    title: "Proyectos que salen del salón",
  },
  {
    text: "Ubica laboratorios, coordinación y los espacios donde sucede el trabajo diario.",
    title: "Espacios para aprender y colaborar",
  },
  {
    text: "Encuentra rutas para empezar a construir experiencia profesional mientras estudias.",
    title: "Prácticas y primeros proyectos",
  },
];

const HeroSection = () => (
  <section id="inicio" className="bg-tinto text-white">
    <div className="hero-layout mx-auto grid max-w-300 items-center gap-8 px-5 py-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12 lg:px-6 lg:py-14">
      <div className="min-w-0">
        <h1 className="hero-title">
          Ingeniería en Sistemas y Gráficas Computacionales.
        </h1>
        <p className="mt-5 text-xl font-medium text-[#e2c58f] sm:text-2xl">
          Construye lo que sigue.
        </p>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg">
          Aprende a crear software, datos y experiencias digitales con rigor
          técnico y responsabilidad hacia las personas.
        </p>
        <div className="mt-6 grid gap-3 min-[400px]:grid-cols-2 sm:flex sm:flex-wrap">
          <Link href="/carrera" className="hero-action">
            Conoce la carrera <span aria-hidden="true">→</span>
          </Link>
          <Link href="/alumnos" className="hero-action">
            Soy alumno <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
      <LabVisual />
    </div>
  </section>
);

const CurrentNewsSection = () => {
  const currentEvents = getCurrentHomepageEvents();

  return (
    <PageSection tone="marfil" id="actualidad">
      <SectionHeading
        title="Lo que necesitas ahora"
        description="Avisos, próximos eventos y accesos directos para avanzar sin rodeos."
      />
      <div className="grid gap-4 md:grid-cols-3">
        {currentEvents.length === 0 && (
          <article className="rounded-card bg-white p-6 md:col-span-2">
            <h3 className="font-serif text-2xl">Mantente al día</h3>
            <p className="text-piedra mt-3">
              Consulta con Coordinación las próximas actividades y las
              convocatorias vigentes.
            </p>
            <Link
              href="/comunidad"
              className="text-tinto mt-5 inline-flex font-semibold underline underline-offset-4"
            >
              Contacta a Coordinación →
            </Link>
          </article>
        )}
        {currentEvents.map((event) => (
          <article
            key={event.title}
            className="rounded-card shadow-soft/50 bg-white p-6"
          >
            <h3 className="text-grafito font-serif text-2xl">{event.title}</h3>
            <p className="text-tinto mt-3 font-semibold">{event.date}</p>
            <p className="text-piedra mt-3">{event.text}</p>
            <Link
              href={`/comunidad#${event.id}`}
              className="text-tinto decoration-dorado mt-5 inline-flex font-semibold underline decoration-2 underline-offset-4"
            >
              Ver detalles ↗
            </Link>
          </article>
        ))}
        <article className="rounded-card bg-tinto shadow-soft/50 p-6 text-white">
          <h3 className="font-serif text-2xl">Accesos frecuentes</h3>
          <div className="mt-4 grid gap-2">
            {quickAccess.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noreferrer" : undefined}
                className="rounded-full px-4 py-2 font-semibold transition hover:bg-white/10"
              >
                {item.label} <span aria-hidden="true">↗</span>
              </a>
            ))}
          </div>
        </article>
      </div>
    </PageSection>
  );
};

const CareerSection = () => (
  <PageSection id="carrera">
    <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
      <h2 className="text-grafito max-w-lg font-serif text-4xl leading-tight sm:text-5xl">
        Aprende haciendo cosas que otros pueden usar.
      </h2>
      <div>
        <p className="text-piedra max-w-2xl text-xl leading-relaxed">
          En ISGC aprendes a programar, modelar y prototipar mientras trabajas
          sobre problemas que existen fuera de la pantalla.
        </p>
      </div>
    </div>
    <div className="mt-14 grid gap-4 md:grid-cols-3">
      {capabilities.map((capability) => (
        <article
          key={capability.title}
          className="rounded-card bg-marfil shadow-soft/50 p-6"
        >
          <h3 className="text-grafito font-serif text-2xl">
            {capability.title}
          </h3>
          <p className="text-piedra mt-3">{capability.text}</p>
        </article>
      ))}
    </div>
    <p className="text-piedra mt-10 max-w-2xl">
      En el plan puedes profundizar en{" "}
      {specialties.map((specialty) => specialty.title).join(" y ")}.
    </p>
    <div className="mt-8">
      <Link
        href="/carrera"
        className="text-tinto decoration-dorado font-semibold underline decoration-2 underline-offset-4"
      >
        Conoce el plan de estudios ↗
      </Link>
    </div>
  </PageSection>
);

const ProjectsSection = () => (
  <PageSection tone="marfil" id="proyectos">
    <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
      <h2 className="text-grafito font-serif text-4xl sm:text-5xl">
        Proyectos que explican cómo aprendemos.
      </h2>
      <Link
        href="/proyectos"
        className="text-tinto decoration-dorado font-semibold underline decoration-2 underline-offset-4"
      >
        Ver proyectos ↗
      </Link>
    </div>
    <div className="mt-9 grid gap-4 md:grid-cols-2">
      {projects.map((project) => (
        <article
          key={project.title}
          className="rounded-card shadow-soft/50 bg-white p-6"
        >
          <h3 className="text-grafito font-serif text-2xl">{project.title}</h3>
          <p className="text-piedra mt-3">{project.process}</p>
        </article>
      ))}
    </div>
  </PageSection>
);

const StudyPlanSection = () => (
  <section id="plan" className="bg-tinto py-12 text-white sm:py-16">
    <div className="mx-auto grid max-w-300 items-center gap-8 px-5 lg:grid-cols-[1fr_auto] lg:px-6">
      <div>
        <h2 className="max-w-2xl font-serif text-4xl leading-tight sm:text-5xl">
          Tu ruta, semestre a semestre.
        </h2>
        <p className="mt-4 max-w-2xl text-lg text-white/75">
          Explora la progresión académica, las materias y las opciones para
          profundizar en lo que te interesa.
        </p>
      </div>
      <a
        href={externalLinks.tuRutaIdeal}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center justify-center rounded-full px-5 py-3 font-bold text-white transition hover:bg-white/10"
      >
        Abrir Tu Ruta Ideal ↗
      </a>
    </div>
  </section>
);

const CommunitySection = () => (
  <PageSection tone="marfil" id="comunidad">
    <div className="grid gap-8 lg:grid-cols-2">
      <div>
        <h2 className="text-grafito font-serif text-4xl sm:text-5xl">
          Conoce a las personas detrás de los proyectos.
        </h2>
        <p className="text-piedra mt-4 max-w-xl text-lg">
          Dirección, academia y los espacios del campus donde se resuelven dudas
          y se construye en equipo.
        </p>
        <Link
          href="/comunidad"
          className="text-tinto decoration-dorado mt-6 inline-flex font-semibold underline decoration-2 underline-offset-4"
        >
          Ver comunidad ↗
        </Link>
      </div>
      <Link
        href="/oportunidades"
        className="rounded-card bg-tinto hover:shadow-soft flex items-end p-7 text-white transition sm:p-9"
      >
        <span className="font-serif text-3xl leading-tight">
          Encuentra prácticas y primeros proyectos.
        </span>
      </Link>
    </div>
  </PageSection>
);

const CampusLifeSection = () => (
  <PageSection id="vida">
    <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
      <div>
        <h2 className="text-grafito font-serif text-4xl leading-tight sm:text-5xl">
          Qué pasa dentro y fuera del campus.
        </h2>
        <p className="text-piedra mt-4 max-w-lg text-lg">
          Encuentra noticias, eventos y espacios para conectar con la comunidad.
        </p>
        <Link
          href="/comunidad"
          className="text-tinto decoration-dorado mt-6 inline-flex font-semibold underline decoration-2 underline-offset-4"
        >
          Ver comunidad ↗
        </Link>
      </div>
      <div>
        <div className="grid gap-3 sm:grid-cols-3">
          {campusNews.map((item) => (
            <article
              key={item.title}
              className="rounded-card bg-marfil shadow-soft/50 p-5"
            >
              <h3 className="text-grafito font-serif text-2xl leading-tight">
                {item.title}
              </h3>
              <p className="text-piedra mt-3">{item.text}</p>
            </article>
          ))}
        </div>
      </div>
    </div>
  </PageSection>
);

const NextStepSection = () => (
  <PageSection tone="marfil" id="siguiente-paso">
    <SectionHeading title="¿Qué necesitas hoy?" />
    <div className="grid gap-4 md:grid-cols-2">
      <Link
        href="/aspirantes"
        className="group rounded-card text-grafito hover:shadow-soft bg-white p-7 transition sm:p-9"
      >
        <h3 className="font-serif text-3xl">Conoce admisiones y becas.</h3>
        <p className="text-piedra mt-3 max-w-md">
          Consulta el proceso oficial, las opciones de apoyo y el contacto de
          Admisiones.
        </p>
        <span className="text-tinto mt-7 inline-flex font-bold">
          Ir a Admisiones{" "}
          <span className="ml-2 transition group-hover:translate-x-1">↗</span>
        </span>
      </Link>
      <Link
        href="/alumnos"
        className="group rounded-card text-grafito hover:shadow-soft bg-white p-7 transition sm:p-9"
      >
        <h3 className="font-serif text-3xl">Resuelve tu próxima tarea.</h3>
        <p className="text-piedra mt-3 max-w-md">
          Encuentra accesos frecuentes, trámites, recursos de estudio y
          oportunidades.
        </p>
        <span className="text-tinto mt-7 inline-flex font-bold">
          Ir al centro de alumnos{" "}
          <span className="ml-2 transition group-hover:translate-x-1">→</span>
        </span>
      </Link>
    </div>
  </PageSection>
);

const Home = () => (
  <PageFrame>
    <HomeMotion />
    <HeroSection />
    <CurrentNewsSection />
    <LearningStory />
    <CareerSection />
    <ProjectsSection />
    <StudyPlanSection />
    <CommunitySection />
    <CampusLifeSection />
    <NextStepSection />
    <PageSection id="faq">
      <SectionHeading title="Preguntas frecuentes" />
      <div className="grid gap-4 md:grid-cols-2">
        <Link
          href="/aspirantes#faq"
          className="rounded-card hover:shadow-soft bg-white p-7 transition"
        >
          <h3 className="text-grafito font-serif text-2xl">Aspirantes</h3>
          <p className="text-piedra mt-3">
            Admisiones, apoyo económico y lo que vas a aprender en ISGC.
          </p>
        </Link>
        <Link
          href="/alumnos#faq"
          className="rounded-card hover:shadow-soft bg-white p-7 transition"
        >
          <h3 className="text-grafito font-serif text-2xl">Alumnos</h3>
          <p className="text-piedra mt-3">
            Plan de estudios, trámites y servicios escolares.
          </p>
        </Link>
      </div>
    </PageSection>
  </PageFrame>
);

export default Home;
