import ELK from 'elkjs/lib/elk.bundled.js'
const elk = new ELK()

export const computeLayoutElk = async (nodes: any) => {
  const layout = await elk.layout(nodes)
  return layout

}
