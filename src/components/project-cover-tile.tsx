const titleClassName = {
  card: "text-marfil mt-2 line-clamp-4 text-xl leading-snug font-bold tracking-[-0.02em] sm:line-clamp-3 sm:text-2xl",
  detail:
    "text-marfil mt-3 line-clamp-5 text-2xl leading-[1.05] font-bold tracking-[-0.03em] sm:text-4xl",
} as const;

export const ProjectCoverTile = ({
  title,
  variant,
  year,
}: {
  title: string;
  variant: "card" | "detail";
  year: string;
}) => (
  <div
    aria-hidden="true"
    className="bg-tinto flex size-full flex-col items-start justify-center p-5 sm:p-6"
  >
    <p className="text-marfil/80 text-xs font-bold tracking-[0.18em] uppercase tabular-nums">
      {year}
    </p>
    <p className={titleClassName[variant]}>{title}</p>
  </div>
);
