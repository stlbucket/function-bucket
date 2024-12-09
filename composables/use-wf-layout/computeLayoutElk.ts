import ELK from 'elkjs/lib/elk.bundled.js'
import { getWfNodeTree, getWfEdges } from './getWfNodeTree'
const elk = new ELK()


const adornLayout = (wf: Wf, elkLayout: any) => {
  if (!elkLayout.id) return
  const {children, ...thisElkNode} = elkLayout
  const thisWfNode = wf.uowsList.find(n => n.id === thisElkNode.id)

  const adornedChildren = children.map((n: any) => adornLayout(wf, n)).flat()

  const {id, width, height, type, label, x, y} = thisElkNode

  const retval = {
    id,
    type,
    label,
    width: thisWfNode?.type === 'TASK' ? width : undefined,
    height: thisWfNode?.type === 'TASK' ? height : undefined,
    extent: 'parent',
    expandParent: true,
    position: {
      x,
      y
    },
    data: {
      width,
      height,
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


export const computeLayoutElk = async (wf: any) => {
  const nodeTree = getWfNodeTree(wf)
  const edges = getWfEdges(wf)

  const elkInput = {
    layoutOptions: { 
      'elk.algorithm': 'mrtree',
      'elk.spacing.nodeNode': 40,
      'elk.padding': '[top=50,left=25,bottom=25,right=25]'
    },
    ...nodeTree,
    edges
  }

  const elkLayout = await elk.layout(elkInput)
  const adornedLayout = adornLayout(wf, elkLayout)
  const reducedLayout = reduceLayout(adornedLayout)
return {
  elkLayout,
  adornedLayout,
  reducedLayout
}

}
