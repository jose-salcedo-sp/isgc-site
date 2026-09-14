"use client";

import type { GraphKind } from "./graph-model";
import type { RadialLayout } from "./graph-radial";
import { KIND_LABEL, KIND_ORDER } from "./graph-theme";

const kindButtons = (
  layout: RadialLayout,
  activeKinds: ReadonlySet<GraphKind>,
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
        className="flex items-center gap-2 rounded-md px-1 py-1 text-left hover:bg-[color-mix(in_oklab,var(--foreground)_6%,transparent)]"
        key={kind}
        style={{ opacity: activeKinds.has(kind) ? 1 : 0.35 }}
        type="button"
        onClick={() => {
          onToggleKind(kind);
        }}
      >
        <span
          className="size-2 shrink-0 rounded-full"
          style={{ background: `var(--graph-${kind}, var(--foreground))` }}
        />
        <span className="text-xs text-[var(--foreground)]">
          {KIND_LABEL[kind]}
        </span>
        <span className="ml-auto text-xs text-[var(--muted)]">{count}</span>
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
}: {
  activeKinds: ReadonlySet<GraphKind>;
  layout: RadialLayout;
  onQuery: (value: string) => void;
  onToggleKind: (kind: GraphKind) => void;
  query: string;
}) => (
  <div className="pointer-events-auto absolute top-4 left-4 z-10 w-56">
    <p className="text-sm font-semibold text-[var(--foreground)]">
      Major at a glance
    </p>
    <p className="mb-3 text-xs text-[var(--muted)]">
      {layout.nodes.length.toLocaleString()} nodes ·{" "}
      {layout.edges.length.toLocaleString()} links
    </p>
    <label className="sr-only" htmlFor="graph-search">
      Search nodes
    </label>
    <input
      className="mb-3 w-full rounded-md border border-[color-mix(in_oklab,var(--foreground)_12%,transparent)] bg-[var(--background)] px-2.5 py-1.5 text-sm text-[var(--foreground)] outline-none placeholder:text-[var(--muted)]"
      id="graph-search"
      placeholder="Search"
      value={query}
      onChange={(event) => {
        onQuery(event.target.value);
      }}
    />
    <div className="flex flex-col gap-0.5">
      {kindButtons(layout, activeKinds, onToggleKind)}
    </div>
  </div>
);
