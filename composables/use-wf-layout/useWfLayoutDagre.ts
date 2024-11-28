import { getGraphFromNodeDagre } from './getGraphFromNodeDagre'

const reduceNode = (node: any) => {
  if (!node.id) return
  const {childNodes, ...theRest} = node
  const reducedChildNodes = childNodes.map((n: any) => reduceNode(n)).flat()

  const {id, type, label, width, height, position, parentNode, data, style} = theRest

  return [{id, type, label, width, height, parentNode, position, data: {...data, style}, style}, ...reducedChildNodes]
}

export function useWfLayoutDagre(wf: Wf, uowId: string) {
  const projectNode = {
    ...getGraphFromNodeDagre(wf, uowId),
    style: { backgroundColor: 'green', width: '1000px', height: '1000px' },
    position: {
      x: 10,
      y: 10
    }
  }

  const reduced = reduceNode(projectNode)?.filter(n => !!n)

  return {
    reduced,
    projectNode
  }
}
