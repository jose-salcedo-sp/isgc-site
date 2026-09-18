import type { Metadata } from "next";

import {
  ExternalLink,
  PageFrame,
  PageIntro,
  PageSection,
  SectionHeading,
} from "@/components/page-frame";
import { siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  alternates: {
    canonical: "/oportunidades",
  },
  description:
    "Oportunidades para alumnos de Ingeniería en Sistemas y Gráficas Computacionales en la Universidad Panamericana Guadalajara: prácticas, empleo y perfil.",
  openGraph: {
    description:
      "Oportunidades para alumnos de Ingeniería en Sistemas y Gráficas Computacionales en la Universidad Panamericana Guadalajara: prácticas, empleo y perfil.",
    title: "Prácticas y empleo UP Guadalajara | ISGC",
    type: "website",
    url: `${siteUrl}/oportunidades`,
  },
  title: "Prácticas y empleo UP Guadalajara",
  twitter: {
    description:
      "Oportunidades para alumnos de Ingeniería en Sistemas y Gráficas Computacionales en la Universidad Panamericana Guadalajara: prácticas, empleo y perfil.",
    title: "Prácticas y empleo UP Guadalajara | ISGC",
  },
};

const portals = [
  {
    href: "https://work.hirellama.com/",
    text: "Vacantes y oportunidades para perfiles digitales.",
    title: "Hirellama",
  },
  {
    href: "https://jobs.intel.com/ListJobs/All/Country-MX",
    text: "Consulta posiciones abiertas en México.",
    title: "Intel México",
  },
  {
    href: "https://www.empleojaltec.mx/",
    text: "Explora opciones de empleo en la región.",
    title: "Empleo Jalisco",
  },
];

const OportunidadesPage = () => (
  <PageFrame>
    <PageIntro
      crumb={{ name: "Oportunidades", path: "/oportunidades" }}
      description="Encuentra prácticas, empleo y herramientas para presentar mejor lo que sabes hacer."
      lede="Empieza a construir experiencia antes de egresar."
      title="Prácticas y empleo en Ingeniería en Sistemas y Gráficas Computacionales"
    />
    <PageSection>
      <SectionHeading title="Tu perfil en tres pasos" />
      <div className="grid gap-4 md:grid-cols-3">
        {[
          {
            text: "Reúne proyectos, decisiones y resultados en un portafolio.",
            title: "Ordena tu trabajo",
          },
          {
            text: "Actualiza tu CV y tu perfil de LinkedIn con ejemplos concretos.",
            title: "Cuenta lo que sabes",
          },
          {
            text: "Usa GitHub para mostrar procesos, repositorios y documentación.",
            title: "Comparte tu código",
          },
        ].map((step) => (
          <article key={step.title} className="rounded-card bg-marfil p-7">
            <h3 className="text-grafito font-serif text-2xl">{step.title}</h3>
            <p className="text-piedra mt-3">{step.text}</p>
          </article>
        ))}
      </div>
      <div className="mt-8 flex flex-wrap gap-5">
        <ExternalLink href="https://mx.linkedin.com/">
          Abrir LinkedIn
        </ExternalLink>
        <ExternalLink href="https://github.com/">Abrir GitHub</ExternalLink>
      </div>
    </PageSection>
    <PageSection tone="marfil">
      <SectionHeading title="Portales para buscar oportunidades" />
      <div className="grid gap-4 md:grid-cols-3">
        {portals.map((portal) => (
          <article
            key={portal.title}
            className="rounded-card shadow-soft/50 bg-white p-6"
          >
            <h3 className="text-grafito font-serif text-2xl">{portal.title}</h3>
            <p className="text-piedra mt-3">{portal.text}</p>
            <div className="mt-5">
              <ExternalLink href={portal.href}>Visitar portal</ExternalLink>
            </div>
          </article>
        ))}
      </div>
    </PageSection>
    <PageSection>
      <div className="rounded-card bg-tinto p-8 text-white sm:p-10">
        <h2 className="font-serif text-4xl">¿Quieres orientación?</h2>
        <p className="mt-4 max-w-2xl text-lg text-white/80">
          Escribe a Coordinación para resolver dudas sobre prácticas, empleo o
          cómo presentar tu trabajo.
        </p>
        <a
          href="mailto:arodrig@up.edu.mx"
          className="text-dorado mt-6 inline-flex font-bold underline underline-offset-4"
        >
          arodrig@up.edu.mx ↗
        </a>
      </div>
    </PageSection>
  </PageFrame>
);

export default OportunidadesPage;
