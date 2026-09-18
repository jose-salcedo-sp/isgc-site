interface JsonLdProps {
  data: object;
}

export const JsonLd = ({ data }: JsonLdProps) => (
  <script type="application/ld+json">{JSON.stringify(data)}</script>
);
