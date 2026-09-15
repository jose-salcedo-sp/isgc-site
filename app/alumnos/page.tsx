export const dynamic = "force-dynamic";
import { FaqAccordion, StudentResourceSearch } from "@/components/home-interactions";
import { PageFrame, PageIntro, PageSection, SectionHeading } from "@/components/page-frame";
import { externalLinks, getCurrentHomepageEvents, quickAccess } from "@/content/site-content";

export const metadata = { title: "Alumnos | ISGC", description: "Accesos, recursos y avisos para alumnos de ISGC." };

export default function AlumnosPage() {
  return (
    <PageFrame>
      <PageIntro title="Todo lo que necesitas para seguir avanzando." description="Avisos, accesos frecuentes, trámites, estudio y desarrollo profesional en un solo lugar." />
      <PageSection><SectionHeading title="Avisos y próximos eventos" />{getCurrentHomepageEvents().length === 0 && <p className="text-piedra">Consulta con Coordinación las próximas actividades y convocatorias vigentes.</p>}<div className="grid gap-4 md:grid-cols-2">{getCurrentHomepageEvents().map((event) => <article id={event.id} key={event.title} className="rounded-card bg-marfil p-6"><h3 className="font-serif text-2xl text-grafito">{event.title}</h3><p className="mt-3 font-semibold text-tinto">{event.date}</p><p className="mt-3 text-piedra">{event.text}</p></article>)}</div></PageSection>
      <PageSection tone="marfil"><SectionHeading title="Accesos frecuentes" /><div className="grid gap-4 md:grid-cols-3">{quickAccess.map((item) => <a key={item.label} href={item.href} target="_blank" rel="noreferrer" className="rounded-card bg-white p-6 shadow-soft/50 transition hover:-translate-y-1"><h3 className="font-serif text-2xl text-grafito">{item.label}</h3><p className="mt-3 text-piedra">Abre este recurso directamente.</p><span className="mt-5 inline-flex font-semibold text-tinto">Ingresar ↗</span></a>)}</div></PageSection>
      <PageSection id="recursos"><SectionHeading title="Recursos para tu día a día" description="Busca por nombre y abre cada herramienta en su destino correspondiente." /><StudentResourceSearch /></PageSection>
      <PageSection tone="marfil"><div className="grid gap-5 md:grid-cols-2"><article className="rounded-card bg-tinto p-7 text-white sm:p-9"><h2 className="font-serif text-3xl">Coordinación</h2><p className="mt-4 text-white/80">Edificio C · 3.º piso. Para dudas sobre materias, profesores y procesos académicos.</p><a href="mailto:arodrig@up.edu.mx" className="mt-6 inline-flex font-bold text-dorado underline underline-offset-4">arodrig@up.edu.mx ↗</a></article><article className="rounded-card bg-white p-7 sm:p-9"><h2 className="font-serif text-3xl text-grafito">Reglamentos y servicios</h2><p className="mt-4 text-piedra">Consulta los documentos y procedimientos institucionales.</p><a href={externalLinks.schoolServices} target="_blank" rel="noreferrer" className="mt-6 inline-flex font-semibold text-tinto underline decoration-dorado decoration-2 underline-offset-4">Abrir Servicios Escolares ↗</a></article></div></PageSection>
      <PageSection><SectionHeading title="Preguntas de alumnos" /><FaqAccordion audience="alumnos" /></PageSection>
    </PageFrame>
  );
}
