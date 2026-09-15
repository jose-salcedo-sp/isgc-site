"use client";

import dynamic from "next/dynamic";
import { useDeferredValue, useMemo, useState } from "react";

import { GraphInspector } from "./graph-inspector";
import { GraphLegend } from "./graph-legend";
import type { GraphEdge, GraphKind, GraphNode, GraphText } from "./graph-model";
import { layoutRadial } from "./graph-radial";
import { KIND_ORDER } from "./graph-theme";

const GraphCanvas = dynamic(() => import("./graph-canvas"), { ssr: false });

export const GraphView = ({
  initialEdges,
  initialNodes,
  text,
}: {
  initialEdges: GraphEdge[];
  initialNodes: GraphNode[];
  text: GraphText;
}) => {
  const [selected, setSelected] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);
  const [activeKinds, setActiveKinds] = useState(
    () => new Set<GraphKind>(KIND_ORDER)
  );

  const layout = useMemo(
    () => layoutRadial(initialNodes, initialEdges),
    [initialEdges, initialNodes]
  );

  const searchIds = useMemo(() => {
    const needle = deferredQuery.trim().toLowerCase();
    if (!needle) {
      return null;
    }
    const matches = new Set<string>();
    for (const node of layout.nodes) {
      if (node.label.toLowerCase().includes(needle)) {
        matches.add(node.id);
      }
    }
    return matches;
  }, [deferredQuery, layout]);

  const selectedNode = selected ? (layout.byId.get(selected) ?? null) : null;
  const connections = useMemo(() => {
    if (!selectedNode) {
      return [];
    }
    return selectedNode.neighbors
      .flatMap((nb) => {
        const node = layout.byId.get(nb.id);
        if (!node) {
          return [];
        }
        return [{ edge: nb.edge, edgeId: nb.edgeId, node }];
      })
      .toSorted((left, right) => right.node.degree - left.node.degree)
      .slice(0, 60);
  }, [layout, selectedNode]);

  return (
    <div className="flex h-dvh min-h-0 flex-col overflow-hidden">
      <div className="relative min-h-0 flex-1">
        <GraphCanvas
          activeKinds={activeKinds}
          layout={layout}
          searchIds={searchIds}
          selectedId={selected}
          text={text}
          onSelect={setSelected}
        />
        <GraphLegend
          activeKinds={activeKinds}
          layout={layout}
          query={query}
          text={text}
          onQuery={setQuery}
          onToggleKind={(kind) => {
            setActiveKinds((prev) => {
              const next = new Set(prev);
              if (next.has(kind)) {
                next.delete(kind);
              } else {
                next.add(kind);
              }
              return next;
            });
          }}
        />
        {selectedNode ? (
          <GraphInspector
            selected={{ ...selectedNode, connections }}
            text={text}
            onClose={() => {
              setSelected(null);
            }}
            onJump={setSelected}
          />
        ) : null}
      </div>
    </div>
  );
};
