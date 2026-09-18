import { JsonLd } from "@/components/seo/json-ld";
import { siteUrl } from "@/lib/site";

interface BreadcrumbItem {
  name: string;
  path: string;
}

interface BreadcrumbJsonLdProps {
  items: BreadcrumbItem[];
}

export const BreadcrumbJsonLd = ({ items }: BreadcrumbJsonLdProps) => (
  <JsonLd
    data={{
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: items.map((item, index) => ({
        "@type": "ListItem",
        item: `${siteUrl}${item.path}`,
        name: item.name,
        position: index + 1,
      })),
    }}
  />
);
