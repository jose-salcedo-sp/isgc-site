import { GraphView } from "@/components/graph/graph-view";
import { curriculumGraph } from "@/lib/curriculum-graph";

export const metadata = {
  description:
    "Mapa interactivo del plan de estudios de Ingeniería en Sistemas y Gráficas Computacionales.",
  title: "Plan de estudios | ISGC",
};

const PlanDeEstudiosPage = () => (
  <main>
    <GraphView
      initialEdges={curriculumGraph.edges}
      initialNodes={curriculumGraph.nodes}
      text={curriculumGraph.text}
    />
  </main>
);

export default PlanDeEstudiosPage;
