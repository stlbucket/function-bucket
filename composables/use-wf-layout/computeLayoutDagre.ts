import dagre from '@dagrejs/dagre'

export const computeLayoutDagre = (nodes: any[], edges: any[]) => {
  // Create a new directed graph 
  let g = new dagre.graphlib.Graph();

  // Set an object for the graph label
  g.setGraph({});

  // Default to assigning a new object as a label for each new edge.
  g.setDefaultEdgeLabel(function() { return {}; });

  // Add nodes to the graph. The first argument is the node id. The second is
  // metadata about the node. In this case we're going to add labels to each of
  // our nodes.
  nodes.forEach(node => {
    g.setNode(node.id,    { label: node.label,  width: node.width, height: node.height });
  })

  // Add edges to the graph.
  edges.forEach(edge => {
    g.setEdge(edge.source, edge.target)
  })

  dagre.layout(g);

  return g
}
