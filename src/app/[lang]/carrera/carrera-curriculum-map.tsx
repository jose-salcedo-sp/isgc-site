import type { GraphEdge, GraphNode } from "@/components/graph/graph-model";
import { GraphView } from "@/components/graph/graph-view";
import type { Dictionary } from "@/lib/dictionary";

export const CarreraCurriculumMap = ({
  copy,
  dict,
  edges,
  nodes,
}: {
  copy: {
    legendCourse: string;
    legendSemester: string;
    mapText: string;
    mapTitleBefore: string;
    mapTitleEmphasis: string;
  };
  dict: Dictionary;
  edges: GraphEdge[];
  nodes: GraphNode[];
}) => (
  <section className="graph-surface w-full py-16 sm:py-24" id="mapa">
    <div className="mx-auto max-w-300 px-5 lg:px-6">
      <h2 className="text-foreground max-w-4xl text-5xl leading-[1.02] tracking-[-0.04em] sm:text-7xl">
        {copy.mapTitleBefore}
        <em className="text-[#e2c58f] not-italic">{copy.mapTitleEmphasis}</em>.
      </h2>
      <p className="text-muted-foreground mt-6 max-w-2xl text-lg leading-relaxed">
        {copy.mapText}
      </p>
      <ul className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
        {[
          { label: copy.legendSemester, tone: "bg-graph-semester" },
          { label: copy.legendCourse, tone: "bg-graph-course" },
        ].map((item) => (
          <li
            className="text-muted-foreground flex items-center gap-2 text-sm font-semibold"
            key={item.label}
          >
            <span className={`size-2.5 rounded-full ${item.tone}`} />
            {item.label}
          </li>
        ))}
      </ul>
    </div>
    <div className="relative mt-10 w-full">
      <GraphView initialEdges={edges} initialNodes={nodes} text={dict.graph} />
    </div>
  </section>
);
