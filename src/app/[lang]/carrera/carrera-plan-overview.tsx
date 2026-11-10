import { ExternalLink, PageSection } from "@/components/page-frame";
import { externalLinks } from "@/content/site-content";
import { fill } from "@/lib/i18n";
import { org } from "@/lib/site";

interface CareerArea {
  description: string;
  id: string;
  name: string;
}

interface PlanCopy {
  areas: Record<string, { description: string; name: string }>;
  planCta: string;
  planMailtoCta: string;
  planMeta: string;
  planNote: string;
  planSubject: string;
  planTitle: string;
  rutaCta: string;
}

export const CarreraPlanOverview = ({
  areaList,
  copy,
}: {
  areaList: CareerArea[];
  copy: PlanCopy;
}) => (
  <PageSection id="semestres">
    <div className="grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
      <div className="lg:sticky lg:top-28 lg:self-start">
        <h2 className="text-grafito text-4xl leading-tight sm:text-5xl">
          {copy.planTitle}
        </h2>
        <p className="text-piedra mt-4 text-lg">
          {fill(copy.planMeta, {
            campus: org.campus,
            plan: org.plan,
            rvoe: org.rvoe,
          })}
        </p>
        <p className="text-piedra mt-6 text-sm">{copy.planNote}</p>
        <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
          <ExternalLink href={externalLinks.tuRutaIdeal}>
            {copy.rutaCta}
          </ExternalLink>
          <ExternalLink href={externalLinks.studyPlanPdf}>
            {copy.planCta}
          </ExternalLink>
          <a
            href={`mailto:${org.coordinationEmail}?subject=${encodeURIComponent(copy.planSubject)}`}
            className="text-tinto decoration-dorado font-semibold underline decoration-2 underline-offset-4"
          >
            {copy.planMailtoCta} ↗
          </a>
        </div>
      </div>
      <ul className="border-grafito/15 grid border-t">
        {areaList.map((item) => (
          <li key={item.id} className="border-grafito/15 border-b py-6 sm:py-8">
            <h3 className="text-grafito text-2xl sm:text-3xl">{item.name}</h3>
            <p className="text-piedra mt-2 max-w-xl">{item.description}</p>
          </li>
        ))}
      </ul>
    </div>
  </PageSection>
);
