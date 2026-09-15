"use client";

import { useEffect, useRef } from "react";

import type { GraphText } from "./graph-model";
import type { RadialNode } from "./graph-radial";
import { KIND_SWATCH } from "./graph-theme";

export const GraphInspector = ({
  onClose,
  onJump,
  selected,
  text,
}: {
  onClose: () => void;
  onJump: (id: string) => void;
  selected: RadialNode & {
    connections: { edge: string; edgeId: string; node: RadialNode }[];
  };
  text: GraphText;
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
      className="border-border bg-background absolute top-4 right-4 bottom-4 z-20 flex w-[min(20rem,calc(100%-2rem))] flex-col overflow-hidden rounded-xl border p-4 shadow-lg outline-none max-md:inset-x-4 max-md:top-auto max-md:h-[min(18rem,40vh)]"
      ref={panelRef}
      tabIndex={-1}
    >
      <div className="mb-3 flex items-start gap-3">
        <div className="min-w-0 flex-1">
          <h2
            className="text-foreground truncate text-base font-semibold"
            id="graph-node-title"
          >
            {selected.label}
          </h2>
          <p className="text-muted-foreground text-xs">
            {text.kinds[selected.kind]}
            {selected.credits === undefined
              ? ""
              : ` · ${selected.credits} ${text.credits}`}
          </p>
        </div>
        <button
          aria-label={text.close}
          className="text-muted-foreground hover:bg-muted size-11 shrink-0 rounded-md text-sm"
          type="button"
          onClick={onClose}
        >
          {text.close}
        </button>
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto">
        {selected.description ? (
          <p className="text-foreground mb-3 text-xs">{selected.description}</p>
        ) : null}
        <p className="text-muted-foreground mb-1 text-xs font-medium tracking-wide uppercase">
          {text.connections}
        </p>
        {selected.connections.length === 0 ? (
          <p className="text-muted-foreground mb-3 text-xs">{text.noLinks}</p>
        ) : (
          selected.connections.map(({ edge, edgeId, node }) => (
            <button
              className="hover:bg-muted flex w-full items-center gap-2 rounded-md px-1 py-1 text-left text-xs"
              key={edgeId}
              type="button"
              onClick={() => {
                onJump(node.id);
              }}
            >
              <span
                className={`size-1.5 shrink-0 rounded-full ${KIND_SWATCH[node.kind]}`}
              />
              <span className="text-foreground min-w-0 truncate">
                {node.label}
              </span>
              <span className="text-muted-foreground ml-auto shrink-0">
                {edge}
              </span>
            </button>
          ))
        )}
      </div>
    </aside>
  );
};
