"use client";

import type { GraphKind, GraphText } from "./graph-model";
import type { RadialLayout } from "./graph-radial";
import { KIND_ORDER, KIND_SWATCH } from "./graph-theme";

const kindButtons = (
  layout: RadialLayout,
  activeKinds: ReadonlySet<GraphKind>,
  kinds: GraphText["kinds"],
  onToggleKind: (kind: GraphKind) => void
) => {
  const buttons = [];
  for (const kind of KIND_ORDER) {
    const count = layout.kindCounts[kind];
    if (!count) {
      continue;
    }
    buttons.push(
      <button
        className={`hover:bg-muted flex min-h-11 items-center gap-2 rounded-md px-2 text-left ${activeKinds.has(kind) ? "" : "opacity-35"}`}
        key={kind}
        type="button"
        onClick={() => {
          onToggleKind(kind);
        }}
      >
        <span className={`size-2 shrink-0 rounded-full ${KIND_SWATCH[kind]}`} />
        <span className="text-foreground text-xs">{kinds[kind]}</span>
        <span className="text-muted-foreground ml-auto text-xs">{count}</span>
      </button>
    );
  }
  return buttons;
};

export const GraphLegend = ({
  activeKinds,
  layout,
  onQuery,
  onToggleKind,
  query,
  text,
}: {
  activeKinds: ReadonlySet<GraphKind>;
  layout: RadialLayout;
  onQuery: (value: string) => void;
  onToggleKind: (kind: GraphKind) => void;
  query: string;
  text: GraphText;
}) => (
  <div className="pointer-events-auto absolute top-4 left-4 z-10 w-56">
    <h1 className="text-foreground text-sm font-semibold">{text.title}</h1>
    <p className="text-muted-foreground mb-3 text-xs">
      {layout.nodes.length.toLocaleString()} nodes ·{" "}
      {layout.edges.length.toLocaleString()} links
    </p>
    <label className="sr-only" htmlFor="graph-search">
      {text.searchLabel}
    </label>
    <input
      className="border-border bg-background text-foreground placeholder:text-muted-foreground mb-3 w-full rounded-md border px-2.5 py-1.5 text-sm outline-none"
      id="graph-search"
      placeholder={text.search}
      value={query}
      onChange={(event) => {
        onQuery(event.target.value);
      }}
    />
    <div className="flex flex-col gap-0.5">
      {kindButtons(layout, activeKinds, text.kinds, onToggleKind)}
    </div>
  </div>
);
