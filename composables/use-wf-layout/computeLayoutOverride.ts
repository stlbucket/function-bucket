import { getWfNodeTree, getWfEdges } from './getWfNodeTree'

export const computeLayoutOverride = async (wf: any) => {
  // const nodeTree = getWfNodeTree(wf)
  const edges = getWfEdges(wf)

  const nodes = wf.layoutOverride.nodes.map((oln: any) => {
    const wfNode = wf.uowsList.find((uow: any) => uow.identifier === oln.identifier)
    return {
      parentNode: wfNode.parentUowId,
      id: wfNode.id,
      type: wfNode.type,
      label: wfNode.name,
      width: oln.width,
      height: oln.height,
      position: oln.position,
      data: {
        width: oln.width,
        height: oln.height,
        ...wfNode
      }
    }
  })

  const reducedLayout = nodes

  return {
  reducedLayout
}

}
