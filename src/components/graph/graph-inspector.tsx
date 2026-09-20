"use client";

import { useEffect, useRef } from "react";

import type { GraphText } from "./graph-model";
import type { RadialNode } from "./graph-radial";
import { KIND_SWATCH } from "./graph-theme";

const LinkGroup = ({
  heading,
  items,
  onJump,
}: {
  heading: string;
  items: { edgeId: string; node: RadialNode }[];
  onJump: (id: string) => void;
}) => {
  if (items.length === 0) {
    return null;
  }
  return (
    <section className="mt-6">
      <h3 className="text-muted-foreground mb-2 text-xs font-semibold tracking-[0.16em] uppercase">
        {heading}
      </h3>
      <ul>
        {items.map(({ edgeId, node }) => (
          <li key={edgeId}>
            <button
              className="hover:bg-muted flex min-h-11 w-full items-center gap-3 rounded-lg px-2 py-2 text-left"
              type="button"
              onClick={() => {
                onJump(node.id);
              }}
            >
              <span
                className={`size-2 shrink-0 rounded-full ${KIND_SWATCH[node.kind]}`}
              />
              <span className="text-foreground text-[0.9375rem] leading-snug">
                {node.label}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
};

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

  const inPlan = selected.connections.filter(
    ({ node }) => node.kind === "semester"
  );
  const continues = selected.connections.filter(
    ({ node }) => node.kind === "course"
  );
  const pathHeading =
    selected.kind === "semester" ? text.thisSemester : text.continues;

  return (
    <aside
      aria-labelledby="graph-node-title"
      className="bg-background/80 [@media(prefers-reduced-transparency:reduce)]:bg-background mt-4 flex max-h-[min(28rem,55vh)] flex-col overflow-hidden p-6 shadow-lg backdrop-blur-xl outline-none md:absolute md:top-8 md:bottom-8 md:left-6 md:z-20 md:mt-0 md:max-h-none md:w-[min(28rem,calc(100%-3rem))] md:rounded-2xl md:p-7"
      ref={panelRef}
      tabIndex={-1}
    >
      <div className="mb-5 flex items-start gap-4">
        <div className="min-w-0 flex-1">
          <p className="text-dorado text-xs font-semibold tracking-[0.16em] uppercase">
            {text.kinds[selected.kind]}
            {selected.credits === undefined
              ? ""
              : ` · ${selected.credits} ${text.credits}`}
          </p>
          <h2
            className="text-foreground mt-2 font-serif text-3xl leading-tight"
            id="graph-node-title"
          >
            {selected.label}
          </h2>
        </div>
        <button
          aria-label={text.close}
          className="text-muted-foreground hover:bg-muted size-11 shrink-0 rounded-full text-sm font-semibold"
          type="button"
          onClick={onClose}
        >
          {text.close}
        </button>
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto">
        {selected.description ? (
          <p className="text-foreground text-[0.9375rem] leading-relaxed">
            {selected.description}
          </p>
        ) : null}
        {inPlan.length === 0 && continues.length === 0 ? (
          <p className="text-muted-foreground mt-6 text-[0.9375rem]">
            {text.noLinks}
          </p>
        ) : (
          <>
            <LinkGroup heading={text.inPlan} items={inPlan} onJump={onJump} />
            <LinkGroup
              heading={pathHeading}
              items={continues}
              onJump={onJump}
            />
          </>
        )}
      </div>
    </aside>
  );
};
