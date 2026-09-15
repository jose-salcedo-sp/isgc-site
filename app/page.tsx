import { HomeMotion } from "@/components/home-motion";
import { LearningStory } from "@/components/learning-story";
import { LabVisual } from "@/components/lab-visual";
import { ProjectCard } from "@/components/project-card";
import Image from "next/image";
import Link from "next/link";
import { FaqAccordion } from "@/components/home-interactions";
import { PageFrame, PageSection, SectionHeading } from "@/components/page-frame";
import { capabilities, campusImage, externalLinks, faculty, getCurrentHomepageEvents, projects, quickAccess, specialties } from "@/content/site-content";

export const dynamic = "force-dynamic";

const campusNews = [
  { title: "Proyectos que salen del salón", text: "Conoce las experiencias, equipos y resultados que forman parte de la vida de ISGC." },
  { title: "Espacios para aprender y colaborar", text: "Ubica laboratorios, coordinación y los espacios donde sucede el trabajo diario." },
  { title: "Prácticas y primeros proyectos", text: "Encuentra rutas para empezar a construir experiencia profesional mientras estudias." },
];

export default function Home() {
  const currentEvents = getCurrentHomepageEvents();

  return (
    <PageFrame>
      <HomeMotion />
      <section id="inicio" className="bg-tinto text-white">
        <div className="hero-layout mx-auto grid max-w-[1200px] items-center gap-8 px-5 py-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12 lg:px-6 lg:py-14">
          <div className="min-w-0">
            
            <h1 className="hero-title">Ingeniería en Sistemas y Gráficas Computacionales.</h1>
            <p className="mt-5 text-xl font-medium text-[#e2c58f] sm:text-2xl">Construye lo que sigue.</p>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg">Aprende a crear software, datos y experiencias digitales con rigor técnico y responsabilidad hacia las personas.</p>
            <div className="mt-6 grid gap-3 min-[400px]:grid-cols-2 sm:flex sm:flex-wrap">
              <Link href="/carrera" className="hero-action">Conoce la carrera <span aria-hidden="true">→</span></Link>
              <Link href="/alumnos" className="hero-action">Soy alumno <span aria-hidden="true">→</span></Link>
            </div>
          </div>
          <LabVisual />
        </div>
      </section>

      <PageSection tone="marfil" id="actualidad">
        <SectionHeading title="Lo que necesitas ahora" description="Avisos, próximos eventos y accesos directos para avanzar sin rodeos." />
        <div className="grid gap-4 md:grid-cols-3">
          {currentEvents.length === 0 && <article className="rounded-card bg-white p-6 md:col-span-2"><h3 className="font-serif text-2xl">Mantente al día</h3><p className="mt-3 text-piedra">Consulta con Coordinación las próximas actividades y las convocatorias vigentes.</p><Link href="/comunidad" className="mt-5 inline-flex font-semibold text-tinto underline underline-offset-4">Contacta a Coordinación →</Link></article>}
          {currentEvents.map((event) => (
            <article key={event.title} className="rounded-card bg-white p-6 shadow-soft/50">
              <h3 className="font-serif text-2xl text-grafito">{event.title}</h3>
              <p className="mt-3 font-semibold text-tinto">{event.date}</p>
              <p className="mt-3 text-piedra">{event.text}</p>
              <Link href={`/comunidad#${event.id}`} className="mt-5 inline-flex font-semibold text-tinto underline decoration-dorado decoration-2 underline-offset-4">Ver detalles ↗</Link>
            </article>
          ))}
          <article className="rounded-card bg-tinto p-6 text-white shadow-soft/50">
            <h3 className="font-serif text-2xl">Accesos frecuentes</h3>
            <div className="mt-4 grid gap-2">
              {quickAccess.map((item) => <a key={item.label} href={item.href} target={item.external ? "_blank" : undefined} rel={item.external ? "noreferrer" : undefined} className="rounded-full px-4 py-2 font-semibold transition hover:bg-white/10">{item.label} <span aria-hidden="true">↗</span></a>)}
            </div>
          </article>
        </div>
      </PageSection>

      <LearningStory />

      <PageSection id="carrera">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <h2 className="max-w-lg font-serif text-4xl leading-tight text-grafito sm:text-5xl">Aprende haciendo cosas que otros pueden usar.</h2>
          <div>
            <p className="max-w-2xl text-xl leading-relaxed text-piedra">En ISGC aprendes a programar, modelar y prototipar mientras trabajas sobre problemas que existen fuera de la pantalla.</p>
            
          </div>
        </div>
        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {capabilities.map((capability) => <article key={capability.title} className="rounded-card bg-marfil p-6 shadow-soft/50"><h3 className="font-serif text-2xl text-grafito">{capability.title}</h3><p className="mt-3 text-piedra">{capability.text}</p></article>)}
        </div>
        <div className="mt-8"><Link href="/carrera" className="font-semibold text-tinto underline decoration-dorado decoration-2 underline-offset-4">Conoce cómo se aprende ↗</Link></div>
      </PageSection>

      <PageSection tone="marfil" id="proyectos">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><h2 className="font-serif text-4xl text-grafito sm:text-5xl">Proyectos que explican cómo aprendemos.</h2><Link href="/proyectos" className="font-semibold text-tinto underline decoration-dorado decoration-2 underline-offset-4">Ver todos ↗</Link></div>
        <div className="mt-9 grid gap-6 md:grid-cols-2">
          {projects.map((project) => <ProjectCard key={project.title} project={project} />)}
        </div>
      </PageSection>

      <section id="plan" className="bg-tinto py-12 text-white sm:py-16">
        <div className="mx-auto grid max-w-[1200px] items-center gap-8 px-5 lg:grid-cols-[1fr_auto] lg:px-6">
          <div><h2 className="max-w-2xl font-serif text-4xl leading-tight sm:text-5xl">Tu ruta, semestre a semestre.</h2><p className="mt-4 max-w-2xl text-lg text-white/75">Explora la progresión académica, las materias y las opciones para profundizar en lo que te interesa.</p></div>
          <a href={externalLinks.tuRutaIdeal} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center rounded-full px-5 py-3 font-bold text-white transition hover:bg-white/10">Abrir Tu Ruta Ideal ↗</a>
        </div>
      </section>

      <PageSection id="formacion">
        <SectionHeading title="Un camino común, distintas formas de construir." description="Explora estas áreas a través de tus proyectos y confirma la oferta académica vigente con Coordinación." />
        <div className="grid gap-5 md:grid-cols-2">
          {specialties.map((specialty) => <article key={specialty.title} className="rounded-card bg-marfil p-7 shadow-soft/50"><h3 className="font-serif text-3xl text-grafito">{specialty.title}</h3><p className="mt-4 text-lg text-piedra">{specialty.text}</p><div className="mt-7 grid gap-3 sm:grid-cols-3">{specialty.subjects.map((subject) => <p key={subject} className="pt-3 font-semibold text-grafito">{subject}</p>)}</div></article>)}
        </div>
        <Link href="/carrera#semestres" className="mt-8 inline-flex font-semibold text-tinto underline decoration-dorado decoration-2 underline-offset-4">Consulta tu plan de estudios ↗</Link>
      </PageSection>

      <PageSection tone="marfil" id="comunidad">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><h2 className="font-serif text-4xl text-grafito sm:text-5xl">Conoce a las personas detrás de los proyectos.</h2><Link href="/comunidad" className="font-semibold text-tinto underline decoration-dorado decoration-2 underline-offset-4">Ver comunidad ↗</Link></div>
        <div className="mt-9 grid gap-4 md:grid-cols-3">{faculty.map((person) => <article key={person.name} className="rounded-card bg-white p-6 shadow-soft/50"><div className="flex h-12 w-12 items-center justify-center rounded-full bg-tinto font-serif text-xl text-white">{person.name.split(" ").map((part) => part[0]).slice(0, 2).join("")}</div><h3 className="mt-4 font-serif text-xl text-grafito">{person.name}</h3><p className="mt-1 font-semibold text-tinto">{person.role}</p><p className="mt-2 text-sm text-piedra">{person.area}</p><a href={`mailto:${person.email}`} className="mt-4 inline-flex text-sm font-semibold text-tinto underline underline-offset-4">{person.email}</a></article>)}<Link href="/oportunidades" className="flex items-end rounded-card bg-tinto p-7 text-white transition hover:shadow-soft sm:p-9"><span className="font-serif text-3xl leading-tight">Encuentra prácticas y primeros proyectos.</span></Link></div>
      </PageSection>

      <PageSection id="vida">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]"><div><h2 className="font-serif text-4xl leading-tight text-grafito sm:text-5xl">Qué pasa dentro y fuera del campus.</h2><p className="mt-4 max-w-lg text-lg text-piedra">Encuentra noticias, eventos y espacios para conectar con la comunidad.</p><Link href="/comunidad" className="mt-6 inline-flex font-semibold text-tinto underline decoration-dorado decoration-2 underline-offset-4">Ver comunidad ↗</Link></div><div><Image src={campusImage} alt="Imagen de referencia de un campus universitario" width={1400} height={760} className="aspect-[16/7] w-full rounded-card object-cover" /><p className="mt-3 text-sm text-piedra">Imagen de referencia del campus.</p><div className="mt-6 grid gap-3 sm:grid-cols-3">{campusNews.map((item) => <article key={item.title} className="rounded-card bg-marfil p-5 shadow-soft/50"><h3 className="font-serif text-2xl leading-tight text-grafito">{item.title}</h3><p className="mt-3 text-piedra">{item.text}</p></article>)}</div></div></div>
      </PageSection>

      <PageSection tone="marfil" id="siguiente-paso">
        <SectionHeading title="¿Qué necesitas hoy?" />
        <div className="grid gap-4 md:grid-cols-2"><Link href="/aspirantes" className="group rounded-card bg-white p-7 text-grafito transition hover:shadow-soft sm:p-9"><h3 className="font-serif text-3xl">Conoce admisiones y becas.</h3><p className="mt-3 max-w-md text-piedra">Consulta el proceso oficial, las opciones de apoyo y el contacto de Admisiones.</p><span className="mt-7 inline-flex font-bold text-tinto">Ir a Admisiones <span className="ml-2 transition group-hover:translate-x-1">↗</span></span></Link><Link href="/alumnos" className="group rounded-card bg-white p-7 text-grafito transition hover:shadow-soft sm:p-9"><h3 className="font-serif text-3xl">Resuelve tu próxima tarea.</h3><p className="mt-3 max-w-md text-piedra">Encuentra accesos frecuentes, trámites, recursos de estudio y oportunidades.</p><span className="mt-7 inline-flex font-bold text-tinto">Ir al centro de alumnos <span className="ml-2 transition group-hover:translate-x-1">→</span></span></Link></div>
      </PageSection>

      <PageSection id="faq"><SectionHeading title="Preguntas frecuentes" /><FaqAccordion /></PageSection>
    </PageFrame>
  );
}
