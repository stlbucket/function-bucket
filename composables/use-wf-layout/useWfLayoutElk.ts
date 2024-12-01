import { computeLayoutElk } from './computeLayoutElk'
import { computeLayoutOverride } from './computeLayoutOverride'


export async function useWfLayoutElk(wf: Wf) {
    // const elkLayoutResult = await computeLayoutElk(wf)
    // const overrideLayoutResult = await computeLayoutOverride(wf)
    // return {
    //   elkLayoutResult,
    //   overrideLayoutResult
    // }
  if (!wf.layoutOverride) {
    console.log('ELK')
    const elkLayoutResult = await computeLayoutElk(wf)
    return elkLayoutResult
  } else {
    console.log('OVERRIDE')
    const overrideLayoutResult = await computeLayoutOverride(wf)
    return overrideLayoutResult
  }
}