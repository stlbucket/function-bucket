import {upsertWorkflows} from './lib/fnbWorkflow/workflows/index.js'

async function loadOvbWorkflows () {
  await upsertWorkflows()
}

export { loadOvbWorkflows }