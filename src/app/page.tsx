import { GraphView } from "@/components/graph/graph-view";
import curriculum from "@/data/curriculum.json";
import { toCurriculumGraph } from "@/lib/curriculum-graph";

const { edges, nodes } = toCurriculumGraph(curriculum);

const Home = () => (
  <main>
    <GraphView initialEdges={edges} initialNodes={nodes} />
  </main>
);
export default Home;
