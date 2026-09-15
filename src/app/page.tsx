import { GraphView } from "@/components/graph/graph-view";
import { curriculumGraph } from "@/lib/curriculum-graph";

const Home = () => (
  <main>
    <GraphView
      initialEdges={curriculumGraph.edges}
      initialNodes={curriculumGraph.nodes}
      text={curriculumGraph.text}
    />
  </main>
);
export default Home;
