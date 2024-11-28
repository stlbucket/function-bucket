import { computeLayoutDagre } from "./computeLayoutDagre"

export function getGraphFromNodeDagre(wf: Wf, nodeId: string, parentNode?: string): any {
  const thisUow = (wf.uowsList || []).find(uow => uow.id === nodeId)
  const otherUows = (wf.uowsList || []).filter(uow => uow.id !== nodeId)

  const childNodes = otherUows
  .filter(uow => uow.parentUowId === thisUow?.id)
  .map((uow) => {
    return getGraphFromNodeDagre(wf, uow.id, thisUow?.id)
  }) || []

  const childNodeIds = childNodes.map(cn => cn.id)
  const childEdges = wf.uowDependenciesList.filter(d => childNodeIds.indexOf(d.dependeeId) > -1)
    .map((dependency, i) => {
      return {
      id: dependency.id,
      source: dependency.dependeeId,
      target: dependency.dependerId,
    }
    }) || []

  let laidOutChildNodes = []
  let width = 200
  let height = 100
  let style = {}
  if (thisUow?.type !== 'TASK') {
    const layout = childNodes.length ? computeLayoutDagre(childNodes, childEdges) : "THIS IS A TASK"
    const graph = layout.graph()
    width = graph.width || 0
    height = graph.height || 0
    style = { width: `${graph.width}px`, height: `${graph.height}px` }
  
    laidOutChildNodes = layout.nodes().map((lnid: string) => {
      const childNode = childNodes.find(cn => cn.id === lnid)
      const ln = layout.node(lnid)
      return {
        ...childNode,
        position: {
          x: ln?.x,
          y: ln?.y
        }
      }
    })

  }
  const thisNode: any = {
    id: thisUow?.id,
    parentNode,
    type: thisUow?.type || '',
    label: String(thisUow?.name),
    width,
    height, 
    style,
    data: thisUow,
    childNodes: laidOutChildNodes
  }

  return thisNode
}
