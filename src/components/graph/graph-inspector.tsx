"use client";

import { useEffect, useRef } from "react";

import type { RadialNode } from "./graph-radial";
import { KIND_LABEL } from "./graph-theme";

export const GraphInspector = ({
  onClose,
  onJump,
  selected,
}: {
  onClose: () => void;
  onJump: (id: string) => void;
  selected: RadialNode & {
    connections: { edge: string; edgeId: string; node: RadialNode }[];
  };
}) => {
  const panelRef = useRef<HTMLElement>(null);
  useEffect(() => {
    panelRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <aside
      aria-labelledby="graph-node-title"
      className="absolute top-4 right-4 bottom-4 z-20 flex w-[min(20rem,calc(100%-2rem))] flex-col overflow-hidden rounded-xl border border-[color-mix(in_oklab,var(--foreground)_12%,transparent)] bg-[var(--background)] p-4 shadow-lg outline-none max-md:inset-x-4 max-md:top-auto max-md:h-[min(18rem,40vh)]"
      ref={panelRef}
      tabIndex={-1}
    >
      <div className="mb-3 flex items-start gap-3">
        <div className="min-w-0 flex-1">
          <h2
            className="truncate text-base font-semibold text-[var(--foreground)]"
            id="graph-node-title"
          >
            {selected.label}
          </h2>
          <p className="text-xs text-[var(--muted)]">
            {KIND_LABEL[selected.kind]}
            {selected.credits != null ? ` · ${selected.credits} credits` : ""}
          </p>
        </div>
        <button
          aria-label="Close"
          className="size-11 shrink-0 rounded-md text-sm text-[var(--muted)] hover:bg-[color-mix(in_oklab,var(--foreground)_6%,transparent)]"
          type="button"
          onClick={onClose}
        >
          Close
        </button>
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto">
        {selected.description ? (
          <p className="mb-3 text-xs text-[var(--foreground)]">
            {selected.description}
          </p>
        ) : null}
        <p className="mb-1 text-xs font-medium tracking-wide text-[var(--muted)] uppercase">
          Connections
        </p>
        {selected.connections.length === 0 ? (
          <p className="mb-3 text-xs text-[var(--muted)]">
            No links on this node.
          </p>
        ) : (
          selected.connections.map(({ edge, edgeId, node }) => (
            <button
              className="flex w-full items-center gap-2 rounded-md px-1 py-1 text-left text-xs hover:bg-[color-mix(in_oklab,var(--foreground)_6%,transparent)]"
              key={edgeId}
              type="button"
              onClick={() => {
                onJump(node.id);
              }}
            >
              <span
                className="size-1.5 shrink-0 rounded-full"
                style={{
                  background: `var(--graph-${node.kind}, var(--foreground))`,
                }}
              />
              <span className="min-w-0 truncate text-[var(--foreground)]">
                {node.label}
              </span>
              <span className="ml-auto shrink-0 text-[var(--muted)]">
                {edge}
              </span>
            </button>
          ))
        )}
      </div>
    </aside>
  );
};
