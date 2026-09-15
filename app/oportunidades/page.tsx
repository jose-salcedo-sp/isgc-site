import { ExternalLink, PageFrame, PageIntro, PageSection, SectionHeading } from "@/components/page-frame";

export const metadata = { title: "Oportunidades | ISGC", description: "Prácticas, empleo y herramientas para desarrollar tu perfil profesional." };

const portals = [
  { title: "Hirellama", href: "https://work.hirellama.com/", text: "Vacantes y oportunidades para perfiles digitales." },
  { title: "Intel México", href: "https://jobs.intel.com/ListJobs/All/Country-MX", text: "Consulta posiciones abiertas en México." },
  { title: "Empleo Jalisco", href: "https://www.empleojaltec.mx/", text: "Explora opciones de empleo en la región." },
];

export default function OportunidadesPage() {
  return (
    <PageFrame>
      <PageIntro title="Empieza a construir experiencia antes de egresar." description="Encuentra prácticas, empleo y herramientas para presentar mejor lo que sabes hacer." />
      <PageSection><SectionHeading title="Tu perfil en tres pasos" /><div className="grid gap-4 md:grid-cols-3">{[{ title: "Ordena tu trabajo", text: "Reúne proyectos, decisiones y resultados en un portafolio." }, { title: "Cuenta lo que sabes", text: "Actualiza tu CV y tu perfil de LinkedIn con ejemplos concretos." }, { title: "Comparte tu código", text: "Usa GitHub para mostrar procesos, repositorios y documentación." }].map((step) => <article key={step.title} className="rounded-card bg-marfil p-7"><h3 className="font-serif text-2xl text-grafito">{step.title}</h3><p className="mt-3 text-piedra">{step.text}</p></article>)}</div><div className="mt-8 flex flex-wrap gap-5"><ExternalLink href="https://mx.linkedin.com/">Abrir LinkedIn</ExternalLink><ExternalLink href="https://github.com/">Abrir GitHub</ExternalLink></div></PageSection>
      <PageSection tone="marfil"><SectionHeading title="Portales para buscar oportunidades" /><div className="grid gap-4 md:grid-cols-3">{portals.map((portal) => <article key={portal.title} className="rounded-card bg-white p-6 shadow-soft/50"><h3 className="font-serif text-2xl text-grafito">{portal.title}</h3><p className="mt-3 text-piedra">{portal.text}</p><div className="mt-5"><ExternalLink href={portal.href}>Visitar portal</ExternalLink></div></article>)}</div></PageSection>
      <PageSection><div className="rounded-card bg-tinto p-8 text-white sm:p-10"><h2 className="font-serif text-4xl">¿Quieres orientación?</h2><p className="mt-4 max-w-2xl text-lg text-white/80">Escribe a Coordinación para resolver dudas sobre prácticas, empleo o cómo presentar tu trabajo.</p><a href="mailto:arodrig@up.edu.mx" className="mt-6 inline-flex font-bold text-dorado underline underline-offset-4">arodrig@up.edu.mx ↗</a></div></PageSection>
    </PageFrame>
  );
}
