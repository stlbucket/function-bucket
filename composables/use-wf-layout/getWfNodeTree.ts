export function getWfNodeTree(wf: Wf, nodeId?: string): any {
  const thisUow = nodeId ? (wf.uowsList || []).find(uow => uow.id === nodeId) : (wf.uowsList || []).find(uow => uow.type === 'WF')
  if (!thisUow) throw new Error('Invalid workflow: no WF uow type')

  const otherUows = (wf.uowsList || []).filter(uow => uow.id !== thisUow.id)
  const childUows = otherUows
    .filter(uow => uow.parentUowId === thisUow?.id)

  const children = childUows
    .map((uow) => {
      const nextOne = getWfNodeTree(wf, uow.id)
      return nextOne
    }) || []

  const { id } = thisUow;

  const thisNode: any = {
    id,
    width: 200,
    height: 100,
    type: thisUow?.type || '',
    label: String(thisUow?.name),
    children
  }

  return thisNode
}


export function getWfEdges(wf: Wf): any {
  return wf.uowDependenciesList.map(d => {
    return {
      id: d.id,
      sources: [d.dependeeId],
      targets: [d.dependerId]
    }
  })
}