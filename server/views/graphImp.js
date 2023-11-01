import Viva from "vivagraphjs"

var graph = Viva.Graph.graph();
graph.addNode(1);
graph.addNode(2);
graph.addLink(1, 2);

var renderer = Viva.Graph.View.renderer(graph);
// renderer.run();


export const data={
    renderer
}