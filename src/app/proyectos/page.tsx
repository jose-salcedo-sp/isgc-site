import {
  PageFrame,
  PageIntro,
  PageSection,
  SectionHeading,
} from "@/components/page-frame";
import { ProjectCard } from "@/components/project-card";
import { mediaLabArchive, projects } from "@/content/site-content";

export const metadata = {
  description: "Proyectos, Media Lab y resultados de aprendizaje de ISGC.",
  title: "Proyectos | ISGC",
};

const ProyectosPage = () => (
  <PageFrame>
    <PageIntro
      title="Lo que aprendes toma forma en proyectos."
      description="Explora problemas, procesos y resultados de equipos que trabajan con código, datos, visualización y experiencias digitales."
    />
    <PageSection>
      <SectionHeading
        title="Explora lo que puedes construir"
        description="Un proyecto del archivo de Media Lab y un ejemplo de aplicación de datos."
      />
      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </PageSection>
    <PageSection tone="marfil" id="media-lab">
      <SectionHeading
        title="Media Lab"
        description="Un archivo de investigación aplicada, visualización y experiencias interactivas."
      />
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {mediaLabArchive.map((item) => (
          <article
            key={item.title}
            className="rounded-card shadow-soft/50 bg-white p-6"
          >
            <h3 className="text-grafito font-serif text-2xl">{item.title}</h3>
            <p className="text-piedra mt-4">Realizado en {item.date}.</p>
          </article>
        ))}
      </div>
      <p className="text-piedra mt-7 max-w-2xl">
        Los proyectos de 2013 a 2015 se presentan como archivo histórico. El
        catálogo de proyectos actuales crecerá con fichas de equipo, proceso y
        resultado.
      </p>
    </PageSection>
    <PageSection>
      <div className="rounded-card bg-white p-8 sm:p-10">
        <h2 className="text-grafito font-serif text-4xl">
          ¿Tienes un proyecto para mostrar?
        </h2>
        <p className="text-piedra mt-4 max-w-2xl text-lg">
          Comparte el problema, el proceso, el resultado y las personas que lo
          hicieron posible.
        </p>
        <a
          href="mailto:arodrig@up.edu.mx?subject=Proyecto%20ISGC"
          className="text-tinto decoration-dorado mt-6 inline-flex font-semibold underline decoration-2 underline-offset-4"
        >
          Contactar a Coordinación ↗
        </a>
      </div>
    </PageSection>
  </PageFrame>
);

export default ProyectosPage;
