"use client";

import dynamic from "next/dynamic";
import { useMemo, useState } from "react";

import { GraphInspector } from "./graph-inspector";
import type { GraphEdge, GraphKind, GraphNode, GraphText } from "./graph-model";
import { layoutRadial } from "./graph-radial";
import type { RadialLayout, RadialNode } from "./graph-radial";
import { KIND_ORDER } from "./graph-theme";

const ALL_KINDS = new Set<GraphKind>(KIND_ORDER);

const GraphCanvas = dynamic(() => import("./graph-canvas"), { ssr: false });

const childrenOf = (layout: RadialLayout, node: RadialNode): RadialNode[] =>
  node.neighbors
    .flatMap((nb) => {
      const child = layout.byId.get(nb.id);
      return child && child.proximity > node.proximity ? [child] : [];
    })
    .toSorted((left, right) => left.angle - right.angle);

/** Screen-reader and keyboard path through the map, which canvas cannot give. */
const Outline = ({
  layout,
  nodes,
  onSelect,
}: {
  layout: RadialLayout;
  nodes: RadialNode[];
  onSelect: (id: string) => void;
}) => (
  <ul>
    {nodes.map((node) => {
      const kids = childrenOf(layout, node);
      return (
        <li key={node.id}>
          <button
            onClick={() => {
              onSelect(node.id);
            }}
            type="button"
          >
            {node.label}
          </button>
          {kids.length > 0 ? (
            <Outline layout={layout} nodes={kids} onSelect={onSelect} />
          ) : null}
        </li>
      );
    })}
  </ul>
);

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

  const layout = useMemo(
    () => layoutRadial(initialNodes, initialEdges),
    [initialEdges, initialNodes]
  );

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

  const roots = useMemo(
    () =>
      layout.nodes
        .filter((node) => node.proximity === 1)
        .toSorted((left, right) => left.angle - right.angle),
    [layout]
  );

  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden">
      <nav aria-label={text.title} className="sr-only">
        <Outline layout={layout} nodes={roots} onSelect={setSelected} />
      </nav>
      <div className="relative min-h-0 flex-1">
        <GraphCanvas
          activeKinds={ALL_KINDS}
          layout={layout}
          searchIds={null}
          selectedId={selected}
          text={text}
          onSelect={setSelected}
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
