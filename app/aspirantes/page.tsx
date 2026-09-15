import { FaqAccordion } from "@/components/home-interactions";
import { ExternalLink, PageFrame, PageIntro, PageSection, SectionHeading } from "@/components/page-frame";
import { externalLinks } from "@/content/site-content";

export const metadata = { title: "Aspirantes | ISGC", description: "Información para conocer ISGC, admisiones y opciones de apoyo." };

export default function AspirantesPage() {
  return (
    <PageFrame>
      <PageIntro title="Empieza por conocer cómo puedes entrar y qué vas a construir aquí." description="Encuentra el proceso oficial de admisión, opciones de apoyo económico, una visita al campus y un contacto directo." />
      <PageSection><SectionHeading title="Tu proceso de ingreso" description="Revisa cada paso en la convocatoria oficial y confirma fechas antes de enviar tus documentos." /><div className="grid gap-4 md:grid-cols-4">{["Conoce la carrera", "Revisa requisitos", "Completa tu proceso", "Empieza tu ruta"].map((step, index) => <article key={step} className="rounded-card bg-marfil p-6"><h3 className="mt-4 font-serif text-2xl text-grafito">{step}</h3><p className="mt-3 text-piedra">{["Explora el perfil y las áreas de trabajo.", "Consulta documentos, fechas y condiciones.", "Da seguimiento a tu registro con Admisiones.", "Conoce el campus y prepárate para comenzar."][index]}</p></article>)}</div><a href={externalLinks.admissions} target="_blank" rel="noreferrer" className="mt-8 inline-flex rounded-full bg-tinto px-5 py-3 font-bold text-white transition hover:bg-[#70112e]">Ir a Admisiones ↗</a></PageSection>
      <PageSection tone="marfil"><SectionHeading title="Becas y financiamiento" description="Consulta convocatorias, requisitos y fechas directamente en los portales institucionales." /><div className="grid gap-4 md:grid-cols-2"><article className="rounded-card bg-white p-7 shadow-soft/50"><h3 className="font-serif text-3xl text-grafito">Apoyo económico</h3><p className="mt-4 text-piedra">Revisa las opciones disponibles y prepara la documentación que solicita cada convocatoria.</p><div className="mt-6"><ExternalLink href={externalLinks.scholarships}>Consultar becas y financiamiento</ExternalLink></div></article><article className="rounded-card bg-white p-7 shadow-soft/50"><h3 className="font-serif text-3xl text-grafito">Visita el campus</h3><p className="mt-4 text-piedra">Conoce los espacios de Ingenierías y ubica laboratorios, coordinación y áreas de encuentro.</p><div className="mt-6"><ExternalLink href={externalLinks.campusMap}>Abrir mapa del campus</ExternalLink></div></article></div></PageSection>
      <PageSection><div className="rounded-card bg-tinto p-8 text-white sm:p-10"><h2 className="font-serif text-4xl">¿Tienes una pregunta?</h2><p className="mt-4 max-w-2xl text-white/80">Escríbenos para orientarte sobre el proceso, la carrera o una visita.</p><a href="mailto:arodrig@up.edu.mx" className="mt-6 inline-flex font-bold text-dorado underline underline-offset-4">arodrig@up.edu.mx ↗</a></div></PageSection>
      <PageSection tone="marfil"><SectionHeading title="Preguntas de aspirantes" /><FaqAccordion audience="aspirantes" /></PageSection>
    </PageFrame>
  );
}
