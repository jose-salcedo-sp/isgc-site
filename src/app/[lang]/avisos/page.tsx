import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PageFrame, PageIntro } from "@/components/page-frame";
import { getCurrentHomepageEvents } from "@/content/site-content";
import { getDictionary } from "@/lib/dictionary";
import { hasLocale } from "@/lib/i18n";
import type { LocaleParams } from "@/lib/i18n";
import { pageMetadata } from "@/lib/page-metadata";
import { org } from "@/lib/site";

export const revalidate = 3600;

export const generateMetadata = async ({
  params,
}: LocaleParams): Promise<Metadata> => {
  const { lang } = await params;
  if (!hasLocale(lang)) {
    return {};
  }
  return pageMetadata(lang, "/avisos", getDictionary(lang));
};

const AvisosPage = async ({ params }: LocaleParams) => {
  const { lang } = await params;
  if (!hasLocale(lang)) {
    notFound();
  }
  const dict = getDictionary(lang);
  const copy = dict.pages.avisos;
  const events = getCurrentHomepageEvents();

  return (
    <PageFrame dict={dict} locale={lang}>
      <PageIntro
        crumb={{ name: copy.crumb, path: "/avisos" }}
        description={copy.description}
        dict={dict}
        display
        locale={lang}
        title={copy.title}
        tone="white"
      >
        {/* The page opens straight into the feed: a rail that draws down on
            load, with a dot for each notice. */}
        <div
          id="actividades"
          className="mt-16 grid gap-10 sm:mt-24 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16"
        >
          <h2 className="text-grafito text-3xl leading-tight sm:text-4xl lg:sticky lg:top-28 lg:self-start">
            {copy.eventsTitle}
          </h2>
          <div className="relative pl-8 sm:pl-12">
            <span
              className="rail-y bg-grafito/20 absolute top-0 bottom-0 left-0 w-px"
              aria-hidden="true"
            />
            <ol className="grid gap-14">
              {events.length === 0 ? (
                <li className="relative">
                  <span
                    className="rail-dot border-tinto absolute top-3 -left-[39px] size-[13px] rounded-full border-2 bg-white sm:-left-[55px]"
                    aria-hidden="true"
                  />
                  <h3 className="text-grafito text-3xl leading-tight sm:text-4xl">
                    {copy.emptyTitle}
                  </h3>
                  <p className="text-piedra mt-4 max-w-lg text-lg">
                    {copy.emptyText}
                  </p>
                  <a
                    href={`mailto:${org.coordinationEmail}`}
                    className="text-tinto decoration-dorado mt-6 text-xl font-bold underline decoration-2 underline-offset-4"
                  >
                    {org.coordinationEmail}
                  </a>
                </li>
              ) : (
                events.map((event) => {
                  const item = dict.events[event.id];
                  return (
                    <li id={event.id} key={event.id} className="relative">
                      <span
                        className="rail-dot bg-tinto absolute top-2 -left-[39px] size-[13px] rounded-full sm:-left-[55px]"
                        aria-hidden="true"
                      />
                      <p className="text-tinto text-lg font-bold">
                        {item.date}
                      </p>
                      <h3 className="text-grafito mt-2 text-3xl leading-tight sm:text-4xl">
                        {item.title}
                      </h3>
                      <p className="text-piedra mt-4 max-w-lg text-lg">
                        {item.text}
                      </p>
                    </li>
                  );
                })
              )}
            </ol>
          </div>
        </div>
      </PageIntro>
    </PageFrame>
  );
};

export default AvisosPage;
