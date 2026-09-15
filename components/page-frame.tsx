import { ChapterVisual } from "@/components/site-motion";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export function PageFrame({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteHeader />
      <main id="contenido">{children}</main>
      <SiteFooter />
    </>
  );
}

export function PageIntro({ title, description }: { title: string; description: string }) {
  return (
    <section className="bg-tinto text-white">
      <div className="mx-auto max-w-[1200px] px-5 py-10 sm:py-14 lg:px-6">
        <h1 className="max-w-4xl font-serif text-3xl leading-tight sm:text-5xl">{title}</h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80 sm:text-xl">{description}</p>
        <ChapterVisual />
      </div>
    </section>
  );
}

export function PageSection({ children, tone = "white", id }: { children: React.ReactNode; tone?: "white" | "marfil"; id?: string }) {
  return <section id={id} className={`${tone === "marfil" ? "bg-marfil" : "bg-white"} py-16 sm:py-20`}><div className="mx-auto max-w-[1200px] px-5 lg:px-6">{children}</div></section>;
}

export function SectionHeading({ title, description }: { title: string; description?: string }) {
  return (
    <div className="mb-9 max-w-3xl">
      <h2 className="font-serif text-4xl leading-tight text-grafito sm:text-5xl">{title}</h2>
      {description && <p className="mt-4 text-lg text-piedra">{description}</p>}
    </div>
  );
}

export function ExternalLink({ href, children }: { href: string; children: React.ReactNode }) {
  return <a href={href} target="_blank" rel="noreferrer" className="font-semibold text-tinto underline decoration-dorado decoration-2 underline-offset-4">{children} ↗</a>;
}
