import { MarkerType, VueFlow, useVueFlow, type NodeProps, type Node, type Edge } from '@vue-flow/core'

import dagre from "@dagrejs/dagre"

const computeNodes = () => {
  const projectUow = (props.wf.uowsList || []).find(uow => uow.type === 'WF')
  const otherUows = (props.wf.uowsList || []).filter(uow => uow.type !== 'WF')

  const projectNode = {
    id: projectUow?.id,
    type: projectUow?.type,
    position: {
      x: 10,
      y: 10
    },
    style: { backgroundColor: '#333333', width: '1000px', height: '1000px' },
    label: String(projectUow?.name),
    data: projectUow,
    draggable: false
  }

  const otherNodes = otherUows
    .filter(uow => uow.parentUowId === projectUow?.id)
    .map((uow, i) => {
      return {
        id: uow.id,
        type: uow.type,
        label: String(uow.name),
        data: uow,
        parentNode: uow.parentUowId,

        draggable: false
      }
    }) || []

    return {
      projectNode,
      otherNodes
    }  
  }

const computeEdges = () => {
  const edges =  (props.wf.uowDependenciesList || [])
  .map((dependency, i) => {
      return {
      id: dependency.id,
      source: dependency.dependeeId,
      target: dependency.dependerId,
      markerEnd: MarkerType.ArrowClosed,
      animated: true
    }
    }) || []

    return [
      ...edges
    ]

}

const computeLayout = (nodes: any[], edges: any[]) => {
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
      g.setNode(node.id,    { label: node.label,  width: 200, height: 100 });
    })

    // Add edges to the graph.
    edges.forEach(edge => {
      g.setEdge(edge.source, edge.target)
    })

    dagre.layout(g);

    return g
}

const computeFlowElements = () => {
  const {projectNode, otherNodes} = computeNodes()
  const edges = computeEdges()
  const l = computeLayout([projectNode, ...otherNodes], edges)

  const allNodes = [projectNode, ...otherNodes]

  const layoutNodes = [
    ...l.nodes()
    .map(id => {
      return {
        id,
        ...allNodes.find(n => n.id === id),
        ...l.node(id)
      }
    })
  ]

  layout.value = layoutNodes

  flowNodes.value = [
    projectNode,
    ...otherNodes
  ]
    .map(n => {
      const ln = layoutNodes.find(ln => ln.id === n.id)
      return {
        ...n,
        position: {
          x: ln?.x,
          y: ln?.y
        }
      }
    }) as Node[]

  flowEdges.value = edges
}
