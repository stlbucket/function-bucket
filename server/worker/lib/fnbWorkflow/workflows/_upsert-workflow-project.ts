const { makeQueryRunner } = require('../../postgraphile-query-runner');

let runner: any = null

async function upsertWorkflowProject(project: any) {
  if (!runner) {
    runner = await makeQueryRunner();
  }
  if (!runner) {
    throw new Error('unable to make query runner')
  }
  try {
    console.log('upserting project:', project.name, project.identifier, runner)
      const result = await runner.query(mutation, {
        projectInfo: project
      })
      // console.log('SUCCESS')

    return result.data.upsertProject.project
  } catch (e: any) {
    console.log('UPSERT PROJECT ERROR:', project.name, project.identifier, e)
    runner.release()
    return {
      projectName: project.name,
      error: e.toString()
    }
  }
}

async function release() {
  console.log('releasing runner')
  if (runner) {
    runner.release()
    runner = null
  }
}

const mutation = `
mutation UpsertProject(
  $projectInfo: ProjectInfoInput!
) {
  upsertProject(input:{
    _projectInfo: $projectInfo
  }) {
  	project {
      id
      name
      type
      identifier
      workflowData
      rootUow: uowByUowId {
        id
        name
        type
        identifier
      }
    }
  }
}`

export {
  upsertWorkflowProject,
  release
}
