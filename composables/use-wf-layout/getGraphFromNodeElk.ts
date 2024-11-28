import { computeLayoutElk } from "./computeLayoutElk"

export async function getGraphFromNodeElk(wf: Wf, nodeId: string, parentNode?: string): Promise<any> {
  const thisUow = (wf.uowsList || []).find(uow => uow.id === nodeId)
  const otherUows = (wf.uowsList || []).filter(uow => uow.id !== nodeId)
  const childUows = otherUows
  .filter(uow => uow.parentUowId === thisUow?.id)

  const childNodes = await Promise.all(childUows
    .map(async (uow) => {
      const nextOne = await getGraphFromNodeElk(wf, uow.id, thisUow?.id)
      return nextOne
    }) || [])

  const childNodeIds = childNodes.map(cn => cn.id)
  const childEdges = wf.uowDependenciesList.filter(d => childNodeIds.indexOf(d.dependeeId) > -1)
    .map((dependency, i) => {
      return {
      id: dependency.id,
      sources: [dependency.dependeeId],
      targets: [dependency.dependerId],
    }
    }) || []

  // let childNodes: any[] = []
  // let childEdges: any[] = []
  let laidOutChildNodes: any = []
  let width = 200
  let height = 100
  let style = {}
  if (thisUow?.type !== 'TASK') {
    const layout = await computeLayoutElk(childNodes, childEdges)
    // const layout = childNodes.length ? await computeLayoutElk(childNodes, childEdges) : "THIS IS A TASK"
    // const graph = layout.graph()
    // width = graph.width || 0
    // height = graph.height || 0
    // style = { width: `${graph.width}px`, height: `${graph.height}px` }
  
    laidOutChildNodes = (layout.children || []).map((node) => {
      const childNode = childNodes.find(cn => cn.id === node.id)
      return {
        ...childNode,
        position: {
          x: node.x,
          y: node.y
        }
      }
    })
    laidOutChildNodes = layout
  }
  console.log(laidOutChildNodes)

  const thisNode: any = {
    id: thisUow?.id,
    parentNode,
    type: thisUow?.type || '',
    label: String(thisUow?.name),
    width,
    height, 
    style,
    // data: thisUow,
    childNodes: laidOutChildNodes.children
  }
  // console.log(thisNode)
  return thisNode
}
