import { ProjectCard } from "@/components/project-card";
import { PageFrame, PageIntro, PageSection, SectionHeading } from "@/components/page-frame";
import { mediaLabArchive, projects } from "@/content/site-content";

export const metadata = { title: "Proyectos | ISGC", description: "Proyectos, Media Lab y resultados de aprendizaje de ISGC." };

export default function ProyectosPage() {
  return (
    <PageFrame>
      <PageIntro title="Lo que aprendes toma forma en proyectos." description="Explora problemas, procesos y resultados de equipos que trabajan con código, datos, visualización y experiencias digitales." />
      <PageSection><SectionHeading title="Explora lo que puedes construir" description="Un proyecto del archivo de Media Lab y un ejemplo de aplicación de datos." /><div className="grid gap-6 md:grid-cols-2">{projects.map((project) => <ProjectCard key={project.title} project={project} />)}</div></PageSection>
      <PageSection tone="marfil" id="media-lab"><SectionHeading title="Media Lab" description="Un archivo de investigación aplicada, visualización y experiencias interactivas." /><div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{mediaLabArchive.map((item) => <article key={item.title} className="rounded-card bg-white p-6 shadow-soft/50"><h3 className="font-serif text-2xl text-grafito">{item.title}</h3><p className="mt-4 text-piedra">Realizado en {item.date}.</p></article>)}</div><p className="mt-7 max-w-2xl text-piedra">Los proyectos de 2013 a 2015 se presentan como archivo histórico. El catálogo de proyectos actuales crecerá con fichas de equipo, proceso y resultado.</p></PageSection>
      <PageSection><div className="rounded-card bg-white p-8 sm:p-10"><h2 className="font-serif text-4xl text-grafito">¿Tienes un proyecto para mostrar?</h2><p className="mt-4 max-w-2xl text-lg text-piedra">Comparte el problema, el proceso, el resultado y las personas que lo hicieron posible.</p><a href="mailto:arodrig@up.edu.mx?subject=Proyecto%20ISGC" className="mt-6 inline-flex font-semibold text-tinto underline decoration-dorado decoration-2 underline-offset-4">Contactar a Coordinación ↗</a></div></PageSection>
    </PageFrame>
  );
}
