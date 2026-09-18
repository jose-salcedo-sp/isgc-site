import { JsonLd } from "@/components/seo/json-ld";

interface FaqJsonLdProps {
  items: readonly { answer: string; question: string }[];
}

export const FaqJsonLd = ({ items }: FaqJsonLdProps) => (
  <JsonLd
    data={{
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: items.map((faq) => ({
        "@type": "Question",
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
        name: faq.question,
      })),
    }}
  />
);
