// import  { getGraphFromNodeElk} from './getGraphFromNodeElk'
import { computeLayoutElk } from './computeLayoutElk'
import { getWfEdges, getWfNodeTree } from './getWfNodeTree'

const adornLayout = (wf: Wf, elkLayout: any) => {
  if (!elkLayout.id) return
  const {children, ...thisElkNode} = elkLayout
  const thisWfNode = wf.uowsList.find(n => n.id === thisElkNode.id)

  const adornedChildren = children.map((n: any) => adornLayout(wf, n)).flat()

  const {id, width, height, type, label, x, y} = thisElkNode

  let bgColor = 'grey'
  switch (thisElkNode.type) {
    case 'WF':
      bgColor = 'green'
      break;
    case 'MILESTONE':
      bgColor = 'purple'
      break;
    case 'TASK':
      bgColor = 'blue'
      break;
  }
  const style = `width: ${thisElkNode.width}px; height: ${thisElkNode.height}px; background-color: ${bgColor};`

  const retval = {
    id,
    type,
    label,
    width,
    height,
    position: {
      x,
      y
    },
    data: {
      style,
      ...thisWfNode
    },
    children: adornedChildren
  }

  return retval
}

const reduceLayout = (adornedLayout: any) => {
  const {children, ...thisNode } = adornedLayout
  const reducedChildren = children
    .map((n: any) => { 
      const { id, type } = n
      return {
        parentNode: thisNode.id,
        ...n
      }
     })
    .map((n: any) => reduceLayout(n))
    .flat()

  return [thisNode,...reducedChildren]
}


export async function useWfLayoutElk(wf: Wf) {
  const nodeTree = getWfNodeTree(wf)
  const edges = getWfEdges(wf)
  const elkInput = {
    layoutOptions: { 
      'elk.algorithm': 'mrtree',
      'elk.spacing.nodeNode': 40
    },
    ...nodeTree,
    edges
  }
  const elkLayout = await computeLayoutElk(elkInput)
  const adornedLayout = adornLayout(wf, elkLayout)
  const reducedLayout = reduceLayout(adornedLayout)


  return {
    elkLayout,
    adornLayout,
    reducedLayout
  }
}