import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { ChapterVisual } from "@/components/site-motion";

export const PageFrame = ({ children }: { children: React.ReactNode }) => (
  <>
    <SiteHeader />
    <main id="contenido">{children}</main>
    <SiteFooter />
  </>
);

export const PageIntro = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => (
  <section className="bg-tinto text-white">
    <div className="mx-auto max-w-300 px-5 py-10 sm:py-14 lg:px-6">
      <h1 className="max-w-4xl font-serif text-3xl leading-tight sm:text-5xl">
        {title}
      </h1>
      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80 sm:text-xl">
        {description}
      </p>
      <ChapterVisual />
    </div>
  </section>
);

export const PageSection = ({
  children,
  tone = "white",
  id,
}: {
  children: React.ReactNode;
  tone?: "white" | "marfil";
  id?: string;
}) => (
  <section
    id={id}
    className={`${tone === "marfil" ? "bg-marfil" : "bg-white"} py-16 sm:py-20`}
  >
    <div className="mx-auto max-w-300 px-5 lg:px-6">{children}</div>
  </section>
);

export const SectionHeading = ({
  title,
  description,
}: {
  title: string;
  description?: string;
}) => (
  <div className="mb-9 max-w-3xl">
    <h2 className="text-grafito font-serif text-4xl leading-tight sm:text-5xl">
      {title}
    </h2>
    {description && <p className="text-piedra mt-4 text-lg">{description}</p>}
  </div>
);

export const ExternalLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => (
  <a
    href={href}
    target="_blank"
    rel="noreferrer"
    className="text-tinto decoration-dorado font-semibold underline decoration-2 underline-offset-4"
  >
    {children} ↗
  </a>
);
